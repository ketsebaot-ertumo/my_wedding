// export interface MediaItem {
//   id: string
//   url: string
//   type: 'image' | 'video'
//   filename: string
//   size: number
//   uploadedBy: string
//   uploadedAt: Date
//   likes: number
//   caption?: string
// }

export interface MediaLike {
    id: string;
    guest_id: string;
}

export interface MediaComment {
    id: string;
    media_id: string;
    guest_name: string;
    content: string;
    is_edited: boolean;
    status: string;
    createdAt?: Date;
}

export interface MediaItem {
    id: string;
    url: string;
    type: 'image' | 'video';
    filename: string;
    size: number;
    mimeType?: string;
    caption: string | null;
    guest_id: string;
    downloadCount: number;
    shareCount: number;
    isActive?: boolean;
    metadata?: Record<string, any>;
    uploadedBy: string;
    likeCount: number;
    commentCount: number;
    likes?: MediaLike[];
    comments?: MediaComment[];
    createdAt?: Date;
    // isLiked?: boolean; // Optional for UI state
}

export interface MediaResponse {
    success: boolean;
    message: string;
    data: {
        total: number;
        page: number;
        totalPages: number;
        hasMore: boolean;
        media: MediaItem[];
    };
}

export interface LikeResponse {
    success: boolean;
    message: string;
    data: {
        liked: boolean;
        likeId?: string;
    };
}

export interface MediaFilters {
    page?: number;
    limit?: number;
    type?: 'all' | 'image' | 'video';
    search?: string;
    guest_id?: string;
}

export interface Comment {
  id: string
  author: string
  content: string
  timestamp: Date
  likes: number
}

export interface Guest {
  id: string
  name: string
  email: string
  role: 'bride' | 'groom' | 'family' | 'friend' | 'guest'
  avatar?: string
}

export interface WeddingInfo {
  brideName: string
  groomName: string
  weddingDate: Date
  venue: string
  themeColor: string
  hashtag: string
}