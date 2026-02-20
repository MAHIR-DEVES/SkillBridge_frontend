/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import {
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  GraduationCap,
  Home,
  Lock,
  ArrowRight,
  Loader2,
  Sparkles,
} from 'lucide-react';
import type { UserRole, RegisterForm } from '@/types/user';

// Zod schema
const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (k: keyof RegisterForm, v: string) => {
    setForm(s => ({ ...s, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = (): boolean => {
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const e: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        const key = issue.path[0] as string;
        if (key) e[key] = issue.message;
      });
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        callbackURL: '/',
        // @ts-expect-error: role and phone are custom fields in our database schema
        role: role,
        phone: form.phone,
      });

      if (error) {
        toast.error(`Signup failed: ${error.message}`);
      } else {
        toast.success('Account created successfully!');
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Check your network!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 p-6 transition-colors font-sans">
      <div className="w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-purple-500/10 border border-purple-100 dark:border-purple-800/30 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* LEFT - Hero with purple/pink gradient */}
        <div className="relative p-8 md:p-10 bg-gradient-to-br from-purple-600 to-pink-600">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/90 hover:text-white transition-colors"
          >
            <Home size={18} /> Home
          </Link>
          <div className="mt-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shadow-lg -rotate-6 backdrop-blur-md border border-white/30">
              <User className="text-white" size={28} />
            </div>
            <h3 className="mt-6 text-2xl font-extrabold text-white">
              SkillBridge
            </h3>
            <p className="mt-2 text-sm text-white/80">
              Connect with expert tutors. Create your profile and start teaching
              or learning.
            </p>

            {/* Role selection with updated styling */}
            <div className="mt-6 space-y-2">
              <div className="text-xs text-white/70 font-bold uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} /> Select Your Role
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRole('STUDENT')}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    role === 'STUDENT'
                      ? 'bg-white text-purple-600 shadow-lg shadow-purple-500/30 scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User size={14} /> Student
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('TUTOR')}
                  className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                    role === 'TUTOR'
                      ? 'bg-white text-pink-600 shadow-lg shadow-pink-500/30 scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <GraduationCap size={14} /> Tutor
                  </div>
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* RIGHT - Form with theme */}
        <div className="p-8 md:p-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
          <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Create account
          </h4>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {[
              { id: 'name', icon: <User size={16} /> },
              { id: 'phone', icon: <Phone size={16} /> },
              { id: 'email', icon: <Mail size={16} /> },
              { id: 'password', icon: <Lock size={16} /> },
              { id: 'confirmPassword', icon: <Lock size={16} /> },
            ].map(f => {
              const fieldId = f.id as keyof RegisterForm;
              const isPass = fieldId === 'password';
              const isConfirm = fieldId === 'confirmPassword';
              const show = isPass ? showPass : isConfirm ? showRePass : false;
              const toggle = isPass
                ? () => setShowPass(!showPass)
                : isConfirm
                  ? () => setShowRePass(!showRePass)
                  : undefined;
              const placeholder =
                fieldId === 'confirmPassword'
                  ? 'Confirm password'
                  : fieldId.charAt(0).toUpperCase() + fieldId.slice(1);

              return (
                <div key={fieldId}>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600 transition-colors">
                      {f.icon}
                    </div>
                    <input
                      name={fieldId}
                      type={
                        (isPass || isConfirm) && !show ? 'password' : 'text'
                      }
                      value={(form as any)[fieldId]}
                      onChange={e => handleChange(fieldId, e.target.value)}
                      placeholder={placeholder}
                      className={`w-full rounded-xl py-3 pl-11 pr-10 text-sm border transition-all ${
                        errors[fieldId]
                          ? 'border-red-400 bg-red-50/10'
                          : 'border-purple-200 dark:border-purple-800/30 bg-purple-50/30 dark:bg-black/30 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20'
                      } outline-none`}
                    />
                    {(isPass || isConfirm) && (
                      <button
                        type="button"
                        onClick={toggle}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                      >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    )}
                  </div>
                  {errors[fieldId] && (
                    <div className="text-[10px] text-pink-500 mt-1 ml-1 font-medium">
                      {errors[fieldId]}
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all shadow-lg shadow-purple-500/30 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Get Started <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center text-xs text-purple-400 dark:text-pink-400 mt-4">
              By creating an account you agree to our{' '}
              <span className="font-semibold text-purple-600 dark:text-pink-500 cursor-pointer hover:underline">
                terms
              </span>
              .
            </div>

            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
