import { useParams, useNavigate } from "react-router-dom";
import { beItemListURL } from "../config";
import React, { useEffect, useState } from "react";
import { ItemListingRes } from "../interfaces";
import LoadSpinner from "./LoadSpinner";

import next from '../images/next.svg';
import back from '../images/back.svg';

/**
 * Component representing a listing of items with pagination.
 * @returns {React.ReactElement} JSX element representing the item listing.
 */
function ItemListing(): React.ReactElement {

    const navigate = useNavigate();
    const { page } = useParams();

    const [listing, setListing] = useState<ItemListingRes | undefined>();

    /**
     * Navigate to a different page within the item listing.
     * @param {string} pageNumber - The page number to navigate to.
     * @returns {void}
     */
    const paginate = (pageNumber: string): void => {
        setListing(undefined);
        return navigate("/item/list/" + pageNumber)
    }

    /**
     * Fetch a list of items based on the page number.
     * @param {string} page - The page number to fetch items for.
     * @returns {Promise<ItemListingRes>} A Promise that resolves to item listing data.
     */
    const itemsList = async (page: string): Promise<ItemListingRes> => {
        let itemListingURL = beItemListURL;
        if (page) itemListingURL += "?page=" + page;
        try {
            const response = await fetch(itemListingURL);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        itemsList(page).then(data => setListing(data));
    }, [page]);

    if (!listing) return <LoadSpinner />

    if (listing) return (<>
            <div className="row">
                <div className="col-xl-6 offset-xl-3">
                    {listing.data.map(item => {
                        return (
                            <div key={item.item} className="card listing-card mb-3 shadow">
                                <div className="card-body">
                                    <div className="listing-item-title">{item.name}</div>
                                    <hr/>
                                    <p className="listing-item-bid">HIGHEST BID: ${item.highest ?? 0}</p>
                                    <p className="listing-item-desc">{item.description}</p>
                                    <p className="listing-item-deadline">DEADLINE: {item.expiry}</p>
                                    <hr/>
                                    <div className="text-end">
                                        <img src={next} alt="open" onClick={navigate.bind(null, "/item/show/" + item.item)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="row">
                <div className="col-12 fw-bold text-end">
                    Total: <span className="accent-text">{listing ? listing.total : ''}</span>
                </div>
                <div className="col-12 text-center py-5">
                    {listing.current_page > 1 ? (
                        <img src={back}
                             alt="back page"
                             style={{cursor: 'pointer', width: '48px'}}
                             onClick={paginate.bind(null, listing ? listing.current_page - 1 : '')}
                        />
                    ) : (<img src={back} alt="back" className="opacity-25"/>)}
                    <span className="fw-bolder mx-4"
                          style={{fontSize: '20px'}}>{listing ? listing.current_page : ''}</span>
                    {listing.current_page !== listing.last_page ? (
                        <img src={next}
                             alt="next page"
                             style={{cursor: 'pointer', width: '48px'}}
                             onClick={paginate.bind(null, listing ? listing.current_page + 1 : '')}
                        />) : (<img src={next} alt="next" className="opacity-25"/>)}
                </div>
            </div>
        </>
    );
}
export default ItemListing;
