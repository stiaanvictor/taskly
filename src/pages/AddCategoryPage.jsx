function AddCategoryPage() {
  return (
    <div className="px-2 py-2 bg-gray-100 min-h-dvh">
      <div className="bg-white px-2 py-2">
        <input
          type="text"
          placeholder="Category title"
          className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-transparent focus:ring-2 focus:ring-primary text-lg font-semibold transition"
        />
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default AddCategoryPage;
