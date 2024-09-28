import { useEffect } from "react";
import { useOptions } from "../context/useOptions";

function AnalyticsGoogle() {
  const { ANALYTICSGOOGLE } = useOptions();
  useEffect(() => {
    document.body.insertAdjacentHTML(`afterbegin`, ANALYTICSGOOGLE || "");
  }, [ANALYTICSGOOGLE]);
  return null;
}

export default AnalyticsGoogle;
