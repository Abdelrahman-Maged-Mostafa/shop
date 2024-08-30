import { createContext, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { isLogin } from "../api/user";

export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [login, setLogin] = useLocalStorageState(false, "login");

  const checkLogin = useCallback(
    async function checkLogin() {
      console.log(cookies?.jwt);
      setLogin(() => false);
      if (cookies?.jwt) {
        const logined = await isLogin(cookies?.jwt);
        setLogin(() => logined);
      }
    },
    [cookies, setLogin]
  );

  return (
    <LoginContext.Provider
      value={{ cookies, setCookie, login, setLogin, checkLogin, removeCookie }}
    >
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
