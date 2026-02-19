'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Pencil,
  AtSign,
  Send,
  ArrowUp,
  Globe,
  Sparkles,
} from 'lucide-react';

// Type-safe floating variants
const floatingVariants = {
  animate: (i: number) => ({
    y: [0, -25, 0],
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 5 + i,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
    },
  }),
};

const FooterPage = () => {
  const currentYear = new Date().getFullYear();

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 pt-20 pb-10 overflow-hidden border-t border-purple-100 dark:border-purple-900/30">
      {/* --- Floating Background Icons with updated colors --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          custom={1}
          variants={floatingVariants}
          animate="animate"
          className="absolute top-10 left-[5%] text-purple-400 dark:text-purple-500 opacity-40"
        >
          <GraduationCap size={50} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          custom={2}
          variants={floatingVariants}
          animate="animate"
          className="absolute top-40 right-[10%] text-pink-500 dark:text-pink-600 opacity-40"
        >
          <BookOpen size={40} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          custom={3}
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-20 left-[15%] text-purple-500 dark:text-purple-600 opacity-40"
        >
          <Pencil size={35} strokeWidth={1.5} />
        </motion.div>

        <motion.div
          custom={4}
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/2 right-[5%] text-pink-500 dark:text-pink-600 opacity-40"
        >
          <AtSign size={45} strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl text-white shadow-lg shadow-purple-500/30">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SkillBridge
              </h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Empowering learners worldwide with expert-led courses and a
              supportive community to bridge the gap between skills and success.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-pink-400 hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 border border-purple-200 dark:border-purple-800"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-7 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                'About us',
                'All Courses',
                'Instructors',
                'Help Center',
                'Blogs',
              ].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-pink-400 transition-colors font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-4 transition-all duration-300"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-7 uppercase tracking-widest">
              Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="text-purple-600 dark:text-pink-500 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <p className="hover:text-purple-600 dark:hover:text-pink-400 cursor-pointer transition-colors">
                    +880 1840587095
                  </p>
                  <p className="text-xs opacity-70">Mon-Fri, 9am - 6pm</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="text-purple-600 dark:text-pink-500 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <p className="hover:text-purple-600 dark:hover:text-pink-400 cursor-pointer transition-colors">
                    asif81534@gmail.com
                  </p>
                  <p className="text-xs opacity-70">Online Support 24/7</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <div className="text-purple-600 dark:text-pink-500 group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  <p className="hover:text-purple-600 dark:hover:text-pink-400 cursor-pointer transition-colors">
                    www.skillbridge.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="relative">
            <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-7 uppercase tracking-widest">
              Subscribe
            </h4>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/30 shadow-lg">
              <p className="text-sm text-purple-600 dark:text-pink-400 mb-4 font-medium flex items-center gap-2">
                <Sparkles size={16} />
                Join our community for latest updates.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white dark:bg-black border border-purple-200 dark:border-purple-800 rounded-full py-3 px-5 text-sm focus:ring-2 focus:ring-purple-600 outline-none dark:text-white transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2.5 rounded-full hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all shadow-md active:scale-95">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-purple-100 dark:border-purple-900/30 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            © {currentYear}{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              SkillBridge
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex gap-8 text-sm font-bold">
            <a
              href="#"
              className="text-purple-500 dark:text-pink-400 hover:text-purple-700 dark:hover:text-pink-600 transition-colors uppercase tracking-widest"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-purple-500 dark:text-pink-400 hover:text-purple-700 dark:hover:text-pink-600 transition-colors uppercase tracking-widest"
            >
              Terms
            </a>
          </div>

          {/* Back To Top Button */}
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="md:absolute -top-6 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/40 border-4 border-white dark:border-black z-20 group"
            title="Back to Top"
          >
            <ArrowUp size={24} className="group-hover:animate-bounce" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
