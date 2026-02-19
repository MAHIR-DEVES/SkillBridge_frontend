'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import {
  Eye,
  EyeOff,
  ChevronRight,
  Mail,
  Lock,
  Home,
  LogIn,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { CustomUser } from '@/types/user';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Logging in...');

      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        const user = data?.user as CustomUser;

        if (user?.status === 'BAND' || user?.status === 'INACTIVE') {
          await authClient.signOut();

          const message =
            user.status === 'BAND'
              ? 'Your account has been banned.'
              : 'Your account is inactive.';

          toast.error(message, { id: toastId });
          return;
        }

        toast.success('User Logged in Successfully', { id: toastId });
        router.push('/');
        router.refresh();
      } catch (err) {
        toast.error('Something went wrong', { id: toastId });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20">
      <div className="relative w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-500/10 border border-purple-100 dark:border-purple-800/30 p-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl -ml-32 -mb-32" />

        {/* Home Button */}
        <Link
          href="/"
          className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-pink-400 hover:text-purple-700 dark:hover:text-pink-500 transition group"
        >
          <Home
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Home
        </Link>

        {/* Header */}
        <div className="mb-8 text-center mt-6 relative">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <LogIn className="text-white" />
          </div>

          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 mb-3">
            <Sparkles size={12} className="text-purple-600" />
            <span className="text-[8px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Sign In
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Access your account to continue
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6 relative"
        >
          {/* Email */}
          <form.Field name="email">
            {field => (
              <div className="space-y-2">
                <label className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 group-focus-within:text-purple-600 transition-colors"
                    size={18}
                  />
                  <input
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full py-4 pl-14 rounded-xl border border-purple-200 dark:border-purple-800/30 bg-purple-50/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {field => (
              <div className="space-y-2">
                <label className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 group-focus-within:text-pink-600 transition-colors"
                    size={18}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="••••••••"
                    className="w-full py-4 pl-14 pr-14 rounded-xl border border-pink-200 dark:border-pink-800/30 bg-pink-50/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-purple-600 dark:text-pink-400 hover:text-purple-700 dark:hover:text-pink-500 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={form.state.isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 transition-all active:scale-95 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            {form.state.isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </span>
            ) : (
              <>
                Sign In
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center pt-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Don t have an account?{' '}
              <Link
                href="/register"
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-colors"
              >
                Create one
              </Link>
            </span>
          </div>
        </form>

        {/* Quick tip */}
        <div className="mt-6 text-center">
          <p className="text-[8px] font-bold uppercase tracking-[2px] text-purple-400 dark:text-pink-400">
            Secure Login • SSL Encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
