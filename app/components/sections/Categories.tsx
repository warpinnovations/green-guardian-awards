"use client";

import Image from "next/image";
import Background from "../../../public/YellowGreenBG.png";
import ChampionTrophy from "../../../public/trophies/sustainability-champion.png";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={Background}
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-10 ">

          {/* LEFT column */}
          <Link href="/categories/lgu">
            <div className="flex flex-col items-center cursor-pointer">
              <div className="relative h-[300px] md:h-[450px] w-full">
                <Image
                  src={ChampionTrophy}
                  alt="Sustainability Champion"
                  fill
                  priority
                  className="object-contain transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.9)]"
                />
              </div>
              <p className="mt-4 text-center text-lg md:text-xl font-semibold text-white tracking-wide">
                LGUs
              </p>

            </div>
          </Link>


          {/* RIGHT column */}
          <Link href="/categories/business">
            <div className="flex flex-col items-center cursor-pointer">
              <div className="relative h-[300px] md:h-[450px] w-full">
                <Image
                  src={ChampionTrophy}
                  alt="Sustainability Champion"
                  fill
                  priority
                  className="object-contain transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.9)]"
                />
              </div>
              <p className="mt-4 text-center text-lg md:text-xl font-semibold text-white tracking-wide">
                Businesses
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
