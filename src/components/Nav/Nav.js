import classes from "./Nav.module.css";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ExploreIcon from "@mui/icons-material/Explore";
import ViewListIcon from "@mui/icons-material/ViewList";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink } from "react-router-dom";

const Nav = ({ setActiveCompontet }) => {
  const links = [
    {
      target: "/",
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      target: "/somewhere",
      text: "Messages",
      icon: <EmailIcon />,
    },
    {
      target: "/somewhere",
      text: "Bookmarks",
      icon: <ExploreIcon />,
    },
    {
      target: "/somewhere",
      text: "Explore",
      icon: <BookmarksIcon />,
    },
    {
      target: "/somewhere",
      text: "Lists",
      icon: <ViewListIcon />,
    },
    {
      target: "/profile",
      text: "Profile",
      icon: <PersonIcon />,
    },
    {
      target: "/logout",
      text: "Sign Out",
      icon: <LockIcon />,
    },
  ];
  return (
    <nav>
      <div className={`${classes.image}`}>
        <img src="logo.svg" alt="logo" />
      </div>
      <div className={classes.menu}>
        {links.map((link, i) => (
          <NavLink
            key={i}
            to={link.target}
            className={({ isActive }) => isActive ? `${setActiveCompontet(link.text)} ${classes.menuItems} ${classes.active}`
                : `${classes.menuItems}`
            }>
            <div>{link.icon}</div>
            <div>{link.text}</div>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
