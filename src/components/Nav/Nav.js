import classes from "./Nav.module.css";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ExploreIcon from "@mui/icons-material/Explore";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className={`${classes.image}`}>
        <img src="logo.svg" alt="logo" />
      </div>
      <div className={classes.menu}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <HomeIcon />
          </div>
          <div>Home</div>
        </NavLink>
        <NavLink
          to="/somewhere"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <EmailIcon />
          </div>
          <div>Messages</div>
        </NavLink>
        <NavLink
          to="/somewhere"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <BookmarksIcon />
          </div>
          <div>Bookmarks</div>
        </NavLink>
        <NavLink
          to="/somewhere"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <ExploreIcon />
          </div>
          <div>Explore</div>
        </NavLink>
        <NavLink
          to="/somewhere"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <ViewListIcon />
          </div>
          <div>Lists</div>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <PersonIcon />
          </div>
          <div>Profile</div>
        </NavLink>
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            isActive
              ? `${classes.menuItems} ${classes.active}`
              : `${classes.menuItems}`
          }
        >
          <div>
            <LockIcon />
          </div>
          <div>Sing Out</div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
