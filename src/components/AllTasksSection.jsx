import { Filter, ListFilter } from "lucide-react";
import DaySection from "./DaySection";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import FilterModal from "./FilterModal";
import NoTasksFound from "./NoTasksFound";

const defaultFilters = {
  categoryId: "all",
  priorityType: "all",
  doneStatus: "all",
  displayOverdue: "yes",
};

function AllTasksSection({ tasks, categories }) {
  const [dates, setDates] = useState([]);

  const [displayFilters, setDisplayFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    setDates([...new Set(tasks.map((task) => task.dueDate))]);
  }, [tasks]);

  const filterClicked = () => {
    setDisplayFilters(true);
  };

  const isPastDate = (d) => new Date(d) < new Date();

  return (
    <div className="flex-1 pt-3 lg:flex lg:justify-center">
      <div className="rounded-2xl bg-white px-4 py-4 text-black dark:bg-[#0f172a] dark:text-white lg:min-w-[60rem] lg:max-w-[60rem]">
        <div className="flex justify-end pr-4">
          <ListFilter
            className="text-primary hover:cursor-pointer dark:text-white"
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
            if (isPastDate(date) && filters.displayOverdue == "yes") {
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
          <div className="my-4">
            <NoTasksFound />
          </div>
        )}

        {tasks.filter((task) => isPastDate(task.dueDate)).length > 0 &&
          filters.displayOverdue === "yes" && (
            <h1 className="weight -mb-2 mt-8 text-xl text-primary dark:text-blue-300">
              Not Overdue
            </h1>
          )}

        {dates.length > 0
          ? dates.map((date) => {
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
          : ""}
      </div>
    </div>
  );
}

export default AllTasksSection;
