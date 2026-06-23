import EvaluatorScoresheet from "@/app/components/EvaluatorScoresheet";

export default async function Page({
    params,
}: {
    params: Promise<{ bidId: string }>;
}) {
    const { bidId } = await params;
    return <EvaluatorScoresheet params={{ bidId }} />;
}
