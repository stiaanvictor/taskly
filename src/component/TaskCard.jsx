import { Check } from "lucide-react";
import Loading from "./Loading";
import { useViewTask } from "../context/ViewTaskContext";

function TaskCard({ id, text, priority = "none", done = false, color }) {
  const { openTask } = useViewTask();

  return (
    <div
      className="flex bg-gray-50 rounded-2xl border-borders mt-3 border justify-between pr-3 hover:bg-blue-50 hover:cursor-pointer"
      onClick={() => openTask(id)}
    >
      <div className="flex">
        <div className="w-5" style={{ background: color }}></div>
        <p className="text-lg ml-2 py-1">{text}</p>
      </div>
      {done ? (
        <p>
          <Check className="text-success" strokeWidth={3} size={27} />
        </p>
      ) : priority === "important" ? (
        <p className="font-bold text-2xl text-attention pr-2">!</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskCard;
