import { useEffect } from "react";
import { useOptions } from "../context/useOptions";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Icon = () => {
  const { icon, initialSEOData } = useOptions();
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

  return (
    <HelmetProvider>
      <Helmet>
        <title>{initialSEOData?.homeTitle || "shop"}</title>
        <meta
          name="description"
          content={initialSEOData?.homeDescription || ""}
        />
        <meta name="keywords" content={initialSEOData?.homeKeywords || ""} />
      </Helmet>
    </HelmetProvider>
  );
};

export default Icon;
