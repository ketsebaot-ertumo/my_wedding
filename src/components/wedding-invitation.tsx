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
  const [rsvpStatus, setRsvpStatus] = useState<"pending" | "yes" | "no">("pending");
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState("");
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
    { src: "/images/wedding.jpg", alt: "Azaria & Ketsebaot - Engagement" },
    { src: "/images/wedding.jpg", alt: "Azaria & Ketsebaot - Wedding" },
    { src: "/images/wedding.jpg", alt: "Azaria & Ketsebaot - Together" },
  ];

  const galleryImages = [
    { src: "/images/wedding.jpg", alt: "Wedding preparation" },
    { src: "/images/couple.jpg", alt: "Ring ceremony" },
    { src: "/images/wedding-2.jpg", alt: "First dance" },
    { src: "/images/gallery-4.jpg", alt: "Celebration" },
    { src: "/images/gallery-5.jpg", alt: "Family photo" },
    { src: "/images/gallery-6.jpg", alt: "Wedding cake" },
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

  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://azaria-ketsebaot.wedding/invite");
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
            <source src="/wedding-music.mp3" type="audio/mpeg" />
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
            src="/images/wedding.jpg"
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
                            className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-semibold tracking-wide`}
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
                    className="text-xl md:text-2xl text-white/90 font-light"
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
                    className="text-[2rem] md:text-[2.5rem] lg:text-[3.5rem] font-extrabold text-gray-300 tracking-wide"
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                      <div className="text-4xl md:text-5xl font-bold text-white font-mono">
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
            className=" border-t border-gray-600 pt-8"
          >
            <div className="space-y-6 flex justify-center text-gray-300 gap-2 md:gap-4">
              <MapPin className="w-5 h-5 " />
              Joshua Campaign, Hawassa, Ethiopia
            </div>
          </motion.div>

          
          {/* Additional Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-4"
          >
            <p className="text-gray-500 text-sm italic border-b border-gray-600 pb-4">
              "We are overjoyed to share this special moment with you"
            </p>
          </motion.div>
        </div>
      </section>

                {/* Event Timeline Section */}
                 <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-b from-rose-100 via-rose-50 to-amber-100 text-gray-900">
                    <div className="max-w-6xl mx-auto">
                      <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-serif bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-12 text-center"
                            // className="text-4xl font-serif text-center mb-12 bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent"
                      >
                          Event Timeline
                      </motion.h3>
                      
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
                            src="/images/wedding-3.jpg"
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
                                        ? "hover:border cursor-pointer text-gray-200 rounded-lg"
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
                                            <span className="relative z-10 text-rose-500 font-bold">{day}</span>
                                        </div>
                                    ) : (
                                        <span className={day ? "text-gray-200" : ""}>{day || ""}</span>
                                    )}
                                </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg- rounded-full">
                                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                                <span className="text-sm text-rose-400">Wedding Day - May 10, 2026</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Photo Gallery Section */}
                <section className="min-h-screen snap-start py-20 px-4 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl font-serif text-center mb-12"
                        >
                            Precious Moments
                        </motion.h3>
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
                <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-br from-rose-100 via-white to-amber-100">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl"
                    >
                    <PartyPopper className="w-16 h-16 text-rose-500 mx-auto" />
                    <h3 className="text-3xl font-serif">Will You Attend the Party?</h3>
                    
                    {rsvpStatus === "pending" ? (
                        <>
                        <input
                            type="text"
                            placeholder="Your Full Name"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full max-w-md mx-auto p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-center"
                        />
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => guestName && setRsvpStatus("yes")}
                            className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all inline-flex items-center gap-2 justify-center"
                            >
                            <CheckCircle className="w-5 h-5" /> Yes, I'll Attend
                            </motion.button>
                            <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => guestName && setRsvpStatus("no")}
                            className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2 justify-center"
                            >
                            <XCircle className="w-5 h-5" /> Unable to Attend
                            </motion.button>
                        </div>
                        </>
                    ) : (
                        <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                        >
                        <p className="text-2xl font-semibold">
                            {rsvpStatus === "yes" 
                            ? `🎉 Thank you ${guestName}! We're excited to celebrate with you!` 
                            : `❤️ We'll miss you ${guestName}! Hope to celebrate with you soon.`}
                        </p>
                        {rsvpStatus === "yes" && (
                            <div className="max-w-md mx-auto">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write a message for Azaria & Ketsebaot..."
                                className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                                rows={3}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-3 px-6 py-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" /> Send Message
                            </motion.button>
                            </div>
                        )}
                        </motion.div>
                    )}
                    
                    <div className="pt-4 text-sm text-gray-500">
                        <p>Please RSVP by April 15, 2026</p>
                    </div>
                    </motion.div>
                </div>
                </section>

                {/* Gift Registry Section */}
                <section className="min-h-screen snap-start py-20 px-4 bg-white">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                    >
                    <Gift className="w-20 h-20 text-rose-500 mx-auto" />
                    <h3 className="text-3xl font-serif">Gift Registry</h3>
                    <p className="text-gray-600 text-lg">
                        Your presence is the greatest gift of all. However, if you wish to bless us with a gift, 
                        we have registered at the following places:
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                        {["Home Depot", "IKEA", "Travel Voucher", "Honeymoon Fund"].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-xl cursor-pointer"
                        >
                            <p className="font-semibold text-gray-800">{item}</p>
                        </motion.div>
                        ))}
                    </div>
                    
                    <button
                        onClick={() => setShowGift(!showGift)}
                        className="mt-6 text-rose-600 underline"
                    >
                        View details
                    </button>
                    
                    <AnimatePresence>
                        {showGift && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-rose-50 p-6 rounded-xl mt-4"
                        >
                            <p className="text-gray-700">For more information, please contact:</p>
                            <p className="mt-2">📞 +251 911 234 567</p>
                            <p>📧 registry@azariaketsebaot.com</p>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </motion.div>
                </div>
                </section>

                {/* Footer Section */}
                <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-br from-rose-900 to-purple-900 text-white">
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
                        <p className="text-sm">Azaria: +251 912 345 678 | Ketsebaot: +251 923 456 789</p>
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






// // components/wedding-invitation.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// import { 
//   Calendar, MapPin, Heart, Clock, Music, Camera, Sparkles, 
//   ChevronDown, Gift, MessageCircle, CheckCircle, XCircle, 
//   Star, Cake, Flower2, Wine, Moon, Sun, Cloud, 
//   PartyPopper, Diamond, Mail, Phone, Instagram, Facebook,
//   Volume2, VolumeX, Utensils, Share2, Copy, Check
// } from "lucide-react";
// import Image from "next/image";

// export const WeddingInvitation = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [rsvpStatus, setRsvpStatus] = useState<"pending" | "yes" | "no">("pending");
//   const [message, setMessage] = useState("");
//   const [guestName, setGuestName] = useState("");
//   const [isMuted, setIsMuted] = useState(true);
//   const [showGift, setShowGift] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [activeImage, setActiveImage] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const { scrollYProgress } = useScroll({ container: containerRef });
//   const [isRevealing, setIsRevealing] = useState(false);
//   const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, type: string}>>([]);
//   const heroRef = useRef<HTMLElement>(null);
  
//   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
//   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

//   const weddingDate = new Date(2026, 4, 10); // May 10, 2026

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = weddingDate.getTime() - now;

//       if (distance > 0) {
//         setCountdown({
//           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
//           seconds: Math.floor((distance % (1000 * 60)) / 1000),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//     const handleOpenInvitation = () => {
//     setIsRevealing(true);
    
//     // Create celebration particles
//     const newParticles = [];
//     for (let i = 0; i < 50; i++) {
//       newParticles.push({
//         id: Date.now() + i,
//         x: Math.random() * window.innerWidth,
//         y: window.innerHeight / 2,
//         type: ['❤️', '✨', '💕', '🌸', '🎉', '💑', '⭐', '🌹'][Math.floor(Math.random() * 8)]
//       });
//     }
//     setParticles(newParticles);
    
//     // Remove particles after animation
//     setTimeout(() => setParticles([]), 3000);
    
//     // Open invitation with delay
//     setTimeout(() => {
//       setIsOpen(true);
//       setIsRevealing(false);
//     }, 800);
//   };

//   // Sample images similar to your invitation style
//   const coupleImages = [
//     { src: "/images/couple.jpg", alt: "Azaria & Ketsebaot - Engagement" },
//     { src: "/images/couple.jpg", alt: "Azaria & Ketsebaot - Wedding" },
//     { src: "/images/couple.jpg", alt: "Azaria & Ketsebaot - Together" },
//   ];

//   const galleryImages = [
//     { src: "/images/couple.jpg", alt: "Wedding preparation" },
//     { src: "/images/gallery-2.jpg", alt: "Ring ceremony" },
//     { src: "/images/gallery-3.jpg", alt: "First dance" },
//     { src: "/images/gallery-4.jpg", alt: "Celebration" },
//     { src: "/images/gallery-5.jpg", alt: "Family photo" },
//     { src: "/images/gallery-6.jpg", alt: "Wedding cake" },
//   ];

//   const timelineEvents = [
//     { time: "10:00 AM", title: "Wedding Ceremony", icon: Heart, description: "Sacred Heart Cathedral", location: "Addis Ababa" },
//     { time: "11:30 AM", title: "Cocktail Hour", icon: Wine, description: "Garden Terrace", location: "Grand Palace Hotel" },
//     { time: "1:00 PM", title: "Lunch Reception", icon: Utensils, description: "Grand Ballroom", location: "Grand Palace Hotel" },
//     { time: "4:00 PM", title: "Photo Session", icon: Camera, description: "Garden & Indoor", location: "Hotel Grounds" },
//     { time: "6:00 PM", title: "Evening Celebration", icon: PartyPopper, description: "Dancing & Entertainment", location: "Grand Ballroom" },
//     { time: "8:00 PM", title: "Cake Cutting", icon: Cake, description: "Dessert & Coffee", location: "Grand Ballroom" },
//   ];

//   const copyInviteLink = () => {
//     navigator.clipboard.writeText("https://azaria-ketsebaot.wedding/invite");
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const toggleMusic = () => {
//     if (audioRef.current) {
//       if (isMuted) {
//         audioRef.current.play();
//       } else {
//         audioRef.current.pause();
//       }
//       setIsMuted(!isMuted);
//     }
//   };

//   // Calendar days for May 2026
//   const getCalendarDays = () => {
//     const days = [];
//     const firstDay = new Date(2026, 4, 1).getDay();
//     const daysInMonth = 31;
    
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null);
//     }
    
//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(i);
//     }
    
//     return days;
//   };

//   const calendarDays = getCalendarDays();
//   const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   return (
//     <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative">
//         {/* Background Music */}
//         <audio ref={audioRef} loop>
//             <source src="/wedding-music.mp3" type="audio/mpeg" />
//         </audio>
        
//         {/* Music Control Button */}
//         <motion.button
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1 }}
//             onClick={toggleMusic}
//             className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all"
//         >
//             {isMuted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-rose-500" />}
//         </motion.button>

