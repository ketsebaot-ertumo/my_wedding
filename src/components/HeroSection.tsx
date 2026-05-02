// 'use client'

// import { motion, useScroll, useTransform } from 'framer-motion'
// import { Heart, Calendar, MapPin, Camera, ArrowDown, Sparkles, Flower2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useTranslations } from 'next-intl';
// import { useEffect, useRef, useState } from 'react'

// export default function HeroSection() {
//   const t = useTranslations('wedding');
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const { scrollYProgress } = useScroll()
//   const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener('mousemove', handleMouseMove)
//     return () => window.removeEventListener('mousemove', handleMouseMove)
//   }, [])

//   const infoCards = [
//     {
//       icon: Calendar,
//       title: "Sacred Date",
//       primaryText: "May 10, 2026",
//       secondaryText: "Sunday Morning",
//       accent: "from-rose-500/20 to-pink-500/20",
//       iconColor: "text-rose-400",
//       delay: 0.1,
//       description: "Save the date for our special celebration"
//     },
//     {
//       icon: MapPin,
//       title: "Venue Location",
//       primaryText: "Hawassa, Ethiopia",
//       secondaryText: "Joshua Campaign Center",
//       accent: "from-amber-500/20 to-orange-500/20",
//       iconColor: "text-amber-400",
//       delay: 0.2,
//       description: "Where our journey continues"
//     },
//     {
//       icon: Camera,
//       title: "Share Your Joy",
//       primaryText: "Upload Memories",
//       secondaryText: "Be part of our story",
//       accent: "from-purple-500/20 to-pink-500/20",
//       iconColor: "text-purple-400",
//       delay: 0.3,
//       description: "Your photos make our day complete"
//     }
//   ]
  
//   // Refs and state for horizontal scroll dots
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [activeDot, setActiveDot] = useState(1); // Start with index 1 (middle card)
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Simple scroll handler using scrollLeft position
//   const updateActiveDot = () => {
//     if (!scrollContainerRef.current || cardRefs.current.length === 0) return;
    
//     const container = scrollContainerRef.current;
//     const scrollLeft = container.scrollLeft;
//     const containerWidth = container.clientWidth;
    
//     // Find which card is most centered in the viewport
//     let closestIndex = 0;
//     let smallestDistance = Infinity;
    
//     cardRefs.current.forEach((card, index) => {
//       if (card) {
//         const cardOffsetLeft = card.offsetLeft;
//         const cardWidth = card.offsetWidth;
//         const cardCenter = cardOffsetLeft + (cardWidth / 2);
//         const viewportCenter = scrollLeft + (containerWidth / 2);
//         const distance = Math.abs(cardCenter - viewportCenter);
        
//         if (distance < smallestDistance) {
//           smallestDistance = distance;
//           closestIndex = index;
//         }
//       }
//     });
    
//     // Only update if different and initialized
//     if (closestIndex !== activeDot && isInitialized) {
//       setActiveDot(closestIndex);
//     }
//   };

//   // Initialize scroll position to show middle card
//   useEffect(() => {
//     if (!scrollContainerRef.current || cardRefs.current.length === 0 || isInitialized) return;
    
//     // Wait for cards to be rendered
//     const timer = setTimeout(() => {
//       const container = scrollContainerRef.current;
//       const middleCard = cardRefs.current[1]; // Index 1 is the middle card
      
//       if (container && middleCard) {
//         // Calculate scroll position to center the middle card
//         const cardOffsetLeft = middleCard.offsetLeft;
//         const cardWidth = middleCard.offsetWidth;
//         const containerWidth = container.clientWidth;
//         const scrollTo = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
//         // Set initial scroll position without animation
//         container.scrollLeft = scrollTo;
        
//         // Mark as initialized
//         setIsInitialized(true);
        
//         // Update active dot to confirm
//         setActiveDot(1);
//       }
//     }, 100);
    
//     return () => clearTimeout(timer);
//   }, [isInitialized]);

//   // Attach scroll event listener
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container || !isInitialized) return;
    
//     // Use requestAnimationFrame for smooth performance
//     let ticking = false;
    
//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           updateActiveDot();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };
    
//     container.addEventListener('scroll', handleScroll);
    
//     return () => {
//       container.removeEventListener('scroll', handleScroll);
//     };
//   }, [isInitialized, activeDot]);

//   // Click handler for dots to scroll to specific card
//   const scrollToCard = (index: number) => {
//     if (cardRefs.current[index] && scrollContainerRef.current) {
//       const card = cardRefs.current[index];
//       const container = scrollContainerRef.current;
      
//       // Calculate scroll position to center the card
//       const cardOffsetLeft = card!.offsetLeft;
//       const cardWidth = card!.offsetWidth;
//       const containerWidth = container.clientWidth;
//       const scrollTo = cardOffsetLeft - (containerWidth / 2) + (cardWidth / 2);
      
//       container.scrollTo({
//         left: scrollTo,
//         behavior: 'smooth'
//       });
      
