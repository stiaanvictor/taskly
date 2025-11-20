import { Check } from "lucide-react";
import Loading from "./Loading";
import { useViewTask } from "../context/ViewTaskContext";

function TaskCard({ id, text, priority = "none", done = false, color }) {
  const { openTask } = useViewTask();

  return (
    <div
      className="mt-3 flex justify-between rounded-2xl border border-borders bg-gray-50 pr-3 shadow-md hover:cursor-pointer hover:bg-blue-50"
      onClick={() => openTask(id)}
    >
      <div className="flex">
        <div className="w-5" style={{ background: color }}></div>
        <p className="ml-2 py-1 text-lg">{text}</p>
      </div>
      {done ? (
        <p>
          <Check className="text-success" strokeWidth={3} size={27} />
        </p>
      ) : priority === "important" ? (
        <p className="pr-2 text-2xl font-bold text-attention">!</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskCard;
