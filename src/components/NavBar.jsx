import defaultPic from "../assets/default-profile-pic.png";
import logo from "../assets/logo-white-text.png";
import ThemeToggle from "./ThemeToggle";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

function NavBar() {
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    user && console.log(user.photoURL);
  }, [user]);

  return (
    <div className="lg:fixed lg:top-0 lg:w-full">
      <nav className="flex items-center justify-between bg-primary px-5 py-2 text-white dark:bg-dark-primary lg:h-16 lg:px-16">
        {location.pathname === "/login" || location.pathname === "/signup" ? (
          <div className="h-12 w-12"></div>
        ) : (
          <img
            src={user?.photoURL || defaultPic}
            referrerPolicy="no-referrer"
            alt=""
            className="h-12 w-12 rounded-full border-2 border-background object-cover dark:border-dark-background"
          />
        )}

        <img src={logo} alt="logo" className="h-10 object-contain" />

        <ThemeToggle />
      </nav>
    </div>
  );
}

export default NavBar;
