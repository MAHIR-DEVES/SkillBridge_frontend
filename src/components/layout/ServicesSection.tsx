'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Star,
  BookOpen,
  Clock,
  Monitor,
  Users,
  Quote,
  Sparkles,
  GraduationCap,
  Heart,
} from 'lucide-react';

const ServicesSection = () => {
  // ডামি সার্ভিস ডাটা
  const services = [
    {
      title: 'One-on-One Tuition',
      desc: 'Personalized attention for better understanding and faster progress.',
      icon: <Users size={20} />,
    },
    {
      title: 'Online Sessions',
      desc: 'Live interactive classes via Google Meet/Zoom with recording access.',
      icon: <Monitor size={20} />,
    },
    {
      title: 'Exam Preparation',
      desc: 'Special mock tests and last-minute suggestions for success.',
      icon: <BookOpen size={20} />,
    },
    {
      title: 'Flexible Timing',
      desc: 'Choose slots that fit your daily schedule, 24/7 availability.',
      icon: <Clock size={20} />,
    },
  ];

  // ডামি ফিডব্যাক ডাটা
  const feedbacks = [
    {
      id: 1,
      name: 'Arif Ahmed',
      role: 'HSC Student',
      comment:
        'The teaching style is amazing! Complex physics problems became so easy to understand.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sara Khan',
      role: 'IELTS Candidate',
      comment:
        'Highly recommended for English speaking practice. Improved my score significantly in just 2 months.',
      rating: 5,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-6 py-20 space-y-24">
        {/* --- Services Section --- */}
        <section>
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800"
            >
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Premium Features
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Everything You Need in{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                One Place
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive learning solutions designed to help you achieve your
              academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-purple-100 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center text-purple-600 dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Feedback Section --- */}
        <section>
          <div className="text-center mb-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800"
            >
              <Heart size={14} className="text-pink-500" />
              <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Testimonials
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              What Our{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Students Say
              </span>
            </h2>

            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    size={16}
                    className="fill-purple-400 text-purple-400"
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-purple-600 dark:text-pink-400">
                4.9/5 Average Rating
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {feedbacks.map((fb, index) => (
              <motion.div
                key={fb.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative p-8 rounded-2xl bg-white dark:bg-zinc-900/30 border border-purple-100 dark:border-purple-800/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <Quote
                  className="absolute top-6 right-6 text-purple-200 dark:text-purple-800/30"
                  size={60}
                />

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-purple-400 text-purple-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {fb.comment}
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-purple-100 dark:border-purple-800/30">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {fb.name[0]}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">
                        {fb.name}
                      </h4>
                      <p className="text-xs text-purple-600 dark:text-pink-400 font-medium">
                        {fb.role}
                      </p>
                    </div>

                    <div className="ml-auto">
                      <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-2 rounded-full">
                        <CheckCircle2
                          size={16}
                          className="text-purple-600 dark:text-pink-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { number: '500+', label: 'Happy Students' },
              { number: '50+', label: 'Expert Tutors' },
              { number: '1000+', label: 'Hours Taught' },
              { number: '4.9', label: 'Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800/30"
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesSection;
