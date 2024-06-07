import { Link } from "react-router-dom";

function AboutLinks() {
  return (
    <div className="AboutLinks">
    <Link to="/about-page/content">Política de contenidos</Link>
    <Link to="/about-page/priv">Política de Privacidad</Link>
    <Link to="/about-page/terminos">Términos y Condiciones de Uso</Link>
  </div>
  )
}

export default AboutLinks