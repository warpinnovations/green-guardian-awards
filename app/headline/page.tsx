"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { Headline, headlines } from "../constants/headline";
import DailyGuardianSplash from "./DailyGuardianSplash";

type NewsPage =
  | { type: "cover"; total: number }
  | { type: "headline"; item: Headline; pageNum: number; total: number }
  | { type: "closing" };

type FlipDirection = "forward" | "backward";
type AnimationState = "idle" | "flipping";
type HoverZone = "left" | "right" | null;

interface LeafProps {
  page: NewsPage;
  index: number;
  currentSpread: number;
  isFlipping: boolean;
  flipDirection: FlipDirection;
  activeLeaf: number | null;
  onFlip: (direction: FlipDirection) => void;
}

interface HeadlinePageProps {
  item: Headline;
  pageNum: number;
  total: number;
  isPriority: boolean;
}

interface FlippingBookProps {
  pages: NewsPage[];
  currentSpread: number;
  onSpreadChange: (spread: number) => void;
}

function accentForTopic(topic: string): string {
  const t = topic.toLowerCase();
  if (t.includes("typhoon") || t.includes("tragedy") || t.includes("death") || t.includes("kill") || t.includes("murder") || t.includes("slay") || t.includes("ambush"))
    return "#8b1a1a";
  if (t.includes("covid") || t.includes("vaccine"))
    return "#1a5c8b";
  if (t.includes("election"))
    return "#1a6b2e";
  if (t.includes("drug") || t.includes("crime") || t.includes("gang") || t.includes("bomb"))
    return "#5c1a6b";
  return "#3a2a1a";
}

function ClosingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#0e0c00] font-serif overflow-hidden">
      {/* Masthead */}
      <div className="shrink-0 border-b border-[#2a2200] px-5 pb-3 text-center py-10">
        <p className="mb-2 font-sans text-[8px] font-bold uppercase tracking-[4px] text-[#ffde00] mt-6">
          25th Anniversary Edition
        </p>
        <h1 className="mb-1 text-2xl font-bold leading-none tracking-[2px] text-white">
          THE {" "}
          <span className="text-[#ffde00]">DAILY GUARDIAN</span>
        </h1>
        {/* Gold underline */}
        <div className="mx-auto mb-3 h-0.5 w-14 bg-[#ffde00]" />
        <p className="font-sans text-[8px] uppercase tracking-[2px] text-[#555]">
          Vol. XXV · Est. 2001 · April 2026
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
        <div className="relative z-10 flex flex-1 flex-col justify-center px-8 transition-all duration-700 translate-y-0 opacity-100">
          <div className="flex flex-col items-center gap-10 max-w-md mx-auto">
            {/* Decorative top line */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a227]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a227]" />
            </div>

            <h2 className="text-[42px] font-sans font-black leading-[0.95] text-white uppercase text-center tracking-tight">
              TURNING A<br />
              <span className="text-[#ffde00]">NEW</span> <span className="opacity-20">P</span>AGE
            </h2>

            {/* Decorative middle ornament */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-[#c9a227]" />
              <div className="w-2 h-2 rotate-45 border border-[#c9a227]" />
              <div className="w-8 h-px bg-[#c9a227]" />
            </div>

            <div className="text-center space-y-3">
              <p className="text-[15px] leading-[1.8] text-[#bbb] font-sans">
                Twenty-five years of stories told, countless more await. As we turn this new page, our promise remains: truth, accountability, and service to our community.
              </p>
            </div>

            {/* Decorative bottom line */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-linear-to-r from-transparent to-[#c9a227]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
              <div className="flex-1 h-px bg-linear-to-l from-transparent to-[#c9a227]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="shrink-0 bg-[#ffde00]">
        <div className="flex items-center justify-center bg-[#0e0c00] px-5 py-4 border-t border-[#2a2200]">
          <div className="text-center">
            <p className="text-[#ffde00] font-bold text-[12px] tracking-[3px] uppercase">
              The Daily Guardian
            </p>
            <p className="text-[#888] text-[10px] tracking-[2px] mt-1">
              Iloilo, Philippines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeadlinePage({ item, pageNum, total, isPriority }: HeadlinePageProps) {
  const accent = accentForTopic(item.topic);

  // Helper to render date with highlighted year
  const renderDateWithHighlightedYear = (date: string) => {
    const yearMatch = date.match(/(\d{4})/);
    if (!yearMatch) return date;

    const year = yearMatch[0];
    const parts = date.split(year);

    return (
      <div className="flex flex-col items-end gap-1">
        <span
          className="inline-block text-gray-800 rounded-lg px-7 py-0.5 text-[30px] -mr-7 font-bold bg-white"
        >
          {year}
        </span>
        <span className="text-[14px] -mt-2 font-medium">
          {parts[0].replace(/,/g, '')}{parts[1].replace(/,/g, '')}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#ffde00] font-serif">

      {/* ── Topic and Date ── */}
      <div className="flex items-start justify-between px-4 pt-4 pb-2">
        <div className="flex-1">
          <span
            className="text-[12px] font-bold uppercase tracking-[0.22em] leading-tight inline-block"
            style={{ color: accent }}
          >
            {item.topic}
          </span>
          <div className="h-1 w-10 mt-1" style={{ background: accent }} />
        </div>
        <div className="tracking-[0.12em] text-[#6b5438] italic ml-4">
          {renderDateWithHighlightedYear(item.date)}
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className={`flex-1 relative mx-4.5 min-h-0 overflow-hidden border border-black/18 flex items-center justify-center ${pageNum > 21 ? "bg-[#1a150e]" : "bg-white"}`}>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={item.imageUrl}
              alt={item.topic}
              width={600}
              height={600}
              className="object-contain w-full h-full"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement as HTMLElement;
                parent.style.background = `linear-gradient(160deg, ${accent}22, ${accent}55)`;
              }}
              priority={isPriority}
            />
          </a>
        ) : (
          <Image
            src={item.imageUrl}
            alt={item.topic}
            width={600}
            height={600}
            className="object-contain w-full h-full"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.style.display = "none";
              const parent = e.currentTarget.parentElement as HTMLElement;
              parent.style.background = `linear-gradient(160deg, ${accent}22, ${accent}55)`;
            }}
            priority={isPriority}
          />
        )}
      </div>

      {/* ── Headline caption ── */}
      <div
        className="shrink-0 px-4.5 pt-2.5 pb-6 bg-white/30 mt-2"
        style={{ borderColor: accent }}
      >
        <p className="m-0 text-[clamp(12px,1.8vw,14px)] font-bold leading-tight text-[#1a150e] tracking-[0.01em]">
          {item.headline}
        </p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1.5 text-[9px] text-black tracking-[0.12em] uppercase no-underline pb-px font-bold"
            style={{ borderBottom: `1px solid ${accent}55` }}
          >
            Read original ↗
          </a>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="shrink-0 px-4.5 pt-1 pb-2.5 flex justify-between items-center border-t border-black/10">
        <span className="text-[10px] tracking-[0.15em] text-[#9b7c5a] uppercase">
          The Daily Guardian
        </span>
        <span className="text-[10px] tracking-[0.12em] text-[#9b7c5a]">
          {pageNum} / {total}
        </span>
      </div>
    </div>
  );
}

