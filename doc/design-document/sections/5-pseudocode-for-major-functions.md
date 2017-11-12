# 5. Pseudocode for Major Functions

## 5.1 Reserve Booths

```txt
# Class BoothRentalManagementControl

function reserveBooths(boothNumbers, marketId, products, shopName)
    vendorUsername := get username from the session

    if boothNumbers, marketId, products, shopName passes form validation then
        boothList := create booth list using boothNumbers submitted with the form
        reservationTime := get the current time of the system
        status := create new status as "Proposed"
        reservationInfo := create new ReservationInfo with boothlist, reservationTime, status, shopName and vendorUsername

        Save reservationInfo Object to reservationInfo Table
        if there is an error while saving the entity then
            Display Error Message with Text "There is an error occur with the system, please try again"
        else
            Send a new reservation notification email to the lessor
            Send a confirmation email to the vendor
            Display proposed reservation detail
        endif

    else
        Display Error Message with text "Invalid form, please see the information below"
        Mark invalid field and Display message for each invalid field as specified in "Reservation Function" in Error Messages Document
    endif
endfunction
```

## 5.2. Approve Reservation

```txt
# Class MarketManagementControl

function approveReservation(boothNumber, marketId, vendorUsername)
    market := get market from Market table using marketId as a finding key
    booth := get booth from the Booth Table using boothNumber as a finding key

    Update booth Object reservation field with vendorUsername
    Save booth Object to Booth Table
    if there is an error while saving the entity then
        Display Error Message with text "There is an error occur with the system, please try again"
    else
        Display Success Message "You have successfully approve booth" with boothNumber
        Display Approval Detail with boothNumber and the selected vendorUsername
    endif
endfunction
```

## 5.3. Get Market Feed

```txt
# Class MarketManagementControl

function getMarketFeed()

    Create Market Object to connect to Database
    if there is any error while connecting then
     Display Error Message with text "There is an error occur with the system, please try again"
    else
        popularMarket := Get market list from Market Object sorted by most booked and most view market
        recentlyAddedMarket := Get market list from Market Object sorted by created date

        categories := Get all categories from Market Object

        categorizedMarketList := empty list

        for each marketCategory in list of categories :
            marketListInCategory := Filter market list from Market Object by marketCategory
            append marketListInCategory to categorizedMarketList
        endfor
    endif

    return popularMarket, recentlyAddedMarket, categorizedMarketList
endfunction
```

## 5.4. Pay with Credit Card

```txt
# Class BoothRentalManagementControl

function payWithCreditCard(paymentDetail, marketId)
    if paymentDetail or marketId fails form validation then
     Display validation error
    else
        vendorUsername := Session.user
        market := get Market from database by marketId
        booth := get Booth from database by market and vendorUsername
        reservationInfo := get ReservationInfo from database by booth and vendorUsername

        if reservationInfo.status is not approved then
            Display "cannot pay unapproved reservation"
        else
            if there is a RentalPaymentInfo associated with booth then
                rentalPaymentInfo := get RentalPaymentInfo from database associated with booth
            else
                rentalPaymentInfo := create new RentalPaymentInfo with associated booth
            endif
            rentalPaymentInfo.payWithCreditCard(paymentDetail)

            Save rentalPaymentInfo entity to database
            Send payment confirmation email to the vendor and lessor
            Display paid reservation detail
        endif
    endif
endfunction

# Class RentalPaymentInfo

function payWithCreditCard(rentalPaymentInfo, paymentDetail)
    currentTime := Time.currentTime()
    if paymentDetail.type is "pay30" then
        amount := rentalPaymentInfo.booth.rentalFee * 0.30
        installment := create new Installment with
            paymentMethod = "credit",
            round = 1,
            paymentDate = currentTime, and
            amount = amount
    else if paymentDetail.type is "pay70" then
        amount := rentalPaymentInfo.booth.rentalFee * 0.70
        installment := create new Installment with
            paymentMethod = "credit",
            round = 2,
            paymentDate = currentTime, and
            amount = amount
    else if paymentDetail.type is "payFull" then
        amount := rentalPaymentInfo.booth.rentalFee
        installment := create new Installment with
            paymentMethod = "credit",
            round = 1,
            paymentDate = currentTime, and
            amount = amount
    endif

    charge credit card via a payment gateway using info from paymentDetail and amount
    Save installment entity to database
endfunction
```

## 5.5. Pay with Bank Transfer

```txt
# Class BoothRentalManagementControl

function payWithBankTransfer(marketId)
    if marketId fails form validation then
        Display validation error
    else
        venderUsername := Session.user
        market := get Market from database by marketId
        booth := get Booth from database by market and vendorUsername
        reservationInfo := get ReservationInfo from database by booth and vendorUsername

        if reservationInfo.status is not approved then
            Display error "cannot pay unapproved reservation"
        else
            if there is a RentalPaymentInfo associated with booth then
                rentalPaymentInfo := get RentalPaymentInfo from database associated with booth
            else
                rentalPaymentInfo := create new RentalPaymentInfo with associated booth
            endif

            set status of rentalPaymentInfo to "awaitingBankTransfer"
            Save rentalPaymentInfo entity to database
            Display bank transfer receipt upload form
        endif
    endif
endfunction

function addPaymentReceipt(image, marketId)
    if image or marketId fails form validation then
        Display validation error
    else
        venderUsername := Session.user
        market := get Market from database by marketId
        booth := get Booth from database by market and vendorUsername
        rentalPaymentInfo := get ReservationInfo from database by booth and vendorUsername
        if rentalPaymentInfo.status is not "awaitingBankTransfer" then
           Display error message
        else
            rentalPaymentInfo.payWithBankTransfer(image)
            Save rentalPaymentInfo entity to database
            Display reservation detail along with receipt upload success alert
        endif
    endif
endfunction

# Class RentalPaymentInfo

function payWithBankTransfer(rentalPaymentInfo, receiptImage)
    installment := get latest Installment of rentalPaymentInfo
    installment.addPaymentReceipt(receiptImage)
    Save installment entity to database
endfunction
```
