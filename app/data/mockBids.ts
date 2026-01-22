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
    },
    {
        id: '2',
        title: 'Mangrove Reforestation Program',
        organization: 'Coastal Protection Alliance',
        category: 'MSMEs / Large Corporations',
        submittedAt: 'January 8, 2026',
        status: 'Pending',
        image: '/images/mangrove.jpg',
    },
    {
        id: '3',
        title: 'Solar-Powered Manufacturing Upgrade',
        organization: 'GreenTech Industries',
        category: 'MSMEs / Large Corporations',
        submittedAt: 'January 12, 2026',
        status: 'Completed',
        image: '/images/solar-factory.jpg',
    },
    {
        id: '4',
        title: 'Zero-Waste Public Market Program',
        organization: 'Iloilo City LGU',
        category: 'Local Government Units (LGUs)',
        submittedAt: 'January 15, 2026',
        status: 'Completed',
        image: '/logos/iloilo-lgu.png',
    },
];
