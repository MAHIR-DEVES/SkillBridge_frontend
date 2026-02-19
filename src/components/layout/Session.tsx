'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  Sparkles,
  Target,
  Award,
} from 'lucide-react';

// Smooth Cubic Bezier for premium feel
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const AboutSection = () => {
  // Animation settings with increased duration and base delay
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: {
      duration: 0.8,
      ease: EASE_OUT,
      delay: 0.2,
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* --- Left Side: Image Gallery & Floating Badge --- */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* First Image */}
              <motion.div
                {...fadeInUp}
                className="relative overflow-hidden rounded-md shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="Students"
                  className="h-[440px] w-full object-cover"
                />
              </motion.div>

              <div className="space-y-4">
                {/* Stats Box - Updated with purple/pink gradient */}
                <motion.div
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: 0.4 }}
                  className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-md text-center text-white shadow-lg shadow-purple-500/30"
                >
                  <h4 className="text-3xl font-bold">16+</h4>
                  <p className="text-xs uppercase tracking-widest font-medium opacity-90 mt-2">
                    Years of excellence
                  </p>
                </motion.div>

                {/* Small Image */}
                <motion.div
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: 0.6 }}
                  className="relative overflow-hidden rounded-md shadow-xl h-[300px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400"
                    alt="Learning"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* --- Right Side: Content --- */}
          <div className="lg:pl-10 space-y-8">
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 mb-4">
                <Sparkles size={14} className="text-purple-600" />
                <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About EduAll
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 leading-[1.2]">
                The Place Where You{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Can Achieve
                </span>
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg">
                Welcome to EduAll, where learning knows no bounds. Whether you
                re a student, professional, or lifelong learner, we have the
                perfect path for your growth.
              </p>
            </motion.div>

            {/* Mission & Vision with Staggered Delays */}
            <div className="space-y-8">
              {[
                {
                  icon: <Target size={28} />,
                  title: 'Our Mission',
                  desc: 'Driven by a team of dedicated educators, technologists, and visionaries to make quality education accessible to all.',
                },
                {
                  icon: <TrendingUp size={28} />,
                  title: 'Our Vision',
                  desc: 'Empowering professionals to upskill and lifelong learners to explore new horizons with confidence.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: 0.5 + i * 0.2 }}
                  className="flex gap-6 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 dark:text-pink-400 shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
