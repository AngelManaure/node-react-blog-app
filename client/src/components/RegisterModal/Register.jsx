import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { EmailInput, PasswordInput } from "../inputs";

function Register({
  registerClick,
  registerActive,
  setRegisterActive,
  setNavActive,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, errors: registerErrors } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState('');

  const onSubmit = handleSubmit(async (values) => {
    if (!termsAccepted) {
      setTermsError('Debes aceptar los Términos y Condiciones para registrarte.');
      return;
    }
    signup(values, setRegisterActive, setNavActive);
  });

  return (
    <div
      className={
        registerActive == false ? "authFormContainer" : "showAuthFormContainer"
      }
    >
      {registerErrors.map((error, i) => (
        <div key={i} className="registerError">
          {error}
        </div>
      ))}
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
            autoComplete="true"
            {...register("username", { required: true })}
          />

          {errors.email && (
            <p className="formErrors">Correo electrónico requerido</p>
          )}

          <EmailInput register={register}/>

          {errors.password && (
            <p className="formErrors">Contraseña requerido</p>
          )}
          
          <PasswordInput register={register}/>

          <div className="termsContainer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label>
              He leído y acepto los{" "}
              <br />
              <a 
              className="termsRedirect"
              href="/about-page/terminos" 
              target="_blank" 
              rel="noopener noreferrer">
                Términos y Condiciones de Uso
              </a>
            </label>
          </div>
          {termsError && <p className="formErrors termErros">{termsError}</p>}

          <p className="authRedirect">
            Ya tienes una cuenta?{" "}
            <span className="authBack" onClick={registerClick}>
              Iniciar sesión
            </span>
          </p>
        </div>
        <button className="authButton">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
