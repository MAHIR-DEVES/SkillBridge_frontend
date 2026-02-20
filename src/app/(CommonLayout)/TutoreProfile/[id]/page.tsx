// src/app/tutor/[id]/page.tsx

import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import {
  Star,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { BookingCard } from '@/components/modules/Booking/BookingSession';
import { getTutorById } from '@/services/TutorProfile.service';

export default async function TutorProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getTutorById(id);
  const tutor = res?.data?.data;

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-6">
        <div className="text-center space-y-6">
          <div className="h-20 w-20 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto text-purple-500">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-tighter">
            Tutor Not Found!
          </h2>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-purple-500/30"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-4 md:p-8 pt-24">
      <div className="container mx-auto px-4 lg:px-6  space-y-10">
        <Link
          href="/TutoreProfile"
          className="group inline-flex items-center gap-3 text-slate-400 hover:text-purple-600 dark:hover:text-pink-400 transition-colors font-black uppercase text-[10px] tracking-[3px]"
        >
          <div className="h-8 w-8 rounded-full border border-purple-200 dark:border-purple-800 flex items-center justify-center group-hover:border-purple-600 dark:group-hover:border-pink-400 transition-all">
            <ArrowLeft
              size={14}
              className="group-hover:text-purple-600 dark:group-hover:text-pink-400"
            />
          </div>
          Back to Browse
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white/90 dark:bg-black/40 backdrop-blur-sm rounded-md p-8 md:p-12 border border-purple-100 dark:border-purple-800/30 shadow-2xl shadow-purple-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap
                  size={120}
                  className="text-purple-600 dark:text-pink-500"
                />
              </div>

              <div className="space-y-6 relative">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
                  <div className="h-1.5 w-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-widest">
                    {tutor.category?.name}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-tighter uppercase leading-[0.9]">
                  {tutor.user?.name}
                </h1>

                <p className="text-slate-500 dark:text-zinc-400 text-lg leading-relaxed font-medium">
                  {tutor.bio}
                </p>

                <div className="flex flex-wrap gap-6 pt-6 border-t border-purple-100 dark:border-purple-800/30">
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                      <HiOutlineMail size={20} />
                    </div>
                    <span className="text-xs font-bold dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-pink-400 transition-colors">
                      {tutor.user?.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="h-10 w-10 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center text-purple-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                      <HiOutlinePhone size={20} />
                    </div>
                    <span className="text-xs font-bold dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-pink-400 transition-colors">
                      {tutor.user?.phone || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience Card */}
              <div className="bg-white/90 dark:bg-black/40 backdrop-blur-sm p-8 rounded-md border border-purple-100 dark:border-purple-800/30 flex items-start gap-5 hover:shadow-xl hover:shadow-purple-500/10 transition-all group">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl text-purple-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    Experience
                  </h4>
                  <p className="text-sm font-bold dark:text-white">
                    {tutor.experience}
                  </p>
                </div>
              </div>

              {/* Rating Card */}
              <div className="bg-white/90 dark:bg-black/40 backdrop-blur-sm p-8 rounded-md border border-purple-100 dark:border-purple-800/30 flex items-start gap-5 hover:shadow-xl hover:shadow-purple-500/10 transition-all group">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl text-purple-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                  <Star size={28} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-[10px] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    Success Rate
                  </h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      {tutor.rating || '5.0'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      / 5.0 Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Widget */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-md text-white shadow-2xl shadow-purple-500/30 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[4px] opacity-80 mb-2 flex items-center gap-2">
                  <Zap size={14} />
                  Consultation Fee
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-black">৳{tutor.price}</span>
                  <span className="text-xs font-bold opacity-80">
                    / Session
                  </span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-xs opacity-80">Duration</p>
                    <p className="font-bold">60 min</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <p className="text-xs opacity-80">Students</p>
                    <p className="font-bold">150+</p>
                  </div>
                </div>

                <BookingCard tutorId={tutor.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
