import { Calendar, X } from "lucide-react";
import { motion } from "framer-motion";
import { useViewTask } from "../context/ViewTaskContext";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

function ViewTask() {
  const { isOpen, closeTask, taskId } = useViewTask();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
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

    setTasks(dummyTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0 && taskId) {
      const found = tasks.find((obj) => obj.id === taskId);
      setTask(found || null);
      setEditData(found ? { ...found } : {});
      setIsEditing(false);
    }
  }, [taskId, tasks]);

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [isEditing]);

  const handleEditChange = (field, value) => {};

  const handleSave = () => {};

  const handleCancel = () => {};

  const handleMarkDone = () => {};

  const handleMarkIncomplete = () => {};

  const handleDelete = () => {};

  const isOverdue = (d) => new Date(d) < new Date() && !task?.done;

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : "100vw" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="z-50 h-screen min-w-full fixed top-0 left-0 bg-white px-3 overflow-hidden"
    >
      <X
        size={38}
        onClick={closeTask}
        className="absolute right-6 top-6 cursor-pointer"
      />

      {task && (
        <div className="p-5 mt-20 bg-white rounded-2xl shadow-md border border-borders w-full max-w-md mx-auto">
          {/* Title */}
          {isEditing ? (
            <input
              ref={titleRef}
              type="text"
              value={editData.title || ""}
              onChange={(e) => handleEditChange("title", e.target.value)}
              placeholder="Task title"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-transparent focus:ring-2 focus:ring-primary text-lg font-semibold transition"
            />
          ) : (
            <h1 className="text-xl font-bold text-primary break-words">
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
              className="mt-3 w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-transparent focus:ring-2 focus:ring-primary text-sm leading-relaxed transition resize-none"
            />
          ) : (
            <p className="text-sm text-gray-700 mt-3 leading-relaxed break-words">
              {task.description}
            </p>
          )}

          {/* Info Section */}
          <div className="mt-5 space-y-3">
            {/* Status (no date here) */}
            <p className="text-base font-medium text-gray-700">
              Status{" "}
              <span
                className={
                  task.done
                    ? "ml-2 text-green-600 font-semibold"
                    : isOverdue(task.dueDate)
                      ? "ml-2 text-error font-semibold"
                      : "ml-2 text-attention font-semibold"
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
            <p className="text-base font-medium text-gray-700">
              Priority{" "}
              {isEditing ? (
                <select
                  value={editData.priority || "none"}
                  onChange={(e) => handleEditChange("priority", e.target.value)}
                  className="ml-2 rounded-lg px-3 py-2 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="none">Normal</option>
                  <option value="important">Important</option>
                </select>
              ) : (
                <span
                  className={
                    task.priority === "none"
                      ? "ml-2 text-gray-700"
                      : "ml-2 text-attention font-semibold"
                  }
                >
                  {task.priority === "none" ? "Normal" : "Important"}
                </span>
              )}
            </p>

            {/* Due */}
            <div className="flex items-center gap-2 text-base font-medium text-gray-700">
              <Calendar size={18} className="text-gray-500" />
              <span>Due:</span>
              {isEditing ? (
                <input
                  type="date"
                  value={editData.dueDate || ""}
                  onChange={(e) => handleEditChange("dueDate", e.target.value)}
                  className="ml-2 rounded-lg px-3 py-2 bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <span className="ml-2 font-semibold">
                  {format(new Date(task.dueDate), "d MMMM yyyy")}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {!task.done && !isEditing ? (
              <button
                onClick={handleMarkDone}
                className="w-full py-3 rounded-2xl bg-success text-white font-semibold hover:opacity-95 transition"
              >
                Mark as Done
              </button>
            ) : (
              task.done &&
              !isEditing && (
                <button
                  onClick={handleMarkIncomplete}
                  className="w-full py-3 rounded-2xl bg-attention text-white font-semibold hover:opacity-95 transition"
                >
                  Mark as Incomplete
                </button>
              )
            )}

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="w-full py-3 rounded-2xl bg-primary text-white font-semibold hover:opacity-95 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full py-3 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
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
                  className="w-full py-3 rounded-2xl border border-primary text-primary font-semibold hover:bg-attention hover:text-white transition"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full py-3 rounded-2xl border border-error text-error font-semibold hover:bg-error hover:text-white transition"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ViewTask;
