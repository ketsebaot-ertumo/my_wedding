'use client'

import { motion } from 'framer-motion'
import { Heart, Calendar, MapPin, Camera, ArrowDown, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">

         {/* <div className="absolute inset-0 z-0">
                              <Image
                                  src="/images/couple.jpg"
                                  alt="Wedding Background"
                                  fill
                                  className="object-cover object-center"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 z-0" />
                          </div> */}

      {/* Soft Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-rose-200 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-pink-300 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="container mx-auto px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full bg-white/70 backdrop-blur-md shadow-md">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span className="text-sm md:text-base font-medium tracking-wide text-rose-700">
              By God’s Grace • We Are Getting Married
            </span>
          </div>

          {/* Names */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font- leading-tight mb-6 tracking-tight " style={{ fontFamily: 'var(--font-imperial)' }}>
            <span className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
              Azaria
            </span>
            <span className="mx-4 text-gray-400">&</span>
            <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
              Ketsebaot
            </span>
          </h1>

          {/* Romantic Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 font-light mb-4">
            “What God has joined together, let no one separate.”
          </p>

          <p className="text-lg text-gray-500 mb-12">
            Celebrating Love • Faith • Covenant
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/40"
            >
              <Calendar className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold text-lg mb-1">Wedding Date</h3>
              <p className="text-gray-600">May 10, 2026</p>
              <p className="text-sm text-gray-400">ግንቦት 02, 2018 ዓ.ም</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/40"
            >
              <MapPin className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold text-lg mb-1">Location</h3>
              <p className="text-gray-600">Hawassa, Ethiopia</p>
              <p className="text-sm text-gray-400">Joshua Campaign</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-white/40"
            >
              <Camera className="w-8 h-8 mx-auto mb-3 text-rose-500" />
              <h3 className="font-semibold text-lg mb-1">Share Memories</h3>
              <p className="text-gray-600">Upload your photos</p>
              <p className="text-sm text-gray-400">Be part of our story</p>
            </motion.div>

          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Link href="#upload">
              <Button size="lg" className="px-8 py-6 text-lg rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 shadow-lg">
                <Camera className="mr-2 h-5 w-5" />
                Upload Memories
              </Button>
            </Link>

            <Link href="#gallery">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-2xl border-rose-300 text-rose-600 hover:bg-rose-50">
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-rose-400"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

    </section>
  )
}




// 'use client'

// import { motion } from 'framer-motion'
// import { Heart, Calendar, MapPin, Camera } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-wedding">
//       {/* Animated Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-gentle" />
//         <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-gentle delay-1000" />
//         <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-gentle delay-500" />
//       </div>

//       <div className="relative z-10 container mx-auto px-4 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto"
//         >
//           <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
//             <Heart className="w-5 h-5 text-rose-500" />
//             <span className="text-lg font-semibold text-rose-700">We&apos;re Getting Married!</span>
//           </div>

//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
//             <span className="text-blue-600">Azaria</span>
//             <span className="mx-4">&</span>
//             <span className="text-rose-600">Ketsebaot</span>
//           </h1>

//           <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-light">
//             Celebrating Our Love Story
//           </p>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
//             <div className="glass-effect p-6 rounded-2xl">
//               <Calendar className="w-10 h-10 mx-auto mb-4 text-rose-500" />
//               <h3 className="text-xl font-semibold mb-2">Wedding Date</h3>
//               <p className="text-gray-600">May 10, 2026</p>
//             </div>
            
//             <div className="glass-effect p-6 rounded-2xl">
//               <MapPin className="w-10 h-10 mx-auto mb-4 text-rose-500" />
//               <h3 className="text-xl font-semibold mb-2">Hawassa, Ethiopia</h3>
//               <p className="text-gray-600">Joshua campaign</p>
//             </div>
            
//             <div className="glass-effect p-6 rounded-2xl">
//               <Camera className="w-10 h-10 mx-auto mb-4 text-rose-500" />
//               <h3 className="text-xl font-semibold mb-2">Share Memories</h3>
//               <p className="text-gray-600">Upload photos & videos</p>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link href="#upload" className="w-full sm:w-auto">
//               <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
//                 <Camera className="mr-2 h-5 w-5" />
//                 Upload Memories
//               </Button>
//             </Link>

//             <Link href="#gallery" className="w-full sm:w-auto">
//               <Button size="lg" variant="outline" className="border-rose-300 text-rose-600 hover:bg-rose-50">
//                 View Gallery
//               </Button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>

//        {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5, duration: 1 }}
//         className="absolute bottom-60 left-1/2 transform -translate-x-1/2 cursor-pointer"
//         onClick={() => {
//           document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })
//         }}
//       >
//         <motion.div
//           animate={{ 
//             y: [0, 10, 0],
//           }}
//           transition={{ 
//             repeat: Infinity, 
//             duration: 2,
//             ease: "easeInOut"
//           }}
//           className="flex flex-col items-center"
//         >
//           {/* <p className="text-sm text-rose-600 mb-2 font-medium">Scroll down</p> */}
//           <div className="w-6 h-10 border-2 border-rose-300 rounded-full flex justify-center">
//             <motion.div
//               animate={{ 
//                 y: [0, 12, 0],
//               }}
//               transition={{ 
//                 repeat: Infinity, 
//                 duration: 2,
//                 ease: "easeInOut"
//               }}
//               className="w-1.5 h-3 bg-rose-500 rounded-full mt-2"
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </section>
//   )
// }










// // 'use client'

// // import { motion } from 'framer-motion'
// // import { Heart, Calendar, MapPin, Camera, ChevronDown, Sparkles } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import Link from 'next/link'
// // import { useEffect, useState } from 'react'

// // export default function HeroSection() {
// //   const [mounted, setMounted] = useState(false)

// //   useEffect(() => {
// //     setMounted(true)
// //   }, [])

// //   if (!mounted) return null

// //   return (
// //     <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-50 via-white to-purple-50">
// //       {/* Enhanced Animated Background */}
// //       <div className="absolute inset-0">
// //         {/* Floating Hearts */}
// //         {[...Array(6)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             initial={{ opacity: 0, scale: 0 }}
// //             animate={{ 
// //               opacity: [0.2, 0.5, 0.2],
// //               scale: [1, 1.2, 1],
// //               y: [0, -30, 0],
// //               x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0]
// //             }}
// //             transition={{
// //               duration: 8,
// //               delay: i * 0.5,
// //               repeat: Infinity,
// //               ease: "easeInOut"
// //             }}
// //             className="absolute"
// //             style={{
// //               top: `${20 + i * 10}%`,
// //               left: `${10 + i * 15}%`,
// //             }}
// //           >
// //             <Heart className="w-8 h-8 text-rose-200/30 fill-rose-200/20" />
// //           </motion.div>
// //         ))}

// //         {/* Gradient Orbs */}
// //         <motion.div
// //           animate={{ 
// //             scale: [1, 1.2, 1],
// //             x: [0, 50, 0],
// //             y: [0, -30, 0]
// //           }}
// //           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
// //           className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-rose-300/20 to-purple-300/20 rounded-full blur-3xl"
// //         />
// //         <motion.div
// //           animate={{ 
// //             scale: [1, 1.3, 1],
// //             x: [0, -40, 0],
// //             y: [0, 40, 0]
// //           }}
// //           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
// //           className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-pink-300/20 rounded-full blur-3xl"
// //         />
        
// //         {/* Sparkle Effect */}
// //         <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
// //       </div>

// //       {/* Main Content */}
// //       <div className="relative z-10 container mx-auto px-4">
// //         <motion.div
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, ease: "easeOut" }}
// //           className="max-w-5xl mx-auto text-center"
// //         >
// //           {/* Wedding Badge */}
// //           <motion.div
// //             initial={{ scale: 0 }}
// //             animate={{ scale: 1 }}
// //             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
// //             className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md shadow-lg border border-rose-100"
// //           >
// //             <Sparkles className="w-5 h-5 text-rose-500" />
// //             <span className="text-base font-medium bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
// //               Celebrating Love & Unity
// //             </span>
// //             <Sparkles className="w-5 h-5 text-rose-500" />
// //           </motion.div>

