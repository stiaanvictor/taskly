import React from "react";

const Dropdown = ({ children, setValue, value }) => {
  return (
    <select
      name="category"
      className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition duration-150 ease-in-out hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-dark-borders dark:bg-dark-background dark:text-white"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      {children}
    </select>
  );
};

export default Dropdown;
