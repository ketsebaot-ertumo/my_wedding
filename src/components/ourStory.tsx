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
    year: "April 2024",
    title: "First Meeting",
    subtitle: "Finally face to face",
    description: "Angila Burger witnessed our first hello in person. Months of texts and calls became real in one moment. And in that moment? We just knew.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777955070/my_wedding/download_yggw15.jpg",
    color: "from-amber-500/20 to-orange-500/20",
    icon: Heart,
    stats: { label: "First meet location", value: "Angila Burger" }
  },
  {
    id: 3,
    year: "Oct 2024",
    title: "Falling in Love",
    subtitle: "The best chapter yet",
    description: "From becoming official in October to magical dates at Friendship Park, every moment together made us certain—this was forever.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777363269/my_wedding/download_cwtmeq.jpg",
    color: "from-pink-500/20 to-rose-500/20",
    icon: CalendarHeart,
    stats: { label: "Official since", value: "October 2024" }
  },
  {
    id: 9,
    year: "Augest 2025",
    title: "Meeting His Family",
    subtitle: "Finding my second home",
    description: "A nervous but beautiful evening - dinner with his family. From warm embraces to shared stories around the table, I realized I wasn't just gaining a partner; I was gaining a whole new family. Home isn't just a place. It's them.",
    // image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777954732/my_wedding/Save_the_date_5_1_qmgf3j.png",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777954924/my_wedding/images_nyauyi.jpg",
    color: "from-orange-500/20 to-amber-500/20",
    icon: Home,
    stats: { label: "New family", value: "Welcomed with love" }
  },
  {
    id: 4,
    year: "Since Nov 2025",
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
    year: "Since Jan 2026 (4 Months)",
    title: "Church Wedding Teaching",
    subtitle: "16 weeks of spiritual preparation",
    description: "For four transformative months (16 weeks), we sat with our church leaders, learning what it truly means to build a Christ-centered marriage. We studied communication, forgiveness, commitment, and the sacred covenant of marriage. These teachings didn't just prepare us for a wedding day—they prepared us for a lifetime of growing together in faith.",
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777956619/my_wedding/download_yfqyoo.jpg",
    color: "from-indigo-500/20 to-blue-500/20",
    icon: BookOpen,
    stats: { label: "Weeks of preparation", value: "16" }
  },
  {
    id: 5,
    year: "February 03, 2026",
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
    year: "Feb 08, 2026",
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
    year: "March 2026",
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
    image: "https://res.cloudinary.com/dq6mvqivd/image/upload/v1777951456/my_wedding/wedding1_pitc7g.jpg",
    color: "from-yellow-500/20 to-amber-500/20",
    icon: Sparkles,
    stats: { label: "The main event", value: "May 10, 2026" }
  }
]

export default function CinematicStory() {
  const t = useTranslations('story.chapters');
  const tf = useTranslations('story.footer');
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
                  {/* {chapter.year} */}
                  {t(`${activeChapter}.year`)}
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
                  <span className="text-rose-200 text-sm font-medium">{t(`${activeChapter}.year`)}</span>
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
                  <div className="text-2xl font-bold text-white">{t(`${activeChapter}.stats.value`)}</div>
                  <div className="text-sm text-gray-300">{t(`${activeChapter}.stats.label`)}</div>
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
                  <span>{tf('journey')}</span>
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