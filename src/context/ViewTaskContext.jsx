import { createContext, useContext, useState } from "react";

const ViewTaskContext = createContext();

export const ViewTaskProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const openTask = (id) => {
    setIsOpen(true);
    setTaskId(id);
    document.body.classList.add("overflow-hidden");
  };
  const closeTask = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <ViewTaskContext.Provider value={{ isOpen, taskId, openTask, closeTask }}>
      {children}
    </ViewTaskContext.Provider>
  );
};

export const useViewTask = () => useContext(ViewTaskContext);
