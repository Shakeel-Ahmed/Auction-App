import { Link, Form, redirect, useActionData } from "react-router-dom";
import { beUserLoginURL } from "../config";
import React, { useEffect, useState } from "react";
import { AuthLoginRes } from "../interfaces";

/**
 * Component for user sign-in.
 * @returns {React.ReactElement} JSX element representing the user login form
 */
export const SignIn = ():React.ReactElement => {
    const action: any = useActionData();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        if (action) {
            setMessage(action);
        }
    }, [action]);

    return (
        <>
            <div className="row">
                <div className="col-xl-4 offset-xl-4">
                    <Form method="post">
                        <h1 className="h3 mb-3">Please Sign-in</h1>
                        <div className="form-floating">
                            <input
                                type="email"
                                name="theEmail"
                                className="form-control"
                                placeholder="name@example.com"
                                required
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input
                                type="password"
                                name="thePassword"
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-primary mt-4 p-3 fw-bolder">SIGN-IN</button>
                    </Form>
                    <div className="text-danger text-center" style={{ fontSize: '16px' }}>{message}</div>
                    <p className="text-end mt-3">Not yet signed-up? <Link to="/user/sign-up" className="text-primary">Sign-up here!</Link></p>
                </div>
            </div>
        </>
    );
}

/**
 * Action function for user sign-in.
 * @param {Object} param0 - The request object containing user login data.
 * @returns {Promise<string | redirect>} - Promise representing the result of the sign-in attempt.
 */
export const SignInAction = async ({ request }: typeof request): Promise<string | object> => {
    const theForm = await request.formData();
    const payload = {
        email: theForm.get('theEmail'),
        password: theForm.get('thePassword'),
    }
    try {
        const response = await fetch(beUserLoginURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const auth: AuthLoginRes = await response.json()
        if (auth.success === true && auth.data.token) {
            localStorage.setItem('token', auth.data.token);
            localStorage.setItem('name', auth.data.name);
            localStorage.setItem('user', String(auth.data.user));
            return redirect('/');
        } else {
            return 'Invalid credentials, please try again';
        }
    } catch (error) {
        return `Can't connect to server, please try again later`;
    }
}
