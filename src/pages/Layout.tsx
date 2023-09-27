import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Page layout component that wraps the Header, content Outlet, and Footer.
 * @returns {React.ReactElement} JSX for the page layout component.
 */
function PageLayout(): React.ReactElement {
    return (
        <>
            <Header />
            <div style={{ minHeight: 'calc(100vh - 197px)' }}>
                <div className="container my-3">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PageLayout;
