import React, { Suspense } from "react";
import UserLayout from "../layouts/User/UserLayout";
import ProtectedRoutes from "./ProtectedRoutes";
// import { ROLE_ADMIN } from "../constants/role";
const OrderSuccessPage = React.lazy(() => import("../page/user/order/OrderSuccess.jsx"));
const OrderViewPage = React.lazy(() => import("../page/user/order/OrderView.jsx"));
const HandleVNPPage = React.lazy(() => import("../page/user/order/HandleVNP.jsx"));

const AdminLayOut = React.lazy(() => import("../layouts/admin/AdminLayOut"));
const DashboardPage = React.lazy(() => import("../page/admin/dashboard"));

const AccountPage = React.lazy(() =>
  import("../page/admin/account-manager/AccountManager.jsx")
);
const OrderPage = React.lazy(() =>
  import("../page/admin/order-manager/OrderManager.jsx")
);
const OrderSuccess = React.lazy(() => import("../page/user/order/OrderSuccess.jsx"));

// const KitPage = React.lazy(() => import("../page/admin/kit-manager"));
// const ComponentPage = React.lazy(() => import("../page/admin/component-manager"));
// const LabPage = React.lazy(() => import("../page/admin/lab-manager"));

const CategoryPage = React.lazy(() => import("../page/admin/category-manager"));
const ProductPage = React.lazy(() => import("../page/admin/product-manager"));
const DeliveryPage = React.lazy(() => import("../page/admin/delivery-manager"));
const SupportPage = React.lazy(() =>
  import("../page/admin/support-manager/SupportManager.jsx")
);
const LabGuidePage = React.lazy(() => import("../page/admin/labGuide-manager"));
const FeedbackPage = React.lazy(() => import("../page/admin/feedback-manager"));
const QuestionPage = React.lazy(() => import("../page/admin/question-manager/QuestionManager.jsx"));
const UserProfilePage = React.lazy(() => import("../page/user/profile"));

const PrivateRoutes = [
  {
    path: "/admin",
    element: (
      <Suspense fallback={null}>
        {/* <ProtectedRoutes allowedRoles={ROLE_ADMIN}> */}
        <AdminLayOut />
        {/* </ProtectedRoutes> */}
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={null}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "account-manager",
        element: (
          <Suspense fallback={null}>
            <AccountPage />
          </Suspense>
        ),
      },
      {
        path: "order-manager",
        element: (
          <Suspense fallback={null}>
            <OrderPage />
          </Suspense>
        ),
      },
      {
        path: "product-manager",
        children: [
          {
            path: "product-manager",
            element: (
              <Suspense fallback={null}>
                <ProductPage />
              </Suspense>
            ),
          },
          {
            path: "kit-manager",
            element: (
              <Suspense fallback={null}>
                <CategoryPage /> 
                {/* KitPage */}
              </Suspense>
            ),
          },
          {
            path: "component-manager",
            element: (
              <Suspense fallback={null}>
                <CategoryPage />
                {/* ComponentPage */}
              </Suspense>
            ),
          },
          {
            path: "lab-manager",
            element: (
              <Suspense fallback={null}>
                <CategoryPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "category-manager",
        element: (
          <Suspense fallback={null}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: "tag-manager",
        element: (
          <Suspense fallback={null}>
            <DeliveryPage />
          </Suspense>
        ),
      },
      {
        path: "delivery-manager",
        element: (
          <Suspense fallback={null}>
            <DeliveryPage />
          </Suspense>
        ),
      },
      {
        path: "lab-support",
        children: [
          {
            path: "support-manager",
            element: (
              <Suspense fallback={null}>
                <SupportPage />
              </Suspense>
            ),
          },
          {
            path: "question-manager",
            element: (
              <Suspense fallback={null}>
                <QuestionPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "labGuide-manager",
        element: (
          <Suspense fallback={null}>
            <LabGuidePage />
          </Suspense>
        ),
      },
      {
        path: "feedback-manager",
        element: (
          <Suspense fallback={null}>
            <FeedbackPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
      <Suspense fallback={null}>
        <UserLayout />
      </Suspense>
    ),
    children: [
      {
        path: "information",
        element: (
          <Suspense fallback={null}>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "purchase",
        element: (
          <Suspense fallback={null}>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "updateAccount",
        element: (
          <Suspense fallback={null}>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "changePassword",
        element: (
          <Suspense fallback={null}>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "myLab",
        element: (
          <Suspense fallback={null}>
            <UserProfilePage />
          </Suspense>
        ),
      },
      {
        path: "support",
        element: (
          <Suspense fallback={null}>
            <UserProfilePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/order",
    element: (
      <Suspense fallback={null}>
        <OrderViewPage />
      </Suspense>
    ),
  },
  {
    path: "/order-success",
    element: (
      <Suspense fallback={null}>
        <OrderSuccessPage />
      </Suspense>
    ),
  },
  {
    path: "/handle-vnpay",
    element: (
      <Suspense fallback={null}>
        <HandleVNPPage />
      </Suspense>
    ),
  },
];

export default PrivateRoutes;
