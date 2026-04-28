export interface UploadedFile {
  id: string
  file: File
  preview: string
  progress: number
  isUploading: boolean
  isComplete: boolean
  error?: string
  serverUrl?: string
}