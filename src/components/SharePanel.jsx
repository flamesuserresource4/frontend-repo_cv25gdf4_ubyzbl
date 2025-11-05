import React from 'react';
import { Link as LinkIcon, Copy, Shield } from 'lucide-react';

export default function SharePanel({ link, otp, onCopy }) {
  if (!link || !otp) return null;

  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    if (onCopy) onCopy(label);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Share with your client</h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
            <LinkIcon className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-1">Signing link</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={link}
                className="flex-1 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-200"
              />
              <button
                onClick={() => copy(link, 'Link copied')}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm"
              >
                <Copy className="w-4 h-4" /> Copy
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-1">One-Time Passcode</p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={otp}
                className="w-36 text-center text-lg tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono text-slate-900 dark:text-white"
              />
              <button
                onClick={() => copy(otp, 'OTP copied')}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm"
              >
                <Copy className="w-4 h-4" /> Copy OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
