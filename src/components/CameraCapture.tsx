// 'use client'

// import { useState, useRef, useCallback, useEffect } from 'react'
// import Webcam from 'react-webcam'
// import { Camera, Video, Download, RotateCw, Circle, Upload } from 'lucide-react'
// import { Button } from '@/components/ui/button'

// export default function CameraCapture() {
//   const [mode, setMode] = useState<'photo' | 'video'>('photo')
//   const [capturedImage, setCapturedImage] = useState<string | null>(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
//    const [isWebcamReady, setIsWebcamReady] = useState(false)
  
//   const webcamRef = useRef<Webcam>(null)
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
//   const chunksRef = useRef<Blob[]>([])
  
//   // Add webcam readiness handler
//   const handleUserMedia = () => {
//     setIsWebcamReady(true)
//   }

//   async function uploadMedia(blob: Blob, type: string, filename: string) {
//     // 1️⃣ Get signed URL from backend
//     const res = await fetch(`/api/media/sign?filename=${filename}&type=${type}`);
//     const { signedUrl, cdnUrl, key } = await res.json();

//     // 2️⃣ Upload to Cloudflare R2
//     await fetch(signedUrl, {
//       method: "PUT",
//       headers: { "Content-Type": type },
//       body: blob,
//     });

//     return cdnUrl;
//   }

//   const handleUpload = async () => {
//     try {
//       if (capturedImage) {
//         // Convert base64 to Blob
//         const res = await fetch(capturedImage);
//         const blob = await res.blob();
//         const url = await uploadMedia(blob, "image/jpeg", `photo-${Date.now()}.jpg`);
//         alert("Uploaded! View at: " + url);
//         setCapturedImage(null);
//       } else if (recordedVideo) {
//         const blob = await fetch(recordedVideo).then(r => r.blob());
//         const url = await uploadMedia(blob, "video/webm", `video-${Date.now()}.webm`);
//         alert("Uploaded! View at: " + url);
//         setRecordedVideo(null);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//   };

//   useEffect(() => {
//   // Check camera permissions
//   navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => {
//       console.log("Camera access granted")
//       stream.getTracks().forEach(track => track.stop())
//     })
//     .catch(err => {
//       console.error("Camera access denied:", err)
//     })
// }, [])

//   // const capturePhoto = useCallback(() => {
//   //   if (webcamRef.current && webcamRef.current.getScreenshot) {
//   //     const imageSrc = webcamRef.current.getScreenshot();
//   //     if (imageSrc) setCapturedImage(imageSrc);
//   //     else console.log("Webcam not ready yet");
//   //   }
//   // }, [webcamRef]);

//   const capturePhoto = useCallback(() => {
//     if (!isWebcamReady) {
//       console.log("Webcam not ready yet.")
//       return
//     }
    
//     if (webcamRef.current && webcamRef.current.getScreenshot) {
//       const imageSrc = webcamRef.current.getScreenshot()
//       if (imageSrc) {
//         setCapturedImage(imageSrc)
//       } else {
//         console.log("Failed to capture image")
//       }
//     }
//   }, [webcamRef, isWebcamReady])


//   const startRecording = () => {
//     if (webcamRef.current?.stream) {
//       // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream)
//       mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType: 'video/webm; codecs=vp8,opus' })
//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data)
//         }
//       }
//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: 'video/webm' })
//         const videoUrl = URL.createObjectURL(blob)
//         setRecordedVideo(videoUrl)
//         chunksRef.current = []
//       }
//       mediaRecorderRef.current.start()
//       setIsRecording(true)
//     }
//   }

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop()
//     setIsRecording(false)
//   }

//   const downloadMedia = () => {
//     if (capturedImage) {
//       const link = document.createElement('a')
//       link.href = capturedImage
//       link.download = `wedding-photo-${Date.now()}.jpg`
//       link.click()
//     } else if (recordedVideo) {
//       const link = document.createElement('a')
//       link.href = recordedVideo
//       link.download = `wedding-video-${Date.now()}.webm`
//       link.click()
//     }
//   }

