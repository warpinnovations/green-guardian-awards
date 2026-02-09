"use client";

import { useMemo, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { CircleCheck, FileDown, ImageUp } from "lucide-react";
import DragDropUpload from "@/app/components/DragDropUpload";
import DropdownMenu, { DropdownOption } from "@/app/components/Dropdown";
import Header from "@/app/components/Header";
import { uploadWithToken, withRetry } from "@/app/utils/upload";
import FooterSection from "@/app/components/sections/FooterSection";

interface BidEntryProps {
   orgName: string;
   orgAddress: string;
   classification: string;
   fullName: string;
   position: string;
   email: string;
   contactNumber: string;
   website?: string;
   facebookPage?: string;
   companyDescription?: string;
   altContactPerson?: string;
   altContactNumber?: string;
   altEmail?: string;
   authorizationFormDocument?: File[] | null;
   businessPermitDocument?: File[] | null;
   DTISecDocument?: File[] | null;
   awardCategory: string;
   projectTitle: string;
   projectDescription: string;
   keyVisual: File[] | null;
   bidDocument: File[] | null;
   projectDocument: File[] | null;
   supportingDocument: File[] | null;
   videoLink?: string;
}

type FormErrorKey =
   | keyof BidEntryProps
   | "termsAccepted"
   | "infoCertified"
   | "dataPrivacyConcerns";

const LGU_AWARD_CATEGORIES: DropdownOption[] = [
   { value: "The LGU-Led Ecological Stewardship Award", label: "The LGU-Led Ecological Stewardship Award" },
   { value: "The Circular Economy and Waste Management Excellence Award", label: "The Circular Economy and Waste Management Excellence Award" },
   { value: "The Green Infrastructure and Climate Action Award", label: "The Green Infrastructure and Climate Action Award" },
];

const MSME_AWARD_CATEGORIES: DropdownOption[] = [
   { value: "The Sustainable Operations Excellence Award", label: "The Sustainable Operations Excellence Award" },
   { value: "The Green Product/Service Innovation Award", label: "The Green Product/Service Innovation Award" },
   { value: "The Community Engagement for Environmental Impact Award", label: "The Community Engagement for Environmental Impact Award" },
];

const LGU_CLASSIFICATIONS: DropdownOption[] = [
   { value: "ComponentCity", label: "Component City" },
   { value: "Municipality", label: "Municipality" },
   { value: "Highly Urbanized City", label: "Highly Urbanized City" },
];

const MSME_CLASSIFICATIONS: DropdownOption[] = [
   { value: "Micro", label: "Micro (Assets <= 3,000,000; 1-9 employees)" },
   { value: "Small", label: "Small (Assets 3,000,000 - 15,000,000; 10-99 employees)" },
   { value: "Medium", label: "Medium (Assets 15,000,000 - 100,000,000; 100-199 employees)" },
   { value: "Large", label: "Large (Assets > 100,000,000; 200+ employees)" },
];

export default function EntrySubmission({
   searchParams,
}: {
   searchParams: Promise<{ nominee?: string }>;
}) {
   const router = useRouter();
   const params = use(searchParams);
   const nominee = params.nominee === "msme" ? "Business" : "Local Government Unit";

   const [dataPrivacyConcerns, setDataPrivacyConcerns] = useState(false);
   const [termsAccepted, setTermsAccepted] = useState(false);
   const [infoCertified, setInfoCertified] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [submissionCompleted, setSubmissionCompleted] = useState(false);

   const [errors, setErrors] = useState<Partial<Record<FormErrorKey, string>>>({});
   const [submittedOnce, setSubmittedOnce] = useState(false);
   const headerOffsetPx = 110;

   const [entry, setEntry] = useState<BidEntryProps>({
      orgName: "",
      orgAddress: "",
      classification: "",
      fullName: "",
      position: "",
      email: "",
      altContactPerson: "",
      altContactNumber: "",
      altEmail: "",
      contactNumber: "",
      companyDescription: undefined,
      awardCategory: "",
      projectTitle: "",
      projectDescription: "",
      keyVisual: null,
      bidDocument: null,
      projectDocument: null,
      supportingDocument: null,
   });

   const authorizationFormDoc = "Green Guardian - LGU - Authorization Letter.docx";

   const msmeBidTemplate = {
      "Sustainable Operations Excellence Award":
         "MSMEs and Large Corp Bid Requirement Green Guardian Awards (The Sustainable Operations Excellence Award).docx",
      "Green Product/Service Innovation Award":
         "public/files/MSMEs and Large Corp Bid Requirement Green Guardian Awards (The Green Product_Service Innovation Award).docx",
      "Community Engagement for Environmental Impact Award":
         "MSMEs and Large Corp Bid Requirement Green Guardian Awards (The Community Engagement for Environmental Award).docx",
   } as const;

   const lguBidTemplate = {
      "The LGU-Led Ecological Stewardship Award":
         "LGU Bid Requirement Green Guardian Awards (The LGU-Led Ecological Stewardship Award).docx",
      "The Circular Economy and Waste Management Excellence Award":
         "LGU Bid Requirement Green Guardian Awards (The Circular Economy and Waste Management Excellence Award).docx",
      "The Green Infrastructure and Climate Action Award":
         "LGU Bid Requirement Green Guardian Awards (The Green Infrastructure and Climate Action Award).docx",
   } as const;

   const bidDocumentTemplate =
      nominee === "Business"
         ? msmeBidTemplate[entry.awardCategory as keyof typeof msmeBidTemplate]
         : lguBidTemplate[entry.awardCategory as keyof typeof lguBidTemplate];

   const projectDocumentationTemplate = "Supporting Docs (Green Guardian Awards) .pptx";

   const isEmptyStr = (v: unknown) => typeof v !== "string" || !v.trim();

   const validate = () => {
      const e: Partial<Record<FormErrorKey, string>> = {};
      const isLGU = nominee === "Local Government Unit";
      const isMSME = nominee === "Business";

      // Text / selections
      if (isEmptyStr(entry.awardCategory)) e.awardCategory = "Please select an award category.";
      if (isEmptyStr(entry.orgName)) e.orgName = "Please enter the organization name.";
      if (isEmptyStr(entry.classification)) e.classification = "Please select a classification.";
      if (isEmptyStr(entry.orgAddress)) e.orgAddress = "Please enter the address.";
      if (isEmptyStr(entry.fullName)) e.fullName = "Please enter the full name.";
      if (isEmptyStr(entry.position)) e.position = "Please enter the position/designation.";
      if (isEmptyStr(entry.email)) e.email = "Please enter a valid email address.";
      if (isEmptyStr(entry.contactNumber)) e.contactNumber = "Please enter a contact number.";

      if (isMSME && isEmptyStr(entry.companyDescription ?? "")) {
         e.companyDescription = "Please provide a short company description.";
      }

      if (isEmptyStr(entry.projectTitle)) e.projectTitle = "Please enter the project title.";
      if (isEmptyStr(entry.projectDescription)) e.projectDescription = "Please enter the project description.";

      // Files
      if (!entry.keyVisual?.length) e.keyVisual = "Please upload a key visual.";
      if (!entry.bidDocument?.length) e.bidDocument = "Please upload the bid document.";
      if (!entry.projectDocument?.length) e.projectDocument = "Please upload the project documentation.";
      if (!entry.supportingDocument?.length) e.supportingDocument = "Please upload at least one supporting document.";

      if (isLGU && !entry.authorizationFormDocument?.length) {
         e.authorizationFormDocument = "Please upload the authorization form.";
      }
      if (isMSME && !entry.businessPermitDocument?.length) {
         e.businessPermitDocument = "Please upload the business permit.";
      }
      if (isMSME && !entry.DTISecDocument?.length) {
         e.DTISecDocument = "Please upload the SEC/DTI permit.";
      }

      // Consents
      if (!infoCertified) e.infoCertified = "Please check the certification box.";
      if (!termsAccepted) e.termsAccepted = "Please check the consent box.";
      if (!dataPrivacyConcerns) e.dataPrivacyConcerns = "Please complete the data privacy consent.";

      return e;
   };

   const scrollToField = (key: FormErrorKey) => {
      const el = document.getElementById(`field-${key}`);
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - headerOffsetPx;
      window.scrollTo({ top: y, behavior: "smooth" });

      // optional "flash"
      el.classList.add("ring-2", "ring-[#D4AF37]");
      setTimeout(() => {
         el.classList.remove("ring-2", "ring-[#D4AF37]");
      }, 900);
   };

   const fieldClass = (key: FormErrorKey) => {
      const show = submittedOnce && !!errors[key];
      return show
         ? "bg-white/10 border border-red-400/70 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-red-300"
         : "bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white";
   };

   const showError = (key: FormErrorKey) => submittedOnce && !!errors[key];

   const handleOnChange = (field: keyof BidEntryProps, value: string | File[]) => {
      setEntry((prev) => ({ ...prev, [field]: value }) as BidEntryProps);
      // If user changes a field after submit attempt, clear that specific error
      setErrors((prev) => {
         const next = { ...prev };
         delete next[field];
         return next;
      });
   };

   const resetEntryFields = () => {
      setEntry({
         orgName: "",
         orgAddress: "",
         fullName: "",
         position: "",
         website: "",
         companyDescription: "",
         email: "",
         contactNumber: "",
         classification: "",
         altContactPerson: "",
         altContactNumber: "",
         altEmail: "",
         authorizationFormDocument: null,
         businessPermitDocument: null,
         DTISecDocument: null,
         awardCategory: "",
         projectTitle: "",
         projectDescription: "",
         keyVisual: null,
         bidDocument: null,
         projectDocument: null,
         supportingDocument: null,
         videoLink: "",
      });
      setErrors({});
      setSubmittedOnce(false);
   };

   const sendEmail = async ({
      email,
      fullName,
      orgName,
      track,
      awardCategory,
      referenceId,
   }: {
      email: string;
      fullName: string;
      orgName: string;
      track: "Local Government Unit" | "Business";
      awardCategory: string;
      referenceId: string;
   }) => {
      try {
         await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, fullName, orgName, track, awardCategory, referenceId }),
         });
      } catch (error) {
         console.error("Failed to send acceptance email:", error);
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmittedOnce(true);

      const v = validate();
      setErrors(v);

      // If there are errors: scroll to first one and stop (no uploads, no DB)
      const keys = Object.keys(v) as FormErrorKey[];
      if (keys.length > 0) {
         // If the first issue is the modal consent, open modal (dataPrivacyConcerns)
         if (keys[0] === "dataPrivacyConcerns" && !dataPrivacyConcerns) {
            // user must close modal with consent
         }
         scrollToField(keys[0]);
         return;
      }

      setIsSubmitting(true);

      try {
         const authorizationForm = entry.authorizationFormDocument?.[0];
         const permit = entry.businessPermitDocument?.[0];
         const dti = entry.DTISecDocument?.[0];
         const keyVisual = entry.keyVisual?.[0];
         const bid = entry.bidDocument?.[0];
         const projDoc = entry.projectDocument?.[0];
         const supporting = entry.supportingDocument || [];

         const isLGU = nominee === "Local Government Unit";
         const isMSME = nominee === "Business";

         const initPayload = {
            track: nominee,
            ...(isLGU && {
               authorization_form_document: { name: authorizationForm?.name, type: authorizationForm?.type },
            }),
            ...(isMSME && {
               business_permit_document: { name: permit?.name, type: permit?.type },
               dti_sec_document: { name: dti?.name, type: dti?.type },
            }),
            key_visual: { name: keyVisual?.name, type: keyVisual?.type },
            bid_document: { name: bid?.name, type: bid?.type },
            project_documentation: { name: projDoc?.name, type: projDoc?.type },
            supporting_docs: supporting.map((f) => ({ name: f.name, type: f.type })),
         };

         const initRes = await fetch("/api/bid-entry/init-upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(initPayload),
         });

         const init = await initRes.json();
         if (!initRes.ok) {
            alert(`Upload init failed: ${init.error || "Unknown error"}`);
            return;
         }

         const uploaded: Array<{ bucket: string; path: string }> = [];

         type UploadMeta = { bucket: string; path: string; token: string };
         const tasks: Array<Promise<void>> = [];

         const enqueueUpload = (meta: UploadMeta | undefined, file: File | undefined) => {
            if (!meta || !file) return;
            tasks.push(
               withRetry(async () => {
                  await uploadWithToken(meta.bucket, meta.path, meta.token, file);
                  uploaded.push({ bucket: meta.bucket, path: meta.path });
               }, 2),
            );
         };

         enqueueUpload(init.authorization_form_document, authorizationForm); // LGU only
         enqueueUpload(init.business_permit_document, permit); // MSME only
         enqueueUpload(init.dti_sec_document, dti); // MSME only
         enqueueUpload(init.key_visual, keyVisual);
         enqueueUpload(init.bid_document, bid);
         enqueueUpload(init.project_documentation, projDoc);

         const supportingMetas = (init.supporting_docs || []) as UploadMeta[];
         supportingMetas.forEach((meta, i) => enqueueUpload(meta, supporting[i]));

         await Promise.all(tasks);

         const supportingPaths = supportingMetas.map((m) => m.path).filter(Boolean);

         // --- submit DB record ---
         const submitRes = await fetch("/api/create-bid-entry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               org_name: entry.orgName,
               org_address: entry.orgAddress,
               full_name: entry.fullName,
               position: entry.position,
               classification: entry.classification,
               email: entry.email,
               contact_number: entry.contactNumber,
               website: entry.website || null,
               facebook_page: entry.facebookPage || null,
               company_description: entry.companyDescription || null,
               alt_contact_person: entry.altContactPerson || null,
               alt_contact_number: entry.altContactNumber || null,
               alt_email: entry.altEmail || null,
               award_category: entry.awardCategory,
               project_title: entry.projectTitle,
               project_description: entry.projectDescription,
               video_link: entry.videoLink || null,

               authorization_form_doc_path: init.authorization_form_document?.path ?? null,
               business_permit_path: init.business_permit_document?.path ?? null,
               dti_sec_permit_path: init.dti_sec_document?.path ?? null,

               key_visual_path: init.key_visual?.path,
               bid_doc_path: init.bid_document?.path,
               project_doc_path: init.project_documentation?.path,
               supporting_doc_paths: supportingPaths,

               data_privacy_consent: dataPrivacyConcerns,
               terms_accepted: termsAccepted,
               info_certified: infoCertified,
            }),
         });

         const submitData = await submitRes.json();

         if (!submitRes.ok) {
            alert(`Submission failed: ${submitData.error || "Unknown error"}`);
            return;
         }

         // --- send email on success ---
         await sendEmail({
            email: submitData.email,
            fullName: submitData.full_name,
            orgName: submitData.org_name,
            track: nominee,
            awardCategory: submitData.award_category,
            referenceId: submitData.reference_id,
         })
            .then(() => {
               resetEntryFields();
               setTermsAccepted(false);
               setInfoCertified(false);
               setSubmissionCompleted(true);
            })
            .catch(() => {
               alert("Failed to send confirmation email. Please contact support.");
            });
      } catch (err: unknown) {
         const message = err instanceof Error ? err.message : "Submission failed.";
         alert(message);
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleSuccess = () => {
      setSubmissionCompleted(true);
      router.push("/");
   };

   return (
      <div className="min-h-screen relative">
         <Header showCTA={false} />

         {!dataPrivacyConcerns && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/70">
               <div className="flex flex-col w-full lg:min-w-1/2 lg:max-w-2xl max-w-[90%] bg-white rounded-2xl shadow-sm py-16 lg:px-24 px-8 gap-2 min-w-[90%]">
                  <h3 className="lg:text-2xl text-lg font-bold text-green-900 text-center uppercase mb-4">
                     Data Privacy Consent
                  </h3>
                  <p className="text-green-800/70 mb-6 text-center font-sans lg:text-[16px] text-sm">
                     By submitting this nomination, you authorize the <b>DAILY GUARDIAN </b>to collect and process the
                     information provided solely for purposes related to the administration, evaluation, and promotion of the
                     Awards.
                  </p>
                  <p className="text-green-800/70 mb-6 text-center font-sans lg:text-[16px] text-sm">
                     All data will be handled in accordance with the <b>Data Privacy Act of 2012 (RA 10173)</b> and accessed
                     only by authorized personnel and partner agencies for verification purposes. Information will not be
                     shared with third parties without consent, except as required by law.
                  </p>
                  <button
                     onClick={() => {
                        setDataPrivacyConcerns(true);
                        setErrors((prev) => {
                           const next = { ...prev };
                           delete next.dataPrivacyConcerns;
                           return next;
                        });
                     }}
                     className="lg:text-sm text-xs font-semibold w-full inline-flex items-center justify-center rounded-xl bg-linear-to-r from-yellow-100/90 to-yellow-100/70 lg:px-20 px-6 py-2.5 text-black/30 transition hover:from-yellow-600 hover:to-yellow-400 hover:text-white uppercase cursor-pointer"
                  >
                     I consent to the collection and processing of my data for Green Guardian Awards.
                  </button>
               </div>
            </div>
         )}

         <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col mt-28 items-center justify-center relative min-h-screen"
         >
            <div className="fixed inset-0 bg-gradient-radial " />

            <div className="relative z-10 mx-5 flex flex-col lg:min-w-4xl min-w-sm min-h-screen lg:p-8 p-4 my-10 bg-white/20 rounded-2xl gap-6">
               <p className="font-semibold text-2xl text-white -mb-2">{nominee} Entry Submission</p>

               {/* Global error banner */}
               {submittedOnce && Object.keys(errors).length > 0 && (
                  <div className="rounded-2xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-red-100 text-sm">
                     Please fill out the highlighted fields below.
                  </div>
               )}

               {/* Nominee details */}
               <div className="rounded-2xl border-green-900/20 bg-amber-100/10 border lg:p-5 p-3">
                  <div id="field-awardCategory" className="flex flex-col">
                     <label className="lg:text-base text-md text-white/90 font-sans font-semibold">*Award Category</label>
                     <DropdownMenu
                        placeholder="Select category"
                        value={entry?.awardCategory || ""}
                        onChange={(value) => handleOnChange("awardCategory", value)}
                        options={nominee === "Business" ? MSME_AWARD_CATEGORIES : LGU_AWARD_CATEGORIES}
                        className="mb-2 mt-4"
                     />
                     {showError("awardCategory") && (
                        <p className="text-red-200 text-xs mb-2">{errors.awardCategory}</p>
                     )}
                  </div>

                  <p className="text-white/90 lg:text-lg font-semibold">Nominator Information and Requirements</p>

                  <div className="flex flex-col gap-2">
                     <div id="field-orgName" className="flex flex-col gap-2 mt-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           {nominee === "Local Government Unit" ? "*Name of Local Government Unit" : "*Name of Company/Corporation"}
                        </label>
                        <input
                           type="text"
                           value={entry?.orgName || ""}
                           onChange={(e) => handleOnChange("orgName", e.target.value)}
                           className={fieldClass("orgName")}
                        />
                        {showError("orgName") && <p className="text-red-200 text-xs">{errors.orgName}</p>}
                     </div>

                     <div id="field-classification" className="flex flex-col gap-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">*Classification</label>
                        <DropdownMenu
                           placeholder="Select classification"
                           value={entry?.classification || ""}
                           onChange={(value) => handleOnChange("classification", value)}
                           options={nominee === "Business" ? MSME_CLASSIFICATIONS : LGU_CLASSIFICATIONS}
                        />
                        {showError("classification") && (
                           <p className="text-red-200 text-xs">{errors.classification}</p>
                        )}
                     </div>

                     <div id="field-orgAddress" className="flex flex-col gap-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">*Address</label>
                        <input
                           type="text"
                           value={entry?.orgAddress || ""}
                           onChange={(e) => handleOnChange("orgAddress", e.target.value)}
                           className={fieldClass("orgAddress")}
                           autoComplete="street-address"
                        />
                        {showError("orgAddress") && <p className="text-red-200 text-xs">{errors.orgAddress}</p>}
                     </div>

                     <div className="lg:grid grid-cols-2 gap-4 mt-2">
                        <div id="field-fullName" className="flex flex-col gap-2">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                              *Full Name of Authorized Representative
                           </label>
                           <input
                              type="text"
                              value={entry?.fullName}
                              autoComplete="name"
                              onChange={(e) => handleOnChange("fullName", e.target.value)}
                              className={fieldClass("fullName")}
                           />
                           {showError("fullName") && <p className="text-red-200 text-xs">{errors.fullName}</p>}
                        </div>

                        <div id="field-position" className="flex flex-col gap-2">
                           <label className="lg:text-base lg:mt-0 mt-2 text-md text-white/90 font-sans font-semibold">
                              *Position/Designation
                           </label>
                           <input
                              type="text"
                              value={entry?.position}
                              onChange={(e) => handleOnChange("position", e.target.value)}
                              className={fieldClass("position")}
                           />
                           {showError("position") && <p className="text-red-200 text-xs">{errors.position}</p>}
                        </div>
                     </div>

                     <div className="lg:grid grid-cols-2 gap-4 mt-2">
                        <div id="field-email" className="flex flex-col gap-2">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">*Email Address</label>
                           <input
                              type="email"
                              autoComplete="email"
                              value={entry?.email}
                              onChange={(e) => handleOnChange("email", e.target.value)}
                              className={fieldClass("email")}
                           />
                           {showError("email") && <p className="text-red-200 text-xs">{errors.email}</p>}
                        </div>

                        <div id="field-contactNumber" className="flex flex-col gap-2">
                           <label className="lg:text-base lg:mt-0 mt-2 text-md text-white/90 font-sans font-semibold">
                              *Contact Number
                           </label>
                           <input
                              type="tel"
                              value={entry?.contactNumber}
                              autoComplete="tel"
                              onChange={(e) => handleOnChange("contactNumber", e.target.value)}
                              className={fieldClass("contactNumber")}
                           />
                           {showError("contactNumber") && (
                              <p className="text-red-200 text-xs">{errors.contactNumber}</p>
                           )}
                        </div>
                     </div>

                     <div className="flex flex-col gap-2 mt-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           Website <span className="font-normal">(if applicable)</span>
                        </label>
                        <input
                           type="text"
                           value={entry?.website}
                           onChange={(e) => handleOnChange("website", e.target.value)}
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>

                     <div className="flex flex-col gap-2 mt-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">Facebook Page</label>
                        <input
                           type="text"
                           value={entry?.facebookPage}
                           onChange={(e) => handleOnChange("facebookPage", e.target.value)}
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                     </div>

                     {nominee === "Business" && (
                        <div id="field-companyDescription" className="flex flex-col gap-2 mt-1">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                              *Company Description <span className="text-white/50 text-sm">(150-200 words)</span>
                           </label>
                           <textarea
                              maxLength={200}
                              rows={6}
                              className={
                                 showError("companyDescription")
                                    ? "bg-white/10 border border-red-400/70 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                                    : "bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                              }
                              value={entry?.companyDescription || ""}
                              onChange={(e) => handleOnChange("companyDescription", e.target.value)}
                           />
                           {showError("companyDescription") && (
                              <p className="text-red-200 text-xs">{errors.companyDescription}</p>
                           )}
                        </div>
                     )}

                     <div className="mt-2">
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                              Alternate Contact Person
                           </label>
                           <input
                              type="text"
                              value={entry?.altContactPerson}
                              onChange={(e) => handleOnChange("altContactPerson", e.target.value)}
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                     </div>

                     <div className="lg:grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold">Alternate Email</label>
                           <input
                              type="email"
                              value={entry?.altEmail}
                              onChange={(e) => handleOnChange("altEmail", e.target.value)}
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="lg:text-base lg:mt-0 mt-2 text-md text-white/90 font-sans font-semibold">
                              Alternate Contact Number
                           </label>
                           <input
                              type="text"
                              value={entry?.altContactNumber}
                              onChange={(e) => handleOnChange("altContactNumber", e.target.value)}
                              className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                           />
                        </div>
                     </div>

                     {nominee === "Local Government Unit" && (
                        <>
                           <div className="flex justify-between items-center mt-2 -mb-3">
                              <label className="lg:text-base text-sm text-white/90 font-sans font-semibold">
                                 *Upload Authorization Form for Representative
                              </label>
                              <span className="flex items-center">
                                 <a
                                    href={`/api/download/${encodeURIComponent(authorizationFormDoc)}`}
                                    className="min-w-38 flex items-center gap-2 rounded-xl border border-white/10 bg-white/20 hover:bg-white/30 py-2 lg:px-3 px-2 cursor-pointer text-white/90 text-sm font-semibold"
                                 >
                                    <FileDown size={18} className="inline-block text-white/70" />
                                    Download Form
                                 </a>
                              </span>
                           </div>

                           <div id="field-authorizationFormDocument" className="mt-0">
                              <DragDropUpload
                                 name="authorizationFormDocument"
                                 accept=".pdf"
                                 value={entry?.authorizationFormDocument || null}
                                 onChange={(file) => handleOnChange("authorizationFormDocument", file)}
                                 placeholder={`Upload Authorization Form for Representative`}
                                 helperText="(PDF)"
                                 className="mt-6"
                              />
                              {showError("authorizationFormDocument") && (
                                 <p className="text-red-200 text-xs mt-2">{errors.authorizationFormDocument}</p>
                              )}
                           </div>
                        </>
                     )}

                     {nominee !== "Local Government Unit" && (
                        <>
                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold mt-2 -mb-4">
                              *Upload Business Permit
                           </label>
                           <div id="field-businessPermitDocument">
                              <DragDropUpload
                                 name="businessPermitDocument"
                                 value={entry?.businessPermitDocument || null}
                                 onChange={(file) => handleOnChange("businessPermitDocument", file)}
                                 placeholder={`Upload Business Permit`}
                                 helperText="(PDF, JPG, or PNG)"
                                 accept=".pdf,.jpg,.jpeg,.png"
                                 className="mt-6"
                              />
                              {showError("businessPermitDocument") && (
                                 <p className="text-red-200 text-xs mt-2">{errors.businessPermitDocument}</p>
                              )}
                           </div>

                           <label className="lg:text-base text-md text-white/90 font-sans font-semibold mt-2 -mb-4">
                              *Upload SEC/DTI Permit
                           </label>
                           <div id="field-DTISecDocument">
                              <DragDropUpload
                                 name="DTISecDocument"
                                 value={entry?.DTISecDocument || null}
                                 onChange={(file) => handleOnChange("DTISecDocument", file)}
                                 placeholder={`Upload SEC/DTI Permit`}
                                 helperText="(PDF, JPG, or PNG)"
                                 accept=".pdf,.jpg,.jpeg,.png"
                                 className="mt-6"
                              />
                              {showError("DTISecDocument") && (
                                 <p className="text-red-200 text-xs mt-2">{errors.DTISecDocument}</p>
                              )}
                           </div>
                        </>
                     )}
                  </div>
               </div>

               {/* Bid Submission */}
               <div className="rounded-2xl border-green-900/20 bg-amber-100/10 border p-5 flex flex-col gap-5 mt-4">
                  <p className="text-white/90 lg:text-lg font-semibold">Bid Submission</p>

                  <div className="flex flex-col gap-2">
                     <div id="field-projectTitle" className="flex flex-col gap-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Title of the Project/Program Initiative
                        </label>
                        <input
                           type="text"
                           maxLength={100}
                           value={entry?.projectTitle || ""}
                           onChange={(e) => handleOnChange("projectTitle", e.target.value)}
                           className={fieldClass("projectTitle")}
                        />
                        {showError("projectTitle") && <p className="text-red-200 text-xs">{errors.projectTitle}</p>}
                     </div>

                     <div id="field-projectDescription" className="flex flex-col gap-2 mt-1">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Brief Project Description <span className="text-white/50 text-sm">(200-300 words)</span>
                        </label>
                        <textarea
                           maxLength={300}
                           rows={8}
                           className={
                              showError("projectDescription")
                                 ? "bg-white/10 border border-red-400/70 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                                 : "bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white resize-none"
                           }
                           value={entry?.projectDescription || ""}
                           onChange={(e) => handleOnChange("projectDescription", e.target.value)}
                        />
                        {showError("projectDescription") && (
                           <p className="text-red-200 text-xs">{errors.projectDescription}</p>
                        )}
                     </div>

                     <label className="lg:text-base text-md text-white/90 font-sans font-semibold mt-2 -mb-2">
                        *Upload Key Visual
                     </label>
                     <div id="field-keyVisual">
                        <DragDropUpload
                           name="keyVisual"
                           value={entry?.keyVisual}
                           uploadIcon={<ImageUp size={34} className="text-white/50" />}
                           accept=".jpg,.png"
                           onChange={(file) => handleOnChange("keyVisual", file)}
                           placeholder={`Upload Key Visual`}
                           helperText="(recommended size: 1920 × 1080 px, JPG, or PNG)"
                           className="mt-4"
                        />
                        {showError("keyVisual") && <p className="text-red-200 text-xs mt-2">{errors.keyVisual}</p>}
                     </div>

                     <span className="text-white/80 max-w-3xl text-justify text-[13px] italic">
                        (Please upload a single image or graphic that best represents your initiative. This may be a logo, main
                        photo, or poster used for the project. The key visual will be used in Green Guardian Awards materials
                        and presentations. Kindly provide a high-resolution file.)
                     </span>

                     <div className="flex justify-between items-center mt-3 -mb-1">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">*Upload Bid Document</label>
                        <span className="relative group flex items-center">
                           {!bidDocumentTemplate && (
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition rounded-md bg-white px-3 py-1 text-xs text-black/80 whitespace-nowrap">
                                 Please select award category
                              </span>
                           )}

                           <a
                              href={bidDocumentTemplate ? `/api/download/${encodeURIComponent(bidDocumentTemplate)}` : undefined}
                              className={[
                                 "min-w-44 flex items-center gap-2 rounded-xl border border-white/10 py-2 lg:px-3 px-2 text-sm font-semibold transition",
                                 bidDocumentTemplate
                                    ? "bg-white/20 hover:bg-white/30 cursor-pointer text-white/90"
                                    : "bg-white/10 text-white/40 cursor-not-allowed pointer-events-none",
                              ].join(" ")}
                              aria-disabled={!bidDocumentTemplate}
                           >
                              <FileDown
                                 size={18}
                                 className={bidDocumentTemplate ? "text-white/70" : "text-white/30"}
                              />
                              Download Template
                           </a>
                        </span>
                     </div>

                     <div id="field-bidDocument">
                        <DragDropUpload
                           name="bidDocument"
                           value={entry?.bidDocument}
                           accept=".pdf"
                           onChange={(file) => handleOnChange("bidDocument", file)}
                           placeholder={`Upload Bid Document`}
                           helperText="(PDF)"
                           className="mt-4"
                        />
                        {showError("bidDocument") && <p className="text-red-200 text-xs mt-2">{errors.bidDocument}</p>}
                     </div>

                     <div className="flex justify-between items-center mt-3 -mb-1">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           *Upload Project Documentation
                        </label>
                        <a
                           href={`/api/download/${encodeURIComponent(projectDocumentationTemplate)}`}
                           className="min-w-44 flex items-center gap-2 rounded-xl border border-white/10 bg-white/20 hover:bg-white/30 py-2 lg:px-3 px-2 cursor-pointer text-white/90 text-sm font-semibold"
                        >
                           <FileDown size={18} className="inline-block text-white/70" />
                           Download Template
                        </a>
                     </div>

                     <div id="field-projectDocument">
                        <DragDropUpload
                           name="projectDocument"
                           value={entry?.projectDocument}
                           accept=".pdf"
                           onChange={(file) => handleOnChange("projectDocument", file)}
                           placeholder={`Upload Project Documentation`}
                           helperText="(PDF)"
                           className="mt-4"
                        />
                        {showError("projectDocument") && (
                           <p className="text-red-200 text-xs mt-2">{errors.projectDocument}</p>
                        )}
                     </div>

                     <label className="lg:text-base text-md text-white/90 font-sans font-semibold my-2">
                        *Upload Supporting Document(s)
                     </label>

                     <div id="field-supportingDocument">
                        <DragDropUpload
                           name="supportingDocument"
                           value={entry?.supportingDocument}
                           accept=".pdf, .ppt, .jpg, .png"
                           onChange={(file) => handleOnChange("supportingDocument", file)}
                           multiple={true}
                           placeholder={`Upload Supporting Document`}
                           helperText="(PDF, PPT, JPG, or PNG) - you may upload multiple files"
                        />
                        {showError("supportingDocument") && (
                           <p className="text-red-200 text-xs mt-2">{errors.supportingDocument}</p>
                        )}
                     </div>

                     <span className="text-white/80 max-w-3xl text-[13px] text-justify italic">
                        (Upload any documents that verify your initiative and demonstrate its implementation and impact. These
                        may include: Certificates, permits, or clearances from relevant government agencies, Program reports or
                        monitoring data showing results and outcomes, MOUs, participation logs, or testimonials, Official
                        resolutions or ordinances authorizing or supporting the initiative, Any other relevant documentation.)
                     </span>

                     <div className="flex flex-col gap-2 mt-2">
                        <label className="lg:text-base text-md text-white/90 font-sans font-semibold">
                           Video <span className="text-white/50 text-sm ml-1">(Google Drive or YouTube link)</span>
                        </label>
                        <input
                           type="text"
                           value={entry?.videoLink || ""}
                           onChange={(e) => handleOnChange("videoLink", e.target.value)}
                           className="bg-white/10 border border-white/20 rounded-lg p-2 text-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <span className="text-white/80 text-[13px] italic">
                           If from Google Drive, please make sure the link can be accessed by everyone.
                        </span>
                     </div>
                  </div>
               </div>

               {/* Consents */}
               <div id="field-infoCertified">
                  <label className="flex flex-col rounded-2xl bg-amber-100/10 border-green-900/20 px-5 py-6 -mt-2">
                     <div className="flex items-start gap-3">
                        <input
                           type="checkbox"
                           className="h-4 w-4 rounded"
                           checked={infoCertified}
                           onChange={(e) => {
                              setInfoCertified(e.target.checked);
                              setErrors((prev) => {
                                 const next = { ...prev };
                                 delete next.infoCertified;
                                 return next;
                              });
                           }}
                        />
                        <div>
                           <p className="text-sm font-semibold max-w-3xl text-white uppercase">
                              *I certify that all information provided is accurate and that the Awards Secretariat may verify the
                              submitted information through document review, interviews, or site inspection.
                           </p>
                           {showError("infoCertified") && (
                              <p className="text-red-200 text-xs mt-1">{errors.infoCertified}</p>
                           )}
                        </div>
                     </div>

                     <div className="flex items-start gap-3 mt-2" id="field-termsAccepted">
                        <input
                           type="checkbox"
                           className="h-4 w-4 rounded"
                           checked={termsAccepted}
                           onChange={(e) => {
                              setTermsAccepted(e.target.checked);
                              setErrors((prev) => {
                                 const next = { ...prev };
                                 delete next.termsAccepted;
                                 return next;
                              });
                           }}
                        />
                        <div>
                           <p className="text-sm text-white uppercase font-semibold">
                              *I Consent to Have Daily Guardian Use the Information Provided for Awards Documentation.
                           </p>
                           {showError("termsAccepted") && (
                              <p className="text-red-200 text-xs mt-1">{errors.termsAccepted}</p>
                           )}
                        </div>
                     </div>

                     {/* If they somehow try submit without modal */}
                     {showError("dataPrivacyConcerns") && (
                        <div className="mt-2" id="field-dataPrivacyConcerns">
                           <p className="text-red-200 text-xs">{errors.dataPrivacyConcerns}</p>
                        </div>
                     )}
                  </label>
               </div>

               {/* Submit */}
               <div className="flex flex-col items-center justify-center mt-5">
                  <button
                     type="submit"
                     className="font-bold text-md w-full max-w-md inline-flex items-center justify-center rounded-xl bg-linear-to-r from-white/70 to-white/80 px-20 py-3.5  text-gray-600/50 transition enabled:hover:text-white enabled:hover:from-yellow-600 enabled:hover:to-yellow-400 uppercase cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? "Submitting..." : "Submit Entry"}
                  </button>

                  <p className="text-white/40 text-center px-8 text-sm mt-2 italic">
                     You will be receiving a confirmation email shortly after submission.
                  </p>
               </div>
            </div>
         </form>

         {submissionCompleted && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/90">
               <div className="flex flex-col items-center lg:w-[30%] w-[90%] bg-green-100/90 rounded-2xl py-20 shadow-lg gap-4">
                  <CircleCheck height={50} width={50} color="#18ad31" />
                  <h3 className="text-2xl font-bold text-neutral-700 text-center uppercase mb-2">Success!</h3>
                  <p className="text-neutral-700 mb-8 text-center font-sans text-base px-10">
                     Thank you for your submission to the Green Guardian Awards. A confirmation email has been sent to your
                     provided email address.
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
          background: radial-gradient(ellipse at bottom left, #8fc73f 0%, #1f5238 60%);
        }
      `}</style>

         <div className="pt-40">
            <FooterSection />
         </div>
      </div>
   );
}
