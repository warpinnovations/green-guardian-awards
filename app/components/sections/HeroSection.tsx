"use client";

import Image from "next/image";
import Logo from "../../../public/logos/Trophy.png";
import Background from "../../../public/HeroSectionBg.png";

export default function HeroSection() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative overflow-hidden min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src={Background} alt="" fill priority className="object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-2 md:pt-24 md:pb-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left text */}
          <div className="max-w-xl">
            <h1 className="font-alviona text-[42px] leading-[1.05] sm:text-5xl md:text-6xl font-semibold text-emerald-950">
              Green Guardian Awards
            </h1>

            <p className="font-awards-body font-semibold text-emerald-950 mt-3 text-md">
              Celebrating Sustainability and Ecological Innovation in Iloilo
            </p>

            <p className="mt-4 text-base leading-relaxed text-neutral-700">
              For 25 years, Daily Guardian has told the stories that shape communities. Now, we recognize
              the ones protecting them.
            </p>

            <p className="mt-4 text-base leading-relaxed text-neutral-700">
              The Green Guardian Awards honors <b>LGUs and businesses</b> advancing{" "}
              <b>environmental stewardship </b>- through initiatives that are measurable, community-driven,
              and built to last beyond headlines.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToId("nominate")}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#0A2724] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-md"
              >
                Join the Awards
              </button>

              <button
                type="button"
                onClick={() => scrollToId("primer")}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-neutral-50 transition shadow-sm"
              >
                Download Primer
              </button>
            </div>

            <p className="mt-4 text-xs text-neutral-600">
              Need help?{" "}
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="font-semibold text-emerald-900 hover:underline"
              >
                Contact the committee
              </button>
              .
            </p>
          </div>

          {/* RIGHT trophy (desktop) */}
          <div className="relative hidden md:flex items-center justify-end">
            <div className="relative h-[65vh] max-h-[620px] w-[34vw] max-w-[440px]">
              <Image
                src={Logo}
                alt="Green Guardian Awards Trophy"
                fill
                priority
                sizes="(min-width: 768px) 42vw, 100vw"
                className="object-contain object-right drop-shadow-[0_18px_40px_rgba(10,39,36,0.22)]"
              />
            </div>
          </div>
        </div>

        {/* Trophy for mobile (CENTERED + smaller) */}
        <div className="md:hidden mt-10 flex justify-center">
          <div className="relative w-[240px] sm:w-[280px] aspect-[3/4]">
            <Image
              src={Logo}
              alt="Green Guardian Awards Trophy"
              fill
              priority
              sizes="(max-width: 640px) 240px, 280px"
              className="object-contain object-center drop-shadow-[0_18px_40px_rgba(10,39,36,0.22)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
