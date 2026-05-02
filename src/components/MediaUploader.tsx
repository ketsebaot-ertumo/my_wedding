
'use client'

import { useState, useCallback, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Camera, Video, Image as ImageIcon, Heart, Sparkles, Flower2, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import uploadFiles from '@/hooks/uploadFiles'
import { UploadedFile } from '@/types/file'
import { useTranslations } from 'next-intl'


// type MediaUploaderProps = {
//   onUploadSuccess?: (result?: { url?: string; path?: string }) => void
// }

// export default function MediaUploader() {
export default function MediaUploader({ onUploadSuccess }: any) {
  const t = useTranslations('wedding');
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isUploadingAll, setIsUploadingAll] = useState(false)
  const uploadQueueRef = useRef<boolean>(false)

  // Generate unique ID for each file
  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Upload single file to backend
  const uploadSingleFile = async (fileToUpload: UploadedFile, index: number) => {
    try {
      const result = await uploadFiles(fileToUpload.file)
      
      if (result?.url || result?.path) {
        // Upload successful
        setFiles(prev => prev.map((f, i) => 
          i === index ? { 
            ...f, 
            progress: 100, 
            isUploading: false, 
            isComplete: true,
            serverUrl: result.url || result.path
          } : f
        ))
        
        toast.success(`${fileToUpload.file.name} added to our memories! ❤️`)

        // Call the callback to refresh gallery
        if (onUploadSuccess) {
          onUploadSuccess(result)
        }

        return true
      } else {
        throw new Error('Upload failed - no URL returned')
      }
    } catch (error) {
      console.error('Upload error:', error)
      const errorMsg = error instanceof Error && error.message ? error.message : 'Upload failed. Please try again.'
      setFiles(prev => prev.map((f, i) => 
        i === index ? { 
          ...f, 
          isUploading: false, 
          error: errorMsg
        } : f
      ))
      toast.error(`Failed to upload ${fileToUpload.file.name}`)
      return false
    }
  }

  const processUploadQueue = async (newFiles: UploadedFile[], currentFiles: UploadedFile[]) => {
    if (uploadQueueRef.current) return
    uploadQueueRef.current = true
    setIsUploadingAll(true)

    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = currentFiles.findIndex(f => f.id === newFiles[i].id)

      if (fileIndex !== -1) {
        // await uploadSingleFile(newFiles[i], fileIndex)
        startProgressSimulation(fileIndex)
        await uploadSingleFile(newFiles[i], fileIndex)
      }
    }

    setIsUploadingAll(false)
    uploadQueueRef.current = false
  }

  // // Process upload queue
  // const processUploadQueue = async (newFiles: UploadedFile[]) => {
  //   if (uploadQueueRef.current) return
  //   uploadQueueRef.current = true
  //   setIsUploadingAll(true)

  //   for (let i = 0; i < newFiles.length; i++) {
  //     const fileIndex = files.findIndex(f => f.id === newFiles[i].id)
  //     if (fileIndex !== -1) {
  //       await uploadSingleFile(newFiles[i], fileIndex)
        
  //       // Small delay between uploads to avoid overwhelming the server
  //       if (i < newFiles.length - 1) {
  //         await new Promise(resolve => setTimeout(resolve, 500))
  //       }
  //     }
  //   }

  //   setIsUploadingAll(false)
  //   uploadQueueRef.current = false
    
  //   // Show overall success
  //   setShowSuccess(true)
  //   setTimeout(() => setShowSuccess(false), 3000)
  // }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: generateId(),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      isUploading: true,
      isComplete: false
    }))

    setFiles(prev => {
      const updated = [...prev, ...newFiles]
      processUploadQueue(newFiles, updated) // pass updated state
      return updated
    })
    
    // setFiles(prev => [...prev, ...newFiles])
    
    // // Start upload process
    // processUploadQueue(newFiles)
    
    toast.success(`${acceptedFiles.length} precious memory(s) added ✨`)
  }, [])

  const removeFile = (index: number) => {
    const file = files[index]
    if (file.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFiles(prev => prev.filter((_, i) => i !== index))
    toast.success('Memory removed')
  }

  const retryUpload = (index: number) => {
    const fileToRetry = files[index]
    if (fileToRetry) {
      setFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, isUploading: true, error: undefined, progress: 0 } : f
      ))
      uploadSingleFile(fileToRetry, index)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.heic', '.heif'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxSize: 100 * 1024 * 1024,
    multiple: true // Allow multiple files
  })

  // Simulated progress for visual feedback while actual upload happens
  const simulateProgress = (index: number) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 90) {
        clearInterval(interval)
        progress = 90 // Stop at 90% until actual upload completes
      }
      setFiles(prev => prev.map((f, i) => 
        i === index && f.isUploading && !f.isComplete ? { ...f, progress: Math.min(progress, 90) } : f
      ))
    }, 300)
    return interval
  }

  // Track upload progress visually
  const startProgressSimulation = (index: number) => {
    const interval = simulateProgress(index)
    // Check periodically if upload is complete
    const checkComplete = setInterval(() => {
      setFiles(prev => {
        const file = prev[index]
        if (!file?.isUploading && file?.isComplete) {
          clearInterval(interval)
          clearInterval(checkComplete)
        }
        return prev
      })
    }, 500)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-6 py-12 md:py-20"
    >
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>{t('notif-1')} ✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Area */}
      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
        <div
          {...getRootProps()}
          className={`relative overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer ${
            isDragging ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-xl'
          }`}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-rose-100" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl" />
          
          {/* Ornamental Border Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="weddingPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M30,10 L35,20 L45,22 L38,30 L40,40 L30,35 L20,40 L22,30 L15,22 L25,20 Z" fill="none" stroke="#f43f5e" strokeWidth="1" />
                  <circle cx="30" cy="30" r="3" fill="#f43f5e" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#weddingPattern)" />
            </svg>
          </div>
          
          <div className={`relative border-2 border-dashed rounded-3xl p-8 md:p-12 text-center transition-all duration-300 m-[2px] ${
            isDragging ? 'border-rose-400 bg-rose-50/50' : 'border-rose-200 hover:border-rose-300 bg-white/40'
          }`}>
            <input {...getInputProps()} />
            
            <div className="space-y-6">
              {/* Animated Icon */}
              <motion.div 
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-rose-100 to-amber-100 flex items-center justify-center shadow-lg"
              >
                <Upload className="w-10 h-10 text-rose-500" />
              </motion.div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <Heart className="w-5 h-5 text-rose-300" />
                  <span className="text-rose-400 text-sm tracking-wider">✦ {t('upload-share')} ✦</span>
                  <Heart className="w-5 h-5 text-rose-300" />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-serif bg-gradient-to-r from-rose-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                  {t('your-precious-moments')}
                </h3>
                
                <p className="text-gray-600 max-w-md mx-auto">
                  {t('upload-desc')}
                </p>
              </div>
              
              {/* File Type Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: ImageIcon, label: 'photos', color: 'rose', bg: 'bg-rose-50' },
                  { icon: Video, label: 'videos', color: 'amber', bg: 'bg-amber-50' },
                  { icon: Camera, label: 'live-photos', color: 'purple', bg: 'bg-purple-50' }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className={`flex items-center gap-2 px-4 py-2 ${item.bg} rounded-full shadow-sm border border-${item.color}-200`}
                  >
                    <item.icon className={`w-4 h-4 text-${item.color}-500`} />
                    <span className={`text-sm text-${item.color}-700 font-medium`}>{t(item.label)}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Upload Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isUploadingAll}
                className={`relative px-8 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 ${
                  isUploadingAll ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isUploadingAll ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('uploading')}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                      {t('choose-memories')}
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>
              
              <p className="text-sm text-gray-400">
                📸 JPG, PNG, GIF, HEIC • 🎥 MP4, MOV {t('upto')} 5GB
              </p>
              
              <p className="text-xs text-rose-400 italic">
                {t('upload-text')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Uploaded Files Gallery */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-12 space-y-6">
            {/* Section Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Flower2 className="w-4 h-4 text-rose-400" />
                <h3 className="text-2xl font-serif text-gray-800">
                  {files.filter(f => f.isComplete).length} of {files.length} Memories Shared
                </h3>
                <Flower2 className="w-4 h-4 text-rose-400" />
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
            </div>
            
            {/* Grid Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {files.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-rose-100 hover:shadow-xl transition-all"
                >
                  {/* Remove Button */}
                  {/* <button
                    onClick={() => removeFile(index)}
                    // className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-500/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:scale-110"
                    className="
                      absolute top-2 right-2 z-10 w-8 h-8
                      bg-red-500/90 backdrop-blur-sm text-white rounded-full
                      flex items-center justify-center
                      hover:bg-red-600 hover:scale-110
                      opacity-0 group-hover:opacity-100
                      sm:opacity-0 sm:group-hover:opacity-100
                      opacity-100 sm:opacity-0
                    "
                  >
                    <X className="w-4 h-4" />
                  </button> */}
                  <button
                    onClick={() => removeFile(index)}
                    className="
                      absolute top-2 right-2 z-10 w-8 h-8
                      bg-red-500/90 text-white rounded-full
                      flex items-center justify-center
                      hover:bg-red-600 hover:scale-110
                      transition-all

                      opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                    "
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {/* Media Preview */}
                  <div className="aspect-square relative bg-gradient-to-br from-rose-50 to-amber-50 overflow-hidden">
                    {file.file.type.startsWith('image/') ? (
                      <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        src={file.preview}
                        alt={file.file.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <Video className="w-12 h-12 text-rose-300 mx-auto mb-2" />
                          <p className="text-xs text-gray-400">Video Memory</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Upload Status Overlay */}
                    {file.isUploading && (
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-3" />
                          <p className="text-sm font-medium text-gray-700">{Math.round(file.progress)}%</p>
                          <p className="text-xs text-gray-500">Preserving your memory...</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Error State */}
                    {file.error && !file.isUploading && (
                      <div className="absolute inset-0 bg-red-50/90 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center p-4">
                          <p className="text-sm text-red-600 mb-2">{file.error}</p>
                          <button
                            onClick={() => retryUpload(index)}
                            className="px-3 py-1 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                          >
                            Retry Upload
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Success Checkmark */}
                    {file.isComplete && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1"
                      >
                        <CheckCircle className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* File Info */}
                  <div className="p-3 bg-white">
                    <p className="text-sm font-medium text-gray-700 truncate">{file.file.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-400">
                        {Math.round((file.file.size / 1024 / 1024) * 100) / 100} MB
                      </p>
                      <Heart className="w-3 h-3 text-rose-300 fill-rose-200" />
                    </div>
                    {file.isComplete && file.serverUrl && (
                      <a 
                        href={file.serverUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] text-rose-400 hover:text-rose-600 mt-1 inline-block"
                      >
                        View uploaded ✨
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}