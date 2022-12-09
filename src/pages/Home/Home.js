import Nav from "../../components/Nav/Nav";
import Content from "../../components/Content/content";

import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.homePageContainer}>
      <header>
          <Nav />
      </header>
      <div> 
        <Content />
      </div>
    </div>
  );
};

export default Home;
