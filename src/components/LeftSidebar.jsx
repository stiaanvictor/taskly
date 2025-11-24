// LeftSidebar.jsx
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

function LeftSidebar() {
  return (
    <>
      {/* Mobile version */}
      <div className="lg:hidden">
        <MobileSidebar />
      </div>

      {/* Desktop version (placeholder for now or your desktop UI later) */}
      <div className="hidden lg:block">
        {/* Whatever desktop sidebar you want to show */}
        <DesktopSidebar />
      </div>
    </>
  );
}

export default LeftSidebar;
