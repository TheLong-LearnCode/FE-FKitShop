import React, { Suspense } from "react";
import UserLayout from "../layouts/User/UserLayout";
import ProtectedRoutes from "./ProtectedRoutes";
// import { ROLE_ADMIN } from "../constants/role";
import OrderView from "../page/user/order/OrderView.jsx";

const AdminLayOut = React.lazy(() => import("../layouts/admin/AdminLayOut"));
const DashboardPage = React.lazy(() => import("../page/admin/dashboard"));

const AccountPage = React.lazy(() =>
  import("../page/admin/account-manager/AccountManager.jsx")
);
const OrderPage = React.lazy(() =>
  import("../page/admin/order-manager/OrderManager.jsx")
);

const CategoryPage = React.lazy(() => import("../page/admin/category-manager"));
const ProductPage = React.lazy(() => import("../page/admin/product-manager"));
const DeliveryPage = React.lazy(() => import("../page/admin/delivery-manager"));
const LabPage = React.lazy(() => import("../page/admin/support-manager/SupportManager.jsx"));
const LabGuidePage = React.lazy(() => import("../page/admin/labGuide-manager"));
const FeedbackPage = React.lazy(() => import("../page/admin/feedback-manager"));

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
      { index: true, element: <Suspense fallback={null}><DashboardPage /></Suspense> },
      {
        path: "dashboard",
        element: <Suspense fallback={null}><DashboardPage /></Suspense>,
      },
      {
        path: "account-manager",
        element: <Suspense fallback={null}><AccountPage /></Suspense>,
      },
      {
        path: "order-manager",
        element: <Suspense fallback={null}><OrderPage /></Suspense>,
      },
      { 
        path: "product-manager",
        children: [
          {
            path: "product-manager",
            element: <Suspense fallback={null}><ProductPage /></Suspense>,
          },
          {
            path: "kit-manager",
            element: <Suspense fallback={null}><CategoryPage /></Suspense>,
          },
          {
            path: "component-manager",
            element: <Suspense fallback={null}><CategoryPage /></Suspense>,
          },
          {
            path: "lab-manager",
            element: <Suspense fallback={null}><CategoryPage /></Suspense>,
          },
        ],
      },
      {
        path: "category-manager",
        element: <Suspense fallback={null}><DeliveryPage /></Suspense>,
      },
      {
        path: "tag-manager",
        element: <Suspense fallback={null}><DeliveryPage /></Suspense>,
      },
      {
        path: "delivery-manager",
        element: <Suspense fallback={null}><DeliveryPage /></Suspense>,
      },
      { 
        path: "lab-support", 
        children: [
           {
            path: "support-manager",
            element: <Suspense fallback={null}><LabPage /></Suspense>,
           },
           {
            path: "question-manager",
            element: <Suspense fallback={null}><LabPage /></Suspense>,
           }
        ] 
      },
      {
        path: "labGuide-manager",
        element: <Suspense fallback={null}><LabGuidePage /></Suspense>,
      },
      {
        path: "feedback-manager",
        element: <Suspense fallback={null}><FeedbackPage /></Suspense>,
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
      { path: "information", element: <Suspense fallback={null}><UserProfilePage /></Suspense> },
      { path: "purchase", element: <Suspense fallback={null}><UserProfilePage /></Suspense> },
      { path: "updateAccount", element: <Suspense fallback={null}><UserProfilePage /></Suspense> },
      { path: "changePassword", element: <Suspense fallback={null}><UserProfilePage /></Suspense> },
      { path: "myLab", element: <Suspense fallback={null}><UserProfilePage /></Suspense> },
    ],
  },
  {
    path: "/order",
    element: <OrderView />,
  },
];

export default PrivateRoutes;
