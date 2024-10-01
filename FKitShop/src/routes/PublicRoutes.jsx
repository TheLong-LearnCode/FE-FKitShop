import React from "react";
import UserLayout from "../layouts/user/UserLayout.jsx";

const HomePage = React.lazy(() => import("../page/user/home/HomePage.jsx"));
const AboutPage = React.lazy(() => import("../page/user/about"));
const ContactPage = React.lazy(() => import("../page/user/contact"));

//login và register dùng chung trang là login
const LoginPage = React.lazy(() => import("../page/auth/login"));
const RegisterPage = React.lazy(() => import("../page/auth/login"));
const ProductListPage = React.lazy(() => import("../page/user/product/list"));
const ProductCardPage = React.lazy(() => import("../page/user/product/card/CardContent"));

const PublicRoutes = [
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "home",
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "contact",
                element: <ContactPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },

            //product
            {
                path: "product-list",
                element: <ProductListPage />
            },
            {
                path: "product-card/:productId",
                element: <ProductCardPage />
            }, 
        ]
    }, 
];

export default PublicRoutes;
