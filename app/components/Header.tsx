"use client";

import Image from "next/image";
import ColoredLogo from "@/public/logos/asset-colored.png";
import DGLogo from "@/public/logos/dg-logo-black.png";

import Link from "next/link";

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
     <header className="fixed top-0 left-0 right-0 z-50  bg-[#0A2724] backdrop-blur-md border-b-8 border-[#D4AF37]">
        <div className="mx-auto max-w-7xl px-3">
           <div className="flex h-20 items-center justify-between">
              <Link href={"/"} className="cursor-pointer">
                 <Image
                    src={DGLogo}
                    alt="Daily Guardian"
                    width={180}
                    height={100}
                    className="mb-2 mt-2 object-contain lg:w-56 w-38 invert"
                 />
              </Link>
              <Link href={"/"}>
                 <div className="flex items-center gap-3">
                    <Image
                       src={ColoredLogo}
                       alt="Green Guardian Awards"
                       className="lg:h-10 h-8 w-auto object-contain"
                       height={40}
                       priority
                    />
                    <p className="font-alviona lg:text-xl text-[15px] font-semibold text-[#eefaf5] leading-tight">
                       Green Guardian Awards
                    </p>
                 </div>
              </Link>

              {/* CTA BUTTONS */}
              {showCTA && (
                 <div className="flex items-center gap-3">
                    <button
                       type="button"
                       onClick={() => scrollToId("primer")}
                       className="
                cursor-pointer
                hidden sm:inline-flex
                rounded-full border border-neutral-300
                px-4 py-2 text-sm font-medium
                hover:bg-neutral-50 hover:text-black/70  transition text-white
              "
                    >
                       Download Primer
                    </button>

                    <button
                       type="button"
                       onClick={() => scrollToId("nominate")}
                       className="
                cursor-pointer
                inline-flex rounded-full
                bg-[#0A2724] text-white
                px-4 py-2 text-sm font-semibold
                transition-transform duration-300 ease-out
                hover:scale-110
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
