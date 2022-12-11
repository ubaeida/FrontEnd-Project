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
      tartget: "/",
      text: "Home",
      icon: <HomeIcon />,
      active:false
    },
    {
      tartget: "/somewhere",
      text: "Messages",
      icon: <EmailIcon />,
    },
    {
      tartget: "/somewhere",
      text: "Bookmarks",
      icon: <ExploreIcon />,
    },
    {
      tartget: "/somewhere",
      text: "Explore",
      icon: <BookmarksIcon />,
    },
    {
      tartget: "/somewhere",
      text: "Lists",
      icon: <ViewListIcon />,
    },
    {
      tartget: "/profile",
      text: "Profile",
      icon: <PersonIcon />,
    },
    {
      tartget: "/logout",
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
            to={link.tartget}
            
            className={({ isActive }) =>
              isActive  ? ` ${ setActiveCompontet(link.text) } ${classes.menuItems} ${classes.active} ` : `${classes.menuItems}`}
            >
            <div>{link.icon}</div>
            <div>{link.text}</div>
          </NavLink>
        ))
        }
      </div>
    </nav>
  );
};

export default Nav;
