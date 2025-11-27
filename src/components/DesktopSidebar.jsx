import { Boxes, Calendar, Layers, X } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogOutModal from "./LogOutModal";
import { useUser } from "../context/UserContext";

function DesktopSidebar() {
  const { isOpen, closeSidebar } = useSidebar();
  const location = useLocation();
  const [displayLogOutModal, setDisplayLogoutModal] = useState(false);
  const { user } = useUser();

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed left-0 top-16 z-50 flex h-[calc(100dvh-4rem)] w-44 justify-center overflow-hidden bg-white pb-4 pt-4 text-black dark:bg-[#1e293b] dark:text-white"
    >
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center">
            <h2 className="text-lg text-text dark:text-white">Welcome</h2>
            <h2 className="-mt-1 text-lg text-text dark:text-white">
              {user.displayName}!
            </h2>
          </div>
          {/* All Tasks */}
          <div className="mt-5 flex items-center gap-3">
            <Layers
              className={
                location.pathname === "/"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }
            />
            <Link
              className={`text-xl ${
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
          <div className="flex items-center gap-3">
            <Calendar
              className={
                location.pathname === "/calendar"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }
            />
            <Link
              className={`text-xl ${
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
          <div className="flex items-center gap-3">
            <Boxes
              className={
                location.pathname === "/categories"
                  ? "text-primary dark:text-blue-300"
                  : "text-disabled dark:text-gray-400"
              }
            />
            <Link
              className={`text-xl ${
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

        <div className="flex flex-col items-center">
          <button
            className="text-2xl text-error dark:text-red-400"
            onClick={() => setDisplayLogoutModal(true)}
          >
            Log Out
          </button>
        </div>

        {/* Logout */}
        {displayLogOutModal && (
          <LogOutModal setDisplay={setDisplayLogoutModal} />
        )}
      </div>
    </motion.div>
  );
}

export default DesktopSidebar;
