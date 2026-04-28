'use client'

import { useTranslations } from 'next-intl';


export default function InviteTransition() {

    const t = useTranslations('wedding');

    return (
        <section className="snap-start bg-gray-900 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
            {/* <!-- Decorative line or divider --> */}
            <div className="flex justify-center items-center gap-4">
                <div className="h-px w-12 bg-rose-500/50"></div>
                <div className="text-gray-400 font-semibold text-sm tracking-widest">
                <span className="text-rose-500/50">✦</span> {t('section-message')} <span className="text-rose-500/50">✦</span> 
                </div>
                <div className="h-px w-12 bg-rose-500/50"></div>
            </div>

            {/* <!-- Optional: minimalist icon or date reminder --> */}
            <div className="mt-6 text-gray-400 text-sm italic">
                <span>{t('section-desc')}</span>
            </div>
            </div>
        </section>
    )
}