/**
 * Response interface for creating an item.
 */
export interface ItemCreateRes {
    success: boolean;
    message: string;
    data: {
        name: string;
        description: string;
        status: string;
    };
}

/**
 * Response interface for showing item details.
 */
export interface ItemShowRes {
    id: number;
    name: string;
    description: string;
    publish: number;
    expiry: string;
    status: string;
    highest: number;
}

/**
 * Response interface for bidding on an item.
 */
export interface ItemBidRes {
    success: boolean;
    message: string;
    data: {
        bid: number;
        existing: number;
        balance: number;
        amount: number;
        bidder: number;
        item: number;
    };
    error: {
        code: number;
        message: string;
        info: string;
    };
}

/**
 * Response interface for listing items.
 */
export interface ItemListingRes {
    current_page: number;
    data: {
        item: number;
        user: number;
        name: string;
        description: string;
        publish: number;
        expiry: string;
        status: string;
        created_at: string;
        updated_at: string;
        highest: number | null;
    }[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

/**
 * Response interface for user login.
 */
export interface AuthLoginRes {
    success: boolean;
    message: string;
    data: {
        name: string;
        token: string;
        user: number;
    };
}

/**
 * Response interface for user signup.
 */
export interface AuthSignUpRes {
    success: boolean;
    message: string;
    data: {
        name: string;
        email: string;
        remember_token: string;
    };
    error: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
}

/**
 * Interface representing item data.
 */
export interface ItemData {
    id: number;
    name: string;
    description: string;
    publish: number;
    expiry: string;
    status: string;
}

/**
 * Response interface for showing user details.
 */
export interface UserShowRes {
    success: boolean;
    message: string;
    data: {
        name: string;
        email: string;
        balance: number;
        user_bids: ItemData[];
        user_items: ItemData[];
    };
}

/**
 * Response interface for depositing funds.
 */
export interface DepositRes {
    success: boolean;
    message: string;
    code: number;
    data: {
        amount: number;
        credits: number;
        user: number;
        type: string;
        status: string;
    };
}

/**
 * Response interface template for general response.
 */
export interface StatusRes {
    success: boolean;
    message: string;
}
