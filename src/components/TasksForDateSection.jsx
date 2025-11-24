import { format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import ViewTask from "../components/ViewTask";
import Loading from "../components/Loading";

function TasksForDateSection({ date, tasks, categories }) {
  const [tasksForDate, setTasksForDate] = useState([]);

  useEffect(() => {
    setTasksForDate(
      tasks.filter((task) => isSameDay(new Date(task.dueDate), new Date(date))),
    );
  }, [date, tasks]);

  if (tasksForDate.length < 1) {
    return (
      <div className="mt-6 rounded-lg bg-white px-4 py-2 text-black dark:bg-[#1e293b] dark:text-white lg:rounded-xl">
        <h1 className="text-lg">
          Tasks for: {format(date, "EEEE, d MMMM yyyy")}:
        </h1>
        <p className="mt-2">No tasks found for this date...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-lg bg-white px-4 py-2 pb-6 text-black dark:bg-[#1e293b] dark:text-white lg:rounded-xl">
      <h1 className="text-lg">
        Tasks for: {format(date, "EEEE, d MMMM yyyy")}:
      </h1>

      {tasksForDate.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          text={task.title}
          priority={task.priority}
          done={task.done}
          color={categories.find((c) => c.id === task.categoryId).color}
        />
      ))}

      <ViewTask />
    </div>
  );
}

export default TasksForDateSection;
