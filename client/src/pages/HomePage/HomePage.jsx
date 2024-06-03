import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import "./HomePage.css";
import { useEffect } from "react";


function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile")
    }
  }, [isAuthenticated])

  return (
    <main className="homeContainer" id="#home-container">
      <section className="upSection" id="up-section">
        <div className="categoryModalContainer">
          <div className="categoryModalContent">
            <details className="categoryModal">
              <summary className="categoryModalName">Categorías</summary>
              <ul className="categoryModalList">
                <li>
                  <Link className="categoryModalItem">Frontend</Link>
                </li>
                <li>
                  <Link className="categoryModalItem">Backend</Link>
                </li>
                <li>
                  <Link className="categoryModalItem">Proyectos</Link>
                </li>
                <li>
                  <Link className="categoryModalItem">Dudas</Link>
                </li>
              </ul>
            </details>
          </div>
        </div>

        <article className="upsectionTextContainer">
          <p className="upSectionText">
            Comparte tus ideas y dudas sobre tu proyecto o sobre uno que quieras
            realizar
          </p>
        </article>

        <div className="createPostButtonContainer">
          <Link to={"/"} className="createPost">Crear Post</Link>
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

          <Link to={'/'} className="bestPost">Publicaciones destacadas</Link>
        </article>
      </section>

      <section className="lastSection">
        <article className="loginInfoSection">
          <p className="loginInfoSectionText">
          Encuentra amistades que compartan tus ideas y has proyectos en grupo
          </p>

          <a href="#header" className="loginInfoSectionLink">Iniciar sesión</a>
        </article>
        <article className="infoSection">
          
          <div className="helpInfoSection">
            <h3 className="helpInfoSectionTitle">
              Ayuda
            </h3>
              <div className="helpInfoSectionLinks">
                <a href="#" className="helpInfoSectionLink">
                  Tutorial
                </a>

                <a href="#" className="helpInfoSectionLink">
                  Reportar un bug
                </a>
              </div>
          </div>

          <div className="aboutInfoSection">
            <h3 className="aboutInfoSectionTitle">
              Desarrollado por:
            </h3>
              <div className="aboutInfoSectionLinks">
                <a href="#" className="aboutInfoSectionLink">
                <i className="ri-instagram-line"></i>
                </a>

                <a href="#" className="aboutInfoSectionLink">
                <i className="ri-facebook-box-fill"></i>
                </a>

                <a href="#" className="aboutInfoSectionLink">
                <i className="ri-linkedin-box-fill"></i>
                  </a>
              </div>
          </div>
        </article>

              <div className="politInfoSection">
                
                <a href="#" className="politInfoLink">Condiciones de servicio
                </a>

                <a href="#" className="politInfoLink">Privacidad
                </a>

                <a href="#" className="politInfoLink">Politica de contenido
                </a>
              </div>
      </section>
    </main>
  );
}

export default HomePage;
