import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("this component outside provider");
  return context;
}