//       // Update active dot immediately for better UX
//       setActiveDot(index);
//     }
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       if (isInitialized) {
//         updateActiveDot();
//       }
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [isInitialized]);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240131/my_wedding/wedding10_jrmmmv.jpg"
//           alt="Azaria & Ketsebaot - Wedding Background"
//           fill
//           className="object-cover object-center"
//           priority
//         />
//         {/* Gradient Overlay - keeps text readable while maintaining image visibility */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
        
//         {/* Optional: Add a soft rose tint overlay */}
//         <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay z-0" />
//       </div>

//       <div className="container mx-auto px-6 text-center relative z-10 mt-30">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="max-w-5xl mx-auto"
//         >
//           {/* Top Badge - Made more readable on image */}
//           <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full backdrop-blur-md shadow-md border border-white/30">
//             <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
//             <span className="text-sm md:text-base font-medium tracking-wide text-rose-400">
//               By God's Grace • We Are Getting Married
//             </span>
//           </div>

//           {/* Names - Now with white text for better contrast on image */}
//           <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6 tracking-tight font-semibold tracking-wide" style={{ fontFamily: 'var(--font-imperial)' }}>
//             <span className="bg-gradient-to-r from-rose-200 to-pink-100 bg-clip-text text-transparent drop-shadow-lg">
//               {t('azu')}
//             </span>
//             <span className="mx-4 text-white/60 drop-shadow-lg">&</span>
//             <span className="bg-gradient-to-r from-pink-100 to-rose-200 bg-clip-text text-transparent drop-shadow-lg">
//               {t('ketsi')}
//             </span>
//           </h1>

//           {/* Romantic Subtitle - White text with shadow for readability */}
//           <p className="text-lg text-white/90 font-light mb-4 drop-shadow-md italic">
//             {t('section-desc')}
//           </p>

//           <p className="text-lg text-white/80 mb-12 drop-shadow-md">
//             {t('section-message')}
//           </p>

//           {/* Modern Info Cards - Elegant Wedding Style with Glassmorphism */}
//           <div className="relative">
//             {/* Mobile horizontal scroll container - scrollbar hidden */}
//             <div 
//               ref={scrollContainerRef}
//               className="overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:overflow-visible scrollbar-hide"
//               style={{
//                 scrollbarWidth: 'none', // Firefox
//                 msOverflowStyle: 'none', // IE/Edge
//                 WebkitOverflowScrolling: 'touch' // Better touch scrolling
//               }}
//             >
//               <div className="flex gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 md:gap-6 lg:gap-8 min-w-max sm:min-w-0">
//                 {infoCards.map((card, idx) => {
//                   const Icon = card.icon
//                   return (
//                     <motion.div
//                       key={idx}
//                       ref={el => { 
//                         cardRefs.current[idx] = el;
//                       }}
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
//                       whileHover={{ y: -5 }}
//                       className="group cursor-pointer w-[280px] sm:w-auto flex-shrink-0 sm:flex-shrink"
//                     >
//                       {/* Main Card - Glassmorphism with Wedding Flair */}
//                       <div className="relative bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 h-full">
                        
//                         {/* Vintage Ornamental Border */}
//                         <div className="absolute inset-0 pointer-events-none">
//                           <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-xl" />
//                           <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl" />
//                           <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-xl" />
//                           <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-xl" />
//                         </div>

//                         {/* Top Decorative Line */}
//                         <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                         {/* Content Container */}
//                         <div className="relative p-5 md:p-6 text-center">
                          
//                           {/* Icon with Wedding Ring Effect */}
//                           <motion.div
//                             whileHover={{ scale: 1.05 }}
//                             transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
//                             className="mb-4 relative inline-block"
//                           >
//                             {/* Ring Background Glow */}
//                             <div className="absolute inset-0 rounded-full bg-rose-400/10 blur-xl group-hover:bg-rose-400/20 transition-all duration-500" />
                            
//                             {/* Icon Circle */}
//                             <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:bg-white/20 transition-all duration-300 border border-white/20">
//                               <Icon className={`w-7 h-7 md:w-8 md:h-8 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`} />
//                             </div>
                            
//                             {/* Decorative Dot */}
//                             <motion.div 
//                               className="absolute -top-1 -right-1 w-2 h-2 bg-rose-400 rounded-full"
//                               animate={{ scale: [1, 1.3, 1] }}
//                               transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
//                             />
//                           </motion.div>

//                           {/* Title */}
//                           <div className="relative mb-3">
//                             <h3 className="font-serif text-base md:text-lg text-white/80 tracking-wide">
//                               {card.title}
//                             </h3>
//                             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent" />
//                           </div>
                          
//                           {/* Primary Text */}
//                           <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2 leading-tight font-serif">
//                             {card.primaryText}
//                           </p>
                          
//                           {/* Secondary Text */}
//                           <div className="flex items-center justify-center gap-2 mb-3">
//                             <span className="text-xs text-rose-400/60">✦</span>
//                             <p className="text-sm text-white/60 font-medium">
//                               {card.secondaryText}
//                             </p>
//                             <span className="text-xs text-rose-400/60">✦</span>
//                           </div>
                          
