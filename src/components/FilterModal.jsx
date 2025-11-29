import { X } from "lucide-react";
import Dropdown from "./DropDown";
import { useState } from "react";

function FilterModal({ setDisplayFilters, categories, filters, setFilters }) {
  const [selectedCategory, setSelectedCategory] = useState(
    filters["categoryId"],
  );
  const [selectedPriority, setSelectedPriority] = useState(
    filters["priorityType"],
  );
  const [selectedStatus, setSelectedStatus] = useState(filters["doneStatus"]);
  const [selectedShowOverdue, setSelectedShowOverdue] = useState(
    filters["displayOverdue"],
  );

  const applyFilters = () => {
    setFilters({
      categoryId: selectedCategory,
      priorityType: selectedPriority,
      doneStatus: selectedStatus,
      displayOverdue: selectedShowOverdue,
    });
    setDisplayFilters(false);
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-screen min-w-full overflow-hidden bg-white px-8 text-black dark:bg-[#1e293b] dark:text-white lg:left-1/2 lg:top-1/2 lg:h-auto lg:min-w-[500px] lg:max-w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-xl lg:border-[1px] lg:border-borders lg:shadow-xl dark:lg:border-gray-600">
      <X
        size={38}
        onClick={() => setDisplayFilters(false)}
        className="absolute right-6 top-6 cursor-pointer text-text dark:text-white"
      />

      <div className="pt-24 lg:pb-6 lg:pt-16">
        <h1 className="text-xl">Category:</h1>
        <Dropdown setValue={setSelectedCategory} value={selectedCategory}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.title}
            </option>
          ))}
        </Dropdown>

        <h1 className="mt-6 text-xl">Priority:</h1>
        <Dropdown setValue={setSelectedPriority} value={selectedPriority}>
          <option value="all">All</option>
          <option value="none">Normal</option>
          <option value="important">Important</option>
        </Dropdown>

        <h1 className="mt-6 text-xl">Status:</h1>
        <Dropdown setValue={setSelectedStatus} value={selectedStatus}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="incomplete">Incomplete</option>
        </Dropdown>

        <h1 className="mt-6 text-xl">Show Overdue Tasks:</h1>
        <Dropdown setValue={setSelectedShowOverdue} value={selectedShowOverdue}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Dropdown>

        <button
          onClick={applyFilters}
          className="mt-6 w-full rounded-md bg-primary px-2 py-1 text-lg text-white hover:brightness-95"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
