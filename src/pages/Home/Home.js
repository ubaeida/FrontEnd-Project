import Nav from "../../components/Nav/Nav";
import Content from "../../components/Content/content";
import Head from "../../components/Head/Head.";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.homePageContainer}>
      <header>
        <Nav />
      </header>
      <div className={classes.content}>
        <Head />
        <div>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default Home;
