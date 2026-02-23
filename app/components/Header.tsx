"use client";

import Image from "next/image";
import Link from "next/link";
import ColoredLogo from "@/public/logos/asset-colored.png";
import DGLogo from "@/public/logos/dg-logo-black.png";

interface HeaderProps {
   variant?: "full" | "minimal";
}

export default function Header({ variant = "full" }: HeaderProps) {
   const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({
         behavior: "smooth",
         block: "start",
      });
   };

   return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A2724] border-b-8 border-[#D4AF37]">
         <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-20 items-center justify-between">

               {/* LEFT — DG LOGO */}
               <Link href="/" className="cursor-pointer">
                  <Image
                     src={DGLogo}
                     alt="Daily Guardian"
                     width={180}
                     height={100}
                     className="object-contain invert"
                  />
               </Link>

               {/* RIGHT — GREEN GUARDIAN */}
               <Link href="/" className="flex items-center gap-3">
                  <Image
                     src={ColoredLogo}
                     alt="Green Guardian Awards"
                     className="h-8 lg:h-10 w-auto object-contain"
                     height={40}
                     priority
                  />
                  <p className="font-alviona lg:text-xl text-[15px] font-semibold text-[#eefaf5] leading-tight">
                     Green Guardian Awards
                  </p>
               </Link>

               {/* CTA BUTTONS (only in full mode) */}
               {variant === "full" && (
                  <div className="flex items-center gap-3">
                     <button
                        type="button"
                        onClick={() => scrollToId("primer")}
                        className="hidden sm:inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-50 hover:text-black transition"
                     >
                        Download Primer
                     </button>

                     <button
                        type="button"
                        onClick={() => scrollToId("nominate")}
                        className="inline-flex rounded-full bg-[#D4AF37] text-[#0A2724] px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
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