import React from "react";
import LazyLoader from "../component/LazyLoader/index.jsx";
import ProtectedRoutes from "./ProtectedRoutes";
import { ROLE_ADMIN } from "../constants/role";
import UserLayout from "../layouts/user/UserLayout.jsx";

const AdminLayOut = React.lazy(() => import("../layouts/admin/AdminLayOut"));
const DashboardPage = React.lazy(() => import("../page/admin/dashboard"));
const AccountPage = React.lazy(() => import("../page/admin/account-manager"));
const CategoryPage = React.lazy(() => import("../page/admin/category-manager"));
const ProductPage = React.lazy(() => import("../page/admin/product-manager"));
const DeliveryPage = React.lazy(() => import("../page/admin/delivery-manager"));
const OrderPage = React.lazy(() => import("../page/admin/order-manager"));
const LabPage = React.lazy(() => import("../page/admin/lab-manager"));
const LabGuidePage = React.lazy(() => import("../page/admin/labGuide-manager"));

const UserProfilePage = React.lazy(() => import("../page/user/profile"));

const PrivateRoutes = [
    {
        path: "/admin",
        element: (
            // <ProtectedRoutes allowedRoles={ROLE_ADMIN}>
                <LazyLoader children={<AdminLayOut />} />
            // </ProtectedRoutes>
        ),
        children: [
            { index: true, element: <LazyLoader children={<DashboardPage />} /> },
            { path: "dashboard", element: <LazyLoader children={<DashboardPage />} /> },
            { path: "account-manager", element: <LazyLoader children={<AccountPage />} />},
            { path: "category-manager", element: <LazyLoader children={<CategoryPage />} /> },
            { path: "product-manager", element: <LazyLoader children={<ProductPage />} /> },
            { path: "delivery-manager", element: <LazyLoader children={<ProductPage />} /> },
            { path: "order-manager", element: <LazyLoader children={<ProductPage />} /> },
            { path: "lab-manager", element: <LazyLoader children={<ProductPage />} /> },
            { path: "labGuide-manager", element: <LazyLoader children={<ProductPage />} /> },
        ],
    },
    {
        path: "/user",
        element: <LazyLoader children={<UserLayout />} />,
        children: [

            { path: "information", element: <UserProfilePage /> },
            { path: "purchase", element: <UserProfilePage /> },
            { path: "updateAccount", element: <UserProfilePage /> },
            { path: "changePassword", element: <UserProfilePage /> },
        ],
    },
];

export default PrivateRoutes;
