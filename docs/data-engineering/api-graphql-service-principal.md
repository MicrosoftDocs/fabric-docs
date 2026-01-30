---
title: Use Service Principals with Fabric API for GraphQL
description: Learn how to use Service Principals to authenticate to the API for GraphQL.
#customer intent: As a developer, I want to authenticate to the Fabric API for GraphQL using a service principal so that I can securely access and manage data programmatically.
ms.reviewer: sngun
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.search.form: Connecting applications to GraphQL
ms.date: 01/21/2026
---

# Use service principals with Fabric API for GraphQL

Service principals enable non-interactive, programmatic authentication to Fabric API for GraphQL. Unlike user principals that require someone to sign in interactively, service principals use application credentials (client ID and secret) to authenticate automatically. This makes them ideal for backend services, automated workflows, CI/CD pipelines, and any application that runs without user interaction.

This guide walks you through creating a Microsoft Entra app registration, configuring it as a service principal, and granting it access to your Fabric GraphQL APIs. You'll learn how to obtain the credentials needed for authentication and test your setup with sample code.

> [!TIP]
> Want to see service principals in action? After completing this setup, try the tutorial [Connect AI Agents to Fabric API for GraphQL with a local Model Context Protocol (MCP) server](api-graphql-local-model-context-protocol.md). It demonstrates how to use service principal authentication to enable AI agents like GitHub Copilot to query your Fabric data using natural language.

## Who uses service principals

Service principal authentication is designed for:
- **Data engineers** building automated ETL processes and scheduled data operations that access Fabric lakehouses and warehouses
- **Backend developers** creating server-to-server applications that programmatically consume Fabric data
- **Fabric workspace admins** setting up unattended services and background processes for data access
- **DevOps engineers** implementing CI/CD pipelines that interact with Fabric data sources
- **Integration developers** creating automated workflows that require non-interactive Fabric data access

> [!NOTE]
> For interactive applications using user principals (like React or web apps), see [Connect applications to Fabric API for GraphQL](connect-apps-api-graphql.md) instead. This guide focuses on service principal (non-interactive) authentication.

## Prerequisites

Before setting up service principal authentication, ensure you have:

- A Microsoft Fabric workspace with admin permissions
- An existing API for GraphQL in your workspace. See [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).
- Permissions to create app registrations in Microsoft Entra ID
- Tenant admin access to enable service principal settings in Fabric (or ask your admin to enable this)

## Step 1: Create a Microsoft Entra app registration

Follow the complete guide at [Register a Microsoft Entra app and create a service principal](/entra/identity-platform/howto-create-service-principal-portal) to create your app registration.

**Key points for service principals:**
- **Skip** redirect URIs and authentication platforms (only needed for interactive apps)
- **Skip** API permissions and scopes (service principals don't use delegated permissions)
- **Do** create a client secret under **Certificates & secrets** with an appropriate expiration period

> [!IMPORTANT]
> Capture these three values during setup:
> - **Tenant ID**: Found in Microsoft Entra ID under **Overview** > **Tenant ID**
> - **Client ID**: Found in your App Registration under **Overview** > **Application (client) ID**
> - **Client Secret**: The secret value shown when you create a new client secret. Copy immediately—it's only displayed once.

## Step 2: Enable service principals in Fabric tenant settings

A Fabric tenant administrator must enable service principal usage:

1. In the Fabric portal, go to **Admin portal** > **Tenant settings**
1. Under **Developer settings**, enable **Service principals can use Fabric APIs**
1. Select **Apply**

This setting makes your app registration visible in Fabric for permissions assignment. For more information, see [Identity support](/rest/api/fabric/articles/identity-support#service-principal-tenant-setting).

## Step 3: Grant permissions in Fabric

Your service principal needs two levels of access:

### Option A: Individual API permissions (recommended for production)

1. In the Fabric portal, open the workspace containing your GraphQL API
1. Select the ellipsis (**...**) next to your API item
1. Select **Manage permissions**
1. Select **Add user**
1. Search for and select your app registration name
1. Select **Run Queries and Mutations** (grants Execute permission)
1. Select **Grant**

Additionally, ensure the service principal has appropriate read/write permissions to the underlying data source (Lakehouse, Data Warehouse, or SQL database).

### Option B: Workspace role (simpler for development/testing)

Add your app registration as a workspace member with the **Contributor** role. This grants access to both the GraphQL API and all data sources in the workspace.

1. In the Fabric portal, open your workspace
1. Select **Manage access**
1. Select **Add people or groups**
1. Search for your app registration name
1. Select the **Contributor** role
1. Select **Add**

:::image type="content" source="media/connect-apps-api-graphql/add-spn-permissions.png" alt-text="Screenshot of GraphQL API permissions." lightbox="media/connect-apps-api-graphql/add-spn-permissions.png":::

> [!NOTE]
> You don't assign Azure roles to your app registration in Microsoft Entra ID for this scenario. All permissions are managed within Fabric through API permissions or workspace roles.

## Test your service principal authentication

Once configured, test your service principal by retrieving an access token and calling your GraphQL API.

### Get an access token with Node.js

Install the `@azure/identity` package:

```bash
npm install @azure/identity
```

Create a file to retrieve your access token:

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

Save the file and run it:

```bash
node getToken.js
```

This retrieves an access token from Microsoft Entra ID.

### Call your GraphQL API with PowerShell

Use the token to query your GraphQL API:

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

### Call your GraphQL API with cURL

Use cURL to query your API:

```bash
curl -X POST <YOUR_GRAPHQL_API_ENDPOINT> \
-H "Authorization: <YOUR_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"query": "<YOUR_GRAPHQL_QUERY(in a single line)>"}'
```

### Complete Node.js example (token + API call)

Install dependencies:

```bash
npm install @azure/identity axios
```

Create a complete example that retrieves a token and calls your API:

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

Save and run:

```bash
node callGraphQL.js
```

## Troubleshooting

**App registration not visible in Fabric**
- Verify that **Service principals can use Fabric APIs** is enabled in tenant settings
- Wait a few minutes after enabling the setting for changes to propagate

**Authentication errors**
- Confirm your Tenant ID, Client ID, and Client Secret are correct
- Verify the client secret hasn't expired
- Ensure you're using the scope `https://api.fabric.microsoft.com/.default`

**Permission errors**
- Check that the service principal has Execute permission on the GraphQL API
- Verify the service principal has read/write access to the underlying data source
- Confirm the workspace role is Contributor or higher if using workspace-level permissions

## Related content

- [Create a Microsoft Entra app in Azure](/rest/api/fabric/articles/get-started/create-entra-app)
- Learn how to [create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).
- Discover how to [query multiple data sources in Fabric API for GraphQL](multiple-data-sources-graphql.md).