//         {/* Share Button */}
//         <motion.button
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 1.1 }}
//             onClick={copyInviteLink}
//             className="fixed top-4 right-20 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all"
//         >
//             {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5 text-rose-500" />}
//         </motion.button>

//         {/* Celebration Particles */}
//         <AnimatePresence>
//             {particles.map((particle) => (
//             <motion.div
//                 key={particle.id}
//                 initial={{ x: particle.x, y: particle.y, scale: 0, opacity: 1 }}
//                 animate={{ 
//                 y: particle.y - 300 - Math.random() * 200,
//                 x: particle.x + (Math.random() - 0.5) * 200,
//                 scale: 1.5,
//                 opacity: 0
//                 }}
//                 transition={{ duration: 1.5, ease: "easeOut" }}
//                 className="fixed z-[200] pointer-events-none text-2xl"
//                 style={{ left: 0, top: 0 }}
//             >
//                 {particle.type}
//             </motion.div>
//             ))}
//         </AnimatePresence>

//         {/* Hero Section - Save the Date with Couple Image */}
//         <section className="relative min-h-screen snap-start flex items-center justify-center px-4 overflow-hidden">
//             <div className="absolute inset-0 z-0">
//                 <Image
//                     src="/images/couple.jpg"
//                     alt="Wedding Background"
//                     fill
//                     className="object-cover object-center"
//                     priority
//                 />
//                 {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" /> */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
//             </div>
            
//             <motion.div
//                 style={{ opacity, scale }}
//                 className="text-center max-w-4xl mx-auto relative z-10"
//             >
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8 }}
//                     className="space-y-6"
//                 >
//                     <motion.div
//                         animate={{ scale: [1, 1.1, 1] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                         >
//                         <Heart className="w-16 h-16 text-rose-400 mx-auto fill-rose-400/30" />
//                     </motion.div>
                    
//                     <span className="text-rose-300 font-serif text-lg tracking-wider bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full inline-block">
//                         SAVE THE DATE
//                     </span>
                    
//                     <h1 className="text-5xl md:text-7xl font-bold font-serif text-white drop-shadow-2xl">
//                         AZARIA & KETSEBAOT
//                     </h1>
                    
//                     <p className="text-2xl md:text-3xl text-white font-light drop-shadow-lg">
//                         Are Getting Married!
//                     </p>
                    
//                     <div className="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-6 mt-8">
//                         <div className="text-4xl md:text-6xl font-bold text-white">MAY 10, 2026</div>
//                     </div>
                    
//                     {/* Countdown Timer */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
//                         {Object.entries(countdown).map(([unit, value], idx) => (
//                             <motion.div
//                             key={unit}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: idx * 0.1 }}
//                             className="bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50"
//                             >
//                             <div className="text-3xl md:text-4xl font-bold text-white">{String(value).padStart(2, '0')}</div>
//                             <div className="text-xs uppercase text-white/90">{unit}</div>
//                             </motion.div>
//                         ))}
//                     </div>
                    
//                     <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         animate={{ 
//                             boxShadow: ["0px 0px 0px rgba(244, 63, 94, 0)", "0px 0px 20px rgba(244, 63, 94, 0.5)", "0px 0px 0px rgba(244, 63, 94, 0)"]
//                         }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                         onClick={() => setIsOpen(true)}
//                         className="mt-12 px-8 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
//                     >
//                         Open Invitation <ChevronDown className="w-4 h-4 animate-bounce" />
//                     </motion.button>
//                 </motion.div>
//             </motion.div>
            
//             <motion.div
//                 animate={{ y: [0, 10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//                 className="absolute bottom-8 left-1/2 -translate-x-1/2"
//                 >
//                 <ChevronDown className="w-6 h-6 text-white" />
//             </motion.div>
//         </section>

//         {/* Main Invitation Content */}
//         <AnimatePresence>
//             {isOpen && (
//             <>
//                 {/* Welcome & Couple Images Section */}
//                 <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-br from-rose-50 via-white to-amber-50">
//                     <div className="max-w-6xl mx-auto">
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             whileInView={{ opacity: 1 }}
//                             viewport={{ once: true }}
//                             className="text-center space-y-6 mb-12"
//                         >
//                             <Heart className="w-16 h-16 text-rose-500 mx-auto fill-rose-200" />
//                             <h2 className="text-4xl md:text-5xl font-serif">Together with their families</h2>
//                             <p className="text-xl text-gray-700 max-w-2xl mx-auto">
//                                 Azaria & Ketsebaot joyfully invite you to celebrate their wedding day!
//                             </p>
//                         </motion.div>

