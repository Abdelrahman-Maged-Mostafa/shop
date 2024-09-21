import { useOptions } from "../context/useOptions";
import GlobalStyles from "./GlobalStyles";

function GlobalStylesComponent() {
  const { colorsObj } = useOptions();
  return <GlobalStyles colors={colorsObj} />;
}

export default GlobalStylesComponent;
