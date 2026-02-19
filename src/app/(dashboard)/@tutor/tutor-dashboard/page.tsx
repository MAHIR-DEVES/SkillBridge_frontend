'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  PlayCircle,
  Timer,
  Sparkles,
  GraduationCap,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TutorDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // প্রতি সেকেন্ডে সময় আপডেট করার জন্য
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // সময়ের ওপর ভিত্তি করে গ্রিটিং লজিক
  const getTimeContext = () => {
    const hour = currentTime.getHours();
    if (hour < 12)
      return {
        msg: 'Good Morning',
        sub: 'Ready to inspire some students today?',
      };
    if (hour < 17)
      return { msg: 'Good Afternoon', sub: 'Keep up the great momentum!' };
    return { msg: 'Good Evening', sub: 'Wrapping up your successful day?' };
  };

  const greeting = getTimeContext();

  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-4 md:p-8">
      {/* PREMIUM WELCOME CARD */}
      <div className="relative w-full max-w-4xl p-10 md:p-16 rounded-[50px] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 overflow-hidden shadow-2xl shadow-purple-500/10 ring-1 ring-purple-100 dark:ring-purple-800/30">
        {/* Background Animated Decor with theme colors */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full -mr-32 -mt-32 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full -ml-20 -mb-20 blur-[80px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl" />

        <div className="relative flex flex-col items-center text-center space-y-10">
          {/* Top Badge with theme */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-[10px] font-black uppercase tracking-[3px] border border-purple-200 dark:border-purple-800">
            <Sparkles size={12} className="text-purple-600" /> {formattedDate}
          </div>

          {/* Main Greeting with gradient */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase dark:text-white leading-none">
              {greeting.msg}, <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome Tutor!
              </span>
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 font-medium italic text-lg md:text-xl">
              {greeting.sub}
            </p>
          </div>

          {/* Time Display Section with theme */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-2xl">
            <div className="flex-1 w-full p-8 rounded-[35px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800/30 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all group">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Timer
                  size={16}
                  className="text-purple-600 dark:text-pink-400 group-hover:rotate-180 transition-transform duration-700"
                />
                <p className="text-[10px] font-black uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Current Local Time
                </p>
              </div>
              <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tabular-nums tracking-tight">
                {formattedTime}
              </p>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="flex justify-center gap-8 pt-4">
            <div className="flex items-center gap-2">
              <GraduationCap size={14} className="text-purple-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                15 Active Students
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-pink-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                4.9 Rating
              </span>
            </div>
          </div>

          {/* Bottom Instruction with gradient */}
          <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-[5px]">
            Authorized Instructor Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
