import { mockBids } from "@/app/data/mockBids";
import BidView from "@/app/components/BidView";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bid = mockBids.find((b) => b.id === id);

  if (!bid) return <div className="p-6">Bid not found</div>;

  return <BidView bid={bid} />;
}
