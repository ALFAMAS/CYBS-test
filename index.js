import express from 'express';
import crypto from 'crypto'
import axios from 'axios'

const router = express.Router();

const HMAC_SHA256 = 'sha256';
const SECRET_KEY = '23c5a5aedc2f401ea643701510244739988807e6fda6421c9959ebb085b2c95abbc6f2bb5f924e7eb2998a3ec3f22072a8c439d3e6874664a61202be5d5984c465ab1f71ab224aa4b04cd146d03a2f5834a228299e0f4ef98b205c26068f339fb7115a2e1a324ee2832040c9e11ba04c757724014a5b462db78e44a43f29ff55';
const EXTERNAL_URL = 'https://testsecureacceptance.cybersource.com/pay';
// const EXTERNAL_URL = 'https://testsecureacceptance.cybersource.com/embedded/pay';

function sign(params) {
    return signData(buildDataToSign(params), SECRET_KEY);
}

function signData(data, secretKey) {
    const hmac = crypto.createHmac(HMAC_SHA256, secretKey);
    hmac.update(data);
    return hmac.digest('base64');
}

function buildDataToSign(params) {
    const signedFieldNames = params.signed_field_names.split(',');
    const dataToSign = signedFieldNames.map(field => `${field}=${params[field]}`);
    return commaSeparate(dataToSign);
}

function commaSeparate(dataToSign) {
    return dataToSign.join(',');
}

router.get('/cybs/payment', async (req, res) => {
    let { amount, currency, transaction_type, reference_number } = req.body;

    // Default values if not provided
    if (!amount) amount = '100';
    if (!currency) currency = 'BDT';
    if (!transaction_type) transaction_type = 'sale';
    if (!reference_number) reference_number = Date.now().toString();

    const transaction_uuid = crypto.randomUUID();
    const now = new Date();

    // Add 6 hours to get GMT+6
    now.setHours(now.getHours());

    // Format the date to ISO string
    const formattedDate = now.toISOString();

    // Extract the date part and the time part (without milliseconds)
    const datePart = formattedDate.slice(0, 10);
    const timePart = now.toTimeString().slice(0, 8);

    // Combine them
    const signed_date_time = `${datePart}T${timePart}Z`;

    console.log("signed_date_time", signed_date_time);

    const access_key = '6151766076ef3342b678a473f8b9f801';
    const profile_id = '726C8F51-35FB-4C78-964D-9342278B4FBA';

    let data = {
        access_key,
        profile_id,
        transaction_uuid,
        signed_field_names: 'override_custom_receipt_page,access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency',
        unsigned_field_names: 'override_custom_cancel_page,bill_to_forename,bill_to_surname,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_postal_code,bill_to_address_country,bill_to_email',
        signed_date_time,
        locale: 'en',
        transaction_type,
        reference_number,
        amount,
        currency,
        bill_to_forename: 'NOREAL',
        bill_to_surname: 'NAME',
        bill_to_address_line1: '1295 Charleston Road',
        bill_to_address_state: 'CA',
        bill_to_address_city: 'Mountain View',
        bill_to_address_country: 'US',
        bill_to_email: 'null@cybersource.com',
        bill_to_address_postal_code: '94043',
        override_custom_receipt_page: 'http://localhost:1337/callback/success',
        override_custom_cancel_page: 'http://localhost:1337/callback/success'
    };

    data.signature = sign(data);

    try {
        const response = await axios.post(EXTERNAL_URL, data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        // console.log(response.data);
        // Send the external service's response back to the client
        res.json(response.data);
    } catch (error) {
        // console.error('Error posting to external URL:', error.response ? error.response.data : error.message);
        res.status(500).json({
            errorDetails: error.response ? error.response.data : error.message
        });
    }
});

export default router;
