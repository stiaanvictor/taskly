import { ArrowRightFromLine, Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../components/LeftSidebar";
import AllTasksSection from "../components/AllTasksSection";
import ViewTask from "../components/ViewTask";
import FloatingNewTaskButton from "../components/FloatingNewTaskButton";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export default function Home() {
  const { openSidebar } = useSidebar();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const dummyCategories = [
      { id: 1, name: "Personal", color: "#4CAF50" },
      { id: 2, name: "Work", color: "#2196F3" },
      { id: 3, name: "Health", color: "#E91E63" },
      { id: 4, name: "Finance", color: "#FF9800" },
    ];

    const dummyTasks = [
      {
        id: 1,
        title: "Buy groceries",
        description: "Pick up milk, eggs, and bread from the store.",
        dueDate: "2025-11-07",
        done: false,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 2,
        title: "Finish project report",
        description: "Complete and review the final report before submission.",
        dueDate: "2025-11-11",
        done: false,
        priority: "important",
        categoryId: 2,
      },
      {
        id: 3,
        title: "Call plumber",
        description: "Fix the kitchen sink leak.",
        dueDate: "2025-11-11",
        done: true,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 4,
        title: "Team meeting",
        description: "Discuss project progress and next steps with the team.",
        dueDate: "2025-11-15",
        done: false,
        priority: "important",
        categoryId: 2,
      },
      {
        id: 5,
        title: "Doctor appointment",
        description: "Routine checkup at the clinic.",
        dueDate: "2025-11-15",
        done: true,
        priority: "none",
        categoryId: 3,
      },
      {
        id: 6,
        title: "Submit tax documents",
        description: "Upload all required tax forms before the deadline.",
        dueDate: "2025-11-24",
        done: false,
        priority: "important",
        categoryId: 4,
      },
      {
        id: 7,
        title: "Clean garage",
        description: "Organize tools and sweep the floor.",
        dueDate: "2025-11-24",
        done: true,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 8,
        title: "Read new book",
        description: "Start reading the book bought last week.",
        dueDate: "2025-12-01",
        done: false,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 9,
        title: "HI",
        description: "hello?",
        dueDate: "2025-12-04",
        done: false,
        priority: "important",
        categoryId: 4,
      },
    ];

    setCategories(dummyCategories);
    setTasks(dummyTasks);
  }, []);

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

      <ViewTask />
      <FloatingNewTaskButton />
    </div>
  );
}
