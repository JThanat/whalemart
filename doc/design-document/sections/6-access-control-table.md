# 6. Access Control Table
1. Class Vendor

Table 10‑1: Access control table for class Vendor

| Action\Actor    | Vendor               | Lessor               | Admin | Non-member User |
| --------------- | -------------------- | -------------------- | ----- | --------------- |
| <<create>>      |                      |                      |       | ✓               |
| becomeALessor() | ✓                    |                      |       |                 |
| setPassword()   | ✓                    | ✓                    |       |                 |
| getProfile()    | ✓ (Only his/herself) |                      |       |                 |
| setProfile()    | ✓ (Only his/herself) |                      |       |                 |
| addReport()     |                      | ✓                    |       |                 |
| addCreditCard() | ✓ (Only his/herself) | ✓ (Only his/herself) |       |                 |

 

2. Class Market

Table 10‑2: Access control table for class Market

| Action\Actor                    | Vendor | Lessor | Admin | Non-member User |
| ------------------------------- | ------ | ------ | ----- | --------------- |
| <<create>>                      |        | ✓      |       |                 |
| getMargetInfo()                 | ✓      | ✓      | ✓     | ✓               |
| updateInfo()                    |        | ✓      |       |                 |
| getRentalPaymentInfo()          | ✓      |        |       |                 |
| setMarketInfo()                 |        | ✓      |       |                 |
| setMoneyTranferToLessorStatus() |        |        | ✓     |                 |
| getMarketLaout()                | ✓      | ✓      |       |                 |

 

3. Class Lessor

Table 10‑3: Access control table for class Lessor

| Action\Actor       | Vendor | Lessor | Admin | Non-member User |
| ------------------ | ------ | ------ | ----- | --------------- |
| <<create>>         | ✓      |        |       |                 |
| getProfile()       | ✓      | ✓      |       |                 |
| setLessorProfile() |        | ✓      |       |                 |
| addRating()        | ✓      |        |       |                 |

 

4. Class Receipt

Table 10‑4: Access control table for class Receipt

| Action\Actor            | Vendor               | Lessor | Admin | Non-member User |
| ----------------------- | -------------------- | ------ | ----- | --------------- |
| <<create>>              | ✓                    |        |       |                 |
| setVerificationStatus() |                      |        | ✓     |                 |
| setPaymentReceipt()     | ✓                    |        |       |                 |
| getVerificationStatus() | ✓ (Only his/herself) | ✓      | ✓     |                 |

 

5. Class Installment

Table 10‑5: Access control table for class Installment

| Action\Actor        | Vendor | Lessor | Admin | Non-member User |
| ------------------- | ------ | ------ | ----- | --------------- |
| <<create>>          | ✓      |        |       |                 |
| addPaymentReceipt() | ✓      |        |       |                 |

 

6. Class ReservationPaymentInfo

Table 10‑6: Access control table for class ReservationPaymentInfo

| Action\Actor          | Vendor | Lessor | Admin | Non-member User |
| --------------------- | ------ | ------ | ----- | --------------- |
| <<create>>            | ✓      |        |       |                 |
| payWithCreditCard()   | ✓      |        |       |                 |
| payWithBackTransfer() | ✓      |        |       |                 |

 

7. Class ReservationInfo

Table 10‑7: Access control table for class ReservationInfo

| Action\Actor         | Vendor               | Lessor | Admin | Non-member User |
| -------------------- | -------------------- | ------ | ----- | --------------- |
| <<create>>           | ✓                    |        |       |                 |
| approveReservation() |                      | ✓      |       |                 |
| getReservationInfo() | ✓ (Only his/herself) | ✓      |       |                 |

 
 8. Class Booth
Table 10‑8: Access control table for class Booth

| Action\Actor | Vendor | Lessor | Admin | Non-member User |
| ------------ | ------ | ------ | ----- | --------------- |
| <<create>>   |        | ✓      |       |                 |
| reserve()    | ✓      |        |       |                 |

 

9. Class Product

Table 10‑9: Access control table for class Booth

| Action\Actor | Vendor | Lessor | Admin | Non-member User |
| ------------ | ------ | ------ | ----- | --------------- |
| <<create>>   | ✓      |        |       |                 |

 

10. Class CreditCard

Table 10‑10: Access control table for class CreditCard

| Action\Actor        | Vendor               | Lessor               | Admin | Non-member User |
| ------------------- | -------------------- | -------------------- | ----- | --------------- |
| <<create>>          | ✓                    | ✓                    |       |                 |
| getPaymentMethods() | ✓ (Only his/herself) | ✓                    |       |                 |
| setPaymentMethod()  | ✓ (Only his/herself) | ✓ (Only his/herself) |       |                 |

 

11. Class Report

Table 10‑11: Access control table for class Report

| Action\Actor | Vendor | Lessor | Admin | Non-member User |
| ------------ | ------ | ------ | ----- | --------------- |
| <<create>>   |        | ✓      |       |                 |

 

12. Class Admin

Table 10‑12: Access control table for class Admin

| Action\Actor | Vendor | Lessor | Admin | Non-member User |
| ------------ | ------ | ------ | ----- | --------------- |
| <<create>>   |        |        | ✓     |                 |

 

13. Class Rating

Table 10‑13: Access control table for class Rating

| Action\Actor | Vendor | Lessor | Admin | Non-member User |
| ------------ | ------ | ------ | ----- | --------------- |
| <<create>>   | ✓      |        |       |                 |

 

14. Class BankAccount

Table 10‑14: Access control table for class BankAccount

| Action\Actor | Vendor | Lessor | Admin | Non-member User |
| ------------ | ------ | ------ | ----- | --------------- |
| <<create>>   |        | ✓      |       |                 |

