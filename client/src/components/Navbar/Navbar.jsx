import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import Register from "../RegisterModal/Register";
import Login from "../LoginModal/Login";
import Search from "../Search/Search";
import "./Navbar.css";

function NavLink({ children, to, handleClick }) {
  return (
    <span className="navLinkContainer" onClick={handleClick}>
      <Link to={to} className="navLink">
        {children}
      </Link>
    </span>
  );
}

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [navActive, setNavActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [loginActive, setLoginActive] = useState(true);
  const [registerActive, setRegisterActive] = useState(false);

  const handleClick = () => {
    if (navActive == false) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  };

  const handleSearch = () => {
    if (searchActive == false) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  };

  const loginClick = () => {
    if (loginActive == false) {
      setLoginActive(true);
    } else {
      setLoginActive(false);
    }
  };

  const registerClick = () => {
    if (registerActive == false) {
      setRegisterActive(true);
    } else {
      setRegisterActive(false);
    }
  };

  return (
    <header className="header" id="header">
      <div className="navLogo">
        <Link to={"/"} className="navLogoItem">
          WebRequest
        </Link>
      </div>

      <div className="rightNavIcons">
        <div className="navSearch" onClick={handleSearch}>
          <i className="ri-search-line searchIcon"></i>
        </div>

        <div className="navToggle" onClick={handleClick}>
          <i className="ri-menu-3-line navToggleIcon"></i>
        </div>
      </div>

      <Search 
      searchActive={searchActive} 
      handleSearch={handleSearch} />

      <nav className={navActive == true ? "showNavbar" : "navbar"}>
        <div className="closeNav" onClick={handleClick}>
          <i className="ri-close-line closeNavIcon"></i>
        </div>

        <div className="navLinks">
          <NavLink to={"/"} handleClick={handleClick}>
            Publicaciones destacadas
          </NavLink>

          <NavLink to={"/"} handleClick={handleClick}>
            Ayuda
          </NavLink>
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                onClick={() => {
                  logout(setNavActive);
                  setNavActive(false);
                }}
                className="navLink"
              >
                Cerrar sesión
              </Link>
            </>
          ) : (
            <>
              <div className="navLinkContainer" onClick={loginClick}>
                <button className="navLinkButton">Iniciar sesión</button>
              </div>

              <div className="navLinkContainer" onClick={registerClick}>
                <button className="navLinkButton">Registrarse</button>
              </div>
            </>
          )}
        </div>
      </nav>

      <Login
        loginClick={loginClick}
        loginActive={loginActive}
        setLoginActive={setLoginActive}
        setNavActive={setNavActive}
      />

      <Register
        registerClick={registerClick}
        registerActive={registerActive}
        setRegisterActive={setRegisterActive}
        setNavActive={setNavActive}
      />
    </header>
  );
}

export default Navbar;
