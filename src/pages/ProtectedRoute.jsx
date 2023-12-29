import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../store/store";

const ProtectedRoute = ({ children }) => {
  const context = useContext(AppContext);
  const { isLoggedIn } = context;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ProtectedRoute;
