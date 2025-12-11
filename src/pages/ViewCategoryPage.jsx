import { useParams } from "react-router-dom";
import TasksForCategorySection from "../components/TasksForCategorySection";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import LeftSidebar from "../components/LeftSidebar";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/UserContext";
import { getUserCategories } from "../firebase/category.service";
import FloatingNewTaskButtonForCategoryButton from "../components/FloatingNewTaskForCategoryButton";

function ViewCategoryPage() {
  const { id } = useParams();
  const { openSidebar } = useSidebar();
  const { user } = useUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getUserCategories(user.uid, (fetchedCategories) => {
      setCategories(fetchedCategories);
    });
  }, [user]);

  return (
    <div className="min-h-dvh bg-gray-100 px-3 py-5 pb-32 dark:bg-[#0a0f1c] lg:mt-16 lg:py-3">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <LeftSidebar />

      <div className="mt-4">
        <TasksForCategorySection categoryId={id} categories={categories} />
      </div>

      <FloatingNewTaskButtonForCategoryButton categoryId={id} />
    </div>
  );
}

export default ViewCategoryPage;
