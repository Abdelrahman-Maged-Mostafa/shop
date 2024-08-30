import { createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { isLogin } from "../api/user";

export const LoginContext = createContext();
function LoginProvider({ children }) {
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [login, setLogin] = useLocalStorageState(false, "login");
  useEffect(
    () =>
      async function () {
        console.log(cookies?.jwt);
        setLogin(() => false);
        if (!cookies?.jwt) return;
        const logined = await isLogin(cookies?.jwt);
        setLogin(() => logined);
      },
    [cookies, setLogin]
  );

  return (
    <LoginContext.Provider value={{ cookies, setCookie, login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginProvider;
