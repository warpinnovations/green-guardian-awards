"use client";

import Image from "next/image";

interface StatItem {
  value: string;
  label: string;
}

interface DailyGuardianSplashProps {
  edition?: string;
  volume?: string;
  date?: string;
  stats?: StatItem[];
  onReadArchive?: () => void;
}

export default function DailyGuardianSplash({
  edition = "Special Archive Edition",
  volume = "Vol. XXV · Est. 2001 · April 2026",
  onReadArchive,
}: DailyGuardianSplashProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#0e0c00] font-serif overflow-hidden">
      {/* Masthead */}
      <div className="shrink-0 border-b border-[#2a2200] px-5 pb-3 text-center py-10">
        <p className="mb-2 font-sans text-[8px] font-bold uppercase tracking-[4px] text-[#ffde00] mt-6">
          {edition}
        </p>
        <Image src={'/dg-logo.png'} alt="Daily Guardian Logo" width={200} height={100} className="mx-auto mb-1" />
        <p className="font-sans text-[8px] uppercase tracking-[2px] text-[#555]">
          {volume}
        </p>
      </div>

      {/* Hero Section — fills remaining space */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-[#1a1400]">
        {/* Ghost "25" watermark */}
        <div
          className="pointer-events-none absolute -bottom-6 -right-2 select-none font-sans text-[150px] font-black leading-none text-[#c9a227]"
          style={{ opacity: 0.05 }}
          aria-hidden="true"
        >
          25
        </div>

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-1 flex-col justify-center px-8 transition-all duration-700 translate-y-0 opacity-100"
        >
          <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
            {/* Decorative top line */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#c9a227]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#c9a227]" />
            </div>

            <Image src="/25-years-dg.png" alt="25 Years of the Daily Guardian" width={170} height={60} />

            {/* Decorative middle ornament */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-[#c9a227]" />
              <div className="w-2 h-2 rotate-45 border border-[#c9a227]" />
              <div className="w-8 h-px bg-[#c9a227]" />
            </div>

            {/* Headline */}
            <h2
              className="text-[42px] font-sans font-black leading-[0.95] text-white uppercase text-center tracking-tight"
            >
              TURNING A<br />
              <span className="text-[#ffde00]">NEW</span> <span className="opacity-20">P</span>AGE
            </h2>

            {/* Decorative bottom line */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a227]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats + CTA */}
      <div className="shrink-0 bg-[#ffde00]">

        {/* CTA row */}
        <div className="flex items-center justify-between bg-[#0e0c00] px-5 py-3" onClick={onReadArchive}>
          <button
            onClick={onReadArchive}
            className="font-sans text-[9px] py-4 font-bold uppercase tracking-[2px] text-[#ffde00] transition-opacity hover:opacity-70 active:opacity-50"
          >
            Read Archive Edition
          </button>
          <span className="text-base text-[#ffde00]">›</span>
        </div>
      </div>
    </div>
  );
}
