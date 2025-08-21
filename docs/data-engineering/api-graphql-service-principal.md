---
title: Use Service Principals with Fabric API for GraphQL
description: Learn how to use Service Principals to authenticate to the API for GraphQL.
#customer intent: As a developer, I want to authenticate to the Fabric API for GraphQL using a service principal so that I can securely access and manage data programmatically.
ms.reviewer: sngun
ms.author: sngun
author: snehagunda
ms.topic: how-to
ms.custom: null
ms.search.form: Connecting applications to GraphQL
ms.date: 08/21/2025
---

# Use Service Principals with Fabric API for GraphQL

Follow the steps in the [connect applications](connect-apps-api-graphql.md) section to provide access to user principals. You can also access the GraphQL API with a service principal:


1. Follow the steps in [connect applications](connect-apps-api-graphql.md) to create a Microsoft Entra app, but keep in mind that scopes aren't needed for Service Principals. In the new app, add a client secret under **Certificates and Secrets**. For more information, see [Register a Microsoft Entra app and create a service principal](/entra/identity-platform/howto-create-service-principal-portal).


1. Ensure that tenant administrators enable the usage of service principals in Fabric. In the Tenant Admin portal, go to **Tenant Settings**. Under **Developer Settings** enable **Service Principals can use Fabric APIs**. With this setting enabled, the application is visible in the Fabric Portal for role or permissions assignment. You can find more information on [Identity support](/rest/api/fabric/articles/identity-support#service-principal-tenant-setting).


1. The service principal needs access to both the GraphQL API and the data source, more specifically *Execute* permission to the GraphQL API and read or write access required in the data source of choice accordingly. In the Fabric Portal, open the workspace and select the ellipsis next to API. Select *Manage permissions* for the API then *Add user*. Add the application and select *Run Queries and Mutations*, which provides the required *Execute* permissions to the service principal.  For testing purposes, the easiest way to implement the required permissions for both the API and data source is by adding the application as a workspace member with a contributor role where both the GraphQL API and data source items are located.


:::image type="content" source="media/connect-apps-api-graphql/add-spn-permissions.png" alt-text="Screenshot of GraphQL API permissions.":::


Because a service principal requires either a certificate or a client secret, it isn't supported by the Microsoft Authentication Library (MSAL) in single-page applications (SPAs) like the React app built in the last step. You can use a backend service properly secured with well defined authorization logic depending on your requirements and use cases.

Once your API is configured to be accessed by a Service Principal, you can test it locally using a simple Node.JS application in your local machine:

```javascript
const { ClientSecretCredential } = require('@azure/identity');

// Define your Microsoft Entra ID credentials
const tenantId = "<YOUR_TENANT_ID>";
const clientId = "<YOUR_CLIENT_ID>";
const clientSecret = "<YOUR_CLIENT_SECRET>"; // Service principal secret value

const scope = "https://api.fabric.microsoft.com/.default"; // The scope of the token to access Fabric

// Create a credential object with service principal details
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// Function to retrieve the token
async function getToken() {
    try {
        // Get the token for the specified scope
        const tokenResponse = await credential.getToken(scope);
        console.log("Access Token:", tokenResponse.token);
    } catch (err) {
        console.error("Error retrieving token:", err.message);
    }
}
```

Install the dependencies (`@azure/identity`) with your Node.js package manager of choice, modify the file with the required information, save it, and execute it (`node <filename.js>`). This retrieves a token from Microsoft Entra.

The token can then be used to invoke your GraphQL API using PowerShell by replacing the appropriate details with the **token** you retrieved, the **GraphQL query** you want to execute, and the **GraphQL API Endpoint**:

```powershell
$headers = @{
    Authorization = "Bearer <YOUR_TOKEN>"
    'Content-Type' = 'application/json'
}

$body = @{
    query = @"
    <YOUR_GRAPHQL_QUERY>
"@
}

# Make the POST request to the GraphQL API
$response = Invoke-RestMethod -Uri "<YOUR_GRAPHQL_API_ENDPOINT>" -Method POST -Headers $headers -Body ($body | ConvertTo-Json)

# Output the response
$response | ConvertTo-Json -Depth 10 

```

Alternatively, use cURL to achieve the same result:

```bash
curl -X POST <YOUR_GRAPHQL_API_ENDPOINT> \
-H "Authorization: <YOUR_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"query": "<YOUR_GRAPHQL_QUERY(in a single line)>"}'
```

For local testing, modify the Node.js code slightly with an extra dependency (`axios`) to retrieve the token and invoke the API in a single execution:

```javascript
const { ClientSecretCredential } = require('@azure/identity');
const axios = require('axios');

// Microsoft Entra ID credentials
const tenantId = "<YOUR_TENANT_ID>";
const clientId = "<YOUR_CLIENT_ID>";
const clientSecret = "<YOUR_CLIENT_SECRET>"; // Service principal secret value

// GraphQL API details
const graphqlApiUrl = "YOUR_GRAPHQL_API_ENDPOINT>";
const scope = "https://api.fabric.microsoft.com/.default"; // The scope to request the token for

// The GraphQL query
const graphqlQuery = {
  query: `
  <YOUR_GRAPHQL_QUERY>
  `
};

// Function to retrieve a token and call the GraphQL API
async function fetchGraphQLData() {
  try {
    // Step 1: Retrieve token using the ClientSecretCredential
    const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
    const tokenResponse = await credential.getToken(scope);
    const accessToken = tokenResponse.token;

    console.log("Access token retrieved!");

    // Step 2: Use the token to make a POST request to the GraphQL API
    const response = await axios.post(
      graphqlApiUrl,
      graphqlQuery,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Step 3: Output the GraphQL response data
    console.log("GraphQL API response:", JSON.stringify(response.data));
    
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Execute the function
fetchGraphQLData();
```

## Related content

- [Create a Microsoft Entra app in Azure](/rest/api/fabric/articles/get-started/create-entra-app)
- Learn how to [create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).
- Discover how to [query multiple data sources in Fabric API for GraphQL](multiple-data-sources-graphql.md).
