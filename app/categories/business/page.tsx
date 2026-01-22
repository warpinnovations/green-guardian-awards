"use client";

import Image from "next/image";
import Background from "../../../public/GreenBG.png";
import Header from "@/app/components/Header";

export default function BusinessCategory() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <Header />
      <div className="absolute inset-0 z-0">
        <Image
          src={Background}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 mt-10">
        <p className="font-alviona pt-10 font-semibold text-[#eefaf5] leading-tight text-5xl text-center">
          ELIGIBILITY & REQUIREMENTS
        </p>
        <p className="text-center font-bold mt-2">
          For Business and Large Corporations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* LEFT column */}
          <div className="bg-white/10 rounded-xl p-5">
            <p className="font-bold text-xl mb-5 tracking-wide">ELIGIBILITY CRITERIA</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Must be a legally registered business operating in the Province/City of Iloilo.</li>
              <li>Must have been in operation for at least two (2) years.</li>
              <li>Business must be compliant with relevant environmental laws and regulations, with no major unresolved violations.</li>
            </ul>
          </div>

          {/* RIGHT column */}
          <div className="bg-white/10 rounded-xl p-5">
            <p className="font-bold text-xl mb-5 tracking-wide">MINIMUM REQUIREMENTS</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Completed nomination form signed by an authorized company representative.</li>
              <li>Business profile, including nature of business, years of operation, and scale (MSME or large enterprise).</li>
              <li>Description of the sustainability initiative, including objectives, implementation approach, and duration.</li>
              <li>
                Supporting documents, such as:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Sustainability or CSR reports</li>
                  <li>Internal Policies, certifications, or audit summaries (if available)</li>
                  <li>Photos, videos, or media features of the initiative</li>
                </ul>
              </li>
              <li>
                Proof of impact, where applicable:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Resource savings or waste reduction data</li>
                  <li>Number of communities engaged</li>
                  <li>Community or partner endorsements, if the initiative involves external stakeholders</li>
                </ul>
              </li>
              <li>Designated contact person for validation, interviews, or site visits.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
