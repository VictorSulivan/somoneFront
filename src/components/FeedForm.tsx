import React, { useState } from 'react';
import { Feed, FeedCreateUpdate } from '../types/feed';
import { feedService } from '../services/api';

interface FeedFormProps {
    feed?: Feed;
    onClose: () => void;
    onSuccess: () => void;
}

export const FeedForm: React.FC<FeedFormProps> = ({ feed, onClose, onSuccess }) => {
    const [url, setUrl] = useState(feed?.url || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);

    const validateUrl = (url: string): boolean => {
        try {
            const urlObj = new URL(url);
            // Vérifier si l'URL se termine par .xml ou contient 'rss' ou 'feed'
            const isRssUrl = urlObj.pathname.endsWith('.xml') || 
                           urlObj.pathname.includes('rss') || 
                           urlObj.pathname.includes('feed');
            
            if (!isRssUrl) {
                setUrlError("L'URL doit pointer vers un flux RSS valide (doit contenir 'rss', 'feed' ou se terminer par '.xml')");
                return false;
            }
            
            setUrlError(null);
            return true;
        } catch {
            setUrlError("L'URL n'est pas valide");
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!validateUrl(url)) {
            setLoading(false);
            return;
        }

        try {
            const feedData: FeedCreateUpdate = {
                url: url
            };

            if (feed) {
                await feedService.updateFeed(feed.id, feedData);
            } else {
                await feedService.createFeed(feedData);
            }
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Réponse d\'erreur complète:', err.response);
            if (err.response?.data?.errors) {
                const errorMessages = Object.values(err.response.data.errors)
                    .flat()
                    .filter((msg): msg is string => typeof msg === 'string');
                setError(errorMessages.join(', '));
            } else {
                setError('Une erreur est survenue lors de l\'enregistrement du flux');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {feed ? 'Modifier le flux' : 'Ajouter un nouveau flux'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                            URL du flux RSS
                        </label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                            placeholder="https://example.com/feed.xml"
                        />
                        {urlError && (
                            <p className="mt-1 text-sm text-red-600">{urlError}</p>
                        )}
                    </div>
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Enregistrement...' : feed ? 'Mettre à jour' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 