// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { Heart } from 'lucide-react'

// export default function RomanticLightBeam() {
//   const [isVisible, setIsVisible] = useState(false)
//   const sectionRef = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setIsVisible(true)
//       },
//       { threshold: 0.3 }
//     )
//     if (sectionRef.current) observer.observe(sectionRef.current)
//     return () => observer.disconnect()
//   }, [])

//   return (
//     <section ref={sectionRef} className="relative py-20 bg-gray-950 overflow-hidden">
      
//       {/* Soft Light Beams from Center */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="relative w-full max-w-2xl h-64">
//           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-rose-500/15 rounded-full blur-3xl transition-all duration-1000 ${
//             isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
//           }`} />
//           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/8 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
//             isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
//           }`} />
//         </div>
//       </div>

//       <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        
//         {/* Delicate Line Ornament */}
//         <div className={`flex justify-center gap-2 mb-6 transition-all duration-700 ${
//           isVisible ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className="w-12 h-px bg-gradient-to-r from-transparent to-rose-400/60" />
//           <Heart className="w-3 h-3 text-rose-400/60" />
//           <div className="w-12 h-px bg-gradient-to-l from-transparent to-rose-400/60" />
//         </div>

//         {/* Main Message */}
//         <div className={`space-y-6 transition-all duration-700 delay-200 ${
//           isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
//         }`}>
//           <p className="text-rose-400/60 text-sm tracking-[0.3em] uppercase">
//             Through your eyes
//           </p>
          
//           <h2 className="text-3xl md:text-5xl font-light text-white/90 leading-tight">
//             Every moment you capture
//             <br />
//             <span className="text-rose-400/80 font-serif">becomes our treasure</span>
//           </h2>
          
//           <div className="w-16 h-px bg-rose-500/30 mx-auto my-6" />
          
//           <p className="text-gray-400 text-base max-w-md mx-auto leading-relaxed">
//             Your photos complete our story. 
//             Share the joy you saw, the laughter you heard, 
//             and the love you felt.
//           </p>
          
//           {/* Delicate Button */}
//           <button className="group mt-8 inline-flex items-center gap-3 px-8 py-3 bg-transparent hover:bg-white/5 border border-gray-400 rounded-full text-white/70 hover:text-rose-400 text-sm transition-all duration-300">
//             <span>Share your memories</span>
//             <span className="text-rose-400/60 group-hover:translate-x-1 transition-transform">→</span>
//           </button>
//         </div>

//         {/* Bottom Ornament */}
//         {/* <div className={`flex justify-center gap-2 mt-12 transition-all duration-700 delay-500 ${
//           isVisible ? 'opacity-100' : 'opacity-0'
//         }`}>
//           <div className="w-8 h-px bg-rose-400/60" />
//           <div className="w-1 h-1 rounded-full bg-rose-400/60" />
//           <div className="w-8 h-px bg-rose-400/60" />
//         </div> */}
//       </div>
//     </section>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart } from 'lucide-react'

export default function LoveLetterTransition() {
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
            Dearest guests
          </p>
          
          <p className="text-white/60 text-base leading-loose">
            You saw our wedding through your own beautiful eyes. 
            The tears, the laughter, the dances, the hugs — 
            moments we couldn't see because we were lost in each other.
          </p>
          
          <p className="text-white/80 text-lg italic font-light">
            Won't you share what you saw?
          </p>
          
          <div className="pt-4">
            <button onClick={() => (window.location.href = '/#upload')} className="inline-flex items-center gap-2 group px-8 py-3 bg-transparent hover:bg-white/5 border border-rose-400  hover:border-rose-400 rounded-full text-rose-400/80 hover:text-rose-400 text-sm transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Upload Your Photos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}