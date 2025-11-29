import { useEffect, useState } from "react";
import { createTask } from "../firebase/task.service";
import { Link, useNavigate } from "react-router-dom";
import { formatDateForInput } from "../helpers/formatDate";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

function NewTaskForm({ categories }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "none",
    dueDate: new Date(),
    category: "",
  });
  const [error, setError] = useState("");

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSubmit() {
    if (editData.title.length < 1) {
      setError("Please enter a title");
      return;
    }

    if (editData.description.length < 1) {
      setError("Please enter a description");
      return;
    }

    if (editData.category === "") {
      setError("Go to category page to create a category");
      return;
    }

    await createTask(
      editData.title,
      editData.description,
      editData.priority,
      editData.dueDate,
      editData.category,
      user.uid,
    );

    navigate("/");

    toast.success("Task updated successfully!");
  }

  useEffect(() => {
    handleEditChange("category", categories[0] ? categories[0].id : "");
  }, [categories]);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-borders bg-white p-6 text-black shadow-md dark:border-gray-600 dark:bg-[#1e293b] dark:text-white">
      <h1 className="mb-6 text-center text-2xl font-bold text-primary dark:text-blue-300">
        New Task
      </h1>

      <div className="space-y-5">
        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          {categories.length > 0 ? (
            <select
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
              onChange={(e) => handleEditChange("category", e.target.value)}
              value={editData.category}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-red-500">
              No categories found. Go to categories page to add categories
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            placeholder="Task title"
            value={editData.title}
            onChange={(e) => handleEditChange("title", e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg outline-none transition focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            placeholder="Describe the task"
            rows={4}
            value={editData.description}
            onChange={(e) => handleEditChange("description", e.target.value)}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed outline-none transition focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
            onChange={(e) => handleEditChange("priority", e.target.value)}
            value={editData.priority}
          >
            <option value="none">Normal</option>
            <option value="important">Important</option>
          </select>
        </div>

        {/* Due date */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Due date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
            value={editData.dueDate ? formatDateForInput(editData.dueDate) : ""}
            onChange={(e) => handleEditChange("dueDate", e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-error">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full rounded-2xl bg-primary py-3 font-semibold text-white transition hover:opacity-95"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}

export default NewTaskForm;
