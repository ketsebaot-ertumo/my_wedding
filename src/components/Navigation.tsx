'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, Camera, Home, GalleryVertical, Sparkles, Upload, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import Language from './language/Language'
// @ts-ignore
import { toEthiopian } from 'ethiopian-date'
import { useTranslations } from 'next-intl'


export default function Navigation() {
  const t = useTranslations('');
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const now = new Date()

  const [ethYear] = toEthiopian(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  )

  const gregorianYear = now.getFullYear()

  // const navItems = [
  //   { label: 'Home', href: '/', icon: Home },
  //   { label: 'Schedule', href: '#schedule', icon: Clock },
  //   { label: 'Gallery', href: '#gallery', icon: GalleryVertical },
  //   { label: 'Our Story', href: '#story', icon: Heart },
  //   { label: 'Capture', href: '#capture', icon: Camera },    
  //   { label: 'Upload', href: '#upload', icon: Upload },  
  // ]
  const navItems = [
    { label: t('nav.home'), href: '/', icon: Home },
    { label: t('nav.schedule'), href: '#schedule', icon: Clock },
    { label: t('nav.gallery'), href: '#gallery', icon: GalleryVertical },
    { label: t('nav.story'), href: '#story', icon: Heart },
    { label: t('nav.capture'), href: '#capture', icon: Camera },
    { label: t('nav.upload'), href: '#upload', icon: Upload },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      
      // Update active section based on scroll
      const sections = navItems.map(item => item.href.replace('#', ''))
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveHash(`#${section}`)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md' 
            : 'bg-black/80 '
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with Animation */}
            <Link href="/" className="group relative flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Heart className="w-8 h-8 lg:w-10 lg:h-10 text-rose-500 fill-rose-500/20 group-hover:fill-rose-500/40 transition-all" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </motion.div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-rose-500 bg-clip-text text-transparent">
                  {t('coupleNames')}
                </span>
                {/* <span className="text-[10px] lg:text-xs text-gray-400 -mt-1">Est. 2026 (2018)</span> */}
                <span className="text-[10px] lg:text-xs text-gray-400 -mt-1">
                  {t('est', { gregorian: gregorianYear, ethiopian: ethYear })}
                  {/* {t('nav.est')} {gregorianYear}, {ethYear} */}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item, idx) => {
                const Icon = item.icon
                const isActive = activeHash === item.href || (item.href === '/' && activeHash === '')
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'text-rose-600 bg-rose-50' 
                          : 'text-gray-300 hover:text-rose-500 hover:bg-white/70'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm lg:text-base">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-full bg-rose-50 -z-10"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              {/* <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button className="ml-2 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-full">
                  <Camera className="mr-2 h-8 w-4" />
                  Share Memories
                </Button>
              </motion.div> */}

              <div className='py-8'><Language /></div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors relative z-50"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-rose-100 bg-transparent backdrop-blur-md"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors group"
                        >
                          <Icon className="w-5 h-5 text-gray-500 group-hover:text-rose-500 transition-colors" />
                          <span className="font-medium text-gray-700 group-hover:text-rose-600">{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                  >
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl hover:scale-105 transition-all duration-300">
                      <Camera className="mr-2 h-4 w-4" />
                      {t('shareMemories')}
                    </Button>
                    {/* <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl hover:scale-105 transition-all duration-300">
                      <Camera className="mr-2 h-4 w-4" />
                      Share Memories
                    </Button> */}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-0 md:h-20 bg-black/90" />
    </>
  )
}
