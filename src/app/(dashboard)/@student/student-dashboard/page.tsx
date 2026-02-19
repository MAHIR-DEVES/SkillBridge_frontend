'use client';

import { useEffect, useState } from 'react';
import {
  Loader2,
  GraduationCap,
  Timer,
  Sparkles,
  ArrowRightCircle,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    // সিমুলেটেড লোডিং
    const timeout = setTimeout(() => setLoading(false), 800);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

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

  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-purple-600 opacity-20" />
          <GraduationCap className="absolute h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[5px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
          Initializing Portal
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-6 relative overflow-hidden">
      {/* Background Glows with updated colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-5xl">
        {/* Main Dashboard Card */}
        <div className="relative p-8 md:p-20 rounded-[60px] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 shadow-[0_50px_100px_-20px_rgba(168,85,247,0.1)] ring-1 ring-purple-100 dark:ring-purple-800/30 overflow-hidden">
          {/* Decorative gradient elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-pink-600/5 to-purple-600/5 rounded-full blur-3xl" />

          <div className="flex flex-col items-center text-center space-y-12 relative z-10">
            {/* Top Status Badge with theme colors */}
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-[10px] font-black uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {formattedDate}
              </span>
            </div>

            {/* Welcome Text with gradient */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase dark:text-white leading-[0.9]">
                Welcome Back, <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Student!
                </span>
              </h1>
              <p className="text-slate-400 dark:text-zinc-500 font-medium italic text-lg md:text-xl max-w-lg mx-auto">
                Your potential is endless. Go do what you were created to do.
              </p>
            </div>

            {/* Time and Action Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl pt-4">
              {/* Live Time Display with theme */}
              <div className="p-10 rounded-[40px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800/30 flex flex-col items-center justify-center group hover:shadow-xl hover:shadow-purple-500/10 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Timer
                    size={16}
                    className="text-purple-600 dark:text-pink-400 group-hover:rotate-180 transition-transform duration-700"
                  />
                  <span className="text-[9px] font-black uppercase tracking-[3px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    System Time
                  </span>
                </div>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tabular-nums tracking-tighter">
                  {formattedTime}
                </div>
              </div>

              {/* Action Button with gradient */}
              <Link href="/TutoreProfile" className="h-full">
                <Button className="w-full h-full min-h-[160px] rounded-[40px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex flex-col gap-3 shadow-2xl shadow-purple-500/30 transition-all group active:scale-95 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <ArrowRightCircle
                    size={40}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                  <div className="text-center relative z-10">
                    <span className="block text-[10px] font-black uppercase tracking-[3px] opacity-70">
                      New Journey
                    </span>
                    <span className="text-xl font-black uppercase tracking-widest">
                      Find a Tutor
                    </span>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Quick Stats Row */}
            <div className="flex justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-pink-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  500+ Happy Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} className="text-purple-500" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  50+ Expert Tutors
                </span>
              </div>
            </div>

            {/* Mini Footer with gradient */}
            <div className="pt-4">
              <p className="text-[9px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-[6px]">
                Global Learning Portal v2.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
