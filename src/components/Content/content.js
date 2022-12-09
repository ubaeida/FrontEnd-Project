import classes from "./Content.module.css";
import {  Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
const Profile = React.lazy(() => import("../Profile/Profile"));

const Content = () => {
  return (
    <>
      <div className={classes.content}>
        <Routes>
          <Route path="/profile" element={<Suspense><Profile /></Suspense>}/>
        </Routes>
      </div>
    </>
  );
};

export default Content;
