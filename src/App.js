import React, { Suspense, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import "./App.css";

const Register = React.lazy(() => import("./pages/Register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Logout = React.lazy(() => import("./pages/Logout/Logout"));

function App() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              {" "}
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense>
              {" "}
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/logout"
          element={
            <Suspense>
              <Logout />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
