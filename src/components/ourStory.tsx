'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart, Calendar, MapPin, Gem, Camera, ArrowDown, Play, Pause, Users, Sparkles, SparklesIcon, BookOpen, Cross, MessageCircle, CalendarHeart, Home, Cake, Diamond } from 'lucide-react'
import { useTranslations } from 'next-intl';


const storyChapters = [
  {
    id: 1,
    year: "Dec 2023 - Jan 2024",
    title: "How It Began",
    subtitle: "From social media to phone calls",
    description: "A simple 'Hi' on social media turned into late-night chats and 4-hour phone calls. We fell for each other's words before ever seeing each other's smiles. Those first conversations? Pure magic.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777363130/my_wedding/download_peirg2.jpg",
    color: "from-blue-500/20 to-cyan-500/20",
    icon: MessageCircle,
    stats: { label: "First message", value: "December 2023" }
  },
  {
    id: 2,
    year: "April 28, 2024",
    title: "First Meeting",
    subtitle: "Finally face to face",
    description: "Angila Burger witnessed our first hello in person. Months of texts and calls became real in one moment. And in that moment? We just knew.",
    image: "data:image/jpeg;base64,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",
    color: "from-amber-500/20 to-orange-500/20",
    icon: Heart,
    stats: { label: "First meet location", value: "Angila Burger" }
  },
  {
    id: 3,
    year: "Oct 2024",
    title: "Falling in Love",
    subtitle: "The best chapter yet",
    description: "From becoming official on October to magical dates at Friendship Park, every moment together made us certain—this was forever.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777363269/my_wedding/download_cwtmeq.jpg",
    color: "from-pink-500/20 to-rose-500/20",
    icon: CalendarHeart,
    stats: { label: "Official since", value: "October 2024" }
  },
  {
    id: 9,
    year: "September 2025",
    title: "Meeting His Family",
    subtitle: "Finding my second home",
    description: "A nervous but beautiful evening - dinner with his family. From warm embraces to shared stories around the table, I realized I wasn't just gaining a partner; I was gaining a whole new family. Home isn't just a place. It's them.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777361246/my_wedding/IMG_20260428_095643_639_vwdyyb.jpg",
    color: "from-orange-500/20 to-amber-500/20",
    icon: Home,
    stats: { label: "New family", value: "Welcomed with love" }
  },
  {
    id: 4,
    year: "Nov 2025 - May 2026",
    title: "Dreaming Together",
    subtitle: "6 months of planning",
    description: "Before the ring, there were dreams. Pinterest boards, venue visits, playlist arguments (good ones!), and late-night conversations about flowers, food, and forever. Every detail? We chose it together.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777361724/my_wedding/download_mmyppb.jpg",
    color: "from-purple-500/20 to-pink-500/20",
    icon: Calendar,
    stats: { label: "Planning months", value: "6" }
  },
  {
    id: 7,
    year: "Jan 2026 (4 Months)",
    title: "Church Wedding Teaching",
    subtitle: "16 weeks of spiritual preparation",
    description: "For four transformative months (16 weeks), we sat with our church leaders, learning what it truly means to build a Christ-centered marriage. We studied communication, forgiveness, commitment, and the sacred covenant of marriage. These teachings didn't just prepare us for a wedding day—they prepared us for a lifetime of growing together in faith.",
    image: "data:image/jpeg;base64,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",
    color: "from-indigo-500/20 to-blue-500/20",
    icon: BookOpen,
    stats: { label: "Weeks of preparation", value: "16" }
  },
  {
    id: 5,
    year: "Jan 26, 2026",
    title: "The Engagement",
    subtitle: "A burger, a ring & a yes!",
    description: "At Angila Burger—the same city where we first met—you got down on one knee. Between bites of our favorite meal, forever began. And my answer? Always yes.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240113/my_wedding/couple_gmofgb.jpg",
    color: "from-rose-500/20 to-red-500/20",
    icon: Gem,
    stats: { label: "She said", value: "YES! 💍" }
  },
  {
    id: 6,
    year: "Feb 01, 2026",
    title: "Shimgilina Ceremony",
    subtitle: "Honoring our traditions",
    description: "A beautiful cultural ceremony that brought our families together as one. Surrounded by elders, blessings were spoken, traditions were honored, and families became intertwined. The Shimgilina was more than a ceremony—it was a celebration of heritage, love, and commitment that will echo through generations.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777362743/my_wedding/1N3A0215_m2zbrm.jpg",
    color: "from-emerald-500/20 to-teal-500/20",
    icon: Users,
    stats: { label: "Cultural celebration", value: "Shimgilina" }
  },
  {
    id: 8,
    year: "March 20-22, 2026",
    title: "Birthday Getaway",
    // subtitle: "The best gift was you",
    subtitle: "3 days in Hawassa, forever in my heart",
    description: "You planned everything - the trip to Hawassa, the lakeside walks, the surprise gift. I thought I knew what love felt like. Then I saw how you looked at me when the sun set over the lake. That's when I knew: this is the person I want to celebrate every birthday with. Forever.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777362864/my_wedding/download_p8a5c4.jpg",
    color: "from-rose-500/20 to-pink-500/20",
    icon: Cake,
    stats: { label: "Birthday weekend", value: "March 20-22, 2026 🎂" }
  },
  {
    id: 10,
    year: "April 2026",
    title: "Wedding Photo Shoot",
    subtitle: "Capturing forever at Unity Park",
    description: "Unity Park was our backdrop. Every laugh, every glance, every stolen kiss - captured forever. The photographer said we looked like we were already married. These photos? They'll hang on our walls and live in our hearts forever.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240131/my_wedding/wedding10_jrmmmv.jpg",
    color: "from-pink-500/20 to-rose-500/20",
    icon: Camera,
    stats: { label: "Location", value: "Unity Park" }
  },
  {
    id: 11,
    year: "May 10, 2026",
    title: "Our Wedding Day",
    subtitle: "Forever begins now",
    description: "After all the messages, calls, dates, and dreaming—the day is finally here. Surrounded by God, family, and you, we say 'I do.' This isn't the end. It's our beautiful beginning.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1776240122/my_wedding/wedding1_sstnfp.jpg",
    color: "from-yellow-500/20 to-amber-500/20",
    icon: Sparkles,
    stats: { label: "The main event", value: "May 10, 2026" }
  }
]

