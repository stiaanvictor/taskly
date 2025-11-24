import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ categoryId, name, color, tasks }) {
  const [completed, setCompleted] = useState(null);
  const [inProgress, setInProgress] = useState(null);
  const [overdue, setOverdue] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const tasksForCategory = tasks.filter(
      (task) => task.categoryId === categoryId,
    );

    const tasksCompleted = tasksForCategory.filter(
      (task) => task.done === true,
    );

    const tasksInProgress = tasksForCategory.filter(
      (task) => new Date() < new Date(task.dueDate) && task.done === false,
    );

    const tasksOverdue = tasksForCategory.filter(
      (task) => new Date() > new Date(task.dueDate) && task.done === false,
    );

    setCompleted(tasksCompleted.length);
    setOverdue(tasksOverdue.length);
    setInProgress(tasksInProgress.length);
  }, []);

  const handleClick = () => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div
      className="h-40 w-40 rounded-xl bg-primary px-2 py-2 shadow-lg transition hover:cursor-pointer hover:brightness-90"
      onClick={handleClick}
      style={{ background: color }}
    >
      <h1 className="text-center text-xl text-white">{name}</h1>
      <h2 className="mt-2 text-white">Completed: {completed}</h2>
      <h2 className="text-white">In Progress: {inProgress}</h2>
      <h2 className="text-white">Overdue: {overdue}</h2>
    </div>
  );
}

export default CategoryCard;
