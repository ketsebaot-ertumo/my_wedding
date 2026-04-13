import { useEffect, useState } from 'react';
import axios from 'axios';
import { MediaItem } from '@/lib/types';

export const useMedia = ({
  page,
  limit,
  type,
  search,
}: {
  page: number;
  limit: number;
  type?: string;
  search?: string;
}) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchMedia = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/media', {
          params: { page, limit, type, search },
        });

        if (mounted) {
          setMedia(res.data.data.media);
          setTotalPages(res.data.data.totalPages);
        }
      } catch (err) {
        console.error('Failed to fetch media', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
    return () => { mounted = false; };
  }, [page, limit, type, search]);

  return { media, loading, totalPages, setMedia };
};







// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { 
//     MediaItem, 
//     MediaResponse, 
//     LikeResponse, 
//     MediaFilters 
// } from '../lib/types';

// interface UseMediaReturn {
//     media: MediaItem[];
//     loading: boolean;
//     error: string | null;
//     currentPage: number;
//     totalPages: number;
//     totalItems: number;
//     hasMore: boolean;
//     typeFilter: 'all' | 'image' | 'video';
//     searchQuery: string;
//     fetchMedia: () => Promise<void>;
//     toggleLike: (mediaId: string, guestId: string) => Promise<{
//         success: boolean;
//         liked?: boolean;
//         error?: string;
//     }>;
//     hasUserLiked: (mediaItem: MediaItem, guestId: string) => boolean;
//     handlePageChange: (page: number) => void;
//     handleTypeFilterChange: (type: 'all' | 'image' | 'video') => void;
//     handleSearch: (query: string) => void;
//     setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
// }

// export const useMedia = (
//     initialPage: number = 1, 
//     pageSize: number = 8
// ): UseMediaReturn => {
//     const [media, setMedia] = useState<MediaItem[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState<number>(initialPage);
//     const [totalPages, setTotalPages] = useState<number>(1);
//     const [totalItems, setTotalItems] = useState<number>(0);
//     const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [hasMore, setHasMore] = useState<boolean>(false);

//     // Fetch all media
//     const fetchMedia = useCallback(async (
//         page: number = currentPage, 
//         type: 'all' | 'image' | 'video' = typeFilter, 
//         search: string = searchQuery
//     ) => {
//         setLoading(true);
//         setError(null);
        
//         try {
//             const params: MediaFilters = {
//                 page,
//                 limit: pageSize,
//                 ...(type !== 'all' && { type }),
//                 ...(search && { search })
//             };

//             const response = await axios.get<MediaResponse>('/api/media', { params });
            
//             if (response.data.success) {
//                 const mediaData = response.data.data;
//                 setMedia(mediaData.media);
//                 setTotalPages(mediaData.totalPages);
//                 setTotalItems(mediaData.total);
//                 setHasMore(mediaData.hasMore);
//             } else {
//                 setError(response.data.message || 'Failed to fetch media');
//             }
//         } catch (err: any) {
//             const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch media';
//             setError(errorMessage);
//             setMedia([]);
//         } finally {
//             setLoading(false);
//         }
//     }, [currentPage, pageSize, typeFilter, searchQuery]);

//     // Toggle like for a media item
//     const toggleLike = async (mediaId: string, guestId: string) => {
//         try {
//             const response = await axios.post<LikeResponse>(`/api/media/${mediaId}/like`, {
//                 guest_id: guestId
//             });

//             if (response.data.success) {
//                 // Update local state
//                 setMedia(prevMedia => 
//                     prevMedia.map(item => {
//                         if (item.id === mediaId) {
//                             const isLiked = response.data.data.liked;
//                             const currentLikeCount = item.likeCount;
                            
//                             // Check if current user's like exists
//                             const userLikeIndex = item.likes.findIndex(
//                                 like => like.guest_id === guestId
//                             );
                            
//                             let updatedLikes = [...item.likes];
                            
//                             if (isLiked && userLikeIndex === -1) {
//                                 // Add like
//                                 updatedLikes.push({
//                                     id: response.data.data.likeId || `temp-${Date.now()}`,
//                                     guest_id: guestId
//                                 });
//                             } else if (!isLiked && userLikeIndex !== -1) {
//                                 // Remove like
//                                 updatedLikes.splice(userLikeIndex, 1);
//                             }
                            
//                             return {
//                                 ...item,
//                                 likeCount: isLiked ? currentLikeCount + 1 : currentLikeCount - 1,
//                                 likes: updatedLikes,
//                                 isLiked: isLiked
//                             };
//                         }
//                         return item;
//                     })
//                 );
                
//                 return { 
//                     success: true, 
//                     liked: response.data.data.liked 
//                 };
//             }
//             return { 
//                 success: false, 
//                 error: response.data.message 
//             };
//         } catch (err: any) {
//             const errorMessage = err.response?.data?.message || err.message || 'Failed to toggle like';
//             setError(errorMessage);
//             return { 
//                 success: false, 
//                 error: errorMessage 
//             };
//         }
//     };

//     // Check if user has liked a media
//     const hasUserLiked = (mediaItem: MediaItem, guestId: string): boolean => {
//         return mediaItem.likes.some(like => like.guest_id === guestId);
//     };

