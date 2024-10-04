import React from "react";
import LazyLoader from "../component/LazyLoader/index.jsx";
import ProtectedRoutes from "./ProtectedRoutes";
import { ROLE_ADMIN } from "../constants/role";
import UserLayout from "../layouts/user/UserLayout.jsx";

const AdminLayOut = React.lazy(() => import("../layouts/admin/AdminLayOut"));
const DashboardPage = React.lazy(() => import("../page/admin/dashboard"));
const CategoryPage = React.lazy(() => import("../page/admin/category-manager"));
const ProductPage = React.lazy(() => import("../page/admin/product-manager"));
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
            { path: "product-manager", element: <LazyLoader children={<ProductPage />} /> },
            { path: "category-manager", element: <LazyLoader children={<CategoryPage />} /> },
        ],
    },
    {
        path: "/user",
        element: <LazyLoader children={<UserLayout />} />,
        children: [

            { path: "profile", element: <UserProfilePage /> },
            { path: "purchase", element: <UserProfilePage /> },
            { path: "updateAccount", element: <UserProfilePage /> },
            { path: "changePassword", element: <UserProfilePage /> },
        ],
    },
];

export default PrivateRoutes;
