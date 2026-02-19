'use client';

import React from 'react';
import {
  Star,
  LayoutGrid,
  ArrowRight,
  ShieldCheck,
  Banknote,
  MapPin,
  Clock,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { Tutor } from '@/types';

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const categoryName = tutor?.category?.name || 'General';
  const tutorName = tutor?.user?.name || 'Unknown Instructor';
  const tutorExperience = tutor?.experience || 'N/A';
  const tutorPrice = tutor?.price || 0;
  const tutorRating = tutor?.rating || '5.0';
  const tutorStatus = tutor?.status || 'Active';
  const tutorLocation = tutor?.location || 'Online';
  const totalStudents = tutor?.totalStudents || 120;
  const totalReviews = tutor?.totalReviews || 45;

  return (
    <div className="group w-full bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Top Gradient Bar */}
      <div className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400" />

      <div className="p-6">
        {/* Header - Category & Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full">
            <LayoutGrid
              size={14}
              className="text-purple-600 dark:text-purple-400"
            />
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              {categoryName}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full ${
                  tutorStatus === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
            </span>
            <span className="text-xs font-medium text-purple-600 dark:text-pink-400">
              {tutorStatus}
            </span>
          </div>
        </div>

        {/* Tutor Info */}
        <div className="mb-5">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-1">
            {tutorName}
          </h3>

          <div className="space-y-2">
            {/* Experience */}
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Award size={16} className="text-purple-500 dark:text-pink-400" />
              <span className="text-sm">{tutorExperience} of Experience</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <MapPin
                size={16}
                className="text-pink-500 dark:text-purple-400"
              />
              <span className="text-sm">{tutorLocation}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Students
            </p>
            <p className="font-bold text-slate-900 dark:text-white">
              {totalStudents}+
            </p>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Reviews
            </p>
            <p className="font-bold text-slate-900 dark:text-white">
              {totalReviews}
            </p>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Rating
            </p>
            <div className="flex items-center justify-center gap-0.5">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-slate-900 dark:text-white">
                {tutorRating}
              </span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                ৳{tutorPrice}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                /mo
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Flexible schedule
            </p>
          </div>

          <Link
            href={`/TutoreProfile/${tutor.id}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group/btn shadow-lg shadow-purple-500/25"
          >
            <span>View Profile</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center gap-1.5 mt-3">
          <ShieldCheck size={14} className="text-green-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Verified & Background Checked
          </span>
        </div>
      </div>
    </div>
  );
}
