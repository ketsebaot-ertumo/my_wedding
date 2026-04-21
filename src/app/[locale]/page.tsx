'use client';
import HeroSection from '@/components/HeroSection'
import MediaUploader from '@/components/MediaUploader'
import MediaGallery from '@/components/MediaGallery'
import CameraCapture from '@/components/CameraCapture'
import QRCodeSection from '@/components/QRCodeSection'
import CountdownTimer from '@/components/CountdownTimer'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'

export default function Home() {
useEffect(() => {
  const ip = fetch('/api/user-ip')
    .then(res => res.json())
    .then(data => {
      console.log('User IP:', data.ip);
    });
}, []);


  return (
    <main className="min-h-screen">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'white',
            color: '#374151',
            border: '1px solid #e5e7eb',
          },
          success: {
            iconTheme: {
              primary: '#e11d48',
              secondary: 'white',
            },
          },
        }}
      />
      
      <Navigation />
      
      <div className="pt-12">
        <section id="home">
          <HeroSection />
        </section>

        <section id="upload" className="py-20 bg-gradient-to-b from-white to-rose-50">
          <MediaUploader />
        </section>

        <section id="gallery" className="py-20 bg-white">
          <MediaGallery />
        </section>

        <section id="capture" className="py-20 bg-gradient-to-b from-rose-50 to-white">
          <CameraCapture />
        </section>

        <section id="qr" className="py-20 bg-white">
          <QRCodeSection />
        </section>

        <section id="countdown" className="py-20 bg-gradient-to-b from-white to-rose-50">
          <CountdownTimer />
        </section>
      </div>

      <Footer />
    </main>
  )
}