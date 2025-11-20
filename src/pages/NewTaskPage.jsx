import { Menu } from "lucide-react";
import LeftSidebar from "../components/LeftSidebar";
import NewTaskForm from "../components/NewTaskForm";
import { useSidebar } from "../context/SidebarContext";

function NewTaskPage() {
  const { openSidebar } = useSidebar();
  return (
    <div className="min-h-dvh bg-gray-100 px-3 py-3 pb-32">
      <Menu size={32} onClick={openSidebar} className="text-primary" />

      <LeftSidebar />

      <div className="mt-4">
        <NewTaskForm />
      </div>
    </div>
  );
}

export default NewTaskPage;
