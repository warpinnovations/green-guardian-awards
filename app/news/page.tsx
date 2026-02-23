"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

// ════════════════════════════════════════════════════════════
//  TYPES
// ════════════════════════════════════════════════════════════
interface NewsPage {
  front: React.ReactNode;
  back: React.ReactNode;
}

type FlipDirection = "forward" | "backward";
type AnimationState = "idle" | "flipping";

// ════════════════════════════════════════════════════════════
//  LEAF (single page with front/back face)
// ════════════════════════════════════════════════════════════
interface LeafProps {
  page: NewsPage;
  index: number;
  currentSpread: number;
  isFlipping: boolean;
  flipDirection: FlipDirection;
  activeLeaf: number | null;
}

function Leaf({ page, index, currentSpread, isFlipping, flipDirection, activeLeaf }: LeafProps) {
  const isPast = index < currentSpread;
  const isCurrent = index === currentSpread;

  const rotation = isPast
    ? isFlipping && flipDirection === "backward" && activeLeaf === index
      ? "rotateY(0deg)"
      : "rotateY(-180deg)"
    : isCurrent && isFlipping
      ? flipDirection === "forward"
        ? "rotateY(-180deg)"
        : "rotateY(0deg)"
      : "rotateY(0deg)";

  const zIndex =
    isCurrent && isFlipping ? 30 : isCurrent ? 20 : isPast ? index + 1 : 10 - index;

  return (
    <div
      className="absolute inset-0"
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "left center",
        transform: rotation,
        transition:
          (isCurrent && isFlipping) || (isPast && activeLeaf === index && isFlipping && flipDirection === "backward")
            ? "transform 0.75s cubic-bezier(0.645,0.045,0.355,1)"
            : "none",
        zIndex,
      }}
    >
      {/* Front face */}
      <div
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        {page.front}
        <div
          className="absolute inset-y-0 right-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0.05))",
          }}
        />
      </div>
      {/* Back face */}
      <div
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {page.back}
        <div
          className="absolute inset-y-0 left-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to left, transparent, rgba(0,0,0,0.05))",
          }}
        />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  FLIPPING BOOK ENGINE
// ════════════════════════════════════════════════════════════
interface FlippingBookProps {
  pages: NewsPage[];
  title?: string;
  edition?: string;
  date?: string;
}

