import React from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt from "../helpers/jwt";
import { checkLogin } from "../helpers/chekLogin";
import logo from '../images/logo.png';
import account from "../images/account.svg";

/**
 * Header component for the application.
 * @returns {React.ReactElement} JSX for the header component.
 */
const Header = (): React.ReactElement => {
    const navigate = useNavigate();

    /**
     * Handles the logout action.
     * @returns {void}
     */
    const handleLogout = (): void => {
        const shouldLogout = window.confirm('Do you want to logout?');
        if (shouldLogout) {
            const loginKeys = ['token', 'name', 'user'];
            loginKeys.forEach(key => {
                localStorage.removeItem(key);
            });
            navigate('/');
        }
    }

    /**
     * Handles the navigation to the user's account or sign-in page.
     * @returns {void}
     */
    const handleMyAccount = (): void => {
        if (checkLogin()) {
            return navigate('/user/account/' + jwt('user'));
        } else {
            return navigate('/user/sign-in');
        }
    }

    return (
        <>
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-12 d-flex align-items-center">
                        <Link to="/">
                            <img src={logo} style={{width: '40px'}} alt="logo"/>
                            <span className="app-title ms-2">AUCTION</span>
                        </Link>
                        <div className="ms-auto text-center text-light fw-bolder"
                             style={{cursor: 'pointer', fontSize: "14px"}}>
                            <img src={account} onClick={handleMyAccount} alt="user icon" style={{width: '40px'}}/>
                            <div>{checkLogin() ? jwt('name') : 'SIGN-IN'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="header-nav-stripe">
            <div className="container text-center text-xl-start">
                <Link to="/item/list"><span className="header-stripe-nav-link pe-3">Auction</span></Link>
                {checkLogin() ?
                    <Link to="/item/create"><span className="header-stripe-nav-link">Add Item</span></Link> : ''}
                {
                    checkLogin()
                        ? <span className="header-stripe-nav-link ps-3"
                                onClick={handleLogout}
                                style={{cursor: "pointer"}}>Sign-out</span> : ''
                        // : <Link to="/user/sign-in"><span className="header-stripe-nav-link ps-3">Sign-in</span></Link>
                }
            </div>
        </div>
       </>
    );
}

export default Header;
