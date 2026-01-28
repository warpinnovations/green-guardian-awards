import BidView from "@/app/components/BidView";
import { getAssignedBids } from "@/app/lib/assignedBids";
import { Bid } from "@/app/types/bid";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  // fetch assigned bids
  const assignedBids: Bid[] = await getAssignedBids();

  // find the bid with the matching id
  const bid = assignedBids.find((b) => b.id === id);

  if (!bid) return <div className="p-6">Bid not found</div>;

  return <BidView bid={bid} />;
}