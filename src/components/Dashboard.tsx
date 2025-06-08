import React, { useState } from 'react';
import { FeedList } from './FeedList';
import { FeedForm } from './FeedForm';
import { Feed } from '../types/feed';

export const Dashboard: React.FC = () => {
    const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
    const [view, setView] = useState<'list' | 'form' | 'detail'>('list');

    const handleCreateClick = () => {
        setSelectedFeed(null);
        setView('form');
    };

    const handleEditClick = (feed: Feed) => {
        setSelectedFeed(feed);
        setView('form');
    };

    const handleFormSuccess = () => {
        setView('list');
        setSelectedFeed(null);
    };

    const handleFormCancel = () => {
        setView('list');
        setSelectedFeed(null);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard RSS
                        </h1>
                        {view === 'list' && (
                            <button
                                onClick={handleCreateClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Nouveau flux
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {view === 'list' && (
                        <FeedList onEdit={handleEditClick} />
                    )}
                    {view === 'form' && (
                        <FeedForm
                            feed={selectedFeed || undefined}
                            onSuccess={handleFormSuccess}
                            onClose={handleFormCancel}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}; 