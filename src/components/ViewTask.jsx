import { Calendar, X } from "lucide-react";
import { motion } from "framer-motion";
import { useViewTask } from "../context/ViewTaskContext";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import {
  deleteTask,
  setTaskDone,
  setTaskIncomplete,
  updateTask,
} from "../firebase/task.service";
import toast from "react-hot-toast";
import { formatDateForInput } from "../helpers/formatDate";
import DeleteModal from "./DeleteModal";

function ViewTask({ tasks, categories }) {
  const { isOpen, closeTask, taskId } = useViewTask();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const titleRef = useRef(null);
  const [error, setError] = useState("");
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  useEffect(() => {
    if (tasks) {
      if (tasks.length > 0 && taskId) {
        const found = tasks.find((obj) => obj.id === taskId);
        setTask(found || null);
        setEditData(found ? { ...found } : {});
        setIsEditing(false);
      }
    }
  }, [taskId, tasks]);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [isEditing]);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (editData.title.length < 1) {
      setError("Please enter a title");
      return;
    }

    if (editData.description.length < 1) {
      setError("Please enter a description");
      return;
    }

    updateTask(
      task.id,
      editData.title,
      editData.description,
      editData.priority,
      editData.dueDate,
      editData.categoryId,
    );

    setIsEditing(false);
    toast.success("Task updated successfully!");
    setError("");
    return;
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleMarkDone = () => {
    setTaskDone(task.id);
  };

  const handleMarkIncomplete = () => {
    setTaskIncomplete(task.id);
  };

  const handleDelete = () => {
    deleteTask(task.id);

    closeTask();

    toast.success("Task deleted successfully");
  };

  const toggleDeleteModal = () => {
    setDisplayDeleteModal(true);
  };

  const isOverdue = (d) => new Date(d) < new Date() && !task?.done;

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : "100vw" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-50 h-screen min-w-full overflow-hidden bg-white px-3 dark:bg-[#0a0f1c]"
    >
      <X
        size={38}
        onClick={closeTask}
        className="absolute right-6 top-6 cursor-pointer text-black dark:text-white"
      />

      {task && (
        <div className="mx-auto mt-20 w-full max-w-md rounded-2xl border border-borders bg-white p-5 text-black shadow-md dark:border-gray-600 dark:bg-[#1e293b] dark:text-white">
          {/* Title */}
          {isEditing ? (
            <input
              ref={titleRef}
              type="text"
              value={editData.title || ""}
              onChange={(e) => handleEditChange("title", e.target.value)}
              placeholder="Task title"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
            />
          ) : (
            <h1 className="break-words text-xl font-bold text-primary dark:text-blue-300">
              {task.title}
            </h1>
          )}

          {/* Description */}
          {isEditing ? (
            <textarea
              value={editData.description || ""}
              onChange={(e) => handleEditChange("description", e.target.value)}
              placeholder="Description"
              rows={4}
              className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
            />
          ) : (
            <p className="mt-3 break-words text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {task.description}
            </p>
          )}

          {/* Info Section */}
          <div className="mt-5 space-y-3">
            {/* Status */}
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Status{" "}
              <span
                className={
                  task.done
                    ? "ml-2 font-semibold text-success dark:text-green-400"
                    : isOverdue(task.dueDate)
                      ? "ml-2 font-semibold text-error dark:text-red-400"
                      : "ml-2 font-semibold text-attention dark:text-yellow-300"
                }
              >
                {task.done
                  ? "Done"
                  : isOverdue(task.dueDate)
                    ? "Overdue"
                    : "In Progress"}
              </span>
            </p>

            {/* Priority */}
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Priority{" "}
              {isEditing ? (
                <select
                  value={editData.priority || "none"}
                  onChange={(e) => handleEditChange("priority", e.target.value)}
                  className="ml-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
                >
                  <option value="none">Normal</option>
                  <option value="important">Important</option>
                </select>
              ) : (
                <span
                  className={
                    task.priority === "none"
                      ? "ml-2 text-gray-700 dark:text-gray-300"
                      : "ml-2 font-semibold text-attention dark:text-yellow-300"
                  }
                >
                  {task.priority === "none" ? "Normal" : "Important"}
                </span>
              )}
            </p>

            {/* CATEGORY FIELD */}
            <p className="text-base font-medium text-gray-700 dark:text-gray-300">
              Category{" "}
              {isEditing ? (
                <select
                  value={editData.categoryId || ""}
                  onChange={(e) =>
                    handleEditChange("categoryId", e.target.value)
                  }
                  className="ml-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="ml-2 font-semibold">
                  {categories.find((c) => c.id === task.categoryId)?.title ||
                    "No category"}
                </span>
              )}
            </p>

            {/* Due */}
            <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300">
              <Calendar
                size={18}
                className="text-gray-500 dark:text-gray-400"
              />
              <span>Due:</span>
              {isEditing ? (
                <input
                  type="date"
                  value={
                    editData.dueDate ? formatDateForInput(editData.dueDate) : ""
                  }
                  onChange={(e) => handleEditChange("dueDate", e.target.value)}
                  className="ml-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
                />
              ) : (
                <span className="ml-2 font-semibold">
                  {format(new Date(task.dueDate), "d MMMM yyyy")}
                </span>
              )}
            </div>

            {error && <p className="text-sm text-error">{error}</p>}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {!task.done && !isEditing ? (
              <button
                onClick={handleMarkDone}
                className="w-full rounded-2xl bg-success py-3 font-semibold text-white transition hover:opacity-95"
              >
                Mark as Done
              </button>
            ) : (
              task.done &&
              !isEditing && (
                <button
                  onClick={handleMarkIncomplete}
                  className="w-full rounded-2xl bg-attention py-3 font-semibold text-white transition hover:opacity-95"
                >
                  Mark as Incomplete
                </button>
              )
            )}

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="w-full rounded-2xl bg-primary py-3 font-semibold text-white transition hover:opacity-95"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full rounded-2xl border border-gray-200 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#0f172a]"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditData({ ...task });
                  }}
                  className="w-full rounded-2xl border border-primary py-3 font-semibold text-primary transition hover:bg-primary hover:text-white dark:border-blue-300 dark:text-blue-300"
                >
                  Edit
                </button>

                <button
                  onClick={toggleDeleteModal}
                  className="w-full rounded-2xl border border-error py-3 font-semibold text-error transition hover:bg-error hover:text-white dark:border-red-400 dark:text-red-400"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          {displayDeleteModal && (
            <DeleteModal
              setDisplay={setDisplayDeleteModal}
              deleteFunction={handleDelete}
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ViewTask;
