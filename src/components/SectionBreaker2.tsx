// 'use client'

// import { useTranslations } from 'next-intl';
// import { Heart, Star } from 'lucide-react';

// export default function SectionTransition() {
//     const t = useTranslations('wedding');

//     return (
//         <section className="snap-start bg-gradient-to-b from-gray-900 to-gray-950 py-20 md:py-28">
//             <div className="container mx-auto px-4 text-center">
//                 {/* Animated hearts decoration */}
//                 <div className="flex justify-center items-center gap-3 mb-8">
//                     <Heart className="w-4 h-4 text-rose-500/60 animate-pulse" />
//                     <Heart className="w-5 h-5 text-rose-500/80" />
//                     <Heart className="w-4 h-4 text-rose-500/60 animate-pulse" />
//                 </div>
                
//                 {/* Main thank you message */}
//                 <div className="max-w-3xl mx-auto space-y-6">
//                     <h2 className="text-3xl md:text-4xl font-serif text-white/90 tracking-wide">
//                         Thank You
//                     </h2>
                    
//                     <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light italic">
//                         "For making our day even more special with your presence"
//                     </p>
                    
//                     <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent mx-auto my-8" />
                    
//                     <p className="text-white/60 text-base md:text-lg leading-loose max-w-2xl mx-auto">
//                         Your love, laughter, and blessings have become 
//                         the most beautiful pages in our story. 
//                         We're forever grateful to have you in our lives.
//                     </p>
//                 </div>

//                 {/* Decorative divider */}
//                 <div className="flex justify-center items-center gap-4 mt-12">
//                     <div className="h-px w-12 bg-rose-500/30"></div>
//                     <div className="text-gray-500 font-light text-sm tracking-widest">
//                         <span className="text-rose-500/40">✧</span> with love <span className="text-rose-500/40">✧</span>
//                     </div>
//                     <div className="h-px w-12 bg-rose-500/30"></div>
//                 </div>
//             </div>
//         </section>
//     )
// }

'use client'

import { useTranslations } from 'next-intl';
import { Heart, ArrowRight } from 'lucide-react';

export default function SectionTransition() {
    const t = useTranslations('wedding');

    return (
        <section className="snap-start bg-gradient-to-b from-gray-900 to-gray-950 py-20 md:py-28">
            <div className="container mx-auto px-4 text-center">
                {/* Animated hearts decoration */}
                <div className="flex justify-center items-center gap-3 mb-8">
                    <Heart className="w-4 h-4 text-rose-500/60 animate-pulse" />
                    <Heart className="w-5 h-5 text-rose-500/80" />
                    <Heart className="w-4 h-4 text-rose-500/60 animate-pulse" />
                </div>
                
                {/* Main message - change tense to transitional */}
                <div className="max-w-3xl mx-auto space-y-6">
                    <p className="text-rose-400/70 text-sm tracking-[0.3em] uppercase">
                        A Moment to Remember
                    </p>
                    
                    <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light font-serif italic">
                        "Every story has a beginning... and ours continues with you"
                    </p>
                    
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent mx-auto my-8" />
                    
                    <p className="text-white/60 text-base md:text-lg leading-loose max-w-2xl mx-auto">
                        Take a moment to feel the love before we continue our celebration.
                    </p>
                </div>

                {/* Forward-moving button instead of decorative divider */}
                <button 
                    onClick={() => {
                        const nextSection = document.getElementById('gallery');
                        nextSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group mt-12 inline-flex items-center gap-2 text-rose-400/80 hover:text-rose-400 text-sm transition-all border border-rose-400/80 hover:border-rose-400 rounded-full p-2 px-4"
                >
                    <span>Continue to Gallery</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    )
}