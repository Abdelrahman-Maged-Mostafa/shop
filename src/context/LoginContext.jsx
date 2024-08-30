import { createContext } from "react";
import { useCookies } from "react-cookie";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [login, setLogin] = useLocalStorageState(false, "login");
  return (
    <LoginContext.Provider value={{ cookies, setCookie, login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
