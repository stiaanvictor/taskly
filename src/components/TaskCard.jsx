import { Check } from "lucide-react";
import Loading from "./Loading";
import { useViewTask } from "../context/ViewTaskContext";

function TaskCard({
  id,
  text,
  priority = "none",
  done = false,
  color,
  displayColor = true,
}) {
  const { openTask } = useViewTask();

  return (
    <div
      className="dark:border-dark-borders mt-3 flex justify-between rounded-2xl border border-borders bg-gray-50 pr-3 shadow-md hover:cursor-pointer hover:bg-blue-50 dark:bg-[#1e293b] dark:hover:bg-[#334155]"
      onClick={() => openTask(id)}
    >
      <div className="flex">
        <div
          className={`w-5 ${!displayColor && "hidden"}`}
          style={{ background: color }}
        ></div>
        <p className="ml-2 py-1 text-lg text-text dark:text-white">{text}</p>
      </div>

      {done ? (
        <div className="flex items-center">
          <Check
            className="text-success dark:text-green-400 lg:hidden"
            strokeWidth={3}
            size={27}
          />
          <p className="hidden pr-2 text-xl text-success dark:text-green-400 lg:block">
            Done!
          </p>
        </div>
      ) : priority === "important" ? (
        <div className="flex items-center">
          <p className="pr-2 text-2xl font-bold text-attention dark:text-yellow-300 lg:hidden">
            !
          </p>
          <p className="hidden pr-2 text-xl text-attention dark:text-yellow-300 lg:block">
            Important!
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskCard;
