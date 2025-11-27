import { useState } from "react";
import { createTask } from "../firebase/task.service";

function NewTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    await createTask(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-borders bg-white p-6 text-black shadow-md dark:border-gray-600 dark:bg-[#1e293b] dark:text-white">
      <h1 className="mb-6 text-center text-2xl font-bold text-primary dark:text-blue-300">
        New Task
      </h1>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed outline-none transition focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white">
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
          />
        </div>

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
