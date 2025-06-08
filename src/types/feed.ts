export interface Feed {
    id: number;
    url: string;
    title: string;
    description: string;
    lastFetched: string;
    feedItems: FeedItem[] | null;
}

export interface FeedCreateUpdate {
    url: string;
}

export interface FeedItem {
    id: number;
    feedId: number;
    title: string;
    link: string;
    description: string;
    publishedDate: string;
    guid: string;
    isRead: boolean;
    isFavorite: boolean;
}

export interface FeedResponse {
    $id?: string;
    $values: Feed[];
}

export interface FeedItemResponse {
    $id?: string;
    $values: FeedItem[];
}

export interface ApiResponse<T> {
    $id: string;
    $values: T[];
} 