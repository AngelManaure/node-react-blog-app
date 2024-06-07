import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useNav } from "../../context/NavContext";

import "./HomePage.css";

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { loginClick } = useNav();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  return (
    <main className="homeContainer" id="#home-container">
      <section className="upSection" id="up-section">
        <article className="upsectionTextContainer">
          <p className="upSectionText">
            Comparte tus ideas y dudas sobre tu proyecto o sobre uno que quieras
            realizar
          </p>
        </article>

        <div className="createPostButtonContainer">
          <button onClick={loginClick} className="createPost">
            Crear Post
          </button>
        </div>
        <div className="upSectionIcons">
          <a href="#post-section" className="goDown">
            <i className="ri-arrow-down-circle-fill"></i>
          </a>
        </div>
      </section>

      <section className="postSection" id="post-section">
        <article className="postSectionTextContainer">
          <p className="postSectionText">
            Explora y encuentra proyectos en curso en los que interesarte
          </p>

          <Link to={"/featured-posts"} className="bestPost">
            Publicaciones destacadas
          </Link>
        </article>
      </section>

      <section className="lastSection">
        <article className="loginInfoSection">
          <p className="loginInfoSectionText">
            Encuentra amistades que compartan tus ideas y has proyectos en grupo
          </p>

          <a
            href="#header"
            className="loginInfoSectionLink"
            onClick={loginClick}
          >
            Iniciar sesión
          </a>
        </article>
        <article className="infoSection">
          <div className="aboutInfoSection">
            <h3 className="aboutInfoSectionTitle">Redes sociales :</h3>
            <div className="aboutInfoSectionLinks">
              <a
                rel="noopener noreferrer"
                href="https://www.instagram.com/manaure872/"
                target="_BLANK"
                className="aboutInfoSectionLink"
              >
                <i className="ri-instagram-line"></i>
              </a>

              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/angel.art.925602/"
                target="_BLANK"
                className="aboutInfoSectionLink"
              >
                <i className="ri-facebook-box-fill"></i>
              </a>

              <a
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/angel-manaure-40b5372b6/"
                target="_BLANK"
                className="aboutInfoSectionLink"
              >
                <i className="ri-linkedin-box-fill"></i>
              </a>
            </div>
          </div>

          <div className="politicInfo">
            <Link to="/about-page/content">Política de contenidos</Link>
            <Link to="/about-page/priv">Política de Privacidad</Link>
            <Link to="/about-page/terminos">Términos y Condiciones de Uso</Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default HomePage;
