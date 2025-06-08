import React, { useEffect, useState } from 'react';
import { Feed, FeedItem } from '../types/feed';
import { feedService } from '../services/api';

interface FeedDetailProps {
    feedId: number;
}

export const FeedDetail: React.FC<FeedDetailProps> = ({ feedId }) => {
    const [feed, setFeed] = useState<Feed | null>(null);
    const [items, setItems] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        loadFeedAndItems();
    }, [feedId]);

    const loadFeedAndItems = async () => {
        try {
            setLoading(true);
            const [feedData, itemsData] = await Promise.all([
                feedService.getFeed(feedId),
                feedService.getFeedItems(feedId)
            ]);
            setFeed(feedData);
            setItems(itemsData);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement du flux');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (itemId: number) => {
        try {
            await feedService.markAsRead(feedId, itemId);
            setItems(items.map(item =>
                item.id === itemId ? { ...item, isRead: true } : item
            ));
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleFavorite = async (itemId: number) => {
        try {
            await feedService.toggleFavorite(feedId, itemId);
            setItems(items.map(item =>
                item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
            ));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="p-4">Chargement...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!feed) return <div className="p-4">Flux non trouvé</div>;

    const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <div className="p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{feed.title}</h1>
                <p className="text-gray-600">{feed.description}</p>
                <button
                    onClick={() => loadFeedAndItems()}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Rafraîchir
                </button>
            </div>

            <div className="space-y-4">
                {paginatedItems.map(item => (
                    <div key={item.id} className="border p-4 rounded shadow">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleMarkAsRead(item.id)}
                                    className={`px-3 py-1 rounded ${
                                        item.isRead ? 'bg-green-500' : 'bg-gray-500'
                                    } text-white`}
                                >
                                    {item.isRead ? 'Lu' : 'Marquer comme lu'}
                                </button>
                                <button
                                    onClick={() => handleToggleFavorite(item.id)}
                                    className={`px-3 py-1 rounded ${
                                        item.isFavorite ? 'bg-yellow-500' : 'bg-gray-500'
                                    } text-white`}
                                >
                                    {item.isFavorite ? '★' : '☆'}
                                </button>
                            </div>
                        </div>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                                Publié le: {new Date(item.publishedDate).toLocaleString()}
                            </span>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                Lire l'article
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Précédent
                    </button>
                    <span className="px-4 py-2">
                        Page {page} sur {totalPages}
                    </span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Suivant
                    </button>
                </div>
            )}
        </div>
    );
}; 