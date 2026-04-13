'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Camera, Video, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'react-hot-toast'

interface UploadedFile {
  file: File
  preview: string
  progress: number
  isUploading: boolean
}

export default function MediaUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      isUploading: true
    }))
    
    setFiles(prev => [...prev, ...newFiles])
    
    // Simulate upload progress
    newFiles.forEach((newFile, index) => {
      simulateUpload(newFile, index)
    })
    
    toast.success(`Added ${acceptedFiles.length} file(s)`)
  }, [])

  const simulateUpload = (file: UploadedFile, index: number) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, progress } : f
      ))
      
      if (progress >= 100) {
        clearInterval(interval)
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, isUploading: false } : f
        ))
        toast.success(`${file.file.name} uploaded successfully!`)
      }
    }, 200)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    toast.success('File removed')
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxSize: 100 * 1024 * 1024 // 100MB
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-rose-500 bg-rose-50 scale-[1.02]' 
            : 'border-gray-300 hover:border-rose-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-rose-100 to-pink-100 flex items-center justify-center">
            <Upload className="w-10 h-10 text-rose-500" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Share Your Memories
            </h3>
            <p className="text-gray-600 mb-4">
              Upload photos and videos from our special day
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              <span className="text-blue-700">Images</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-lg">
              <Video className="w-5 h-5 text-purple-500" />
              <span className="text-purple-700">Videos</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
              <Camera className="w-5 h-5 text-green-500" />
              <span className="text-green-700">Take Photo</span>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
            <Upload className="mr-2 h-5 w-5" />
            Select Files
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            Supports JPG, PNG, GIF, MP4, MOV up to 100MB
          </p>
        </div>
      </div>

      {/* Uploaded files preview */}
      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Uploading ({files.length})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
                  {file.file.type.startsWith('image/') ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium truncate">{file.file.name}</p>
                  
                  <div className="space-y-1">
                    <Progress value={file.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {file.isUploading ? 'Uploading...' : 'Uploaded'}
                      </span>
                      <span>
                        {Math.round((file.file.size / 1024 / 1024) * 100) / 100} MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}