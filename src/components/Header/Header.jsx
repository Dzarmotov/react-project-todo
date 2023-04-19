import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ isLoggedIn, setIsLoggedIn, userName }) => {
  const [showIsToggleInfo, setShowIsToggleInfo] = React.useState(false);
  const [burgerMenu, setBurgerMenu] = React.useState(true);
  const showRef = React.useRef();

  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false);
    setIsLoggedIn(false);
  };

  const toggleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  const toggleArrow = () => {
    setShowIsToggleInfo(!showIsToggleInfo);
  };

  const handleOutsideClick = (e) => {
    if (!e.composedPath().includes(showRef.current)) {
      setShowIsToggleInfo(false);
      setBurgerMenu(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <header className="header">
          <div className="header-wrap">
            <h2>Dzarmotov</h2>
            <div className="item-list-none">
              <ul className="item-list item-list-style">
                <li>
                  {" "}
                  <NavLink to="main">Главная</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="posts">Список задач</NavLink>{" "}
                </li>
              </ul>
            </div>
            <div className="wrap" ref={showRef}>
              <div className="menu-burger-header" onClick={toggleBurgerMenu}>
                <MenuIcon style={{ fill: "#fff" }} className="menu-burger" />
              </div>
              {burgerMenu && (
                <div className="menu-burger-style">
                  <ul className="item-list">
                    <li>
                      {" "}
                      <NavLink to="main">Главная</NavLink>{" "}
                    </li>
                    <li>
                      {" "}
                      <NavLink to="posts">Список задач</NavLink>{" "}
                    </li>
                  </ul>
                </div>
              )}
              <h2 className="wrap-li">{userName}</h2>
              <p
                onClick={toggleArrow}
                className={showIsToggleInfo ? "rotate-top" : "rotate-bottom"}
              >
                &#8249;
              </p>
              {showIsToggleInfo && (
                <div className="control-of-show">
                  <div className="show-wrap">
                    <LogoutIcon style={{ fill: "#fff" }} />
                    <p className="show-icon">
                      <NavLink to="loginPage" onClick={handleLogOut}>
                        Выйти
                      </NavLink>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      ) : (
        <h2 className="welcome-title">Welcome</h2>
      )}
    </div>
  );
};
export default Header;
