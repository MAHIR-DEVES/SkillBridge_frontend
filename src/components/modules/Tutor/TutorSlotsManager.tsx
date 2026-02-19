/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TutorSlotService,
  Slot,
  SlotInput,
} from '@/services/tutorSlot.service';
import {
  Plus,
  Trash2,
  Clock,
  Calendar as CalIcon,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function ManageSlots({ tutorId }: { tutorId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [newSlot, setNewSlot] = useState<SlotInput>({
    date: '',
    startTime: '',
    endTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlots = useCallback(async () => {
    if (!tutorId) return;
    setIsLoading(true);
    try {
      const res = await TutorSlotService.getSlotsByTutor(tutorId);
      const actualData = res?.data || res;
      setSlots(Array.isArray(actualData) ? actualData : []);
    } catch (err: any) {
      toast.error(err.message || 'Failed to load slots');
    } finally {
      setIsLoading(false);
    }
  }, [tutorId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const sortedSlots = useMemo(() => {
    return [...slots].sort((a, b) => Number(a.isBooked) - Number(b.isBooked));
  }, [slots]);

  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      return toast.error('Please fill in all fields', {
        icon: <AlertCircle className="text-pink-500" />,
      });
    }
    if (newSlot.startTime >= newSlot.endTime) {
      return toast.error('End time must be after start time');
    }

    setIsSubmitting(true);
    try {
      const res = await TutorSlotService.addSlots(tutorId, [newSlot]);
      if (res) {
        toast.success('New slot published! 🚀');
        setNewSlot({ date: '', startTime: '', endTime: '' });
        fetchSlots();
      }
    } catch (error: any) {
      toast.error(error.message || 'Could not add slot');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Removing slot...');
    try {
      await TutorSlotService.deleteSlot(id);
      toast.success('Slot removed', { id: toastId });
      setSlots(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      toast.error(err.message || 'Delete failed', { id: toastId });
    }
  };

  return (
    <div className="space-y-8 mt-6   px-4 md:px-0">
      {/* Create Availability Card */}
      <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm p-6 md:p-8 rounded-md border border-purple-100 dark:border-purple-800/30 shadow-xl shadow-purple-500/10">
        <h2 className="text-sm font-black uppercase tracking-[3px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
            <Plus size={16} className="text-purple-600 dark:text-pink-400" />
          </div>
          Create Availability
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2 tracking-widest">
              Date
            </label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={newSlot.date}
              onChange={e => setNewSlot({ ...newSlot, date: e.target.value })}
              className="w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-none rounded-2xl p-4 text-sm font-bold ring-1 ring-purple-200 dark:ring-purple-800/30 focus:ring-2 focus:ring-purple-600 dark:text-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2 tracking-widest">
              Starts
            </label>
            <input
              type="time"
              value={newSlot.startTime}
              onChange={e =>
                setNewSlot({ ...newSlot, startTime: e.target.value })
              }
              className="w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-none rounded-2xl p-4 text-sm font-bold ring-1 ring-purple-200 dark:ring-purple-800/30 focus:ring-2 focus:ring-purple-600 dark:text-white outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2 tracking-widest">
              Ends
            </label>
            <input
              type="time"
              value={newSlot.endTime}
              onChange={e =>
                setNewSlot({ ...newSlot, endTime: e.target.value })
              }
              className="w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-none rounded-2xl p-4 text-sm font-bold ring-1 ring-purple-200 dark:ring-purple-800/30 focus:ring-2 focus:ring-purple-600 dark:text-white outline-none transition-all"
            />
          </div>
          <button
            onClick={handleAddSlot}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-[54px] rounded-2xl font-black uppercase text-[10px] tracking-[2px] shadow-lg shadow-purple-500/30 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                Publish <Plus size={14} className="rotate-45" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Schedule Table Card */}
      <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm rounded-md border border-purple-100 dark:border-purple-800/30 overflow-hidden shadow-2xl shadow-purple-500/10">
        <div className="p-6 border-b border-purple-100 dark:border-purple-800/30 flex justify-between items-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full" />
            <h3 className="font-black uppercase tracking-widest text-[11px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Your Active Schedule
            </h3>
          </div>
          <span className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 rounded-full text-[10px] font-black border border-purple-200 dark:border-purple-800/30">
            {slots.length} TOTAL SLOTS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 border-b border-purple-100 dark:border-purple-800/30">
                <th className="p-6 text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-widest">
                  Date
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-widest">
                  Duration
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 tracking-widest">
                  Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-right tracking-widest">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100 dark:divide-purple-800/30">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-purple-600" />
                  </td>
                </tr>
              ) : slots.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-20 text-center opacity-30 text-[10px] font-black uppercase tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    No Active Slots Found
                  </td>
                </tr>
              ) : (
                sortedSlots.map(s => (
                  <tr
                    key={s.id}
                    className={`group hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/30 dark:hover:to-pink-950/30 transition-colors ${s.isBooked ? 'opacity-50' : ''}`}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3 font-bold text-sm text-slate-800 dark:text-zinc-200">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.isBooked ? 'bg-slate-100 dark:bg-zinc-800 text-slate-400' : 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-pink-400'}`}
                        >
                          <CalIcon size={16} />
                        </div>
                        {new Date(s.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 font-bold text-sm text-purple-600 dark:text-pink-400 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 w-fit px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800/30">
                        <Clock
                          size={14}
                          className={
                            s.isBooked
                              ? 'text-slate-400'
                              : 'text-purple-600 dark:text-pink-400'
                          }
                        />{' '}
                        {s.startTime} - {s.endTime}
                      </div>
                    </td>
                    <td className="p-6">
                      {s.isBooked ? (
                        <div className="flex items-center gap-1.5 text-rose-500 font-black text-[9px] uppercase bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800/30 w-fit">
                          <XCircle size={12} /> Booked
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[9px] uppercase bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/30 w-fit">
                          <CheckCircle2 size={12} /> Available
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-right">
                      {!s.isBooked && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="p-3 text-slate-300 hover:text-rose-500 hover:bg-gradient-to-r hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-900/30 dark:hover:to-pink-900/30 rounded-2xl transition-all">
                              <Trash2 size={18} />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[32px] border border-purple-100 dark:border-purple-800/30 shadow-2xl shadow-purple-500/10 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="flex items-center gap-2 font-black uppercase text-sm tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                <AlertTriangle className="text-amber-500" /> Are
                                you sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-xs font-medium dark:text-zinc-400">
                                This will permanently remove this availability
                                slot. Students won&apos;t be able to book this
                                time anymore.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-4">
                              <AlertDialogCancel className="rounded-2xl border-purple-200 dark:border-purple-800/30 font-black uppercase text-[10px] tracking-widest h-12 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(s.id)}
                                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest h-12 shadow-lg shadow-rose-500/30"
                              >
                                Yes, Delete Slot
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
