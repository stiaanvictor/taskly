import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import LeftSidebar from "../components/LeftSidebar";
import CategoryCard from "../components/CategoryCard";
import CategoriesSection from "../components/CategoriesSection";
import { useEffect, useState } from "react";

function CategoriesPage() {
  const { openSidebar } = useSidebar();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

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
        description: "Pick up milk, eggs, and bread.",
        dueDate: "2025-11-07",
        done: false,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 2,
        title: "Finish report",
        description: "Complete final submission.",
        dueDate: "2025-11-11",
        done: false,
        priority: "important",
        categoryId: 2,
      },
      {
        id: 3,
        title: "Call plumber",
        description: "Fix sink leak.",
        dueDate: "2025-11-11",
        done: true,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 4,
        title: "Team meeting",
        description: "Discuss next steps.",
        dueDate: "2025-11-15",
        done: false,
        priority: "important",
        categoryId: 2,
      },
      {
        id: 5,
        title: "Doctor appointment",
        description: "Routine checkup.",
        dueDate: "2025-11-15",
        done: true,
        priority: "none",
        categoryId: 3,
      },
      {
        id: 6,
        title: "Submit tax documents",
        description: "Upload all forms.",
        dueDate: "2025-11-24",
        done: false,
        priority: "important",
        categoryId: 4,
      },
      {
        id: 7,
        title: "Clean garage",
        description: "Organize tools.",
        dueDate: "2025-11-24",
        done: true,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 8,
        title: "Read new book",
        description: "Start reading.",
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