// //           {/* Names with Enhanced Typography */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.3, duration: 0.8 }}
// //           >
// //             <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight">
// //               <span className="relative inline-block">
// //                 <span className="relative z-10 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
// //                   Azaria
// //                 </span>
// //                 <motion.span
// //                   initial={{ width: 0 }}
// //                   animate={{ width: "100%" }}
// //                   transition={{ delay: 1, duration: 1 }}
// //                   className="absolute bottom-2 left-0 h-3 bg-blue-200/30 -z-10 rounded-full"
// //                 />
// //               </span>
// //               <span className="mx-4 text-5xl md:text-7xl align-middle text-gray-300 font-light">
// //                 &
// //               </span>
// //               <span className="relative inline-block">
// //                 <span className="relative z-10 bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
// //                   Ketsebaot
// //                 </span>
// //                 <motion.span
// //                   initial={{ width: 0 }}
// //                   animate={{ width: "100%" }}
// //                   transition={{ delay: 1.2, duration: 1 }}
// //                   className="absolute bottom-2 left-0 h-3 bg-rose-200/30 -z-10 rounded-full"
// //                 />
// //               </span>
// //             </h1>
// //           </motion.div>

// //           {/* Date with Romantic Typography */}
// //           <motion.p
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.6, duration: 0.8 }}
// //             className="text-2xl md:text-3xl text-gray-600 mb-12 font-light italic"
// //           >
// //             <span className="bg-white/50 px-8 py-3 rounded-full inline-block backdrop-blur-sm">
// //               Join us on <span className="font-semibold text-rose-600">May 10, 2026</span> in 
// //               <span className="font-semibold text-blue-600"> Hawassa, Ethiopia</span>
// //             </span>
// //           </motion.p>

