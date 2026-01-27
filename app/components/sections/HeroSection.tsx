"use client";

import Image from "next/image";
import DGLogo from "../../../public/logos/dg-logo-black.png";

export default function HeroSection() {
     const scrollToId = (id: string) => {
       const el = document.getElementById(id);
       if (!el) return;
       el.scrollIntoView({ behavior: "smooth", block: "start" });
     };

   return (
      <div className="min-h-screen bg-slate-100 text-white relative overflow-hidden">
         <div className="fixed inset-0 bg-gradient-radial " />
         {/* Navigation */}
         <nav className="relative z-50 px-6 lg:px-20 py-6">
            <div className="max-w-400 mx-auto flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <Image
                     src={DGLogo}
                     alt="Daily Guardian"
                     width={250}
                     height={150}
                     className="mb-2 mt-2 object-contain lg:w-62.5 w-58 invert"
                  />
               </div>
               <div className="flex gap-4">
                  <button className="px-8 py-3 rounded-xl border-2 border-[#f3d107]/90 text-[#f3d107]/90 hover:bg-[#8FC73F]/10 transition-all duration-300 font-bold hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8FC73F]/30 cursor-pointer">
                     Download Primer
                  </button>
                  <button onClick={() => scrollToId("nominate")} className="text-neutral-900/90 px-8 py-3 rounded-xl bg-linear-to-r from-[#8FC73F] to-[#b5d443] hover:shadow-xl hover:shadow-[#b5d443]/50 transition-all duration-300 font-bold hover:-translate-y-1 cursor-pointer">
                     Enter Now!
                  </button>
               </div>
            </div>
         </nav>
         {/* Hero Section */}
         <div className="relative z-10 max-w-400 mx-auto px-6 lg:px-20">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
               <div className="space-y-4">
                  <h1 className="text-3xl lg:text-[60px] font-black leading-none mb-5 tracking-tighter animate-fade-in-up">
                     <span className="font-alviona block bg-white/90 bg-clip-text text-transparent">
                        GREEN GUARDIAN
                     </span>
                     <span className="font-alviona block bg-linear-to-r from-[#f3d107]/90 to-[#f3d107]/90 bg-clip-text text-transparent">
                        AWARDS
                     </span>
                  </h1>
                  <h2
                     className="text-2xl font-semibold text-white animate-fade-in-up"
                     style={{ animationDelay: "0.2s" }}
                  >
                     Celebrating Sustainability and Ecological Innovation in
                     Iloilo
                  </h2>
                  <p
                     className="text-lg text-white leading-relaxed animate-fade-in-up mt-8 mb-5"
                     style={{ animationDelay: "0.4s" }}
                  >
                     For 25 years, Daily Guardian has told the stories that
                     shape communities. Now, we recognize the ones protecting
                     them.
                  </p>
                  <div
                     className="animate-fade-in-up"
                     style={{ animationDelay: "0.8s" }}
                  >
                     <p className="text-lg leading-relaxed text-white/90">
                        The Green Guardian Awards honors{" "}
                        <span className="text-[#f3d107] font-bold">
                           local government units, MSMEs, and large corporations
                        </span>{" "}
                        advancing{" "}
                        <span className="text-[#f3d107] font-bold">
                           environmental stewardship
                        </span>{" "}
                        through initiatives that are measurable,
                        community-driven, and built to last beyond headlines.
                     </p>
                  </div>
                  {/* CTA Buttons */}
                  <div
                     className="flex flex-col sm:flex-row gap-6 animate-fade-in-up mt-10"
                     style={{ animationDelay: "1s" }}
                  >
                     <button className="cursor-pointer px-10 py-3 rounded-2xl bg-linear-to-r from-[#f3d107]/90 to-amber-400/90 text-neutral-900/90 hover:shadow-xl hover:shadow-amber-400/50 transition-all duration-300 font-bold text-xl hover:-translate-y-1">
                        Join the Awards
                     </button>
                     <button className="cursor-pointer px-10 py-3 rounded-2xl border-2 border-white text-white hover:bg-[#8FC73F]/10 transition-all duration-300 font-bold text-xl hover:-translate-y-1">
                        Download Primer
                     </button>
                  </div>

                  <p
                     className="text-white/90 animate-fade-in-up"
                     style={{ animationDelay: "1.2s" }}
                  >
                     Need help?{" "}
                     <a
                        href="#"
                        className="text-white/90 font-bold hover:underline"
                     >
                        Contact the committee
                     </a>
                  </p>
               </div>
               {/* Trophy */}
               <div
                  className="relative h-150 flex items-center justify-center animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
               >
                  {/* <video
                     src="/green-guardian-logo.mp4"
                     autoPlay
                     loop
                     muted
                     playsInline
                     className="w-96 h-96 object-contain"
                  /> */}
               </div>
            </div>
         </div>

         <style jsx>{`
            @keyframes grid-move {
               0% {
                  transform: translate(0, 0);
               }
               100% {
                  transform: translate(50px, 50px);
               }
            }

            @keyframes float-trophy {
               0%,
               100% {
                  transform: translateY(0);
               }
               50% {
                  transform: translateY(-15px);
               }
            }

            @keyframes float-particle {
               0%,
               100% {
                  transform: translateY(0);
                  opacity: 0;
               }
               50% {
                  transform: translateY(-50px);
                  opacity: 1;
               }
            }

            @keyframes pulse-slow {
               0%,
               100% {
                  transform: scale(1);
                  opacity: 0.5;
               }
               50% {
                  transform: scale(1.2);
                  opacity: 0.8;
               }
            }

            @keyframes fade-in-up {
               from {
                  opacity: 0;
                  transform: translateY(40px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }

            @keyframes fade-in-down {
               from {
                  opacity: 0;
                  transform: translateY(-20px);
               }
               to {
                  opacity: 1;
                  transform: translateY(0);
               }
            }

            @keyframes fade-in {
               from {
                  opacity: 0;
               }
               to {
                  opacity: 1;
               }
            }

            .animate-grid-move {
               animation: grid-move 20s linear infinite;
            }

            .animate-float-trophy {
               animation: float-trophy 4s ease-in-out infinite;
            }

            .animate-float-particle {
               animation: float-particle 8s ease-in-out infinite;
            }

            .animate-pulse-slow {
               animation: pulse-slow 3s ease-in-out infinite;
            }

            .animate-fade-in-up {
               animation: fade-in-up 0.8s ease-out backwards;
            }

            .animate-fade-in-down {
               animation: fade-in-down 0.6s ease-out;
            }

            .animate-fade-in {
               animation: fade-in 1s ease-out backwards;
            }

            .bg-gradient-radial {
               background: radial-gradient(
                  ellipse at bottom left,
                  #8fc73f 0%,
                  #1f5238 60%
               );
            }
         `}</style>
      </div>
   );
}
