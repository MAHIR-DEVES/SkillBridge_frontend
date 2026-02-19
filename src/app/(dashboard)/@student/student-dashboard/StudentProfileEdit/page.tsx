/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  getStudentProfile,
  createStudentProfile,
  updateStudentProfile,
  StudentProfile,
} from '@/services/StudentProfile.service';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Loader2,
  GraduationCap,
  Heart,
  PlusCircle,
  Sparkles,
  BookOpen,
  Fingerprint,
  ShieldCheck,
  ArrowRight,
  X,
  Save,
  Edit3,
  UserCircle,
  Hash,
} from 'lucide-react';
import Link from 'next/link';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [grade, setGrade] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getStudentProfile();
      setProfile(data);
      if (data) {
        setGrade(data.grade || '');
        setInterests(data.interests || '');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!grade.trim() || !interests.trim()) {
      return toast.error('Please fill all fields');
    }

    setIsSubmitting(true);
    try {
      let result;
      if (isEditing && profile) {
        result = await updateStudentProfile({ grade, interests });
        toast.success('Profile Updated Successfully');
      } else {
        result = await createStudentProfile(grade.trim(), interests.trim());
        toast.success('Profile Created Successfully');
      }

      if (result) {
        setProfile(prev => ({
          ...prev,
          ...result,
          user: prev?.user || result?.user,
        }));
        setIsEditing(false);
      }
    } catch (err) {
      toast.error('Operation failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-6 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600" />
        <p className="text-[10px] font-black uppercase tracking-[5px] text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Syncing Identity
        </p>
      </div>
    );
  }

  // ================= VIEW MODE =================
  if (profile && !isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 py-12 px-6 transition-colors duration-500">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-8 rounded-[40px] border border-purple-100 dark:border-purple-800/30 shadow-xl shadow-purple-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full -mr-16 -mt-16 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600/10 rounded-full -ml-16 -mb-16 blur-3xl" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                  <UserCircle size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-black uppercase tracking-tighter dark:text-white leading-none">
                      {profile?.user?.name || 'Student'}
                    </h1>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none rounded-md px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">
                      Official Member
                    </Badge>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                    <p className="text-slate-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                      <Hash size={12} className="text-purple-600" /> Student ID:{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-black">
                        {profile?.id?.slice(-8).toUpperCase()}
                      </span>
                    </p>
                    <p className="hidden md:block text-purple-200 dark:text-purple-800">
                      |
                    </p>
                    <p className="text-slate-400 dark:text-zinc-500 font-bold text-xs uppercase tracking-widest">
                      {profile?.user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsEditing(true)}
                className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-[10px] uppercase h-12 px-8 tracking-widest transition-all shadow-lg shadow-purple-500/30"
              >
                <Edit3 size={14} className="mr-2" /> Modify Data
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              <div className="flex items-center gap-4 p-6 rounded-[25px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800/30 transition-all hover:border-purple-300 group">
                <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-purple-600 dark:text-pink-400 shadow-sm group-hover:scale-110 transition-transform">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Class Level
                  </p>
                  <p className="font-black dark:text-white uppercase text-lg">
                    {profile.grade}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-[25px] bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-800/30 transition-all hover:border-pink-300 group">
                <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-pink-600 dark:text-purple-400 shadow-sm group-hover:scale-110 transition-transform">
                  <Heart size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                    Key Interests
                  </p>
                  <p className="font-black dark:text-white uppercase text-lg">
                    {profile.interests}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/TutoreProfile" className="md:col-span-2">
              <Button className="w-full h-20 rounded-[30px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black uppercase tracking-[3px] text-xs group shadow-xl shadow-purple-500/30 transition-all hover:translate-y-[-2px] relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Access Professional Mentors{' '}
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <div className="h-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-[30px] border border-purple-100 dark:border-purple-800/30 flex flex-col items-center justify-center">
              <p className="text-[8px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase tracking-widest mb-1">
                Authenticated via
              </p>
              <div className="flex items-center gap-2 text-purple-600 dark:text-pink-400 font-black text-[10px] uppercase tracking-widest">
                <ShieldCheck size={14} /> Secure-Pass
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= FORM MODE =================
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl border-none shadow-2xl dark:bg-zinc-900/90 backdrop-blur-sm rounded-[45px] overflow-hidden bg-white/90">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gradient-to-br from-purple-600 to-pink-600 p-10 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute bottom-0 left-0 p-4 opacity-10">
              <ShieldCheck size={200} />
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <Sparkles size={40} className="mb-6 opacity-50" />
              <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                Identity
                <br />
                Vault
              </h2>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[3px] opacity-60 leading-relaxed">
              Define your academic path to unlock personalized learning
              opportunities.
            </p>
          </div>

          <CardContent className="md:w-2/3 p-10 md:p-14 space-y-8">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-black uppercase tracking-tighter dark:text-white leading-none">
                {isEditing ? 'Modify' : 'Initialize'}{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Identity
                </span>
              </CardTitle>
              <CardDescription className="text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Student Information System
              </CardDescription>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2">
                  Current Grade
                </label>
                <div className="relative">
                  <GraduationCap
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600 transition-all"
                    size={20}
                  />
                  <Input
                    placeholder="e.g. Honours 3rd Year"
                    value={grade}
                    onChange={e => setGrade(e.target.value)}
                    className="pl-14 h-14 rounded-[20px] border-purple-200 dark:border-purple-800/30 bg-purple-50/50 dark:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-purple-600 font-bold"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-2">
                  Academic Interests
                </label>
                <div className="relative">
                  <Heart
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 transition-all"
                    size={20}
                  />
                  <Input
                    placeholder="e.g. AI & Robotics, Physics"
                    value={interests}
                    onChange={e => setInterests(e.target.value)}
                    className="pl-14 h-14 rounded-[20px] border-pink-200 dark:border-pink-800/30 bg-pink-50/50 dark:bg-zinc-950 focus-visible:ring-2 focus-visible:ring-pink-600 font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                onClick={handleAction}
                disabled={isSubmitting}
                className="flex-1 h-14 rounded-[20px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-purple-500/30 active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : isEditing ? (
                  <Save className="mr-2" size={16} />
                ) : (
                  <PlusCircle className="mr-2" size={16} />
                )}
                {isEditing ? 'Commit Changes' : 'Setup Profile'}
              </Button>

              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="h-14 w-14 rounded-[20px] border-purple-200 dark:border-purple-800/30 text-purple-400 hover:text-pink-500 hover:border-pink-200 dark:hover:border-pink-800 transition-colors"
                >
                  <X size={20} />
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
