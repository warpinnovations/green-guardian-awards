'use client';

import { supabase } from "@/app/lib/supabaseClient";
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EvaluatorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleAccess = async () => {
    if (!email || !password) return;

    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error) {
      console.error("Auth error:", error.message);
      setErrorMsg('Invalid email or password.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1f1a] via-[#0e2a22] to-[#2f7f4f]">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0f2a23]/90 p-8 shadow-xl backdrop-blur-md">

        <div className="flex items-center justify-center gap-4 mb-6">
          <Image src="/logos/asset-colored.png" alt="Green Guardian Logo" width={64} height={64} priority />
          <div className="leading-tight">
            <h1 className="text-3xl font-alviona text-white">Green</h1>
            <h1 className="text-3xl font-alviona text-white">Guardian</h1>
            <h1 className="text-3xl font-alviona text-white">Awards</h1>
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold text-white">Evaluator Login</h2>

        <div className="mt-6">
          <label className="block text-sm text-white mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-transparent px-4 py-3 text-white"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-white mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-transparent px-4 py-3 text-white"
          />
        </div>

        {errorMsg && (
          <p className="mt-3 text-sm text-red-500">{errorMsg}</p>
        )}

        <button
          onClick={handleAccess}
          disabled={!email || !password}
          className="mt-6 w-full rounded-lg bg-lime-400 py-3 font-semibold text-[#0f2a23]"
        >
          Login
        </button>
      </div>
    </div>
  );
}
