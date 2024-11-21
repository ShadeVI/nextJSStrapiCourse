import { SummaryCardForm } from "@/components/forms/SummaryCardForm";
import { getSummaryById } from "@/data/loaders";

interface ParamsProps {
  params: {
    summaryId: string;
  };
}

export default async function SummaryCardRoute({
  params,
}: Readonly<ParamsProps>) {
  const data = await getSummaryById(params.summaryId);
  console.log(data);
  return <SummaryCardForm item={data.data} />;
}
