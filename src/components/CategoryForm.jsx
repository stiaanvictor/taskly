import React from "react";

function CategoryForm({
  selectedColor,
  setSelectedColor,
  displaySelectColor,
  setDisplaySelectColor,
}) {
  return (
    <div className="lg:flex lg:justify-center lg:pt-16">
      <div className="mt-6 flex flex-col rounded-xl bg-white px-5 py-8 text-black shadow-lg dark:bg-[#1e293b] dark:text-white lg:min-w-[60rem] lg:max-w-[60rem]">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Category title"
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-white"
        />

        {/* Select Color Button */}
        {selectedColor === "none" ? (
          <button
            className="mt-4 rounded-md border-2 border-text bg-white py-1 text-lg text-text hover:brightness-90 dark:border-white dark:bg-[#0f172a] dark:text-white"
            onClick={() => setDisplaySelectColor(!displaySelectColor)}
          >
            Select Color
          </button>
        ) : (
          <button
            className="mt-4 rounded-md border-2 py-1 text-lg text-white hover:brightness-90"
            style={{ background: selectedColor, borderColor: selectedColor }}
            onClick={() => setDisplaySelectColor(!displaySelectColor)}
          >
            Change Color
          </button>
        )}

        {/* Create Category Button */}
        <button className="mt-10 rounded-md bg-primary py-2 text-2xl text-white shadow-lg hover:brightness-90">
          Create New Category
        </button>
      </div>
    </div>
  );
}

export default CategoryForm;
