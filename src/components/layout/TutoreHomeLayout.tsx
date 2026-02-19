'use client';

import React, { useEffect, useState } from 'react';
import TutorCard from '@/components/modules/Tutor/TutoreCard';
import { Tutor } from '@/types';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { getTutorProfiles } from '@/services/TutorProfile.service';

export default function TutoreHomeLayout() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopTutors = async () => {
      try {
        const res = await getTutorProfiles();
        const topThree = (res.data?.data ?? []).slice(0, 3);
        setTutors(topThree);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTutors();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-purple-50/30 dark:from-black dark:to-purple-950/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Top Rated Mentors
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black dark:text-white leading-tight">
              Learn from the{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Best Professionals
              </span>
            </h2>

            <p className="text-slate-500 dark:text-slate-400 max-w-lg text-sm sm:text-base">
              Hand-picked expert tutors ready to guide you towards success
            </p>
          </div>

          <Link
            href="/TutoreProfile"
            className="group flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative"
          >
            View All Instructors
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1 text-purple-600"
            />
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : tutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tutors.map(tutor => (
              <div key={tutor.id} className="group relative ">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0  blur transition duration-500" />
                <div className="relative">
                  <TutorCard tutor={tutor} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-purple-200 dark:border-purple-800/30 rounded-3xl">
            <Star className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              No instructors available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SkeletonLoader() {
  return (
    <div className="w-full min-h-[360px] rounded-3xl bg-white dark:bg-zinc-900 border border-purple-100 dark:border-purple-800/20 p-5 sm:p-6 space-y-4 animate-pulse shadow-sm">
      <div className="w-full h-40 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30" />
      <div className="h-5 w-2/3 bg-purple-100 dark:bg-purple-900/30 rounded-lg" />
      <div className="h-4 w-full bg-purple-100 dark:bg-purple-900/30 rounded-lg" />
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-purple-100 dark:bg-purple-900/30 rounded-full" />
        <div className="h-8 w-20 bg-purple-100 dark:bg-purple-900/30 rounded-full" />
      </div>
    </div>
  );
}
