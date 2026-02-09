import { useState } from "react";

interface CollapsibleTextProps {
   title: string;
   children: React.ReactNode;
   defaultOpen?: boolean;
   className?: string;
};

export default function CollapsibleText({
   title,
   children,
   defaultOpen = false,
   className = "",
}: CollapsibleTextProps) {
   const [open, setOpen] = useState(defaultOpen);

   return (
      <div
         className={`cursor-pointer ${open ? "border-white/2 bg-white/20 cursor-pointer border-t border-b" : "border-t-[0.5px] border-b-[0.5px] border-white/2 bg-white/7"} ${className}`}
      >
         <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
         >
            <span className="text-md font-medium text-white/90">{title}</span>

            <span
               className={`inline-flex h-8 w-8 items-center justify-center transition-transform ${
                  open ? "rotate-180" : "rotate-0"
               }`}
               aria-hidden="true"
            >
               <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-white/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
               >
                  <path d="M6 9l6 6 6-6" />
               </svg>
            </span>
         </button>

         <div
            className={`grid transition-[grid-template-rows] duration-200 ease-out ${
               open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
         >
            <div className="overflow-hidden">
               <div className="px-4 pb-4 pt-1 text-sm leading-relaxed text-white/70">
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
}
