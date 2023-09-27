# Auction Demo App Introduction



## Bidding Features:

- The **Auction Demo App** is a platform designed for conducting online item auctions.
- The frontend of this application is crafted using the React JS library, and TypeScript is employed to ensure type safety and enhanced development productivity.
- On the backend, we have implemented Laravel 10, a robust PHP framework known for its scalability and extensive feature set.
- Users are granted the capability to establish their accounts conveniently through a straightforward signup process.
- Each registered user is provided with a dedicated deposit bank. This deposit bank serves as a repository for their funds, simplifying the bidding process.
- An interesting feature of this application is that users are not required to deposit funds for every bid they place. Instead, the amount they bid is seamlessly deducted from their deposit bank, streamlining the user experience.
- Bidding on items follows a straightforward rule: users must submit bids that surpass the existing highest bid. Moreover, users must ensure they maintain sufficient funds in their deposit to successfully raise their bid when competing with others.
- To further enhance the user experience, we offer the flexibility for users to deposit additional funds into their deposit bank if their balance runs low.



## Item Auctioning Features:

- In addition to participating in auctions, our platform empowers users to initiate auctions for their own items.
- Users can provide comprehensive descriptions and titles for the items they intend to auction, ensuring that potential bidders have clear insights into what's on offer.
- Auctions on this platform are time-bound, with users setting an expiry date. Once this predefined timeframe elapses, the auction automatically concludes.
- Users have the discretion to choose when their items become part of the live auction. Items can be set to publish immediately upon creation. (Please note that for this demo, there is no editing available once an item is published; hence, users should set their items for publication at the time of creation.)
- As the initial bidder after publishing an auction item, users can specify the starting bidding amount, providing them with greater control over the auctioning process.



## App Usage:

- Navigating the application is designed to be intuitive and user-friendly:
- To access the home page, simply click on the application logo.
- Registered users can sign in by clicking on the top-right user account icon.
- New users can seamlessly register by clicking the "Sign-up" link conveniently located on the sign-in page.
- For signed-in users, the option to sign out is readily available by clicking "SIGN-OUT" in the header.
- Exploring the available auctions is a click away; just click the "Action" link in the header. The list of auctions is thoughtfully sorted, with the latest items showcased prominently.
- Detailed information about specific items can be viewed by clicking the circular right arrow icon.
- Participating in auctions is straightforward: users can place bids by entering an amount higher than the current highest bid. It's essential to ensure that sufficient funds are available in the user's wallet to support the bid.
- The user account page, accessible via the top-right user account icon for signed-in users, provides comprehensive insights. Here, users can review their account details, monitor their auction items, and access their bidding history.
- To bolster their wallet, users can deposit funds conveniently on the user account page.
- In the event of an unsuccessful bid, the bid amount is promptly refunded to the user's wallet.
- Users interested in auctioning their own items can do so by clicking the "Add Item" link in the header.



## Technical Pointers:



### Frontend React JS:

- Our frontend is entirely developed using the React JS framework. React JS is renowned for its component-based architecture, which fosters modular development and facilitates code reusability.
- It's important to note that the frontend primarily focuses on the presentation layer and doesn't engage in extensive data processing. Instead, it relies on pre-processed JSON data supplied by the backend via the fetch API.
- User authentication is seamlessly integrated into our frontend, relying on authenticated user tokens. These tokens are essential for accessing restricted sections of the application.
- Notably, we've opted not to implement sitewide state management solutions like Redux. This decision aligns with our goal of keeping the application as lean and efficient as possible, given the specific requirements.

### Backend Laravel 10:

- Our backend, on the other hand, is powered by Laravel 10, a renowned PHP framework celebrated for its comprehensive toolkit for building web applications.
- Within the backend, we handle various critical functionalities, including user authentication, item management, wallet management, and more.
- Middleware and custom requests are extensively employed to manage and streamline frontend requests, ensuring that they adhere to the necessary processing rules and security checks.
- Database management is efficiently handled through Laravel's Eloquent ORM, which simplifies database interactions, and database schema management is streamlined using migrations.

### UI Notes:

- We've chosen to use the Bootstrap 5 CSS framework to style our application's user interface. While Bootstrap provides an extensive set of styling components and utilities, we've applied minimal theme adjustments to maintain a clean and functional appearance.
- It's important to highlight that our focus has primarily been on functional aspects rather than extensive UI design. Consequently, the UI may appear basic, but it serves the application's purpose effectively.
- Notably, we've refrained from utilizing Bootstrap 5 JavaScript components, aligning with our objective of keeping the frontend simple and lightweight.



## Database Structure Overview



### Bids Table (`bids`)

- `bid_id` (Primary Key): Auto-incrementing unique identifier for each bid.
- `item_id` (Foreign Key): References the `item_id` in the `items` table, linking each bid to a specific auction item.
- `amount`: Stores the bid amount made by a user.
- `status`: Represents the status of the bid (e.g., accepted, rejected, pending).
- `timestamps`: Automatically generated timestamps for bid creation and updates.

### Items Table (`items`)

- `item_id` (Primary Key): Auto-incrementing unique identifier for each auction item.
- `user_id`: Identifies the user who created the auction item.
- `name`: Stores the name or title of the auction item.
- `description`: Contains a detailed description of the auction item.
- `publish`: A flag to determine whether the item is published or not.
- `expiry`: Represents the date and time when the auction for the item will conclude.
- `status`: Indicates the status of the auction item (e.g., active, closed).
- `timestamps`: Automatically generated timestamps for item creation and updates.

### Wallets Table (`wallets`)

- `transaction` (Primary Key): Auto-incrementing unique identifier for each wallet transaction.
- `user` (Foreign Key): References the `id` in the `users` table, associating each transaction with a specific user.
- `amount`: Stores the transaction amount (e.g., deposit, bid deduction).
- `credits`: Represents the user's wallet balance after the transaction.
- `type`: Describes the type of transaction (e.g., deposit, bid deduction).
- `status`: Indicates the status of the transaction (e.g., success, pending).
- `timestamps`: Automatically generated timestamps for transaction creation and updates.

### Users Table (`users`)

- `id` (Primary Key): Auto-incrementing unique identifier for each user.
- `name`: Stores the user's name.
- `email`: Contains the user's unique email address used for authentication.
- `email_verified_at`: Timestamp for email verification (nullable).
- `password`: Securely stores the user's password.
- `rememberToken`: Used for user authentication and session management.
- `timestamps`: Automatically generated timestamps for user registration and updates.

These database tables and their respective fields are designed to support the functionality of auction application, including item listings, bidding, user accounts, and wallet management. The foreign key relationships ensure data integrity and proper associations between entities.

## My Take:

- The decision to utilize React JS with TypeScript for the frontend was a strategic one, driven by the assessment requirements and the need for a modern, robust framework.
- Laravel 10 was chosen for the backend due to its extensive feature set and well-established reputation in the developers community.
- While the application's UI may appear minimalistic, our primary objective was to deliver robust functionality and a seamless user experience.
