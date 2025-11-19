import { X } from "lucide-react";
import Dropdown from "./DropDown";
import { useState } from "react";

function FilterModal({ setDisplayFilters, categories, filters, setFilters }) {
  const [selectedCategory, setSelectedCategory] = useState(
    filters["categoryId"]
  );
  const [selectedPriority, setSelectedPriority] = useState(
    filters["priorityType"]
  );
  const [selectedStatus, setSelectedStatus] = useState(filters["doneStatus"]);
  const [selectedShowOverdue, setSelectedShowOverdue] = useState(
    filters["displayOverdue"]
  );

  const applyFilters = () => {
    setFilters({
      categoryId: selectedCategory,
      priorityType: selectedPriority,
      doneStatus: selectedStatus,
      displayOverdue: selectedShowOverdue,
    });
    setDisplayFilters(false);

    console.log(filters.priorityType);
  };

  return (
    <div className="h-screen min-w-full fixed top-0 left-0 bg-white px-3 overflow-hidden">
      <X
        size={38}
        onClick={() => setDisplayFilters(false)}
        className="absolute right-6 top-6"
      />
      <div className="pt-20">
        <h1 className="text-xl">Category:</h1>
        <Dropdown setValue={setSelectedCategory} value={selectedCategory}>
          <option value="all">All</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Dropdown>

        <h1 className="text-xl mt-6">Priority:</h1>
        <Dropdown setValue={setSelectedPriority} value={selectedPriority}>
          <option value="all">All</option>
          <option value="none">Normal</option>
          <option value="important">Important</option>
        </Dropdown>

        <h1 className="text-xl mt-6">Status:</h1>
        <Dropdown setValue={setSelectedStatus} value={selectedStatus}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="incomplete">Incomplete</option>
        </Dropdown>

        <h1 className="text-xl mt-6">Show Overdue Tasks:</h1>
        <Dropdown setValue={setSelectedShowOverdue} value={selectedShowOverdue}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Dropdown>

        <button
          onClick={applyFilters}
          className="bg-primary text-white rounded-md px-2 py-1 text-lg mt-6"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default FilterModal;
