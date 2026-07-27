import GroupPage from "@/components/GroupPage/GroupPage";
import { content as btsGeneralContent } from "@/content/groups/bts/general";

export default function GroupBts() {
  return (
    <main className="min-h-screen bg-ink">
      <GroupPage content={btsGeneralContent} />
    </main>
  );
}
