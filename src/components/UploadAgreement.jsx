import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

export default function UploadAgreement({ onGenerated }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSelect = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }
    setError('');
    setFile(f);
  };

  const handleGenerate = async () => {
    if (!file) return;
    // Simulate link + OTP generation locally for this demo UI.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    const link = `${window.location.origin}/sign/${token}`;

    // Read file for preview name and size only; we won't upload in this UI-only version.
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer).byteLength;

    onGenerated({ file, fileMeta: { name: file.name, size: bytes }, link, otp, token });
  };

  const clear = () => {
    setFile(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Upload your agreement</h2>
      <div className="grid sm:grid-cols-3 gap-4 items-start">
        <div className="sm:col-span-2">
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors"
          >
            <input
              id="upload"
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={handleSelect}
              className="hidden"
            />
            <UploadCloud className="w-8 h-8 text-indigo-500" />
            <span className="mt-2 text-slate-700 dark:text-slate-300 font-medium">Drop your PDF here or click to browse</span>
            <span className="text-xs text-slate-500">Only .pdf files are supported</span>
          </label>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 h-40 flex flex-col justify-between">
          {file ? (
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-slate-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                onClick={clear}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Clear file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No file selected</p>
          )}
          {error && <p className="text-xs text-rose-600">{error}</p>}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleGenerate}
          disabled={!file}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Generate link & OTP
        </button>
        <span className="text-xs text-slate-500">This demo simulates generation locally</span>
      </div>
    </section>
  );
}
