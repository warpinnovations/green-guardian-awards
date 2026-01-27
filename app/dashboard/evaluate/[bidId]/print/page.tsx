import PrintableScoresheet from "@/app/components/PrintableScoresheet";

export default async function Page({
    params,
}: {
    params: Promise<{ bidId: string }>;
}) {
    const { bidId } = await params;
    return <PrintableScoresheet bidId={bidId} />;
}
