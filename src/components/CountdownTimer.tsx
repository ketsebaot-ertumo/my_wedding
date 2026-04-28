// 'use client'

// import { useState, useEffect } from 'react'
// import { CalendarDays, Clock, Heart } from 'lucide-react'

// const weddingDate = new Date('2026-05-10T10:00:00')

// export default function CountdownTimer() {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   })

//   useEffect(() => {
//     const calculateTimeLeft = () => {
      
//       const difference = weddingDate.getTime() - new Date().getTime()
      
//       if (difference > 0) {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / 1000 / 60) % 60),
//           seconds: Math.floor((difference / 1000) % 60)
//         })
//       }
//     }
//     console.log('Calculating time left...', timeLeft);

//     calculateTimeLeft()
//     const timer = setInterval(calculateTimeLeft, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   const isWeddingDay = timeLeft.days === 0 && timeLeft.hours === 0 && 
//                       timeLeft.minutes === 0 && timeLeft.seconds === 0

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6">
//       <div className="glass-effect rounded-2xl p-8">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-2 mb-4">
//             <Heart className="w-8 h-8 text-rose-500" />
//             <h2 className="text-3xl font-bold text-gray-800">Countdown to Our Big Day</h2>
//           </div>
          
//           <div className="flex items-center justify-center gap-4 text-gray-600 mb-2">
//             <CalendarDays className="w-5 h-5" />
//             <span>May 10, 2026</span>
//             <Clock className="w-5 h-5 ml-4" />
//             <span>12:00 PM</span>
//           </div>
//         </div>

//         {isWeddingDay ? (
//           <div className="text-center py-12">
//             <div className="text-5xl font-bold text-rose-600 mb-4 animate-pulse">
//               🎉 Today is the Day! 🎉
//             </div>
//             <p className="text-xl text-gray-600">
//               The wedding is happening right now! Share your moments with us.
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Countdown Timer */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               {Object.entries(timeLeft).map(([unit, value]) => (
//                 <div
//                   key={unit}
//                   className="text-center p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 border shadow-sm"
//                 >
//                   <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
//                     {value.toString().padStart(2, '0')}
//                   </div>
//                   <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
//                     {unit}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Progress Bar */}
//             <div className="mb-8">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Time Until Wedding</span>
//                 <span>
//                   {timeLeft.days} days, {timeLeft.hours} hours left
//                 </span>
//               </div>
//               <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-1000"
//                   style={{
//                     width: `${100 - (timeLeft.days / 365 * 100)}%`
//                   }}
//                 />
//               </div>
//             </div>
//           </>
//         )}

//         {/* Venue Info */}
//         <div className="mt-8 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Wedding Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h4 className="font-semibold text-gray-700 mb-2">Ceremony</h4>
//               <p className="text-gray-600">Beautiful Garden Resort</p>
//               <p className="text-gray-600">123 Love Street, City</p>
//               <p className="text-gray-600">10:00 AM - 11:00 AM</p>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-700 mb-2">Reception</h4>
//               <p className="text-gray-600">Grand Ballroom</p>
//               <p className="text-gray-600">Same Venue</p>
//               <p className="text-gray-600">6:00 PM - 12:00 AM</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { CalendarDays, Clock, Heart } from 'lucide-react'

const weddingDate = new Date('2026-05-10T10:00:00')

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const isWeddingDay = timeLeft.days === 0 && timeLeft.hours === 0 && 
                      timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 backdrop-blur-sm">
            <Heart className="w-5 h-5 text-rose-400" />
            <span className="text-rose-300 text-sm font-medium">Save The Date</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
            Our Wedding Day
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-rose-400" />
              <span>May 10, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-400" />
              <span>10:00 AM</span>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        {isWeddingDay ? (
          <div className="py-12">
            <div className="text-5xl md:text-7xl font-bold text-rose-400 mb-4 animate-pulse">
              🎉 Today is the Day! 🎉
            </div>
            <p className="text-xl text-gray-300">
              The celebration has begun! Join us in creating beautiful memories.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Timer Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div
                  key={unit}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                  <div className="relative text-center p-6 md:p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                    <div className="text-4xl md:text-6xl font-bold text-white mb-2">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-rose-400 uppercase tracking-wider">
                      {unit}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Days remaining</span>
                <span>{timeLeft.days} days, {timeLeft.hours} hours</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-1000 relative"
                  style={{
                    width: `${100 - (timeLeft.days / 365 * 100)}%`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="pt-8">
          <button className="group px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 transform hover:scale-105">
            Save Your Spot
            <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}