//   const resetCapture = () => {
//     setCapturedImage(null)
//     setRecordedVideo(null)
//   }

//   const videoConstraints = {
//     width: 640,
//     height: 480,
//     facingMode: "user"
//   }
//   // const videoConstraints = {
//   //   width: 1280,
//   //   height: 720,
//   //   facingMode: "user"
//   // }

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6">
//       <div className="glass-effect rounded-2xl p-8">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 mb-4">
//             <Camera className="w-8 h-8 text-rose-500" />
//             <h2 className="text-3xl font-bold text-gray-800">Capture Moments</h2>
//           </div>
//           <p className="text-gray-600">
//             Take photos or record videos directly from your device
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Camera Preview */}
//           <div className="flex-1">
//             <div className="relative rounded-xl overflow-hidden bg-black">
//               {!capturedImage && !recordedVideo ? (
//                 <Webcam
//                   audio={mode === 'video'}
//                   ref={webcamRef}
//                   screenshotFormat="image/jpeg"
//                   videoConstraints={videoConstraints}
//                   className="w-full h-auto"
//                 />
//               ) : capturedImage ? (
//                 <img
//                   src={capturedImage}
//                   alt="Captured"
//                   className="w-full h-auto"
//                 />
//               ) : (
//                 <video
//                   src={recordedVideo || ''}
//                   controls
//                   className="w-full h-auto"
//                 />
//               )}
              
//               {/* Capture overlay */}
//               <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
//                 {mode === 'photo' ? (
//                   <button
//                     onClick={capturePhoto}
//                     className="w-16 h-16 rounded-full bg-white border-4 border-rose-500 flex items-center justify-center hover:scale-110 transition-transform"
//                   >
//                     <Circle className="w-8 h-8 text-rose-500" />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={isRecording ? stopRecording : startRecording}
//                     className={`w-16 h-16 rounded-full flex items-center justify-center ${
//                       isRecording 
//                         ? 'bg-red-500 hover:bg-red-600' 
//                         : 'bg-rose-500 hover:bg-rose-600'
//                     } text-white transition-all`}
//                   >
//                     {isRecording ? '■' : '●'}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Mode Selector */}
//             <div className="flex gap-4 mt-6 justify-center">
//               <Button
//                 variant={mode === 'photo' ? 'default' : 'outline'}
//                 onClick={() => setMode('photo')}
//                 className={mode === 'photo' ? 'bg-rose-500 hover:bg-rose-600' : ''}
//               >
//                 <Camera className="mr-2 h-5 w-5" />
//                 Photo
//               </Button>
//               <Button
//                 variant={mode === 'video' ? 'default' : 'outline'}
//                 onClick={() => setMode('video')}
//                 className={mode === 'video' ? 'bg-rose-500 hover:bg-rose-600' : ''}
//               >
//                 <Video className="mr-2 h-5 w-5" />
//                 Video
//               </Button>
//             </div>
//           </div>

//           {/* Controls & Preview */}
//           <div className="flex-1 space-y-6">
//             <div className="space-y-4">
//               <h3 className="text-xl font-bold text-gray-800">Capture Options</h3>
              
//               <div className="grid grid-cols-2 gap-4">
//                 <Button
//                   onClick={capturePhoto}
//                   disabled={mode !== 'photo' || !!capturedImage}
//                   variant="outline"
//                   className="h-auto py-4"
//                 >
//                   <Camera className="w-6 h-6 mb-2" />
//                   <span>Take Photo</span>
//                 </Button>
                
//                 <Button
//                   onClick={isRecording ? stopRecording : startRecording}
//                   disabled={mode !== 'video'}
//                   variant={isRecording ? 'destructive' : 'outline'}
//                   className="h-auto py-4"
//                 >
//                   <Video className="w-6 h-6 mb-2" />
//                   <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
//                 </Button>
//               </div>

