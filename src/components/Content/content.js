import classes from "./Content.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

const Content = () => {
  return (
    <>
      <div className={classes.content}>
        <div className={classes.head}>
          <h3>Content</h3>
          <div className={classes.iconsBar}>
            <div className={classes.icons}>
                <NavLink><div><HomeIcon /></div></NavLink>
                <NavLink><div><PersonIcon /></div></NavLink>
                <NavLink><div><LockIcon /></div></NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
