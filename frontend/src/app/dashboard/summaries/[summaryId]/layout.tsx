import { extractYouTubeID } from "@/lib/utils";
import { getSummaryById } from "@/data/loaders";
import ClientYouTubePlayer from "@/components/custom/client-youtube-player";

export default async function SummarySingleRoute({
  params,
  children,
}: {
  readonly params: any;
  readonly children: React.ReactNode;
}) {
  const data = await getSummaryById(params.summaryId);
  if (data?.error?.status === 404) return <p>No Items Found</p>;
  const videoId = extractYouTubeID(data.data.videoId);
  return (
    <div>
      <div className="h-full grid gap-4 grid-cols-5 p-4">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <div>
            <ClientYouTubePlayer videoId={videoId} />
          </div>
        </div>
      </div>
    </div>
  );
}
