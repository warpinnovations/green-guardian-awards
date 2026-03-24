"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { Headline, headlines } from "../constants/headline";

type NewsPage =
  | { type: "cover"; total: number }
  | { type: "headline"; item: Headline; pageNum: number; total: number };

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
}

interface HeadlinePageProps {
  item: Headline;
  pageNum: number;
  total: number;
  isPriority: boolean;
}

interface CoverPageProps {
  total: number;
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

function HeadlinePage({ item, pageNum, total, isPriority }: HeadlinePageProps) {
  const accent = accentForTopic(item.topic);

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#f5f0e8] font-serif">

      {/* ── Top rule + kicker ── */}
      <div className="flex items-start gap-2 my-4 mr-2">
        <div className="h-1 w-5 mt-1 shrink-0" style={{ background: accent }} />
        <span
          className="text-[9px] font-bold uppercase tracking-[0.22em] leading-tight flex-1"
          style={{ color: accent }}
        >
          {item.topic}
        </span>
        <div className="shrink-0 h-px w-3 bg-black/15 mt-1.5" />
        <span className="text-[9px] tracking-[0.12em] text-[#6b5438] italic shrink-0 whitespace-nowrap">
          {item.date}
        </span>
      </div>

      {/* ── Hero image ── */}
      <div className={`flex-1 relative mx-4.5 min-h-0 overflow-hidden border border-black/18 flex items-center justify-center ${pageNum > 21 ? "bg-[#1a150e]" : "bg-white"}`}>
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
      </div>

      {/* ── Headline caption ── */}
      <div
        className="shrink-0 px-4.5 pt-2.5 pb-1.5 bg-[#f5f0e8] border-t-2"
        style={{ borderColor: accent }}
      >
        <p className="m-0 text-[clamp(11px,1.8vw,14px)] font-bold leading-tight text-[#1a150e] tracking-[0.01em]">
          {item.headline}
        </p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1.5 text-[9px] tracking-[0.12em] uppercase no-underline pb-px"
            style={{ color: accent, borderBottom: `1px solid ${accent}55` }}
          >
            Read original ↗
          </a>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="shrink-0 px-4.5 pt-1 pb-2.5 flex justify-between items-center border-t border-black/10">
        <span className="text-[8px] tracking-[0.15em] text-[#9b7c5a] uppercase">
          The Daily Guardian
        </span>
        <span className="text-[8px] tracking-[0.12em] text-[#9b7c5a]">
          {pageNum} / {total}
        </span>
      </div>
    </div>
  );
}

function CoverPage({ total }: CoverPageProps) {
  return (
    <div className="w-full h-full bg-[#1a150e] flex flex-col items-center justify-center font-serif p-8 box-border relative overflow-hidden">
      <div className="w-full border-t border-[#c8a84b] mb-3.5" />
      <div className="w-full border-t-[3px] border-[#c8a84b] mb-5" />

      <p className="text-[#c8a84b] tracking-[0.35em] text-[10px] uppercase m-0 mb-3">
        Special Edition
      </p>

      <h1 className="text-[#f5f0e8] font-black text-center leading-[1.05] m-0 mb-2 tracking-[0.04em] text-[clamp(1.6rem,5vw,2.8rem)]">
        THE DAILY<br />GUARDIAN
      </h1>

      <div className="w-15 h-0.5 bg-[#c8a84b] mx-auto my-4" />

      <p className="text-[#c8a84b] text-xs text-center italic m-0 mb-1.5 tracking-[0.06em]">
        Two Decades of Headlines
      </p>
      <p className="text-[rgba(200,168,75,0.55)] text-[10px] text-center tracking-[0.14em] m-0 mb-8">
        2001 — 2025 · {total} FRONT PAGES
      </p>

      <div className="w-full border-t-[3px] border-[#c8a84b] mb-2" />
      <div className="w-full border-t border-[#c8a84b]" />
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
      ? <CoverPage total={page.total} />
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
    <div className="flex flex-col items-center w-full min-h-screen py-6 px-4 bg-[#ffde00] font-serif">

      {/* ── Masthead ── */}
      <header className="w-full max-w-2xl mb-3">
        <div className="border-t-4 border-[#c8a84b] pt-2 pb-1">
          <div className="flex items-center justify-between text-[10px] mb-1.5 px-1 text-[#1a150e] tracking-[0.14em]">
            <span>SPECIAL ARCHIVE EDITION</span>
            <span>✦ EST. 2001 ✦</span>
          </div>
          <div className="text-center">
            <h1
              className="font-black leading-none text-[#1a150e] text-[clamp(1.7rem,6vw,4rem)]"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
            >
              THE DAILY GUARDIAN
            </h1>
          </div>
          <div className="flex items-center justify-end text-[10px] mt-1.5 px-1 text-[rgba(26,21,14,0.75)] tracking-widest">
            <span>PAGE {currentSpread} OF {pages.length - 1}</span>
          </div>
        </div>
        <div className="h-px mt-1 bg-[rgba(200,168,75,0.2)]" />
      </header>

      {/* ── Paper ── */}
      <div
        className="relative w-full max-w-2xl cursor-grab active:cursor-grabbing"
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
          className="relative"
          style={{
            height: "min(820px, 78vh)",
            transformStyle: "preserve-3d",
            boxShadow: "0 10px 60px rgba(0,0,0,0.7), 2px 0 0 rgba(0,0,0,0.2)",
          }}
        >
          {/* Backing sheet */}
          <div className="absolute inset-0 bg-[#e2d9c4]" style={{ zIndex: 0 }} />

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

      {/* ── Bottom nav ── */}
      <div className="flex items-center gap-6 mt-5">
        <button
          onClick={() => flip("backward")}
          disabled={!canGoBackward || animState !== "idle"}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#c8a84b] disabled:opacity-20 transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L3 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Prev
        </button>

        <div className="flex gap-1 items-center overflow-hidden max-w-40">
          {pages.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300 shrink-0 h-1"
              style={{
                width: i === currentSpread ? 16 : 4,
                background: i === currentSpread
                  ? "#c8a84b"
                  : Math.abs(i - currentSpread) <= 4
                    ? "rgba(200,168,75,0.3)"
                    : "rgba(200,168,75,0.1)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => flip("forward")}
          disabled={!canGoForward || animState !== "idle"}
          className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#c8a84b] disabled:opacity-20 transition-opacity"
        >
          Next
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2L9 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
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