//                         {/* Couple Images Grid */}
//                         <div className="grid md:grid-cols-3 gap-6 mb-12">
//                             {coupleImages.map((img, idx) => (
//                                 <motion.div
//                                     key={idx}
//                                     initial={{ opacity: 0, y: 30 }}
//                                     whileInView={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: idx * 0.2 }}
//                                     whileHover={{ scale: 1.02 }}
//                                     className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
//                                 >
//                                     <Image
//                                         src={img.src}
//                                         alt={img.alt}
//                                         fill
//                                         className="object-cover hover:scale-110 transition-transform duration-500"
//                                     />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
//                                 </motion.div>
//                             ))}
//                         </div>

//                         {/* Wedding Details Card */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             className="bg-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl border border-rose-100"
//                         >
//                             <Calendar className="w-12 h-12 text-rose-500 mx-auto" />
//                             <div>
//                                 <p className="text-3xl font-serif">Sunday, May 10th, 2026</p>
//                                 <p className="text-gray-600 mt-2 text-lg">Ceremony begins at 10:00 AM</p>
//                             </div>
//                             <div>
//                                 <MapPin className="w-10 h-10 text-rose-500 mx-auto mb-2" />
//                                 <p className="text-xl font-semibold">Sacred Heart Cathedral</p>
//                                 <p className="text-gray-600">Addis Ababa, Ethiopia</p>
//                             </div>
//                             <div className="pt-4">
//                                 <p className="text-gray-500">Reception to follow at</p>
//                                 <p className="text-lg font-semibold text-rose-600">Grand Palace Hotel</p>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </section>

//                 {/* Event Timeline Section */}
//                  <section className="min-h-screen snap-start py-20 px-4 bg-white">
//                     <div className="max-w-6xl mx-auto">
//                         <motion.h3
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             className="text-4xl font-serif text-center mb-12 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent"
//                         >
//                             Event Timeline
//                         </motion.h3>
//                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {timelineEvents.map((event, idx) => (
//                                 <motion.div
//                                     key={idx}
//                                     initial={{ opacity: 0, x: -20 }}
//                                     whileInView={{ opacity: 1, x: 0 }}
//                                     transition={{ delay: idx * 0.1 }}
//                                     whileHover={{ y: -5 }}
//                                     className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 shadow-lg border border-rose-100"
//                                 >
//                                     <event.icon className="w-12 h-12 text-rose-500 mb-4" />
//                                     <p className="text-2xl font-bold text-gray-800">{event.time}</p>
//                                     <p className="text-xl font-semibold text-gray-700 mt-2">{event.title}</p>
//                                     <p className="text-gray-600 mt-2">{event.description}</p>
//                                     <p className="text-sm text-gray-500 mt-2">{event.location}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Calendar View Section */}
//                 <section className="relative min-h-screen snap-start py-20 px-4 overflow-hidden">
//                     {/* Background Image + Overlay */}
//                     <div className="absolute inset-0 z-0">
//                         <Image
//                             src="/images/couple.jpg"
//                             alt="Wedding Background"
//                             fill
//                             className="object-cover object-center"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
//                     </div>

//                     <div className="relative max-w-4xl mx-auto z-10">
//                         <motion.div
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             className="text-center mb-12 text-white"
//                         >
//                             <h3 className="text-4xl font-serif mb-4">Save the Date</h3>
//                             <p className="">Mark your calendar for our special day</p>
//                         </motion.div>

//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95 }}
//                             whileInView={{ opacity: 1, scale: 1 }}
//                             className="text-white rounded-3xl p-6 shadow-xl"
//                         >
//                             {/* Calendar Header */}
//                             <div className="text-center mb-6">
//                                 <h4 className="text-2xl font-bold text-">MAY 2026</h4>
//                             </div>
                            
//                             {/* Week Days */}
//                             <div className="grid grid-cols-7 gap-1 mb-2">
//                                 {weekDays.map((day, i) => (
//                                 <div key={i} className="text-center font-semibold text-white text-sm py-2">
//                                     {day}
//                                 </div>
//                                 ))}
//                             </div>

//                             {/* Calendar Days */}
//                             <div className="grid grid-cols-7 gap-1">
//                                 {calendarDays.map((day, i) => (
//                                 <div
//                                     key={i}
//                                     className={`text-center py-3 text-sm transition-all relative ${
//                                     day === 10 
//                                         ? "font-bold scale-105"
//                                         : day 
//                                         ? "hover:bg-rose-100 cursor-pointer text-gray-200 rounded-lg"
//                                         : ""
//                                     }`}
//                                 >
//                                     {day === 10 ? (
//                                         <div className="relative">
//                                             {/* Heart Border SVG */}
//                                             <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10" viewBox="0 0 24 24">
//                                                 <path
//                                                     d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//                                                     fill="none"
//                                                     stroke="#f43f5e"
//                                                     strokeWidth="1.5"
//                                                     className="animate-pulse"
//                                                 />
//                                             </svg>
//                                             <span className="relative z-10 text-rose-500 font-bold">{day}</span>
//                                         </div>
//                                     ) : (
//                                         <span className={day ? "text-gray-200" : ""}>{day || ""}</span>
//                                     )}
//                                 </div>
//                                 ))}
//                             </div>
                            
//                             <div className="mt-6 text-center">
//                                 <div className="inline-flex items-center gap-2 px-4 py-2 bg- rounded-full">
//                                 <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
//                                 <span className="text-sm text-rose-400">Wedding Day - May 10, 2026</span>
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </section>

//                 {/* Photo Gallery Section */}
//                 <section className="min-h-screen snap-start py-20 px-4 bg-white">
//                     <div className="max-w-6xl mx-auto">
//                         <motion.h3
//                             initial={{ opacity: 0, y: 30 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             className="text-4xl font-serif text-center mb-12"
//                         >
//                             Precious Moments
//                         </motion.h3>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                             {galleryImages.map((img, idx) => (
//                                 <motion.div
//                                     key={idx}
//                                     initial={{ opacity: 0, scale: 0.9 }}
//                                     whileInView={{ opacity: 1, scale: 1 }}
//                                     transition={{ delay: idx * 0.05 }}
//                                     whileHover={{ scale: 1.03 }}
//                                     className="relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md group"
//                                 >
//                                     <Image
//                                         src={img.src}
//                                         alt={img.alt}
//                                         fill
//                                         className="object-cover group-hover:scale-110 transition-transform duration-500"
//                                     />
//                                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                         <Camera className="w-8 h-8 text-white" />
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>

//                 {/* RSVP Section */}
//                 <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-br from-rose-100 via-white to-amber-100">
//                 <div className="max-w-2xl mx-auto">
//                     <motion.div
//                     initial={{ opacity: 0, scale: 0.95 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     className="bg-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl"
//                     >
//                     <PartyPopper className="w-16 h-16 text-rose-500 mx-auto" />
//                     <h3 className="text-3xl font-serif">Will You Attend the Party?</h3>
                    
