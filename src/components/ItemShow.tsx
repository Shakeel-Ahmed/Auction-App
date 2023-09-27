import { useParams, useNavigate, Form, useActionData } from "react-router-dom";
import { beItemShowURL, beBidRegister } from "../config";
import React, { useEffect, useRef, useState } from "react";
import { ItemShowRes, ItemBidRes, StatusRes } from "../interfaces";
import LoadSpinner from "./LoadSpinner";
import { checkLogin } from "../helpers/chekLogin";
import back from "../images/back.svg";
import jwt from "../helpers/jwt";

let itemId: string;

/**
 * Component representing the details of an item and the bidding form.
 * @returns {React.ReactElement} JSX element representing the item details
 * and bidding form.
 */

const ItemShow = (): React.ReactElement => {
    let { id } = useParams();
    const action: ItemBidRes = useActionData() as ItemBidRes;
    const theForm = useRef(null);
    const navigate = useNavigate();
    const [item, setItem] = useState<ItemShowRes>();
    const [message, setMessage] = useState<string>();

    /**
     * Fetches item details from the server.
     * @param {string} itemId - The ID of the item to fetch.
     * @returns {Promise<ItemShowRes>} - Promise that resolves to item details.
     */
    const itemShow = async (itemId: string): Promise<ItemShowRes> => {
        let itemShowURL = beItemShowURL + itemId;
        try {
            const response = await fetch(itemShowURL);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!checkLogin()) return navigate('/user/sign-in');
        itemShow(id).then(data => setItem(data));
        itemId = id;
        if (action) {
            theForm.current.reset();
            setMessage(action.message);
            setTimeout(() => {
                setMessage('');
            }, 5000);
            if (action.success) item.highest = action.data.amount;
        }
    }, [id, action]);

    if (!item) return <LoadSpinner />;

    if (item) {
        return (
            <>
                <div className="row">
                    <div className="col-xl-6 offset-xl-3">
                        <h3>Item Details</h3>
                    </div>
                    <div className="col-xl-6 offset-xl-3">
                        <div key={item.id} className="card listing-card mb-3 shadow">
                            <div className="card-body">
                                <div className="listing-item-title">{item.name}</div>
                                <hr />
                                <p className="listing-item-bid">HIGHEST BID: ${item.highest}</p>
                                <p className="listing-item-desc">{item.description}</p>
                                <hr />
                                <p className="listing-item-deadline text-center">DEADLINE: {item.expiry}</p>
                                <Form method="post" ref={theForm}>
                                    <div className="form-floating mt-3">
                                        <input
                                            type="number"
                                            name="theAmount"
                                            min={item.highest + 10}
                                            className="form-control"
                                            placeholder="Password"
                                            required
                                        />
                                        <label htmlFor="floatingInput">Amount</label>
                                        <div className="text-center">
                                            <button className="w-100 btn btn-primary mt-4 p-3 fw-bolder" type="submit">
                                                R A I S E
                                            </button>
                                        </div>
                                        {action ? (action.success === true ? (
                                            <div className="text-center text-uppercase text-success fw-bolder mt-3" style={{ fontSize: "14px" }}>
                                                {message}
                                            </div>
                                        ) : (
                                            <div className="text-center text-uppercase text-danger fw-bolder mt-3" style={{ fontSize: "14px" }}>
                                                {message}
                                            </div>
                                        )) : ''}
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="text-center">
                            <img src={back} alt="back button" onClick={() => navigate(-1)} style={{ width: "70px" }} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

/**
 * Handles the item bidding action.
 * @param {Object} request - The form data from the bidding form.
 * @returns {Promise} - Promise representing the bidding response.
 */
export const ItemShowAction = async ({ request }: typeof request): Promise<ItemShowRes | StatusRes > => {
    const theForm = await request.formData();
    const payload = {
        "bidder": jwt('user'),
        "item": itemId,
        "amount": theForm.get('theAmount'),
        "status": 1
    }
    try {
        const response = await fetch(beBidRegister, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt('token'),
            },
            body: JSON.stringify(payload)
        });
        return await response.json();

    } catch (error) {
        return {
            success: false,
            message: `Can't connect to server, please try again later`
        };
    }
}

export default ItemShow;
