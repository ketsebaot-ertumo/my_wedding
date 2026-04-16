// components/wedding-invitation.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Calendar, MapPin, Heart, Clock, Music, Camera, Sparkles, 
  ChevronDown, Gift, MessageCircle, CheckCircle, XCircle, 
  Star, Cake, Flower2, Wine, Moon, Sun, Cloud, 
  PartyPopper, Diamond, Mail, Phone, Instagram, Facebook,
  Volume2, VolumeX, Utensils, Share2, Copy, Check,
  Sparkle,
  Gem
} from "lucide-react";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { useForm } from '@formspree/react';


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});


export const WeddingInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<null | "yes" | "no">(null);
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [isRevealing, setIsRevealing] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);
  const heroRef = useRef<HTMLElement>(null);
  const [state, handleSubmit] = useForm("mzzppzop");
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  // const weddingDate = new Date(2026, 4, 10); // May 10, 2026
  // May 10, 2026, 12:00 PM EAT (UTC+3)
  const weddingDate = new Date(Date.UTC(2026, 4, 10, 9, 0, 0)); 
  const safeWindow = typeof window !== "undefined" ? window : null;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          // days: Math.ceil(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Add this ref at the top with your other refs
  const mainContentRef = useRef<HTMLElement>(null);

  const handleOpenInvitation = () => {
    setIsRevealing(true);
    
    // Create celebration particles
    const newParticles = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          // x: safeWindow ? Math.random() * safeWindow.innerWidth : 0,
          y: window.innerHeight / 2,
          type: ['❤️', '✨', '💕', '🌸', '🎉', '💑', '⭐', '🌹'][Math.floor(Math.random() * 8)]
        });
      }
    }
    setParticles(newParticles);
    
    // Remove particles after animation
    setTimeout(() => setParticles([]), 100);

    setIsOpen(true);
    setIsRevealing(false);

    const scrollWhenReady = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
        mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        requestAnimationFrame(scrollWhenReady); // try again next frame
    }
    };

    scrollWhenReady();
  };

  const names = [
    "Azaria & Ketsebaot",
    "Azaria 💕 Ketsebaot",
    "Mr. Azaria & Mrs. Ketsebaot",
    "A & K Forever",
    "Azaria ✨ Ketsebaot",
    "The Future Mr. & Mrs.",
    "Azaria + Ketsebaot",
    "Team A&K ❤️"
  ];

