'use client';

import { useParams } from 'next/navigation';
import { mockBids } from '@/app/data/mockBids';
import BidView from '@/app/components/BidView';

export default function Page() {
  const params = useParams(); // ✅ returns { id: string }
  const bid = mockBids.find((b) => b.id === params.id);

  if (!bid) return <div>Bid not found</div>;

  return <BidView bid={bid} />;
}
