import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import DarkModeProvider from "./context/DarkModeContext";
import Dashboard from "./pages/Dashboard";

const Tryed = styled.div`
  color: var(--color-brand-50);
  background-color: var(--color-brand-900);
`;
function App() {
  return (
    <DarkModeProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              // <ProtectedRoute>
              <AppLayout />
              // </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cart" element={<Tryed>cart...</Tryed>} />
            <Route path="users" element={<Tryed>users...</Tryed>} />
            <Route path="settings" element={<Tryed>settings...</Tryed>} />
            <Route path="account" element={<Tryed>account...</Tryed>} />
          </Route>
          <Route path="login" element={<Tryed>login...</Tryed>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
