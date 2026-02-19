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
} from 'lucide-react';

const categories = [
  {
    title: 'Language Learning',
    desc: 'Courses teaching languages such as English, Spanish, French, Mandarin etc',
    icon: (
      <Languages
        className="text-blue-600 group-hover:text-blue-500"
        size={32}
      />
    ),
    active: false,
  },
  {
    title: 'Creative Arts & Design',
    desc: 'Courses on graphic design, digital art, photography, video editing',
    icon: (
      <Palette className="text-blue-600 group-hover:text-blue-500" size={32} />
    ),
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
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeOut }} // ✅ FIX
          className="mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-6">
            Explore 4,000+ Free Online <br />
            Courses For Students
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            Welcome to our diverse and dynamic course catalog. we're dedicated
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
                ease: easeOut, // ✅ FIX
              }}
              className={` p-10 rounded-[30px] text-left transition-colors duration-300 border border-slate-100 dark:border-slate-800 flex flex-col items-start group ${
                cat.active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                  : 'bg-[#f8fbff] dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-800 hover:border-blue-200'
              }`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 shadow-sm ${
                  cat.active ? 'bg-white/20' : 'bg-white dark:bg-black'
                }`}
              >
                {cat.icon}
              </div>

              <h3
                className={`text-2xl font-semibold mb-4 ${
                  cat.active ? 'text-white' : 'text-slate-900 dark:text-white'
                }`}
              >
                {cat.title}
              </h3>

              <p
                className={`mb-8 leading-relaxed ${
                  cat.active
                    ? 'text-blue-50'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {cat.desc}
              </p>

              <button
                className={`flex items-center gap-2 font-semibold text-sm ${
                  cat.active ? 'text-white' : 'text-blue-600'
                }`}
              >
                View Category
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Slider Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOut }} // ✅ FIX
          className="flex justify-center items-center gap-4"
        >
          <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
            <ChevronLeft size={24} />
          </button>
          <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
            <ChevronRight size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