//                     {rsvpStatus === "pending" ? (
//                         <>
//                         <input
//                             type="text"
//                             placeholder="Your Full Name"
//                             value={guestName}
//                             onChange={(e) => setGuestName(e.target.value)}
//                             className="w-full max-w-md mx-auto p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-center"
//                         />
//                         <div className="flex flex-col sm:flex-row justify-center gap-4">
//                             <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => guestName && setRsvpStatus("yes")}
//                             className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all inline-flex items-center gap-2 justify-center"
//                             >
//                             <CheckCircle className="w-5 h-5" /> Yes, I'll Attend
//                             </motion.button>
//                             <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => guestName && setRsvpStatus("no")}
//                             className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2 justify-center"
//                             >
//                             <XCircle className="w-5 h-5" /> Unable to Attend
//                             </motion.button>
//                         </div>
//                         </>
//                     ) : (
//                         <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="space-y-4"
//                         >
//                         <p className="text-2xl font-semibold">
//                             {rsvpStatus === "yes" 
//                             ? `🎉 Thank you ${guestName}! We're excited to celebrate with you!` 
//                             : `❤️ We'll miss you ${guestName}! Hope to celebrate with you soon.`}
//                         </p>
//                         {rsvpStatus === "yes" && (
//                             <div className="max-w-md mx-auto">
//                             <textarea
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 placeholder="Write a message for Azaria & Ketsebaot..."
//                                 className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
//                                 rows={3}
//                             />
//                             <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className="mt-3 px-6 py-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2"
//                             >
//                                 <MessageCircle className="w-4 h-4" /> Send Message
//                             </motion.button>
//                             </div>
//                         )}
//                         </motion.div>
//                     )}
                    
//                     <div className="pt-4 text-sm text-gray-500">
//                         <p>Please RSVP by April 15, 2026</p>
//                     </div>
//                     </motion.div>
//                 </div>
//                 </section>

//                 {/* Gift Registry Section */}
//                 <section className="min-h-screen snap-start py-20 px-4 bg-white">
//                 <div className="max-w-2xl mx-auto text-center">
//                     <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     className="space-y-6"
//                     >
//                     <Gift className="w-20 h-20 text-rose-500 mx-auto" />
//                     <h3 className="text-3xl font-serif">Gift Registry</h3>
//                     <p className="text-gray-600 text-lg">
//                         Your presence is the greatest gift of all. However, if you wish to bless us with a gift, 
//                         we have registered at the following places:
//                     </p>
                    
//                     <div className="grid sm:grid-cols-2 gap-4 mt-8">
//                         {["Home Depot", "IKEA", "Travel Voucher", "Honeymoon Fund"].map((item, idx) => (
//                         <motion.div
//                             key={idx}
//                             whileHover={{ scale: 1.05 }}
//                             className="bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-xl cursor-pointer"
//                         >
//                             <p className="font-semibold text-gray-800">{item}</p>
//                         </motion.div>
//                         ))}
//                     </div>
                    
//                     <button
//                         onClick={() => setShowGift(!showGift)}
//                         className="mt-6 text-rose-600 underline"
//                     >
//                         View details
//                     </button>
                    
//                     <AnimatePresence>
//                         {showGift && (
//                         <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="bg-rose-50 p-6 rounded-xl mt-4"
//                         >
//                             <p className="text-gray-700">For more information, please contact:</p>
//                             <p className="mt-2">📞 +251 911 234 567</p>
//                             <p>📧 registry@azariaketsebaot.com</p>
//                         </motion.div>
//                         )}
//                     </AnimatePresence>
//                     </motion.div>
//                 </div>
//                 </section>

//                 {/* Footer Section */}
//                 <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-br from-rose-900 to-purple-900 text-white">
//                 <div className="max-w-4xl mx-auto text-center space-y-12">
//                     <motion.div
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     className="space-y-6"
//                     >
//                     <Heart className="w-24 h-24 text-rose-400 mx-auto fill-rose-400/30" />
//                     <h3 className="text-4xl font-serif">Thank You</h3>
//                     <p className="text-xl text-rose-200">
//                         We can't wait to celebrate our special day with you!
//                     </p>
//                     <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//                         Your love, support, and presence mean the world to us. 
//                         Thank you for being part of our journey.
//                     </p>
                    
//                     <div className="flex justify-center gap-6 pt-8">
//                         <Mail className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
//                         <Phone className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
//                         <Instagram className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
//                         <Facebook className="w-6 h-6 cursor-pointer hover:text-rose-300 transition-colors" />
//                     </div>
                    
//                     <div className="pt-12 space-y-2">
//                         <p className="text-sm text-gray-400">For questions, please contact:</p>
//                         <p className="text-sm">Azaria: +251 912 345 678 | Ketsebaot: +251 923 456 789</p>
//                         <p className="text-xs text-gray-500 mt-6">#AzariaAndKetsebaot #AKForever #Wedding2026</p>
//                     </div>
//                     </motion.div>
//                 </div>
//                 </section>
//             </>
//             )}
//         </AnimatePresence>
//     </div>
//   );
// };






// // // // components/wedding-invitation.tsx
// // // components/wedding-invitation.tsx
// // "use client";

// // import { useState, useEffect, useRef } from "react";
// // import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// // import { 
// //   Calendar, MapPin, Heart, Clock, Music, Camera, Sparkles, 
// //   ChevronDown, Gift, MessageCircle, CheckCircle, XCircle, 
// //   Star, Cake, Flower2, Wine, Moon, Sun, Cloud, 
// //   PartyPopper, Diamond, Mail, Phone, Instagram, Facebook,
// //   Airplay, Volume2, VolumeX, Coffee, Utensils
// // } from "lucide-react";
// // import Image from "next/image";

// // export const WeddingInvitation = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [rsvpStatus, setRsvpStatus] = useState<"pending" | "yes" | "no">("pending");
// //   const [message, setMessage] = useState("");
// //   const [guestName, setGuestName] = useState("");
// //   const [isMuted, setIsMuted] = useState(true);
// //   const [showGift, setShowGift] = useState(false);
// //   const [selectedSong, setSelectedSong] = useState<string | null>(null);
// //   const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, x: number, y: number}>>([]);
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const audioRef = useRef<HTMLAudioElement>(null);
// //   const { scrollYProgress } = useScroll({ container: containerRef });
  
// //   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
// //   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);
// //   const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);

// //   const weddingDate = new Date(2026, 4, 10); // May 10, 2026
// //   const ceremonyDate = new Date(2026, 4, 10);

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       const now = new Date().getTime();
// //       const distance = weddingDate.getTime() - now;

// //       if (distance > 0) {
// //         setCountdown({
// //           days: Math.floor(distance / (1000 * 60 * 60 * 24)),
// //           hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
// //           minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
// //           seconds: Math.floor((distance % (1000 * 60)) / 1000),
// //         });
// //       }
// //     }, 1000);

// //     // Create floating hearts animation
// //     const heartInterval = setInterval(() => {
// //       if (isOpen) {
// //         const newHeart = {
// //           id: Date.now(),
// //           x: Math.random() * window.innerWidth,
// //           y: window.innerHeight + 100,
// //         };
// //         setFloatingHearts(prev => [...prev.slice(-20), newHeart]);
// //         setTimeout(() => {
// //           setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
// //         }, 8000);
// //       }
// //     }, 1000);

// //     return () => {
// //       clearInterval(timer);
// //       clearInterval(heartInterval);
// //     };
// //   }, [isOpen]);

// //   const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

// //   const timelineEvents = [
// //     { time: "10:00 AM", title: "Wedding Ceremony", icon: Heart, description: "Sacred Heart Cathedral", color: "rose" },
// //     { time: "11:30 AM", title: "Cocktail Hour", icon: Wine, description: "Garden Terrace", color: "amber" },
// //     { time: "1:00 PM", title: "Lunch Reception", icon: Utensils, description: "Grand Ballroom", color: "purple" },
// //     { time: "3:00 PM", title: "First Dance", icon: Music, description: "Dance Floor Opens", color: "pink" },
// //     { time: "5:00 PM", title: "Cake Cutting", icon: Cake, description: "Celebration Continues", color: "rose" },
// //     { time: "7:00 PM", title: "Evening Party", icon: PartyPopper, description: "Live Music & Dancing", color: "amber" },
// //   ];

