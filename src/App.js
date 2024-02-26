import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation} from "react-router-dom";
import { SignIn } from "./pages";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NewProjectModal from "./pages/Project/NewProject";
import ProjectList from "./pages/Project/ProjectList";
import FetchProject from "./pages/fetchProject";

export default function App() {
  let navigate = useNavigate();
  const [token, setToken] = useState(null);

  const YourComponent = () => {
    const location = useLocation();
  
    useEffect(() => {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken || location.pathname === "/register") {
        // If there's a token or the current route is /register, proceed
        if (storedToken) {
          setToken(JSON.parse(storedToken));
        }
      } else {
        navigate("/login"); // Redirect to login if token is not present and not on /register
      }
    }, [location.pathname]); // Listen to changes in pathname
  };

  const sampleProjects = [
    { id: 1, title: "Project A", status: "Active" },
    { id: 2, title: "Project B", status: "Inactive" },
    { id: 3, title: "Project C", status: "Active" },
    { id: 4, title: "Project D", status: "Active" },
    { id: 5, title: "Project E", status: "Inactive" },
  ];

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Login setToken={setToken} />} />
        <Route path={"/login"} element={<Login setToken={setToken} />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/fetch"} element={<FetchProject />} />
        <Route path={"/project"} element={<ProjectList projects={sampleProjects} token={token} />} />
        
      </Routes>
    </div>
  );
}
