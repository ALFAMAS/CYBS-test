<html>
<head>
    <title>Secure Acceptance - Payment Form Example</title>
    <link rel="stylesheet" type="text/css" href="payment.css"/>
    <script type="text/javascript" src="jquery-1.7.min.js"></script>
</head>
<body>
<form id="payment_form" action="payment_confirmation.php" method="post">
<input type="hidden" name="access_key" value="6151766076ef3342b678a473f8b9f801">
<input type="hidden" name="profile_id" value="726C8F51-35FB-4C78-964D-9342278B4FBA">
    <input type="hidden" name="transaction_uuid" value="<?php echo uniqid() ?>">
    <input type="hidden" name="signed_field_names" value="override_custom_receipt_page,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency">
    <input type="hidden" name="unsigned_field_names" value="override_custom_cancel_page,bill_to_forename,bill_to_surname,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_postal_code,bill_to_address_country,bill_to_email">
    <input type="hidden" name="signed_date_time" value="<?php echo gmdate("Y-m-d\TH:i:s\Z"); ?>">
    <input type="hidden" name="locale" value="en">
    <fieldset>
        <legend>Payment Details</legend>
        <div id="paymentDetailsSection" class="section">
            <span>transaction_type:</span><input type="text" name="transaction_type" size="25"><br/>
            <span>reference_number:</span><input type="text" name="reference_number" size="25"><br/>
            <span>amount:</span><input type="text" name="amount" size="25"><br/>
            <span>currency:</span><input type="text" name="currency" size="25"><br/>
			<input type="hidden" name="bill_to_forename" value="NOREAL"/>
            <input type="hidden" name="bill_to_surname" value="NAME"/>
            <input type="hidden" name="bill_to_address_line1" value="1295 Charleston Road"/>
            <input type="hidden" name="bill_to_address_state" value="CA"/>
            <input type="hidden" name="bill_to_address_city" value="Mountain View"/>
            <input type="hidden" name="bill_to_address_country" value="US"/>
            <input type="hidden" name="bill_to_email" value="null@cybersource.com"/>
            <input type="hidden" name="bill_to_address_postal_code" value="94043"/>
			<input type="hidden" name="override_custom_receipt_page" value="http://localhost:1337/callback/success"/>
			<input type="hidden" name="override_custom_cancel_page" value="http://localhost:1337/callback/success"/>
        </div>
    </fieldset>
    <input type="submit" id="submit" name="submit" value="Submit"/>
    <script type="text/javascript" src="payment_form.js"></script>
</form>
</body>
</html>
