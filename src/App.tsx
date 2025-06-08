import { useState, useEffect } from 'react';
import { FeedList } from './components/FeedList';
import { FeedForm } from './components/FeedForm';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Feed } from './types/feed';
import authService from './services/authService';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [selectedFeed, setSelectedFeed] = useState<Feed | undefined>(undefined);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    const handleEdit = (feed: Feed) => {
        setSelectedFeed(feed);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setSelectedFeed(undefined);
        setShowForm(false);
    };

    if (!isAuthenticated) {
        return showRegister ? (
            <Register onRegisterSuccess={handleLoginSuccess} />
        ) : (
            <div>
                <Login onLoginSuccess={handleLoginSuccess} />
                <div className="text-center mt-4">
                    <button
                        onClick={() => setShowRegister(true)}
                        className="text-indigo-600 hover:text-indigo-500"
                    >
                        Pas encore de compte ? S'inscrire
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">RSS News Reader</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                            >
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Mes Flux RSS</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Ajouter un flux
                        </button>
                    </div>

                    {showForm && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                                <FeedForm
                                    feed={selectedFeed}
                                    onClose={handleFormClose}
                                    onSuccess={handleFormClose}
                                />
                            </div>
                        </div>
                    )}

                    <FeedList onEdit={handleEdit} />
                </div>
            </main>
        </div>
    );
}

export default App;
