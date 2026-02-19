'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { UserPlus, ArrowUpRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  // Left side text entrance animation
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="mt-12 relative min-h-[65vh] bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-black dark:to-pink-950/30 transition-colors duration-300 overflow-hidden flex items-center py-12">
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Text Only */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-7"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 shadow-sm"
            >
              <Sparkles size={16} className="text-purple-600" />
              <span className="text-xs md:text-sm tracking-wide uppercase font-semibold">
                Find Your Perfect Tutor
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15]"
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Best Tutoring Platform
              </span>
              <br />
              for Home &{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Online
              </span>{' '}
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tuitions
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-lg leading-relaxed"
            >
              Find the Perfect Tutor Near You: Enhance Learning with Expert
              Guidance and Personalized Support Today!
            </motion.p>

            {/* <div className="flex flex-wrap gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-purple-500/30 dark:shadow-none active:scale-95"
              >
                Find Best Tutor <ArrowUpRight size={18} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-purple-200 dark:border-purple-800/50 bg-white/50 dark:bg-transparent backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 text-purple-600 dark:text-purple-400 px-7 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all active:scale-95"
              >
                Applying Tutor <UserPlus size={18} />
              </motion.button>
            </div> */}
          </motion.div>

          {/* Right Side - Single Clean Image */}
          <div className="relative lg:ml-auto flex justify-center">
            <div className="relative w-full max-w-[500px]">
              {/* Main Image with gradient border */}
              <div className="relative rounded-3xl overflow-hidden p-1.5 bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/30">
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-black">
                  <img
                    src="https://i.ibb.co.com/5xT38ht0/tutor-girl-home-writing-new-information-23-2148511025.avif"
                    alt="Tutoring"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              {/* Simple stats overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 px-6 py-4 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800/50">
                <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  1520+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Active Tutors
                </p>
              </div>

              <div className="absolute -top-6 -right-6 bg-white dark:bg-zinc-900 px-6 py-4 rounded-2xl shadow-xl border border-pink-100 dark:border-pink-800/50">
                <p className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  4.9
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Rating
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
