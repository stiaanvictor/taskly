import { useState } from "react";
import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

import ColorSelectorModal from "../components/ColorSelectorModal";
import LeftSidebar from "../components/LeftSidebar";
import CategoryForm from "../components/CategoryForm";

function AddCategoryPage() {
  const { openSidebar } = useSidebar();
  const [displaySelectColor, setDisplaySelectColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState("none");

  return (
    <div className="min-h-dvh bg-gray-100 px-4 py-4 dark:bg-[#0a0f1c]">
      <Menu
        size={32}
        onClick={openSidebar}
        className="text-primary dark:text-white lg:hidden"
      />

      <CategoryForm
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        displaySelectColor={displaySelectColor}
        setDisplaySelectColor={setDisplaySelectColor}
      />

      {displaySelectColor && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <ColorSelectorModal
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            setDisplaySelectColor={setDisplaySelectColor}
          />
        </div>
      )}

      <LeftSidebar />
    </div>
  );
}

export default AddCategoryPage;