export default function CinematicStory() {
  const t = useTranslations('story.chapters');
  const [activeChapter, setActiveChapter] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveChapter((current) => (current + 1) % storyChapters.length)
            return 0
          }
          return prev + 0.5
        })
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const currentChapter = storyChapters[activeChapter]
  const IconComponent = currentChapter.icon

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden py-12 px-2 lg:p-0 px-0">
      
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentChapter.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(1.1)`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentChapter.color} opacity-90`} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-18">
        <div className="container mx-auto w-full">
          
          {/* Chapter Navigation Dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4 z-20 hidden lg:block">
            {storyChapters.map((chapter, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveChapter(idx)
                  setProgress(0)
                }}
                className="group relative"
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === activeChapter ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                }`} />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-white/0 group-hover:text-white/90 transition-all duration-300 text-sm font-medium">
                  {chapter.year}
                </span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <IconComponent className="w-4 h-4 text-rose-300" />
                  <span className="text-rose-200 text-sm font-medium">{currentChapter.year}</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                  {/* {currentChapter.title} */}
                  {t(`${activeChapter}.title`)}
                </h2>
                
                <p className="text-xl text-rose-100 italic">
                  {/* {currentChapter.subtitle} */}
                  {t(`${activeChapter}.subtitle`)}
                </p>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  {/* {currentChapter.description} */}
                  {t(`${activeChapter}.description`)}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-4">
                <div className="border-l-2 border-rose-400 pl-4">
                  <div className="text-2xl font-bold text-white">{currentChapter.stats.value}</div>
                  <div className="text-sm text-gray-300">{currentChapter.stats.label}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-8">
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Our journey continues...</span>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Scroll Hint */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
                <ArrowDown className="w-6 h-6 text-white/40" />
              </div>
            </div>

            {/* Image Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-2">
                <img 
                  src={currentChapter.image} 
                  alt={currentChapter.title}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}