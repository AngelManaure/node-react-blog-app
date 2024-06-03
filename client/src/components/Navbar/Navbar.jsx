import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from '../../context/AuthContext'
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

function Register({ registerClick, registerActive, setRegisterActive, setNavActive }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signup, errors: registerErrors } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    signup(values, setRegisterActive, setNavActive);
  });

  return (
    <div className={registerActive == false ? 'authFormContainer' : 'showAuthFormContainer'}>
      {
        registerErrors.map((error, i) => (
          <div key={i} className="registerError">
            {error}
          </div>
        ))
      }
    <div className="closeAuthForm" onClick={registerClick}>
      <i className="ri-close-line closeNavIcon authClose"></i>
    </div>
      <form className="authForm" onSubmit={onSubmit}>
        <div className="authInputGroup">

        {errors.username && (
            <p className="formErrors">Correo electrónico requerido</p>
          )}
        <input 
        type="text" 
        className="authInput" 
        placeholder="Nombre de usuario"
        {...register("username", {required: true})}
        />
        
        {errors.email && (
            <p className="formErrors">Correo electrónico requerido</p>
          )}

        <input 
        type="text" 
        className="authInput" 
        placeholder="Correo electrónico"
        autoComplete="true"
        {...register("email", {required: true})}
        />

        {errors.password && (
            <p className="formErrors">Contraseña requerido</p>
          )}

        <input 
        type="password" 
        className="authInput" 
        placeholder="Contraseña"
        {...register("password", {required: true})}
        />

        <p className="authRedirect">Ya tienes una cuenta? <span className="authBack" onClick={registerClick}>Volver</span></p>

        </div>
        <button className="authButton">
          Registrarse
        </button>

      </form>
    </div>
  )
}

function Login({ loginClick, loginActive, setNavActive, setLoginActive }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data, setNavActive, setLoginActive);
  })

  return (
    <div className={loginActive == true ? 'authFormContainer' : 'showAuthFormContainer'}>
    <div className="closeAuthForm" onClick={loginClick}>
      <i className="ri-close-line closeNavIcon authClose"></i>
    </div>
      <form className="authForm" onSubmit={onSubmit}>

      {signinErrors.map((error, i) => (
          <div className="registerError" key={i}>
            {error}
          </div>
        ))}

        <div className="authInputGroup">

        {errors.email && <p className="formErrors">Email requerido</p>}
        <input 
        type="text" 
        className="authInput" 
        placeholder="Correo electrónico"
        {...register("email", { required: true })}
        autoComplete="true"
        />

        {errors.password && (
            <p className="formErrors">Contraseña requerida</p>
          )}
        <input 
        type="password" 
        className="authInput" 
        placeholder="Contraseña"
        {...register("password", { required: true })}
        />
        <p className="authRedirect">Aún no tienes una cuenta? <span className="authBack" onClick={loginClick}>Volver</span></p>

        </div>
        <button className="authButton">
          Iniciar sesión
        </button>

      </form>
    </div>
  )
}

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [navActive, setNavActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [loginActive, setLoginActive] = useState(true);
  const [registerActive, setRegisterActive] = useState(false);

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

                    <NavLink to={"/"} handleClick={handleClick}>
                    Ayuda
                    </NavLink>
            {isAuthenticated ? (
              <>
                  <Link
                    to="/"
                    onClick={() => {
                      logout(setNavActive);
                      setNavActive(false)
                    }}
                    className="navLink"
                  >
                    Cerrar sesión
                  </Link>
              </>
          ) : (
            <>
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
