import myImage from "../assets/profile-pic.png";
import logo from "../assets/logo-white-text.png";
import ThemeToggle from "./ThemeToggle";

function NavBar() {
  return (
    <nav className="bg-primary px-5 py-2 flex justify-between items-center">
      <img
        src={myImage}
        alt=""
        className="w-12 h-12 object-cover rounded-full"
      />
      <img src={logo} alt="" className="h-10 object-contain" />
      <ThemeToggle />
    </nav>
  );
}

export default NavBar;
