import myImage from "../assets/profile-pic.png";
import logo from "../assets/logo-white-text.png";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <div className="lg:fixed lg:top-0 lg:w-full">
      <nav className="dark:bg-dark-primary flex items-center justify-between bg-primary px-5 py-2 text-white lg:h-16">
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          <div className="h-12 w-12"></div>
        ) : (
          <img
            src={myImage}
            alt=""
            className="dark:border-dark-background h-12 w-12 rounded-full border-2 border-background object-cover"
          />
        )}

        <img src={logo} alt="logo" className="h-10 object-contain" />

        <ThemeToggle />
      </nav>
    </div>
  );
}

export default NavBar;
