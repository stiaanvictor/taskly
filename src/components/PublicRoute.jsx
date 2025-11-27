import { useUser } from "../context/UserContext";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user, loading } = useUser();

  if (loading)
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );

  if (user) {
    console.log("[PublicRoute] user logged in, redirecting to /");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
