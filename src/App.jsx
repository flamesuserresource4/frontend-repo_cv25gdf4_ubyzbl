import React, { useState } from 'react';
import HeaderHero from './components/HeaderHero';
import UploadAgreement from './components/UploadAgreement';
import SharePanel from './components/SharePanel';
import SignerSimulator from './components/SignerSimulator';

export default function App() {
  const [state, setState] = useState({ file: null, fileMeta: null, link: '', otp: '', token: '' });
  const [toast, setToast] = useState('');

  const handleGenerated = (payload) => {
    setState(payload);
    setToast('Link & OTP generated');
    setTimeout(() => setToast(''), 1800);
  };

  const handleCopy = (label) => {
    setToast(label);
    setTimeout(() => setToast(''), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <HeaderHero />

      <main className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UploadAgreement onGenerated={handleGenerated} />
            <SignerSimulator fileMeta={state.fileMeta} otp={state.otp} token={state.token} />
          </div>
          <div className="space-y-6">
            <SharePanel link={state.link} otp={state.otp} onCopy={handleCopy} />
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">How it works</h2>
              <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li>1. Upload your PDF agreement.</li>
                <li>2. Generate a secure link and OTP.</li>
                <li>3. Share both with your client.</li>
                <li>4. Client opens the link, enters OTP, signs.</li>
                <li>5. Download the signed document or receipt.</li>
              </ol>
            </section>
          </div>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
