import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { SidebarProvider } from "./context/SidebarContext";
import { ViewTaskProvider } from "./context/ViewTaskContext";
import CalendarPage from "./pages/CalendarPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NewTaskPage from "./pages/NewTaskPage";
import ViewCategoryPage from "./pages/ViewCategoryPage";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/new-task" element={<NewTaskPage />} />
            <Route path="/category/:id" element={<ViewCategoryPage />} />
          </Routes>
        </ViewTaskProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}
