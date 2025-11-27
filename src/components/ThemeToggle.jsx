import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getUserTheme, setUserTheme } from "../firebase/user.service";
import { useUser } from "../context/UserContext";

function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const unsub = getUserTheme(user.uid, (fetchedTheme) => {
        setTheme(fetchedTheme);
      });

      return () => unsub(); // cleanup listener
    }
  }, [user]);

  useEffect(() => {
    if (theme == "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const activeLightMode = () => {
    setUserTheme(user.uid, "light");
  };

  const activeDarkMode = () => {
    setUserTheme(user.uid, "dark");
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