//               {(capturedImage || recordedVideo) && (
//                 <div className="space-y-4">
//                   <div className="flex gap-3">
//                     <Button onClick={handleUpload} className="bg-rose-500 hover:bg-rose-600 flex-1">
//                       <Upload className="mr-2 h-5 w-5" />
//                       Upload
//                     </Button>

//                     {/* <Button
//                       onClick={downloadMedia}
//                       className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 flex-1"
//                     >
//                       <Download className="mr-2 h-5 w-5" />
//                       Download
//                     </Button> */}
                    
//                     <Button
//                       onClick={resetCapture}
//                       variant="outline"
//                       className="flex-1"
//                     >
//                       <RotateCw className="mr-2 h-5 w-5" />
//                       Take Another
//                     </Button>
//                   </div>
                  
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-600">
//                       {capturedImage 
//                         ? 'Your photo is ready! Download it or take another one.'
//                         : 'Your video is ready! Download it or record another one.'}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Instructions */}
//             <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
//               <h4 className="font-bold text-gray-800 mb-3">Tips for Great Captures:</h4>
//               <ul className="space-y-2 text-sm text-gray-600">
//                 <li className="flex items-start gap-2">
//                   <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
//                   <span>Ensure good lighting for better quality</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
//                   <span>Hold your device steady while capturing</span>
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
//                   <span>Smile and capture the joy of the moment!</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// // 'use client'

// // import { useState, useRef, useCallback, useEffect } from 'react'
// // import Webcam from 'react-webcam'
// // import { Camera, Video, Download, RotateCw, Circle, Upload, AlertCircle } from 'lucide-react'
// // import { Button } from '@/components/ui/button'

// // export default function CameraCapture() {
// //   const [mode, setMode] = useState<'photo' | 'video'>('photo')
// //   const [capturedImage, setCapturedImage] = useState<string | null>(null)
// //   const [isRecording, setIsRecording] = useState(false)
// //   const [recordedVideo, setRecordedVideo] = useState<string | null>(null)
// //   const [isWebcamReady, setIsWebcamReady] = useState(false)
// //   const [webcamError, setWebcamError] = useState<string | null>(null)
  
// //   const webcamRef = useRef<Webcam>(null)
// //   const mediaRecorderRef = useRef<MediaRecorder | null>(null)
// //   const chunksRef = useRef<Blob[]>([])

// //   // Handle webcam initialization
// //   const handleUserMedia = () => {
// //     console.log("Webcam stream received")
// //     setIsWebcamReady(true)
// //     setWebcamError(null)
// //   }

// //   const handleUserMediaError = (error: string | DOMException) => {
// //     console.error("Webcam error:", error)
// //     setIsWebcamReady(false)
// //     setWebcamError(error.toString())
// //   }

// //   const capturePhoto = useCallback(() => {
// //     if (!webcamRef.current) {
// //       console.log("Webcam ref not available")
// //       setWebcamError("Camera not initialized")
// //       return
// //     }

// //     if (!isWebcamReady) {
// //       console.log("Webcam not ready")
// //       setWebcamError("Camera is still loading...")
// //       return
// //     }

// //     try {
// //       const imageSrc = webcamRef.current.getScreenshot()
// //       console.log("Capture result:", imageSrc ? "Success" : "Failed")
      
// //       if (imageSrc) {
// //         setCapturedImage(imageSrc)
// //         setWebcamError(null)
// //       } else {
// //         setWebcamError("Failed to capture image. Try again.")
// //       }
// //     } catch (error) {
// //       console.error("Capture error:", error)
// //       setWebcamError("Capture failed: " + error)
// //     }
// //   }, [isWebcamReady])

// //   const startRecording = () => {
// //     if (!webcamRef.current?.stream) {
// //       setWebcamError("No camera stream available")
// //       return
// //     }

// //     try {
// //       const stream = webcamRef.current.stream
// //       console.log("Stream active:", stream.active)
// //       console.log("Stream tracks:", stream.getTracks().map(t => t.kind))

// //       // Check if we have video tracks
// //       const videoTracks = stream.getVideoTracks()
// //       if (videoTracks.length === 0) {
// //         setWebcamError("No video track available in stream")
// //         return
// //       }

