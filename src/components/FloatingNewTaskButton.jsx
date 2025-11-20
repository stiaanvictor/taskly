import { useNavigate } from "react-router-dom";

function FloatingNewTaskButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/new-task");
  };

  return (
    <button
      className="fixed bottom-6 right-8 rounded-xl bg-primary px-4 py-2 text-xl text-white shadow-lg hover:brightness-90"
      onClick={handleClick}
    >
      New Task
    </button>
  );
}

export default FloatingNewTaskButton;
