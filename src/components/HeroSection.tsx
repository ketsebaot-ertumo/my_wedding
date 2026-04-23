'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Calendar, MapPin, Camera, ArrowDown, Sparkles, Flower2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const t = useTranslations('wedding');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const infoCards = [
      {
        icon: Calendar,
        title: "Sacred Date",
        primaryText: "May 10, 2026",
        // secondaryText: "ግንቦት 02, 2018",
        secondaryText: "Sunday Morning",
        accent: "from-rose-500/20 to-pink-500/20",
        iconColor: "text-rose-400",
        delay: 0.1,
        description: "Save the date for our special celebration"
      },
      {
        icon: MapPin,
        title: "Venue Location",
        primaryText: "Hawassa, Ethiopia",
        secondaryText: "Joshua Campaign Center",
        accent: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-400",
        delay: 0.2,
        description: "Where our journey continues"
      },
      {
        icon: Camera,
        title: "Share Your Joy",
        primaryText: "Upload Memories",
        secondaryText: "Be part of our story",
        accent: "from-purple-500/20 to-pink-500/20",
        iconColor: "text-purple-400",
        delay: 0.3,
        description: "Your photos make our day complete"
      }
    ]


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240131/my_wedding/wedding10_jrmmmv.jpg"
          alt="Azaria & Ketsebaot - Wedding Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient Overlay - keeps text readable while maintaining image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
        
        {/* Optional: Add a soft rose tint overlay */}
        <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay z-0" />
      </div>

      {/* Soft Mesh Background - Now layered above image but behind content */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-rose-200 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-pink-300 rounded-full blur-[120px] opacity-30" />
      </div> */}
      

      <div className="container mx-auto px-6 text-center relative z-10 mt-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Top Badge - Made more readable on image */}
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full backdrop-blur-md shadow-md border border-white/30">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-sm md:text-base font-medium tracking-wide text-rose-400">
              By God's Grace • We Are Getting Married
            </span>
          </div>

          {/* Names - Now with white text for better contrast on image */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font- leading-tight mb-6 tracking-tight font-semibold tracking-wide" style={{ fontFamily: 'var(--font-imperial)' }}>
            <span className="bg-gradient-to-r from-rose-200 to-pink-100 bg-clip-text text-transparent drop-shadow-lg">
              {t('azu')}
            </span>
            <span className="mx-4 text-white/60 drop-shadow-lg">&</span>
            <span className="bg-gradient-to-r from-pink-100 to-rose-200 bg-clip-text text-transparent drop-shadow-lg">
              {t('ketsi')}
            </span>
          </h1>

          {/* Romantic Subtitle - White text with shadow for readability */}
          <p className="text-lg text-white/90 font-light mb-4 drop-shadow-md italic">
            {t('section-desc')}
          </p>

          <p className="text-lg text-white/80 mb-12 drop-shadow-md">
            {t('section-message')}
          </p>

          {/* Info Cards - Slightly more opaque for readability */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50"
            >
              <Calendar className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold text-lg mb-1">Wedding Date</h3>
              <p className="text-gray-700">May 10, 2026</p>
              <p className="text-sm text-gray-500">ግንቦት 02, 2018 ዓ.ም</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50"
            >
              <MapPin className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold text-lg mb-1">Location</h3>
              <p className="text-gray-700">Hawassa, Ethiopia</p>
              <p className="text-sm text-gray-500">Joshua Campaign</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/50"
            >
              <Camera className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold text-lg mb-1">Share Memories</h3>
              <p className="text-gray-700">Upload your photos</p>
              <p className="text-sm text-gray-500">Be part of our story</p>
            </motion.div>
          </div> */}

          {/* Modern Info Cards - Dynamic & Interactive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 mb-6">
            {infoCards.map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className="group relative cursor-pointer"
                >
                  {/* Animated Gradient Border Background */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${card.accent} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={false}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-xl border border-white/20 hover:border-white/40 transition-all duration-300 overflow-hidden">
                    
                    {/* Top Accent Line */}
                    <motion.div 
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Icon Container with Animation */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      className="inline-block mb-4"
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <Icon className={`w-7 h-7 md:w-8 md:h-8 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </motion.div>

                    {/* Title with Underline Effect */}
                    {/* <div className="relative inline-block mb-3">
                      <h3 className="font-semibold text-base md:text-lg text-white/90 tracking-wide">
                        {card.title}
                      </h3>
                      <motion.div 
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div> */}
                    
                    {/* Primary Text - Large & Bold */}
                    <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-1 leading-tight">
                      {card.primaryText}
                    </p>
                    
                    {/* Secondary Text */}
                    <p className="text-sm text-white/50 mb-3 font-medium">
                      {card.secondaryText}
                    </p>
                    
                    {/* Description with Icon */}
                    <div className="flex items-center justify-center gap-1 text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                      <Heart className="w-3 h-3 text-rose-400/60" />
                      <span>{card.description}</span>
                      <Heart className="w-3 h-3 text-rose-400/60" />
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-4 h-4 text-amber-400/50" />
                    </div>
                    
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      <Flower2 className="w-4 h-4 text-rose-400/50" />
                    </div>

                    {/* Bottom Gradient Border on Hover */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#upload">
              <Button size="lg" className="px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 shadow-lg text-white">
                <Camera className="mr-2 h-5 w-5" />
                Upload Memories
              </Button>
            </Link>

            <Link href="#gallery">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-2xl border-white/50 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white">
                View Gallery
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 ml-6"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-white/80"
        >
          <ArrowDown className="w-6 h-6" />
          <span className="text-xs mt-2">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

