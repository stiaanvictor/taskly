import { ArrowRightFromLine, Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../components/LeftSidebar";
import AllTasksSection from "../components/AllTasksSection";
import ViewTask from "../components/ViewTask";
import FloatingNewTaskButton from "../components/FloatingNewTaskButton";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getTasksForUser } from "../firebase/task.service";
import { getUserCategories } from "../firebase/category.service";

export default function Home() {
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
    <div className="min-h-dvh bg-gray-100 px-3 py-3 pb-32 dark:bg-[#0a0f1c] lg:mt-16">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <div className="flex">
        <LeftSidebar />
        <div className="flex-1">
          <div className="flex flex-1 justify-center">
            <h1 className="mt-2 pl-4 text-3xl text-text dark:text-white lg:hidden lg:min-w-[60rem] lg:max-w-[60rem]">
              Hello {user.displayName}
            </h1>
          </div>

          <AllTasksSection tasks={tasks} categories={categories} />
        </div>
      </div>

      <ViewTask tasks={tasks} categories={categories} />
      <FloatingNewTaskButton />
    </div>
  );
}