// //   const galleryImages = [
// //     { id: 1, src: "/api/placeholder/400/400", alt: "Couple 1" },
// //     { id: 2, src: "/api/placeholder/400/400", alt: "Couple 2" },
// //     { id: 3, src: "/api/placeholder/400/400", alt: "Couple 3" },
// //     { id: 4, src: "/api/placeholder/400/400", alt: "Couple 4" },
// //   ];

// //   const songs = [
// //     { name: "Perfect - Ed Sheeran", emoji: "🎵" },
// //     { name: "A Thousand Years - Christina Perri", emoji: "🎶" },
// //     { name: "Can't Help Falling in Love - Elvis", emoji: "💕" },
// //   ];

// //   const toggleMusic = () => {
// //     if (audioRef.current) {
// //       if (isMuted) {
// //         audioRef.current.play();
// //       } else {
// //         audioRef.current.pause();
// //       }
// //       setIsMuted(!isMuted);
// //     }
// //   };

// //   return (
// //     <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth relative">
// //       {/* Background Music */}
// //       <audio ref={audioRef} loop>
// //         <source src="/wedding-music.mp3" type="audio/mpeg" />
// //       </audio>
      
// //       {/* Music Control Button */}
// //       <motion.button
// //         initial={{ opacity: 0, scale: 0 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         transition={{ delay: 1 }}
// //         onClick={toggleMusic}
// //         className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all"
// //       >
// //         {isMuted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-rose-500" />}
// //       </motion.button>

// //       {/* Floating Hearts Animation */}
// //       {floatingHearts.map((heart) => (
// //         <motion.div
// //           key={heart.id}
// //           initial={{ y: heart.y, x: heart.x, opacity: 1, scale: 0 }}
// //           animate={{ y: heart.y - 800, opacity: 0, scale: 1 }}
// //           transition={{ duration: 6, ease: "linear" }}
// //           className="fixed z-40 pointer-events-none"
// //         >
// //           <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
// //         </motion.div>
// //       ))}

// //       {/* Hero Section - Save the Date */}
// //       <section className="relative min-h-screen snap-start flex items-center justify-center px-4 overflow-hidden">
// //         <motion.div
// //           style={{ y: backgroundY }}
// //           className="absolute inset-0 z-0"
// //         >
// //           <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 via-purple-900/20 to-amber-900/30" />
// //           <Image
// //             src="/api/placeholder/1920/1080"
// //             alt="Wedding Background"
// //             fill
// //             className="object-cover"
// //             priority
// //           />
// //         </motion.div>
        
// //         <motion.div
// //           style={{ opacity, scale }}
// //           className="text-center max-w-4xl mx-auto relative z-10"
// //         >
// //           <motion.div
// //             initial={{ opacity: 0, y: 50 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //             className="space-y-6"
// //           >
// //             <motion.div
// //               animate={{ rotate: 360 }}
// //               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //               className="inline-block"
// //             >
// //               <Sparkles className="w-12 h-12 text-rose-400 mx-auto" />
// //             </motion.div>
// //             <span className="text-rose-400 font-serif text-lg tracking-wider bg-white/30 backdrop-blur-sm px-6 py-2 rounded-full inline-block">
// //               SAVE THE DATE
// //             </span>
// //             <h1 className="text-6xl md:text-8xl font-bold font-serif bg-gradient-to-r from-rose-500 via-purple-500 to-amber-500 bg-clip-text text-transparent">
// //               AZARIA & KETSEBAOT
// //             </h1>
// //             <p className="text-2xl md:text-3xl text-white font-light drop-shadow-lg">
// //               Are Getting Married!
// //             </p>
// //             <motion.div
// //               initial={{ scale: 0 }}
// //               animate={{ scale: 1 }}
// //               transition={{ delay: 0.5, type: "spring" }}
// //               className="inline-block bg-white/20 backdrop-blur-md rounded-2xl p-8 mt-8"
// //             >
// //               <div className="text-5xl md:text-7xl font-bold text-white">May 10, 2026</div>
// //             </motion.div>
            
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
// //               {Object.entries(countdown).map(([unit, value], idx) => (
// //                 <motion.div
// //                   key={unit}
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: idx * 0.1 }}
// //                   className="bg-white/30 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50"
// //                 >
// //                   <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
// //                   <div className="text-xs uppercase text-white/90">{unit}</div>
// //                 </motion.div>
// //               ))}
// //             </div>
            
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               animate={{ 
// //                 boxShadow: ["0px 0px 0px rgba(244, 63, 94, 0)", "0px 0px 20px rgba(244, 63, 94, 0.5)", "0px 0px 0px rgba(244, 63, 94, 0)"]
// //               }}
// //               transition={{ duration: 2, repeat: Infinity }}
// //               onClick={() => setIsOpen(true)}
// //               className="mt-12 px-8 py-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
// //             >
// //               Open Invitation <ChevronDown className="w-4 h-4 animate-bounce" />
// //             </motion.button>
// //           </motion.div>
// //         </motion.div>
        
// //         <motion.div
// //           animate={{ y: [0, 10, 0] }}
// //           transition={{ duration: 2, repeat: Infinity }}
// //           className="absolute bottom-8 left-1/2 -translate-x-1/2"
// //         >
// //           <ChevronDown className="w-6 h-6 text-white" />
// //         </motion.div>
// //       </section>

// //       {/* Main Invitation Section */}
// //       <AnimatePresence>
// //         {isOpen && (
// //           <>
// //             {timelineEvents.map((event, idx) => (
// //               <motion.section
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 50 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true, margin: "-100px" }}
// //                 transition={{ delay: idx * 0.1 }}
// //                 className="min-h-screen snap-start flex items-center justify-center py-20 px-4 relative overflow-hidden"
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-br from-white via-rose-50 to-purple-50" />
// //                 <div className="max-w-6xl mx-auto relative z-10 w-full">
// //                   {idx === 0 && (
// //                     <>
// //                       {/* Welcome Message */}
// //                       <motion.div
// //                         initial={{ opacity: 0, scale: 0.9 }}
// //                         whileInView={{ opacity: 1, scale: 1 }}
// //                         className="text-center space-y-6 mb-16"
// //                       >
// //                         <motion.div
// //                           animate={{ rotate: [0, 10, -10, 0] }}
// //                           transition={{ duration: 2, repeat: Infinity }}
// //                         >
// //                           <Heart className="w-16 h-16 text-rose-500 mx-auto fill-rose-200" />
// //                         </motion.div>
// //                         <h2 className="text-5xl md:text-6xl font-serif bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
// //                           Together with their families
// //                         </h2>
// //                         <p className="text-2xl text-gray-700">
// //                           Azaria & Ketsebaot joyfully invite you to celebrate their wedding day!
// //                         </p>
// //                         <div className="w-32 h-0.5 bg-gradient-to-r from-rose-300 via-purple-300 to-amber-300 mx-auto my-6" />
// //                       </motion.div>

// //                       {/* Wedding Details */}
// //                       <motion.div
// //                         initial={{ opacity: 0, y: 30 }}
// //                         whileInView={{ opacity: 1, y: 0 }}
// //                         className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl border border-rose-100"
// //                       >
// //                         <Calendar className="w-12 h-12 text-rose-500 mx-auto" />
// //                         <div>
// //                           <p className="text-3xl font-serif">Sunday, May 10th, 2026</p>
// //                           <p className="text-gray-600 mt-2 text-lg">Ceremony begins at 10:00 AM</p>
// //                         </div>
// //                         <div>
// //                           <MapPin className="w-10 h-10 text-rose-500 mx-auto mb-2" />
// //                           <p className="text-xl font-semibold">Sacred Heart Cathedral</p>
// //                           <p className="text-gray-600">Addis Ababa, Ethiopia</p>
// //                           <p className="text-gray-500 text-sm mt-2">Followed by reception at Grand Palace Hotel</p>
// //                         </div>
// //                       </motion.div>
// //                     </>
// //                   )}

