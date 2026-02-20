'use client';

import React, { JSX, useEffect, useState } from 'react';
import TutorCard from '@/components/modules/Tutor/TutoreCard';
// import { TutorService } from "@/services/TutorProfile.service";

import {
  Search,
  RefreshCw,
  SlidersHorizontal,
  Star,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Tutor } from '@/types';
import {
  getCategories,
  getTutorProfiles,
} from '@/services/TutorProfile.service';

type Category = { id: string; name: string };

export default function TutorProfilePageClient(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [catsRes, tutsRes] = await Promise.all([
          getCategories(),
          getTutorProfiles(),
        ]);
        setCategories(catsRes.data ?? []);
        setTutors(tutsRes.data?.data ?? []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const res = await getTutorProfiles({
        search: search || undefined,
        categoryId: categoryId || undefined,
        rating: rating ? Number(rating) : undefined,
        price: price ? Number(price) : undefined,
      });
      setTutors(res.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setSearch('');
    setCategoryId('');
    setPrice('');
    setRating('');
    setLoading(true);
    const res = await getTutorProfiles();
    setTutors(res.data?.data ?? []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 transition-colors duration-500">
      <div className="container mx-auto px-4 lg:px-6 md:p-12 mt-20">
        {/* --- HEADER SECTION with gradient --- */}
        <div className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Top Rated Mentors
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold dark:text-white">
            Expert{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Instructors
            </span>
          </h1>

          <p className="text-slate-500 dark:text-zinc-400 font-medium tracking-wide max-w-2xl">
            Find the perfect mentor to accelerate your learning journey from our
            hand-picked community of expert educators.
          </p>
        </div>

        {/* --- LUXURY FILTER PANEL with gradient theme --- */}
        <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-6 mb-12 shadow-xl shadow-purple-500/10 border border-purple-100 dark:border-purple-800/30">
          <div className="flex items-center gap-2 mb-6 px-2">
            <SlidersHorizontal size={18} className="text-purple-600" />
            <h2 className="text-[10px] font-black uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Advanced Search
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-4 relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, skill, or bio..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-purple-50/50 dark:bg-zinc-800/50 border border-purple-100 dark:border-purple-800/30 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 transition-all text-sm outline-none dark:text-white"
              />
            </div>

            {/* Category Select */}
            <div className="lg:col-span-2 relative">
              <Layers
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
                size={16}
              />
              <select
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-purple-50/50 dark:bg-zinc-800/50 border border-purple-100 dark:border-purple-800/30 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 appearance-none text-sm outline-none dark:text-white"
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Input */}
            <div className="lg:col-span-2 relative">
              <DollarSign
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
                size={16}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-purple-50/50 dark:bg-zinc-800/50 border border-purple-100 dark:border-purple-800/30 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 text-sm outline-none dark:text-white"
              />
            </div>

            {/* Rating Select */}
            <div className="lg:col-span-2 relative">
              <Star
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
                size={16}
              />
              <select
                value={rating}
                onChange={e => setRating(e.target.value)}
                className="w-full pl-10 pr-4 py-4 rounded-xl bg-purple-50/50 dark:bg-zinc-800/50 border border-purple-100 dark:border-purple-800/30 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 appearance-none text-sm outline-none dark:text-white"
              >
                <option value="">Any Rating</option>
                {[5, 4, 3].map(num => (
                  <option key={num} value={num}>
                    {num}+ Stars
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="lg:col-span-2 flex gap-2">
              <button
                onClick={handleFilter}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-purple-500/30"
              >
                Apply Filters
              </button>
              <button
                onClick={handleReset}
                className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-pink-400 rounded-xl hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-800/50 dark:hover:to-pink-800/50 transition-all active:scale-95 border border-purple-200 dark:border-purple-800/30"
              >
                <RefreshCw
                  size={18}
                  className={loading ? 'animate-spin' : ''}
                />
              </button>
            </div>
          </div>

          {/* Active filters indicator */}
          {(search || categoryId || price || rating) && (
            <div className="flex items-center gap-2 mt-4 px-2">
              <span className="text-xs text-purple-500">Active filters:</span>
              {search && (
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-2 py-1 rounded-full">
                  Search: {search}
                </span>
              )}
              {categoryId && (
                <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 px-2 py-1 rounded-full">
                  Category selected
                </span>
              )}
              {price && (
                <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-2 py-1 rounded-full">
                  Max: ৳{price}
                </span>
              )}
              {rating && (
                <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 px-2 py-1 rounded-full">
                  {rating}+ Stars
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing{' '}
            <span className="font-bold text-purple-600">{tutors.length}</span>{' '}
            instructors
          </p>
        </div>

        {/* --- CONTENT GRID --- */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 text-xs font-bold uppercase tracking-widest text-center mb-8 border border-red-100 dark:border-red-500/20">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[400px] rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 animate-pulse border border-purple-200 dark:border-purple-800/30"
              />
            ))}
          </div>
        ) : tutors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-100 dark:border-purple-800/30">
            <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
              <Search size={40} className="text-purple-400" />
            </div>
            <p className="text-sm font-black uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              No instructors found
            </p>
            <p className="text-xs text-slate-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {tutors.map(tutor => (
              <div
                key={tutor.id}
                className="transform transition-all duration-500 hover:-translate-y-2"
              >
                <TutorCard tutor={tutor} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
