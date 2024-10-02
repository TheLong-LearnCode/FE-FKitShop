import React from "react";
import UserLayout from "../layouts/user/UserLayout";

const AdminLayOut = React.lazy(() => import("../layouts/admin/AdminLayOut"));
const DashboardPage = React.lazy(() => import("../page/admin/dashboard"));
const CategoryPage = React.lazy(() => import("../page/admin/category-manager"));
const ProductPage = React.lazy(() => import("../page/admin/product-manager"));

const UserProfilePage = React.lazy(() => import("../page/user/profile"));

const PrivateRoutes = [
    {
        path: "/admin",
        element: <AdminLayOut />,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "product-manager",
                element: <ProductPage />
            },
            {
                path: "category-manager",
                element: <CategoryPage  />
            },

        ]
    },
    {
        path: "/user",
        element: <UserLayout />,
        children: [
            {
                path: "profile",
                element: <UserProfilePage />
            },

        ]
    }
];

export default PrivateRoutes;
