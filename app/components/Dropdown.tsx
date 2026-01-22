import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type DropdownOption = {
   value: string;
   label: string;
};

type DropdownMenuProps = {
   placeholder?: string;
   value?: string;
   onChange: (value: string) => void;
   options: DropdownOption[];
   disabled?: boolean;
   error?: string;
   className?: string;
};

export default function DropdownMenu({
   placeholder = "Select an option",
   value,
   onChange,
   options,
   disabled = false,
   error,
   className = "",
}: DropdownMenuProps) {
   const [open, setOpen] = useState<boolean>(false);
   const [activeIndex, setActiveIndex] = useState<number>(-1);

   const btnRef = useRef<HTMLButtonElement | null>(null);
   const listRef = useRef<HTMLDivElement | null>(null);
   const containerRef = useRef<HTMLDivElement | null>(null);

   const selected = useMemo(
      () => options.find((o) => o.value === value) ?? null,
      [options, value],
   );

   const selectOption = (opt: DropdownOption) => {
      onChange(opt.value);
      setOpen(false);
      btnRef.current?.focus();
   };

   return (
      <div ref={containerRef} className={`w-full ${className}`}>
         <button
            ref={btnRef}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setOpen((v) => !v)}
            className={`
          w-full flex items-center justify-between gap-3 rounded-lg px-4 py-2.5
          bg-white/5 border transition text-left
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          ${error ? "border-red-400/60" : "border-white/20"}
          focus:outline-none focus:ring-2 focus:ring-white/30
        `}
         >
            <span className={selected ? "text-white/90" : "text-white/50"}>
               {selected?.label ?? placeholder}
            </span>

            <span>
               {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
         </button>

         {open && (
            <div
               ref={listRef}
               tabIndex={-1}
               className="
            absolute z-50 mt-2 w-198 overflow-hidden rounded-lg
            border border-white/15 bg-white/20 backdrop-blur shadow-lg
          "
            >
               <ul className="max-h-60 overflow-auto py-1">
                  {options.map((opt, idx) => {
                     const isActive = idx === activeIndex;

                     return (
                        <li
                           key={opt.value}
                           onMouseEnter={() => setActiveIndex(idx)}
                           onClick={() => selectOption(opt)}
                           className={`
                    px-4 py-2 cursor-pointer text-sm transition text-white

                    ${isActive ? "bg-white/10" : ""}
                    hover:bg-white/10
                  `}
                        >
                           {opt.label}
                        </li>
                     );
                  })}
               </ul>
            </div>
         )}

         {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
      </div>
   );
}
