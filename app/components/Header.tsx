"use client";

import Image from "next/image";
import ColoredLogo from "@/public/logos/asset-colored.png";

interface HeaderProps {
  showCTA?: boolean;
}

export default function Header({ showCTA = true }: HeaderProps) {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50  bg-[#0A2724] backdrop-blur-md border-b-8 border-[#D4AF37]">
    
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
          <Image
            src={ColoredLogo}
            alt="Green Guardian Awards"
            className="h-10 w-auto object-contain"
            height={40}
            priority
          />
            <p className="font-alviona text-xl font-semibold text-[#eefaf5] leading-tight"            >
              Green Guardian Awards</p>
          </div>

          {/* CTA BUTTONS */}
          {showCTA && (
            <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("primer")}
              className="
                hidden sm:inline-flex
                rounded-full border border-neutral-300
                px-4 py-2 text-sm font-medium
                hover:bg-neutral-50 transition
              "
            >
              Download Primer
            </button>

            <button
              type="button"
              onClick={() => scrollToId("nominate")}
              className="
                inline-flex rounded-full
                bg-[#0A2724] text-white
                px-4 py-2 text-sm font-semibold
                hover:opacity-90 transition
              "
            >
              Enter now!
            </button>
          </div>
          )}
        </div>     
      </div>
    </header>
  );
}
