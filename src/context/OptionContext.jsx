import { createContext } from "react";
import { getOption } from "../api/option";
import { useQuery } from "@tanstack/react-query";

export const OptionContext = createContext();

function OptionProvider({ children }) {
  const { data: options, isLoading } = useQuery({
    queryKey: ["option"],
    queryFn: getOption,
  });
  const payments = options?.data?.[0]?.paymentMethod;
  const cashOnDelivery = options?.data?.[0]?.cashOnDelivery;

  return (
    <OptionContext.Provider
      value={{ payments, options, isLoading, cashOnDelivery }}
    >
      {children}
    </OptionContext.Provider>
  );
}
export default OptionProvider;
