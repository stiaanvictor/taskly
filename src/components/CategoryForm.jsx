import { useState } from "react";
import { useUser } from "../context/UserContext";
import { createCategory } from "../firebase/category.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CategoryForm({
  selectedColor,
  displaySelectColor,
  setDisplaySelectColor,
  setSelectedColor,
}) {
  const [title, setTitle] = useState("");
  const { user } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (title === "") {
      setError("Please enter a category title");
    } else if (selectedColor === "none") {
      setError("Please select a color");
    } else {
      setError("");
      createCategory(user.uid, title, selectedColor);
      setTitle("");
      setSelectedColor("");
      navigate("/categories");
      toast.success("Category added successfully!");
    }
  };

  return (
    <div className="lg:flex lg:justify-center lg:pt-16">
      <div className="mt-6 flex flex-col rounded-xl bg-white px-5 py-6 text-black shadow-lg dark:bg-[#1e293b] dark:text-white lg:min-w-[40rem] lg:max-w-[40rem]">
        <h1 className="text-2xl text-text">Create Category:</h1>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Category title"
          className="mt-8 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Select Color Button */}
        {selectedColor === "none" ? (
          <button
            className="mt-4 rounded-md border-2 border-text bg-white py-1 text-lg text-text hover:brightness-90 dark:border-white dark:bg-[#0f172a] dark:text-white"
            onClick={() => setDisplaySelectColor(!displaySelectColor)}
          >
            Select Color
          </button>
        ) : (
          <button
            className="mt-4 rounded-md border-2 py-1 text-lg text-white hover:brightness-90"
            style={{ background: selectedColor, borderColor: selectedColor }}
            onClick={() => setDisplaySelectColor(!displaySelectColor)}
          >
            Change Color
          </button>
        )}

        {error && <p className="mt-2 text-error dark:text-white">{error}</p>}

        {/* Create Category Button */}
        <button
          className="mt-10 rounded-md bg-primary py-2 text-2xl text-white shadow-lg hover:brightness-90"
          onClick={handleSubmit}
        >
          Create New Category
        </button>
      </div>
    </div>
  );
}

export default CategoryForm;
