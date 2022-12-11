import Nav from "../../components/Nav/Nav";
import Head from "../../components/Head/Head.";
import classes from "./WrraperComponent.module.css";
import { useState, useContext } from "react";
import {AuthContext} from '../../contexts/AuthContext'
const WrraperComponent = (Component) => {
  const [activeComponent, setActiveCompontet]  = useState(null)
  const {user, token} = useContext(AuthContext)
  return () => (
    <div className={classes.homePageContainer}>
      <header>
        <Nav setActiveCompontet={setActiveCompontet} />
      </header>
      <div className={classes.content}>
        <Head activeComponent={activeComponent}  />
        <div>
          <Component user={user} token={token} />
        </div>
      </div>
    </div>
  );
}

export default WrraperComponent;
