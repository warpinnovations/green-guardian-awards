"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

type FAQ = {
  question: string;
  answer: {
    main?: string;
    sub?: string[];
  }[];
};

const faqs: FAQ[] = [
  {
    question: "What are the Green Guardian Awards?",
    answer: [
      {
        main: "The Green Guardian Awards is an environmental recognition program that celebrates outstanding sustainability initiatives by Local Government Units (LGUs) and businesses in the Province of Iloilo. It highlights ecological innovation, climate resilience, and community-centered environmental stewardship.",
      },
    ],
  },
  {
    question: "Who can join the awards?",
    answer: [
      {
        main: "Eligible participants include:",
        sub: [
          "LGUs within the Province of Iloilo — municipalities, the highly urbanized city (HUC), and the component city.",
          "Businesses located in Iloilo Province and Iloilo City, including MSMEs (minimum 2 years of operation) and large corporations (minimum 5 years of operation)",
        ],
      },
    ],
  },
  {
    question: "Can one LGU or business submit multiple entries?",
    answer: [
      {
        sub: [
          "Each LGU or business may submit only one (1) project per award category.",
          "A project cannot be entered in multiple categories.",
        ],
      },
    ],
  },
  {
    question: "Can we submit a project that has already won another award?",
    answer: [
      {
        main: "No. Entries must not have received recognition from any regional, national, or international award-giving body to ensure fairness and highlight fresh initiatives.",
      },
    ],
  },
  {
    question: "Who will evaluate the entries?",
    answer: [
      {
        main: "Entries will be reviewed by a panel of experts composed of representatives from:",
        sub: [
          "Environmental agencies",
          "Academic institutions",
          "Civil society organizations",
          "Technical specialists in relevant fields",
        ],
      },
    ],
  },
  {
    question: "When will winners be announced?",
    answer: [
      {
        main: "Finalists and winners will be announced during the 25th Anniversary Culmination Event of the Daily Guardian, featuring the Green Guardian Awards Ceremony.",
      },
    ],
  },
  {
    question: "What are the evaluation criteria for the Green Guardian Awards?",
    answer: [
      {
        main: "Entries will be evaluated based on the following:",
        sub: [
          "Impact – 40 %",
          "Sustainability & Replicability – 25 %",
          "Community Engagement & Inclusivity – 20 %",
          "Innovation & Creativity – 15 %",
        ],
      },
    ],
  },
];

function FAQAnswer({ answer }: { answer: FAQ["answer"] }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-white/90">
      {answer.map((block, i) => (
        <div key={i} className="space-y-2 mb-3">
          {block.main ? <p>{block.main}</p> : null}
          {block.sub?.length ? (
            <ul className="list-disc pl-5 space-y-1">
              {block.sub.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#f3d107] bg-[#f3d107]/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 lg:px-5 p-3 lg:py-4 text-left cursor-pointer"
      >
        <span className="font-semibold text-white">{faq.question}</span>

        <ChevronDown size={20} color="#ffff" />
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden px-5">
          {isOpen ? <FAQAnswer answer={faq.answer} /> : null}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section id="top" className="flex relative min-h-screen lg:pb-10 lg:pt-32 py-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_3fr] items-center relative z-10 mx-auto w-full lg:px-20 px-4 lg:gap-10">
        <h2 className="lg:text-5xl text-2xl lg:text-start text-center font-bold text-white lg:-mt-20 lg:mb-8 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="rounded-2xl h-full w-full">
          <div className="space-y-3 overflow-auto h-full">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === idx}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === idx ? null : idx))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
