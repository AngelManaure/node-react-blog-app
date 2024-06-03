import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

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

export default Register