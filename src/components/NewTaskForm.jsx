function NewTaskForm() {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-borders bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold text-primary">
        New Task
      </h1>

      <form className="space-y-5">
        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="Task title"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold outline-none transition focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            placeholder="Describe the task"
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed outline-none transition focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary">
            <option value="none">Normal</option>
            <option value="important">Important</option>
          </select>
        </div>

        {/* Due date */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Due date
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 w-full rounded-2xl bg-primary py-3 font-semibold text-white transition hover:opacity-95"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default NewTaskForm;
