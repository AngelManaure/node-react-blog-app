import { Link } from "react-router-dom";
import { useState } from "react";
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
  const [navActive, setNavActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [loginActive, setLoginActive] = useState(true);
  const [registerActive, setRegisterActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault()
  }

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
      setLoginActive(true)
    } else {
      setLoginActive(false)
    }
  }

  const registerClick = () => {
    if (registerActive == false) {
      setRegisterActive(true)
    } else {
      setRegisterActive(false)
    }
  }

  const handleAuthForm = (e) => {
    e.preventDefault()
  }

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

      <div className={searchActive == true ? "showSearch" : "search"}>

      <div className="closeNav" onClick={handleSearch}>
          <i className="ri-close-line closeNavIcon"></i>
        </div>
        <form className="searchContainer" onSubmit={handleSubmit}>
            <div className="searchIconContainer">
            <i className="ri-search-line"></i>
            </div>
            <input type="text" className="searchInput" />

            <button className="searchButton" onClick={handleSearch}>Buscar</button>
        </form>
      </div>

      <nav className={navActive == true ? "showNavbar" : "navbar"}>
        <div className="closeNav" onClick={handleClick}>
          <i className="ri-close-line closeNavIcon"></i>
        </div>

        <div className="navLinks">
          <NavLink to={"/"} handleClick={handleClick}>
            Publicaciones destacadas
          </NavLink>


          <div className="navLinkContainer" onClick={loginClick}>
          <button className="navLinkButton">
            Iniciar sesión
          </button>
          </div>

          <div className="navLinkContainer" onClick={registerClick}>
          <button className="navLinkButton">
            Registrarse
          </button>
          </div>

          <NavLink to={"/"} handleClick={handleClick}>
            Ayuda
          </NavLink>
        </div>
      </nav>
        
        <div className={loginActive == true ? 'authFormContainer' : 'showAuthFormContainer'}>
        <div className="closeAuthForm" onClick={loginClick}>
          <i className="ri-close-line closeNavIcon authClose"></i>
        </div>
          <form className="authForm" onClick={handleAuthForm}>
            <div className="authInputGroup">
            <input type="text" className="authInput" placeholder="Correo electrónico"/>
            <input type="password" className="authInput" placeholder="Contraseña"/>
            <p className="authRedirect">Aún no tienes una cuenta? <span className="authBack" onClick={loginClick}>Volver</span></p>

            </div>
            <button className="authButton">
              Iniciar sesión
            </button>

          </form>
        </div>

        <div className={registerActive == true ? 'authFormContainer' : 'showAuthFormContainer'}>
        <div className="closeAuthForm" onClick={registerClick}>
          <i className="ri-close-line closeNavIcon authClose"></i>
        </div>
          <form className="authForm" onClick={handleAuthForm}>
            <div className="authInputGroup">
            <input type="text" className="authInput" placeholder="Nombre de usuario"/>
            <input type="text" className="authInput" placeholder="Correo electrónico"/>
            <input type="password" className="authInput" placeholder="Contraseña"/>
            <input type="password" className="authInput" placeholder="Confirmar contraseña"/>
            <p className="authRedirect">Ya tienes una cuenta? <span className="authBack" onClick={registerClick}>Volver</span></p>

            </div>
            <button className="authButton">
              Registrarse
            </button>

          </form>
        </div>

    </header>
  );
}

export default Navbar;
