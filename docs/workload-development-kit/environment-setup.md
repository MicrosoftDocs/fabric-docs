---
title: Set up your Microsoft Fabric development environment
description: Learn how to set up your Microsoft Fabric workload development kit environment so that you can start developing your workloads.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: how to
ms.custom:
ms.date: 05/21/2024
---

# Set up your environment

## Prerequisites

The following steps are required before getting started with workload development.

### [Git](https://git-scm.com/downloads)

A distributed version control system that we use to manage and track changes to our project.

### [npm (Node Package Manager)](https://www.npmjs.com/get-npm)

Default package manager for Node.js used to manage and share the packages that you use in your project.

### [Node.js](https://nodejs.org/en/download/)

An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. We'll use this to run our server-side JavaScript code.

### [Webpack](https://webpack.js.org/guides/installation/)

A static module bundler for modern JavaScript applications. It helps to bundle JavaScript files for usage in a browser.

### [Webpack CLI](https://webpack.js.org/api/cli/)

The command line interface for Webpack. This allows us to use Webpack from the command line.

### [DevGateway](https://www.microsoft.com/en-us/download/details.aspx?id=105993)

**In local mode only** is required to allow the workload backend, which is locally hosted, to communicate with the tenant. The workload operates on the developer's machine. Workload API calls from Fabric to the workload are channeled through Azure Relay, with the workload's side of the Azure Relay channel managed by the DevGateway command-line utility. Workload control API calls are made directly from the workload to Fabric, not requiring the Azure Relay channel. The DevGateway utility also manages the registration of the workload's local (development) instance with Fabric within a specific capacity context, making the workload accessible in all workspaces assigned to that capacity.

> [!NOTE]
> Terminating the DevGateway utility automatically removes the workload instance registration.

## Create your environment

Follow the stages below to create your environment.

### Workload environment authentication

Setting up workload access to Fabric tenant requires configuration of Microsoft Entra ID for your workload application. Microsoft Entra ID is necessary to ensure secure access and operation of your application's data plane API.

Key steps include:

1. **Adding scopes for data plane API**: These scopes represent groups of operations exposed by your data plane API. Four example scopes are provided in the backend sample, covering read and write operations for workload items and Lakehouse files.

1. **Preauthorizing the Fabric client application**: The Fabric client application needs to be preauthorized for the scopes you've defined. This ensures it can perform the necessary operations on your workload items and Lakehouse files.

1. **Generating a secret for your application**: This secret is used to secure your application and will be used when configuring the backend sample.

1. **Adding optional claim 'idtyp'**: This claim is added to the access token and is used for identity purposes.

These steps are required when setting up the workload, For a detailed guide on how to perform these steps, see [Authentication setup](./authentication-tutorial.md).

### Authentication JavaScript API

Fabric frontend offers a JavaScript API for Fabric workloads to acquire a token for their application in Microsoft Entra ID. Before working with the authentication JavaScript API, make sure you go over the [authentication JavaScript API](./authentication-javascript-api.md) documentation.

#### API

`acquireAccessToken(params: AcquireAccessTokenParams): Promise<AccessToken>;`  
`export interface AcquireAccessTokenParams {`  
`    additionalScopesToConsent?: string[];`  
`    claimsForConditionalAccessPolicy?: string;`  
`}`

The API returns an AccessToken object that contains the token itself and an expiry date for the token.

To call the API in the Frontend sample - simply create a sample item and scroll down and select **Navigate to Authentication page**, from there you can select **Get access Token** and you'll receive a token back.

:::image type="content" source="./media/environment-setup/javascript-api-authentication-get-token.png" alt-text="Screenshot showing getting token for JavaScript API authentication.":::

#### Consents  

To understand why consents are required, review [User and admin consent in Microsoft Entra ID](/entra/identity/enterprise-apps/user-admin-consent-overview).  

> [!NOTE]
> Consents are required for CRUD/Jobs to work and to acquire tokens across tenants.

#### How do consents work in Fabric workloads?

To grant a consent for a specific application, Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application ID and asks for a token for the provided scope (additionalScopesToConsent - see AcquireAccessTokenParams).

When asking for a token with the workload application for a specific scope, Microsoft Entra ID displays a popup consent in case it's missing, and then redirect the popup window to the **redirect URI** configured in the application.

Typically the redirect URI is in the same domain as the page that requested the token so the page can access the popup and close it.

In our case, it's not in the same domain since Fabric is requesting the token and the redirect URI of the workload isn't in the Fabric domain, so when the consent dialog opens, it needs to be closed manually after redirect - we don't use the code returned in the redirectUri, and hence we just autoclose it (when Microsoft Entra ID redirects the popup to the redirect URI, it closes).  