// //           {/* Info Cards with Enhanced Design */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.8, duration: 0.8 }}
// //             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
// //           >
// //             {[
// //               { icon: Calendar, title: "The Big Day", desc: "May 10, 2026", color: "rose", delay: 0.9 },
// //               { icon: MapPin, title: "Hawassa, Ethiopia", desc: "Joshua Campaign", color: "blue", delay: 1.0 },
// //               { icon: Camera, title: "Share Memories", desc: "Upload photos & videos", color: "purple", delay: 1.1 }
// //             ].map((item, index) => (
// //               <motion.div
// //                 key={index}
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: item.delay, duration: 0.5 }}
// //                 whileHover={{ y: -5, scale: 1.02 }}
// //                 className="group relative"
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
// //                 <div className="relative bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
// //                   <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${item.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
// //                     <item.icon className={`w-8 h-8 text-${item.color}-500`} />
// //                   </div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
// //                   <p className="text-gray-600 text-sm">{item.desc}</p>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           {/* CTA Buttons with Enhanced Design */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 1.3, duration: 0.8 }}
// //             className="flex flex-col sm:flex-row gap-5 justify-center items-center"
// //           >
// //             <Link href="#upload" className="w-full sm:w-auto">
// //               <Button 
// //                 size="lg" 
// //                 className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-10 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
// //               >
// //                 <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
// //                 <Camera className="mr-2 h-5 w-5 inline-block group-hover:rotate-12 transition-transform" />
// //                 Upload Memories
// //               </Button>
// //             </Link>

// //             <Link href="#gallery" className="w-full sm:w-auto">
// //               <Button 
// //                 size="lg" 
// //                 variant="outline" 
// //                 className="group border-2 border-rose-200 hover:border-rose-300 bg-white/80 backdrop-blur-sm hover:bg-rose-50 text-rose-600 px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
// //               >
// //                 <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
// //                 View Gallery
// //               </Button>
// //             </Link>
// //           </motion.div>
// //         </motion.div>
// //       </div>

// //       {/* Enhanced Scroll Indicator */}
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 2, duration: 1 }}
// //         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
// //         onClick={() => {
// //           document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })
// //         }}
// //       >
// //         <motion.div
// //           animate={{ y: [0, 10, 0] }}
// //           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
// //           className="flex flex-col items-center gap-2"
// //         >
// //           <span className="text-sm text-gray-400 group-hover:text-rose-400 transition-colors">
// //             Scroll to explore
// //           </span>
// //           <div className="w-6 h-10 border-2 border-gray-300 group-hover:border-rose-300 rounded-full flex justify-center transition-colors">
// //             <motion.div
// //               animate={{ y: [0, 12, 0] }}
// //               transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
// //               className="w-1.5 h-3 bg-rose-400 rounded-full mt-2 group-hover:bg-rose-500 transition-colors"
// //             />
// //           </div>
// //         </motion.div>
// //       </motion.div>

// //       {/* Decorative Bottom Wave */}
// //       <div className="absolute bottom-0 left-0 right-0">
// //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto opacity-20">
// //           <path fill="#f472b6" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
// //         </svg>
// //       </div>
// //     </section>
// //   )
// // }

