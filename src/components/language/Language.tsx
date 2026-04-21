"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from 'next-intl';
import { Languages, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Language() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("home");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSelectChange = (nextLocale: string) => {
    let pathWithoutLocale = pathname;

    if (pathname.startsWith(`/${localActive}`)) {
      pathWithoutLocale = pathname.replace(`/${localActive}`, '');
    }

    const newPath = `/${nextLocale}${pathWithoutLocale}`;

    window.location.assign(newPath);
  };

  const languageOptions = {
    en: { name: "English", native: "English", flag: "🇬🇧" },
    am: { name: "Amharic", native: "አማርኛ", flag: "🇪🇹" }
  };

  if (!mounted) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-full p-3 w-10 h-10 animate-pulse" />
    );
  }

  return (
    <div className="relative">
      {/* Language Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/20 to-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Button content */}
        <div className="relative bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-all flex items-center gap-2">
          <Languages className="w-5 h-5 text-rose-500" />
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {languageOptions[localActive as keyof typeof languageOptions]?.native || localActive.toUpperCase()}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-rose-100"
            >
              <div className="py-2">
                {/* English Option */}
                <button
                  onClick={() => {
                    onSelectChange("en");
                    setIsOpen(false);
                  }}
                  disabled={isPending || localActive === "en"}
                  className={`
                    w-full px-4 py-3 text-left transition-all flex items-center gap-3
                    ${localActive === "en" 
                      ? "bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600 cursor-default" 
                      : "hover:bg-gradient-to-r hover:from-rose-50 hover:to-amber-50 text-gray-700"
                    }
                  `}
                >
                  <span className="text-2xl">{languageOptions.en.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium">{languageOptions.en.name}</p>
                    <p className="text-xs text-gray-400">{languageOptions.en.native}</p>
                  </div>
                  {localActive === "en" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <div className="w-2 h-2 bg-rose-500 rounded-full" />
                    </motion.div>
                  )}
                </button>

                {/* Amharic Option */}
                <button
                  onClick={() => {
                    onSelectChange("am");
                    setIsOpen(false);
                  }}
                  disabled={isPending || localActive === "am"}
                  className={`
                    w-full px-4 py-3 text-left transition-all flex items-center gap-3
                    ${localActive === "am" 
                      ? "bg-gradient-to-r from-rose-50 to-amber-50 text-rose-600 cursor-default" 
                      : "hover:bg-gradient-to-r hover:from-rose-50 hover:to-amber-50 text-gray-700"
                    }
                  `}
                >
                  <span className="text-2xl">{languageOptions.am.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium">{languageOptions.am.name}</p>
                    <p className="text-xs text-gray-400">{languageOptions.am.native}</p>
                  </div>
                  {localActive === "am" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <div className="w-2 h-2 bg-rose-500 rounded-full" />
                    </motion.div>
                  )}
                </button>
              </div>

              {/* Decorative divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent mx-4" />
              
              {/* Footer note */}
              <div className="px-4 py-2 text-center">
                <p className="text-[10px] text-gray-400">💕 Change language</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
