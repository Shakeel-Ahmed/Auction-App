import React from "react";
import { Form, useActionData, redirect, Link } from "react-router-dom";
import { beUserRegisterURL } from "../config";
import { AuthSignUpRes, StatusRes } from "../interfaces";

/**
 * SignUp component for user registration.
 * @returns {React.ReactElement} The SignUp component.
 */
export const SignUp = (): React.ReactElement => {
    let message = '';
    const action: AuthSignUpRes = useActionData() as AuthSignUpRes;

    if(action){
        if(action.error.name) action.error.name.map((nameError: string)=>{
            if(nameError) message+=`<div>${ nameError }</div>`;
        });
        if(action.error.email) action.error.email.map((emailError: string)=>{
            if(emailError !== undefined) message+=`<div>${ emailError }</div>`;
        });
        if(action.error.password) action.error.password.map((pwError: string)=>{
            if(pwError) message+=`<div>${ pwError }</div>`;
        });
    }

    return (
        <>
            <div className="row">
                <div className="col-xl-4 offset-xl-4">
                    <Form method="post">
                        <h1 className="h3 mb-3">Please Sign-up</h1>
                        <div className="form-floating mt-3">
                            <input name="theUser"
                                   type="text"
                                   className="form-control"
                                   id="floatingInput"
                                   placeholder="User"
                            />
                            <label htmlFor="floatingInput">User</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input name="theEmail"
                                   className="form-control"
                                   id="floatingInputB"
                                   placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mt-3">
                            <input name="thePassword"
                                   type="password"
                                   className="form-control"
                                   id="floatingPassword"
                                   placeholder="Password"
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-primary fw-bold mt-4 p-3" type="submit">SIGN-UP</button>
                        <p className="text-end mt-3">Already signed-up? <Link to="/user/sign-in" className="text-primary">Sign-in here!</Link></p>
                        <div className="text-danger text-center" style={{fontSize:'16px'}} dangerouslySetInnerHTML={{__html: message}}></div>
                    </Form>
                </div>
            </div>
        </>
    );
}

/**
 * SignUpAction function to handle user registration form submission.
 * @param {Object} request - The request object containing form data.
 * @returns {Promise} A Promise that resolves with the response or an error message.
 */
export const SignUpAction = async ({ request }: typeof request): Promise<AuthSignUpRes | StatusRes | object> => {
    const theForm = await request.formData();
    const payload = {
        name: theForm.get('theUser'),
        email: theForm.get('theEmail'),
        password: theForm.get('thePassword')
    }
    try {
        const response = await fetch( beUserRegisterURL, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const auth = await response.json();
        if(auth.success) {
            return redirect('/user/sign-in');
        }
        if(!auth.success) return auth;

    } catch (error) {
        return {success: false, message: `Can't connect to server, please try again later`};
    }
}
