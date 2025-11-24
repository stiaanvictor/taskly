import { Boxes, Calendar, Layers, X } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function MobileSidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : "-100vw" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-50 h-screen min-w-full overflow-hidden bg-white text-black dark:bg-[#1e293b] dark:text-white"
    >
      <X
        size={38}
        onClick={closeSidebar}
        className="absolute right-6 top-6 text-black dark:text-white"
      />

      <div className="flex min-h-full flex-col justify-between py-36">
        <div className="flex flex-col items-center gap-10">
          {/* All Tasks */}
          <div className="flex items-center justify-center gap-3">
            <Layers
              className={
                location.pathname === "/"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }
            />
            <Link
              className={`text-2xl ${
                location.pathname === "/"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }`}
              to="/"
              onClick={closeSidebar}
            >
              All Tasks
            </Link>
          </div>

          {/* Calendar */}
          <div className="flex items-center justify-center gap-3">
            <Calendar
              className={
                location.pathname === "/calendar"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }
            />
            <Link
              className={`text-2xl ${
                location.pathname === "/calendar"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }`}
              to="/calendar"
              onClick={closeSidebar}
            >
              Calendar
            </Link>
          </div>

          {/* Categories */}
          <div className="flex items-center justify-center gap-3">
            <Boxes
              className={
                location.pathname === "/categories"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }
            />
            <Link
              className={`text-2xl ${
                location.pathname === "/categories"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }`}
              to="/categories"
              onClick={closeSidebar}
            >
              Categories
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className="flex flex-col items-center">
          <Link className="text-2xl text-error dark:text-red-400">Log Out</Link>
        </div>
      </div>
    </motion.div>
  );
}

export default MobileSidebar;
