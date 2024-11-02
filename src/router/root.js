import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const Loading = <div>Loading.....</div>;
const MainPage = lazy(() => import("../pages/MainPage"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));

const root = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={Loading}><MainPage /></Suspense>
    },
    {
        path: "/signup",
        element: <Suspense fallback={Loading}><SignUp /></Suspense>
    },
    {
        path: "/login",
        element: <Suspense fallback={Loading}><Login /></Suspense>
    }
]);

export default root;
