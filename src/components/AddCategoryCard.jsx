import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddCategoryCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addcategory");
  };

  return (
    <div
      className="flex h-40 w-40 items-center justify-center rounded-xl border-[3px] border-primary bg-white shadow-lg hover:cursor-pointer hover:bg-gray-100 dark:border-blue-300 dark:bg-[#1e293b] dark:hover:bg-[#0f172a]"
      onClick={handleClick}
    >
      <Plus className="text-primary dark:text-blue-300" size={40} />
    </div>
  );
}

export default AddCategoryCard;
