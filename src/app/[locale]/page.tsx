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
import { useEffect, useRef } from 'react'
import Timeline from '@/components/Timeline';
import OurStory from '@/components/ourStory';
import LoveLetterTransition from '@/components/SectionBreaker';
import InviteTransition from '@/components/invite/SectionBreaker';
import SectionTransition from '@/components/SectionBreaker2';

export default function Home() {
  useEffect(() => {
    const ip = fetch('/api/user-ip')
      .then(res => res.json())
      .then(data => {
        console.log('User IP:', data.ip);
      });
  }, []);

   const galleryRef = useRef<{ refetch?: () => void } | null>(null)
  // const galleryRef = useRef(null)
  
  const handleUploadSuccess = () => {
    // Trigger gallery refresh
    if (galleryRef.current?.refetch) {
      galleryRef.current.refetch()
    }
  }


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
      
      <div className="flex flex-col gap-">
        <section id="home">
          <HeroSection />
        </section>

        {/* <div><LoveLetterTransition/></div> */}

        <div id='schedule'><Timeline /></div>

        <section id='story'>
          <OurStory />
        </section>

        {/* <section id="gallery" className="bg-white">
          <MediaGallery />
        </section> */}
        <section id="gallery" className="bg-white">
          <MediaGallery ref={galleryRef} />
        </section>


        <section id="capture" className="bg-gradient-to-b from-rose-50 via-white to-rose-50">
          <CameraCapture />
        </section>
      
        <div><LoveLetterTransition/></div>

        {/* <section id="upload" className="bg-gradient-to-b from-white to-rose-50">
          <MediaUploader />
        </section> */}
        <section id="upload" className="bg-gradient-to-b from-white to-rose-50">
          <MediaUploader onUploadSuccess={handleUploadSuccess} />
        </section>

        <section><SectionTransition /></section>

        <section id="qr" className="bg-white">
          <QRCodeSection />
        </section>

      </div>

      <Footer />
    </main>
  )
}