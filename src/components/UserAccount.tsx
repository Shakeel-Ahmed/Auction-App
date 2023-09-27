import React, { useEffect, useState, useRef } from "react";
import jwt from "../helpers/jwt";
import { beFundsTransfer, beUserAccountURL } from "../config";
import { DepositRes, UserShowRes, StatusRes } from "../interfaces";
import LoadSpinner from "./LoadSpinner";
import { useActionData, useParams, useNavigate, Form } from "react-router-dom";
import back from "../images/back.svg";
import UserAccountItems from "./UserAccount/UserAccountItems";
import { checkLogin } from "../helpers/chekLogin";

/**
 * Component representing the user account details and funds deposit form.
 * @returns {React.ReactElement} JSX element representing the user account details
 * and funds deposit form.
 */

const UserAccount = ():React.ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();
    const action: DepositRes = useActionData() as DepositRes;
    const theForm = useRef(null);
    const [content, setContent] = useState<UserShowRes>();
    const [message, setMessage] = useState<string>('');

    /**
     * Fetches user account details from the server.
     * @param {string} id - The user's ID.
     * @returns {Promise<UserShowRes>} - Promise that resolves to user account data.
     */
    const userAccount = async (id: string):Promise<UserShowRes> => {
        let userAccountURL = beUserAccountURL + id;
        try {
            const response = await fetch(userAccountURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwt('token'),
                }
            });
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!checkLogin()) return navigate('/user/sign-in');
        userAccount(id).then(data => setContent(data));
        if (action) {
            if (theForm.current) {
                setMessage(action.message);
                content.data.balance = +action.data.amount + +content.data.balance;
                theForm.current.reset();
                const clrMsgId = setTimeout(() => {
                    setMessage('');
                }, 5000);
                return () => clearTimeout(clrMsgId);
            }
        }
    }, [id, action]);

    if(!content) return <LoadSpinner />;
    if(content) {
        return (
                <>
                    <div className="row">
                        <div className="col-xl-6 offset-xl-3">
                            <h3>Account Details</h3>
                        </div>
                        <div className="col-xl-6 offset-xl-3">
                            <div className="card listing-card mb-3 shadow">
                                <div className="card-body">
                                    <table className="w-100">
                                        <tbody>
                                        <tr>
                                            <td className="table-listing">Account Holder</td>
                                            <td className="text-end table-listing" style={{textTransform:"none"}}>{ content.data.name }</td>
                                        </tr>
                                        <tr>
                                            <td className="table-listing">Email</td>
                                            <td className="text-end table-listing" style={{textTransform:"none"}}>{ content.data.email }</td>
                                        </tr>
                                        <tr>
                                            <td className="table-listing">Bids</td>
                                            <td className="text-end">{ content.data.user_bids.length }</td>
                                        </tr>
                                        <tr>
                                            <td className="table-listing">Items Auctioned</td>
                                            <td className="text-end">{ content.data.user_items.length }</td>
                                        </tr>
                                        <tr>
                                            <td className="table-listing">Available Balance</td>
                                            <td className="text-end text-success fw-bolder">${ content.data.balance }</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 offset-xl-3">
                            <h3>Deposit Funds</h3>
                        </div>
                        <div className="col-xl-6 offset-xl-3">
                            <div className="card listing-card mb-3 shadow">
                                <div className="card-body">
                                    <Form method="post" ref={ theForm }>
                                        <div className="form-floating mt-3">
                                            <input type="number"
                                                   name="theAmount"
                                                   min={ "" }
                                                   className="form-control"
                                                   placeholder="Password"
                                                   required
                                            />
                                            <label htmlFor="floatingInput">Amount</label>
                                            <div className="text-center">
                                                <button className="w-100 btn btn-primary mt-4 p-3 fw-bolder" type="submit">D E P O S I T</button>
                                            </div>
                                            <div className="text-center text-uppercase text-success fw-bolder mt-3" style={{fontSize: "14px"}}>
                                                { message }
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        {content.data.user_items.length > 0 ?
                            <>
                                <div className="col-xl-6 offset-xl-3">
                                    <h3>My Auction Items</h3>
                                </div>
                                <UserAccountItems data={content.data.user_items}/>
                            </> : ''}
                        { content.data.user_bids.length > 0 ?
                            <>
                                <div className="col-xl-6 offset-xl-3">
                                    <h3>My Bidding</h3>
                                </div>
                                <UserAccountItems data={content.data.user_bids}/>
                            </> : '' }
                       <div className="col-xl-6 offset-xl-3 text-end">
                            <img src={ back } alt="back button" onClick={()=>navigate(-1)} style={{width:"60px"}}/>
                        </div>
                    </div>
                </>
            );
    }
}

/**
 * Handles the user's funds deposit action.
 * @param {Object} request - The form data from the deposit form.
 * @returns {Promise} - Promise representing the deposit response.
 */
export const UserAccountAction = async ({ request }: typeof request): Promise<UserShowRes | StatusRes> => {
    const theForm = await request.formData();
    const payload = {
        "user": jwt('user'),
        "amount": theForm.get("theAmount"),
        "type": "credit",
        "status": "deposit"
    }
    try {
        const response = await fetch(beFundsTransfer, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt('token'),
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        return { success: false, message: `Can't connect to server, please try again later` };
    }
}

export default UserAccount;