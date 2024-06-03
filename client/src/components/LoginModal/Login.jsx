import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

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

export default Login