import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // get auth token

  // If user is logged in, redirect to app/dashboard
  if (token) {
    return <Navigate to="/app" replace />;
  }

  return children; // otherwise render the page
};

export default PublicRoute;
