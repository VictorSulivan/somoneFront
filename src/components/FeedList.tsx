import React, { useEffect, useState } from 'react';
import { Feed } from '../types/feed';
import { feedService } from '../services/api';

interface FeedListProps {
    onEdit: (feed: Feed) => void;
}

export const FeedList: React.FC<FeedListProps> = ({ onEdit }) => {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const loadFeeds = async () => {
        try {
            setLoading(true);
            const response = await feedService.getFeeds();
            setFeeds(Array.isArray(response) ? response : []);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des flux');
            console.error(err);
            setFeeds([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFeeds();
    }, []);

    const handleRefresh = async (id: number) => {
        try {
            await feedService.refreshFeed(id);
            await loadFeeds();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce flux ?')) {
            try {
                await feedService.deleteFeed(id);
                await loadFeeds();
            } catch (err) {
                console.error(err);
                setError('Erreur lors de la suppression du flux');
            }
        }
    };

    const filteredFeeds = feeds.filter(feed =>
        feed.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feed.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="p-4">Chargement...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Rechercher un flux..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="space-y-4">
                {filteredFeeds.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Aucun flux trouvé
                    </div>
                ) : (
                    filteredFeeds.map(feed => (
                        <div key={feed.id} className="border p-4 rounded shadow bg-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-bold">{feed.title}</h2>
                                    <p className="text-gray-600">{feed.description}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {feed.feedItems?.length || 0} articles
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onEdit(feed)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(feed.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    Dernière mise à jour: {new Date(feed.lastFetched).toLocaleString()}
                                </span>
                                <button
                                    onClick={() => handleRefresh(feed.id)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Rafraîchir
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}; 