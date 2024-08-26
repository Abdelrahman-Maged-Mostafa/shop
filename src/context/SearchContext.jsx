import { createContext, useState } from "react";

export const SearchContext = createContext();

function SearchContextProvider({ children }) {
  const [blog, setBlog] = useState("");
  return (
    <SearchContext.Provider value={{ blog, setBlog }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
