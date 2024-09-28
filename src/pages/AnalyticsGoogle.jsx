import { useEffect } from "react";
import { useOptions } from "../context/useOptions";

function AnalyticsGoogle() {
  const { ANALYTICSGOOGLE } = useOptions();
  console.log(ANALYTICSGOOGLE);
  useEffect(() => {
    document.body.insertAdjacentHTML(`afterbegin`, ANALYTICSGOOGLE || "");
  }, [ANALYTICSGOOGLE]);
  return null;
}

export default AnalyticsGoogle;