// //       const options = { 
// //         mimeType: 'video/webm;codecs=vp9,opus',
// //         videoBitsPerSecond: 2500000 // 2.5 Mbps
// //       }
      
// //       let mimeType = 'video/webm'
// //       if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
// //         mimeType = 'video/webm;codecs=vp9'
// //       } else if (MediaRecorder.isTypeSupported('video/mp4')) {
// //         mimeType = 'video/mp4'
// //       }

// //       mediaRecorderRef.current = new MediaRecorder(stream, { mimeType })
      
// //       mediaRecorderRef.current.ondataavailable = (event) => {
// //         if (event.data && event.data.size > 0) {
// //           chunksRef.current.push(event.data)
// //         }
// //       }
      
// //       mediaRecorderRef.current.onstop = () => {
// //         const blob = new Blob(chunksRef.current, { type: mimeType })
// //         const videoUrl = URL.createObjectURL(blob)
// //         setRecordedVideo(videoUrl)
// //         chunksRef.current = []
// //       }
      
// //       mediaRecorderRef.current.onerror = (event) => {
// //         console.error("MediaRecorder error:", event)
// //         setWebcamError("Recording failed: " + event)
// //       }
      
// //       mediaRecorderRef.current.start(1000) // Collect data every second
// //       setIsRecording(true)
// //       setWebcamError(null)
// //     } catch (error) {
// //       console.error("Start recording error:", error)
// //       setWebcamError("Failed to start recording: " + error)
// //     }
// //   }

// //   const stopRecording = () => {
// //     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
// //       mediaRecorderRef.current.stop()
// //       setIsRecording(false)
// //     }
// //   }

// //   // Add a manual retry function
// //   const retryWebcam = async () => {
// //     setIsWebcamReady(false)
// //     setWebcamError(null)
    
// //     // Force reload by remounting component
// //     if (webcamRef.current?.stream) {
// //       webcamRef.current.stream.getTracks().forEach(track => track.stop())
// //     }
    
// //     // Small delay to let tracks stop
// //     setTimeout(() => {
// //       setIsWebcamReady(false)
// //       setWebcamError("Please wait for camera to reload...")
// //     }, 100)
// //   }

// //   // Video constraints - simpler is better
// //   const videoConstraints = {
// //     width: { ideal: 1280 },
// //     height: { ideal: 720 },
// //     facingMode: "user",
// //     frameRate: { ideal: 30, min: 15 }
// //   }

// //   return (
// //     <div className="w-full max-w-4xl mx-auto p-6">
// //       <div className="glass-effect rounded-2xl p-8">
// //         <div className="text-center mb-8">
// //           <div className="inline-flex items-center gap-2 mb-4">
// //             <Camera className="w-8 h-8 text-rose-500" />
// //             <h2 className="text-3xl font-bold text-gray-800">Capture Moments</h2>
// //           </div>
// //           <p className="text-gray-600">
// //             Take photos or record videos directly from your device
// //           </p>
// //         </div>

// //         {/* Error Display */}
// //         {webcamError && (
// //           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
// //             <div className="flex items-center gap-3">
// //               <AlertCircle className="w-5 h-5 text-red-500" />
// //               <div className="flex-1">
// //                 <p className="text-red-700 font-medium">Camera Error</p>
// //                 <p className="text-red-600 text-sm">{webcamError}</p>
// //               </div>
// //               <Button 
// //                 variant="outline" 
// //                 size="sm"
// //                 onClick={retryWebcam}
// //                 className="border-red-300 text-red-700 hover:bg-red-50"
// //               >
// //                 Retry
// //               </Button>
// //             </div>
// //           </div>
// //         )}

