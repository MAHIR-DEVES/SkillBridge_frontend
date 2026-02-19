"use client";
import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 overflow-hidden relative">

      {/* --- Background Decorative Circles (Static) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-50/50 dark:bg-blue-800/10 rounded-full blur-3xl" />
      </div>

      <div className="text-center relative z-10">
        {/* --- 404 Text --- */}
        <h1 className="text-[150px] md:text-[220px] font-black text-blue-600 leading-none select-none tracking-tighter">
          404
        </h1>

        {/* --- Message --- */}
        <div className="-mt-4 md:-mt-7">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95">
              <Home size={20} />
              Back to Home
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            <ArrowLeft size={20} />
            Previous Page
          </button>
        </div>

        {/* --- Decorative Line --- */}
        <div className="mt-16 flex justify-center">
          <div className="w-1 h-20 bg-gradient-to-b from-blue-600 to-transparent rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;