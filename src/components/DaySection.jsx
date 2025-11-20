import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { format, isToday } from "date-fns";

function DaySection({ date, tasks, categories, filters }) {
  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.categoryId === "all" || filters.categoryId == task.categoryId) &&
      (filters.priorityType === "all" ||
        filters.priorityType == task.priority) &&
      (filters.doneStatus === "all" ||
        (task.done == true && filters.doneStatus == "done") ||
        (task.done == false && filters.doneStatus == "incomplete"))
    );
  });

  const formattedDate = isToday(date)
    ? `Today, ${format(date, "EEEE, d MMMM yyyy")}`
    : format(date, "EEEE, d MMMM yyyy");

  return (
    <div className="mt-4">
      {filteredTasks.length > 0 && (
        <>
          <h3 className="text-xl">{formattedDate}</h3>
          <div className="mt-1 h-1 rounded-full bg-primary shadow-sm"></div>
        </>
      )}

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          text={task.title}
          priority={task.priority}
          done={task.done}
          color={categories.find((c) => c.id === task.categoryId)["color"]}
        />
      ))}
    </div>
  );
}

export default DaySection;
