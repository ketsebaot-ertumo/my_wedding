'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Share2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'

export default function QRCodeSection() {
  const [size, setSize] = useState(256)
  // const websiteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ketsi-azaria-wedding.com'
 const [websiteUrl, setWebsiteUrl] = useState<string >('');

  useEffect(() => {
    setWebsiteUrl(window.location.origin); // client-only
  }, []);


  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code')?.querySelector('canvas')
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'ketsi-azaria-wedding-qr.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      toast.success('QR Code downloaded!')
    }
  }

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ketsi & Azaria Wedding',
          text: 'Scan QR code to visit our wedding website!',
          url: websiteUrl,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(websiteUrl)
      toast.success('Link copied to clipboard!')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="glass-effect rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Smartphone className="w-8 h-8 text-rose-500" />
            <h2 className="text-3xl font-bold text-gray-800">Easy Access</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share this QR code with guests so they can easily access our wedding website
            from their phones and upload their photos & videos
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* QR Code Display */}
          <div className="flex-1">
            <div 
              id="qr-code" 
              className="bg-white p-6 rounded-xl shadow-lg inline-block"
            >
              <QRCodeSVG
                value={websiteUrl}
                size={size}
                level="H"
                includeMargin
                bgColor="#ffffff"
                fgColor="#e11d48"
                imageSettings={{
                  src: '/api/placeholder/400/300',
                  x: undefined,
                  y: undefined,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Scan me!</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-gray-600">Live QR Code</p>
                </div>
              </div>
            </div>

            {/* Size Controls */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                QR Code Size: {size}px
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800">How to Use:</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <span className="text-rose-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Scan QR Code</h4>
                    <p className="text-gray-600 text-sm">
                      Open your phone&apos;s camera and point it at the QR code
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Access Website</h4>
                    <p className="text-gray-600 text-sm">
                      Tap the notification to open our wedding website
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Share Memories</h4>
                    <p className="text-gray-600 text-sm">
                      Upload your photos and videos from the wedding
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button 
                onClick={downloadQRCode}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                <Download className="mr-2 h-5 w-5" />
                Download QR Code
              </Button>
              
              <Button 
                onClick={shareQRCode}
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Link
              </Button>
            </div>

            <div className="text-sm text-gray-500 pt-4 border-t">
              <p>Website URL:</p>
              <code className="block mt-1 p-2 bg-gray-50 rounded text-xs break-all">
                {websiteUrl}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}