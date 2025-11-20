import React from "react";

function CategoryForm({
  selectedColor,
  setSelectedColor,
  displaySelectColor,
  setDisplaySelectColor,
}) {
  return (
    <div className="mt-6 flex flex-col rounded-xl bg-white px-5 py-8">
      <input
        type="text"
        placeholder="Category title"
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-semibold outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary"
      />

      {selectedColor === "none" ? (
        <button
          className="mt-4 rounded-md border-2 border-text bg-white py-1 text-lg text-text"
          onClick={() => setDisplaySelectColor(!displaySelectColor)}
        >
          Select Color
        </button>
      ) : (
        <button
          className="mt-4 rounded-md border-2 py-1 text-lg text-white"
          style={{ background: selectedColor, borderColor: selectedColor }}
          onClick={() => setDisplaySelectColor(!displaySelectColor)}
        >
          Change Color
        </button>
      )}

      <button className="mt-10 rounded-md bg-primary py-2 text-2xl text-white">
        Create New Category
      </button>
    </div>
  );
}

export default CategoryForm;
