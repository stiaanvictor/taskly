import { ArrowRightFromLine, Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../components/LeftSidebar";
import AllTasksSection from "../components/AllTasksSection";
import ViewTask from "../components/ViewTask";
import FloatingNewTaskButton from "../components/FloatingNewTaskButton";

export default function Home() {
  const { openSidebar } = useSidebar();

  return (
    <div className="min-h-dvh bg-gray-100 px-3 py-3 pb-32 dark:bg-[#0a0f1c] lg:mt-16">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <div className="flex">
        <LeftSidebar />
        <AllTasksSection />
      </div>

      <ViewTask />
      <FloatingNewTaskButton />
    </div>
  );
}
