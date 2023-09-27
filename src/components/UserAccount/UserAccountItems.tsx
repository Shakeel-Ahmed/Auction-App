import React from "react";
import { ItemData } from "../../interfaces";
import { Link } from "react-router-dom";
import open from "../../images/next.svg";

/**
 * UserAccountItems component displays a list of items associated with a user account.
 * @param {Object} props - The component props.
 * @param {ItemData[]} props.data - An array of item data to display.
 * @returns {React.ReactElement} The UserAccountItems component.
 */
const UserAccountItems: React.FC<{ data: ItemData[] }> = (props: { data: ItemData[] }): React.ReactElement => {
    const {data} = props;
    return (
        <>
            <div className="col-xl-6 offset-xl-3">
                <div className="card listing-card mb-3 shadow">
                    <div className="card-body">
                        <table className="w-100">
                            <tbody>
                            {data.length > 0 ? (
                                data.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td><span className="table-listing">{item.name}</span></td>
                                            <td className="text-end">
                                                <Link to={'/item/show/' + item.id}><img src={open} alt="open" /></Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : ''}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserAccountItems;
