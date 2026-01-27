'use client';

import Image from 'next/image';
import { Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Bid } from '@/app/data/mockBids';
import { useRouter } from 'next/navigation';

export default function BidCard({ bid }: { bid: Bid }) {
  const router = useRouter();
  const isPending = bid.status === 'Pending';

  const statusConfig = isPending
    ? {
      style: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      icon: Clock,
    }
    : {
      style: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      icon: CheckCircle,
    };

  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={() => router.push(`/dashboard/bids/${bid.id}`)}
      className="group relative flex cursor-pointer items-center justify-between rounded-xl border border-transparent bg-white p-5 shadow-sm transition-all hover:border-green-100 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-100 shadow-sm">
          <Image
            src={bid.image}
            alt={bid.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-green-700">
            {bid.title}
          </h3>
          <p className="text-sm font-medium text-gray-500">
            {bid.organization}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-gray-100 px-2 py-1 font-medium text-gray-600">
              {bid.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">
              Submitted: {bid.submittedAt}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${statusConfig.style}`}
        >
          <StatusIcon size={16} />
          {bid.status}
        </span>

        <ChevronRight className="hidden h-5 w-5 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
      </div>
    </div>
  );
}
