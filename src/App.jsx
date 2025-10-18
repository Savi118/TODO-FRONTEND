import { Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AppPage from "./pages/AppPage";
import { use, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route
          path="/home"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login setToken={setToken} />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup setToken={setToken} />
            </PublicRoute>
          }
        />
        <Route
          path="/app"
          element={
            <PrivateRoute>
              <AppPage />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to={token ? "/app" : "/home"} />} />
      </Routes>
    </>
  );
}

export default App;
