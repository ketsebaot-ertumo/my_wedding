'use client'

import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Camera, Gift, Calendar, Upload, Share2, Sparkles, ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState, useCallback } from 'react'
// @ts-ignore
import { toEthiopian } from 'ethiopian-date'

interface FooterProps {
  className?: string
}

export default function Footer({ className = '' }: FooterProps) {
  const t = useTranslations('footer');
  const now = new Date();
  const currentYear = now.getFullYear()
  const [ethYear] = toEthiopian(
    currentYear,
    now.getMonth() + 1,
    now.getDate()
  )
  const shouldReduceMotion = useReducedMotion()
  const [heartPositions, setHeartPositions] = useState<Array<{ x: number; y: number }>>([])
  const [mounted, setMounted] = useState(false)

  // Generate random positions for hearts - responsive to window size
  const generateHeartPositions = useCallback(() => {
    if (typeof window === 'undefined') return []
    const width = window.innerWidth
    const height = window.innerHeight
    return [...Array(6)].map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
    }))
  }, [])

  // Handle heart positions on mount and resize
  useEffect(() => {
    setMounted(true)
    setHeartPositions(generateHeartPositions())

    const handleResize = () => {
      setHeartPositions(generateHeartPositions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [generateHeartPositions])

  const quickLinks = [
    { name: t('links.ourStory'), href: '#story', icon: Heart },
    { name: t('links.timeline'), href: '#timeline', icon: Calendar },
    { name: t('links.upload'), href: '#upload', icon: Upload },
    { name: t('links.gallery'), href: '#gallery', icon: Camera },
    { name: t('links.registry'), href: '#gift', icon: Gift },
    { name: t('links.share'), href: '#share', icon: Share2 },
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/e_ketsebaot', color: 'hover:text-pink-400', ariaLabel: 'Follow us on Instagram' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/eraye.ketsebaot', color: 'hover:text-blue-400', ariaLabel: 'Follow us on Facebook' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/ketsebaot-ertumo/', color: 'hover:text-blue-500', ariaLabel: 'Connect on LinkedIn' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'ertumoketsebaot@gmail.com', href: 'mailto:ertumoketsebaot@gmail.com', ariaLabel: 'Send us an email' },
    { icon: Phone, text: '+251 919 765 445', href: 'tel:+251919765445', ariaLabel: 'Call us' },
    { icon: Phone, text: '+251 712 973 556', href: 'tel:+251712973556', ariaLabel: 'Call us (alternative)' },
    { icon: MapPin, text: t('location.address'), href: 'https://maps.google.com/?q=Hawassa+Ethiopia', ariaLabel: t('location.viewOnMap') },
  ]

  // Animation variants with reduced motion support
  const fadeInUp = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: shouldReduceMotion ? 0 : 0.5 }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'auto' : 'smooth' })
  }

  // Don't render animations on server
  if (!mounted) {
    return (
      <footer className={`relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
        <div className="relative container mx-auto px-3 sm:px-4 py-12 md:py-20">
          {/* Static version for SSR */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500/20" />
                  <h3 className="text-3xl font-serif bg-gradient-to-r from-blue-300 to-rose-300 bg-clip-text text-transparent">
                    Azaria & Ketsebaot
                  </h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  {t('brand.message')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className={`relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden ${className}`}>
      {/* Skip Navigation Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
      
      {/* Animated Background Pattern - Disabled if reduced motion */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="footerPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40,15 L45,25 L55,27 L48,35 L50,45 L40,40 L30,45 L32,35 L25,27 L35,25 Z" fill="none" stroke="white" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footerPattern)" />
          </svg>
        </div>
      )}

      {/* Floating Hearts Animation - Disabled if reduced motion */}
      {!shouldReduceMotion && heartPositions.length > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {heartPositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-500/10"
              style={{ 
                left: pos.x,
                top: pos.y,
              }}
              animate={{ 
                y: [0, -100, -200],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>
          ))}
        </div>
      )}

      <div className=" container mx-auto px-3 sm:px-4 py-12 md:py-20">
        {/* Main Footer Grid */}
        <div className="relative sm:flex justify-between gap-10 lg:gap-8">
          
          {/* Brand Section - 4 columns */}
          <motion.div 
            {...fadeInUp}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
            className=" space-y-6"
          >
            {/* Logo / Brand */}
            <div className="space-y-4">
              <div className="flex justify-center sm:justify-start items-center gap-3 flex-wrap px-2">
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Heart className="w-8 h-8 text-rose-500 fill-rose-500/20" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-serif bg-gradient-to-r from-blue-300 to-rose-300 bg-clip-text text-transparent">
                  {t('coupleNames')}
                </h3>
              </div>
              
              <p className="text-center sm:text-left text-gray-400 leading-relaxed text-sm sm:text-base px-2 max-w-100">
                {t('brand.message')}
              </p>
              
              {/* Social Links */}
              <div className="hidden sm:flex gap-3 pt-2">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 ${social.color} hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links - 4 columns */}
          <motion.div 
            {...fadeInUp}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.2 }}
            className="hidden sm:block lg:col-span-4"
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-rose-500" />
              {t('quickNavigation')}
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  className="group flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors duration-300 focus:outline-none focus:text-rose-400"
                >
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info - 4 columns */}
          <motion.div 
            {...fadeInUp}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.3 }}
            className="hidden sm:block lg:col-span-4"
          >
            <h4 className="text-base sm:text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <span className="w-8 h-px bg-rose-500" />
              {t('getInTouch')}
            </h4>
            <div className="space-y-3 sm:space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={info.ariaLabel}
                  whileHover={shouldReduceMotion ? {} : { x: 5 }}
                  className="flex items-center gap-3 text-gray-400 hover:text-rose-400 transition-colors duration-300 group focus:outline-none focus:text-rose-400"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors flex-shrink-0">
                    <info.icon className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="text-xs sm:text-sm break-all">{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider with Decorative Elements */}
        <div className="relative my-10 md:my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
          </div>
          <div className="relative flex justify-center">
            <motion.div 
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="bg-gray-900 px-4"
            >
              <Sparkles className="w-4 h-5 text-rose-500" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center mx-6">
          <p className="text-xs sm:text-sm text-gray-500">
            © {currentYear} ({ethYear} ዓ.ም) {t('copyright')} {t('allRightsReserved')}
          </p>
          
          <p className="text-xs sm:text-sm text-gray-500">
            {t('designedWith')} <Heart className="w-3 h-3 text-rose-500 inline mx-1" aria-hidden="true" /> {t('forOurDay')}
          </p>
        </div>
      </div>
      

      {/* Back to Top Button - Fixed for Mobile Safe Areas */}
      <motion.button
        onClick={scrollToTop}
        aria-label="Back to top"
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.5 }}
        whileHover={shouldReduceMotion ? {} : { y: -3 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        style={{
          // Add safe area inset for notched phones
          marginBottom: 'env(safe-area-inset-bottom)',
          marginRight: 'env(safe-area-inset-right)',
        }}
      >
        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
      </motion.button>
    </footer>
  )
}