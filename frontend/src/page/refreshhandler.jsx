import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      // Redirect if already logged in and on login/signup/root page
      if (
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/"
      ) {
        navigate("/Final", { replace: false });
      }
    } else {
      // If not logged in, send to login page
      navigate("/login");
    }
  }, []);

  return null; // since it just handles logic
};

export default RefreshHandler;
