"use client";

export default function FooterSection() {
  return (
     <footer className="bg-[#010a01] text-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center space-y-3">
           {/* Legal */}
           <p className="text-sm text-white/70">
              &copy; {new Date().getFullYear()} Green Guardian Awards. All
              rights reserved.
           </p>

           {/* Credentials */}
           <p className="text-xs text-white/50 leading-relaxed">
              Powered by <span className="font-medium text-white/70">Prometheus WARP</span>
              .
              <br />
              Organized and administered by{" "}
              <span className="font-medium text-yellow-400/70">
                Daily Guardian
              </span>
              , a renascent Iloilo-based publishing firm and media organization.
           </p>
        </div>
     </footer>
  );
}