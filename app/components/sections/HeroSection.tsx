"use client";

import Image from "next/image";
import Logo from "../../../public/logos/Trophy.png";
import Background from "../../../public/HeroSectionBg.png";
import DGLogo from "../../../public/logos/dg-logo-black.png";
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
        <Image src={Background} alt="Hero Section Background" fill priority className="object-cover" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-2 md:pt-24 md:pb-20 py-5">
        <div className="grid items-center lg:gap-10 gap-6 md:grid-cols-2">
          {/* Left text */}
          <div className="max-w-xl">
            <Image
              src={DGLogo}
              alt="Daily Guardian"
              width={250}
              height={150}
              className="mb-2 mt-2 object-contain lg:w-62.5 w-58"
            />

            <h1 className="font-alviona text-[28px] leading-[1.05] sm:text-5xl md:text-6xl font-semibold text-emerald-950">
              Green Guardian Awards
            </h1>

            <p className="font-awards-body font-bold text-emerald-950 lg:mt-3 mt-4 lg:text-lg text-md ">
              Celebrating Sustainability and Ecological Innovation in Iloilo
            </p>

            <p className="mt-4 lg:text-base text-md leading-relaxed text-neutral-700">
              For 25 years, Daily Guardian has told the stories that shape communities. Now, we recognize
              the ones protecting them.
            </p>

            <p className="mt-4 lg:text-base text-md leading-relaxed text-neutral-700">
              The Green Guardian Awards honors <b>Local government units, MSMEs, and large corporations</b> advancing{" "}
              <b>environmental stewardship </b>- through initiatives that are measurable, community-driven,
              and built to last beyond headlines.
            </p>

            <div className="lg:mt-7 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToId("nominate")}
                className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#1d4b36] px-6 py-3 text-sm font-semibold text-white hover:opacity-85 transition shadow-md"
              >
                Join the Awards
              </button>

              <button
                type="button"
                onClick={() => scrollToId("primer")}
                className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-emerald-950 hover:bg-neutral-50 transition shadow-sm"
              >
                Download Primer
              </button>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              Need help?{" "}
            <a
              href="mailto:dailyguardianmarketing@gmail.com?subject=Green%20Guardian%20Awards%20Inquiry"
              className="font-semibold text-emerald-900 hover:underline cursor-pointer"
            >
              Contact the committee
            </a>
              .
            </p>
          </div>

          {/* RIGHT trophy (desktop) */}
          <div className="relative hidden md:flex items-center justify-end">
            <div className="relative h-[65vh] max-h-155 w-[34vw] max-w-110">
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
          <div className="relative w-60 sm:w-70 aspect-3/4">
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
