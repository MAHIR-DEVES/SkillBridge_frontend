'use client';

import { ManageSlots } from '@/components/modules/Tutor/TutorSlotsManager';
import { useEffect, useState } from 'react';
import { Loader2, Calendar, AlertCircle } from 'lucide-react';
import { getMyProfile } from '@/services/TutorProfile.service';

export default function ManageSlotsPage() {
  const [tutorId, setTutorId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await getMyProfile();
        if (res?.data?.id) {
          setTutorId(res.data.id);
        }
      } catch (error) {
        console.error('Profile load failed', error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
        <div className="text-center space-y-4">
          <Loader2
            className="animate-spin text-purple-600 dark:text-pink-400 mx-auto"
            size={48}
          />
          <p className="text-[10px] font-black uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Loading Profile
          </p>
        </div>
      </div>
    );
  }

  if (!tutorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-6">
        <div className="text-center max-w-md mx-auto p-10 rounded-[40px] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 shadow-xl shadow-purple-500/10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
            <AlertCircle
              className="text-purple-600 dark:text-pink-400"
              size={40}
            />
          </div>
          <h3 className="text-2xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Profile Required
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Tutor profile not found. Please create a profile first to manage
            your availability.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-6 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
            <Calendar
              className="text-purple-600 dark:text-pink-400"
              size={20}
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Manage Your Slots
          </h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 ml-13">
          Set your availability and manage upcoming sessions
        </p>
      </div>

      {/* Slots Manager Component */}
      <ManageSlots tutorId={tutorId} />
    </div>
  );
}
