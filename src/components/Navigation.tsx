'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Heart, Camera, Home, GalleryVertical, QrCode, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Upload', href: '#upload', icon: Camera },
  { label: 'Gallery', href: '#gallery', icon: GalleryVertical },
  { label: 'Capture', href: '#capture', icon: Camera },
  { label: 'QR Code', href: '#qr', icon: QrCode },
  { label: 'Countdown', href: '#countdown', icon: Calendar },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-rose-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Ketsi & Azaria
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
              Share Memories
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t animate-in slide-in-from-top">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <Button className="mt-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                Share Memories
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}