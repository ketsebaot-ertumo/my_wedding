import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

// const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ketsi-azaria-wedding.com';

import { Mea_Culpa } from 'next/font/google'

const meaCulpa = Mea_Culpa({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mea-culpa',
})

import { Imperial_Script } from 'next/font/google'

const imperialScript = Imperial_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-imperial',
})


export const metadata: Metadata = {
  metadataBase: new URL('https://ketsi-azaria-wedding.vercel.appp'),
  title: {
    default: "Ketsi & Azaria Wedding",
    template: "%s | Ketsi & Azaria Wedding"
  },
  // title: 'Ketsi & Azaria Wedding - Share Your Memories',
  description: 'Join us in celebrating our special day. Upload, view, and share photos and videos from our wedding.',
  icons: {
    icon: '/logo.png',
  },
  keywords: ['wedding', 'photos', 'videos', 'memories', 'Ketsi', 'Azaria'],
  authors: [{ name: 'Ketsi & Azaria', url: 'https://ketsi-azaria-wedding.vercel.app' }],
  creator: 'Ketsebaot Ertumo',
  openGraph: {
    title: "Ketsi & Azaria Wedding",
    description: "Share your memories from our special day",
    url: 'https://ketsi-azaria-wedding.vercel.app',
    siteName: "Ketsi & Azaria Wedding",
    images: [
      {
        url: "https://res.cloudinary.com/dxuvdtoqa/image/upload/v1754380766/pms_logo_njhpqw.png", 
        width: 1200,
        height: 630,
        alt: "Ketsi & Azaria Wedding",
         type: "image/png"
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ketsi & Azaria Wedding",
    description: "Share your memories from our special day",
    images: [
      {
        url: "https://res.cloudinary.com/dxuvdtoqa/image/upload/v1754380766/pms_logo_njhpqw.png",
        width: 1200,
        height: 630,
        alt: "Ketsi & Azaria Wedding",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      {/* <body className={inter.className}> */}
      <body className={`${meaCulpa.variable} ${imperialScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}