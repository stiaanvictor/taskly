import React from "react";

const Dropdown = ({ children, setValue, value }) => {
  return (
    <select
      name="category"
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 
             shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             hover:border-gray-400 transition duration-150 ease-in-out mt-2"
      onChange={(e) => setValue(e.target.value)}
      value={value}
    >
      {children}
    </select>
  );
};

export default Dropdown;
