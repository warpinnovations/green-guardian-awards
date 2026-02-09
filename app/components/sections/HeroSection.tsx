"use client";

import Image from "next/image";
import DGLogo from "../../../public/logos/dg-logo-black.png";

export default function HeroSection() {
   const primer = "Green Guardian Awards Primer.pdf";

   const scrollToId = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
   };

   return (
      <div className="min-h-screen bg-slate-100 text-white relative overflow-hidden">
         <div className="fixed inset-0 bg-gradient-radial " />
         {/* Navigation */}
         <nav className="relative z-50 px-4 lg:px-20 py-4">
            <div className="max-w-400 mx-auto flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <Image
                     src={DGLogo}
                     alt="Daily Guardian"
                     width={250}
                     height={150}
                     className="mb-2 mt-2 object-contain lg:w-62.5 w-48 invert"
                  />
               </div>
               <div className="lg:flex hidden gap-4">
                  <a
                     href={`/api/download/${encodeURIComponent(primer)}`}
                     className="text-center px-8 py-3 rounded-xl border-2 border-[#f3d107]/90 text-[#f3d107]/90 hover:bg-[#8FC73F]/10 transition-all duration-300 font-bold hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8FC73F]/30 cursor-pointer"
                  >
                     Download Primer
                  </a>
                  <button
                     onClick={() => scrollToId("nominate")}
                     className="text-neutral-900/90 lg:px-8 px-3 py-3 rounded-xl bg-linear-to-r from-[#8FC73F] to-[#b5d443] lg:text-base text-sm hover:shadow-xl hover:shadow-[#b5d443]/50 transition-all duration-300 font-bold hover:-translate-y-1 cursor-pointer"
                  >
                     Enter Now!
                  </button>
               </div>
            </div>
         </nav>
         {/* Hero Section */}
         <div className="relative max-w-400 mx-auto px-5 lg:px-20">
            <div className="grid lg:grid-cols-[1.5fr_1fr] lg:gap-12 gap-20 items-start">
               <div className="lg:space-y-3 space-y-4">
                  <h1 className="text-[40px] lg:text-[60px] font-black leading-none lg:mb-3 tracking-tighter animate-fade-in-up">
                     <span className="font-alviona block bg-white/90 bg-clip-text text-transparent text-left">
                        GREEN GUARDIAN
                     </span>
                     <span className="font-alviona block bg-linear-to-r from-[#f3d107]/90 to-[#f3d107]/90 bg-clip-text text-transparent text-left">
                        AWARDS
                     </span>
                  </h1>
                  <h2
                     className="lg:text-2xl text-[20px] font-semibold text-white animate-fade-in-up text-left mb-4"
                     style={{ animationDelay: "0.2s" }}
                  >
                     Celebrating Sustainability and Ecological Innovation in
                     Iloilo
                  </h2>
                  <p
                     className="lg:text-lg text-[16px] text-white leading-relaxed animate-fade-in-up my-4 text-left"
                     style={{ animationDelay: "0.4s" }}
                  >
                     The Green Guardian Awards celebrates and elevates outstanding environmental initiatives across the Province of Iloilo.
                  </p>
                  <div
                     className="animate-fade-in-up"
                     style={{ animationDelay: "0.8s" }}
                  >
                     <p className="lg:text-lg text-[16px] leading-relaxed text-white/90 text-left">
                        It recognizes <strong className="text-[#f3d107]">Local Government Units (LGUs)</strong>—including municipalities, the highly urbanized city (HUC), and the component city—as well as <strong className="text-[#f3d107]">micro, small, and medium enterprises (MSMEs) and large corporations</strong> that champion sustainability, ecological innovation, and community-driven environmental action.{" "}
                     </p>
                     <p className="lg:text-lg text-[16px] leading-relaxed text-white/90 text-left mt-4">
                        Through this program, the Awards aim to foster a strong culture of environmental stewardship by honoring exemplary initiatives, showcasing best practices, and inspiring wider adoption of sustainable solutions throughout Iloilo.
                     </p>
                  </div>
                  {/* CTA Buttons */}
                  <div
                     className="flex flex-col sm:flex-row gap-6 animate-fade-in-up mt-6"
                     style={{ animationDelay: "1s" }}
                  >
                     <button
                        onClick={() => scrollToId("nominate")}
                        className="cursor-pointer px-10 py-3 rounded-2xl bg-linear-to-r from-[#f3d107]/90 to-amber-400/90 text-neutral-900/90 hover:shadow-xl hover:shadow-amber-400/50 transition-all duration-300 font-bold text-xl hover:-translate-y-1"
                     >
                        Join the Awards
                     </button>
                     <a
                        href={`/api/download/${encodeURIComponent(primer)}`}
                        className="text-center cursor-pointer px-10 py-3 rounded-2xl border-2 border-white text-white hover:bg-[#8FC73F]/10 transition-all duration-300 font-bold text-xl hover:-translate-y-1"
                     >
                        Download Primer
                     </a>
                  </div>

                  <p className="text-white/90 text-sm leading-relaxed text-center lg:text-left animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
                     Need help? Contact committee:
                     <br className="sm:hidden" />
                     <a
                        href="mailto:dailyguardianmarketing@gmail.com"
                        className="font-semibold break-all hover:underline"
                     >
                        dailyguardianmarketing@gmail.com
                     </a>
                     <span className="hidden sm:inline"> | </span>
                     <br className="sm:hidden" />
                     <a href="tel:+639171371799" className="font-semibold hover:underline">
                        +63&nbsp;917&nbsp;137&nbsp;1799
                     </a>
                     {" / "}
                     <a href="tel:+639171123139" className="font-semibold hover:underline">
                        +63&nbsp;917&nbsp;112&nbsp;3139
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
