import { Link } from "react-router-dom";
// import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNav } from "../../context/NavContext";
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
  const {
    navActive,
    setNavActive,
    searchActive,
    loginActive,
    setLoginActive,
    registerActive,
    setRegisterActive,
    handleClick,
    handleSearch,
    loginClick,
    registerClick,
  } = useNav();

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

      <Search searchActive={searchActive} handleSearch={handleSearch} />

      <nav className={navActive == true ? "showNavbar" : "navbar"}>
        <div className="closeNav" onClick={handleClick}>
          <i className="ri-close-line closeNavIcon"></i>
        </div>

        <div className="navLinks">
          {isAuthenticated ? (
            <>
              <div className="navLinkContainer">
                <Link
                  to="/"
                  onClick={() => {
                    logout(setNavActive);
                    setNavActive(false);
                  }}
                  className="navLinkButton"
                >
                  Cerrar sesión
                </Link>
              </div>

              <NavLink
                className="navLinkButton"
                to={"/profile"}
                handleClick={handleClick}
              >
                Mis publicaciones
              </NavLink>
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

          <NavLink to={"/featured-posts"} handleClick={handleClick}>
            Publicaciones destacadas
          </NavLink>

          <NavLink to={"/all-post"} handleClick={handleClick}>
            Todas las publicaciones
          </NavLink>

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
