import { createContext, useEffect, useState } from "react";
import { getOption } from "../api/option";
import { useQuery } from "@tanstack/react-query";

export const OptionContext = createContext();

function OptionProvider({ children }) {
  const { data: options, isLoading } = useQuery({
    queryKey: ["option"],
    queryFn: getOption,
  });
  const [colorsObj, setColorsObj] = useState(options?.data?.[0]?.colors || {});

  const payments = options?.data?.[0]?.paymentMethod;
  const cashOnDelivery = options?.data?.[0]?.cashOnDelivery;
  const logo = options?.data?.[0]?.logo;
  const icon = options?.data?.[0]?.Icon;
  const categories = options?.data?.[0]?.category;
  const offers = options?.data?.[0]?.offers;
  const footerInfo = options?.data?.[0]?.footerBody;
  const aboutUs = options?.data?.[0]?.aboutUs;
  const numItems = options?.data?.[0]?.numItems;
  const offersLine = options?.data?.[0]?.offersLine;
  const initialSEOData = options?.data?.[0]?.initialSEOData;
  const ANALYTICSGOOGLE = options?.data?.[0]?.ANALYTICSGOOGLE;
  const forgetMessage = options?.data?.[0]?.forgetMessage;
  const headerStyle = options?.data?.[0]?.headerStyle;
  const dashboardStyle = options?.data?.[0]?.dashboardStyle;
  useEffect(() => setColorsObj(options?.data?.[0]?.colors || {}), [options]);

  return (
    <OptionContext.Provider
      value={{
        dashboardStyle,
        headerStyle,
        forgetMessage,
        icon,
        ANALYTICSGOOGLE,
        initialSEOData,
        offersLine,
        numItems,
        aboutUs,
        footerInfo,
        offers,
        categories,
        payments,
        options,
        isLoading,
        cashOnDelivery,
        colorsObj,
        setColorsObj,
        logo,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
}
export default OptionProvider;
