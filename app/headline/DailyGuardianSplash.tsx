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
  headline?: string;
  subheadline?: string;
  deck?: string;
  stats?: StatItem[];
  onReadArchive?: () => void;
}

export default function DailyGuardianSplash({
  edition = "Special Archive Edition",
  volume = "Vol. XXV · Est. 2001 · April 2026",
  headline = "Turning a New Page",
  deck = "Two and a half decades of truth-telling, accountability, and stories that shaped our community.",
  onReadArchive,
}: DailyGuardianSplashProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#0e0c00] font-serif overflow-hidden">
      {/* Masthead */}
      <div className="shrink-0 border-b border-[#2a2200] px-5 pb-3 text-center py-10">
        <p className="mb-2 font-sans text-[8px] font-bold uppercase tracking-[4px] text-[#ffde00] mt-6">
          {edition}
        </p>
        <h1 className="mb-1 text-2xl font-bold leading-none tracking-[2px] text-white">
          THE {" "}
          <span className="text-[#ffde00]">DAILY GUARDIAN</span>
        </h1>
        {/* Gold underline */}
        <div className="mx-auto mb-3 h-0.5 w-14 bg-[#ffde00]" />
        <p className="font-sans text-[8px] uppercase tracking-[2px] text-[#555]">
          {volume}
        </p>
      </div>

      {/* Hero Section — fills remaining space */}
      <div className="relative flex flex-1 flex-col overflow-hidden bg-[#1a1400]">

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-1 flex-col justify-center px-5 transition-all duration-700 translate-y-0 opacity-100"
        >
          <div className="flex flex-col items-center">
            <Image src="/25-years-dg.png" className="-mt-10" alt="25 Years of the Daily Guardian" width={250} height={100} />
            {/* Headline */}
            <h2
              className="text-[28px] -mt-2 mb-7 font-bold leading-[1.1] text-white"
              style={{ fontFamily: "'Times New Roman', serif" }}
            >
              {headline.split(" ").map((word, i) => (
                <span key={i}>
                  {i === 2 ? (
                    <em className="not-italic text-[#ffde00]">{word}</em>
                  ) : (
                    word
                  )}
                  {i < headline.split(" ").length - 1 ? " " : null}
                </span>
              ))}
            </h2>

          </div>

          {/* Deck copy */}
          <p className="mb-5 font-sans text-center text-[12px] leading-[1.7] text-[#888]">
            {deck}
          </p>
        </div>
      </div>

      {/* Bottom Stats + CTA */}
      <div className="shrink-0 bg-[#ffde00]">

        {/* CTA row */}
        <div className="flex items-center justify-between bg-[#0e0c00] px-5 py-3" onClick={onReadArchive}>
          <button
            onClick={onReadArchive}
            className="font-sans text-[9px] font-bold uppercase tracking-[2px] text-[#ffde00] transition-opacity hover:opacity-70 active:opacity-50"
          >
            Read Archive Edition
          </button>
          <span className="text-base text-[#ffde00]">›</span>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="flex items-center justify-center bg-[#0e0c00] py-2">
        <div className="h-1 w-24 rounded-full bg-[#2a2200]" />
      </div>
    </div>
  );
}