// //                   {idx === 1 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
// //                         Event Timeline
// //                       </h3>
// //                       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                         {timelineEvents.map((event, eventIdx) => (
// //                           <motion.div
// //                             key={eventIdx}
// //                             initial={{ opacity: 0, x: -20 }}
// //                             whileInView={{ opacity: 1, x: 0 }}
// //                             transition={{ delay: eventIdx * 0.1 }}
// //                             whileHover={{ scale: 1.05, rotateY: 5 }}
// //                             className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
// //                           >
// //                             <div className={`absolute inset-0 bg-gradient-to-br from-${event.color}-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
// //                             <event.icon className={`w-12 h-12 text-${event.color}-500 mb-4 group-hover:scale-110 transition-transform`} />
// //                             <p className="text-2xl font-bold text-gray-800">{event.time}</p>
// //                             <p className="text-xl font-semibold text-gray-700 mt-2">{event.title}</p>
// //                             <p className="text-gray-500 mt-2">{event.description}</p>
// //                           </motion.div>
// //                         ))}
// //                       </div>
// //                     </>
// //                   )}

// //                   {idx === 2 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12">Our Love Story</h3>
// //                       <div className="grid md:grid-cols-3 gap-8">
// //                         {[
// //                           { year: "2020", title: "First Met", desc: "At a mutual friend's party", icon: Star },
// //                           { year: "2022", title: "Fell in Love", desc: "Traveling through Europe", icon: Heart },
// //                           { year: "2024", title: "Engaged", desc: "A magical sunset proposal", icon: Diamond },
// //                         ].map((story, idx) => (
// //                           <motion.div
// //                             key={idx}
// //                             initial={{ opacity: 0, y: 50 }}
// //                             whileInView={{ opacity: 1, y: 0 }}
// //                             transition={{ delay: idx * 0.2 }}
// //                             whileHover={{ y: -10 }}
// //                             className="text-center bg-white rounded-2xl p-8 shadow-lg"
// //                           >
// //                             <story.icon className="w-16 h-16 text-rose-500 mx-auto mb-4" />
// //                             <div className="text-3xl font-bold text-rose-500 mb-2">{story.year}</div>
// //                             <div className="text-xl font-semibold mb-2">{story.title}</div>
// //                             <div className="text-gray-600">{story.desc}</div>
// //                           </motion.div>
// //                         ))}
// //                       </div>
// //                     </>
// //                   )}

// //                   {idx === 3 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12">Photo Gallery</h3>
// //                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                         {galleryImages.map((img, idx) => (
// //                           <motion.div
// //                             key={img.id}
// //                             initial={{ opacity: 0, scale: 0.8 }}
// //                             whileInView={{ opacity: 1, scale: 1 }}
// //                             whileHover={{ scale: 1.05 }}
// //                             transition={{ delay: idx * 0.1 }}
// //                             className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg"
// //                           >
// //                             <Image
// //                               src={img.src}
// //                               alt={img.alt}
// //                               fill
// //                               className="object-cover hover:scale-110 transition-transform duration-500"
// //                             />
// //                           </motion.div>
// //                         ))}
// //                       </div>
// //                     </>
// //                   )}

// //                   {idx === 4 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12">Wedding Playlist</h3>
// //                       <div className="max-w-2xl mx-auto space-y-4">
// //                         {songs.map((song, idx) => (
// //                           <motion.div
// //                             key={idx}
// //                             initial={{ opacity: 0, x: -50 }}
// //                             whileInView={{ opacity: 1, x: 0 }}
// //                             whileHover={{ scale: 1.02 }}
// //                             onClick={() => setSelectedSong(song.name)}
// //                             className={`bg-white rounded-xl p-4 shadow-md cursor-pointer transition-all ${selectedSong === song.name ? 'ring-2 ring-rose-500 bg-rose-50' : 'hover:shadow-lg'}`}
// //                           >
// //                             <div className="flex items-center gap-4">
// //                               <div className="text-3xl">{song.emoji}</div>
// //                               <div className="flex-1">
// //                                 <p className="font-semibold text-gray-800">{song.name}</p>
// //                               </div>
// //                               {selectedSong === song.name && (
// //                                 <motion.div
// //                                   initial={{ scale: 0 }}
// //                                   animate={{ scale: 1 }}
// //                                 >
// //                                   <Music className="w-5 h-5 text-rose-500" />
// //                                 </motion.div>
// //                               )}
// //                             </div>
// //                           </motion.div>
// //                         ))}
// //                       </div>
// //                     </>
// //                   )}

// //                   {idx === 5 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12">RSVP</h3>
// //                       <motion.div
// //                         initial={{ opacity: 0, scale: 0.95 }}
// //                         whileInView={{ opacity: 1, scale: 1 }}
// //                         className="bg-gradient-to-r from-rose-100 via-purple-100 to-amber-100 rounded-3xl p-8 md:p-12 text-center space-y-6 max-w-2xl mx-auto"
// //                       >
// //                         <h4 className="text-2xl font-serif">Will You Attend the Celebration?</h4>
// //                         {rsvpStatus === "pending" ? (
// //                           <>
// //                             <input
// //                               type="text"
// //                               placeholder="Your Name"
// //                               value={guestName}
// //                               onChange={(e) => setGuestName(e.target.value)}
// //                               className="w-full max-w-md mx-auto p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
// //                             />
// //                             <div className="flex justify-center gap-4">
// //                               <motion.button
// //                                 whileHover={{ scale: 1.05 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 onClick={() => guestName && setRsvpStatus("yes")}
// //                                 className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all inline-flex items-center gap-2"
// //                               >
// //                                 <CheckCircle className="w-5 h-5" /> Yes, I'll be there!
// //                               </motion.button>
// //                               <motion.button
// //                                 whileHover={{ scale: 1.05 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 onClick={() => guestName && setRsvpStatus("no")}
// //                                 className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2"
// //                               >
// //                                 <XCircle className="w-5 h-5" /> Sadly, I can't make it
// //                               </motion.button>
// //                             </div>
// //                           </>
// //                         ) : (
// //                           <motion.div
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             className="space-y-4"
// //                           >
// //                             <p className="text-2xl font-semibold">
// //                               {rsvpStatus === "yes" 
// //                                 ? `🎉 Thank you ${guestName}! We're so excited to celebrate with you!` 
// //                                 : `❤️ We'll miss you ${guestName}! Hope to see you soon.`}
// //                             </p>
// //                             {rsvpStatus === "yes" && (
// //                               <div className="max-w-md mx-auto">
// //                                 <textarea
// //                                   value={message}
// //                                   onChange={(e) => setMessage(e.target.value)}
// //                                   placeholder="Write a special message for Azaria & Ketsebaot..."
// //                                   className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
// //                                   rows={3}
// //                                 />
// //                                 <motion.button
// //                                   whileHover={{ scale: 1.05 }}
// //                                   whileTap={{ scale: 0.95 }}
// //                                   className="mt-3 px-6 py-2 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2"
// //                                 >
// //                                   <MessageCircle className="w-4 h-4" /> Send Warm Wishes
// //                                 </motion.button>
// //                               </div>
// //                             )}
// //                           </motion.div>
// //                         )}
// //                       </motion.div>
// //                     </>
// //                   )}

