import AddCategoryCard from "./AddCategoryCard";
import CategoryCard from "./CategoryCard";

function CategoriesSection({ tasks, categories }) {
  return (
    <div className="mt-2 flex flex-1 flex-col justify-center">
      <h1 className="mt-2 text-center text-3xl text-text dark:text-white">
        Categories:
      </h1>
      <div className="mx-auto mt-4 grid max-w-screen-xl flex-1 grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] lg:max-w-[60rem]">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            categoryId={category.id}
            name={category.name}
            color={category.color}
            tasks={tasks}
          />
        ))}
        <AddCategoryCard />
      </div>
    </div>
  );
}

export default CategoriesSection;
