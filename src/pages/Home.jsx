import { ArrowRightFromLine, Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../components/LeftSidebar";
import AllTasksSection from "../components/AllTasksSection";
import ViewTask from "../components/ViewTask";
import FloatingNewTaskButton from "../components/FloatingNewTaskButton";

export default function Home() {
  const { openSidebar } = useSidebar();

  return (
    <div className="min-h-dvh bg-gray-100 px-2 py-2 pb-32">
      <Menu size={32} onClick={openSidebar} className="text-primary" />

      <LeftSidebar />

      <ViewTask />

      <AllTasksSection />

      <FloatingNewTaskButton />
    </div>
  );
}
