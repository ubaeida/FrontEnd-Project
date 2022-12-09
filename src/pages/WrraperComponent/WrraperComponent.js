import Nav from "../../components/Nav/Nav";
import Head from "../../components/Head/Head.";
import classes from "./WrraperComponent.module.css";
const WrraperComponent = (Component) =>({...props}) => (
    <div className={classes.homePageContainer}>
      <header>
        <Nav />
      </header>
      <div className={classes.content}>
        <Head />
        <div>
          <Component {...props}/>
        </div>
      </div>
    </div>
);

export default WrraperComponent;