function FlippingBook({
  pages,
  title = "THE DAILY GUARDIAN",
  edition = "Morning Edition",
  date,
}: FlippingBookProps) {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [flipDirection, setFlipDirection] = useState<FlipDirection>("forward");
  const [activeLeaf, setActiveLeaf] = useState<number | null>(null);
  const [hoverZone, setHoverZone] = useState<"left" | "right" | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragStart = useRef<number | null>(null);

  const today =
    date ??
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const canGoForward = currentSpread < pages.length - 1;
  const canGoBackward = currentSpread > 0;

  const flip = useCallback(
    (direction: FlipDirection) => {
      if (animState !== "idle") return;
      if (direction === "forward" && !canGoForward) return;
      if (direction === "backward" && !canGoBackward) return;

      const targetLeaf =
        direction === "forward" ? currentSpread : currentSpread - 1;
      setFlipDirection(direction);
      setActiveLeaf(targetLeaf);
      setAnimState("flipping");

      setTimeout(() => {
        setCurrentSpread((s) =>
          direction === "forward" ? s + 1 : s - 1
        );
        setAnimState("idle");
        setActiveLeaf(null);
      }, 750);
    },
    [animState, canGoForward, canGoBackward, currentSpread]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy =
      e.changedTouches[0].clientY - (touchStartY.current ?? 0);
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
    if (Math.abs(dx) > 40) {
      flip(dx < 0 ? "forward" : "backward");
    }
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
    <div
      className="flex flex-col items-center w-full min-h-screen py-6 px-4"
      style={{ background: "#ffde00", fontFamily: "'Times New Roman', Times, serif" }}
    >
      {/* ── Masthead ── */}
      <header className="w-full max-w-5xl mb-3">
        <div
          className="border-t-4 pt-2 pb-1"
          style={{
            borderTopColor: "#c8a84b",
            borderBottom: "1px solid rgba(200,168,75,0.3)",
          }}
        >
          <div
            className="flex items-center justify-between text-xs mb-1.5 px-1"
            style={{ color: "#1a150e", letterSpacing: "0.14em" }}
          >
            <span>{edition.toUpperCase()}</span>
            <span>✦ EST. 2015 ✦</span>
            <span>{today.toUpperCase()}</span>
          </div>
          <div className="text-center">
            <h1
              className="font-black leading-none"
              style={{
                fontSize: "clamp(1.7rem, 6vw, 4.0rem)",
                color: "#1a150e",
                textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              }}
            >
              {title}
            </h1>
          </div>
          <div
            className="flex items-center justify-between text-xs mt-1.5 px-1"
            style={{ color: "rgba(26,21,14,0.75)", letterSpacing: "0.1em" }}
          >
            <span>VOL. CLXXXII . . . No. 47,291</span>
            <span style={{ opacity: 0.4 }}>― ― ―</span>
            <span>
              PAGE {currentSpread + 1} OF {pages.length}
            </span>
          </div>
        </div>
        <div
          className="h-px mt-1"
          style={{ background: "rgba(200,168,75,0.2)" }}
        />
      </header>

      {/* ── Paper ── */}
      <div
        className="relative w-full max-w-5xl cursor-grab active:cursor-grabbing"
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
            boxShadow:
              "0 10px 60px rgba(0,0,0,0.7), 2px 0 0 rgba(0,0,0,0.2)",
          }}
        >
          {/* Backing sheet */}
          <div
            className="absolute inset-0"
            style={{ background: "#e2d9c4", zIndex: 0 }}
          />

          {pages.map((page, i) => (
            <Leaf
              key={i}
              page={page}
              index={i}
              currentSpread={currentSpread}
              isFlipping={animState === "flipping" && activeLeaf === i}
              flipDirection={flipDirection}
              activeLeaf={activeLeaf}
            />
          ))}

          {/* Left click zone */}
          <button
            onClick={() => flip("backward")}
            disabled={!canGoBackward || animState !== "idle"}
            onMouseEnter={() => setHoverZone("left")}
            onMouseLeave={() => setHoverZone(null)}
            className="absolute left-0 top-0 bottom-0 w-20 z-40 transition-all duration-200 disabled:cursor-default"
            style={{
              background:
                hoverZone === "left" && canGoBackward
                  ? "linear-gradient(to right, rgba(200,168,75,0.1), transparent)"
                  : "transparent",
              cursor: canGoBackward ? "w-resize" : "default",
            }}
            aria-label="Previous page"
          >
            {hoverZone === "left" && canGoBackward && (
              <div className="flex items-center justify-start pl-3 h-full">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  style={{ color: "rgba(200,168,75,0.6)" }}
                >
                  <path
                    d="M14 4L7 11L14 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
          </button>

          {/* Right click zone */}
          <button
            onClick={() => flip("forward")}
            disabled={!canGoForward || animState !== "idle"}
            onMouseEnter={() => setHoverZone("right")}
            onMouseLeave={() => setHoverZone(null)}
            className="absolute right-0 top-0 bottom-0 w-20 z-40 transition-all duration-200 disabled:cursor-default"
            style={{
              background:
                hoverZone === "right" && canGoForward
                  ? "linear-gradient(to left, rgba(200,168,75,0.1), transparent)"
                  : "transparent",
              cursor: canGoForward ? "e-resize" : "default",
            }}
            aria-label="Next page"
          >
            {hoverZone === "right" && canGoForward && (
              <div className="flex items-center justify-end pr-3 h-full">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  style={{ color: "rgba(200,168,75,0.6)" }}
                >
                  <path
                    d="M8 4L15 11L8 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
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
          className="flex items-center gap-1.5 text-xs tracking-widest uppercase disabled:opacity-20 transition-opacity"
          style={{ color: "#c8a84b", letterSpacing: "0.2em" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M8 2L3 6L8 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Prev
        </button>

        <div className="flex gap-1.5 items-center">
          {pages.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentSpread ? 18 : 5,
                height: 5,
                background:
                  i === currentSpread
                    ? "#c8a84b"
                    : "rgba(200,168,75,0.22)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => flip("forward")}
          disabled={!canGoForward || animState !== "idle"}
          className="flex items-center gap-1.5 text-xs tracking-widest uppercase disabled:opacity-20 transition-opacity"
          style={{ color: "#c8a84b", letterSpacing: "0.2em" }}
        >
          Next
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M4 2L9 6L4 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  NEWSPAPER STYLES & COMPONENTS
// ════════════════════════════════════════════════════════════
const paperBg = "#ffff";
const ink = "#1a150e";
const rule = "#2a2018";

const paperStyle: React.CSSProperties = {
  background: paperBg,
  width: "100%",
  minHeight: "100%",
  padding: "20px 24px",
  boxSizing: "border-box",
  color: ink,
  fontFamily: "'Times New Roman', Times, serif",
  fontSize: "13px",
  lineHeight: "1.5",
  position: "relative",
};

const HRule = ({ thick }: { thick?: boolean }) => (
  <div
    style={{
      borderTop: `${thick ? 2 : 1}px solid ${rule}`,
      margin: "5px 0",
      opacity: thick ? 1 : 0.35,
    }}
  />
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p
    style={{
      textAlign: "justify",
      hyphens: "auto",
      margin: "4px 0",
      fontSize: "12.5px",
      lineHeight: "1.55",
    }}
  >
    {children}
  </p>
);

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 9,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "#6b4c28",
      marginBottom: 2,
      fontWeight: 600,
    }}
  >
    {children}
  </div>
);

const Hed = ({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "xl" | "lg" | "md" | "sm";
}) => {
  const sizes = { xl: "1.85rem", lg: "1.45rem", md: "1.15rem", sm: "0.95rem" };
  return (
    <h2
      style={{
        fontSize: sizes[size],
        fontWeight: "bold",
        lineHeight: 1.1,
        margin: "3px 0 5px",
        color: ink,
      }}
    >
      {children}
    </h2>
  );
};

const Byline = ({
  name,
  location,
}: {
  name: string;
  location?: string;
}) => (
  <div
    style={{
      fontSize: 10,
      color: "#6b4c28",
      margin: "2px 0 5px",
      letterSpacing: "0.04em",
    }}
  >
    By <strong>{name}</strong>
    {location && <span style={{ fontStyle: "italic" }}> · {location}</span>}
  </div>
);

const Img = ({ label, h = 90 }: { label: string; h?: number }) => (
  <div
    style={{
      height: h,
      background: "linear-gradient(135deg, #d4c8a8, #bfb48a)",
      border: `1px solid rgba(0,0,0,0.15)`,
      marginBottom: 5,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span style={{ fontSize: 9, color: "#6b5438", letterSpacing: "0.1em", opacity: 0.8 }}>
      {label}
    </span>
  </div>
);

const Flag = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      background: rule,
      color: paperBg,
      display: "inline-block",
      padding: "1px 8px",
      fontSize: 9,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      marginBottom: 6,
    }}
  >
    {children}
  </div>
);

const Footer = ({ left, right }: { left: string; right: string }) => (
  <>
    <HRule thick />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 9,
        color: "#6b4c28",
        letterSpacing: "0.08em",
      }}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  </>
);

// ════════════════════════════════════════════════════════════
//  PAGE CONTENT
// ════════════════════════════════════════════════════════════
function FrontPage() {
  return (
    <div style={paperStyle}>
      <Flag>Featured Stories</Flag>
      <HRule thick />
      <Kicker>International Affairs</Kicker>
      <Hed size="lg">
        World Leaders Convene In Geneva For Historic Climate Summit
      </Hed>
      <HRule />
      <Byline name="Eleanor Whitmore" location="Geneva" />
      <Img label="PHOTOGRAPH — UNITED NATIONS PRESS POOL" h={90} />
      <Body>
        Representatives from one hundred and twelve nations gathered at the
        Palais des Nations, where delegates signed a landmark accord pledging
        binding emissions reductions by 2035. The agreement, described by
        Secretary-General Amara Diallo as &quot;the most consequential treaty of
        the century,&quot; comes after eighteen months of intensive negotiations.
      </Body>
      <Body>
        Under the accord, signatories must reduce carbon output by
        forty-five percent relative to 2010 levels. Wealthier economies will
        finance green transitions of developing nations through a new
        multilateral fund seeded at four hundred billion dollars.
      </Body>
      <HRule />
      <Kicker>Domestic Politics</Kicker>
      <Hed size="md">
        Senate Passes Infrastructure Bill After Late-Night Session
      </Hed>
      <Byline name="James R. Calloway" location="Washington" />
      <Body>
        The Senate voted 54–46 to approve a $1.2 trillion package directing
        new spending toward roads, broadband, and the power grid. The bill
        now advances to the House, where leadership pledged a vote within
        the fortnight.
      </Body>
      <HRule />
      <Kicker>Markets</Kicker>
      <Hed size="sm">Stocks Rise on Fed Pause Signal</Hed>
      <Body>
        Equity markets climbed broadly after Federal Reserve minutes
        signalled a pause in rate increases, with the S&P 500 gaining 1.3
        percent on the session.
      </Body>
      <Footer
        left="THE DAILY GUARDIAN"
        right="PAGE 1"
      />
    </div>
  );
}

function PageA2() {
  return (
    <div style={paperStyle}>
      <Flag>World News</Flag>
      <HRule thick />
      <Kicker>Diplomacy</Kicker>
      <Hed size="lg">
        Tensions Rise Along Northern Border As Diplomacy Stalls
      </Hed>
      <Byline name="Sofia Marchetti" location="Brussels" />
      <Img label="MAP — BORDER REGION" h={80} />
      <Body>
        Diplomatic efforts to defuse a months-long standoff appeared to
        falter on Wednesday as both sides rejected a proposed framework put
        forward by European Union mediators. Officials described the
        atmosphere as &quot;deeply pessimistic,&quot; with neither delegation willing
        to make the concessions needed to break the impasse.
      </Body>
      <Body>
        The dispute, rooted in competing claims over a river valley rich in
        agricultural land and water reserves, has displaced an estimated two
        hundred thousand people since the first skirmishes erupted in spring.
      </Body>
      <HRule />
      <Kicker>Economy</Kicker>
      <Hed size="md">
        Central Banks Coordinate on Digital Currency Standards
      </Hed>
      <Byline name="Thomas A. Henschel" />
      <Body>
        A consortium of twenty central banks published a joint technical
        framework establishing common standards for central bank digital
        currencies — a significant step toward cross-border interoperability.
      </Body>
      <HRule />
      <Kicker>Technology</Kicker>
      <Hed size="md">
        Antitrust Investigators Open Probe Into Platform Algorithms
      </Hed>
      <Body>
        Regulators in three jurisdictions announced a coordinated
        investigation into whether dominant social-media platforms
        manipulate feeds to favour proprietary content over rivals.
      </Body>
      <Footer left="THE DAILY GUARDIAN" right="PAGE 2" />
    </div>
  );
}

function PageB1() {
  return (
    <div style={paperStyle}>
      <Flag>Business</Flag>
      <HRule thick />
      <Kicker>Corporate News</Kicker>
      <Hed size="lg">
        Merger Creates World&apos;s Largest Renewable Energy Consortium
      </Hed>
      <Byline name="Priya Nair" location="London" />
      <Img label="FILE PHOTOGRAPH — WIND FARM, NORTH SEA" h={80} />
      <Body>
        Two of Europe&apos;s largest energy companies announced a merger that
        will create a combined entity with generating capacity exceeding
        eighty gigawatts — enough to power more than fifty million homes.
        The all-stock deal, valued at €47 billion, is subject to regulatory
        approval in the EU and United Kingdom.
      </Body>
      <Body>
        Executives positioned the consolidation as a response to mounting
        capital requirements in offshore wind and green hydrogen, sectors
        where scale increasingly determines viability.
      </Body>
      <HRule />
      <Kicker>Real Estate</Kicker>
      <Hed size="md">
        City Housing Starts Fall for Third Consecutive Quarter
      </Hed>
      <Body>
        New construction permits fell 8.4 percent in the last quarter, the
        third consecutive quarterly decline, data published by the planning
        authority showed.
      </Body>
      <HRule />
      <Kicker>Markets</Kicker>
      <div style={{ fontSize: 11 }}>
        <strong>GOLD</strong> $2,418/oz ▲ &nbsp;
        <strong>OIL</strong> $83.2/bbl ▼ &nbsp;
        <strong>WHEAT</strong> $5.88/bu ▲
      </div>
      <Footer left="THE DAILY GUARDIAN" right="PAGE 3" />
    </div>
  );
}

function PageC1() {
  return (
    <div style={paperStyle}>
      <Flag>Science & Technology</Flag>
      <HRule thick />
      <Kicker>Space Exploration</Kicker>
      <Hed size="lg">
        Mars Mission Achieves Orbit Insertion After Seven-Month Journey
      </Hed>
      <Byline name="Dr. Claire Osei" location="Houston" />
      <Img label="MISSION CONTROL — NASA/JPL" h={80} />
      <Body>
        A joint mission from three space agencies successfully entered
        Martian orbit early Friday, completing a 480 million-kilometre
        journey. Scientists described the orbital insertion as &quot;flawless,&quot;
        setting the stage for a landing attempt next month.
      </Body>
      <HRule />
      <Kicker>Medicine</Kicker>
      <Hed size="md">Trial Shows Promise for Universal Flu Vaccine</Hed>
      <Byline name="Dr. Haruto Takano" />
      <Body>
        Phase II trial results published in The Lancet suggest a novel
        influenza vaccine targeting conserved viral proteins protected 91
        percent of recipients across six distinct influenza strains.
      </Body>
      <HRule />
      <Kicker>Computing</Kicker>
      <Hed size="md">
        Quantum Processor Sets Record for Error Correction
      </Hed>
      <Byline name="Lena Bauer" />
      <Body>
        A 127-qubit processor achieved logical error rates below one in ten
        thousand — a threshold widely regarded as necessary for
        fault-tolerant quantum computation.
      </Body>
      <Footer
        left="THE DAILY GUARDIAN"
        right="PAGE 4"
      />
    </div>
  );
}

function PageD1() {
  return (
    <div style={paperStyle}>
      <Flag>Opinion & Analysis</Flag>
      <HRule thick />
      <Kicker>Editorial</Kicker>
      <Hed size="lg">
        The Hollow Promise of Summitry Without Enforcement
      </Hed>
      <div
        style={{
          fontSize: 10,
          color: "#6b4c28",
          marginBottom: 6,
          fontStyle: "italic",
        }}
      >
        The Editors
      </div>
      <Body>
        The signatories to yesterday&apos;s Geneva accord deserve credit for
        their willingness to convene, negotiate, and ultimately sign. The
        gathering was genuinely historic. But history treats signed
        documents harshly when accountability mechanisms are absent — and
        the text released from Geneva is conspicuously silent on what
        happens when parties fall short of their commitments.
      </Body>
      <Body>
        This newspaper has long argued that ambition without architecture is
        not diplomacy but performance. The targets enshrined in the accord
        are exactly right; the timeline is bold; the financing commitment, if
        honoured, would be transformative. Yet none of this amounts to a
        functioning system unless agreed consequences exist for
        non-compliance.
      </Body>
      <HRule />
      <Kicker>Commentary</Kicker>
      <Hed size="md">
        Why Cities Will Determine the Climate Outcome
      </Hed>
      <div
        style={{
          fontSize: 10,
          color: "#6b4c28",
          fontStyle: "italic",
          marginBottom: 4,
        }}
      >
        By Prof. Amelia Zhang, Urban Policy Institute
      </div>
      <Body>
        Nation-states sign treaties; cities build infrastructure. The gap
        between those two facts explains much of the implementation failure
        in previous accords. More than half the world&apos;s population lives in
        urban areas, and cities account for roughly 70 percent of global
        emissions.
      </Body>
      <Footer
        left="THE DAILY GUARDIAN"
        right="PAGE 5"
      />
    </div>
  );
}

function BackCover() {
  return (
    <div
      style={{
        ...paperStyle,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{ fontSize: 9, letterSpacing: "0.22em", color: "#6b4c28" }}
      >
        THE DAILY GUARDIAN
      </div>
      <div
        style={{ fontSize: "2.2rem", fontWeight: "bold", color: ink }}
      >
        EST. 1842
      </div>
      <div
        style={{
          width: 60,
          height: 1,
          background: rule,
          opacity: 0.3,
          margin: "4px 0",
        }}
      />
      <div
        style={{
          fontSize: 11,
          color: "#6b4c28",
          fontStyle: "italic",
          textAlign: "center",
          maxWidth: 280,
          lineHeight: 1.6,
        }}
      >
        &quot;To give the news impartially, without fear or favour,
        <br />
        regardless of any party, sect or interest involved.&quot;
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  EXPORTED PAGE
// ════════════════════════════════════════════════════════════
export default function NewspaperPage() {
  const pages: NewsPage[] = [
    { front: <FrontPage />, back: <PageA2 /> },
    { front: <PageB1 />, back: <PageC1 /> },
    { front: <PageD1 />, back: <BackCover /> },
  ];

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <FlippingBook
        pages={pages}
        title="THE DAILY GUARDIAN"
        edition=""
      />
    </main>
  );
}