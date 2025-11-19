import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddCategoryCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addcategory");
  };

  return (
    <div
      className="bg-white w-40 h-40 rounded-xl flex justify-center items-center border-primary border-[3px] hover:bg-gray-100 hover:cursor-pointer"
      onClick={handleClick}
    >
      <Plus className="text-primary" size={40} />
    </div>
  );
}

export default AddCategoryCard;