You can see the code/configuration of the redirect Uri in the index.ts (../Frontend//src//index.ts) file.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [the authentication set up](./authentication-tutorial.md):  

:::image type="content" source="./media/environment-setup/environment-setup-consent-popup.png" alt-text="Screenshot of the consent popup.":::

We'll see how to work with consents when we talk about AcquireAccessTokenParams.

#### Another way to grant consents in the home tenant (optional)

To get a consent in the home tenant of the application, you can ask your tenant admin to grant a consent for the whole tenant using this url (insert your tenant ID and the client ID):  

`https://login.microsoftonline.com/{tenantId}/adminconsent?client_id={clientId}`

#### AcquireAccessTokenParams

When calling acquireAccessToken JS API, we can provide two parameters:  

* additionalScopesToConsent: Additional scopes to ask for a consent for, for example reconsent scenarios.

* claimsForConditionalAccessPolicy: Claims returned from Microsoft Entry ID when OBO flows fail. For example, OBO requires multifactor authentication.

Let's review these two parameters and see what to provide when calling acquireAccessToken.

#### additionalScopesToConsent

Here's what to provide in additionalScopesToConsent when calling acquireAccessToken:

Scenario | 1. Acquiring a token to call the Workload BE | 2. Crud/JOBS operation fails | 3. OBO flow for scope 'https://analysis.windows.net/powerbi/api/Workspace.Read.All/' fails with consent required error 
--- | --- | --- | --- 
AdditionalScopesToConsent | null | ['.default'] | ['https://analysis.windows.net/powerbi/api/Workspace.Read.All'] 

1. Acquiring a token to call the backend workload: When you want to acquire a token to call your backend workload, call acquireAccessToken without providing any additionalScopesToConsent.
 
   * If the user is in the home tenant of the application, the workload will be able to acquire a token without granting any consent.

   * If the user is in another tenant, he'll need to grant consent (or have the admin of the tenant grant consent to the app) before the workload can receive a token.

2. Crud/Jobs JS API fail: If these operations fail, the workload must ask for a token with ['.default'] as additionalScopesToConsent. This triggers a consent for the dependencies of the application (the configured API Permissions in our APP. See the [authentication setup](./authentication-tutorial.md) for more info).

3. OBO flow for a specific scope fails with consent required error:

   :::image type="content" source="./media/environment-setup/obo-consent-required-error.png" alt-text="Screenshot showing OBO consent required error.":::

   If the OBO flow in the workload backend fails with a consent required error for a specific scope/s, the workload backend must inform the frontend to call acquireAccessToken API with those scope/s.  

#### claimsForConditionalAccessPolicy

This is used when facing OBO failures in the workload BE because of some conditional access policy that has been configured on the tenant.

OBO failures because of conditional access policies return a string called "claims". This string should be sent to the workload frontend where the frontend should ask for a token and pass the claim as claimsForConditionalAccessPolicy.

For more information, see [Handling multi-factor auth (MFA), conditional access, and incremental consent](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-c).

Refer to AuthenticationService (../Backend/src/Services/AuthenticationService.cs) AddBearerClaimToResponse usage in the backend sample to see examples of responses when OBO operations fail due to consent missing or conditional access policies.

### Web app (cloud mode only)

Cloud mode (in conjunction to local machine mode) workload deployment requires setting up a web app domain for the Frontend (FE) and Backend (BE). These must be subdomains of the resource ID with a maximum of one more segment. The reply URL host domain should be the same as the FE host domain. For more information, see [Creating and deploying the boilerplate backend web app](./azure-webapp-deployment-tutorial.md).

### Setting up a Fabric development tenant

In the context of executing the workload SDK sample and building a workload, it's recommended to employ a dedicated development tenant. This practice ensures an isolated environment, minimizing the risk of inadvertent disruptions or modifications to production systems. Moreover, it provides an additional layer of security, safeguarding production data from potential exposure or compromise. Adherence to this recommendation aligns with industry best practices and contributes to a robust, reliable, and secure development lifecycle.

#### Tenant setting and development settings

1. The Fabric admin's permission is required to be able to begin development and connect with your local machine to a Fabric capacity. Only developers with capacity admin permission can connect and register their workload on to a capacity. Frontend development doesn't require capacity admin permissions.

   To enable a user to begin development, include them in the **Capacity admins can develop additional workloads** tenant setting.

1. After the user has been granted permission in the previous step, **each** user can enable development mode for the development settings area under Fabric developer mode.

   :::image type="content" source="./media/environment-setup/environment-setup-devmode.png" alt-text="Screenshot of turning on Workloads Developer Mode.":::

## Related content

* [Quick start guide](quickstart-sample.md)