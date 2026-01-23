export type BidStatus = 'Pending' | 'Completed';

export type BidCategory = 'Local Government Units (LGUs)' | 'MSMEs / Large Corporations';

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
    bidDocument?: string;        // PDF of main bid/proposal
    supportingDocuments?: string; // PDF of extra supporting files
    description: string;
}

export const mockBids: Bid[] = [
    {
        id: '1',
        title: 'Manila Bay Coastal Cleanup Initiative',
        organization: 'Manila City LGU',
        category: 'Local Government Units (LGUs)',
        submittedAt: 'January 5, 2026',
        status: 'Pending',
        image: '/logos/manila-lgu.png',
        keyVisual: '/key_visuals/cleanup.png',
        projectVideo: 'https://youtu.be/XsvT8nitV8Q?si=7fvtJelFo56QlZnR',
        bidDocument: '/pdfs/cleanup_proposal.pdf',
        supportingDocuments: '/pdfs/cleanup_supporting.pdf',
        description: 'A program to clean and restore Manila Bay coastal areas.'
    },
    {
        id: '2',
        title: 'Mangrove Reforestation Program',
        organization: 'Coastal Protection Alliance',
        category: 'MSMEs / Large Corporations',
        submittedAt: 'January 8, 2026',
        status: 'Pending',
        image: '/images/mangrove.jpg',
        keyVisual: '/key_visuals/mangrove.png',
        projectVideo: 'https://drive.google.com/drive/folders/14y_ygWCIJpkChRCurmvkI87cbkJX5hfm?usp=drive_link',
        bidDocument: '/pdfs/mangrove_proposal.pdf',
        supportingDocuments: '/pdfs/mangrove_supporting.pdf',
        description: 'Planting mangroves to prevent coastal erosion and protect wildlife.'
    },
];