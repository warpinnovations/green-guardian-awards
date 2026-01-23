"use client";

import Image from "next/image";
import { LogOut } from 'lucide-react';

export default function DashboardHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-[#0A2724] backdrop-blur-md border-b-8 border-[#D4AF37]">
            <div className="mx-auto max-w-7xl">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/logos/asset-colored.png"
                            alt="Green Guardian Awards"
                            width={24}
                            height={24}
                            className="object-contain"
                            priority
                        />
                        <p className="font-alviona text-xl font-semibold text-[#eefaf5] leading-tight">
                            Green Guardian Awards
                        </p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 text-white">
                        <div className="text-right">
                            <p className="text-sm font-semibold">Margarita Lizardo</p>
                            <p className="text-xs text-white/70">margarita@greenguardian.ph</p>
                        </div>
                        <LogOut className="cursor-pointer opacity-80 hover:opacity-100" />
                    </div>
                </div>
            </div>
        </header>
    );
}