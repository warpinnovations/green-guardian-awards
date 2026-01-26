import { useMemo, useRef, useState } from "react";
import { fileMatchesAccept, normalizeAccept } from "../utils/file-handler";

interface DragDropUploadProps {
   name: string;
   accept?: string;
   value: File[] | null;
   onChange: (files: File[]) => void;
   placeholder: string;
   helperText?: string;
   className?: string;
   multiple?: boolean;
}

export default function DragDropUpload({
   name,
   accept = ".pdf,.jpg,.png",
   value,
   onChange,
   placeholder,
   helperText,
   className = "",
   multiple = false,
}: DragDropUploadProps) {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isDragging, setIsDragging] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const acceptList = useMemo(() => normalizeAccept(accept), [accept]);

   const addFiles = (incoming: File[]) => {
      if (!incoming.length) return;

      const invalid = incoming.find((f) => !fileMatchesAccept(f, acceptList));
      if (invalid) {
         setError(
            `Please upload a valid file. Accepted format(s): ${acceptList.join(", ")}`,
         );
         return;
      }

      setError(null);

      if (!multiple) {
         onChange([incoming[0]]);
         return;
      }

      const merged = [...(value ?? []), ...incoming];
      const deduped = Array.from(
         new Map(
            merged.map(
               (f) => [`${f.name}-${f.size}-${f.lastModified}`, f] as const,
            ),
         ).values(),
      );

      onChange(deduped);
   };

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      addFiles(multiple ? files : files.slice(0, 1));
      e.target.value = "";
   };

   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files ?? []);
      addFiles(multiple ? files : files.slice(0, 1));
   };

   const removeFile = (idx: number) => {
      const next = (value ?? []).filter((_, i) => i !== idx);
      onChange(next);
   };

   const displayText = ((value?.length ?? 0) > 0)
      ? multiple
         ? `${(value ?? []).length} file(s) selected`
         : value?.[0]?.name
      : placeholder;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
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
        <p className="mx-auto max-w-lg whitespace-pre-line text-md font-semibold text-white/60 lg:text-base">
          {displayText}
        </p>

        {helperText && <p className="mt-1 text-sm text-white/40">{helperText}</p>}
      </div>

      {/* Selected file list (only show if multiple, or if you want remove button for single) */}
      {value && value.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
          {value.map((file, idx) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex items-center justify-between gap-3"
            >
              <p className="truncate text-sm text-white/80">{file.name}</p>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-xs cursor-pointer text-white/50 hover:text-white/80"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="-mt-2 text-sm italic text-red-300/90">{error}</p>}
    </div>
  );
}
