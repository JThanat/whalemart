# 3. Functional Requirements 

Functional Requirements List
1. Feed
    1. This page must be set as a homepage when a user enters the website via the URL https://whalemart.in.th directly.
    2. This page must consist of all available markets in the system.
    3. All flea markets must be categorized by their types.
    4. It must display a list of each market category.
    5. It must display a list of upcoming flea markets.
    6. It should display a list of popular flea markets, which is determined by the number of registered user.
2. Register
    1. A user can register an account to the system by one of the following methods:
        1. Register with an email address. User must confirm his/her email by clicking on the confirmation link sent to his/her email inbox to activate the account before using any account-related functions
        2. Register with Facebook. An email address is acquired from Facebook email account if exists. Otherwise, a user must provide his/her email manually.
    2. If a user registers with his email address, he can connect his account with Facebook account later.
3. Login
    1. A user can log in to the system by one of the following methods:
        1. Log in with an email address.
        2. Log in with Facebook. Connecting an account with Facebook beforehand is required.
    2. The system should provide a password resetting mechanism in case a user cannot access his own account.
4. Market Landing Page
    1. It must display the name of the market.
    2. It must display opening date and closed date.
    3. It must display opening time and closed time.
    4. It must display description and an event theme for each market.
    5. It must display market layout.
    6. It must display scene for market that are uploaded by a market lessor.
    7. It must display Terms and Conditions for agreement between lessors and     vendors.
    8. It must display a location address for the market along with an     embedded map.
    9. It must display a list of provided accessories for booth setup.
    10. It must display contact information of the lessor.
    11. It must display range of booth rental fee.
    12. It should display the number of estimated visitors if available.
    13. It should display deposit payment due date and full payment due date.
5. Reservation
    1. It must display market layout.
        1. It should be able to zoom in to see a portion of the layout in detail.
    2. A vendor must choose which booths he/she want to reserve.
        1. A vendor can reserve only 1 booth, but he/she can choose up to 10 booths from the market layout that he/she prefers.
    3. A vendor should be able to select the payment method either by paying via payment gateway or transferring via bank.
    4. It must display a rental fee for each booth.
    5. A vendor can provide the list of products that would like to sell.
6. Payment
1. The system must support the following payment methods:
    1. Bank transfer
        1. A vendor must deposit 30% when he/she claims the reservation right approved by the lessor.
        2. A vendor must pay the remaining 70% of the rental fee after he/she confirms to rent the booth and before the full payment due date.
        3. After each transferring, the vendor should be able to upload a picture of the receipt as a proof of payment.
    2. Credit card
        1. A vendor must deposit 30% of the booth rental fee approved by the lessor within right claiming period and must pay immediately after claiming the right for the reservation. Otherwise, the reservation will be cancelled.
        2. A vendor credit/debit card will be automatically billed for the remaining 70% after he/she confirms to rent the booth in the flea market within the full payment due date.
7. Vendor Profile
    1. It must display vendor's full name.
    2. It must display vendor's phone number and email.
    3. It should have a list of product categories to sell which can be added and removed.
    4. It must display a list of bank accounts for that can be used for payment transfer.
    5. A vendor must be able to add or delete bank accounts.
    6. It must display a list of credit/debit cards for payment, which can be added and removed.
    7. A vendor must be able to edit vendor’s full name, phone number, email, and password.
    8. It must display a list of market that a vendor reserved along with reservation status (accepted or rejected).
    9. It must have a list of contact information, e.g. Facebook Page, Instagram.
8. Lessor Administrator Page
    1. Become a Lessor
        1. A lessor can register re account to the system using an email     address.
        2. A lessor must provide a bank account for receiving the money for booth reservation.
    2. Profile
        1. It must display lessor’s full name.
        2. It must display lessor’s phone number and email.
    3. It must have a list of contact information, e.g. Facebook Page, Instagram, Twitter.
    4. It must display a list of credit/debit cards for payment, which can be added or removed.
    5. Dashboard
        1. A lessor can create flea market.
        2. Lessor can edit flea market.
            1. A lessor must upload photos of market.
            2. A lessor must upload market layout.
            3. A lessor must set opening time and closed time.
            4. A lessor must provide market description.
            5. A lessor must provide list of available booth location.
        3. Lessor can remove flea market.
        4. Lessor can approve booth that vendors have reserved.
        5. Lessor can track payment status of each vendor and all of 2 periods (First period is 30% and second period is 70%).
9. Admin
    1. The system must be able to displays all unapproved receipts.
    2. The rental payment info status is set to “approved”
    3. A user must be able to set a receipt as “approved” or “rejected”.
10. Notification
    1. The system must send a confirmation email to a vendor when a vendor     successfully pays the money into the system.
    2. The system must send a confirmation email to a vendor when a lessor     approves the reservation.
    3. The system must send a confirmation email to a vendor when the card     has been added or removed.
    4. The system must send a confirmation email to a vendor when the     reservation has been made or cancelled
    5. The system must send a notifying email to a vendor when it is almost a     payment deadline
    6. The system must send a confirmation email to a lessor when he/she has     successfully registered as a lessor
    7. The system must send a notifying email to a lessor when it is almost     an approval deadline
    8. The system must send a notifying email to a lessor when he/she     receives the money from the system