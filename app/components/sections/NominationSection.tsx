"use client";

import { useRouter } from "next/navigation";
import { NominationCard } from "../cards/NominationCard";

export default function NominationSection() {
   const router = useRouter();

   const handleOnCardClick = (key: string) => {
      router.push(`/submission?nominee=${key}`);
   };

   return (
      <section
         className="px-6 py-16 min-h-screen
    bg-[radial-gradient(circle_at_top_center,rgba(170,190,60,0.9),rgba(40,120,60,0.9)_30%,rgba(0,0,0,1)_85%),linear-gradient(135deg,#0a0a0a,#0f3d1f,#1a7f3a)]"
      >
         <div className="flex flex-col min-h-screen max-w-4xl mx-auto items-center justify-center">
            <div className="text-center mb-10">
               <h2 className="font-alviona lg:text-5xl text-4xl font-sans text-white lg:py-8 py-3">
                  Nominate a Green Guardian
               </h2>
            </div>
            <div className="mb-16">
               <div className="grid md:grid-cols-2 gap-12">
                  {categories.map((award, index) => (
                     <div key={index}>
                        <NominationCard
                           description={award.description}
                           title={award.title}
                           imgSrc={`/${award.key}.png`}
                           onClick={() => handleOnCardClick(award.key)}
                        ></NominationCard>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

const categories = [
   {
      key: "msme",
      title: "MSMEs / Large Corporations",
      description:
         "Eligible nominees include MSMEs (micro, small, and medium enterprises) and large corporations",
   },
   {
      key: "lgu",
      title: "Local Government Units (LGUs)",
      description:
         "Eligible nominees include LGUs (municipalities, component cities, and highly urbanized cities)",
   },
];