// //                   {idx === 6 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12">Gift Registry</h3>
// //                       <motion.div
// //                         initial={{ opacity: 0, y: 30 }}
// //                         whileInView={{ opacity: 1, y: 0 }}
// //                         className="text-center max-w-2xl mx-auto"
// //                       >
// //                         <motion.div
// //                           whileHover={{ scale: 1.05 }}
// //                           onClick={() => setShowGift(!showGift)}
// //                           className="bg-white rounded-2xl p-8 shadow-lg cursor-pointer"
// //                         >
// //                           <Gift className="w-16 h-16 text-rose-500 mx-auto mb-4" />
// //                           <p className="text-xl text-gray-700">Your presence is the greatest gift, but if you wish to bless us...</p>
// //                           <motion.button
// //                             animate={{ backgroundColor: ["#f43f5e", "#a855f7", "#f43f5e"] }}
// //                             transition={{ duration: 2, repeat: Infinity }}
// //                             className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-full"
// //                           >
// //                             View Registry
// //                           </motion.button>
// //                         </motion.div>
                        
// //                         <AnimatePresence>
// //                           {showGift && (
// //                             <motion.div
// //                               initial={{ opacity: 0, height: 0 }}
// //                               animate={{ opacity: 1, height: "auto" }}
// //                               exit={{ opacity: 0, height: 0 }}
// //                               className="mt-6 bg-white rounded-2xl p-6 shadow-lg"
// //                             >
// //                               <p className="text-gray-700">We've registered at:</p>
// //                               <div className="space-y-2 mt-4">
// //                                 <p>🏠 Home Depot Gift Card</p>
// //                                 <p>✈️ Travel Voucher</p>
// //                                 <p>🍽️ Fine Dining Experience</p>
// //                               </div>
// //                             </motion.div>
// //                           )}
// //                         </AnimatePresence>
// //                       </motion.div>
// //                     </>
// //                   )}

// //                   {idx === 7 && (
// //                     <>
// //                       <h3 className="text-4xl font-serif text-center mb-12">Travel & Accommodation</h3>
// //                       <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
// //                         <motion.div
// //                           initial={{ opacity: 0, x: -30 }}
// //                           whileInView={{ opacity: 1, x: 0 }}
// //                           className="bg-white rounded-2xl p-6 shadow-lg"
// //                         >
// //                           <Airplay className="w-12 h-12 text-rose-500 mx-auto mb-4" />
// //                           <h4 className="text-xl font-semibold text-center mb-3">Getting Here</h4>
// //                           <p className="text-gray-600 text-center">Bole International Airport is just 15 minutes from the venue. Shuttle service available.</p>
// //                         </motion.div>
// //                         <motion.div
// //                           initial={{ opacity: 0, x: 30 }}
// //                           whileInView={{ opacity: 1, x: 0 }}
// //                           className="bg-white rounded-2xl p-6 shadow-lg"
// //                         >
// //                           <Hotel className="w-12 h-12 text-rose-500 mx-auto mb-4" />
// //                           <h4 className="text-xl font-semibold text-center mb-3">Places to Stay</h4>
// //                           <p className="text-gray-600 text-center">Special rates available at Grand Palace Hotel and Hilton Addis.</p>
// //                         </motion.div>
// //                       </div>
// //                     </>
// //                   )}

// //                   {idx === 8 && (
// //                     <>
// //                       <div className="text-center max-w-2xl mx-auto">
// //                         <motion.div
// //                           initial={{ opacity: 0, scale: 0.5 }}
// //                           whileInView={{ opacity: 1, scale: 1 }}
// //                           className="space-y-6"
// //                         >
// //                           <motion.div
// //                             animate={{ rotate: [0, 360] }}
// //                             transition={{ duration: 20, repeat: Infinity }}
// //                           >
// //                             <Heart className="w-20 h-20 text-rose-500 mx-auto fill-rose-200" />
// //                           </motion.div>
// //                           <h3 className="text-3xl font-serif">We Can't Wait to Celebrate With You!</h3>
// //                           <p className="text-xl text-gray-600">Your love and support mean the world to us.</p>
// //                           <div className="flex justify-center gap-4 pt-8">
// //                             <Mail className="w-5 h-5 text-gray-500" />
// //                             <Phone className="w-5 h-5 text-gray-500" />
// //                             <Instagram className="w-5 h-5 text-gray-500" />
// //                             <Facebook className="w-5 h-5 text-gray-500" />
// //                           </div>
// //                           <p className="text-sm text-gray-400 mt-8">#AzariaAndKetsebaot #Wedding2026 #AKForever</p>
// //                         </motion.div>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>
// //               </motion.section>
// //             ))}
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // };

// // // Add missing Hotel icon import
// // const Hotel = (props: any) => (
// //   <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //     <path d="M10 10h4" />
// //     <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
// //     <path d="M3 21h18" />
// //     <path d="M8 7h8" />
// //     <path d="M8 11h8" />
// //     <path d="M8 15h4" />
// //   </svg>
// // );





// // // "use client";

// // // import { useState, useEffect, useRef } from "react";
// // // import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// // // import { Calendar, MapPin, Heart, Clock, Music, Camera, Sparkles, ChevronDown, Gift, MessageCircle, CheckCircle, XCircle, Star } from "lucide-react";

// // // export const WeddingInvitation = () => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [rsvpStatus, setRsvpStatus] = useState<"pending" | "yes" | "no">("pending");
// // //   const [message, setMessage] = useState("");
// // //   const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
// // //   const containerRef = useRef<HTMLDivElement>(null);
// // //   const { scrollYProgress } = useScroll({ container: containerRef });
// // //   const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
// // //   const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

// // //   const weddingDate = new Date(2026, 4, 10); // January 22, 2026
// // //   const ceremonyDate = new Date(2026, 4, 10); // November 15, 2026

// // //   useEffect(() => {
// // //     const timer = setInterval(() => {
// // //       const now = new Date().getTime();
// // //       const distance = weddingDate.getTime() - now;

// // //       setCountdown({
// // //         days: Math.floor(distance / (1000 * 60 * 60 * 24)),
// // //         hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
// // //         minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
// // //         seconds: Math.floor((distance % (1000 * 60)) / 1000),
// // //       });
// // //     }, 1000);

// // //     return () => clearInterval(timer);
// // //   }, []);

// // //   const timelineEvents = [
// // //     { time: "11:00 AM", title: "Wedding Ceremony", icon: Heart, description: "Hilton International Hotel, Ethiopia" },
// // //     { time: "1:00 PM", title: "Lunch Reception", icon: Music, description: "Grand Ballroom" },
// // //     { time: "3:00 PM", title: "Photo Session", icon: Camera, description: "Garden Terrace" },
// // //     { time: "6:00 PM", title: "Evening Celebration", icon: Sparkles, description: "Dancing & Entertainment" },
// // //   ];

