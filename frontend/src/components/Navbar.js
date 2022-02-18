import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import Sidebar from "./Sidebar";
import user from "../reducers/user";

import { faHome, faList, faCog, faUtensils } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList,
    },
    {
      name: "Create",
      path: "/create",
      icon: faUtensils,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: faCog,
    },
  ];

  function closeSidebar() {
    setShowSidebar(false);
  }

  const logOut = () => {
    dispatch(user.actions.setAccessToken(null));
    navigate("/login");
  };

  return (
    <>
      <div className="navbar container">
        <button className="logOutButton" onClick={logOut}>Log out</button>
        <Link to="/" className="logo">
          Aschwin's<span>Recipe</span>App
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>
              {link.name}
            </Link>
          ))}
        </div>
        <div onClick={() => setShowSidebar(!showSidebar)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
};

export default Navbar;
