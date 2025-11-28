import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../components/LeftSidebar";
import CategoriesSection from "../components/CategoriesSection";
import { useEffect, useState } from "react";
import { getUserCategories } from "../firebase/category.service";
import { useUser } from "../context/UserContext";
import { getTasksForUser } from "../firebase/task.service";

function CategoriesPage() {
  const { openSidebar } = useSidebar();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    getUserCategories(user.uid, (fetchedCategories) => {
      setCategories(fetchedCategories);
    });

    getTasksForUser(user.uid, (fetchedTasks) => {
      setTasks(fetchedTasks);
    });
  }, [user]);

  return (
    <div className="min-h-dvh bg-gray-100 px-2 py-2 pb-32 dark:bg-[#0a0f1c] lg:mt-16 lg:px-0 lg:py-4">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <div className="flex">
        <LeftSidebar />
        <CategoriesSection tasks={tasks} categories={categories} />
      </div>
    </div>
  );
}

export default CategoriesPage;
