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
import ProtectRoute from "./pages/ProtectRoute";
import ManageItems from "./pages/ManageItems";
import EditItem from "./pages/EditItem";
import AddItem from "./pages/AddItem";
import ManageReviews from "./pages/ManageReviews";
import ItemReview from "./pages/ItemReview";
import OrderForm from "./pages/OrderForm";
import ManageOrdersActive from "./pages/ManageOrdersActive";
import OrderDetails from "./pages/OrderDetails";
import ScrollToUp from "./hooks/ScrollToUp";
import {
  getAllOrders,
  getAllUserOrders,
  getOrderById,
  getUserOrderById,
} from "./api/orders";

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
            <ScrollToUp />
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
                <Route path="check-out" element={<OrderForm />} />
                <Route path="cart" element={<Cart />} />
                <Route path="users" element={<Tryed>users...</Tryed>} />
                <Route path="settings" element={<Tryed>settings...</Tryed>} />
                <Route path="account" element={<Account />}>
                  <Route
                    path="order-history"
                    element={
                      <ManageOrdersActive
                        active={false}
                        orderFunction={getAllUserOrders}
                        linkTo={"order-history"}
                      />
                    }
                  />
                  <Route
                    path="active-orders"
                    element={
                      <ManageOrdersActive
                        active={true}
                        orderFunction={getAllUserOrders}
                        linkTo={"active-orders"}
                      />
                    }
                  />
                  <Route
                    path="active-orders/:orderId"
                    element={<OrderDetails orderFunction={getUserOrderById} />}
                  />
                  <Route
                    path="order-history/:orderId"
                    element={<OrderDetails orderFunction={getUserOrderById} />}
                  />
                  <Route
                    index
                    element={<Navigate replace to="personal-info" />}
                  />
                  <Route path="personal-info" element={<PersonalInfo />} />
                  <Route
                    path="manage-items"
                    element={
                      <ProtectRoute>
                        <ManageItems />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="manage-items/editItem/:itemId"
                    element={
                      <ProtectRoute>
                        <EditItem />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="manage-items/addItem"
                    element={
                      <ProtectRoute>
                        <AddItem />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="manage-reviews"
                    element={
                      <ProtectRoute>
                        <ManageReviews />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="manage-reviews/reviews-item/:itemId"
                    element={
                      <ProtectRoute>
                        <ItemReview />
                      </ProtectRoute>
                    }
                  />
                  <Route path="change-style" element={<p>change-style</p>} />
                  <Route
                    path="manage-orders-active"
                    element={
                      <ProtectRoute>
                        <ManageOrdersActive
                          active={true}
                          orderFunction={getAllOrders}
                        />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="manage-orders-active/:orderId"
                    element={
                      <ProtectRoute>
                        <OrderDetails orderFunction={getOrderById} />
                      </ProtectRoute>
                    }
                  />
                  <Route
                    path="manage-orders-history"
                    element={<p>manage-orders-history</p>}
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
