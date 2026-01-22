"use client";

import Image from "next/image";
import Background from "../../../public/GreenBG.png";
import Header from "@/app/components/Header";

export default function LGUCategory() {
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
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 mt-10">
        <p className="font-alviona font-semibold text-[#eefaf5] leading-tight text-5xl text-center">
          ELIGIBILITY & REQUIREMENTS
        </p>
        <p className="font-bold text-center mt-2">For Local Government Units</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 mt-10">
          {/* LEFT column */}
          <div className="bg-white/10 rounded-xl p-5">
            <p className="font-bold text-xl mb-5 tracking-wide">
              ELIGIBILITY CRITERIA
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Must be a duly constituted LGU or barangay within the Province/City of Iloilo.</li>
              <li>Must have at least one implemented environmental or sustainability initiative aligned with the award category being applied for.</li>
              <li>The project or program must have been implemented for a minimum of six (6) months prior to nomination.</li>
              <li>The initiative must be currently active or institutionalized, not a one-time or discontinued activity.</li>
              <li>LGU must be in good standing with relevant national agencies (e.g., DENR, DILG), with no major unresolved environmental violations.</li>
            </ul>
          </div>

          {/* RIGHT column */}
          <div className="bg-white/10 rounded-xl p-5">
            <p className="font-bold text-xl mb-5 tracking-wide">MINIMUM REQUIREMENTS</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Completed nomination form endorsed by the LGU head or authorized representative.</li>
              <li>Must have at least one implemented environmental or sustainability initiative aligned with the award category being applied for.</li>
              <li>Project description outlining objectives, implementation strategy, timeline, and outcomes.</li>
              <li>
                Proof of implementation, such as:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Ordinances, Executive Orders, or Resolutions (if applicable)</li>
                  <li>Program Reports or Monitoring Data</li>
                  <li>Photographs or Videos of On-ground Activities</li>
                  <li>Evidence of Community Involvement (MOUs, participation records)</li>
                  <li>Testimonials or Certifications from Beneficiaries</li>
                </ul>
              </li>
              <li>Contact details of a focal person for validation and possible site inspection.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