//                           {/* Description */}
//                           <div className="flex items-center justify-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
//                             <Heart className="w-3 h-3 text-rose-400/60" />
//                             <span className="italic">{card.description}</span>
//                             <Heart className="w-3 h-3 text-rose-400/60" />
//                           </div>

//                           {/* Hover Reveal Bottom Line */}
//                           <motion.div 
//                             className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400/60 to-transparent"
//                             initial={{ scaleX: 0 }}
//                             whileHover={{ scaleX: 1 }}
//                             transition={{ duration: 0.4 }}
//                           />
//                         </div>
//                       </div>
//                     </motion.div>
//                   )
//                 })}
//               </div>
//             </div>
            
//             {/* Dynamic scroll indicator for mobile - DOTS */}
//             <div className="flex justify-center gap-2 mt-6 sm:hidden">
//               {infoCards.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => scrollToCard(idx)}
//                   className={`rounded-full transition-all duration-300 cursor-pointer ${
//                     activeDot === idx 
//                       ? 'w-6 h-1.5 bg-rose-400' 
//                       : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
//                   }`}
//                   style={{
//                     transition: 'all 0.3s ease'
//                   }}
//                   aria-label={`Go to card ${idx + 1}`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center py-4 sm:py-8">
//             <Link href="#upload">
//               <Button size="lg" className="px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 shadow-lg text-white">
//                 <Camera className="mr-2 h-5 w-5" />
//                 Upload Memories
//               </Button>
//             </Link>

//             <Link href="#gallery">
//               <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-2xl border-white/50 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:text-white">
//                 View Gallery
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//       {/* Scroll Indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute hidden sm:block bottom-20 left-1/2 -translate-x-1/2 z-10 ml-6"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//           className="flex flex-col items-center text-white/80"
//         >
//           <ArrowDown className="w-6 h-6" />
//           <span className="text-xs mt-2">Scroll</span>
//         </motion.div>
//       </motion.div>
//     </section>
//   )
// }


'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Camera } from 'lucide-react'
import { Button } from './ui/button'
import { useTranslations } from 'next-intl';


export default function HeroModern() {
  const t = useTranslations('wedding');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0">
        {/* <Image src="/hero-bg.jpg" fill className="object-cover" priority /> */}
        <Image
          src="https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240131/my_wedding/wedding10_jrmmmv.jpg"
          alt="Azaria & Ketsebaot - Wedding Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
        
         {/* Optional: Add a soft rose tint overlay */}
         <div className="absolute inset-0 bg-rose-500/10 mix-blend-overlay z-0" />

        {/* <div className="absolute inset-0 bg-black/50" /> */}
      </div>

      {/* Floating elements - animated */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 text-rose-400/20"
      >
        <Heart className="w-24 h-24" />
      </motion.div>

      {/* Main content - CLEAN, no cards */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-rose-300 text-sm tracking-widest mb-4">
            {t('save-the-date')}
          </p>
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full backdrop-blur-md shadow-md border border-white/30">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-sm md:text-base font-medium tracking-wide text-rose-400/80">
              {t('hero-tite')}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-semibold leading-tight mb-6 tracking-tight font-semibold tracking-wide" style={{ fontFamily: 'var(--font-imperial)' }}>
            <span className="bg-gradient-to-r from-rose-200 to-pink-100 bg-clip-text text-transparent drop-shadow-lg">
              {t('azu')}
            </span>
            <span className="mx-4 text-white/60 drop-shadow-lg">&</span>
            <span className="bg-gradient-to-r from-pink-100 to-rose-200 bg-clip-text text-transparent drop-shadow-lg">
              {t('ketsi')}
            </span>
          </h1>
          
          <div className="flex flex-col items-center gap-2 text-white/80 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{t('date')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{t('city')}</span>
            </div>
          </div>
          
          {/* Floating countdown instead of cards */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 mb-8"
          >
            <p className="text-sm text-rose-300 mb-2">Days Until We Say I Do</p>
            <div className="flex gap-4 text-white">
              <div><span className="text-3xl font-bold">127</span><span className="text-xs ml-1">days</span></div>
              <div><span className="text-3xl font-bold">18</span><span className="text-xs ml-1">hours</span></div>
              <div><span className="text-3xl font-bold">42</span><span className="text-xs ml-1">mins</span></div>
            </div>
          </motion.div> */}
          
          <div className="flex gap-4 justify-center">
            {/* <Button className="bg-rose-500 hover:bg-rose-600">RSVP Now</Button> */}
            <Button onClick={() => (window.location.href = '/#capture')} className="hover:scale-105 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-lg hover:shadow-rose-500/25 transition-all duration-300">
              <Camera className="w-4 h-4 mr-1" />
              {t('capture')}
            </Button>
            <Button onClick={() => (window.location.href = '/#story')} variant="outline" className="border-white/20 text-white bg-gray-700 hover:scale-105 hover:text-white hover:bg-gray-700 hover:border-white/30">
              <Heart className="w-4 h-4 mr-1 text-rose-400/80" />
              {t('story')}
            </Button>
            {/* <Button variant="outline" className="border-gray-600 text-white bg-gray-600">Our Story</Button> */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
