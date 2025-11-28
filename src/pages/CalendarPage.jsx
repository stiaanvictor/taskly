import { Menu } from "lucide-react";
import LeftSidebar from "../components/LeftSidebar";
import { useSidebar } from "../context/SidebarContext";
import MainCalendar from "../components/MainCalendar";
import { useEffect, useState } from "react";
import TasksForDateSection from "../components/TasksForDateSection";
import { getUserCategories } from "../firebase/category.service";
import { getTasksForUser } from "../firebase/task.service";
import { useUser } from "../context/UserContext";

function CalendarPage() {
  const { openSidebar } = useSidebar();
  const [date, setDate] = useState(new Date());
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
    <div className="min-h-dvh bg-gray-100 px-3 py-5 pb-32 dark:bg-[#0a0f1c] lg:mt-16 lg:py-3 lg:pl-48">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <LeftSidebar />

      <div className="lg:flex lg:gap-8 lg:pr-4">
        <div className="mt-6 lg:flex-1">
          <MainCalendar setGlobalDate={setDate} tasks={tasks} />
        </div>

        <div className="lg:w-[400px]">
          <TasksForDateSection
            date={date}
            tasks={tasks}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