// //         <div className="flex flex-col lg:flex-row gap-8">
// //           {/* Camera Preview */}
// //           <div className="flex-1">
// //             <div className="relative rounded-xl overflow-hidden bg-black min-h-[400px] flex items-center justify-center">
// //               {!capturedImage && !recordedVideo ? (
// //                 <>
// //                   <Webcam
// //                     audio={mode === 'video'}
// //                     ref={webcamRef}
// //                     screenshotFormat="image/jpeg"
// //                     videoConstraints={videoConstraints}
// //                     className="w-full h-auto"
// //                     onUserMedia={handleUserMedia}
// //                     onUserMediaError={handleUserMediaError}
// //                     screenshotQuality={0.92}
// //                     forceScreenshotSourceSize={true}
// //                     mirrored={true}
// //                   />
                  
// //                   {!isWebcamReady && !webcamError && (
// //                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
// //                       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mb-4"></div>
// //                       <p className="text-white">Initializing camera...</p>
// //                       <p className="text-gray-400 text-sm mt-2">Please allow camera access if prompted</p>
// //                     </div>
// //                   )}
// //                 </>
// //               ) : capturedImage ? (
// //                 <img
// //                   src={capturedImage}
// //                   alt="Captured"
// //                   className="w-full h-auto"
// //                 />
// //               ) : (
// //                 <video
// //                   src={recordedVideo || ''}
// //                   controls
// //                   controlsList="nodownload"
// //                   className="w-full h-auto"
// //                 />
// //               )}
              
// //               {/* Capture overlay - Only show when webcam is ready */}
// //               {isWebcamReady && !capturedImage && !recordedVideo && (
// //                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
// //                   {mode === 'photo' ? (
// //                     <button
// //                       onClick={capturePhoto}
// //                       className="w-16 h-16 rounded-full bg-white border-4 border-rose-500 flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
// //                       title="Take photo"
// //                     >
// //                       <Circle className="w-8 h-8 text-rose-500" />
// //                     </button>
// //                   ) : (
// //                     <button
// //                       onClick={isRecording ? stopRecording : startRecording}
// //                       className={`w-16 h-16 rounded-full flex items-center justify-center ${
// //                         isRecording 
// //                           ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
// //                           : 'bg-rose-500 hover:bg-rose-600'
// //                       } text-white transition-all active:scale-95`}
// //                       title={isRecording ? 'Stop recording' : 'Start recording'}
// //                     >
// //                       {isRecording ? '■' : '●'}
// //                     </button>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Status Indicator */}
// //             <div className="mt-4 flex items-center justify-between">
// //               <div className="flex items-center gap-2">
// //                 <div className={`w-3 h-3 rounded-full ${isWebcamReady ? 'bg-green-500' : 'bg-amber-500'}`}></div>
// //                 <span className="text-sm text-gray-600">
// //                   {isWebcamReady ? 'Camera ready' : 'Camera initializing...'}
// //                 </span>
// //               </div>
              
// //               {isWebcamReady && (
// //                 <Button
// //                   variant="ghost"
// //                   size="sm"
// //                   onClick={retryWebcam}
// //                   className="text-gray-500 hover:text-gray-700"
// //                 >
// //                   <RotateCw className="w-4 h-4 mr-1" />
// //                   Reload Camera
// //                 </Button>
// //               )}
// //             </div>

// //             {/* Mode Selector */}
// //             <div className="flex gap-4 mt-6 justify-center">
// //               <Button
// //                 variant={mode === 'photo' ? 'default' : 'outline'}
// //                 onClick={() => setMode('photo')}
// //                 disabled={!isWebcamReady}
// //                 className={mode === 'photo' ? 'bg-rose-500 hover:bg-rose-600' : ''}
// //               >
// //                 <Camera className="mr-2 h-5 w-5" />
// //                 Photo
// //               </Button>
// //               <Button
// //                 variant={mode === 'video' ? 'default' : 'outline'}
// //                 onClick={() => setMode('video')}
// //                 disabled={!isWebcamReady}
// //                 className={mode === 'video' ? 'bg-rose-500 hover:bg-rose-600' : ''}
// //               >
// //                 <Video className="mr-2 h-5 w-5" />
// //                 Video
// //               </Button>
// //             </div>
// //           </div>

// //           {/* Rest of your component remains the same */}
// //           {/* ... */}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }



