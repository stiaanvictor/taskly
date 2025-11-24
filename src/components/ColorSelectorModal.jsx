import { CATEGORY_COLORS } from "../constants/categoryColors";

function ColorSelectorModal({
  selectedColor,
  setSelectedColor,
  setDisplaySelectColor,
}) {
  const colors = CATEGORY_COLORS;

  const handleClick = (hex) => {
    setSelectedColor(hex);
    setDisplaySelectColor(false);
  };

  return (
    <div className="w-[80%] rounded-2xl border-2 border-borders bg-white px-4 py-8 text-black dark:border-gray-600 dark:bg-[#1e293b] dark:text-white lg:w-[600px]">
      <h1 className="text-center text-2xl text-text dark:text-white">
        Select Color
      </h1>

      <div className="mt-4 grid grid-cols-2">
        {colors.map((color) => (
          <div className="mt-2 flex items-center" key={color.hex}>
            <div
              className="h-8 w-8 rounded-md hover:cursor-pointer hover:brightness-90"
              style={{
                background: selectedColor === color.hex ? color.hex : "white",
                border: `5px solid ${color.hex}`,
              }}
              onClick={() => handleClick(color.hex)}
            />
            <h2 className="ml-2 text-text dark:text-white">{color.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorSelectorModal;
