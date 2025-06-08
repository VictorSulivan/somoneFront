import axios from 'axios';

const API_URL = 'http://localhost:5135/api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userId: number;
    username: string;
}

class AuthService {
    async login(loginRequest: LoginRequest): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/login`, loginRequest);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    async register(registerRequest: RegisterRequest): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/register`, registerRequest);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getCurrentUser(): AuthResponse | null {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }
        return null;
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }

    getAuthHeader(): { Authorization: string } | {} {
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    }
}

export default new AuthService(); 