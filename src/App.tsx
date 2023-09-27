import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLayout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Home";
import { SignUp, SignUpAction } from "./components/SignUp";
import { SignIn, SignInAction } from "./components/SignIn";
import ItemListing from "./components/ItemListing";
import ItemShow, { ItemShowAction } from "./components/ItemShow";
import ItemCreate, { ItemCreateAction } from "./components/ItemCreate";
import UserAccount, { UserAccountAction } from "./components/UserAccount";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Main App component responsible for routing and rendering different pages.
 * @returns {React.ReactElement} JSX for the App component.
 */
function App(): React.ReactElement {
    const router = createBrowserRouter([{
        path: '/',
        element: <PageLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <Home/> },
            { path: '/item/list/:page?', element: <ItemListing/> },
            { path: '/item/create', element: <ItemCreate/>, action: ItemCreateAction },
            { path: '/item/show/:id', element: <ItemShow/>, action: ItemShowAction },
            { path: '/user/sign-in', element: <SignIn/>, action: SignInAction },
            { path: '/user/sign-up', element: <SignUp/>, action: SignUpAction },
            { path: '/user/account/:id', element: <UserAccount/>, action: UserAccountAction },
        ]
    }]);
    return <RouterProvider router={router}/>
}

export default App;
