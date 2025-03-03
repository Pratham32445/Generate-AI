import CreditsInfo from "@/components/CreditsInfo";
import GenerateImage from "@/components/GenerateImage";
import GenerationHistory from "@/components/GenerationHistory";
import LiveImageCount from "@/components/LiveImageCount";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50 overflow-hidden">
          <LiveImageCount />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <GenerationHistory />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50">
          <CreditsInfo />
        </div>
      </div>
      <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <GenerateImage />
      </div>
    </div>
  );
}
