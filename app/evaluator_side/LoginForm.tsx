'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function EvaluatorLoginPage() {
    const [email, setEmail] = useState('');

    const handleAccess = () => {
        if (!email) return;
        console.log('Access dashboard with:', email);
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c1f1a] via-[#0e2a22] to-[#2f7f4f]">
            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0f2a23]/90 p-8 shadow-xl backdrop-blur-md">

                <div className="flex items-center justify-center gap-4 mb-6">
                    <Image
                        src="/logos/asset-colored.png"
                        alt="Green Guardian Logo"
                        width={64}
                        height={64}
                        priority
                    />

                    <div className="leading-tight">
                        <h1 className="text-3xl font-alviona text-white tracking-wide">
                            Green
                        </h1>
                        <h1 className="text-3xl font-alviona text-white tracking-wide">
                            Gurdian
                        </h1>
                        <h1 className="text-3xl font-alviona text-white tracking-wide">
                            Awards
                        </h1>

                    </div>
                </div>



                <h2 className="text-center text-xl font-semibold text-white">
                    Evaluator Access
                </h2>
                <p className="mt-2 text-center text-sm text-white/70">
                    Enter your registered email to access assigned bids
                </p>

                {/* Email */}
                <div className="mt-6">
                    <label className="block text-sm text-white mb-2">Email</label>
                    <input
                        type="email"
                        placeholder=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-white/30 bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                </div>

                <button
                    onClick={handleAccess}
                    className="mt-6 w-full rounded-lg bg-lime-400 py-3 text-center font-semibold text-[#0f2a23] transition hover:bg-lime-300"
                >
                    Access Dashboard
                </button>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/30" />
                    <span className="text-xs text-white/60">or</span>
                    <div className="h-px flex-1 bg-white/30" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full rounded-lg border border-white/30 py-3 text-white transition hover:bg-white/10"
                >
                    Login as Margarita Lizardo
                </button>
            </div>
        </div>
    );
}
