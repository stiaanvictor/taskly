import myImage from "../assets/profile-pic.png";
import logo from "../assets/logo-white-text.png";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between bg-primary px-5 py-2">
      {location.pathname === "/login" || location.pathname === "/signup" ? (
        <div className="h-12 w-12"></div>
      ) : (
        <img
          src={myImage}
          alt=""
          className="h-12 w-12 rounded-full object-cover"
        />
      )}

      <img src={logo} alt="" className="h-10 object-contain" />
      <ThemeToggle />
    </nav>
  );
}

export default NavBar;
