"use client";

import { useState, use } from "react";
import DragDropUpload from "../components/DragDropUpload";
import DropdownMenu, { DropdownOption } from "../components/Dropdown";

export default function EntrySubmission({
   searchParams,
}: {
   searchParams: Promise<{ nominee?: string }>;
}) {
   const params = use(searchParams);
   const nominee = params.nominee === "msme" ? "MSME" : "LGU";

   const [hasConsented, setHasConsented] = useState(false);
   const [category, setCategory] = useState<string>(nominee === "MSME" ? "msme" : "lgu");
   const [eligibilityDocument, setEligibilityDocument] = useState<File | null>(
      null,
   );
   const [keyVisual, setKeyVisual] = useState<File | null>(null);
   const [bidDocument, setBidDocument] = useState<File | null>(null);
   const [supportingDocument, setSupportingDocument] = useState<File | null>(
      null,
   );

   return (
      <>
         {!hasConsented && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/70">
               <div className="flex flex-col max-w-2xl bg-white rounded-2xl shadow-sm py-16 px-24 gap-2 min-w-1/2">
                  <h3 className="text-2xl font-bold text-green-900 text-center uppercase mb-4">
                     Data Privacy Consent
                  </h3>
                  <p className="text-green-800/70 mb-6 text-center font-sans text-[16px]">
                     By submitting this nomination, you authorize the Green
                     Guardian Awards to collect and process the information
                     provided solely for purposes related to the administration,
                     evaluation, and promotion of the Awards.
                  </p>
                  <p className="text-green-800/70 mb-6 text-center font-sans text-md">
                     All data will be handled in accordance with the{" "}
                     <b>Data Privacy Act of 2012 (RA 10173)</b> and accessed
                     only by authorized personnel and partner agencies for
                     verification purposes. Information will not be shared with
                     third parties without consent, except as required by law.
                  </p>
                  <button
                     onClick={() => setHasConsented(true)}
                     className="font-semibold w-full inline-flex items-center justify-center rounded-xl bg-linear-to-r from-yellow-100/90 to-yellow-100/70 px-20 py-2.5 text-sm text-black/30 transition hover:from-yellow-600 hover:to-yellow-400 hover:text-white uppercase cursor-pointer"
                  >
                     I consent to the collection and processing of my data for
                     Green Guardian Awards.
                  </button>
               </div>
            </div>
         )}
         <form className="flex flex-col items-center justify-center relative min-h-screen bg-[radial-gradient(circle_at_top_center,rgba(170,190,60,0.5),rgba(40,90,60,0.9)_30%),linear-gradient(105deg,#ffff,#0f3d1f,#1a7f3a)]">
            <div className="relative z-10 flex flex-col min-w-4xl min-h-screen p-8 my-10 bg-white/20 rounded-2xl gap-6">
               <p className="font-semibold text-2xl text-white -mb-2">
                  {nominee} Entry Submission
               </p>
               {/* Nominee details */}
               <div className="rounded-2xl border-green-900/20 bg-amber-100/10 border p-5">
                  <p className="text-white/90 text-lg font-semibold mb-2">
                     Nominator Information and Requirements
                  </p>
                  <div className="flex flex-col gap-2">
                     <div className="flex flex-col gap-2 mt-2">
                        <label className="text-white/90 font-sans font-semibold">
                           {nominee === "LGU"
                              ? "*Name of LGU"
                              : "*Name of Company/Corporation"}
                        </label>
                        <input
                           type="text"
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="text-white/90 font-sans font-semibold">
                           *Address
                        </label>
                        <input
                           type="text"
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                           <label className="text-white/90 font-sans font-semibold">
                              *Full Name
                           </label>
                           <input
                              type="text"
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-white/90 font-sans font-semibold">
                              *Position/Designation
                           </label>
                           <input
                              type="text"
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                           <label className="text-white/90 font-sans font-semibold">
                              *Email Address
                           </label>
                           <input
                              type="email"
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-white/90 font-sans font-semibold">
                              *Contact Number
                           </label>
                           <input
                              type="tel"
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                     </div>
                     <DragDropUpload
                        name="eligibilityDocument"
                        value={eligibilityDocument}
                        onChange={setEligibilityDocument}
                        placeholder={`Upload a copy of your DILG Environmental Audit Certificate
/ business permit / SEC or DTI registration certificate`}
                        helperText="(PDF, JPG, or PNG)"
                        className="mt-6"
                     />
                  </div>
               </div>
               <div className="rounded-2xl border-green-900/20 bg-amber-100/10 border p-5 flex flex-col gap-5 mt-4">
                  <p className="text-white/90 text-lg font-semibold">
                     Bid Submission
                  </p>
                  <div className="flex flex-col gap-2">
                     <label className="text-white/90 font-sans font-semibold">
                        *Award Category
                     </label>
                     <DropdownMenu
                        placeholder="Select category"
                        value={category}
                        onChange={setCategory}
                        options={AWARD_CATEGORIES}
                     />
                     <div className="flex flex-col gap-2">
                        <label className="text-white/90 font-sans font-semibold">
                           *Title of the Project/Program Initiative
                        </label>
                        <input
                           type="text"
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                     <div className="flex flex-col gap-2 mt-1">
                        <label className="text-white/90 font-sans font-semibold">
                           *Brief Project Description{" "}
                           <span className="text-white/50 text-sm">
                              (200-300 words)
                           </span>
                        </label>
                        <textarea
                           maxLength={300}
                           rows={8}
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                        ></textarea>
                     </div>
                     <DragDropUpload
                        name="keyVisual"
                        value={keyVisual}
                        accept=".jpg,.png"
                        onChange={setKeyVisual}
                        placeholder={`Upload key visual`}
                        helperText="(recommended size: 1920 × 1080 px, JPG, or PNG)"
                        className="mt-4"
                     />
                     <DragDropUpload
                        name="bidDocument"
                        value={bidDocument}
                        accept=".pdf"
                        onChange={setBidDocument}
                        placeholder={`Upload bid document`}
                        helperText="(PDF)"
                        className="my-4"
                     />
                     <DragDropUpload
                        name="supportingDocument"
                        value={supportingDocument}
                        accept=".pdf"
                        onChange={setSupportingDocument}
                        placeholder={`Upload supporting document`}
                        helperText="(PDF)"
                     />
                     <div className="flex flex-col gap-2 mt-2">
                        <label className="text-white/90 font-sans font-semibold">
                           *Video{" "}
                           <span className="text-white/50 text-sm ml-1">
                              (Google Drive or YouTube link)
                           </span>
                        </label>
                        <input
                           type="text"
                           maxLength={300}
                           max={300}
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                  </div>
               </div>
               <label className="flex items-start gap-3 rounded-2xl bg-amber-100/10 border-green-900/20 px-5 py-6 -mt-2">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded" />
                  <div>
                     <p className="text-base text-white uppercase italic">
                     *I Consent to Use Information for Awards Documentation
                     </p>
                  </div>
               </label>
               <div className="flex flex-col items-center justify-center mt-5">
                  <button
                     type="submit"
                     className="font-bold text-md w-full max-w-md inline-flex items-center justify-center rounded-xl bg-linear-to-r from-white/70 to-white/80 px-20 py-3.5 text-gray-600/50 hover:text-white transition hover:from-yellow-600 hover:to-yellow-400 uppercase cursor-pointer"
                  >
                     Submit Nomination
                  </button>
                  <p className="text-white/40 text-sm mt-2 italic">
                     You will be receiving a confirmation email shortly after
                     submission.
                  </p>
               </div>
            </div>
         </form>
      </>
   );
}

export const AWARD_CATEGORIES: DropdownOption[] = [
   { value: "msme", label: "Micro, Small, and Medium Enterprises (MSME)" },
   { value: "corporation", label: "Large Corporation" },
   { value: "lgu", label: "Local Government Unit (LGU)" },
];
