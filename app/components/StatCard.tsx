import { ReactNode } from 'react';

interface StatCardProps {
    title: string;
    value: number;
    icon: ReactNode;
    color: string;
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-md">
            <div>
                <p className="text-sm font-semibold text-gray-600">{title}</p>
                <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </div>
            <div className="text-4xl opacity-60">{icon}</div>
        </div>
    );
}
