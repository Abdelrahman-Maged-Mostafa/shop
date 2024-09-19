import { useContext } from "react";
import { OptionContext } from "./OptionContext";

export function useOptions() {
  const context = useContext(OptionContext);
  if (!context) throw new Error("this component outside provider");
  return context;
}
