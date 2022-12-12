import Nav from "../../components/Nav/Nav";
import Head from "../../components/Head/Head.";
import classes from "./WrraperComponent.module.css";
import { useState, useContext } from "react";
const WrraperComponent = (props) => {
  return  (
    <div className={classes.homePageContainer}>
      <header>
        <Nav  />
      </header>
      <div className={classes.content}>
        <Head title={props.title} />
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default WrraperComponent;
