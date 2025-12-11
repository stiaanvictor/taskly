import { Menu } from "lucide-react";
import LeftSidebar from "../components/LeftSidebar";
import NewTaskForm from "../components/NewTaskForm";
import { useSidebar } from "../context/SidebarContext";
import { useUser } from "../context/UserContext";
import { getUserCategories } from "../firebase/category.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NewTaskPage() {
  const [categories, setCategories] = useState([]);
  const { categoryId } = useParams();

  const { openSidebar } = useSidebar();
  const { user } = useUser();

  useEffect(() => {
    getUserCategories(user.uid, (fetchedCategories) => {
      setCategories(fetchedCategories);
    });
  }, [user]);

  return (
    <div className="min-h-dvh bg-gray-100 px-3 py-3 pb-32 dark:bg-[#0a0f1c] lg:mt-16 lg:px-0 lg:py-2">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <LeftSidebar />

      <div className="mt-4">
        <NewTaskForm categories={categories} categoryId={categoryId} />
      </div>
    </div>
  );
}

export default NewTaskPage;
