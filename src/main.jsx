import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import OptionProvider from "./context/OptionContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, cacheTime: 1000 * 60 * 10 },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OptionProvider>
        <App />
      </OptionProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
