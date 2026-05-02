'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'
import { useTranslations } from 'next-intl';


export default function LoveLetterTransition() {
  const t = useTranslations('wedding');
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 bg-gray-950">
      
      {/* Subtle Border Frame */}
      <div className="absolute inset-x-8 md:inset-x-16 top-1/2 -translate-y-1/2 h-48 border-y border-white/5" />
      
      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">
        
        {/* Heart Decoration */}
        <div className={`flex justify-center mb-8 transition-all duration-700 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}>
          <Heart className="w-8 h-8 text-rose-400/80" />
        </div>

        {/* Message */}
        <div className={`space-y-5 transition-all duration-700 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-rose-400/80 text-base tracking-[0.3em] uppercase font-serif">
            {t('section-b-title')}
          </p>
          
          <p className="text-white/60 text-base leading-loose">
            {t('section-b-desc-1')}
          </p>
          
          <p className="text-white/80 text-lg italic font-light">
            {t('section-b-desc-2')}
          </p>
          
          <div className="pt-4">
            <button onClick={() => (window.location.href = '/#upload')} className="inline-flex items-center gap-2 group px-8 py-3 bg-transparent hover:bg-white/5 border border-rose-400  hover:border-rose-400 rounded-full text-rose-400/80 hover:text-rose-400 text-sm transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{t('section-b-button')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}