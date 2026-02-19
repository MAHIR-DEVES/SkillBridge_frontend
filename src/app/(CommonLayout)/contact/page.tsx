'use client';

import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  Sparkles,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const contactDetails = [
    {
      title: 'Email Us',
      info: 'support@skillbridge.com',
      description: 'Send us a message anytime!',
      icon: Mail,
      color: 'text-purple-600 dark:text-pink-400',
      bg: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
    },
    {
      title: 'Call Us',
      info: '+1 (555) 000-1234',
      description: 'Mon-Fri from 9am to 6pm.',
      icon: Phone,
      color: 'text-pink-600 dark:text-purple-400',
      bg: 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30',
    },
    {
      title: 'Visit Office',
      info: '123 Education Lane',
      description: 'New York, NY 10001, USA',
      icon: MapPin,
      color: 'text-purple-600 dark:text-pink-400',
      bg: 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };

  return (
    <div className="pt-24 pb-20 bg-gradient-to-b from-white to-pink-50 dark:from-black dark:via-purple-950/20 dark:to-pink-950/20 transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER SECTION ================= */}
        <section className="text-center mb-20 mt-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
            <Heart size={14} className="text-purple-600" />
            <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Let s Connect
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-slate-900 dark:text-white leading-tight">
            Get in{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Touch.
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-semibold">
            Have questions about SkillBridge? We&#39;re here to help you
            navigate your learning or teaching journey.
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* ================= CONTACT INFO CARDS ================= */}
          <div className="lg:col-span-1 space-y-6">
            {contactDetails.map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-[2.5rem] border border-purple-100 dark:border-purple-800/30 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-purple-500/10 group hover:-translate-y-1"
              >
                <div
                  className={`h-14 w-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className={item.color} size={28} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {item.title}
                </h3>
                <p className="text-purple-600 dark:text-pink-400 font-bold mb-1">
                  {item.info}
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-wide">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* ================= CONTACT FORM ================= */}
          <div className="lg:col-span-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-purple-100 dark:border-purple-800/30 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-purple-500/10">
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 mb-4">
                <Sparkles size={14} className="text-purple-600" />
                <span className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Get in Touch
                </span>
              </div>

              <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2 flex items-center gap-3">
                Send a Message <MessageSquare className="text-purple-500" />
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-semibold">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-1">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    className="h-14 rounded-2xl border-purple-200 dark:border-purple-800/30 bg-purple-50/50 dark:bg-black/50 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="h-14 rounded-2xl border-purple-200 dark:border-purple-800/30 bg-purple-50/50 dark:bg-black/50 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-1">
                  Subject
                </label>
                <Input
                  placeholder="How can we help?"
                  className="h-14 rounded-2xl border-purple-200 dark:border-purple-800/30 bg-purple-50/50 dark:bg-black/50 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 ml-1">
                  Your Message
                </label>
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-[150px] rounded-[2rem] border-purple-200 dark:border-purple-800/30 bg-purple-50/50 dark:bg-black/50 text-slate-900 dark:text-white font-semibold p-6 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-lg rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-purple-500/30 group"
              >
                Send Message
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </form>

            {/* Quick response guarantee */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock size={14} className="text-purple-500" />
              <span>
                Average response time:{' '}
                <span className="font-bold text-purple-600 dark:text-pink-400">
                  &lt; 2 hours
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
