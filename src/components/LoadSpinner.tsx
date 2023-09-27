import React from "react";

/**
 * Component representing a loading spinner.
 * @returns {React.ReactElement} JSX element representing the loading spinner.
 */
const LoadSpinner = (): React.ReactElement => {
    return(<>
        <div className="loader-container d-flex align-items-center text-center">
            <div className="loader"></div>
        </div>
    </>);
}

export default LoadSpinner;
