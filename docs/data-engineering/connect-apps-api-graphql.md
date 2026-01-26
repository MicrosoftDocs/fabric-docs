---
title: Connect applications to Fabric API for GraphQL
description: Learn how to find and copy your API endpoint so you can connect your applications to the API for GraphQL.
#customer intent: As a developer, I want to connect my application to the Fabric API for GraphQL so that I can query data efficiently.  
ms.reviewer: edlima
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom: sfi-image-nochange, freshness-kr
ms.search.form: Connecting applications to GraphQL
ms.date: 01/21/2026
---

# Connect applications to Fabric API for GraphQL

Connecting applications to Fabric's API for GraphQL enables your web, mobile, and backend applications to query Fabric data sources using a modern, efficient API. This integration requires proper authentication through Microsoft Entra ID and configuration of your application to call the GraphQL endpoint securely.

This article walks you through connecting a React application to Fabric GraphQL API by:
1. [Creating and configuring a Microsoft Entra app for authentication](#create-a-microsoft-entra-app)
1. [Setting up a sample GraphQL API in Fabric with data to query](#set-up-a-sample-graphql-api-for-application-access)
1. [Cloning and configuring a complete React application from GitHub](#clone-and-configure-the-react-application)
1. [Testing the authenticated connection](#test-the-application)

The tutorial uses React, but authentication concepts apply to any language. For samples in C#, Python, or other languages, see the [Microsoft Fabric Samples GitHub repository](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-engineering/GraphQL).

## Who needs to connect applications

Application connection setup is essential for:
- **Web and mobile developers** building applications that consume data from Fabric lakehouses and warehouses
- **Integration developers** connecting Fabric data to custom applications and automated workflows
- **Backend developers** creating services that integrate with Fabric's unified analytics platform
- **Data engineers** setting up automated data processing workflows that consume Fabric data via APIs

Use this guide when you need to authenticate and authorize applications to access your Fabric GraphQL APIs.

## Prerequisites

* **Development tools**: You need [Node.js](https://nodejs.org/) (LTS version) and [Visual Studio Code](https://code.visualstudio.com/) installed on your machine.

* Before connecting an application, ensure you have an API for GraphQL in Fabric. For more information, see [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md).

* The API for GraphQL requires applications to use Microsoft Entra for authentication. Register and configure your application to perform API calls against Fabric. For more information, see [Create a Microsoft Entra app in Azure](/rest/api/fabric/articles/get-started/create-entra-app).
  
* The authenticated credential (user principal, service principal, or managed identity) calling the API needs Execute permissions for the GraphQL API (Run Queries and Mutations option when adding direct access permissions). If using single sign-on (SSO) as the connectivity option in the API, ensure the credential has read or write permissions in the chosen data source. For more information, see [Connect to a data source and build your schema](get-started-api-graphql.md).

## Authentication and permissions summary

Access to the GraphQL API requires proper authentication and authorization at both the API level and the underlying data source level. You can authenticate using either a **user principal** (representing an individual user) or a **service principal** (representing an application or service). For data source connectivity, you can use **single sign-on (SSO)** where the caller's identity is passed through to the data source, or **saved credentials** where a pre-configured connection is used.

The following table summarizes the different supported authentication scenarios and the minimum required permissions for clients accessing the GraphQL API:

|API Caller | Data source connectivity | Required GraphQL API permissions|Required Data Source permissions|Microsoft Entra app scope|
|-------|--------|-------|--------|--------|
|User Principal (UPN)|Single sign-on (SSO)| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the UPN at the data source|*GraphQLApi.Execute.All*|
|Service Principal (SPN)|Single sign-on (SSO)| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the SPN at the data source|Not Applicable|
|User Principal (UPN)|Saved credentials| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the saved credential (connection) at the data source|*GraphQLApi.Execute.All*|
|Service Principal (SPN)|Saved credentials| *Run Queries and Mutations* at the API level|Appropriate Read/Write permissions granted to the SPN at the data source|Not Applicable|

## Create a Microsoft Entra app

Before your application can call the Fabric GraphQL API, you must register it in Microsoft Entra ID. This registration creates an identity for your application and defines what permissions it needs. The registration process generates a Client ID (application identifier) and establishes the authentication flow your app uses to obtain access tokens.

For React applications, you configure single-page application (SPA) settings that use the PKCE flow—a secure authentication method designed for browser-based apps where client secrets can't be safely stored.

1. Register an application using the steps described on [Quickstart: Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

1. The Microsoft Entra app **Application (client) ID** and **Directory (tenant) ID** values appear in the Summary box. Record these values because you need them when you [configure the React application](#clone-and-configure-the-react-application).

1. Configure API permissions so your application can access the Fabric GraphQL API. Under the *Manage* list, select **API permissions**, then **Add permission**.

1. Add the **PowerBI Service**, select **Delegated permissions**, and select **GraphQLApi.Execute.All** permissions. This permission allows your application to execute queries and mutations on behalf of the signed-in user. Confirm that admin consent isn't required.

1. Go back to the *Manage* list, select **Authentication** > **Add a platform** > **Single-page application**.

1. For local development purposes, add `http://localhost:3000` under **Redirect URIs** and confirm that the application is enabled for the [authorization code flow with Proof Key for Code Exchange (PKCE)](/azure/active-directory/develop/v2-oauth2-auth-code-flow). Select the **Configure** button to save your changes. If the application encounters an error related to cross-origin requests, add the **Mobile and desktop applications** platform in the previous step with the same redirect URI.

1. Back to **Authentication**, scroll down to **Advanced Settings** and, under **Allow public client flows**, select **Yes** for *Enable the following mobile and desktop flows*.

## Set up a sample GraphQL API for application access

With your Microsoft Entra app registered, you need a GraphQL API in Fabric to query. This section walks you through creating a sample API using Fabric's public holidays dataset. This gives you a working API to test authentication and data retrieval without needing to configure your own data sources.

The sample API exposes holiday data from a Lakehouse table, which your React application queries to display public holidays.

1. From the Fabric portal home page, select **Data Engineering** from the list of workloads.

1. In the Data Engineering experience, select **Use a sample**, and under **Lakehouse**, select **Public holidays** to automatically create a new Lakehouse with public holidays data.

    :::image type="content" source="media/connect-apps-api-graphql/sample-lakehouse.png" alt-text="Screenshot on selecting the sample data Lakehouse option." lightbox="media/connect-apps-api-graphql/sample-lakehouse.png":::

1. Follow the steps from [Create an API for GraphQL](get-started-api-graphql.md) to create a new GraphQL API and select the Lakehouse you created. Add the public holidays table so clients can access this data.

    :::image type="content" source="media/connect-apps-api-graphql/add-data-to-graphql.png" alt-text="Screenshot of adding the sample Lakehouse as GraphQL data source." lightbox="media/connect-apps-api-graphql/add-data-to-graphql.png":::

1. Before building the React application, verify that your API works correctly by testing it in the [API editor](api-graphql-editor.md). Use the following query—this is the same query your React application executes later:

   ```graphql
    query {
    publicholidays (filter: {countryRegionCode: {eq:"US"}, date: {gte: "2024-01-01T00:00:00.000Z", lte: "2024-12-31T00:00:00.000Z"}}) {
        items {
          countryOrRegion
          holidayName
          date
        }
      }
    }
   ```

1. Select **Copy endpoint** on the API item's toolbar.

    :::image type="content" source="media/connect-apps-api-graphql/copy-endpoint.png" alt-text="Screenshot of the toolbar options for an API item." lightbox="media/connect-apps-api-graphql/copy-endpoint.png":::

1. In the **Copy link** screen, select **Copy**.

    :::image type="content" source="media/connect-apps-api-graphql/copy-endpoint-link.png" alt-text="Screenshot of the Copy link dialog screen, showing where to select Copy." lightbox="media/connect-apps-api-graphql/copy-endpoint-link.png":::

1. Record the **Client ID** and **Tenant ID** from the Microsoft Entra app and the endpoint URI. You need these values when you [configure the React application](#clone-and-configure-the-react-application).

## Clone and configure the React application

Now that you have the Microsoft Entra app and GraphQL API set up, you can configure a React application to connect to them. The application uses Microsoft Authentication Library (MSAL) to handle authentication and makes GraphQL requests with Bearer tokens.

1. Clone the samples repository from GitHub:

   ```bash
   git clone https://github.com/microsoft/fabric-samples.git
   ```

1. Navigate to the React application folder:

   ```bash
   cd fabric-samples/docs-samples/data-engineering/GraphQL/React
   ```

   The folder contains a complete React application. You only need to edit `src/authConfig.js` to configure your specific endpoint and credentials.

1. Open the project in your code editor:

   ```bash
   code .
   ```

1. In your editor, navigate to the **`src`** folder and open **`authConfig.js`**.

1. Replace the following placeholder values with your specific details:

   * `Enter_the_GraphQL_Endpoint_Here` - Replace with your GraphQL API endpoint from [Set up a sample GraphQL API for application access](#set-up-a-sample-graphql-api-for-application-access)
   * `Enter_the_Application_Id_Here` - Replace with your **Application (client) ID** from [Create a Microsoft Entra app](#create-a-microsoft-entra-app)
   * `Enter_the_Tenant_Info_Here` - Replace with your **Directory (tenant) ID** from [Create a Microsoft Entra app](#create-a-microsoft-entra-app)

    > [!IMPORTANT]
    > In the same file, the `loginRequest` constant includes the scope `https://analysis.windows.net/powerbi/api/GraphQLApi.Execute.All`. This exact scope is required for accessing Fabric GraphQL APIs. Don't remove or modify this scope; otherwise, authentication fails.

1. Save the file.

1. In your terminal, navigate to the project root folder and run:
   ```bash
   npm install
   ```
   This installs all required dependencies.

## Test the application

With the application configured, run it locally to verify everything works correctly:

1. In your terminal, run:
   ```bash
   npm start
   ```
   This command starts the development server and opens the application in your browser.

1. Complete the authentication flow when the application loads at `http://localhost:3000`. Follow the sign-in steps described in the tutorial section [Call the API from the application](/entra/identity-platform/tutorial-single-page-app-react-prepare-spa?tabs=visual-studio-code).

1. After signing in successfully, select the **Query Fabric API for GraphQL Data** button. This triggers the authentication flow, acquires an access token, and executes the GraphQL query against your Fabric API.

    :::image type="content" source="media/connect-apps-api-graphql/test-react-app.png" alt-text="Screenshot of the React sample app after sign in." lightbox="media/connect-apps-api-graphql/test-react-app.png":::

1. If everything is configured correctly, the application displays public holidays in a table. This confirms that:
   - Your Microsoft Entra app has the correct permissions
   - The access token was successfully acquired
   - The GraphQL API authenticated the request
   - The query executed against the Lakehouse data

    :::image type="content" source="media/connect-apps-api-graphql/react-app-results.png" alt-text="Screenshot of the React sample app after receiving the GraphQL request." lightbox="media/connect-apps-api-graphql/react-app-results.png":::

## Other npm commands

Beyond `npm start` and `npm install`, you can use these common npm commands for different development scenarios:

* `npm run dev` - Alternative way to start the development server
* `npm run build` - Create an optimized production build of your application
* `npm run preview` - Test the production build locally before deploying
* `npm test` - Run automated tests to verify your code works correctly

## Related content

Now that you have a working application connected to your Fabric GraphQL API, explore these resources to build more sophisticated solutions:

* [Create an API for GraphQL in Fabric and add data](get-started-api-graphql.md) - Learn how to expose your own data sources
* [Query multiple data sources in Fabric API for GraphQL](multiple-data-sources-graphql.md) - Combine data from different sources in a single query
* [Fabric API for GraphQL editor](api-graphql-editor.md) - Test and develop queries interactively
* [Create a Microsoft Entra app in Azure](/rest/api/fabric/articles/get-started/create-entra-app) - Detailed guide for production app registration
* [Microsoft Fabric GraphQL samples](https://github.com/microsoft/fabric-samples/tree/main/docs-samples/data-engineering/GraphQL) - Browse samples in multiple languages
