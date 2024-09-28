import { useEffect } from "react";
import { useOptions } from "../context/useOptions";

const Icon = () => {
  const { icon } = useOptions();
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = icon || "";
    document.head.appendChild(link);

    // Cleanup function to remove the favicon when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, [icon]);

  return null;
};

export default Icon;
