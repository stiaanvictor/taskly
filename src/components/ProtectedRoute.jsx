import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Loading from "./Loading";

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );

  if (!user) {
    console.log("[ProtectedRoute] no user, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
