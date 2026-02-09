"use client";

export default function FooterSection() {
  return (
     <section className="flex relative bg-[#0c2725]/50 text-white py-6 bottom-0 w-full min-h-16">
        <div className="mx-auto max-w-7xl px-4 text-center space-y-3">
           {/* Legal */}
           <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} Green Guardian Awards. All
              rights reserved.
           </p>

           {/* Credentials */}
           <p className="text-[13px] text-white/80 leading-relaxed">
              Powered by{" "}
              <span className="font-semibold text-white/90">Prometheus WARP</span>
              .
              <br />
              Organized and administered by{" "}
              <span className="font-medium text-[#f3d107]">
                 Daily Guardian
              </span>
              , a renascent Iloilo-based publishing firm and media organization.
           </p>
           <p className="text-[13px] text-white/90">For inquiries, please contact us at <a href="mailto:dailyguardianmarketing@gmail.com" className="text-[#f3d107]">dailyguardianmarketing@gmail.com</a>.</p>
        </div>
     </section>
  );
}