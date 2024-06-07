import { createContext, useState, useContext } from "react";

export const NavContext = createContext();

export const useNav = () => {
    const context = useContext(NavContext);
    if (!context) {
        throw new Error("useNav deberia estar dentro de un NavProvider")
    } else {
        return context
    }
};

export const NavProvider = ({ children }) => {
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
        <NavContext.Provider
            value={{
                handleClick,
                handleSearch,
                loginClick,
                registerClick,
                navActive,
                setNavActive,
                searchActive,
                loginActive,
                setLoginActive,
                registerActive,
                setRegisterActive,
            }}
        >
            { children }
        </NavContext.Provider>
      )
}