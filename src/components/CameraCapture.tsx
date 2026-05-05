
'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Camera, Video, Download, RotateCw, Circle, Upload, AlertCircle, X } from 'lucide-react'
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button'
import uploadFiles from '@/hooks/uploadFiles'


export default function CameraCapture() {
  const t = useTranslations('wedding');
  const [mode, setMode] = useState<'photo' | 'video'>('photo')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
  const [isWebcamReady, setIsWebcamReady] = useState(false)
  const [webcamError, setWebcamError] = useState<string | null>(null)
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null)
  
  const webcamRef = useRef<Webcam>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const [seconds, setSeconds] = useState(0);
  const MAX_DURATION = 30 // seconds
  // let recordingTimeout: NodeJS.Timeout
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const remaining = MAX_DURATION - seconds

  // Get available camera devices
  useEffect(() => {
    const getCameras = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true })
        const devices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = devices.filter(device => device.kind === 'videoinput')
        setAvailableDevices(videoDevices)
        
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId)
        } else {
          setWebcamError("No camera found on this device")
        }
      } catch (error) {
        console.error("Error getting cameras:", error)
        setWebcamError("Unable to access camera. Please check permissions.")
      }
    }
    
    getCameras()
  }, [])
  

  // Handle webcam initialization
  const handleUserMedia = () => {
    // console.log("✅ Webcam stream received")
    setIsWebcamReady(true)
    setWebcamError(null)
  }

  const handleUserMediaError = (error: string | DOMException) => {
    console.error("❌ Webcam error:", error)
    setIsWebcamReady(false)
    
    let errorMessage = "Camera error"
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'NotFoundError':
          errorMessage = "No camera found. Please connect a camera and reload."
          break
        case 'NotAllowedError':
          errorMessage = "Camera permission denied. Please allow camera access."
          break
        case 'NotReadableError':
          errorMessage = "Camera is in use by another application."
          break
        default:
          errorMessage = `Camera error: ${error.message}`
      }
    } else {
      errorMessage = String(error)
    }
    
    setWebcamError(errorMessage)
  }

  const capturePhoto = useCallback(() => {
    if (!webcamRef.current) {
      setWebcamError("Camera not initialized")
      return
    }

    try {
      const imageSrc = webcamRef.current.getScreenshot()
      // console.log("📸 Capture result:", imageSrc ? "Success" : "Failed")
      
      if (imageSrc) {
        setCapturedImage(imageSrc)
        setWebcamError(null)
      } else {
        setWebcamError("Failed to capture image. Please try again.")
      }
    } catch (error) {
      console.error("Capture error:", error)
      setWebcamError("Capture failed")
    }
  }, [])

  const startRecording = () => {
    if (!webcamRef.current?.stream) {
      setWebcamError("No camera stream available")
      return
    }

    try {
      const stream = webcamRef.current.stream
      const options = { 
        mimeType: 'video/webm;codecs=vp8',
        // videoBitsPerSecond: 2500000/2.5 Mbps
        videoBitsPerSecond: 800000 // ~0.8 Mbps
      }
      
      mediaRecorderRef.current = new MediaRecorder(stream, options)
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const videoUrl = URL.createObjectURL(blob)
        setRecordedVideo(videoUrl)
        chunksRef.current = []
      }
      
      mediaRecorderRef.current.onerror = (event) => {
        console.error("MediaRecorder error:", event)
        setWebcamError("Recording failed")
      }
      
      mediaRecorderRef.current.start(1000)
      // RESET TIMER HERE
      setSeconds(0)
      setIsRecording(true)
      setWebcamError(null)

      // recordingTimeout = setTimeout(() => {
      //   stopRecording()
      // }, MAX_DURATION * 1000)
      recordingTimeoutRef.current = setTimeout(() => {
        stopRecording()
      }, MAX_DURATION * 1000)

    } catch (error) {
      console.error("Start recording error:", error)
      setWebcamError("Failed to start recording")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }

    // if (recordingTimeout) {
    //   clearTimeout(recordingTimeout)
    // }
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current)
      recordingTimeoutRef.current = null
    }
  }

  // Reset everything and try again
  const retryWebcam = async () => {
    setIsWebcamReady(false)
    setWebcamError(null)
    setCapturedImage(null)
    setRecordedVideo(null)
    
    // Stop any existing streams
    if (webcamRef.current?.stream) {
      webcamRef.current.stream.getTracks().forEach(track => track.stop())
    }
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Use minimal constraints
  const videoConstraints = {
    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined,
    // width: { ideal: 1280 },
    // height: { ideal: 720 },
    width: { ideal: 640 },
    height: { ideal: 480 },
    facingMode: "user"
  }

  // Test basic camera access separately
  const testCameraAccess = async () => {
    try {
      setWebcamError("Testing camera access...")
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // console.log("✅ Basic camera test passed")
      stream.getTracks().forEach(track => track.stop())
      setWebcamError(null)
      return true
    } catch (error: any) {
      console.error("❌ Camera test failed:", error)
      setWebcamError(`Camera access failed: ${error.message}`)
      return false
    }
  }

  // Fallback to simple constraints if facingMode fails
  const getVideoConstraints = () => {
    // Try simple constraints first
    if (selectedDeviceId) {
      return { deviceId: { exact: selectedDeviceId } }
    }
    
    // Fallback to environment facing mode
    return { 
      facingMode: { ideal: ['user', 'environment'] }
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  useEffect(() => {
    if (seconds >= MAX_DURATION && isRecording) {
      stopRecording()
    }
  }, [seconds, isRecording])

  // async function uploadMedia(blob: Blob, type: string, filename: string) {
  //   // 1️⃣ Get signed URL from backend
  //   const res = await fetch(`/api/media/sign?filename=${filename}&type=${type}`);
  //   const { signedUrl, cdnUrl, key } = await res.json();

  //   // 2️⃣ Upload to Cloudflare R2
  //   await fetch(signedUrl, {
  //     method: "PUT",
  //     headers: { "Content-Type": type },
  //     body: blob,
  //   });

  //   return cdnUrl;
  // }

   // INTEGRATED UPLOAD FUNCTION - Using your uploadFiles
  const handleUpload = async () => {
    setIsUploading(true)
    setUploadSuccess(null)
    
    try {
      let file: File | null = null
      let type = ''
      let filename = ''

      if (capturedImage) {
        // Convert base64 to File object
        const res = await fetch(capturedImage)
        const blob = await res.blob()
        filename = `AK-wedding-photo-${Date.now()}.jpg`
        file = new File([blob], filename, { type: 'image/jpeg' })
        type = 'image'
      } else if (recordedVideo) {
        const res = await fetch(recordedVideo)
        const blob = await res.blob()
        filename = `AK-wedding-video-${Date.now()}.webm`
        file = new File([blob], filename, { type: 'video/webm' })
        type = 'video'
      }

      if (!file) {
        throw new Error('No media to upload')
      }

      // CALL YOUR UPLOAD FILES FUNCTION
      const result = await uploadFiles(file)
      console.log('Upload result2:', result)
      
      // console.log('Upload successful:', result)
      setUploadSuccess(`Your ${type} has been uploaded successfully!`)
      
      // Reset after successful upload
      setTimeout(() => {
        setCapturedImage(null)
        setRecordedVideo(null)
        setUploadSuccess(null)
      }, 2000)
      
    } catch (error) {
      console.error('Upload error:', error)
      alert(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }


  // const handleUpload = async () => {
  //   try {
  //     if (capturedImage) {
  //       // Convert base64 to Blob
  //       const res = await fetch(capturedImage);
  //       const blob = await res.blob();
  //       const url = await uploadMedia(blob, "image/jpeg", `photo-${Date.now()}.jpg`);
  //       alert("Uploaded! View at: " + url);
  //       setCapturedImage(null);
  //     } else if (recordedVideo) {
  //       const blob = await fetch(recordedVideo).then(r => r.blob());
  //       const url = await uploadMedia(blob, "video/webm", `video-${Date.now()}.webm`);
  //       alert("Uploaded! View at: " + url);
  //       setRecordedVideo(null);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Upload failed");
  //   }
  // };

    const downloadMedia = () => {
    if (capturedImage) {
      const link = document.createElement('a')
      link.href = capturedImage
      link.download = `wedding-photo-${Date.now()}.jpg`
      link.click()
    } else if (recordedVideo) {
      const link = document.createElement('a')
      link.href = recordedVideo
      link.download = `wedding-video-${Date.now()}.webm`
      link.click()
    }
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setRecordedVideo(null)
  }

  return (
    <div id='capture' className="w-full max-w-7xl mx-auto sm:px-4 py-6 sm:py-12 rounded-3xl">
      <div className="glass-effect rounded-2xl p-8">
        <div className="text-center mb-8">
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <Camera className="w-8 h-8 text-rose-500" />
            <h2 className="text-3xl font-bold text-gray-800">Capture Moments</h2>
          </div> */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <Camera className="w-7 h-7 sm:w-8 sm:h-8 text-rose-500" />
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800">
              {t('capture-title')}
            </h2>
          </div>
          <p className="text-gray-600">
            {t('capture-desc')}
          </p>
        </div>

        {/* Camera Selection (if multiple cameras) */}
        {availableDevices.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('camera-option')}
            </label>
            <select
              value={selectedDeviceId}
              onChange={(e) => {
                setSelectedDeviceId(e.target.value)
                retryWebcam()
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {availableDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `${t('camera')} ${availableDevices.indexOf(device) + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Error Display */}
        {webcamError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-700 font-medium">{t('capture-err-title')}</p>
                {/* <p className="text-red-600 text-sm">{webcamError}</p> */}
                <p className="text-red-600 text-sm">{webcamError}</p>
                
                <div className="flex gap-3 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={retryWebcam}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    {t('camera-retry')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={testCameraAccess}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    {t('camera-test')}
                  </Button>
                </div>
              </div>
              <button
                onClick={() => setWebcamError(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Camera Preview */}
          <div className="flex-1">
            <div className="relative rounded-xl overflow-hidden bg-black min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
              {isRecording && (
  <div className="absolute top-4 right-4 z-10">
    <div className="relative w-16 h-16">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#ef4444"
          strokeWidth="4"
          fill="none"
          strokeDasharray={2 * Math.PI * 28}
          strokeDashoffset={2 * Math.PI * 28 * (1 - seconds / MAX_DURATION)}
          className="transition-all duration-1000 ease-linear"
          style={{
            strokeDashoffset: 2 * Math.PI * 28 * (1 - seconds / MAX_DURATION)
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-red-500">{remaining}</span>
        <span className="text-[10px] text-gray-500">sec</span>
      </div>
    </div>
  </div>
)} 
              
              {!capturedImage && !recordedVideo ? (
                <>
                  <div className="w-full h-full">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={getVideoConstraints()}
                      className="w-full h-auto"
                      onUserMedia={handleUserMedia}
                      onUserMediaError={handleUserMediaError}
                      screenshotQuality={0.92}
                      forceScreenshotSourceSize={false}
                      mirrored={true}
                    />
                  </div>
                  
                  {!isWebcamReady && !webcamError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mb-4"></div>
                      <p className="text-white">{t('camera-init')}</p>
                    </div>
                  )}
                </>
              ) : capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-auto"
                />
              ) : (
                <video
                  src={recordedVideo || ''}
                  controls
                  controlsList="nodownload"
                  className="w-full h-auto"
                  autoPlay
                />
              )}
              
              {/* Capture overlay */}
              {isWebcamReady && !capturedImage && !recordedVideo && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  {mode === 'photo' ? (
                    <button
                      onClick={capturePhoto}
                      className="w-16 h-16 rounded-full bg-white border-4 border-rose-500 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-lg"
                      title={t('take-photo')}
                    >
                      <Circle className="w-8 h-8 text-rose-500" />
                    </button>
                  ) : (
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        isRecording 
                          ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                          : 'bg-rose-500 hover:bg-rose-600'
                      } text-white transition-all active:scale-95 shadow-lg`}
                      title={isRecording ? t('stop-recording') : t('start-recording')}
                    >
                      {isRecording ? '■' : '●'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Camera Status */}
            <div className="mt-4">
              {isWebcamReady ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">{t('camera-ready')}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {availableDevices.find(d => d.deviceId === selectedDeviceId)?.label || 'Default camera'}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-amber-600">
                    {webcamError ? t('camera-err') : t('camera-loading')}
                  </p>
                </div>
              )}
            </div>

            {/* Mode Selector */}
            <div className="flex gap-4 mt-6 justify-center">
              <Button
                variant={mode === 'photo' ? 'default' : 'outline'}
                onClick={() => setMode('photo')}
                disabled={!isWebcamReady}
                className={`${
                  mode === 'photo' 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                    : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <Camera className="mr-2 h-5 w-5" />
                {t('photo')}
              </Button>
              <Button
                variant={mode === 'video' ? 'default' : 'outline'}
                onClick={() => setMode('video')}
                disabled={!isWebcamReady}
                className={`${
                  mode === 'video' 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                    : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                }`}
              >
                <Video className="mr-2 h-5 w-5" />
                {t('video')}
              </Button>
            </div>
          </div>

          {/* Controls & Preview */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-center lg:text-left text-xl font-bold text-gray-800">{t('capture-option')}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={capturePhoto}
                  disabled={!isWebcamReady || mode !== 'photo' || !!capturedImage}
                  variant="outline"
                  className="h-auto py-4 border-rose-200 hover:bg-rose-50"
                >
                  <Camera className="w-6 h-6 mb-2 text-rose-600" />
                  <span>{t('take-photo')}</span>
                </Button>
                
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={!isWebcamReady || mode !== 'video'}
                  variant={isRecording ? 'destructive' : 'outline'}
                  className="h-auto py-4 border-rose-200 hover:bg-rose-50"
                >
                  <Video className="w-6 h-6 mb-2 text-rose-600" />
                  <span>{isRecording ? t('stop-recording') : t('start-recording')}</span>
                </Button>
              </div>

              {(capturedImage || recordedVideo) && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleUpload} 
                      className="bg-rose-500 hover:bg-rose-600 flex-1"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      {t('upload')}
                    </Button>
                    
                    <Button
                      onClick={downloadMedia}
                      className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 flex-1"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      {t('download')}
                    </Button>
                    
                    <Button
                      onClick={resetCapture}
                      variant="outline"
                      className="flex-1 border-rose-200 hover:bg-rose-50"
                    >
                      <RotateCw className="mr-2 h-5 w-5" />
                      {t('take-other')}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">{t('tips-title')}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>{t('tip-1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>{t('tip-2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>{t('tip-3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>{t('tip-4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}