'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Share2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl';

export default function QRCodeSection() {
  const t = useTranslations('wedding');
  const [size, setSize] = useState(256);
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
            <h2 className="text-3xl font-bold text-gray-800">{t('qr-code-title')}</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('qr-code-desc')}
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
                  src: 'https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240122/my_wedding/wedding1_sstnfp.jpg',
                  x: undefined,
                  y: undefined,
                  height: 32,
                  width: 32,
                  excavate: true,
                }}
              />
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500 mb-1">{t('qr-scan-title')}!</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-xs text-gray-600">{t('qr-code-live')}</p>
                </div>
              </div>
            </div>

            {/* Size Controls */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('qr-code-size')}: {size}px
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
              <h3 className="text-xl font-bold text-gray-800">{t('qr-code-use')} :</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                    <span className="text-rose-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('qr-code-scan')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t('qr-code-scan-desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('qr-code-access')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t('qr-code-access-desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{t('qr-code-share-memory')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t('qr-code-share-memory-desc')}
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
                {t('qr-code-download')}
              </Button>
              
              <Button 
                onClick={shareQRCode}
                variant="outline"
                className="border-rose-300 text-rose-600 hover:bg-rose-50"
              >
                <Share2 className="mr-2 h-5 w-5" />
                {t('qr-code-share')}
              </Button>
            </div>

            {/* <div className="text-sm text-gray-500 pt-4 border-t">
              <p>Website URL:</p>
              <code className="block mt-1 p-2 bg-gray-50 rounded text-xs break-all">
                {websiteUrl}
              </code>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}