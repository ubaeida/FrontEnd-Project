import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const Register = React.lazy(() => import("./pages/register/Register"));
const Login = React.lazy(() => import("./pages/Login/Login"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Suspense> <Register /></Suspense>}/>
        <Route path="/register" element={<Suspense> <Register /></Suspense>}/>
        <Route path="/login" element={<Suspense><Login /></Suspense>}/>
      </Routes>
    </>
  );
}

export default App;
