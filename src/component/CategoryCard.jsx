import { useEffect, useState } from "react";

function CategoryCard({ categoryId, name, color, tasks }) {
  const [completed, setCompleted] = useState(null);
  const [inProgress, setInProgress] = useState(null);
  const [overdue, setOverdue] = useState(null);

  useEffect(() => {
    const tasksForCategory = tasks.filter(
      (task) => task.categoryId === categoryId
    );

    const tasksCompleted = tasksForCategory.filter(
      (task) => task.done === true
    );

    const tasksInProgress = tasksForCategory.filter(
      (task) => new Date() < new Date(task.dueDate) && task.done === false
    );

    const tasksOverdue = tasksForCategory.filter(
      (task) => new Date() > new Date(task.dueDate) && task.done === false
    );

    setCompleted(tasksCompleted.length);
    setOverdue(tasksOverdue.length);
    setInProgress(tasksInProgress.length);
  }, []);

  const handleClick = () => {
    console.log("Category Clicked");
  };

  return (
    <div
      className="bg-primary w-40 h-40 py-2 px-2 rounded-xl hover:cursor-pointer transition hover:brightness-90"
      onClick={handleClick}
      style={{ background: color }}
    >
      <h1 className="text-white text-xl text-center">{name}</h1>
      <h2 className="text-white mt-2">Completed: {completed}</h2>
      <h2 className="text-white">In Progress: {inProgress}</h2>
      <h2 className="text-white">Overdue: {overdue}</h2>
    </div>
  );
}

export default CategoryCard;
