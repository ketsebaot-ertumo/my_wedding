
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
import { useTranslations } from 'next-intl'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

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
            media_id: "b52249ea-0a69-405b-81c1-757b1e76bb0c",
            "guest_name": "Test",
            "content": "This is test comment on media 'b52249ea-0a69-405b-81c1-757b1e76bb0c'.",
            "is_edited": false,
            "status": "visible",
            "createdAt": new Date("2025-12-26T13:19:52.086Z")
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
  const t = useTranslations('wedding');
  const guest_id = getGuestId();
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [type, setType] = useState<string | undefined>();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { create, update } = useEntityActions();

  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // debounce effect
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(search);
  //   }, 1000); // wait 1000ms after user stops typing

  //   return () => clearTimeout(handler);
  // }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== debouncedSearch) {
        setDebouncedSearch(search);
      }
    }, 500);
    return () => clearTimeout(timer);
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
  // const totalLikes = statData?.data?.totalLikes || media.reduce((sum: any, media: MediaItem) => sum + media.likeCount, 0);
  const totalLikes = statData?.data?.totalLikes ?? 
    media.reduce((sum: any, item: MediaItem) => sum + (item.likeCount ?? 0), 0);
  

   /* ================= RESET PAGE WHEN FILTER CHANGES ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [type, search]);


  /* ================= RENDER ================= */
  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="text-center mb-12 pt-8"> 
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{t('gallery-title')}</h2>
          <p className="text-gray-600">{t('media-load')}</p>
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
      if (media.type === 'video') {
        // Direct download without loading into memory
        const link = document.createElement('a');
        link.href = media.url;
        link.download = media.filename;
        link.click();
      } else {

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
      }

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

  // add comments
  const addComment = async () => {
  if (!selectedMedia || !commentInput.trim()) return;

  try {
    const res= await create(`${selectedMedia.id}/comment`, {
      media_id: selectedMedia.id,
      guest_name: "Guest",
      content: commentInput,
    });

    if (res) toast.success('Comment added');
    else toast.error('Unable to create comment. Please retry.')
    setCommentInput('');

    refetch(); // reload media list

  } catch (err) {
    console.error(err);
    toast.error('Failed to add comment');
  }
};


  return (
    <div className="container mx-auto p-6 py-14 sm:py-20 md:px-10">
      {/* Header */}
      <div className="relative text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{t('gallery-title')}</h2>

        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('gallery-desc')}
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
              {t('all-media')}
            </Button>
            <Button
              variant={getButtonVariant('image')}
              onClick={() => setType('image')}
              className={type === 'image' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              {t('photos-only')}
            </Button>
            <Button
              variant={getButtonVariant('video')}
              onClick={() => setType('video')}
              className={type === 'video' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              {t('videos-only')}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* <div className="relative italic font-inter">
            <input
              type="text"
              placeholder={t('media-search')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full sm:w-54 lg:w-64"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className='w-6 h-5' />
            </div>
          </div> */}

           <div className="">
            <input
              type="text"
              placeholder={`🔍    ${t('media-search')}`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-transparent w-full sm:w-54 lg:w-64"
            />
          </div>
        
          <Button 
            onClick={() => {
              setType(undefined);
              setSearch('');
            }}
            variant="outline"
            className="whitespace-nowrap rounded-lg text-white bg-rose-500"
          >
            {t('clear-filters')}
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
            <div className="text-gray-600">{t('media-total')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {totalPhotos}
            </div>
            <div className="text-gray-600">{t('photos')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {totalVideos}
            </div>
            <div className="text-gray-600">{t('videos')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {totalLikes}
            </div>
            <div className="text-gray-600">{t('media-likes')}</div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {media.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 text-6xl">📷</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('media-notfound')}</h3>
          <p className="text-gray-500">{t('media-notfount-msg')}</p>
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
                          className="flex items-center gap-2 text-white hover:text-rose-300 transition-colors cursor-pointer"
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
                          {t('uploaded-by')} {item.uploadedBy}
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
                        {/* <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          <span>{t('comment')} ({item.commentCount})</span>
                        </button> */}
                        {/* <button
                          onClick={() =>
                            setOpenComments(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id],
                            }))
                          }
                          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{t('comment')} ({item.commentCount})</span>
                        </button> */}
                        <button
  onClick={() => setSelectedMedia(item)}
  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 cursor-pointer"
>
  <MessageCircle className="w-4 h-4" />
  <span>{t('comment')} ({item.commentCount})</span>
</button>

                        <button
                          onClick={() => toggleLike(item.id)}
                          className={`flex items-center gap-1 cursor-pointer ${
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
                          <span>{t('like')} ({item.likeCount})</span>
                        </button>
                      </div>
                      
                      <div className="text-gray-500">
                        {(item.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>

                    {openComments[item.id] && (
  <div className="mt-4 border-t pt-3 space-y-3">
    
    {/* Existing comments */}
    <div className="space-y-2 max-h-40 overflow-y-auto">
      {item.comments?.filter(c => c.status === 'visible').map(c => (
        <div key={c.id} className="text-sm text-gray-700">
          <span className="font-semibold">{c.guest_name}:</span>{' '}
          {c.content}
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="flex gap-2">
      <input
        type="text"
        value={commentInputs[item.id] || ''}
        onChange={(e) =>
          setCommentInputs(prev => ({
            ...prev,
            [item.id]: e.target.value,
          }))
        }
        onKeyDown={(e) => {
  if (e.key === 'Enter') {
    addComment();
  }
}}
        placeholder="Write a comment..."
        className="flex-1 px-3 py-2 border rounded-lg text-sm"
      />

      <button
        onClick={() => addComment()}
        className="px-3 py-2 bg-rose-500 text-white rounded-lg text-sm hover:bg-rose-600"
      >
        Post
      </button>
    </div>
  </div>
)}

<Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
  <DialogContent className="max-w-2xl">
     <DialogHeader>
      <DialogTitle className='font-inter'>{t('comment')}</DialogTitle>
    </DialogHeader>

    <DialogDescription>
      {t('comment-desc')}
    </DialogDescription>

    {selectedMedia && (
      <div className="flex flex-col gap-4">

        {/* Media preview */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          {selectedMedia.type === 'image' ? (
            <img
              src={selectedMedia.url}
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              src={selectedMedia.url}
              controls
              className="w-full h-full"
            />
          )}
        </div>

        {/* Comments list */}
        {/* <div className="max-h-60 overflow-y-auto space-y-2">
          {selectedMedia.comments
            ?.filter(c => c.status === 'visible')
            .map(c => (
              <div key={c.id} className="text-sm text-gray-700">
                <span className="font-semibold">{c.guest_name}:</span>{" "}
                <p>{c.content}</p>
              </div>
            ))}
        </div> */}
        {/* Comments list - Modern Tailwind Design */}
<div className="max-h-60 overflow-y-auto space-y-3 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-blue-400 [&::-webkit-scrollbar-thumb]:to-purple-500 [&::-webkit-scrollbar-thumb]:rounded-full">
  {selectedMedia.comments
    ?.filter(c => c.status === 'visible')
    .map((c, index) => (
      <div 
        key={c.id} 
        className="group relative bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100 animate-in slide-in-from-bottom-2 fade-in duration-300"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        {/* Decorative accent bar */}
        <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
              {c.guest_name.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2 mb-1 flex-wrap">
              <span className="font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors cursor-pointer">
                {c.guest_name}
              </span>
              <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {c.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed break-words">
              {c.content}
            </p>
            
            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
                Like
              </button>
              <button className="text-xs text-gray-400 hover:text-blue-500 transition-colors">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
    
  {/* Empty state */}
  {selectedMedia.comments?.filter(c => c.status === 'visible').length === 0 && (
    <div className="text-center py-8 animate-in fade-in duration-500">
      <div className="text-4xl mb-3">💬</div>
      <p className="text-gray-400 text-sm">No comments yet</p>
      <p className="text-gray-300 text-xs mt-1">Be the first to share your thoughts</p>
    </div>
  )}
</div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') addComment();
            }}
          />

          <button
            onClick={addComment}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
          >
            Post
          </button>
        </div>

      </div>
    )}

  </DialogContent>
</Dialog>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                      item.type === 'image'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {item.type === 'image' ? t('photo') : t('video')}
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
                {t('previous')}
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  {t('page')} <span className="font-bold">{currentPage}</span> {t('of')} {totalPages}
                </span>
              </div>
              
              <Button
                variant="outline"
                disabled={!hasMore || currentPage === totalPages}
                onClick={() => handlePagination(currentPage + 1)}
                className="px-6"
              >
                {t('next')}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
})

export default MediaGallery
