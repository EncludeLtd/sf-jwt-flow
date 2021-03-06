# Salesforce JWT Bearer Flow Example
This repository is meant to demonstrate how to obtain an access token using Salesforce's OAuth 2.0 JWT Bearer (Server-to-Server) Flow.

Code examples are written in JavaScript, but without the use of any library not likely available in all languages so that it might be easily implemented in any language. One possible exception is the [jwt-simple] library, used to create the signed JWT.

## Instructions

### Pre-requisites
  - [Nodejs]
  - [NPM]

### .env
Create a file ".env" in the root directory for the environment variables with the following variables
```
SF_CONSUMER_KEY={ Consumer key of SF Connect App }
AUD_URL={ https://test.salesforce.com -or- https://login.salesforce.com}
SF_INSTANCE_URL={ ex: https://your-org.lightning.force.com/ }
SF_USER={ Username of connected app authorized user }
ACCESS_TOKEN={ Access token returned from authtoken.js (Just for testing) } 
```

### Get Auth Token
```
npm install
node authtoken.js
```

### Make REST request
```
# Be sure to include the access token generated from authtoken.js
node restcall.js
```

## Sources and Additional Information
 - [Create Your Connected App Trailhead]
 - [OAuth 2.0 JWT Bearer Flow for Server-to-Server Integration]
 - [JWT Bearer Authentication: Salesforce and Node]
 - [REST API Developer Guide]

[Nodejs]: <https://nodejs.org/en/download/>
[NPM]: <https://www.npmjs.com/get-npm>
[Create Your Connected App Trailhead]: <https://trailhead.salesforce.com/en/content/learn/projects/build-a-connected-app-for-api-integration/create-a-connected-app>
[jwt-simple]: <https://www.npmjs.com/package/jwt-simple>
[JWT Bearer Authentication: Salesforce and Node]: <https://blog.deadlypenguin.com/2019/03/08/jwt-bearer-auth-salesforce-node/>
[REST API Developer Guide]: <https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_what_is_rest_api.htm>
[OAuth 2.0 JWT Bearer Flow for Server-to-Server Integration]: <https://help.salesforce.com/articleView?id=remoteaccess_oauth_jwt_flow.htm&type=5>
