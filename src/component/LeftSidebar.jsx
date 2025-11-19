import {
  Boxes,
  Calendar,
  ChartNoAxesCombined,
  Layers,
  Settings,
  X,
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function LeftSidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : "-100vw" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-screen min-w-full fixed top-0 left-0 bg-white overflow-hidden z-50"
    >
      <X size={38} onClick={closeSidebar} className="absolute right-6 top-6" />

      {/* Content */}
      <div className="flex flex-col justify-between min-h-full py-36">
        <div className="flex flex-col items-center gap-10">
          <div className="flex items-center justify-center gap-3">
            <Layers
              className={
                location.pathname == "/" ? "text-primary" : "text-disabled"
              }
            />{" "}
            <Link
              className={`text-2xl ${location.pathname == "/" ? "text-primary" : "text-disabled"}`}
              to="/"
              onClick={() => {
                closeSidebar();
              }}
            >
              All Tasks
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Calendar
              className={
                location.pathname == "/calendar"
                  ? "text-primary"
                  : "text-disabled"
              }
            />{" "}
            <Link
              className={`text-2xl ${location.pathname == "/calendar" ? "text-primary" : "text-disabled"}`}
              to="/calendar"
              onClick={() => {
                closeSidebar();
              }}
            >
              Calendar
            </Link>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Boxes
              className={
                location.pathname == "/categories"
                  ? "text-primary"
                  : "text-disabled"
              }
            />{" "}
            <Link
              className={`text-2xl ${location.pathname == "/categories" ? "text-primary" : "text-disabled"}`}
              to="/categories"
              onClick={() => {
                closeSidebar();
              }}
            >
              Categories
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Link className="text-2xl text-error">Log Out</Link>
        </div>
      </div>
    </motion.div>
  );
}

export default LeftSidebar;