const [currentNameIndex, setCurrentNameIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentNameIndex((prev) => (prev + 1) % names.length);
  }, 2500); // change every 2.5s

  return () => clearInterval(interval);
}, []);

  // Typewriter effect for the date
  const [dateText] = useTypewriter({
    words: ["MAY 10, 2026", "MAY 10TH, 2026", "05.10.2026", "10 MAY 2026"],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 40,
    delaySpeed: 800,
  });

  // Sample images similar to your invitation style
  const coupleImages = [
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240113/my_wedding/couple_gmofgb.jpg", alt: "Azaria & Ketsebaot - Engagement" },
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240122/my_wedding/wedding3_d2sskq.jpg", alt: "Azaria & Ketsebaot - wedding" },
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240125/my_wedding/wedding5_hvmht5.jpg", alt: "Azaria & Ketsebaot - Wedding" },
    // { src: "/images/wedding2.jpg", alt: "Azaria & Ketsebaot - Together" },
  ];

  const galleryImages = [
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240122/my_wedding/wedding1_sstnfp.jpg", alt: "Wedding preparation" },
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240127/my_wedding/wedding8_nebzb4.jpg", alt: "Wedding cake" },
    // { src: "/images/wedding5.jpg", alt: "Ring ceremony" },
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240129/my_wedding/wedding9_uogtgv.jpg", alt: "Ring ceremony" },
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240131/my_wedding/wedding10_jrmmmv.jpg", alt: "First dance" }, // wedding2.jpg
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240143/my_wedding/wedding61_iv2jje.jpg", alt: "Celebration" },
    { src: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240128/my_wedding/wedding7_nbuxz2.jpg", alt: "Family photo" },
  ];

  // const timelineEvents = [
  //   { time: "10:00 AM", title: "Wedding Ceremony", icon: Heart, description: "Sacred Heart Cathedral", location: "Addis Ababa" },
  //   { time: "11:30 AM", title: "Cocktail Hour", icon: Wine, description: "Garden Terrace", location: "Grand Palace Hotel" },
  //   { time: "1:00 PM", title: "Lunch Reception", icon: Utensils, description: "Grand Ballroom", location: "Grand Palace Hotel" },
  //   { time: "4:00 PM", title: "Photo Session", icon: Camera, description: "Garden & Indoor", location: "Hotel Grounds" },
  //   { time: "6:00 PM", title: "Evening Celebration", icon: PartyPopper, description: "Dancing & Entertainment", location: "Grand Ballroom" },
  //   { time: "8:00 PM", title: "Cake Cutting", icon: Cake, description: "Dessert & Coffee", location: "Grand Ballroom" },
  // ];

  const timelineEvents = [
    {
      time: "10:00 AM - 12:00 PM",
      title: "Wedding Ceremony",
      icon: Heart,
      description: "Exchange of vows and blessing ceremony",
      location: "Sacred Heart Cathedral, Hawassa",
    },
    {
      time: "12:00 PM - 2:00 PM",
      title: "Lunch Reception",
      icon: Utensils,
      description: "Delightful lunch and celebration with family & friends",
      location: "Joshua Campaign Hall",
    },
    {
      time: "2:00 PM - 3:00 PM",
      title: "Photo Session",
      icon: Camera,
      description: "Capturing beautiful moments indoors & in the garden",
      location: "Selected scenic locations",
    },
    {
      time: "3:00 PM onwards",
      title: "Cake Cutting & Worship",
      icon: Cake,
      description: "Cake cutting, coffee ceremony, worship & open dance floor",
      location: "Joshua Campaign Hall",
    },
  ];

  const giftRegistryItems = [
  // Home Essentials
  { name: "Home Appliances", icon: "🏠", description: "Refrigerator, TV, Washing Machine" },
  { name: "Kitchenware Set", icon: "🍳", description: "Cookware, Dinner sets, Utensils" },
  { name: "Bedroom Suite", icon: "🛏️", description: "Bed frame, Mattress, Wardrobe" },
  { name: "Living Room Set", icon: "🛋️", description: "Sofa set, Coffee table, TV stand" },
  { name: "Dining Set", icon: "🍽️", description: "Dining table, Chairs, Cabinet" },
  
  // Modern & Cash Options
  { name: "Honeymoon Fund", icon: "✈️", description: "Contribute to our dream honeymoon" },
  { name: "Travel Voucher", icon: "🌍", description: "For our adventures together" },
  { name: "Cash Gift (Gursha)", icon: "💝", description: "Traditional Ethiopian gift" },
  
  // Local Ethiopian Options
  { name: "Traditional Coffee Set (Jebena)", icon: "☕", description: "Ethiopian coffee ceremony set" },
  { name: "Traditional Clothes (Habesha Kemis)", icon: "👗", description: "Cultural attire for both" },
  { name: "Gold Jewelry", icon: "💍", description: "Traditional wedding jewelry" },
  { name: "Furniture Voucher", icon: "🪑", description: "For local furniture shops" },
  
  // Experience Gifts
  { name: "Dinner Voucher", icon: "🍷", description: "Romantic dinner experience" },
  
  // Online/International
  { name: "Amazon Gift Card", icon: "📦", description: "Shop anything you like" },
  { name: "Other", icon: "🎁", description: "Any other gift you'd like to give" },
];

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://azaria-ketsebaot-wedding.vercel.app/invite");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  // Calendar days for May 2026
  const getCalendarDays = () => {
    const days = [];
    const firstDay = new Date(2026, 4, 1).getDay();
    const daysInMonth = 31;
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative">
    {/* <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative"> */}
        {/* Background Music */}
        <audio ref={audioRef} loop>
            <source src="https://res.cloudinary.com/dq6mvqivd/video/upload/v1776335587/my_wedding/%E1%89%83%E1%8A%93_%E1%8B%98%E1%8C%88%E1%88%8A%E1%88%8B_%E1%88%B0%E1%88%AD%E1%8C%8C_%E1%8A%90%E1%8B%8D_%E1%8B%9B%E1%88%AC_%E1%89%B0%E1%88%88%E1%89%80%E1%89%80_KANNA_ZEGELILA_22_November_2020_WEDDING_SONG_-_Ebenezer_Tagesse_Official_%E1%89%A3%E1%88%88_%E1%89%85%E1%8A%94_m2zykr.mp3" type="audio/mpeg" />
        </audio>
        
        {/* Music Control Button */}
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all"
        >
            {isMuted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-rose-500" />}
        </motion.button>

        {/* Share Button */}
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            onClick={copyInviteLink}
            className="fixed top-4 right-20 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all"
        >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5 text-rose-500" />}
        </motion.button>

        {/* Celebration Particles */}
        <AnimatePresence>
            {particles.map((particle) => (
            <motion.div
                key={particle.id}
                initial={{ x: particle.x, y: particle.y, scale: 0, opacity: 1 }}
                animate={{ 
                  y: particle.y - 300 - Math.random() * 200,
                  x: particle.x + (Math.random() - 0.5) * 200,
                  scale: 1.5,
                  opacity: 0
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="fixed z-[200] pointer-events-none text-2xl"
                style={{ left: 0, top: 0 }}
            >
                {particle.type}
            </motion.div>
            ))}
        </AnimatePresence>

      {/* Hero Section - Modern & Creative */}
      <section ref={heroRef} className="relative min-h-screen snap-start flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Background with Floating Elements */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240127/my_wedding/wedding4_otfyo0.jpg"
            // src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1776339092/my_wedding/ChatGPT_Image_Apr_16_2026_02_27_40_PM_usuam0.png"
            alt="Azaria & Ketsebaot"
            fill
            className="object-cover object-center scale-110" 
            priority
          />
          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-amber-500/20 mix-blend-overlay" />
          
          {/* Animated Pattern Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heartPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20,6.5 C20,6.5 15,0 10,0 C5,0 0,5 0,10 C0,15 5,20 10,20 C15,20 20,15 20,10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heartPattern)" />
          </svg>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {typeof window !== 'undefined' && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.3
              }}
              animate={{
                y: [null, -100, -200],
                opacity: [0.3, 0.5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              {i % 3 === 0 ? (
                <Heart className="w-4 h-4 text-rose-400/50" />
              ) : i % 3 === 1 ? (
                <Sparkle className="w-3 h-3 text-amber-400/50" />
              ) : (
                <Star className="w-3 h-3 text-purple-400/50" />
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Animated Ring of Hearts */}
            <div className="relative flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32"
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      transform: `rotate(${i * 45}deg) translateX(60px)`,
                      transformOrigin: "center"
                    }}
                  >
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-20 h-20 text-rose-400 mx-auto fill-rose-400/20" />
              </motion.div>
            </div>
            
            {/* Elegant Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <span className="inline-block px-8 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                <span className="text-rose-200 font-serif text-sm tracking-widest">✦ SAVE THE DATE ✦</span>
              </span>
            </motion.div>
            
            {/* Names with Creative Typography */}
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentNameIndex}
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="text-center"
                    >
                        <h1
                            className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-semibold tracking-wide`}
                        >
                            <span className="bg-gradient-to-r from-blue-400 via-white to-rose-400 bg-clip-text text-transparent drop-shadow-[0_5px_25px_rgba(244,63,94,0.4)]">
                                {names[currentNameIndex]}
                            </span>
                        </h1>
                    </motion.div>
                </AnimatePresence>
              
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"
                />
                
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg md:text-xl text-white/90 font-light"
                >
                    Are Getting Married!
                </motion.p>
            </div>
           
            {/* Date with Smooth Typewriter */}
            <div className="flex items-center justify-center mt-6 z-20 relative">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-[1.5rem] lg:text-[2.5rem] font-extrabold text-gray-300 tracking-wide"
                >
                    {dateText}
                    <Cursor cursorStyle="|" cursorColor="#FB7185" />
                </motion.p>
            </div>
            
            {/* Modern Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-white/70 text-sm uppercase tracking-wider mb-4">Counting down to our special day</p>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(countdown).map(([unit, value], idx) => (
                  <motion.div
                    key={unit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 rounded-2xl blur-md group-hover:blur-xl transition-all" />
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 group-hover:border-white/40 transition-all">
                      <div className="text-2xl md:text-3xl font-bold text-white font-mono">
                        {String(value).padStart(2, '0')}
                      </div>
                      <div className="text-xs uppercase text-white/70 mt-2 tracking-wider">{unit}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Creative Button with Magic Reveal Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenInvitation}
                disabled={isRevealing}
                className="relative group"
              >
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 animate-spin-slow blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
                
                {/* Button Content */}
                {!isOpen && 
                <div className="relative px-10 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-xl overflow-hidden">
                  <span className="flex items-center gap-3 text-white font-semibold text-lg">
                    {isRevealing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        Opening Magic...
                      </>
                    ) : (
                      <>
                        <Gem className="w-5 h-5" />
                        Open the Invitation
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </>
                    )}
                  </span>
                  
                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                }
              </motion.button>
              
              {/* Floating Elements around Button */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 pointer-events-none">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkle className="w-4 h-4 text-amber-400" />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Romantic Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/60 text-sm italic max-w-md mx-auto"
            >
              "Love is not about how many days together, but about how much we grow together"
            </motion.p>
          </motion.div>
        </motion.div>
        
        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => {
            const nextSection = document.querySelector('.snap-start + .snap-start');
            if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-xs uppercase tracking-wider">Scroll</span>
            <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/70 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </section>

        {/* Main Invitation Content */}
        <AnimatePresence>
            {isOpen && (
            <>
                
      {/* Welcome & Couple Images Section */}
      <section id="main-content" className="min-h-screen snap-start py-20 px-4 bg-gradient-to-b from-black via-gray-700 to-black text-gray-300">
        <div className="max-w-6xl mx-auto">
          
          {/* Dear Family and Friends - Creative Header with Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-16"
          >
            {/* Decorative floral elements */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-30">
              <Flower2 className="w-12 h-12 text-rose-300 rotate-[-15deg]" />
              <Heart className="w-12 h-12 text-rose-300" />
              <Flower2 className="w-12 h-12 text-rose-300 rotate-[15deg]" />
            </div>
            
            {/* Main greeting */}
            <div className="relative text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block"
              >
                <span className="px-6 py-2 border rounded-full text-rose-300 text-sm font-serif tracking-wider">
                  ✨ With Love & Joy ✨
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-serif bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent"
              >
                Dear Family & Friends
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto"
              />
              
              {/* Beautiful Paragraph Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-lg md:text-xl leading-relaxed">
                  With hearts full of joy and gratitude, we invite you to share in the celebration of our love. 
                  Your presence in our lives has been a blessing, and we would be honored to have you witness 
                  the beginning of our forever journey together.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                <Heart className="w-4 h-4 text-rose-400" />
                <Heart className="w-4 h-4 text-rose-400" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Wedding Invitation Message */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-12"
          >
            <Heart className="w-16 h-16 text-rose-500 mx-auto fill-rose-200" />
            <h2 className="text-4xl md:text-5xl font-serif">Together with our families</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Azaria & Ketsebaot joyfully invite you to celebrate their wedding day!
            </p>
          </motion.div> */}

          {/* Couple Images Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {coupleImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl cursor-pointer group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Image caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-serif text-center">
                    {idx === 0 ? "Our Journey Begins" : idx === 1 ? "Together Forever" : "Happily Ever After"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Wedding Details Card - Elegant Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-8"
          >
            <div className="space-y-6 flex justify-center text-gray-400 gap-2 md:gap-4">
              <MapPin className="w-5 h-5 " />
              Joshua Campaign Ethiopia Ministry
            </div>
          </motion.div>

          
          {/* Additional Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-4"
          >
            <p className="text-gray-500 text-sm italic pb-4">
              "We are overjoyed to share this special moment with you"
            </p>
          </motion.div>
        </div>
      </section>

                {/* Event Timeline Section */}
                 <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-b from-rose-100 via-rose-50 to-amber-100 text-gray-900">
                    <div className="max-w-6xl mx-auto">
                      <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h3 className="relative inline-block text-4xl md:text-6xl font-serif bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-6 text-center">
                            Event Timeline
                                {/* Swipe underline container */}
                              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[3px] bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                        className="w-full h-full bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                                    />
                                </div>
                                {/* Decorative stars */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 tracking-wider whitespace-nowrap"
                                >
                                    ✦ ✦ ✦
                                </motion.div>
                            </h3>
                        </motion.div>
                      
                      <div className="max-w-md mx-auto space-y-6">
                        {timelineEvents.map((event, idx) => {
                          const Icon = event.icon;
                          return (
                          <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ y: -5 }}
                              className=" rounded-2xl p-6 shadow-lg border border-rose-100"
                          >
                            {/* Timeline Item */}
                            <div className="flex gap-4">
                              <div className="flex flex-col items-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                  <Icon className="w-5 h-5 text-rose-400" />
                                </div>
                                <div className="w-0.5 h-full bg-rose-400 mt-2" />
                              </div>
                              <div className="flex-1 pb-6">
                                <p className="text-sm text-rose-400 font-medium">{event.time}</p>
                                <h3 className="text-xl font-serif font-semibold text-gray-950">{event.title}</h3>
                                <p className="text-gray-400 text-sm">{event.description}</p>
                              </div>
                            </div>
                          </motion.div>
                          );
                        })}
                      </div>
                               
                        {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {timelineEvents.map((event, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 shadow-lg border border-rose-100"
                                >
                                    <event.icon className="w-12 h-12 text-rose-500 mb-4" />
                                    <p className="text-2xl font-bold text-gray-800">{event.time}</p>
                                    <p className="text-xl font-semibold text-gray-700 mt-2">{event.title}</p>
                                    <p className="text-gray-600 mt-2">{event.description}</p>
                                    <p className="text-sm text-gray-500 mt-2">{event.location}</p>
                                </motion.div>
                            ))}
                        </div> */}
                    </div>
                </section>

                {/* Calendar View Section */}
                <section className="relative min-h-screen snap-start py-20 px-4 overflow-hidden">
                    {/* Background Image + Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240124/my_wedding/wedding2_te0ymk.jpg"
                            alt="Wedding Background"
                            fill
                            className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
                    </div>

                    <div className="relative max-w-4xl mx-auto z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-center mb-12 text-white"
                        >
                            <h3 className="text-4xl font-serif mb-4">Save the Date</h3>
                            <p className="">Mark your calendar for our special day</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-white rounded-3xl p-6 shadow-xl"
                        >
                            {/* Calendar Header */}
                            <div className="text-center mb-6">
                                <h4 className="text-2xl font-bold text-">MAY 2026</h4>
                            </div>
                            
                            {/* Week Days */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {weekDays.map((day, i) => (
                                <div key={i} className="text-center font-semibold text-white text-sm py-2">
                                    {day}
                                </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                                {calendarDays.map((day, i) => (
                                <div
                                    key={i}
                                    className={`text-center py-3 text-sm transition-all relative ${
                                    day === 10 
                                        ? "font-bold scale-105"
                                        : day 
                                        ? "text-gray-200 rounded-lg"
                                        : ""
                                    }`}
                                >
                                    {day === 10 ? (
                                        <div className="relative">
                                            {/* Heart Border SVG */}
                                            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10" viewBox="0 0 24 24">
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                    fill="none"
                                                    stroke="#f43f5e"
                                                    strokeWidth="1.5"
                                                    className="animate-pulse"
                                                />
                                            </svg>
                                            <span className="relative z-10 text-rose-400 font-bold">{day}</span>
                                        </div>
                                    ) : (
                                        <span className={day ? "text-gray-200" : ""}>{day || ""}</span>
                                    )}
                                </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg- rounded-full">
                                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                                <span className="text-sm text-rose-400">Wedding Day - May 10, 2026</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Photo Gallery Section */}
                <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-b from-rose-100 via-rose-50 to-amber-100">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <h3 className="text-4xl font-serif relative inline-block mb-6">
                                Precious Moments
                                {/* Swipe underline container */}
                              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[3px] bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "100%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                        className="w-full h-full bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                                    />
                                </div>
                                {/* Decorative stars */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 tracking-wider whitespace-nowrap"
                                >
                                    ✦ ✦ ✦
                                </motion.div>
                            </h3>
                        </motion.div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {galleryImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ scale: 1.03 }}
                                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md group"
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RSVP Section */}
                <section className="m snap-start py-20 px-4 bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 text-gray-300">
                  <div className="max-w-2xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl"
                    >
                      {!showSuccessMessage ? (
                        <> 
                          <PartyPopper className="w-16 h-16 text-rose-400 mx-auto" />
                          <h3 className="text-3xl font-serif">Will You Attend the Event?</h3>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Hidden field to store RSVP choice */}
                            <input type="hidden" name="rsvp_status" value={rsvpStatus === "yes" ? "Attending 🎉" : "Unable to Attend ❤️"} />
                            <input type="hidden" name="submitted_at" value={new Date().toLocaleString()} />

                            <input
                                type="text"
                                placeholder="Your Full Name"
                                name="name"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                className="w-full max-w-md mx-auto p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-center"
                            />

                            {/* Message input (shown after RSVP choice) */}
                            {showMessageInput && (
                                <textarea
                                  name="message"
                                  placeholder="Write a message for Azaria & Ketsebaot..."
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  className="w-full max-w-md mx-auto p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                  rows={3}
                                />
                              )}
            
                            {/* RSVP Buttons */}
                            {!rsvpStatus ? (
                              <div className="flex flex-col sm:flex-row justify-center gap-4">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => {
                                      setRsvpStatus("yes");
                                      setShowMessageInput(true);
                                    }}
                                    className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all inline-flex items-center gap-2 justify-center"
                                  >
                                    <CheckCircle className="w-5 h-5" /> Yes, I'll Attend
                                  </motion.button>

                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => {
                                      setRsvpStatus("no");
                                      setShowSuccessMessage(true);
                                      // Submit immediately for "no" response
                                      setTimeout(() => {
                                        const form = document.querySelector('form');
                                        if (form) form.requestSubmit();
                                      }, 100);
                                    }}
                                    className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2 justify-center"
                                  >
                                  <XCircle className="w-5 h-5" /> Unable to Attend
                                  </motion.button>
                              </div>
                            ) : (
                              <>
                                {rsvpStatus === "yes" && (
                                    <div className="flex flex-col md:flex-row justify-center md:px-14 md:gap-0 gap-4"> 
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={state.submitting}
                                        onClick={() => { setShowSuccessMessage(true);}}
                                        className="px-8 py-3 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2 justify-center mx-auto disabled:opacity-50"
                                      >
                                        {state.submitting ? (
                                          <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                                            Sending...
                                          </>
                                        ) : (
                                          <>
                                            <Heart className="w-5 h-5" />
                                            Send with Message
                                          </>
                                        )}
                                      </motion.button>

                                        {/* Back button to change choice */}
                                      <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                          setRsvpStatus(null);
                                          setShowMessageInput(false);
                                          setMessage("");
                                        }}
                                        className="px-6 py-2 border border-gray-400 text-sm text-gray-400 rounded-full hover:underline transition-all inline-flex items-center gap-2 justify-center mx-auto cursor-pointer"
                                      >
                                        ← Change my response
                                      </motion.button>
                                    </div>
                                )}
                              </>
                            )}
                          </form>
                        </>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                          </div>
                          <p className="text-2xl font-semibold text-gray-300">
                            Thank You {guestName}!
                          </p>
                          <p className="text-gray-400">
                            {rsvpStatus === "yes" 
                              ? "We’re so excited to celebrate with you! 💕 A formal ceremony invitation card will be sent to you soon for event entry."
                              : "❤️ We'll miss you! Thank you for letting us know."}
                          </p>

                          <button
                            onClick={() => {
                              // Reset everything
                              setGuestName("");
                              setGuestEmail("");
                              setRsvpStatus(null);
                              setMessage("");
                              setShowMessageInput(false);
                              // Reset Formspree state
                              window.location.reload();
                            }}
                            className="mt-4 px-6 py-2 bg-rose-400 text-white rounded-full hover:bg-rose-600 transition-all"
                          >
                            Close
                          </button>
                        </motion.div>
                    )}
                    
                    <div className="pt-4 text-sm text-gray-500">
                        <p>Please RSVP by April 30, 2026</p>
                    </div>
                    </motion.div>
                  </div>
                </section>

               <section className="h-150 snap-start">
                  {/* <div className=""> */}
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.648465591803!2d38.470993907689135!3d7.050529392922327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b1451569486af7%3A0x630636b89140a5a2!2sNib%20International%20Bank!5e0!3m2!1sen!2set!4v1707823186965!5m2!1sen!2set" className="w-full h-full" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.3708551434593!2d38.477140310690615!3d7.082934316379776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b15bd3b2cc1aef%3A0xf19db30641066bcf!2sJoshua%20Campaign%20Ethiopia%20Hawasa%20Office!5e0!3m2!1sen!2set!4v1776167995390!5m2!1sen!2set" className="w-full h-full" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  {/* </div> */}
                </section>

                {/* Gift Registry Section */}
                <section className="min-h-screen snap-start py-20 px-4 bg-white">
                  <div className="max-w-6xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="text-center space-y-6 mb-12"
                    >
                      <Gift className="w-20 h-20 text-rose-500 mx-auto" />
                      <h3 className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                        Gift Registry
                      </h3>
                      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
                        we have registered at the following places:
                      </p>
                    </motion.div>

                    {/* Main Registry Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {giftRegistryItems.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ y: -5, transition: { duration: 0.2 } }}
                          className="bg-gradient-to-br from-rose-50 to-amber-50 p-6 rounded-2xl shadow-lg cursor-pointer group"
                        >
                          <div className="text-4xl mb-3">{item.icon}</div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Featured Registries with Icons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-rose-100 to-amber-100 rounded-2xl p-8 mt-8"
                    >
                      <h4 className="text-2xl font-serif text-center mb-6">Popular Registry Options</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: "Dinner Voucher", icon: "🛋️", color: "bg-blue-100" },
                          { name: "Travel Voucher", icon: "✈️", color: "bg-green-100" },
                          { name: "Honeymoon Fund", icon: "💑", color: "bg-pink-100" },
                          { name: "Cash Gift", icon: "💵", color: "bg-yellow-100" },
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className={`${item.color} p-4 rounded-xl text-center cursor-pointer shadow-md`}
                          >
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <p className="font-semibold text-gray-700">{item.name}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Traditional Ethiopian Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center"
                    >
                      <div className="inline-block bg-amber-50 rounded-xl p-6 max-w-2xl">
                        <p className="text-gray-700 italic">
                          "In Ethiopian tradition, a gift of any amount (Gursha) is a blessing. 
                          Your love and support mean more than any material gift."
                        </p>
                        <div className="mt-4 flex justify-center gap-2">
                          <Heart className="w-5 h-5 text-rose-500" />
                          <Heart className="w-5 h-5 text-rose-500" />
                          <Heart className="w-5 h-5 text-rose-500" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Contact for Registry Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-center mt-8 text-gray-500 text-sm"
                    >
                      <p>For registry inquiries, please contact:</p>
                      <p>📞 +251 919 765 445 | 📧 ertumoketsebaot@gmail.com</p>
                    </motion.div>
                  </div>
                </section>

                {/* Footer Section */}
                <section className="snap-start py-20 px-4 bg-gradient-to-br from-rose-900 to-purple-900 text-white">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                    >
                    <Heart className="w-24 h-24 text-rose-400 mx-auto fill-rose-400/30" />
                    <h3 className="text-4xl font-serif">Thank You</h3>
                    <p className="text-xl text-rose-200">
                        We can't wait to celebrate our special day with you!
                    </p>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Your love, support, and presence mean the world to us. 
                        Thank you for being part of our journey.
                    </p>
                    
                    <div className="flex justify-center gap-6 pt-8">
                      <Mail className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
                      <Phone className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
                      <Instagram className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
                      <Facebook className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
                    </div>
                    
                    <div className="pt-12 space-y-2">
                        <p className="text-sm text-gray-400">For questions, please contact:</p>
                        <p className="text-sm">Azaria: +251 924 856 625 | Ketsebaot: +251 919 765 445</p>
                        <p className="text-xs text-gray-500 mt-6">#AzariaAndKetsebaot #AKForever #Wedding2026</p>
                    </div>
                    </motion.div>
                </div>
                </section>
            </>
            )}
        </AnimatePresence>
    </div>
  );
};
