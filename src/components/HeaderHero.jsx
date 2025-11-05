import React from 'react';
import { FileSignature, ShieldCheck, Share2, Link as LinkIcon } from 'lucide-react';

export default function HeaderHero() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-fuchsia-400/10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 text-indigo-600 font-semibold mb-3">
          <FileSignature className="w-5 h-5" />
          <span>Freelance Agreement Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Send, sign, and share agreements in minutes
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
          Upload a PDF, generate a secure link with OTP access, let clients sign, and download the completed agreement.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-slate-600 dark:text-slate-300">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-800/60 backdrop-blur rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>OTP protected access</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-800/60 backdrop-blur rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700">
            <Share2 className="w-4 h-4 text-sky-500" />
            <span>Shareable signing links</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-slate-800/60 backdrop-blur rounded-full px-3 py-1 border border-slate-200 dark:border-slate-700">
            <LinkIcon className="w-4 h-4 text-indigo-500" />
            <span>No account needed for clients</span>
          </div>
        </div>
      </div>
    </header>
  );
}
