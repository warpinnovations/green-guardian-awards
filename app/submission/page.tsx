"use client";

import { useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck } from "lucide-react";
import DragDropUpload from "../components/DragDropUpload";
import DropdownMenu, { DropdownOption } from "../components/Dropdown";
import Header from "../components/Header";

interface BidEntryProps {
   orgName: string;
   orgAddress: string;
   fullName: string;
   position: string;
   email: string;
   contactNumber: string;
   eligibilityDocument: File | null;
   awardCategory: string;
   projectTitle: string;
   projectDescription: string;
   keyVisual: File | null;
   bidDocument: File | null;
   supportingDocument: File | null;
   videoLink: string;
}

export default function EntrySubmission({
   searchParams,
}: {
   searchParams: Promise<{ nominee?: string }>;
}) {
   const router = useRouter();
   const params = use(searchParams);
   const nominee = params.nominee === "msme" ? "MSME" : "LGU";

   const [acceptTerms, setAcceptTerms] = useState(false);
   const [hasConsented, setHasConsented] = useState(false);
   const [hasCertified, setHasCertified] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submissionCompleted, setSubmissionCompleted] = useState(false);

   const category = useMemo(() => {
      return nominee === "MSME" ? "msme" : "lgu";
   }, [nominee]);

   const [entry, setEntry] = useState<BidEntryProps>({
      orgName: "",
      orgAddress: "",
      fullName: "",
      position: "",
      email: "",
      contactNumber: "",
      eligibilityDocument: null,
      awardCategory: category,
      projectTitle: "",
      projectDescription: "",
      keyVisual: null,
      bidDocument: null,
      supportingDocument: null,
      videoLink: "",
   });

   const isEmpty = (v: unknown) => (typeof v === "string" ? !v.trim() : !v);

   const disableSubmit = useMemo(() => {
      const REQUIRED_FIELDS: (keyof typeof entry)[] = [
         "orgName",
         "orgAddress",
         "fullName",
         "position",
         "email",
         "contactNumber",
         "eligibilityDocument",
         "awardCategory",
         "projectTitle",
         "projectDescription",
         "keyVisual",
         "bidDocument",
         "supportingDocument",
         "videoLink",
      ];

      return (
         REQUIRED_FIELDS.some((field) => isEmpty(entry[field])) ||
         !hasConsented ||
         !acceptTerms
      );
   }, [entry, hasConsented, acceptTerms]);

   const handleOnChange = (
      field: keyof BidEntryProps,
      value: string | File,
   ) => {
      setEntry(
         (prev) =>
            ({
               ...prev,
               [field]: value,
            }) as BidEntryProps,
      );
   };

   const resetEntryFields = () => {
      setEntry({
         orgName: "",
         orgAddress: "",
         fullName: "",
         position: "",
         email: "",
         contactNumber: "",
         eligibilityDocument: null,
         awardCategory: category,
         projectTitle: "",
         projectDescription: "",
         keyVisual: null,
         bidDocument: null,
         supportingDocument: null,
         videoLink: "",
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("org_name", entry.orgName);
      formData.append("org_address", entry.orgAddress);
      formData.append("full_name", entry.fullName);
      formData.append("position", entry.position);
      formData.append("email", entry.email);
      formData.append("contact_number", entry.contactNumber);
      formData.append("award_category", entry.awardCategory);
      formData.append("project_title", entry.projectTitle);
      formData.append("project_description", entry.projectDescription);
      formData.append("video_link", entry.videoLink);

      if (entry.eligibilityDocument)
         formData.append("eligibility_doc", entry.eligibilityDocument);
      if (entry.keyVisual) formData.append("key_visual", entry.keyVisual);
      if (entry.bidDocument) formData.append("bid_document", entry.bidDocument);
      if (entry.supportingDocument)
         formData.append("supporting_doc", entry.supportingDocument);

      const response = await fetch("/api/create-bid-entry", {
         method: "POST",
         body: formData,
      });

      const data = await response.json();

      if (response.ok) {
         resetEntryFields();
         setHasConsented(false);
         setHasCertified(false);
         setAcceptTerms(false);
         setIsSubmitting(false);
         setSubmissionCompleted(true);
      } else {
         alert(`Submission failed: ${data.error || "Unknown error"}`);
      }
   };

   const handleSuccess = () => {
      setSubmissionCompleted(true);
      router.push("/");
   };

   return (
      <>
         <Header showCTA={false} />
         {!acceptTerms && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/70">
               <div className="flex flex-col w-full lg:min-w-1/2 lg:max-w-2xl max-w-[90%] bg-white rounded-2xl shadow-sm py-16 lg:px-24 px-8 gap-2  min-w-[90%]">
                  <h3 className="lg:text-2xl text-lg font-bold text-green-900 text-center uppercase mb-4">
                     Data Privacy Consent
                  </h3>
                  <p className="text-green-800/70 mb-6 text-center font-sans lg:text-[16px] text-sm">
                     By submitting this nomination, you authorize the Green
                     Guardian Awards to collect and process the information
                     provided solely for purposes related to the administration,
                     evaluation, and promotion of the Awards.
                  </p>
                  <p className="text-green-800/70 mb-6 text-center font-sans lg:text-[16px] text-sm">
                     All data will be handled in accordance with the{" "}
                     <b>Data Privacy Act of 2012 (RA 10173)</b> and accessed
                     only by authorized personnel and partner agencies for
                     verification purposes. Information will not be shared with
                     third parties without consent, except as required by law.
                  </p>
                  <button
                     onClick={() => setAcceptTerms(true)}
                     className="lg:text-sm text-xs font-semibold w-full inline-flex items-center justify-center rounded-xl bg-linear-to-r from-yellow-100/90 to-yellow-100/70 lg:px-20 px-6 py-2.5 text-black/30 transition hover:from-yellow-600 hover:to-yellow-400 hover:text-white uppercase cursor-pointer"
                  >
                     I consent to the collection and processing of my data for
                     Green Guardian Awards.
                  </button>
               </div>
            </div>
         )}
         <form
            onSubmit={handleSubmit}
            className="flex flex-col mt-16 items-center justify-center relative min-h-screen bg-[radial-gradient(circle_at_top_center,rgba(170,190,60,0.5),rgba(40,90,60,0.9)_30%),linear-gradient(105deg,#ffff,#0f3d1f,#1a7f3a)]"
         >
            <div className="relative z-10 mx-5 flex flex-col lg:min-w-4xl min-w-sm min-h-screen lg:p-8 p-4 my-10 bg-white/20 rounded-2xl gap-6">
               <p className="font-semibold text-2xl text-white -mb-2">
                  {nominee} Entry Submission
               </p>
               {/* Nominee details */}
               <div className="rounded-2xl border-green-900/20 bg-amber-100/10 border lg:p-5 p-3">
                  <p className="text-white/90 lg:text-lg font-semibold mb-2">
                     Nominator Information and Requirements
                  </p>
                  <div className="flex flex-col gap-2">
                     <div className="flex flex-col gap-2 mt-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           {nominee === "LGU"
                              ? "*Name of LGU"
                              : "*Name of Company/Corporation"}
                        </label>
                        <input
                           type="text"
                           value={entry?.orgName || ""}
                           onChange={(e) =>
                              handleOnChange("orgName", e.target.value)
                           }
                           required
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                     <div className="flex flex-col gap-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Address
                        </label>
                        <input
                           type="text"
                           value={entry?.orgAddress || ""}
                           onChange={(e) =>
                              handleOnChange("orgAddress", e.target.value)
                           }
                           required
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           autoComplete="street-address"
                        />
                     </div>
                     <div className="lg:grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                              *Full Name
                           </label>
                           <input
                              type="text"
                              value={entry?.fullName}
                              autoComplete="name"
                              onChange={(e) =>
                                 handleOnChange("fullName", e.target.value)
                              }
                              required
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base lg:mt-0 mt-2 text-md text-white/90 font-sans font-semibold">
                              *Position/Designation
                           </label>
                           <input
                              type="text"
                              value={entry?.position}
                              onChange={(e) =>
                                 handleOnChange("position", e.target.value)
                              }
                              required
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                     </div>
                     <div className="lg:grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                              *Email Address
                           </label>
                           <input
                              type="email"
                              autoComplete="email"
                              value={entry?.email}
                              onChange={(e) =>
                                 handleOnChange("email", e.target.value)
                              }
                              required
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base lg:mt-0 mt-2 text-md text-white/90 font-sans font-semibold">
                              *Contact Number
                           </label>
                           <input
                              type="tel"
                              value={entry?.contactNumber}
                              autoComplete="tel"
                              onChange={(e) =>
                                 handleOnChange("contactNumber", e.target.value)
                              }
                              required
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                     </div>
                     <DragDropUpload
                        name="eligibilityDocument"
                        value={entry?.eligibilityDocument}
                        onChange={(file) =>
                           handleOnChange("eligibilityDocument", file)
                        }
                        placeholder={`Upload a copy of your DILG Environmental Audit Certificate
/ business permit / SEC or DTI registration certificate`}
                        helperText="(PDF, JPG, or PNG)"
                        className="mt-6"
                     />
                  </div>
               </div>
               <div className="rounded-2xl border-green-900/20 bg-amber-100/10 border p-5 flex flex-col gap-5 mt-4">
                  <p className="text-white/90 lg:text-lg font-semibold">
                     Bid Submission
                  </p>
                  <div className="flex flex-col gap-2">
                     <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                        *Award Category
                     </label>
                     <DropdownMenu
                        placeholder="Select category"
                        value={entry?.awardCategory || category}
                        onChange={(value) =>
                           handleOnChange("awardCategory", value)
                        }
                        options={AWARD_CATEGORIES}
                     />
                     <div className="flex flex-col gap-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Title of the Project/Program Initiative
                        </label>
                        <input
                           type="text"
                           maxLength={100}
                           value={entry?.projectTitle || ""}
                           onChange={(e) =>
                              handleOnChange("projectTitle", e.target.value)
                           }
                           required
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                     <div className="flex flex-col gap-2 mt-1">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Brief Project Description{" "}
                           <span className="text-white/50 text-sm">
                              (200-300 words)
                           </span>
                        </label>
                        <textarea
                           maxLength={300}
                           rows={8}
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                           value={entry?.projectDescription || ""}
                           onChange={(e) =>
                              handleOnChange(
                                 "projectDescription",
                                 e.target.value,
                              )
                           }
                           required
                        ></textarea>
                     </div>
                     <DragDropUpload
                        name="keyVisual"
                        value={entry?.keyVisual}
                        accept=".jpg,.png"
                        onChange={(file) => handleOnChange("keyVisual", file)}
                        placeholder={`Upload key visual`}
                        helperText="(recommended size: 1920 × 1080 px, JPG, or PNG)"
                        className="mt-4"
                     />
                     <DragDropUpload
                        name="bidDocument"
                        value={entry?.bidDocument}
                        accept=".pdf"
                        onChange={(file) => handleOnChange("bidDocument", file)}
                        placeholder={`Upload bid document`}
                        helperText="(PDF)"
                        className="my-4"
                     />
                     <DragDropUpload
                        name="supportingDocument"
                        value={entry?.supportingDocument}
                        accept=".pdf"
                        onChange={(file) =>
                           handleOnChange("supportingDocument", file)
                        }
                        placeholder={`Upload supporting document`}
                        helperText="(PDF)"
                     />
                     <div className="flex flex-col gap-2 mt-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Video{" "}
                           <span className="text-white/50 text-sm ml-1">
                              (Google Drive or YouTube link)
                           </span>
                        </label>
                        <input
                           type="text"
                           value={entry?.videoLink || ""}
                           onChange={(e) =>
                              handleOnChange("videoLink", e.target.value)
                           }
                           required
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>
                  </div>
               </div>
               <label className="flex flex-col rounded-2xl bg-amber-100/10 border-green-900/20 px-5 py-6 -mt-2">
                  <div className="flex items-start gap-3">
                     <input
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        required
                        checked={hasCertified}
                        onChange={(e) => setHasCertified(e.target.checked)}
                     />
                     <div>
                        <p className="text-sm font-semibold max-w-3xl text-white uppercase">
                           *I certify that all information provided is accurate
                           and that the Awards Secretariat may verify the
                           submitted information through document review,
                           interviews, or site inspection.
                        </p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3 mt-2">
                     <input
                        type="checkbox"
                        className="h-4 w-4 rounded"
                        required
                        checked={hasConsented}
                        onChange={(e) => setHasConsented(e.target.checked)}
                     />
                     <div>
                        <p className="lg:text-base text-sm text-white uppercase font-semibold">
                           *I Consent to Use Information for Awards
                           Documentation.
                        </p>
                     </div>
                  </div>
               </label>
               <div className="flex flex-col items-center justify-center mt-5">
                  <button
                     type="submit"
                     className="font-bold text-md w-full max-w-md inline-flex items-center justify-center rounded-xl bg-linear-to-r from-white/70 to-white/80 px-20 py-3.5  text-gray-600/50 transition enabled:hover:text-white enabled:hover:from-yellow-600 enabled:hover:to-yellow-400 uppercase cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                     disabled={disableSubmit || isSubmitting}
                  >
                     {isSubmitting ? "Submitting..." : "Submit Entry"}
                  </button>
                  <p className="text-white/40 text-center px-8 text-sm mt-2 italic">
                     You will be receiving a confirmation email shortly after
                     submission.
                  </p>
               </div>
            </div>
         </form>
         {submissionCompleted && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/90">
               <div className="flex flex-col items-center w-[30%] bg-green-100/90 rounded-2xl py-20 shadow-lg gap-4">
                  <CircleCheck height={50} width={50} color="#18ad31" />
                  <h3 className="text-2xl font-bold text-neutral-700 text-center uppercase mb-2">
                     Success!
                  </h3>
                  <p className="text-neutral-700 mb-8 text-center font-sans text-base px-10">
                     Thank you for your submission to the Green Guardian Awards.
                     A confirmation email has been sent to your provided email
                     address.
                  </p>
                  <button
                     onClick={handleSuccess}
                     className="font-semibold mx-auto inline-flex items-center justify-center rounded-xl bg-[#18ad31] hover:bg-[#18ad31]/90 px-16 py-3 text-sm transition text-white uppercase cursor-pointer"
                  >
                     Ok
                  </button>
               </div>
            </div>
         )}
      </>
   );
}

export const AWARD_CATEGORIES: DropdownOption[] = [
   { value: "msme", label: "Micro, Small, and Medium Enterprises (MSME)" },
   { value: "corporation", label: "Large Corporation" },
   { value: "lgu", label: "Local Government Unit (LGU)" },
];
