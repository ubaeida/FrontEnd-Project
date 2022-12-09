import classes from './Head.module.css'
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";

const Head = () => { 
    return( 
        <div className={classes.head}>
        <h3>Content</h3>
        <div className={classes.iconsBar}>
          <div className={classes.icons}>
              <NavLink to="/" ><div><HomeIcon /></div></NavLink>
              <NavLink to="/profile"><div><PersonIcon /></div></NavLink>
              <NavLink to='/logout'><div><LockIcon /></div></NavLink>
          </div>
        </div>
      </div>
    )
}
export default Head