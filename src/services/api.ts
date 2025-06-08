import axios from 'axios';
import { Feed, FeedCreateUpdate, FeedItem, ApiResponse } from '../types/feed';
import authService from './authService';

const API_URL = 'http://localhost:5135/api';

// Configuration d'axios avec l'intercepteur pour le token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const feedService = {
    async getFeeds(): Promise<Feed[]> {
        const response = await axios.get<ApiResponse<Feed>>(`${API_URL}/feeds`, {
            headers: authService.getAuthHeader()
        });
        return response.data.$values;
    },

    async getFeed(id: number): Promise<Feed> {
        const response = await axios.get<Feed>(`${API_URL}/feeds/${id}`, {
            headers: authService.getAuthHeader()
        });
        return response.data;
    },

    async createFeed(feed: FeedCreateUpdate): Promise<Feed> {
        const response = await axios.post<Feed>(`${API_URL}/feeds`, feed, {
            headers: authService.getAuthHeader()
        });
        return response.data;
    },

    async updateFeed(id: number, feed: FeedCreateUpdate): Promise<Feed> {
        const response = await axios.put<Feed>(`${API_URL}/feeds/${id}`, feed, {
            headers: authService.getAuthHeader()
        });
        return response.data;
    },

    async deleteFeed(id: number): Promise<void> {
        await axios.delete(`${API_URL}/feeds/${id}`, {
            headers: authService.getAuthHeader()
        });
    },

    async refreshFeed(id: number): Promise<void> {
        await axios.post(`${API_URL}/feeds/${id}/refresh`, {}, {
            headers: authService.getAuthHeader()
        });
    },

    async getFeedItems(feedId: number): Promise<FeedItem[]> {
        const response = await axios.get<ApiResponse<FeedItem>>(`${API_URL}/feeds/${feedId}/items`, {
            headers: authService.getAuthHeader()
        });
        return response.data.$values;
    },

    async markAsRead(feedId: number, itemId: number): Promise<void> {
        await axios.patch(`${API_URL}/feeds/${feedId}/items/${itemId}/read`, {}, {
            headers: authService.getAuthHeader()
        });
    },

    async toggleFavorite(feedId: number, itemId: number): Promise<void> {
        await axios.patch(`${API_URL}/feeds/${feedId}/items/${itemId}/favorite`, {}, {
            headers: authService.getAuthHeader()
        });
    }
};
