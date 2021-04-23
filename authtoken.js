// Dependencies
const fs = require('fs');
const jwt = require('jwt-simple');
const axios = require('axios');
// Environment variables
require('dotenv').config();

// Generate claim (JWT payload)
const ISS = process.env.SF_CONSUMER_KEY; // Consumer key of SF Connect App
const AUD = process.env.AUD_URL; // https://test.salesforce.com if in Sandbox else https://login.salesforce.com
const SUB = process.env.SF_USER; // SF User with permissions to use connected app

// Arbitrary expiration date; will be superceded by the org's session timeout policy, 4-24 hours of inactivity depending on configuration.
// Flow will need to be configured to refresh the access token whenever a request fails due to session timeout
const today = new Date();
const exp = Math.floor(today.setFullYear(today.getFullYear() + 1) / 1000);

const claim = {
    iss: ISS,
    sub: SUB,
    aud: AUD,
    exp: exp
}

// Sign and encode JWT using the key to the certificate uploaded to the connected app
const CERT = fs.readFileSync('./certificates/key.pem', 'utf8');
const token = jwt.encode(claim, CERT, 'RS256'); //Encryption method must be "RS256"

// Salesforce's oauth2 endpoint and POST request body
const authURL = `${AUD}/services/oauth2/token`;
const data = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`

const authResponse = async () => {
    try {
        // Send POST request to oauth2 endpoint with body to receive access token
        const response = await axios.post(authURL, data);

        // Access token should be saved to include in SF REST requests (see ./restcall.js)
        const accessToken = response.data.access_token;
        const scope = response.data.scope;
        const instanceUrl = response.data.instance_url;
        console.log(
            `
            Access Token: ${accessToken}
            Scope: ${scope}
            Instance URL: ${instanceUrl}
            `
        );
        return response;
    } catch (err) {
        console.error(err)
    }
}
authResponse()