function Leaf({
  page,
  index,
  currentSpread,
  isFlipping,
  flipDirection,
  activeLeaf,
  onFlip,
}: LeafProps) {
  const isPast = index < currentSpread;
  const isCurrent = index === currentSpread;
  const isPriority = Math.abs(index - currentSpread) <= 2;

  const rotation =
    isPast
      ? isFlipping && flipDirection === "backward" && activeLeaf === index
        ? "rotateY(0deg) translateZ(0.1px)"
        : "rotateY(-180deg) translateZ(0.1px)"
      : isCurrent && isFlipping
        ? flipDirection === "forward"
          ? "rotateY(-180deg) translateZ(0.1px)"
          : "rotateY(0deg) translateZ(0.1px)"
        : "rotateY(0deg) translateZ(0.1px)";

  const zIndex =
    isCurrent ? 30 :
      isPast ? 20 + index :
        10 - index;

  const shouldAnimate =
    (isCurrent && isFlipping) ||
    (isPast && activeLeaf === index && isFlipping && flipDirection === "backward");

  const content =
    page.type === "cover"
      ? <DailyGuardianSplash onReadArchive={() => onFlip("forward")} />
      : page.type === "closing"
        ? <ClosingPage />
        : <HeadlinePage
          item={page.item}
          pageNum={page.pageNum}
          total={page.total}
          isPriority={isPriority}
        />;

  return (
    <div
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
        transform: rotation,
        transition: shouldAnimate
          ? "transform 0.75s cubic-bezier(0.645,0.045,0.355,1)"
          : "none",
        zIndex,
        willChange: "transform",
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {content}
      </div>
    </div>
  );
}

