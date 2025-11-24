import { Filter, ListFilter } from "lucide-react";
import DaySection from "./DaySection";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import FilterModal from "./FilterModal";

const defaultFilters = {
  categoryId: "all",
  priorityType: "all",
  doneStatus: "all",
  displayOverdue: "yes",
};

function AllTasksSection() {
  const [dates, setDates] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displayFilters, setDisplayFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const dummyCategories = [
      { id: 1, name: "Personal", color: "#4CAF50" },
      { id: 2, name: "Work", color: "#2196F3" },
      { id: 3, name: "Health", color: "#E91E63" },
      { id: 4, name: "Finance", color: "#FF9800" },
    ];

    const dummyTasks = [
      {
        id: 1,
        title: "Buy groceries",
        description: "Pick up milk, eggs, and bread from the store.",
        dueDate: "2025-11-07",
        done: false,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 2,
        title: "Finish project report",
        description: "Complete and review the final report before submission.",
        dueDate: "2025-11-11",
        done: false,
        priority: "important",
        categoryId: 2,
      },
      {
        id: 3,
        title: "Call plumber",
        description: "Fix the kitchen sink leak.",
        dueDate: "2025-11-11",
        done: true,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 4,
        title: "Team meeting",
        description: "Discuss project progress and next steps with the team.",
        dueDate: "2025-11-15",
        done: false,
        priority: "important",
        categoryId: 2,
      },
      {
        id: 5,
        title: "Doctor appointment",
        description: "Routine checkup at the clinic.",
        dueDate: "2025-11-15",
        done: true,
        priority: "none",
        categoryId: 3,
      },
      {
        id: 6,
        title: "Submit tax documents",
        description: "Upload all required tax forms before the deadline.",
        dueDate: "2025-11-24",
        done: false,
        priority: "important",
        categoryId: 4,
      },
      {
        id: 7,
        title: "Clean garage",
        description: "Organize tools and sweep the floor.",
        dueDate: "2025-11-24",
        done: true,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 8,
        title: "Read new book",
        description: "Start reading the book bought last week.",
        dueDate: "2025-12-01",
        done: false,
        priority: "none",
        categoryId: 1,
      },
      {
        id: 9,
        title: "HI",
        description: "hello?",
        dueDate: "2025-12-04",
        done: false,
        priority: "important",
        categoryId: 4,
      },
    ];

    setCategories(dummyCategories);
    setTasks(dummyTasks);
    setDates([...new Set(dummyTasks.map((task) => task.dueDate))]);
  }, []);

  const filterClicked = () => {
    setDisplayFilters(true);
  };

  const isPastDate = (d) => new Date(d) < new Date();

  return (
    <div className="flex-1 pt-3 lg:flex lg:justify-center">
      <div className="rounded-2xl bg-white px-4 py-4 text-black dark:bg-[#0f172a] dark:text-white lg:min-w-[60rem] lg:max-w-[60rem]">
        <div className="flex justify-end pr-4">
          <ListFilter
            className="text-primary dark:text-white"
            size={32}
            onClick={filterClicked}
          />
          {displayFilters && (
            <FilterModal
              setDisplayFilters={setDisplayFilters}
              categories={categories}
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </div>

        {tasks.filter((task) => isPastDate(task.dueDate)).length > 0 &&
          filters.displayOverdue === "yes" && (
            <h1 className="-mb-2 mt-2 text-xl text-error dark:text-red-400">
              Overdue!
            </h1>
          )}

        {dates.length > 0 ? (
          dates.map((date) => {
            if (isPastDate(date) && filters.displayOverdue) {
              const tasksForDate = tasks.filter(
                (task) => task.dueDate === date,
              );
              return (
                <DaySection
                  key={date}
                  date={date}
                  tasks={tasksForDate}
                  categories={categories}
                  filters={filters}
                />
              );
            }
          })
        ) : (
          <Loading />
        )}

        {tasks.filter((task) => isPastDate(task.dueDate)).length > 0 &&
          filters.displayOverdue === "yes" && (
            <h1 className="weight -mb-2 mt-8 text-xl text-primary dark:text-blue-300">
              Not Overdue
            </h1>
          )}

        {dates.length > 0 ? (
          dates.map((date) => {
            if (!isPastDate(date)) {
              const tasksForDate = tasks.filter(
                (task) => task.dueDate === date,
              );
              return (
                <DaySection
                  key={date}
                  date={date}
                  tasks={tasksForDate}
                  categories={categories}
                  filters={filters}
                />
              );
            }
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default AllTasksSection;
