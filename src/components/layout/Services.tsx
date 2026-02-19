'use client';
import React from 'react';
import { motion, easeOut } from 'framer-motion';
import {
  Languages,
  Palette,
  Activity,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const categories = [
  {
    title: 'Language Learning',
    desc: 'Courses teaching languages such as English, Spanish, French, Mandarin etc',
    icon: <Languages className="group-hover:text-white" size={32} />,
    active: false,
  },
  {
    title: 'Creative Arts & Design',
    desc: 'Courses on graphic design, digital art, photography, video editing',
    icon: <Palette className="group-hover:text-white" size={32} />,
    active: false,
  },
  {
    title: 'Health & Fitness',
    desc: 'Courses on nutrition, fitness training, yoga, meditation, wellness coaching...',
    icon: <Activity className="text-white" size={32} />,
    active: true,
  },
];

const CategorySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 mb-4">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Explore Categories
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Explore 4,000+ Free Online{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Courses
            </span>{' '}
            For Students
          </h2>

          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Welcome to our diverse and dynamic course catalog. we re dedicated
            to providing you with access to high-quality education
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: easeOut,
              }}
              className={`group relative p-8 rounded-2xl text-left transition-all duration-300 border overflow-hidden
                                ${
                                  cat.active
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/30'
                                    : 'bg-white dark:bg-zinc-900/50 border-purple-100 dark:border-purple-800/30 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700'
                                }`}
            >
              {/* Gradient overlay for non-active cards on hover */}
              {!cat.active && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Icon */}
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110
                                        ${
                                          cat.active
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-600 dark:text-pink-400 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white'
                                        }`}
                >
                  {React.cloneElement(cat.icon, {
                    className: cat.active
                      ? 'text-white'
                      : 'text-purple-600 dark:text-pink-400 group-hover:text-white transition-colors duration-300',
                  })}
                </div>

                <h3
                  className={`text-xl font-bold mb-3 transition-colors duration-300
                                    ${
                                      cat.active
                                        ? 'text-white'
                                        : 'text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600'
                                    }`}
                >
                  {cat.title}
                </h3>

                <p
                  className={`mb-6 leading-relaxed text-sm
                                    ${
                                      cat.active
                                        ? 'text-purple-50'
                                        : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                                    }`}
                >
                  {cat.desc}
                </p>

                <button
                  className={`flex items-center gap-2 font-semibold text-sm transition-all duration-300 group/btn
                                        ${
                                          cat.active
                                            ? 'text-white'
                                            : 'text-purple-600 dark:text-pink-400 group-hover:text-pink-600 dark:group-hover:text-purple-400'
                                        }`}
                >
                  View Category
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Slider Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex justify-center items-center gap-4"
        >
          <button className="w-12 h-12 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 group">
            <ChevronLeft
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button className="w-12 h-12 rounded-xl border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 group">
            <ChevronRight
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </motion.div>

        {/* Category count indicator */}
        <div className="mt-8 flex justify-center items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-300 dark:bg-purple-700"></span>
          <span className="w-4 h-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"></span>
          <span className="w-2 h-2 rounded-full bg-pink-300 dark:bg-pink-700"></span>
          <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
            3 of 12 categories
          </span>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
