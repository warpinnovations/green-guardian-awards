"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Bid } from "@/app/data/mockBids";
import { FileText, Video } from "lucide-react";

// Detect video platform
function getVideoPlatform(url: string) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("drive.google.com")) return "Google Drive";
  return "External";
}

// Extract YouTube ID safely
function getYouTubeId(url: string): string | null {
  try {
    if (url.includes("youtu.be")) {
      return url.split("/").pop() || null;
    }
    if (url.includes("youtube.com")) {
      return new URL(url).searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

export default function BidView({ bid }: { bid: Bid }) {
  const platform = bid.projectVideo
    ? getVideoPlatform(bid.projectVideo)
    : null;

  const youtubeId =
    bid.projectVideo && platform === "YouTube"
      ? getYouTubeId(bid.projectVideo)
      : null;

  const [playVideo, setPlayVideo] = useState(false);

  // ✅ Hydration-safe mount check
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start 
      bg-[radial-gradient(circle_at_top_center,rgba(170,190,60,0.5),rgba(40,90,60,0.9)_30%),
      linear-gradient(105deg,#ffff,#0f3d1f,#1a7f3a)]
      py-10 px-4"
    >
      <div className="w-full max-w-5xl space-y-8">

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold 
          px-5 py-2.5 rounded-full backdrop-blur-md
          bg-white/10 text-white border border-white/20
          hover:bg-white/20 transition-all duration-200
          shadow hover:shadow-lg active:scale-95"
        >
          ← Back to dashboard
        </Link>

        {/* Main Card */}
        <div className="rounded-3xl bg-white/10 backdrop-blur-xl 
          border border-white/20 p-8 
          shadow-xl hover:shadow-2xl transition-all space-y-7">

          {/* Title & Status */}
          <div className="flex flex-wrap gap-3 justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {bid.title}
            </h1>

            <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase
              bg-yellow-200/90 text-black shadow-sm">
              {bid.status}
            </span>
          </div>

          {/* Meta Chips */}
          <div className="flex flex-wrap gap-3 items-center text-sm">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80">
              Submitted by: <strong>{bid.organization}</strong>
            </span>

            <span className="px-3 py-1 rounded-full bg-green-300/90 text-black font-medium shadow-sm">
              {bid.category}
            </span>

            {isMounted && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                Submitted: {bid.submittedAt}
              </span>
            )}
          </div>

          <hr className="border-white/20" />

          {/* Description */}
          <div>
            <p className="text-xs tracking-widest uppercase font-semibold text-white/70 mb-1">
              Project Description
            </p>
            <p className="text-sm leading-relaxed text-white/70">
              {bid.description}
            </p>
          </div>

          {/* Key Visual */}
          {bid.keyVisual && (
            <div className="rounded-2xl overflow-hidden bg-white/10 
              border border-white/20 shadow-lg">
              <p className="text-xs tracking-widest uppercase font-semibold text-white/70 p-3">
                Key Visual
              </p>
              <div className="relative w-full h-[320px]">
                <Image
                  src={bid.keyVisual}
                  alt={`${bid.title} key visual`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* ================= MEDIA SECTION ================= */}
          <div className="space-y-5">

            {/* Project Video - FULL WIDTH */}
            {bid.projectVideo && (
              <div className="rounded-2xl bg-emerald-900/40 backdrop-blur-md
                border border-white/15 shadow-xl p-5 space-y-3">

                <p className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-white/80">
                  <Video size={18} />
                  Project Video ({platform})
                </p>

                {platform === "YouTube" && youtubeId && (
                  <>
                    {playVideo ? (
                      <div className="relative w-full h-[360px] rounded-xl overflow-hidden">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div
                        className="relative w-full h-[360px] rounded-xl overflow-hidden cursor-pointer group"
                        onClick={() => setPlayVideo(true)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                          className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition"
                          alt="Video preview"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/90 
                            rounded-full flex items-center justify-center 
                            text-black text-2xl shadow-xl 
                            group-hover:scale-110 transition">
                            ▶
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {platform !== "YouTube" && (
                  <a
                    href={bid.projectVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:text-yellow-400 underline text-sm"
                  >
                    Open video link
                  </a>
                )}
              </div>
            )}

            {/* Documents Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Bid Document */}
              {bid.bidDocument && (
                <a
                  href={bid.bidDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-emerald-900/40 backdrop-blur-md
                  border border-white/15 shadow-lg p-5
                  flex items-center gap-4 hover:bg-emerald-900/60 transition"
                >
                  <div className="p-3 rounded-xl bg-white/10">
                    <FileText className="text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Bid Document
                    </p>
                    <p className="text-xs text-white/60">
                      View or download PDF
                    </p>
                  </div>
                </a>
              )}

              {/* Supporting Document */}
              {bid.supportingDocuments && (
                <a
                  href={bid.supportingDocuments}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl bg-emerald-900/40 backdrop-blur-md
                  border border-white/15 shadow-lg p-5
                  flex items-center gap-4 hover:bg-emerald-900/60 transition"
                >
                  <div className="p-3 rounded-xl bg-white/10">
                    <FileText className="text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Supporting Document
                    </p>
                    <p className="text-xs text-white/60">
                      View or download PDF
                    </p>
                  </div>
                </a>
              )}

            </div>
          </div>
          {/* ================= END MEDIA SECTION ================= */}

        </div>

        {/* CTA */}
        <div className="flex justify-end pt-2">
          <Link
            href={`/dashboard/evaluate/${bid.id}`}
            className="inline-flex items-center justify-center
              px-8 py-3.5 rounded-full font-semibold text-sm
              bg-yellow-200 text-black
              hover:bg-yellow-300 active:scale-95 transition-all
              shadow-lg hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Proceed to Evaluation →
          </Link>
        </div>
      </div>
    </div>
  );
}
