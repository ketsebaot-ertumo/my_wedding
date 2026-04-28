"use client";

import { motion } from "framer-motion";
import { Cake, Camera, Heart, Utensils } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Timeline() {
    const t = useTranslations('wedding');
     const timelineEvents = [
        {
          time: "10:00 AM - 12:00 PM",
          title: "wedding-ceremony",
          icon: Heart,
          description: "ceremony-description",
          location: "place",
        },
        {
          time: "12:00 PM - 2:00 PM",
          title: "lunch-reception",
          icon: Utensils,
          description: "lunch-description",
          location: "place",
        },
        {
          time: "2:00 PM - 3፡00 PM",
          title: "cake-cutting",
          icon: Cake,
          description: "cake-description",
          location: "place",
        },
        {
          time: "3:00 PM onwards",
          title: "photo-session",
          icon: Camera,
          description: "photo-description",
          location: "place",
        },
      ];

    return (
        <>
            {/* Event Timeline Section */}
            <section className="min-h-screen snap-start py-20 px-4 bg-gradient-to-b from-rose-100 via-rose-50 to-rose-100 text-gray-900">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h3 className="relative inline-block text-3xl md:text-5xl bg-gradient-to-r from-rose-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-6 text-center">
                            <p className="font-bold">{t('event-timeline')}</p>
                            {/* Swipe underline container */}
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[3px] bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileInView={{ x: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                    className="w-full h-full bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                                />
                            </div>
                            <div className="text-gray-400 text-sm mt-4 max-w-lg mx-auto">{t('event-description')}</div>
                            
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
                            <h3 className="text-xl font-serif font-semibold text-gray-950">{t(event.title)}</h3>
                            <p className="text-gray-400 text-sm">{t(event.description)}</p>
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
        </>
    )
}