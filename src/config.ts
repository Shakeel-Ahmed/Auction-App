/**
 * Base URL for the backend server.
 */
export const beBaseURL = process.env.REACT_APP_BACKEND_BASEURL;

/**
 * URL for user login.
 */
export const beUserLoginURL = beBaseURL + "user/login";

/**
 * URL for user registration.
 */
export const beUserRegisterURL = beBaseURL + "user/register";

/**
 * URL for user account details.
 */
export const beUserAccountURL = beBaseURL + "user/account/";

/**
 * URL for creating an item.
 */
export const beItemCreateURL = beBaseURL + "item/create";

/**
 * URL for listing items.
 */
export const beItemListURL = beBaseURL + "item/list";

/**
 * URL for showing item details.
 */
export const beItemShowURL = beBaseURL + "item/show/";

/**
 * URL for registering a bid.
 */
export const beBidRegister = beBaseURL + "bid/register";

/**
 * URL for transferring funds.
 */
export const beFundsTransfer = beBaseURL + "wallet/transfer";
