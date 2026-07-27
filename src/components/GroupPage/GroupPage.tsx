import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/canvas";
import ScaleStage from "@/components/ScaleStage";
import NavBar from "@/components/MainScreen/NavBar/NavBar";
import Timeline from "@/components/MainScreen/Timeline/Timeline";
import GroupDetailPanel from "./GroupDetailPanel/GroupDetailPanel";
import { content as newJeansGeneralContent } from "@/content/groups/newjeans/general";
import type { GroupGeneralContent } from "./shared/types";

type GroupPageProps = {
  content?: GroupGeneralContent;
};

export default function GroupPage({ content = newJeansGeneralContent }: GroupPageProps) {
  return (
    <ScaleStage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <div className="relative size-full bg-ink">
        <NavBar />
        <Timeline />
        <GroupDetailPanel content={content} />
      </div>
    </ScaleStage>
  );
}
