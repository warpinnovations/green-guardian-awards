"use client";

import { useState } from "react";
import Image from "next/image";
import Background from "../../../public/YellowGreenBG.png";
import LGUAsset from "../../../public/lgu.png";
import MSMEAsset from "../../../public/msme.png";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CategoriesSection() {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const lguCategories = [
    {
      id: 1,
      title: "The Community-Led Ecological Stewardship Award",
      description: "This award recognizes an LGU project that have effectively empowered and mobilized their constituents as active partners in environmental protection. It honors an initiative that is co-created, co-implemented, and sustained by the community, rather than solely designed and driven by the local government. e.g. Community-managed Material Recovery Facilities (MRFs), Sustained community gardens supporting food security, Citizen-led river, coastal, or watershed clean-up programs, Community-based environmental monitoring or enforcement groups"
    },
    {
      id: 2,
      title: "The Circular Economy and Waste Management Excellence Award",
      description: "This award honors an LGU program or project that demonstrates innovation and effectiveness in solid waste management, moving beyond basic collection toward waste reduction, reuse, recycling, and circular economy practices. e.g. High waste diversion or recycling projects, Composting and recycling systems, Partnerships with private sector or MSMEs for waste upcycling, Programs reducing or eliminating single-use plastics"},
    {
      id: 3,
      title: "The Green Infrastructure and Climate Action Award",
      description: "This award recognizes LGUs that have integrated climate-resilient and environmentally sustainable solutions into urban or rural planning to address climate risks while improving environmental quality and community well-being. e.g. Protected bike lanes and pedestrian-friendly public spaces, Urban green belts, pocket parks, or mini-forests, Adoption of renewable energy in public facilities, Nature-based flood mitigation initiatives such as rain gardens or mangrove restoration"}
  ];
  const msmeCategories = [
    { id: 1, title: "Sustainable Operations Excellence Award", description: "This award recognizes a business that has systematically integrated sustainability into its core operations, demonstrating measurable improvements in resource efficiency, responsible sourcing, and environmental management across its value chain. e.g. Significant reductions in energy and water consumption, Achieving zero-waste-to-landfill or near-zero waste operations, Ethical and sustainable sourcing of raw materials, Transition to environmentally responsible or low-carbon supply chains" },
    { id: 2, title: "Green Product/Service Innovation Award", description: "This award honors a business whose primary product or service delivers a direct environmental benefit, offering practical and innovative solutions to environmental challenges through its core business model. e.g. Development or production of biodegradable or eco-friendly packaging, Organic, regenerative, or climate-smart agricultural products, Sustainable tourism services that promote conservation and local livelihoods, Clean energy, energy-efficiency, or environmental technology solutions" },
    { id: 3, title: "Community Engagement for Environmental Impact Award", description: "This award recognizes a business that goes beyond traditional corporate social responsibility by actively partnering with communities to drive sustained environmental action, capacity-building, and shared environmental stewardship. e.g. Training and supporting communities to establish environmental enterprises (e.g., waste-to-craft or recycling livelihoods), Long-term environmental education programs in public schools, Adoption, rehabilitation, and stewardship of public spaces" },
  ];

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => ({
      [id]: !prev[id]
    }));
  };

  return (
    <section id="top" className="flex relative min-h-screen overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src={Background}
          alt=""
          fill
          priority
         className="object-cover blur-xs scale-x-125"
        />
      <div className="absolute inset-0 bg-black/3"/>
      </div>
      <div className="relative z-10 mx-auto lg:max-w-7xl lg:px-8 px-4 lg:py-10 py-5">
        <h1 className="font-alviona lg:text-[55px] text-3xl text-white text-center tracking-wide">
          AWARD CATEGORIES
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          {/* LEFT column */}
          <div className="flex flex-col lg:items-center lg:gap-4 gap-2">
            <div className="flex items-center gap-4">
              <Image
                src={LGUAsset}
                alt="Local Government Units"
                width={60}
                height={20}
                className="object-contain"
              />
              <p className="font-roboto font-semibold text-lg lg:text-2xl text-white">
                Local Government Units
              </p>
            </div>
            <div className="flex flex-col gap-3 my-8">
              {lguCategories.map((category) => (
                <div key={`left-${category.id}`} className="lg:space-y-4 space-y-2">
                  <button
                    onClick={() => toggleDropdown(`left-${category.id}`)}
                    className="cursor-pointer w-full lg:rounded-3xl border rounded-2xl border-white/70 px-6 py-3 text-left text-base text-white bg-white/10 hover:bg-white/20 transition flex items-center justify-between gap-2"
                  >
                    <span className="font-semibold lg:text-base text-md">{category.title}</span>
                    {openDropdowns[`left-${category.id}`] ? (
                      <ChevronUp className="w-5 h-5 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns[`left-${category.id}`]
                        ? 'lg:max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                      <p className="text-white leading-relaxed lg:text-md text-sm">
                        {category.description.split(" e.g. ").map((part, i) => (
                          <span key={i}>
                            {i === 1 && <><br /><br /><strong>e.g.</strong> </>}
                            {part}
                          </span>
                        ))}
                      </p>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col lg:items-center lg:mt-0 -mt-8 lg:gap-4 gap-2">
            <div className="flex items-center gap-4">
              <Image
                src={MSMEAsset}
                alt="MSMEs and Large Corporations"
                width={60}
                height={20}
                className="object-contain"
              />
              <p className="font-roboto font-semibold text-lg lg:text-2xl text-white">
                MSMEs and Large Corporations
              </p>
            </div>
            <div className="flex flex-col gap-3 my-8">
              {msmeCategories.map((category) => (
                <div key={`right-${category.id}`} className="lg:space-y-4 space-y-2">
                  <button
                    onClick={() => toggleDropdown(`right-${category.id}`)}
                    className="cursor-pointer w-full lg:rounded-3xl border rounded-2xl border-white/70 px-6 py-3 text-left text-base text-white bg-white/10 hover:bg-white/20 transition flex items-center justify-between gap-2"
                  >
                    <span className="font-semibold lg:text-base text-md">{category.title}</span>
                    {openDropdowns[`right-${category.id}`] ? (
                      <ChevronUp className="w-5 h-5 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdowns[`right-${category.id}`]
                        ? 'lg:max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                      <p className="text-white leading-relaxed text-md">
                        {category.description.split(" e.g. ").map((part, i) => (
                          <span key={i}>
                            {i === 1 && <><br /><br /><strong>e.g.</strong> </>}
                            {part}
                          </span>
                        ))}
                      </p>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}