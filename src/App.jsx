import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";

import DarkModeProvider from "./context/DarkModeContext";
import LoginProvider from "./context/LoginContext";
import GlobalStylesComponent from "./styles/GlobalStylesComponent";
import ScrollToUp from "./hooks/ScrollToUp";
import { getAllOrders, getAllUserOrders } from "./api/orders";
import SkeletonScreen from "./ui/SkeletonScreen";
import AppLayout from "./pages/AppLayout";
import Account from "./pages/Account";
import AnalyticsGoogle from "./pages/AnalyticsGoogle";
import ManageAnalytics from "./pages/ManageAnalytics";
import Icon from "./hooks/Icone";
import ChangeStyle from "./pages/ChangeStyle";

const ManageForgetPasswordMessage = lazy(() =>
  import("./pages/ManageForgetPasswordMessage")
);
const ManageAboutUsInfo = lazy(() => import("./pages/ManageAboutUsInfo"));
const SettingsNumber = lazy(() => import("./pages/SettingsNumber"));
const ManageOffersLine = lazy(() => import("./pages/ManageOffersLine"));
const ManageSEO = lazy(() => import("./pages/ManageSEO"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ManageOffers = lazy(() => import("./pages/ManageOffers"));
const WishList = lazy(() => import("./pages/WishList"));
const ChangeFooterBody = lazy(() => import("./pages/ChangeFooterBody"));
const DashboardFilter = lazy(() => import("./pages/DashboardFilter"));
const ManageCategories = lazy(() => import("./pages/ManageCategories"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SuccesForgetPassword = lazy(() => import("./pages/SuccesForgetPassword"));
const PersonalInfo = lazy(() => import("./serv/account/PersonalInfo"));
const ProtectRoute = lazy(() => import("./pages/ProtectRoute"));
const ManageItems = lazy(() => import("./pages/ManageItems"));
const EditItem = lazy(() => import("./pages/EditItem"));
const AddItem = lazy(() => import("./pages/AddItem"));
const ManageReviews = lazy(() => import("./pages/ManageReviews"));
const ItemReview = lazy(() => import("./pages/ItemReview"));
const OrderForm = lazy(() => import("./pages/OrderForm"));
const ManageOrdersActive = lazy(() => import("./pages/ManageOrdersActive"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const ManageUsers = lazy(() => import("./pages/ManageUsers"));
const ManagePayments = lazy(() => import("./pages/ManagePayments"));
const ColorManager = lazy(() => import("./pages/ManageStyle"));
const LogoChange = lazy(() => import("./pages/LogoChange"));
const IconChange = lazy(() => import("./pages/IconChange"));

const Tryed = styled.div`
  color: var(--color-brand-50);
  background-color: var(--color-brand-900);
`;

function App() {
  return (
    <DarkModeProvider>
      <LoginProvider>
        <GlobalStylesComponent />
        <AnalyticsGoogle />
        <Icon />
        <BrowserRouter>
          <ScrollToUp />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route
                path="dashboard"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="aboutUs"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <AboutUs />
                  </Suspense>
                }
              />
              <Route
                path="dashboard/filter/:filter"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <DashboardFilter />
                  </Suspense>
                }
              />
              <Route
                path="dashboard/:itemId"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <ItemDetails />
                  </Suspense>
                }
              />
              <Route
                path="check-out"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <OrderForm />
                  </Suspense>
                }
              />
              <Route
                path="cart"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <Cart />
                  </Suspense>
                }
              />
              <Route
                path="wishList"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <WishList />
                  </Suspense>
                }
              />
              <Route path="users" element={<Tryed>users...</Tryed>} />
              <Route path="settings" element={<Tryed>settings...</Tryed>} />
              <Route path="account" element={<Account />}>
                <Route
                  path="active-orders/:orderId"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <OrderDetails orderFunction={getAllUserOrders} />
                    </Suspense>
                  }
                />
                <Route
                  path="orders-history/:orderId"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <OrderDetails orderFunction={getAllUserOrders} />
                    </Suspense>
                  }
                />
                <Route
                  path="active-orders"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ManageOrdersActive
                        orderFunction={getAllUserOrders}
                        linkTo={"active-orders"}
                        active={true}
                      />
                    </Suspense>
                  }
                />
                <Route
                  path="order-history"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ManageOrdersActive
                        orderFunction={getAllUserOrders}
                        linkTo={"orders-history"}
                        active={false}
                      />
                    </Suspense>
                  }
                />
                <Route
                  index
                  element={<Navigate replace to="personal-info" />}
                />
                <Route
                  path="personal-info"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <PersonalInfo />
                    </Suspense>
                  }
                />
                <Route
                  path="manage-items"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageItems />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-items/editItem/:itemId"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <EditItem />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-items/addItem"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <AddItem />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-reviews"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageReviews />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-reviews/reviews-item/:itemId"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ItemReview />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-orders-active"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageOrdersActive
                          active={true}
                          orderFunction={getAllOrders}
                        />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-orders-active/:orderId"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <OrderDetails
                          orderFunction={getAllOrders}
                          admin={true}
                        />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-orders-history"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageOrdersActive
                          active={false}
                          orderFunction={getAllOrders}
                          linkTo={"manage-orders-history"}
                        />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-orders-history/:orderId"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <OrderDetails orderFunction={getAllOrders} />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-users"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageUsers />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-payments"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManagePayments />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-style"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ColorManager />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-categorys"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageCategories />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-offers"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageOffers />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-logo"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <LogoChange />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-Style-elem"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ChangeStyle />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-emailOption"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageForgetPasswordMessage />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-icon"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <IconChange />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-footer"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ChangeFooterBody />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-Numbers"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <SettingsNumber />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-offers-line"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageOffersLine />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-SEO"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageSEO />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="change-aboutUs"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageAboutUsInfo />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
                <Route
                  path="manage-analytics"
                  element={
                    <Suspense fallback={<SkeletonScreen />}>
                      <ProtectRoute>
                        <ManageAnalytics />
                      </ProtectRoute>
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="login"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="signup"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <Signup />
                  </Suspense>
                }
              />
              <Route
                path="forgetPassword"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <ForgetPassword />
                  </Suspense>
                }
              />
              <Route
                path="forgetPassword/success"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <SuccesForgetPassword />
                  </Suspense>
                }
              />
              <Route
                path="writeNewPasword/:token"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <ResetPassword />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<SkeletonScreen />}>
                    <PageNotFound />
                  </Suspense>
                }
              />
            </Route>
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
    </DarkModeProvider>
  );
}

export default App;
