import React, { Suspense, useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import "./App.css";
import  Loading from "./components/Loading/Loading";
const Register = React.lazy(() => import("./pages/Register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Logout = React.lazy(() => import("./pages/Logout/Logout"));
const Tweets = React.lazy(() => import("./components/Tweets/Tweets"))
const Profile = React.lazy(() => import("./components/Profile/Profile"))

const App = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    else return
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Routes>
          <Route path="/" element={<Suspense fallback={<Loading/>}><Tweets /></Suspense>}/>
          <Route path="/register" element={ <Suspense fallback={<Loading/>}><Register /></Suspense>}/>
          <Route path="/login" element={<Suspense fallback={<Loading/>}><Login /></Suspense>}/>
          <Route path="/profile" element={<Suspense fallback={<Loading/>}><Profile /></Suspense>}/>
          <Route path="/logout" element={<Suspense fallback={<Loading/>}><Logout /></Suspense>}/>
      </Routes>
    </>
  );
}

export default App;
