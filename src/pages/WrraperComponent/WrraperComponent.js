import Nav from "../../components/Nav/Nav";
import Head from "../../components/Head/Head.";
import classes from "./WrraperComponent.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const WrraperComponent = (props) => {
  const {darkMode} = useContext(AuthContext)
  return  (
    <div className={classes.homePageContainer}>
      <header>
        <Nav  />
      </header>
      <div className={darkMode ? `${classes.contentDark} ${classes.content}` : `${classes.content}`}>
        <Head title={props.title} />
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default WrraperComponent;
