"use client";

export default function FooterSection() {
  return (
     <footer className="bg-[#0c2725]/50 text-white py-6 absolute bottom-0 w-full">
        <div className="mx-auto max-w-7xl px-4 text-center space-y-3">
           {/* Legal */}
           <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} Green Guardian Awards. All
              rights reserved.
           </p>

           {/* Credentials */}
           <p className="text-xs text-white/80 leading-relaxed">
              Powered by{" "}
              <span className="font-semibold text-white/90">Prometheus WARP</span>
              .
              <br />
              Organized and administered by{" "}
              <span className="font-medium text-yellow-400/90">
                 Daily Guardian
              </span>
              , a renascent Iloilo-based publishing firm and media organization.
           </p>
        </div>
     </footer>
  );
}