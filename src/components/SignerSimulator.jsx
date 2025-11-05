import React, { useMemo, useState } from 'react';
import { Lock, CheckCircle2, Download } from 'lucide-react';

export default function SignerSimulator({ fileMeta, otp, token }) {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [signature, setSignature] = useState('');
  const [signed, setSigned] = useState(false);

  const valid = useMemo(() => (otp && enteredOtp === otp), [enteredOtp, otp]);

  const unlock = () => {
    if (valid) setIsUnlocked(true);
  };

  const performSign = () => {
    if (!signature.trim()) return;
    setSigned(true);
  };

  const downloadReceipt = () => {
    const content = `Agreement: ${fileMeta?.name || 'N/A'}\nToken: ${token}\nSigned By: ${signature}\nStatus: Signed\nTimestamp: ${new Date().toISOString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signature_receipt_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Client signing (preview)</h2>

      {!isUnlocked ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-slate-500" />
            <p className="text-sm text-slate-600 dark:text-slate-300">Enter the OTP to unlock the document preview.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="Enter 6-digit OTP"
              className="w-48 text-center text-lg tracking-widest bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 font-mono text-slate-900 dark:text-white"
            />
            <button
              onClick={unlock}
              disabled={!valid}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Unlock
            </button>
          </div>
          {enteredOtp && !valid && (
            <p className="text-xs text-rose-600">Incorrect OTP. Try again.</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Previewing: <span className="font-medium text-slate-900 dark:text-white">{fileMeta?.name || 'Agreement.pdf'}</span>
            </p>
            <div className="mt-3 h-36 rounded-md bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 text-sm">
              PDF preview placeholder
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-600 dark:text-slate-300">Type your signature</label>
              <input
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="e.g., Jane Doe"
                className="mt-1 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={performSign}
                disabled={!signature.trim()}
                className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                Sign document
              </button>
            </div>
          </div>

          {signed && (
            <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-5 h-5" />
                <p className="text-sm font-medium">Document signed successfully</p>
              </div>
              <button
                onClick={downloadReceipt}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm"
              >
                <Download className="w-4 h-4" /> Download receipt
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
