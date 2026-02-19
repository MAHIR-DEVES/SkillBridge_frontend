import MyBookingsCard from '@/components/modules/Booking/StudentMyBooking';
import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

export default function MyBookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-4 md:p-12 pt-28">
      <div className="max-w-4xl mx-auto">
        {/* Header Section with theme colors */}
        <div className="mb-10 space-y-4">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Sessions
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-tighter uppercase leading-tight">
            My Bookings
          </h1>

          {/* Description with icon */}
          <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-sm font-medium">
            <Calendar
              size={16}
              className="text-purple-500 dark:text-pink-400"
            />
            <p>Manage your scheduled sessions and tutor interactions.</p>
          </div>
        </div>

        {/* Bookings Card Container with subtle glow */}
        <div className="relative">
          {/* Decorative background glow */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -z-10" />

          <MyBookingsCard />
        </div>

        {/* Optional: Quick Stats Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-[3px]">
            Track your learning journey
          </p>
        </div>
      </div>
    </div>
  );
}
