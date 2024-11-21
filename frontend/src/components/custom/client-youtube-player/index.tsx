"use client";

import dynamic from "next/dynamic";

const YouTubePlayer = dynamic(
  () => import("@/components/custom/client-youtube-player/YoutubePlayer"),
  { ssr: false }
);

export default function ClientYouTubePlayer({
  videoId,
}: {
  videoId: string | null;
}) {
  if (!videoId) return <div>NO VIDEO PLAYER AVAILABLE</div>;
  return <YouTubePlayer videoId={videoId} />;
}