// // //   return (
// // //     <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
// // //       {/* Hero Section - Save the Date */}
// // //       <section className="relative min-h-screen snap-start flex items-center justify-center px-4 bg-gradient-to-br from-rose-100 via-white to-amber-100">
// // //         <motion.div
// // //           style={{ opacity, scale }}
// // //           className="text-center max-w-4xl mx-auto"
// // //         >
// // //           <motion.div
// // //             initial={{ opacity: 0, y: 50 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ duration: 0.8 }}
// // //             className="space-y-6"
// // //           >
// // //             <span className="text-rose-500 font-serif text-lg tracking-wider">SAVE THE DATE</span>
// // //             <h1 className="text-6xl md:text-8xl font-bold font-serif bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
// // //               FIKERAB & FENAN
// // //             </h1>
// // //             <p className="text-2xl md:text-3xl text-gray-700 font-light">Are Getting Married!</p>
// // //             <div className="flex justify-center gap-8 py-8">
// // //               <div className="text-center">
// // //                 <div className="text-4xl md:text-5xl font-bold text-rose-600">10</div>
// // //                 <div className="text-sm uppercase tracking-wide">May</div>
// // //                 <div className="text-lg font-semibold">2026</div>
// // //               </div>
// // //             </div>
// // //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
// // //               {Object.entries(countdown).map(([unit, value]) => (
// // //                 <div key={unit} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
// // //                   <div className="text-3xl md:text-4xl font-bold text-rose-600">{value}</div>
// // //                   <div className="text-xs uppercase text-gray-600">{unit}</div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             <motion.button
// // //               whileHover={{ scale: 1.05 }}
// // //               whileTap={{ scale: 0.95 }}
// // //               onClick={() => setIsOpen(true)}
// // //               className="mt-12 px-8 py-3 bg-rose-600 text-white rounded-full font-semibold shadow-lg hover:bg-rose-700 transition-all inline-flex items-center gap-2"
// // //             >
// // //               Open Invitation <ChevronDown className="w-4 h-4" />
// // //             </motion.button>
// // //           </motion.div>
// // //         </motion.div>
// // //         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
// // //           <ChevronDown className="w-6 h-6 text-rose-400" />
// // //         </div>
// // //       </section>

// // //       {/* Main Invitation Section */}
// // //       <AnimatePresence>
// // //         {isOpen && (
// // //           <motion.section
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             exit={{ opacity: 0 }}
// // //             className="min-h-screen snap-start bg-white py-20 px-4"
// // //           >
// // //             <div className="max-w-4xl mx-auto space-y-16">
// // //               {/* Header */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 viewport={{ once: true }}
// // //                 className="text-center space-y-4"
// // //               >
// // //                 <Heart className="w-12 h-12 text-rose-500 mx-auto" />
// // //                 <h2 className="text-4xl md:text-5xl font-serif">Together with their families</h2>
// // //                 <p className="text-xl text-gray-600">
// // //                   Fikreab & Fenan joyfully invite you to celebrate their wedding day!
// // //                 </p>
// // //                 <div className="w-24 h-0.5 bg-rose-300 mx-auto my-6" />
// // //               </motion.div>

// // //               {/* Wedding Details */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, y: 30 }}
// // //                 whileInView={{ opacity: 1, y: 0 }}
// // //                 viewport={{ once: true }}
// // //                 className="bg-rose-50 rounded-3xl p-8 md:p-12 text-center space-y-6"
// // //               >
// // //                 <Calendar className="w-10 h-10 text-rose-500 mx-auto" />
// // //                 <div>
// // //                   <p className="text-2xl font-serif">Saturday, November 15th, 2026</p>
// // //                   <p className="text-gray-600 mt-2">Ceremony begins at 11:00 AM</p>
// // //                 </div>
// // //                 <div>
// // //                   <MapPin className="w-8 h-8 text-rose-500 mx-auto mb-2" />
// // //                   <p className="text-xl">Hilton International Hotel</p>
// // //                   <p className="text-gray-600">Addis Ababa, Ethiopia</p>
// // //                 </div>
// // //               </motion.div>

// // //               {/* Timeline */}
// // //               <div className="space-y-6">
// // //                 <h3 className="text-2xl font-serif text-center">Event Timeline</h3>
// // //                 <div className="grid md:grid-cols-2 gap-4">
// // //                   {timelineEvents.map((event, idx) => (
// // //                     <motion.div
// // //                       key={idx}
// // //                       initial={{ opacity: 0, x: -20 }}
// // //                       whileInView={{ opacity: 1, x: 0 }}
// // //                       transition={{ delay: idx * 0.1 }}
// // //                       viewport={{ once: true }}
// // //                       className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-rose-100"
// // //                     >
// // //                       <event.icon className="w-8 h-8 text-rose-500" />
// // //                       <div>
// // //                         <p className="font-bold">{event.time}</p>
// // //                         <p className="font-semibold">{event.title}</p>
// // //                         <p className="text-sm text-gray-500">{event.description}</p>
// // //                       </div>
// // //                     </motion.div>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //               {/* RSVP Section */}
// // //               <motion.div
// // //                 initial={{ opacity: 0, scale: 0.95 }}
// // //                 whileInView={{ opacity: 1, scale: 1 }}
// // //                 viewport={{ once: true }}
// // //                 className="bg-gradient-to-r from-rose-100 to-amber-100 rounded-3xl p-8 text-center space-y-6"
// // //               >
// // //                 <h3 className="text-2xl font-serif">Will You Attend the Party?</h3>
// // //                 {rsvpStatus === "pending" ? (
// // //                   <div className="flex justify-center gap-4">
// // //                     <button
// // //                       onClick={() => setRsvpStatus("yes")}
// // //                       className="px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all inline-flex items-center gap-2"
// // //                     >
// // //                       <CheckCircle className="w-5 h-5" /> Yes
// // //                     </button>
// // //                     <button
// // //                       onClick={() => setRsvpStatus("no")}
// // //                       className="px-8 py-3 bg-gray-600 text-white rounded-full font-semibold hover:bg-gray-700 transition-all inline-flex items-center gap-2"
// // //                     >
// // //                       <XCircle className="w-5 h-5" /> No
// // //                     </button>
// // //                   </div>
// // //                 ) : (
// // //                   <div className="space-y-4">
// // //                     <p className="text-lg font-semibold">
// // //                       {rsvpStatus === "yes" ? "🎉 We're so excited to celebrate with you!" : "❤️ We'll miss you! Hope to see you soon."}
// // //                     </p>
// // //                     {rsvpStatus === "yes" && (
// // //                       <div className="max-w-md mx-auto">
// // //                         <textarea
// // //                           value={message}
// // //                           onChange={(e) => setMessage(e.target.value)}
// // //                           placeholder="Write a message for Fikreab & Fenan..."
// // //                           className="w-full p-3 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
// // //                           rows={3}
// // //                         />
// // //                         <button className="mt-3 px-6 py-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-all inline-flex items-center gap-2">
// // //                           <MessageCircle className="w-4 h-4" /> Send Message
// // //                         </button>
// // //                       </div>
// // //                     )}
// // //                   </div>
// // //                 )}
// // //               </motion.div>

// // //               {/* Calendar */}
// // //               <motion.div
// // //                 initial={{ opacity: 0 }}
// // //                 whileInView={{ opacity: 1 }}
// // //                 viewport={{ once: true }}
// // //                 className="text-center"
// // //               >
// // //                 <h3 className="text-2xl font-serif mb-4">Save the Date</h3>
// // //                 <div className="grid grid-cols-7 gap-1 max-w-md mx-auto bg-white p-4 rounded-2xl shadow-lg">
// // //                   {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
// // //                     <div key={i} className="text-center font-bold text-rose-500 text-sm py-2">{day}</div>
// // //                   ))}
// // //                   {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
// // //                     <div
// // //                       key={date}
// // //                       className={`text-center py-2 text-sm rounded-full ${date === 22 ? "bg-rose-500 text-white font-bold" : "hover:bg-rose-100"}`}
// // //                     >
// // //                       {date}
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </motion.div>

// // //               {/* Footer */}
// // //               <div className="text-center pt-12 border-t border-rose-100">
// // //                 <Heart className="w-6 h-6 text-rose-400 mx-auto mb-4" />
// // //                 <p className="text-gray-500 text-sm">We can't wait to celebrate with you!</p>
// // //                 <p className="text-gray-400 text-xs mt-4">#FikreabAndFenan #FenaWedding2026</p>
// // //               </div>
// // //             </div>
// // //           </motion.section>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // };