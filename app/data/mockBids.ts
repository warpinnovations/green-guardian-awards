export type BidStatus = "Pending" | "Completed";

export type BidCategory =
    | "Local Government Units (LGUs)"
    | "MSMEs / Large Corporations";

export interface Bid {
    id: string;
    title: string;
    organization: string;
    category: BidCategory;
    submittedAt: string;
    status: BidStatus;
    image: string;
    keyVisual?: string;
    projectVideo?: string;
    bidDocument?: string;
    supportingDocuments?: string;
    description: string;
}

export const mockBids: Bid[] = [
    {
        id: "1",
        title: "Manila Bay Coastal Cleanup Initiative",
        organization: "Manila City LGU",
        category: "Local Government Units (LGUs)",
        submittedAt: "January 5, 2026",
        status: "Pending",
        image: "/logos/manila-lgu.png",
        keyVisual: "/key_visuals/cleanup.png",
        projectVideo: "https://youtu.be/XsvT8nitV8Q",
        bidDocument: "/pdfs/cleanup_proposal.pdf",
        supportingDocuments: "/pdfs/cleanup_supporting.pdf",
        description:
            "A program to clean and restore Manila Bay coastal areas through waste removal, community engagement, and long-term monitoring.",
    },

    {
        id: "2",
        title: "Mangrove Reforestation Program",
        organization: "Coastal Protection Alliance",
        category: "MSMEs / Large Corporations",
        submittedAt: "January 8, 2026",
        status: "Pending",
        image: "/images/mangrove.jpg",
        keyVisual: "/key_visuals/mangrove.png",
        projectVideo:
            "https://drive.google.com/drive/folders/14y_ygWCIJpkChRCurmvkI87cbkJX5hfm",
        bidDocument: "/pdfs/mangrove_proposal.pdf",
        supportingDocuments: "/pdfs/mangrove_supporting.pdf",
        description:
            "Planting mangroves in vulnerable coastal zones to prevent erosion, improve biodiversity, and support fisherfolk livelihoods.",
    },

    {
        id: "3",
        title: "Zero-Waste Barangay Program",
        organization: "Quezon City LGU",
        category: "Local Government Units (LGUs)",
        submittedAt: "January 10, 2026",
        status: "Pending",
        image: "/logos/qc-lgu.png",
        keyVisual: "/key_visuals/zero-waste.png",
        projectVideo: "https://youtu.be/dQw4w9WgXcQ",
        bidDocument: "/pdfs/zero_waste_proposal.pdf",
        supportingDocuments: "/pdfs/zero_waste_supporting.pdf",
        description:
            "A barangay-level zero-waste initiative focusing on segregation, composting, and reduction of single-use plastics.",
    },

    {
        id: "4",
        title: "Solar-Powered Public School Buildings",
        organization: "Department of Education – Region IV",
        category: "Local Government Units (LGUs)",
        submittedAt: "January 12, 2026",
        status: "Pending",
        image: "/logos/deped.png",
        keyVisual: "/key_visuals/solar-school.png",
        projectVideo: "https://youtu.be/5qap5aO4i9A",
        bidDocument: "/pdfs/solar_school_proposal.pdf",
        description:
            "Installation of solar panels in public school buildings to reduce energy costs and promote renewable energy awareness.",
    },

    {
        id: "5",
        title: "Plastic-to-Eco-Bricks Manufacturing",
        organization: "GreenBuild Solutions Inc.",
        category: "MSMEs / Large Corporations",
        submittedAt: "January 14, 2026",
        status: "Pending",
        image: "/logos/greenbuild.png",
        keyVisual: "/key_visuals/ecobricks.png",
        projectVideo: "https://youtu.be/9bZkp7q19f0",
        bidDocument: "/pdfs/ecobrick_proposal.pdf",
        supportingDocuments: "/pdfs/ecobrick_supporting.pdf",
        description:
            "Transforming non-recyclable plastic waste into durable eco-bricks for low-cost housing and infrastructure projects.",
    },

    {
        id: "6",
        title: "Urban Tree Canopy Expansion",
        organization: "Pasig City LGU",
        category: "Local Government Units (LGUs)",
        submittedAt: "January 16, 2026",
        status: "Pending",
        image: "/logos/pasig-lgu.png",
        keyVisual: "/key_visuals/urban-trees.png",
        projectVideo: "https://youtu.be/l482T0yNkeo",
        bidDocument: "/pdfs/tree_canopy_proposal.pdf",
        description:
            "A city-wide effort to expand tree canopies in urban areas to combat heat, improve air quality, and enhance public spaces.",
    },

    {
        id: "7",
        title: "Wastewater Recycling for Industrial Use",
        organization: "AquaRenew Technologies",
        category: "MSMEs / Large Corporations",
        submittedAt: "January 18, 2026",
        status: "Pending",
        image: "/logos/aquarenew.png",
        keyVisual: "/key_visuals/water-reuse.png",
        projectVideo: "https://youtu.be/kJQP7kiw5Fk",
        bidDocument: "/pdfs/wastewater_proposal.pdf",
        description:
            "Advanced wastewater treatment and recycling systems designed to reduce freshwater consumption in industrial facilities.",
    },
];