//     // Handle pagination
//     const handlePageChange = (page: number) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Handle type filter change
//     const handleTypeFilterChange = (type: 'all' | 'image' | 'video') => {
//         setTypeFilter(type);
//         setCurrentPage(1);
//     };

//     // Handle search
//     const handleSearch = (query: string) => {
//         setSearchQuery(query);
//         setCurrentPage(1);
//     };

//     // Refresh media list
//     const refreshMedia = async () => {
//         await fetchMedia();
//     };

//     useEffect(() => {
//         fetchMedia();
//     }, [currentPage, fetchMedia]);

//     return {
//         media,
//         loading,
//         error,
//         currentPage,
//         totalPages,
//         totalItems,
//         hasMore,
//         typeFilter,
//         searchQuery,
//         fetchMedia: refreshMedia,
//         toggleLike,
//         hasUserLiked,
//         handlePageChange,
//         handleTypeFilterChange,
//         handleSearch,
//         setCurrentPage
//     };
// };





// // import { useState, useEffect } from 'react';
// // import axios from 'axios';

// // export const useMedia = (initialPage = 1, pageSize = 4) => {
// //     const [media, setMedia] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [currentPage, setCurrentPage] = useState(initialPage);
// //     const [totalPages, setTotalPages] = useState(1);
// //     const [totalItems, setTotalItems] = useState(0);
// //     const [typeFilter, setTypeFilter] = useState('all');
// //     const [searchQuery, setSearchQuery] = useState('');

// //     // Fetch all media
// //     const fetchMedia = async (page = currentPage, type = typeFilter, search = searchQuery) => {
// //         setLoading(true);
// //         try {
// //             const params = {
// //                 page,
// //                 limit: pageSize,
// //                 ...(type !== 'all' && { type }),
// //                 ...(search && { search })
// //             };

// //             const response = await axios.get('/media', { params });
            
// //             if (response.data.success) {
// //                 setMedia(response.data.data.media);
// //                 setTotalPages(response.data.data.totalPages);
// //                 setTotalItems(response.data.data.total);
// //             }
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to fetch media');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Toggle like for a media item
// //     const toggleLike = async (mediaId, guestId) => {
// //         try {
// //             const response = await axios.post(`/media/${mediaId}/like`, {
// //                 guest_id: guestId
// //             });

// //             if (response.data.success) {
// //                 // Update local state
// //                 setMedia(prevMedia => 
// //                     prevMedia.map(item => {
// //                         if (item.id === mediaId) {
// //                             const isLiked = response.data.data.liked;
// //                             const currentLikeCount = item.likeCount || 0;
                            
// //                             // Check if current user's like exists
// //                             const userLikeIndex = item.likes.findIndex(
// //                                 like => like.guest_id === guestId
// //                             );
                            
// //                             let updatedLikes = [...item.likes];
                            
// //                             if (isLiked && userLikeIndex === -1) {
// //                                 // Add like
// //                                 updatedLikes.push({
// //                                     id: response.data.data.likeId,
// //                                     guest_id: guestId
// //                                 });
// //                             } else if (!isLiked && userLikeIndex !== -1) {
// //                                 // Remove like
// //                                 updatedLikes.splice(userLikeIndex, 1);
// //                             }
                            
// //                             return {
// //                                 ...item,
// //                                 likeCount: isLiked ? currentLikeCount + 1 : currentLikeCount - 1,
// //                                 likes: updatedLikes,
// //                                 isLiked: isLiked // Add isLiked flag for easier checking
// //                             };
// //                         }
// //                         return item;
// //                     })
// //                 );
                
// //                 return { success: true, liked: response.data.data.liked };
// //             }
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to toggle like');
// //             return { success: false, error: err.message };
// //         }
// //     };

// //     // Check if user has liked a media
// //     const hasUserLiked = (mediaItem, guestId) => {
// //         return mediaItem.likes?.some(like => like.guest_id === guestId) || false;
// //     };

// //     // Handle pagination
// //     const handlePageChange = (page) => {
// //         if (page >= 1 && page <= totalPages) {
// //             setCurrentPage(page);
// //             fetchMedia(page, typeFilter, searchQuery);
// //         }
// //     };

// //     // Handle type filter change
// //     const handleTypeFilterChange = (type) => {
// //         setTypeFilter(type);
// //         setCurrentPage(1);
// //         fetchMedia(1, type, searchQuery);
// //     };

// //     // Handle search
// //     const handleSearch = (query) => {
// //         setSearchQuery(query);
// //         setCurrentPage(1);
// //         fetchMedia(1, typeFilter, query);
// //     };

// //     useEffect(() => {
// //         fetchMedia();
// //     }, []);

// //     return {
// //         media,
// //         loading,
// //         error,
// //         currentPage,
// //         totalPages,
// //         totalItems,
// //         typeFilter,
// //         searchQuery,
// //         fetchMedia,
// //         toggleLike,
// //         hasUserLiked,
// //         handlePageChange,
// //         handleTypeFilterChange,
// //         handleSearch,
// //         setCurrentPage
// //     };
// // };