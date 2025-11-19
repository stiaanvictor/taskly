import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./component/NavBar";
import { SidebarProvider } from "./context/SidebarContext";
import { ViewTaskProvider } from "./context/ViewTaskContext";
import CalendarPage from "./pages/CalendarPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddCategoryPage from "./pages/AddCategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <ViewTaskProvider>
          {/* Navigation Bar */}
          <NavBar />

          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/addcategory" element={<AddCategoryPage />} />
          </Routes>
        </ViewTaskProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}
