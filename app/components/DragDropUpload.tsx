import { useMemo, useRef, useState } from "react";
import { fileMatchesAccept, normalizeAccept } from "../utils/file-handler";

interface DragDropUploadProps {
   name: string;
   accept?: string;
   value: File | null;
   onChange: (file: File) => void;
   placeholder: string;
   helperText?: string;
   className?: string;
}

export default function DragDropUpload({
   name,
   accept = ".pdf,.jpg,.png",
   value,
   onChange,
   placeholder,
   helperText,
   className = "",
}: DragDropUploadProps) {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const acceptList = useMemo(() => normalizeAccept(accept), [accept]);

   const handleFile = (file: File) => {
      if (!fileMatchesAccept(file, acceptList)) {
         setError(
            `Please upload a valid file. Accepted format(s): ${acceptList.join(", ")}`,
         );

         return;
      }
      setError(null);
      onChange(file);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
   };

   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
   };

   return (
      <div className={`flex flex-col gap-4 ${className}`}>
         {/* Hidden input */}
         <input
            ref={fileInputRef}
            type="file"
            name={name}
            accept={accept}
            className="hidden"
            onChange={handleInputChange}
         />

         {/* Drop zone */}
         <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
               e.preventDefault();
               setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
          cursor-pointer rounded-xl border-2 border-dashed py-16 px-6 text-center transition
          ${
             isDragging
                ? "border-white bg-white/10"
                : "border-white/30 bg-white/5 hover:bg-white/10"
          }
        `}
         >
            <p className="text-white/60 max-w-lg font-semibold whitespace-pre-line mx-auto">
               {value ? value.name : placeholder}
            </p>

            {helperText && (
               <p className="text-white/40 text-sm mt-1">{helperText}</p>
            )}
         </div>
         {error && (
            <p className="text-sm text-red-300/90 italic -mt-2">{error}</p>
         )}
      </div>
   );
}
