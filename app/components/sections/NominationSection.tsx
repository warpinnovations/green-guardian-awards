"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { NominationCard } from "../cards/NominationCard";

export default function NominationSection() {
   const router = useRouter();

   const handleOnCardClick = (key: string) => {
      router.push(`/submission?nominee=${key}`);
   };

   return (
      <section id="nominate" className="min-h-screen relative overflow-hidden pb-28">
         <div className="absolute top-50 -left-240 z-0">
            <Image
               src={"/leaf.png"}
               alt=""
               width={1800}
               height={1800}
               priority
               unoptimized
               className="object-cover rotate-180 opacity-15"
            />
         </div>
         <div className="absolute -top-60 -right-235 z-0">
            <Image
               src={"/leaf.png"}
               alt=""
               width={1700}
               height={1700}
               priority
               unoptimized
               className="object-cover opacity-10"
            />
         </div>
         <div className="flex flex-col min-h-screen lg:max-w-6xl lg:px-0 px-4 mx-auto items-center justify-center">
            <div className="text-center mb-10">
               <h2 className="font-alviona lg:text-[55px] text-4xl font-sans text-white lg:py-8 pt-14">
                  Nominate a Green Guardian
               </h2>
            </div>
            <div className="mb-16 z-10">
               <div className="flex lg:flex-row flex-col lg:gap-x-12 gap-y-8">
                  {categories.map((award) => (
                     <NominationCard
                        key={award.id}
                        title={award.title}
                        type={award.id}
                        imgSrc={`/${award.id}.png`}
                        onClick={() => handleOnCardClick(award.id)}
                     ></NominationCard>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

const categories = [
   {
      id: "lgu",
      title: "Local Government Units",
   },
   {
      id: "msme",
      title: "MSMEs and Large Corporations",
   },
];
