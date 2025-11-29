import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import ViewTask from "./ViewTask";
import DaySection from "./DaySection";
import { Check, Edit, Pencil } from "lucide-react";
import ColorSelectorModal from "./ColorSelectorModal";
import { getTasksForCategory } from "../firebase/task.service";
import { deleteCategory, updateCategory } from "../firebase/category.service";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultFilters = {
  categoryId: "all",
  priorityType: "all",
  doneStatus: "all",
  displayOverdue: "yes",
};

function TasksForCategorySection({ categoryId, categories }) {
  const [category, setCategory] = useState(null);
  const [tasksForCategory, setTasksForCategory] = useState([]);
  const [dates, setDates] = useState([]);
  const [editing, setEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");
  const titleRef = useRef(null);
  const [displaySelectColor, setDisplaySelectColor] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const [displayDeleteModal, setDisplayDeleteModal] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCategory(categories.find((category) => category.id === categoryId));

    getTasksForCategory(categoryId, (tasks) => {
      setTasksForCategory(tasks);
    });
  }, [categories, categoryId]);

  useEffect(() => {
    setDates([...new Set(tasksForCategory.map((task) => task.dueDate))]);
  }, [tasksForCategory]);

  useEffect(() => {
    if (editing && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [editing]);

  if (!category) {
    return <Loading />;
  }

  const isPastDate = (d) => new Date(d) < new Date();

  const handleEdit = () => {
    setEditing(true);
    setTitleEdit(category.title);
    setSelectedColor(category.color);
  };

  const handleConfirm = () => {
    console.log(titleEdit, selectedColor);

    if (titleEdit.length < 1) {
      setError("Please enter a title");
      return;
    }

    updateCategory(categoryId, titleEdit, selectedColor);
    setError("");
    setEditing(false);
  };

  const colorClicked = () => {
    setDisplaySelectColor(!displaySelectColor);
  };

  const handleDeleteClicked = () => {
    setDisplayDeleteModal(true);
  };

  const handleDelete = async () => {
    await deleteCategory(categoryId);
    navigate("/");
    toast.success("Category deleted successfully!");
  };

  return (
    <div className="lg:flex lg:justify-center">
      <div className="rounded-xl bg-white px-3 pb-6 pt-2 text-black dark:bg-[#1e293b] dark:text-white lg:min-w-[60rem] lg:max-w-[60rem]">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            {editing && (
              <div
                className="h-7 w-7 rounded-full hover:cursor-pointer hover:brightness-110"
                onClick={colorClicked}
                style={{ background: selectedColor }}
              ></div>
            )}

            {editing ? (
              <div>
                <input
                  ref={titleRef}
                  className="w-60 rounded-lg border-2 border-borders bg-white pl-2 text-3xl text-primary dark:border-gray-600 dark:bg-[#0f172a] dark:text-blue-300"
                  value={titleEdit}
                  onChange={(e) => setTitleEdit(e.target.value)}
                />
                {error && <p className="text-sm text-error">{error}</p>}
              </div>
            ) : (
              <h1 className="text-3xl text-primary dark:text-blue-300">
                {category.title}
              </h1>
            )}

            {editing ? (
              <button onClick={handleConfirm}>
                <Check className="text-text dark:text-white" />
              </button>
            ) : (
              <button onClick={handleEdit}>
                <Pencil className="text-text dark:text-white" />
              </button>
            )}
          </div>
        </div>

        <div>
          {tasksForCategory.filter((task) => isPastDate(task.dueDate)).length >
            0 && (
            <div>
              <h1 className="-mb-2 mt-2 text-xl text-error dark:text-red-400">
                Overdue!
              </h1>
              {dates.length > 0 ? (
                dates.map((date) => {
                  if (isPastDate(date)) {
                    const tasksForDate = tasksForCategory.filter(
                      (task) => task.dueDate === date,
                    );
                    return (
                      <DaySection
                        key={date}
                        date={date}
                        tasks={tasksForDate}
                        categories={categories}
                        filters={defaultFilters}
                      />
                    );
                  }
                })
              ) : (
                <h1>You don't have any overdue tasks for this category</h1>
              )}
            </div>
          )}

          {tasksForCategory.filter((task) => isPastDate(task.dueDate)).length >
            0 && (
            <h1 className="weight -mb-2 mt-8 text-xl text-primary dark:text-blue-300">
              Not Overdue
            </h1>
          )}

          {dates.length > 0 ? (
            dates.map((date) => {
              if (!isPastDate(date)) {
                const tasksForDate = tasksForCategory.filter(
                  (task) => task.dueDate === date,
                );
                return (
                  <DaySection
                    key={date}
                    date={date}
                    tasks={tasksForDate}
                    categories={categories}
                    filters={defaultFilters}
                  />
                );
              }
            })
          ) : (
            <h1 className="mt-8 text-center">
              You don't have any upcoming tasks for this category
            </h1>
          )}
        </div>
        <div className="mt-16 flex w-full justify-center">
          <button
            className="text-md rounded-md bg-error px-3 py-1 text-center text-white"
            onClick={handleDeleteClicked}
          >
            Delete Category
          </button>
        </div>

        {displaySelectColor && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <ColorSelectorModal
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              setDisplaySelectColor={setDisplaySelectColor}
            />
          </div>
        )}

        <ViewTask tasks={tasksForCategory} categories={categories} />
      </div>

      {displayDeleteModal && (
        <DeleteModal
          text="Are you sure you want to delete this category?"
          setDisplay={setDisplayDeleteModal}
          deleteFunction={handleDelete}
        />
      )}
    </div>
  );
}

export default TasksForCategorySection;
