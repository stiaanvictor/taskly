import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { UserProvider } from "./context/UserContext";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <SidebarProvider>
          <ViewTaskProvider>
            <NavBar />

            <Routes>
              {/* PUBLIC */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignupPage />
                  </PublicRoute>
                }
              />

              {/* PROTECTED */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <CalendarPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <CategoriesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addcategory"
                element={
                  <ProtectedRoute>
                    <AddCategoryPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new-task/"
                element={
                  <ProtectedRoute>
                    <NewTaskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new-task/:categoryId"
                element={
                  <ProtectedRoute>
                    <NewTaskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/category/:id"
                element={
                  <ProtectedRoute>
                    <ViewCategoryPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster position="bottom-center" reverseOrder={false} />
          </ViewTaskProvider>
        </SidebarProvider>
      </BrowserRouter>
    </UserProvider>
  );
}
