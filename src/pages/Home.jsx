import { ArrowRightFromLine, Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../component/LeftSidebar";
import AllTasksSection from "../component/AllTasksSection";
import ViewTask from "../component/ViewTask";

export default function Home() {
  const { openSidebar } = useSidebar();

  return (
    <div className="px-2 py-2 bg-gray-100 min-h-dvh">
      <Menu size={32} onClick={openSidebar} className="text-primary" />

      <LeftSidebar />

      <ViewTask />

      <AllTasksSection />
    </div>
  );
}
