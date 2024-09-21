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

  useEffect(() => setColorsObj(options?.data?.[0]?.colors || {}), [options]);

  return (
    <OptionContext.Provider
      value={{
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
