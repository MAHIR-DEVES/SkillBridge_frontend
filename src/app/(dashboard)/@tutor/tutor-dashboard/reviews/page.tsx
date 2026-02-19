/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useCallback } from 'react';
import { getMyReviews } from '@/services/Review.service';
import { authClient } from '@/lib/auth-client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  Star,
  MessageSquare,
  Calendar,
  User,
  RefreshCcw,
  Mail,
  Clock,
  CheckCircle2,
  Sparkles,
  Heart,
} from 'lucide-react';
import { toast } from 'sonner';

// ✅ 1. Define the Interface for Review Data
interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student?: {
    name: string;
    email: string;
  };
  booking?: {
    dateTime: string;
    status: string;
  };
}

export default function ReviewPage() {
  // ✅ 2. Fix the state type from 'never[]' to 'Review[]'
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: session } = await authClient.getSession();
      const currentUserId = session?.user?.id;

      if (!currentUserId) {
        setLoading(false);
        return;
      }

      const res = await getMyReviews(currentUserId);
      if (res.success) {
        setReviews(res.data || []);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to sync feedback logs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (loading) return <LoadingSpinner />;
  if (reviews.length === 0) return <EmptyState onRetry={fetchInitialData} />;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800">
            <Sparkles size={14} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              System Records
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase tracking-tighter dark:text-white leading-none">
            Feedback{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent italic">
              Logs
            </span>
          </h1>

          <p className="text-[10px] font-bold uppercase tracking-[4px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Detailed student evaluations and booking history
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">
            Total Reviews
          </p>
          <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
            {reviews.length}
          </p>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-8">
        {reviews.map(review => (
          <Card
            key={review.id}
            className="border-none shadow-2xl shadow-purple-500/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-[40px] overflow-hidden border-l-8 border-l-purple-600 transition-all hover:scale-[1.01] hover:shadow-purple-500/20"
          >
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col lg:flex-row justify-between gap-10">
                <div className="space-y-8 flex-1">
                  {/* Top Row: Rating & Booking Status */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-full border border-purple-200 dark:border-purple-800/30">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? 'fill-purple-600 text-purple-600'
                              : 'text-purple-200 dark:text-purple-800'
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {review.rating}.0
                      </span>
                    </div>
                    {review.booking?.status && (
                      <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-600 dark:text-emerald-400 border-none px-3 py-1 text-[10px] font-bold rounded-full flex gap-1.5 items-center">
                        <CheckCircle2 size={12} />
                        {review.booking.status}
                      </Badge>
                    )}
                  </div>

                  {/* Feedback Comment */}
                  <h3 className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold leading-tight tracking-tight italic">
                    "{review.comment}"
                  </h3>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8 border-t border-purple-100 dark:border-purple-800/30">
                    {/* Student Info */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          Student Name
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">
                          {review.student?.name || 'Anonymous'}
                        </p>
                        <p className="text-[10px] text-purple-500 dark:text-pink-400 flex items-center gap-1">
                          <Mail size={10} /> {review.student?.email || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {/* Session Info */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          Session Date
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {review.booking?.dateTime
                            ? new Date(
                                review.booking.dateTime,
                              ).toLocaleDateString(undefined, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : 'No Date'}
                        </p>
                        <p className="text-[10px] text-purple-500 dark:text-pink-400 italic uppercase font-medium">
                          {review.booking?.dateTime
                            ? new Date(
                                review.booking.dateTime,
                              ).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}
                        </p>
                      </div>
                    </div>

                    {/* Review Timestamp */}
                    <div className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 flex items-center justify-center text-pink-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                          Review Posted
                        </p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Graphic */}
                <div className="hidden lg:flex items-center justify-center w-32 border-l border-purple-100 dark:border-purple-800/30 pl-10">
                  <div className="relative">
                    <MessageSquare
                      size={48}
                      className="text-purple-200 dark:text-purple-800"
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                      ID
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// --- Helper Components ---
function LoadingSpinner() {
  return (
    <div className="flex flex-col h-[70vh] items-center justify-center space-y-6 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="relative">
        <Loader2 className="h-16 w-16 animate-spin text-purple-600" />
        <div className="absolute inset-0 blur-2xl bg-purple-600/20 animate-pulse" />
      </div>
      <p className="text-[12px] font-black uppercase tracking-[8px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
        Syncing Logs
      </p>
    </div>
  );
}

function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-8">
        <Heart size={48} className="text-purple-600 dark:text-pink-400" />
      </div>
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">
        No{' '}
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Feedback
        </span>{' '}
        Yet
      </h2>
      <p className="text-purple-400 dark:text-pink-400 max-w-sm mb-10 text-sm font-medium uppercase tracking-widest">
        Records are currently empty for this account
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-3 px-12 h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-xs uppercase tracking-[3px] rounded-full transition-all shadow-xl shadow-purple-500/30 active:scale-95"
      >
        <RefreshCcw size={16} /> Re-verify
      </button>
    </div>
  );
}
