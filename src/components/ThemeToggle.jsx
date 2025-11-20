import { useState } from "react";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const activeLightMode = () => {
    setTheme("light");
    document.documentElement.classList.remove("dark");
  };

  const activeDarkMode = () => {
    setTheme("dark");
    document.documentElement.classList.add("dark");
  };

  if (theme == "dark") {
    return (
      <div>
        <Moon color="white" size={38} onClick={activeLightMode} />
      </div>
    );
  } else {
    return (
      <div>
        <Sun color="white" size={38} onClick={activeDarkMode} />
      </div>
    );
  }
}

export default ThemeToggle;
