/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { completeBooking } from '@/services/booking.service';
import { updateBookingStatus } from '@/services/AdminBooking.service';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Inbox,
  RefreshCw,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { TutorBooking } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function TutorBookingsCard({ bookings }: { bookings: TutorBooking[] }) {
  const [localBookings, setLocalBookings] = useState(bookings);
  const [isActionLoading, setIsActionLoading] = useState<string | null>(null);

  // Modal states
  const [openCompleteId, setOpenCompleteId] = useState<string | null>(null);
  const [openRescheduleId, setOpenRescheduleId] = useState<string | null>(null);

  // ✅ 1. Complete Session Logic (Shudhu ATTENDED thakle)
  const handleComplete = async (id: string) => {
    setIsActionLoading(id);
    const success = await completeBooking(id);
    if (success) {
      toast.success('Session marked as completed!');
      setLocalBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: 'COMPLETED' } : b)),
      );
      setOpenCompleteId(null);
    } else {
      toast.error('Update failed. Try again.');
    }
    setIsActionLoading(null);
  };

  // ✅ 2. Reschedule Logic (Shudhu CONFIRMED thakle)
  const handleReschedule = async (id: string) => {
    setIsActionLoading(id);
    try {
      const res = await updateBookingStatus(id, 'RESCHEDULED');
      if (res.success) {
        toast.success('Status updated to Rescheduled');
        setLocalBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: 'RESCHEDULED' } : b)),
        );
        setOpenRescheduleId(null);
      }
    } catch (err) {
      toast.error('Failed to reschedule');
    } finally {
      setIsActionLoading(null);
    }
  };

  if (localBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 rounded-[40px] border border-dashed border-purple-200 dark:border-purple-800/30">
        <Inbox className="text-purple-300 mb-4" size={48} />
        <p className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          No appointments yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {localBookings.map(b => {
        const displayDate =
          b.slot?.date ||
          (b.dateTime ? new Date(b.dateTime).toLocaleDateString() : 'TBD');
        const displayTime = b.slot
          ? `${b.slot.startTime} - ${b.slot.endTime}`
          : b.dateTime
            ? new Date(b.dateTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Time TBD';

        return (
          <div
            key={b.id}
            className="group bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-5 rounded-[32px] border border-purple-100 dark:border-purple-800/30 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-300 dark:hover:border-purple-700"
          >
            {/* Student Info */}
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center text-purple-600 dark:text-pink-400 border border-purple-200 dark:border-purple-800/30 group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-all">
                <User size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm dark:text-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                  {b.student?.name || 'Unknown Student'}
                </h3>
                <p className="text-[11px] text-purple-400 dark:text-pink-400 font-bold">
                  {b.student?.email}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 px-4 py-2 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                <Calendar
                  size={14}
                  className="text-purple-600 dark:text-pink-400"
                />
                <span className="text-[10px] font-black uppercase text-purple-600 dark:text-pink-400">
                  {displayDate}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 px-4 py-2 rounded-2xl border border-purple-100 dark:border-purple-800/30">
                <Clock
                  size={14}
                  className="text-pink-600 dark:text-purple-400"
                />
                <span className="text-[10px] font-black uppercase text-pink-600 dark:text-purple-400">
                  {displayTime}
                </span>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-purple-100 dark:border-purple-800/30">
              <StatusBadge status={b.status} />

              <div className="flex items-center gap-2">
                {/* Case 1: ATTENDED -> Show Complete Button */}
                {b.status === 'ATTENDED' && (
                  <Dialog
                    open={openCompleteId === b.id}
                    onOpenChange={open => setOpenCompleteId(open ? b.id : null)}
                  >
                    <DialogTrigger asChild>
                      <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase hover:from-purple-700 hover:to-pink-700 active:scale-95 transition-all shadow-lg shadow-purple-500/30">
                        Complete <ArrowRight size={12} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] rounded-[32px] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-8 border border-purple-100 dark:border-purple-800/30">
                      <DialogHeader className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-pink-400 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          Finish Session?
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500">
                          Mark the session with {b.student?.name} as completed.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-3 mt-6">
                        <Button
                          variant="ghost"
                          onClick={() => setOpenCompleteId(null)}
                          className="flex-1 rounded-2xl font-black text-[10px] text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                        >
                          No
                        </Button>
                        <Button
                          onClick={() => handleComplete(b.id)}
                          disabled={isActionLoading === b.id}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-black text-[10px] hover:from-purple-700 hover:to-pink-700"
                        >
                          {isActionLoading === b.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            'Yes, Complete'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                {/* Case 2: CONFIRMED -> Show Reschedule Button */}
                {b.status === 'CONFIRMED' && (
                  <Dialog
                    open={openRescheduleId === b.id}
                    onOpenChange={open =>
                      setOpenRescheduleId(open ? b.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 rounded-2xl border-pink-200 dark:border-pink-800/30 text-pink-600 dark:text-pink-400 hover:bg-gradient-to-r hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 text-[10px] font-black uppercase gap-2"
                      >
                        <RefreshCw size={12} /> Reschedule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] rounded-[32px] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-8 border border-purple-100 dark:border-purple-800/30">
                      <DialogHeader className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-600 rounded-full flex items-center justify-center">
                          <AlertTriangle size={32} />
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                          Reschedule?
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500">
                          Are you sure you want to reschedule this session?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex gap-3 mt-6">
                        <Button
                          variant="ghost"
                          onClick={() => setOpenRescheduleId(null)}
                          className="flex-1 rounded-2xl font-black text-[10px] text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleReschedule(b.id)}
                          disabled={isActionLoading === b.id}
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-black text-[10px] hover:from-amber-700 hover:to-orange-700"
                        >
                          {isActionLoading === b.id ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            'Confirm'
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    CONFIRMED:
      'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-600 border-emerald-200 dark:from-emerald-900/30 dark:to-green-900/30 dark:border-emerald-800/30',
    COMPLETED:
      'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 border-purple-200 dark:from-purple-900/30 dark:to-pink-900/30 dark:border-purple-800/30',
    PENDING:
      'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 border-amber-200 dark:from-amber-900/30 dark:to-orange-900/30 dark:border-amber-800/30',
    CANCELLED:
      'bg-gradient-to-r from-rose-100 to-red-100 text-rose-600 border-rose-200 dark:from-rose-900/30 dark:to-red-900/30 dark:border-rose-800/30',
    RESCHEDULED:
      'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-600 border-violet-200 dark:from-violet-900/30 dark:to-purple-900/30 dark:border-violet-800/30',
    ATTENDED:
      'bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-600 border-indigo-200 dark:from-indigo-900/30 dark:to-blue-900/30 dark:border-indigo-800/30',
  };

  return (
    <span
      className={`text-[9px] font-black px-4 py-2 rounded-full border uppercase tracking-widest ${styles[status] || styles.PENDING}`}
    >
      {status}
    </span>
  );
}
