const axios = require('axios')
require('dotenv').config();

// Auth token generated using JWT Oauth2 flow (See ./authtoken.js)
// This will have been saved in memory perhaps (not ENV, this is just for the sample code)
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Instance URL of SF connected app
const INSTANCE_URL = process.env.SF_INSTANCE_URL;

// Authorization header
const config = {
    headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
}

// Sample query and REST Endpoint
// For more information, https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/using_resources_working_with_records.htm
const query = 'SELECT+name+from+Account'
const requestURL = `${INSTANCE_URL}/services/data/v20.0/query/?q=${query}`;

const getAccounts = async () => {
    try {
        // Make request to REST endpoint, including auth header
        const request = await axios.get(requestURL, config);
        console.log(request.data) 
        return request
    } catch (err) {
        console.error(err)
    }
}

getAccounts()