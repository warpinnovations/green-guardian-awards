import Image from "next/image";

interface NominationCardProps {
   title: string;
   description: string;
   imgSrc: string;
   onClick: () => void;
   className?: string;
}

export function NominationCard(props: NominationCardProps) {
   return (
      <div
         className={`h-full bg-white/10 rounded-2xl shadow-sm hover:shadow-md transition hover:bg-yellow-100/15 ${props.className}`}
      >
         <div className="py-8 px-8 flex flex-col h-full">
            <div className="flex justify-between items-center">
               <h4 className="text-[28px] font-semibold text-white/90">
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
            <p className="text-[15px] text-white/60 grow my-5">
               {props.description}
            </p>
            <button onClick={props.onClick} className="font-bold w-full inline-flex items-center justify-center mt-2 rounded-xl bg-linear-to-r from-green-100/10 to-green-100/20 px-4 py-2.5 text-sm text-white transition hover:from-yellow-600 hover:to-yellow-400 uppercase cursor-pointer">
               Nominate
            </button>
         </div>
      </div>
   );
}