function FlippingBook({ pages, currentSpread, onSpreadChange }: FlippingBookProps) {
  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [flipDirection, setFlipDirection] = useState<FlipDirection>("forward");
  const [activeLeaf, setActiveLeaf] = useState<number | null>(null);
  const [hoverZone, setHoverZone] = useState<HoverZone>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const dragStart = useRef<number | null>(null);

  const canGoForward = currentSpread < pages.length - 1;
  const canGoBackward = currentSpread > 0;

  const flip = useCallback(
    (direction: FlipDirection) => {
      if (animState !== "idle") return;
      if (direction === "forward" && !canGoForward) return;
      if (direction === "backward" && !canGoBackward) return;

      const targetLeaf = direction === "forward" ? currentSpread : currentSpread - 1;
      setFlipDirection(direction);
      setActiveLeaf(targetLeaf);
      setAnimState("flipping");

      setTimeout(() => {
        onSpreadChange(direction === "forward" ? currentSpread + 1 : currentSpread - 1);
        setAnimState("idle");
        setActiveLeaf(null);
      }, 750);
    },
    [animState, canGoForward, canGoBackward, currentSpread, onSpreadChange]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      flip(dx < 0 ? "forward" : "backward");
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    if (Math.abs(dx) > 40) flip(dx < 0 ? "forward" : "backward");
    isDragging.current = false;
    dragStart.current = null;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flip("forward");
      if (e.key === "ArrowLeft") flip("backward");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [flip]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#ffde00] font-serif">

      {/* ── Paper ── */}
      <div
        className="relative w-full max-w-2xl h-full cursor-grab active:cursor-grabbing"
        style={{ perspective: "2800px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {/* Drop shadow */}
        <div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 pointer-events-none blur-2xl opacity-70"
          style={{
            width: "85%",
            height: 24,
            background: "radial-gradient(ellipse, #000 0%, transparent 70%)",
          }}
        />

        {/* Page stack */}
        <div
          className="relative h-full"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 10px 60px rgba(0,0,0,0.7), 2px 0 0 rgba(0,0,0,0.2)",
          }}
        >
          {/* Backing sheet */}
          <div className="absolute inset-0 bg-[#ffde00]" style={{ zIndex: 0 }} />

          {pages.map((page, i) => {
            const isNear = Math.abs(i - currentSpread) <= 3;

            if (!isNear) return null;

            return (
              <Leaf
                key={i}
                page={page}
                index={i}
                currentSpread={currentSpread}
                isFlipping={animState === "flipping" && activeLeaf === i}
                flipDirection={flipDirection}
                activeLeaf={activeLeaf}
                onFlip={flip}
              />
            );
          })}
          {/* Left zone */}
          <button
            onClick={() => flip("backward")}
            disabled={!canGoBackward || animState !== "idle"}
            onMouseEnter={() => setHoverZone("left")}
            onMouseLeave={() => setHoverZone(null)}
            className="absolute left-0 top-0 bottom-0 w-20 z-40 transition-all duration-200 disabled:cursor-default"
            style={{
              background: hoverZone === "left" && canGoBackward
                ? "linear-gradient(to right, rgba(200,168,75,0.12), transparent)"
                : "transparent",
              cursor: canGoBackward ? "w-resize" : "default",
            }}
            aria-label="Previous page"
          >
            {hoverZone === "left" && canGoBackward && (
              <div className="flex items-center justify-start pl-3 h-full">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[rgba(200,168,75,0.7)]">
                  <path d="M14 4L7 11L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </button>

          {/* Right zone */}
          <button
            onClick={() => flip("forward")}
            disabled={!canGoForward || animState !== "idle"}
            onMouseEnter={() => setHoverZone("right")}
            onMouseLeave={() => setHoverZone(null)}
            className="absolute right-0 top-0 bottom-0 w-20 z-40 transition-all duration-200 disabled:cursor-default"
            style={{
              background: hoverZone === "right" && canGoForward
                ? "linear-gradient(to left, rgba(200,168,75,0.12), transparent)"
                : "transparent",
              cursor: canGoForward ? "e-resize" : "default",
            }}
            aria-label="Next page"
          >
            {hoverZone === "right" && canGoForward && (
              <div className="flex items-center justify-end pr-3 h-full">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[rgba(200,168,75,0.7)]">
                  <path d="M8 4L15 11L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NewspaperPage() {
  const [currentSpread, setCurrentSpread] = useState<number>(0);

  // Pure data, no JSX, no currentSpread dep → created once, never changes
  const pages = useMemo<NewsPage[]>(() => [
    { type: "cover", total: headlines.length },
    ...headlines.map((item, i) => ({
      type: "headline" as const,
      item,
      pageNum: i + 1,
      total: headlines.length,
    })),
    { type: "closing" },
  ], []);

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <FlippingBook
        pages={pages}
        currentSpread={currentSpread}
        onSpreadChange={setCurrentSpread}
      />
    </main>
  );
}