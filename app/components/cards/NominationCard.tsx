import Image from "next/image";
import CollapsibleText from "../CollapsibleText";

interface NominationCardProps {
   title: string;
   type: string;
   imgSrc: string;
   onClick: () => void;
   className?: string;
}

export function NominationCard(props: NominationCardProps) {
   return (
      <div
         className={`flex-1 h-full bg-white/10 rounded-2xl shadow-xs transition hover:bg-yellow-100/10 ${props.className}`}
      >
         <div className="lg:py-8 lg:px-8 p-4.5 flex flex-col h-full">
            <div className="flex justify-between items-center gap-6">
               <h4 className="lg:text-[24px] text-xl font-semibold text-white/90">
                  {props.title}
               </h4>
               <Image
                  src={props.imgSrc}
                  alt="icon"
                  width={60}
                  height={60}
                  className="opacity-60"
               />
            </div>
            <CollapsibleText
               title="Eligibility Criteria"
               className="mt-6 cursor-pointer"
            >
               <ul className="list-disc pl-5 space-y-2">
                  {props.type === "lgu"
                     ? lguEligibility.map((item, index) => (
                          <li className="mr-2" key={`lgu-eligibility-${index}`}>{item}</li>
                       ))
                     : msmeEligibility.map((item, index) => (
                          <li className="mr-2" key={`msme-eligibility-${index}`}>{item}</li>
                       ))}
               </ul>
            </CollapsibleText>
            <CollapsibleText title="Minimum Requirements" className="my-5">
               <ul className="list-disc pl-5 space-y-2">
                  {props.type === "lgu"
                     ? lguRequirements.map((item, index) => {
                        if (typeof item === "string") {
                           return <li className="mr-2" key={`lgu-requirement-${index}`}>{item}</li>;
                        }
                        return (
                           <li key={index}>
                              {item.text}
                              <ul className="mt-2 list-disc pl-5 marker:text-white/40">
                                 <li className="mr-2">{item.subItem}</li>
                              </ul>
                           </li>
                        );
                     })
                     : msmeRequirements.map((item, index) => (
                          <li key={`msme-requirement-${index}`}>{item}</li>
                       ))}
               </ul>
            </CollapsibleText>
            <button
               onClick={props.onClick}
               className="font-semibold w-full inline-flex items-center justify-center mt-2 rounded-xl bg-linear-to-r from-green-100/10 to-green-100/20 px-4 py-3.5 text-base text-white transition hover:from-yellow-600 hover:to-yellow-400 cursor-pointer"
            >
               Nominate Now
            </button>
         </div>
      </div>
   );
}

const lguEligibility = [
   "Must be a duly constituted LGU or barangay within the Province/City of Iloilo.",
   "Must have at least one implemented environmental or sustainability initiative aligned with the award category being applied for.",
   "The project or program must have been implemented for a minimum of six (6) months prior to nomination.",
   "The initiative must be currently active or institutionalized, not a one-time or discontinued activity.",
   "LGU must be in good standing with relevant national agencies (e.g., DENR, DILG), with no major unresolved environmental violations.",
];

const lguRequirements = [
   "Completed nomination form endorsed by the LGU head or authorized representative.",
   "Project description outlining objectives, implementation strategy, timeline, and outcomes.",
   {
      text: "Proof of implementation, such as:",
      subItem:
         "Ordinances, Executive Orders, or Resolutions (if applicable), Program Reports or Monitoring Data, Photographs or Videos of On-ground Activities, Evidence of Community Involvement (MOUs, participation records), Testimonials or Certifications from Beneficiaries.",
   },
   "Contact details of a focal person for validation and possible site inspection.",
];

const msmeEligibility = [
   "Must be a legally registered business operating in the Province/City of Iloilo.",
   "Must have been in operation for at least two (2) years.",
   "Business must be compliant with relevant environmental laws and regulations, with no major unresolved violations.",
];

const msmeRequirements = [
   "Completed nomination form signed by an authorized company representative.",
   "Business profile, including nature of business, years of operation, and scale (MSME or large enterprise).",
   "Description of the sustainability initiative, including objectives, implementation approach, and duration.",
   "Supporting documents, such as: Sustainability or CSR reports, Internal Policies, certifications, or audit summaries (if available), Photos, videos, or media features of the initiative.",
   "Proof of impact, where applicable (e.g., resource savings, waste reduction data, number of communities engaged); Community or partner endorsements, if the initiative involves external stakeholders.",
   "Designated contact person for validation, interviews, or site visits.",
];
