
'use client'

import { useEffect, useState } from 'react'
import { Heart, Download, Share2, MessageCircle, MoreVertical, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { getGuestId } from '../utils/guestId'
import { MediaItem } from '@/lib/types'
import { useAllEntities } from '@/hooks/use-query'
import { useEntityActions } from '@/hooks/use-mutation';
import { motion } from "framer-motion";
import { forwardRef, useImperativeHandle } from 'react'

const mockMedia: MediaItem[] = [
  {
    id: "b52249ea-0a69-405b-81c1-757b1e76bb0c",
    url: "https://luibcjnjmubufxgulwbq.supabase.co/storage/v1/object/public/media/0W6A7474.jpg",
    type: "image",
    filename: "wedding-ceremony.jpg",
    size: 2456789,
    mimeType: "image/jpeg",
    caption: "Beautiful ceremony moment ❤️",
    guest_id: "493546ee-2dbe-4150-9ceb-501c452570d2",
    downloadCount: 5,
    shareCount: 3,
    isActive: true,
    metadata: {},
    uploadedBy: "Sarah",
    likeCount: 1,
    commentCount: 1,
    likes: [
        {
            id: "505e3332-ec01-4685-ae37-feac2fd66fa1",
            guest_id: "c9c83236-945c-48e5-9c37-dcf4f533b2d6"
        }
    ],
    comments: [
        {
            id: "d2e512c4-215c-434b-9ae8-69fa2c2ba9f7",
            "guest_name": "Test",
            "content": "This is test comment on media 'b52249ea-0a69-405b-81c1-757b1e76bb0c'.",
            "is_edited": false,
            "status": "visible",
            // "createdAt": "2025-12-26T13:19:52.086Z"
        }
    ]
  },
  {
    id: "50b45955-a138-41b6-86f2-13474779364d",
    url: "https://example.com/wedding/first-dance.mp4",
    type: "video",
    filename: "first-dance.mp4",
    size: 56789012,
    mimeType: "video/mp4",
    caption: "Their first dance as married couple! 💃🕺",
    guest_id: "30b22087-9dae-41ae-9530-91687f12e1fa",
    downloadCount: 0,
    shareCount: 0,
    isActive: true,
    metadata: {},
    uploadedBy: "John",
    likeCount: 0,
    commentCount: 0,
    likes: [],
    comments: []
},
{
    id: "e0451958-6d86-49dc-a3c1-a2a1d6859c57",
    url: "https://luibcjnjmubufxgulwbq.supabase.co/storage/v1/object/public/media/image%20(1).png",
    type: "image",
    filename: "cake-cutting.jpg",
    size: 3123456,
    mimeType: "image/jpeg",
    caption: "Sweet moments with the wedding cake 🍰",
    guest_id: "968fd3a5-71a8-4650-803b-7482e348b595",
    downloadCount: 0,
    shareCount: 0,
    isActive: true,
    metadata: {},
    uploadedBy: "Emma",
    likeCount: 0,
    commentCount: 0,
    likes: [],
    comments: []
  },
  {
    id: "80a135b1-06cd-4bb2-841c-61bcc6b80eb0",
    url: "https://luibcjnjmubufxgulwbq.supabase.co/storage/v1/object/public/media/0W6A6846.jpg",
    type: "image",
    filename: "family-photo.jpg",
    size: 4123456,
    mimeType: "image/jpeg",
    caption: null,
    guest_id: "eea50e5c-7682-477b-a5c6-92915281ab92",
    downloadCount: 0,
    shareCount: 0,
    isActive: true,
    metadata: {},
    uploadedBy: "David",
    likeCount: 0,
    commentCount: 0,
    likes: [],
    comments: []
  },
  {
    id: "c521e8b8-adaf-4c54-9587-5e1a95d8bddd",
    url: "https://example.com/wedding/speeches.mp4",
    type: "video",
    filename: "speeches.mp4",
    size: 98765432,
    mimeType: "video/mp4",
    caption: "Heartwarming speeches from family",
    guest_id: "00f73912-c154-43a6-b31b-cb3971e9cd76",
    downloadCount: 0,
    shareCount: 0,
    isActive: true,
    metadata: {},
    uploadedBy: "Michael",
    likeCount: 0,
    commentCount: 0,
    likes: [],
    comments: []
  },
  {
    id: "1143de85-dc53-4591-8e73-b52eaa08bf5e",
    url: "https://luibcjnjmubufxgulwbq.supabase.co/storage/v1/object/public/media/0W6A7006.jpg",
    type: "image",
    filename: "decorations.jpg",
    size: 2345678,
    mimeType: "image/jpeg",
    caption: "Beautiful venue decorations ✨",
    guest_id: "bd367434-f658-484f-a548-dc6930191cb0",
    downloadCount: 0,
    shareCount: 0,
    isActive: true,
    metadata: {},
    uploadedBy: "Lisa",
    likeCount: 0,
    commentCount: 0,
    likes: [],
    comments: []
  }
]


// export default function MediaGallery() {
const MediaGallery = forwardRef((props, ref) => {

  const guest_id = getGuestId();

  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);

  const [type, setType] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const { create, update } = useEntityActions();
  // console.log('type', type);

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000); // wait 1000ms after user stops typing

    return () => clearTimeout(handler);
  }, [search]);


  /* ================= FETCH MEDIA ================= */
  const {
    data,
    loading,
    err,
    refetch,
  } = useAllEntities('media', {
    page: currentPage,
    limit: pageSize,
    type, 
    search: debouncedSearch, // use debounced value
  });


  // ===== Fetch stats =====
  const { data: statData, refetch: refetchStats } = useAllEntities('media/stats', {
    page: currentPage,
    limit: pageSize,
    type, 
    search: debouncedSearch, 
  });


  // Expose refetch to parent
  useImperativeHandle(ref, () => ({
    refetch,
    refetchStats
  }))


  // ===== Derived data =====
  const media = data?.data?.media ?? mockMedia;
  const totalPages = data?.data?.totalPages ?? 1;
  const hasMore = data?.data?.hasMore ?? false;

  // console.log("media:", media);

  // data number value
  const totalMedia = statData?.data?.totalMedia || media.length;
  const totalPhotos = statData?.data?.totalImages || media.filter((m: MediaItem) => m.type === 'image').length;
  const totalVideos = statData?.data?.totalVideos || media.filter((m: MediaItem) => m.type === 'video').length;
  const totalLikes = statData?.data?.totalLikes || media.reduce((sum: any, media: MediaItem) => sum + media.likeCount, 0);


   /* ================= RESET PAGE WHEN FILTER CHANGES ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [type, search]);


  /* ================= RENDER ================= */
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="text-center mb-12 pt-8"> 
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Wedding Gallery</h2>
          <p className="text-gray-600">Loading media...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
              <div className="aspect-square bg-gray-200" />
              <div className="p-5">
                <div className="h-4 bg-gray-200 rounded mb-3" />
                <div className="h-3 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;


  // Helper function
  const isLikedByGuest = (media: MediaItem) => {
    // if (!guestId) return false;
    return media.likes?.some(like => like.guest_id === guest_id) ?? false;
  }


  /* ================= LIKE TOGGLE ================= */
  const toggleLike = async (mediaId: string) => {
    try {
      const res = await create(`media/${mediaId}/like`, { guest_id });
      refetch();
    } catch (err) {
      console.error('Like toggle failed', err);
      toast.error('Failed to like');
    }
  };


    /* ================= HANDLE DOWNLOAD ================= */
  // const handleDownload = async (media: MediaItem) => {
  //   try {
  //     // Create a temporary link element
  //     const link = document.createElement('a');
  //     link.href = media.url;
  //     link.download = media.filename;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
      
  //     toast.success('Download started!');
  //   } catch (err) {
  //     console.error('Download failed', err);
  //     toast.error('Failed to download');
  //   }
  // };

  /* ================= HANDLE DOWNLOAD ================= */
  const handleDownload = async (media: MediaItem) => {
    try {
      // 1. Fetch the file
      const res = await fetch(media.url, {
        credentials: 'include', // safe even if not needed
      });

      if (!res.ok) {
        throw new Error('Failed to fetch file');
      }

      // 2. Convert to blob
      const blob = await res.blob();

      // 3. Create local object URL
      const blobUrl = window.URL.createObjectURL(blob);

      // 4. Force download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = media.filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 5. Cleanup
      window.URL.revokeObjectURL(blobUrl);

      toast.success('Download started!');
    } catch (err) {
      console.error('Download failed', err);
      toast.error('Failed to download');
    }
  };


  /* ================= HANDLE SHARE ================= */
  const handleShare = async (media: MediaItem) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: media.filename,
          text: media.caption || 'Check out this wedding moment!',
          url: media.url,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(media.url);
        toast.success('Link copied to clipboard!');
      }
      
      // After successful share/copy, call API to increment shareCount
      await update(`media/${media.id}/share`); // no body needed if backend just increments
      toast.success('Thanks for sharing!');

      // Optional: refetch media to update shareCount in UI
      refetch();
    } catch (err) {
      console.error('Share failed', err);
      toast.error('Failed to share');
    }
  };


  /* ================= PAGINATION ================= */
  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper to get button variant based on type selection
  const getButtonVariant = (buttonType: string | undefined) => {
    return type === buttonType ? 'default' : 'outline';
  };


  return (
    <div className="container mx-auto p-6 py-14 sm:py-20 md:px-10">
      {/* Header */}
      <div className="relative text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Wedding Gallery</h2>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through all the beautiful moments captured by our guests
        </p>

        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[3px] bg-gray-200 rounded-full overflow-hidden">
          <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              className="w-full h-full bg-gradient-to-r from-transparent via-rose-400 to-transparent"
          />
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 tracking-wider whitespace-nowrap"
        >
            ✦ ✦ ✦
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          {/* Type Filter Buttons */}
          <div className="flex gap-2">
            <Button
              variant={getButtonVariant(undefined)}
              onClick={() => setType(undefined)}
              className={type === undefined ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              All Media
            </Button>
            <Button
              variant={getButtonVariant('image')}
              onClick={() => setType('image')}
              className={type === 'image' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              Photos Only
            </Button>
            <Button
              variant={getButtonVariant('video')}
              onClick={() => setType('video')}
              className={type === 'video' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              Videos Only
            </Button>
          </div>
          
          
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search captions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-1 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full sm:w-54 lg:w-64"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className='w-6 h-5' /> {/* 🔍 */}
          </div>
        </div>
        
        <Button 
          onClick={() => {
            setType(undefined);
            setSearch('');
          }}
          variant="outline"
          className="whitespace-nowrap rounded-lg text-gray-400"
        >
          Clear Filters
        </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-rose-600 mb-2">
              {totalMedia}
            </div>
            <div className="text-gray-600">Total Media</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalPhotos}
            </div>
            <div className="text-gray-600">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {totalVideos}
            </div>
            <div className="text-gray-600">Videos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalLikes}
            </div>
            <div className="text-gray-600">Total Likes</div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {media.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 text-6xl">📷</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No media found</h3>
          <p className="text-gray-500">Try changing your filters or check back later</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {media.map((item: MediaItem) => {
              const isLiked = isLikedByGuest(item);
              // const likeCountWithLocal = item.likeCount + (likedMedia.includes(item.id) ? 1 : 0);
              const likeCountWithLocal = item.likeCount;

              return (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Media Thumbnail */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    {item.type === 'image' ? (
                      <img 
                        src={item.url} 
                        alt={item.caption || item.filename}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full relative">
                        <video 
                          src={item.url} 
                          className="w-full h-full object-cover"
                          muted
                          preload="metadata"

                          autoPlay
                          loop
                          playsInline
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <button
                          onClick={() => toggleLike(item.id)}
                          className="flex items-center gap-2 text-white hover:text-rose-300 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              // isLiked || likedMedia.includes(item.id)
                              isLiked
                                ? 'fill-red-500 text-red-500'
                                : ''
                            }`}
                          />
                          <span>{likeCountWithLocal}</span>
                        </button>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(item)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Download className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleShare(item)}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Media Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 truncate">
                          {item.filename}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Uploaded by {item.uploadedBy}
                        </p>
                      </div>
                      
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {item.caption && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.caption}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                          <MessageCircle className="w-4 h-4" />
                          <span>Comment ({item.commentCount})</span>
                        </button>
                        <button
                          onClick={() => toggleLike(item.id)}
                          className={`flex items-center gap-1 ${
                            // isLiked || likedMedia.includes(item.id)
                            isLiked
                              ? 'text-rose-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              // isLiked || likedMedia.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''
                              isLiked ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                          <span>Like ({item.likeCount})</span>
                        </button>
                      </div>
                      
                      <div className="text-gray-500">
                        {(item.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.type === 'image'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {item.type === 'image' ? 'PHOTO' : 'VIDEO'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => handlePagination(currentPage - 1)}
                className="px-6"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  Page <span className="font-bold">{currentPage}</span> of {totalPages}
                </span>
              </div>
              
              <Button
                variant="outline"
                disabled={!hasMore || currentPage === totalPages}
                onClick={() => handlePagination(currentPage + 1)}
                className="px-6"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
})

export default MediaGallery

// 'use client'

// import { useEffect, useState } from 'react'
// import { Heart, Download, Share2, MessageCircle, MoreVertical, Search } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { toast } from 'react-hot-toast'
// import { getGuestId } from '../utils/guestId'
// import { MediaItem } from '@/lib/types'
// import { useAllEntities } from '@/hooks/use-query'
// import { useEntityActions } from '@/hooks/use-mutation';
// import { motion } from "framer-motion";

// const mockMedia: MediaItem[] = [
//   {
//     id: "b52249ea-0a69-405b-81c1-757b1e76bb0c",
//     url: "data:image/jpeg;base64,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",
//     type: "image",
//     filename: "wedding-ceremony.jpg",
//     size: 2456789,
//     mimeType: "image/jpeg",
//     caption: "Beautiful ceremony moment ❤️",
//     guest_id: "493546ee-2dbe-4150-9ceb-501c452570d2",
//     downloadCount: 5,
//     shareCount: 3,
//     isActive: true,
//     metadata: {},
//     uploadedBy: "Sarah",
//     likeCount: 1,
//     commentCount: 1,
//     likes: [
//         {
//             id: "505e3332-ec01-4685-ae37-feac2fd66fa1",
//             guest_id: "c9c83236-945c-48e5-9c37-dcf4f533b2d6"
//         }
//     ],
//     comments: [
//         {
//             id: "d2e512c4-215c-434b-9ae8-69fa2c2ba9f7",
//             "guest_name": "Test",
//             "content": "This is test comment on media 'b52249ea-0a69-405b-81c1-757b1e76bb0c'.",
//             "is_edited": false,
//             "status": "visible",
//             // "createdAt": "2025-12-26T13:19:52.086Z"
//         }
//     ]
//   },
//   {
//     id: "50b45955-a138-41b6-86f2-13474779364d",
//     url: "https://example.com/wedding/first-dance.mp4",
//     type: "video",
//     filename: "first-dance.mp4",
//     size: 56789012,
//     mimeType: "video/mp4",
//     caption: "Their first dance as married couple! 💃🕺",
//     guest_id: "30b22087-9dae-41ae-9530-91687f12e1fa",
//     downloadCount: 0,
//     shareCount: 0,
//     isActive: true,
//     metadata: {},
//     uploadedBy: "John",
//     likeCount: 0,
//     commentCount: 0,
//     likes: [],
//     comments: []
// },
// {
//     id: "e0451958-6d86-49dc-a3c1-a2a1d6859c57",
//     url: "https://example.com/wedding/cake-cutting.jpg",
//     type: "image",
//     filename: "cake-cutting.jpg",
//     size: 3123456,
//     mimeType: "image/jpeg",
//     caption: "Sweet moments with the wedding cake 🍰",
//     guest_id: "968fd3a5-71a8-4650-803b-7482e348b595",
//     downloadCount: 0,
//     shareCount: 0,
//     isActive: true,
//     metadata: {},
//     uploadedBy: "Emma",
//     likeCount: 0,
//     commentCount: 0,
//     likes: [],
//     comments: []
//   },
//   {
//     id: "80a135b1-06cd-4bb2-841c-61bcc6b80eb0",
//     url: "https://example.com/wedding/family-photo.jpg",
//     type: "image",
//     filename: "family-photo.jpg",
//     size: 4123456,
//     mimeType: "image/jpeg",
//     caption: null,
//     guest_id: "eea50e5c-7682-477b-a5c6-92915281ab92",
//     downloadCount: 0,
//     shareCount: 0,
//     isActive: true,
//     metadata: {},
//     uploadedBy: "David",
//     likeCount: 0,
//     commentCount: 0,
//     likes: [],
//     comments: []
//   },
//   {
//     id: "c521e8b8-adaf-4c54-9587-5e1a95d8bddd",
//     url: "https://example.com/wedding/speeches.mp4",
//     type: "video",
//     filename: "speeches.mp4",
//     size: 98765432,
//     mimeType: "video/mp4",
//     caption: "Heartwarming speeches from family",
//     guest_id: "00f73912-c154-43a6-b31b-cb3971e9cd76",
//     downloadCount: 0,
//     shareCount: 0,
//     isActive: true,
//     metadata: {},
//     uploadedBy: "Michael",
//     likeCount: 0,
//     commentCount: 0,
//     likes: [],
//     comments: []
//   },
//   {
//     id: "1143de85-dc53-4591-8e73-b52eaa08bf5e",
//     url: "https://example.com/wedding/decorations.jpg",
//     type: "image",
//     filename: "decorations.jpg",
//     size: 2345678,
//     mimeType: "image/jpeg",
//     caption: "Beautiful venue decorations ✨",
//     guest_id: "bd367434-f658-484f-a548-dc6930191cb0",
//     downloadCount: 0,
//     shareCount: 0,
//     isActive: true,
//     metadata: {},
//     uploadedBy: "Lisa",
//     likeCount: 0,
//     commentCount: 0,
//     likes: [],
//     comments: []
//   }
// ]


// export default function MediaGallery() {
//   const guest_id = getGuestId();

//   const [error, setError] = useState<string | null>(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(6);

//   const [type, setType] = useState<string | undefined>();
//   const [search, setSearch] = useState('');
//   const [debouncedSearch, setDebouncedSearch] = useState(search);

//   const { create, update } = useEntityActions();
//   // console.log('type', type);

//   // debounce effect
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(search);
//     }, 1000); // wait 1000ms after user stops typing

//     return () => clearTimeout(handler);
//   }, [search]);


//   /* ================= FETCH MEDIA ================= */
//   const {
//     data,
//     loading,
//     err,
//     refetch,
//   } = useAllEntities('media', {
//     page: currentPage,
//     limit: pageSize,
//     type, 
//     search: debouncedSearch, // use debounced value
//   });

//   console.log('data:', data);

//   // ===== Fetch stats =====
//   const { data: statData, refetch: refetchStats } = useAllEntities('media/stats', {
//     page: currentPage,
//     limit: pageSize,
//     type, 
//     search: debouncedSearch, 
//   }); // ALWAYS call here

//   // ===== Derived data =====
//   const media = data?.data?.media ?? mockMedia;
//   const totalPages = data?.data?.totalPages ?? 1;
//   const hasMore = data?.data?.hasMore ?? false;

//   // console.log("media:", media);

//   // data number value
//   const totalMedia = statData?.data?.totalMedia || media.length;
//   const totalPhotos = statData?.data?.totalImages || media.filter((m: MediaItem) => m.type === 'image').length;
//   const totalVideos = statData?.data?.totalVideos || media.filter((m: MediaItem) => m.type === 'video').length;
//   const totalLikes = statData?.data?.totalLikes || media.reduce((sum: any, media: MediaItem) => sum + media.likeCount, 0);


//    /* ================= RESET PAGE WHEN FILTER CHANGES ================= */
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [type, search]);


//   /* ================= RENDER ================= */
//   if (loading) {
//     return (
//       <div className="w-full max-w-7xl mx-auto p-6">
//         <div className="text-center mb-12 pt-8"> 
//           <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Wedding Gallery</h2>
//           <p className="text-gray-600">Loading media...</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
//               <div className="aspect-square bg-gray-200" />
//               <div className="p-5">
//                 <div className="h-4 bg-gray-200 rounded mb-3" />
//                 <div className="h-3 bg-gray-200 rounded mb-2" />
//                 <div className="h-3 bg-gray-200 rounded" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
//   if (error) return <p className="text-red-500">{error}</p>;


//   // Helper function
//   const isLikedByGuest = (media: MediaItem) => {
//     // if (!guestId) return false;
//     return media.likes?.some(like => like.guest_id === guest_id) ?? false;
//   }


//   /* ================= LIKE TOGGLE ================= */
//   const toggleLike = async (mediaId: string) => {
//     try {
//       const res = await create(`media/${mediaId}/like`, { guest_id });
//       refetch();
//     } catch (err) {
//       console.error('Like toggle failed', err);
//       toast.error('Failed to like');
//     }
//   };


//     /* ================= HANDLE DOWNLOAD ================= */
//   // const handleDownload = async (media: MediaItem) => {
//   //   try {
//   //     // Create a temporary link element
//   //     const link = document.createElement('a');
//   //     link.href = media.url;
//   //     link.download = media.filename;
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
      
//   //     toast.success('Download started!');
//   //   } catch (err) {
//   //     console.error('Download failed', err);
//   //     toast.error('Failed to download');
//   //   }
//   // };

//   /* ================= HANDLE DOWNLOAD ================= */
//   const handleDownload = async (media: MediaItem) => {
//     try {
//       // 1. Fetch the file
//       const res = await fetch(media.url, {
//         credentials: 'include', // safe even if not needed
//       });

//       if (!res.ok) {
//         throw new Error('Failed to fetch file');
//       }

//       // 2. Convert to blob
//       const blob = await res.blob();

//       // 3. Create local object URL
//       const blobUrl = window.URL.createObjectURL(blob);

//       // 4. Force download
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = media.filename;

//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       // 5. Cleanup
//       window.URL.revokeObjectURL(blobUrl);

//       toast.success('Download started!');
//     } catch (err) {
//       console.error('Download failed', err);
//       toast.error('Failed to download');
//     }
//   };


//   /* ================= HANDLE SHARE ================= */
//   const handleShare = async (media: MediaItem) => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: media.filename,
//           text: media.caption || 'Check out this wedding moment!',
//           url: media.url,
//         });
//       } else {
//         // Fallback: copy to clipboard
//         await navigator.clipboard.writeText(media.url);
//         toast.success('Link copied to clipboard!');
//       }
      
//       // After successful share/copy, call API to increment shareCount
//       await update(`media/${media.id}/share`); // no body needed if backend just increments
//       toast.success('Thanks for sharing!');

//       // Optional: refetch media to update shareCount in UI
//       refetch();
//     } catch (err) {
//       console.error('Share failed', err);
//       toast.error('Failed to share');
//     }
//   };


//   /* ================= PAGINATION ================= */
//   const handlePagination = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   // Helper to get button variant based on type selection
//   const getButtonVariant = (buttonType: string | undefined) => {
//     return type === buttonType ? 'default' : 'outline';
//   };


//   return (
//     <div className="container mx-auto p-6 py-14 sm:py-20 md:px-10">
//       {/* Header */}
//       <div className="relative text-center mb-14">
//         <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Wedding Gallery</h2>

//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Browse through all the beautiful moments captured by our guests
//         </p>

//         <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[3px] bg-gray-200 rounded-full overflow-hidden">
//           <motion.div
//               initial={{ x: "-100%" }}
//               whileInView={{ x: "100%" }}
//               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
//               className="w-full h-full bg-gradient-to-r from-transparent via-rose-400 to-transparent"
//           />
//         </div>

//         <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 tracking-wider whitespace-nowrap"
//         >
//             ✦ ✦ ✦
//         </motion.div>
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
//         <div className="flex items-center gap-4">
//           {/* Type Filter Buttons */}
//           <div className="flex gap-2">
//             <Button
//               variant={getButtonVariant(undefined)}
//               onClick={() => setType(undefined)}
//               className={type === undefined ? 'bg-rose-500 hover:bg-rose-600' : ''}
//             >
//               All Media
//             </Button>
//             <Button
//               variant={getButtonVariant('image')}
//               onClick={() => setType('image')}
//               className={type === 'image' ? 'bg-rose-500 hover:bg-rose-600' : ''}
//             >
//               Photos Only
//             </Button>
//             <Button
//               variant={getButtonVariant('video')}
//               onClick={() => setType('video')}
//               className={type === 'video' ? 'bg-rose-500 hover:bg-rose-600' : ''}
//             >
//               Videos Only
//             </Button>
//           </div>
          
          
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search captions..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="px-4 py-1 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full sm:w-54 lg:w-64"
//           />
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//             <Search className='w-6 h-5' /> {/* 🔍 */}
//           </div>
//         </div>
        
//         <Button 
//           onClick={() => {
//             setType(undefined);
//             setSearch('');
//           }}
//           variant="outline"
//           className="whitespace-nowrap rounded-lg text-gray-400"
//         >
//           Clear Filters
//         </Button>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="mb-8 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="text-center">
//             <div className="text-3xl font-bold text-rose-600 mb-2">
//               {totalMedia}
//             </div>
//             <div className="text-gray-600">Total Media</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-blue-600 mb-2">
//               {totalPhotos}
//             </div>
//             <div className="text-gray-600">Photos</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-purple-600 mb-2">
//               {totalVideos}
//             </div>
//             <div className="text-gray-600">Videos</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-bold text-green-600 mb-2">
//               {totalLikes}
//             </div>
//             <div className="text-gray-600">Total Likes</div>
//           </div>
//         </div>
//       </div>

//       {/* Gallery Grid */}
//       {media.length === 0 ? (
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4 text-6xl">📷</div>
//           <h3 className="text-xl font-semibold text-gray-600 mb-2">No media found</h3>
//           <p className="text-gray-500">Try changing your filters or check back later</p>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {media.map((item: MediaItem) => {
//               const isLiked = isLikedByGuest(item);
//               // const likeCountWithLocal = item.likeCount + (likedMedia.includes(item.id) ? 1 : 0);
//               const likeCountWithLocal = item.likeCount;

//               return (
//                 <div
//                   key={item.id}
//                   className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//                 >
//                   {/* Media Thumbnail */}
//                   <div className="relative aspect-square overflow-hidden bg-gray-100">
//                     {item.type === 'image' ? (
//                       <img 
//                         src={item.url} 
//                         alt={item.caption || item.filename}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     ) : (
//                       <div className="w-full h-full relative">
//                         <video 
//                           src={item.url} 
//                           className="w-full h-full object-cover"
//                           muted
//                           preload="metadata"

//                           autoPlay
//                           loop
//                           playsInline
//                         />
//                         <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
//                           <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
//                             <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Overlay Actions */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
//                         <button
//                           onClick={() => toggleLike(item.id)}
//                           className="flex items-center gap-2 text-white hover:text-rose-300 transition-colors"
//                         >
//                           <Heart
//                             className={`w-5 h-5 ${
//                               // isLiked || likedMedia.includes(item.id)
//                               isLiked
//                                 ? 'fill-red-500 text-red-500'
//                                 : ''
//                             }`}
//                           />
//                           <span>{likeCountWithLocal}</span>
//                         </button>
                        
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleDownload(item)}
//                             className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
//                           >
//                             <Download className="w-4 h-4 text-white" />
//                           </button>
//                           <button
//                             onClick={() => handleShare(item)}
//                             className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
//                           >
//                             <Share2 className="w-4 h-4 text-white" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Media Info */}
//                   <div className="p-5">
//                     <div className="flex items-start justify-between mb-3">
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-bold text-gray-800 truncate">
//                           {item.filename}
//                         </h3>
//                         <p className="text-sm text-gray-500 mt-1">
//                           Uploaded by {item.uploadedBy}
//                         </p>
//                       </div>
                      
//                       <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//                         <MoreVertical className="w-5 h-5 text-gray-400" />
//                       </button>
//                     </div>

//                     {item.caption && (
//                       <p className="text-gray-600 mb-4 line-clamp-2">
//                         {item.caption}
//                       </p>
//                     )}

//                     <div className="flex items-center justify-between text-sm">
//                       <div className="flex items-center gap-4">
//                         <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
//                           <MessageCircle className="w-4 h-4" />
//                           <span>Comment ({item.commentCount})</span>
//                         </button>
//                         <button
//                           onClick={() => toggleLike(item.id)}
//                           className={`flex items-center gap-1 ${
//                             // isLiked || likedMedia.includes(item.id)
//                             isLiked
//                               ? 'text-rose-500'
//                               : 'text-gray-500 hover:text-gray-700'
//                           }`}
//                         >
//                           <Heart
//                             className={`w-4 h-4 ${
//                               // isLiked || likedMedia.includes(item.id) ? 'fill-rose-500 text-rose-500' : ''
//                               isLiked ? 'fill-rose-500 text-rose-500' : ''
//                             }`}
//                           />
//                           <span>Like ({item.likeCount})</span>
//                         </button>
//                       </div>
                      
//                       <div className="text-gray-500">
//                         {(item.size / 1024 / 1024).toFixed(2)} MB
//                       </div>
//                     </div>
//                   </div>

//                   {/* Type Badge */}
//                   <div className="absolute top-4 left-4">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                       item.type === 'image'
//                         ? 'bg-blue-100 text-blue-600'
//                         : 'bg-purple-100 text-purple-600'
//                     }`}>
//                       {item.type === 'image' ? 'PHOTO' : 'VIDEO'}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="mt-8 flex items-center justify-center gap-4">
//               <Button
//                 variant="outline"
//                 disabled={currentPage === 1}
//                 onClick={() => handlePagination(currentPage - 1)}
//                 className="px-6"
//               >
//                 Previous
//               </Button>
              
//               <div className="flex items-center gap-2">
//                 <span className="text-gray-600">
//                   Page <span className="font-bold">{currentPage}</span> of {totalPages}
//                 </span>
//               </div>
              
//               <Button
//                 variant="outline"
//                 disabled={!hasMore || currentPage === totalPages}
//                 onClick={() => handlePagination(currentPage + 1)}
//                 className="px-6"
//               >
//                 Next
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
