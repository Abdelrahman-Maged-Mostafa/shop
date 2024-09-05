import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import DarkModeProvider from "./context/DarkModeContext";
import Dashboard from "./pages/Dashboard";
import ItemDetails from "./pages/ItemDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import LoginProvider from "./context/LoginContext";
import SuccesForgetPassword from "./pages/SuccesForgetPassword";
import Account from "./pages/Account";
import PersonalInfo from "./serv/account/PersonalInfo";
import ManageItems from "./pages/ManageItems";

const Tryed = styled.div`
  color: var(--color-brand-50);
  background-color: var(--color-brand-900);
`;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, cacheTime: 1000 * 60 * 10 },
  },
});
function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>
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
                <Route path="dashboard/:itemId" element={<ItemDetails />} />
                <Route path="cart" element={<Cart />} />
                <Route path="users" element={<Tryed>users...</Tryed>} />
                <Route path="settings" element={<Tryed>settings...</Tryed>} />
                <Route path="account" element={<Account />}>
                  <Route
                    index
                    element={<Navigate replace to="personal-info" />}
                  />
                  <Route path="personal-info" element={<PersonalInfo />} />
                  <Route path="manage-items" element={<ManageItems />} />
                  <Route path="change-style" element={<p>change-style</p>} />
                  <Route
                    path="manage-orders-active"
                    element={<p>manage-orders-active</p>}
                  />
                  <Route
                    path="manage-orders-history"
                    element={<p>manage-orders-history</p>}
                  />
                  <Route
                    path="order-history"
                    element={<Tryed>order-history...</Tryed>}
                  />
                  <Route
                    path="active-orders"
                    element={<Tryed>active-orders...</Tryed>}
                  />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgetPassword" element={<ForgetPassword />} />
                <Route
                  path="forgetPassword/success"
                  element={<SuccesForgetPassword />}
                />
                <Route
                  path="writeNewPasword/:token"
                  element={<ResetPassword />}
                />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 3000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </LoginProvider>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
