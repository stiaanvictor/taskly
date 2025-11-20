import AddCategoryCard from "./AddCategoryCard";
import CategoryCard from "./CategoryCard";

function CategoriesSection({ tasks, categories }) {
  return (
    <div className="flex justify-center mt-5">
      <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-4 max-w-screen-xl mx-auto">
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