'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Camera, Video, Download, RotateCw, Circle, Upload, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import uploadFiles from '@/hooks/uploadFiles'

export default function CameraCapture() {
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
    console.log("✅ Webcam stream received")
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
      console.log("📸 Capture result:", imageSrc ? "Success" : "Failed")
      
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
        videoBitsPerSecond: 2500000
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
      setIsRecording(true)
      setWebcamError(null)
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
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: "user"
  }

  // Test basic camera access separately
  const testCameraAccess = async () => {
    try {
      setWebcamError("Testing camera access...")
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      console.log("✅ Basic camera test passed")
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
        filename = `ak-wedding-photo-${Date.now()}.jpg`
        file = new File([blob], filename, { type: 'image/jpeg' })
        type = 'image'
      } else if (recordedVideo) {
        const res = await fetch(recordedVideo)
        const blob = await res.blob()
        filename = `ak-wedding-video-${Date.now()}.webm`
        file = new File([blob], filename, { type: 'video/webm' })
        type = 'video'
      }

      if (!file) {
        throw new Error('No media to upload')
      }

      // CALL YOUR UPLOAD FILES FUNCTION
      const result = await uploadFiles(file)
      console.log('Upload result2:', result)
      
      console.log('Upload successful:', result)
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
              Capture Moments
            </h2>
          </div>
          <p className="text-gray-600">
            Take photos or record videos directly from your device
          </p>
        </div>

        {/* Camera Selection (if multiple cameras) */}
        {availableDevices.length > 1 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Camera:
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
                  {device.label || `Camera ${availableDevices.indexOf(device) + 1}`}
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
                <p className="text-red-700 font-medium">Camera Error</p>
                <p className="text-red-600 text-sm">{webcamError}</p>
                <div className="flex gap-3 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={retryWebcam}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Retry Camera
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={testCameraAccess}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Test Camera Access
                  </Button>
                </div>
              </div>
              <button
                onClick={() => setWebcamError(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>h-
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Camera Preview */}
          <div className="flex-1">
            <div className="relative rounded-xl overflow-hidden bg-black min-h-[300px] sm:min-h-[340px] flex items-center justify-center">
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
                      <p className="text-white">Initializing camera...</p>
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
                      title="Take photo"
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
                      title={isRecording ? 'Stop recording' : 'Start recording'}
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
                    <span className="text-sm text-green-600 font-medium">Camera ready</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {availableDevices.find(d => d.deviceId === selectedDeviceId)?.label || 'Default camera'}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-amber-600">
                    {webcamError ? 'Camera error - see above' : 'Camera loading...'}
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
                Photo
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
                Video
              </Button>
            </div>
          </div>

          {/* Controls & Preview */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-center lg:text-left text-xl font-bold text-gray-800">Capture Options</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={capturePhoto}
                  disabled={!isWebcamReady || mode !== 'photo' || !!capturedImage}
                  variant="outline"
                  className="h-auto py-4 border-rose-200 hover:bg-rose-50"
                >
                  <Camera className="w-6 h-6 mb-2 text-rose-600" />
                  <span>Take Photo</span>
                </Button>
                
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={!isWebcamReady || mode !== 'video'}
                  variant={isRecording ? 'destructive' : 'outline'}
                  className="h-auto py-4 border-rose-200 hover:bg-rose-50"
                >
                  <Video className="w-6 h-6 mb-2 text-rose-600" />
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
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
                      Upload
                    </Button>
                    
                    <Button
                      onClick={downloadMedia}
                      className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 flex-1"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                    
                    <Button
                      onClick={resetCapture}
                      variant="outline"
                      className="flex-1 border-rose-200 hover:bg-rose-50"
                    >
                      <RotateCw className="mr-2 h-5 w-5" />
                      Take Another
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-3">Troubleshooting Tips:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>Make sure your camera is connected and not in use by another app</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>Allow camera permissions when prompted by your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>If using a laptop, check if the camera is physically covered</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-1.5" />
                  <span>Try refreshing the page if camera doesn't load</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}