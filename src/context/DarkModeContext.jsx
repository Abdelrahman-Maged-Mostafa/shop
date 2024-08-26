import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches,
    "darkMode"
  );
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
export default DarkModeProvider;
