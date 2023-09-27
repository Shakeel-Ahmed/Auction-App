import React, { useEffect, useState } from "react";
import { Form, useActionData, useNavigate } from "react-router-dom";
import jwt from "../helpers/jwt";
import { ItemCreateRes, StatusRes } from "../interfaces";
import { beItemCreateURL } from "../config";
import { checkLogin } from "../helpers/chekLogin";
import back from "../images/back.svg";

/**
 * Component for creating a new auction item.
 * @returns {React.ReactElement} - JSX element representing the item creation form.
 */
const ItemCreate = (): React.ReactElement => {
    const action: ItemCreateRes = useActionData() as ItemCreateRes;
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkLogin()) return navigate('/user/sign-in');
        if (action) {
            setMessage(action.message);
        }
    }, [action]);

    if (action && action.success) return (
        <>
            <div className="row">
                <div className="col-xl-4 offset-xl-4">
                    <h1 className="h3 mb-3 fw-bolder text-center">Add New Auction Item</h1>
                    <p className="text-center">Item added in the auction.</p>
                    <div className="col-xl-6 offset-xl-3 text-center">
                        <img src={ back } alt="back button" onClick={()=>navigate(-1)} style={{width:"60px"}}/>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <div className="row">
                <div className="col-xl-4 offset-xl-4">
                    <Form method="post">
                        <h1 className="h3 mb-3 fw-normal">Add New Auction Item</h1>
                        <div className="mb-3 mt-3">
                            <label htmlFor="theItem">Item</label>
                            <input name="theItem" className="form-control" type="text" required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="theExpiry">Set Expiry</label>
                            <input name="theExpiry" className="form-control" type="datetime-local" required />
                        </div>
                        <div className="mb-3 mt-3">
                            <label htmlFor="theDesc" className="form-label">Item Description</label>
                            <textarea className="form-control" name="theDesc" rows={3} required></textarea>
                        </div>
                        <div className="form-check">
                            <input name="thePublish" className="form-check-input" type="checkbox" value="1" checked />
                            <label className="form-check-label" htmlFor="thePublish">
                                Publish upon creation
                            </label>
                        </div>
                        <button className="w-100 btn btn-primary mt-4 p-3 fw-bolder" type="submit">CREATE</button>
                        <div className="text-center text-uppercase fw-bolder" style={{ fontSize: '16px' }}>{message}</div>
                    </Form>
                </div>
            </div>
        </>
    );
}

/**
 * Action function for creating a new auction item.
 * @param {Object} param0 - The request object containing item creation data.
 * @returns {Promise<ItemCreateRes>} - Promise representing the result of the item creation attempt.
 */
export const ItemCreateAction = async ({ request }: typeof request): Promise<ItemCreateRes | StatusRes> => {
    const createForm = await request.formData();
    const details = {
        "user": jwt('user'),
        "name": createForm.get('theItem'),
        "description": createForm.get('theDesc'),
        "publish": createForm.get('thePublish') ?? 0,
        "expiry": createForm.get('theExpiry'),
        "status": "active"
    }
    try {
        const response = await fetch(beItemCreateURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt('token'),
            },
            body: JSON.stringify(details)
        });
        const confirmation = await response.json();
        return await confirmation

    } catch (error) {
        return {
            success: false,
            message: `Can't connect to server, please try again later`
        };
    }
}

export default ItemCreate;
