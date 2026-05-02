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
                        {t('section-2-title')}
                    </p>
                    
                    <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light font-serif italic">
                        {t('section-2-desc-1')}
                    </p>
                    
                    {/* <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-400/60 to-transparent mx-auto my-8" /> */}
                    
                    <p className="text-white/60 text-base md:text-md leading-loose max-w-2xl mx-auto">
                        {t('section-2-desc-2')}
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
                    <span>{t('section-2-button')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    )
}