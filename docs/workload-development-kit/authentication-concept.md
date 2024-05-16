---
title: Overview of Fabric extensibility authentication
description: This article describes how to use tokens to authenticate and validate for a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how to authenticate a customized Fabric workload so that I can create customized user experiences.
---

# Authentication overview

Fabric workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization.

All interactions between workloads and other Fabric or Azure components must be accompanied by proper authentication support for requests received or sent. Tokens sent out must be generated properly, and tokens received must be validated properly as well.  

It's recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It's also recommended to go over [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist).

## Flows

:::image type="content" source="./media/authentication-overview/authentication-diagram.png" alt-text="Screenshot showing the extensibility authentication flow.":::

### 1. From workload FE to workload BE

An example of such communication is any data plane API. This communication is done with a Subject token (Delegated token).

For information on how to acquire a token in the workload FE, read [Authentication API](./authentication-javascript-api.md). In addition, make sure you go over token validation in the [Backend authentication and authorization overview](./backend-authentication.md).

### 2. From Fabric BE to workload BE

An example of such communication is Create workload item. This communication is done with a SubjectAndApp token, which is a special token that includes an app token and a subject token combined (see [Backend authentication and authorization overview](./backend-authentication.md) to learn more about this token).

For this communication to work, the user using this communication must give consent to the Entra application.

### 3. From workload BE to Fabric BE

This is done with a SubjectAndApp for workload control APIs (for example, ResolveItemPermissions), or with a Subject token (for other Fabric APIs).

### 4. From workload BE to external services

An example of such communication is writing to a lakehouse file. This is done with Subject token or an App token, depending on the API.

If you plan on communicating with services using a Subject token, make sure you're familiar with [On behalf of flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

Refer to [Authentication tutorial](./authentication-tutorial.md) to setup your environment to work with authentication.

# How to work with tokens
1. Your frontend should ask for a token `extensionClient.auth.acquireAccessToken({});`, you can use this token to authenticate with your backend.
2. If you wish to access some resource, you should send your token to the BE and try to exchange it using OBO flow for that resourcce, you can also use the token recieved from control APIs (CRUD/Jobs) and try to exchange it for that resource.
3. If the exchange fails for consent reasons, you should notify your FE and call `extensionClient.auth.acquireAccessToken({additionalScopesToConsent:[resource]});` and try the proccess again.
4. If the exchange fails for MFA reasons, you should notify your FE along with the claim recieved when tying to exchange and call `extensionClient.auth.acquireAccessToken({claimsForConditionalAccessPolicy:claims});`
   
   See below example:  
   https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow#error-response-example

**Note**: The token you recieve when acquiring a token in the frontend is not related to additionalScopesToConsent you pass, meaning once the user consents you can use any token you recieved from `extensionClient.auth.acquireAccessToken` for your OBO flow.

# Authentication Frontend APIs
Fabric frontend offers a javascript API for Fabric workloads to acquire a token for their application in Microsoft Entra Id - before working with authentication JS API make sure you go over the [Setup](./Setup.md) documentation.

## API
`acquireAccessToken(params: AcquireAccessTokenParams): Promise<AccessToken>;`  
`export interface AcquireAccessTokenParams {`  
`    additionalScopesToConsent?: string[];`  
`    claimsForConditionalAccessPolicy?: string;`  
`}`

The API returns an AccessToken object which contains the token itself and an expiry date for the token.
To call the API in the Frontend sample - simply create a sample item and scroll down and click on "Navigate to Authentication page", from there you can click on "get access Token" and you will recieve a token back.
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/219cf870-56cd-4f94-bc8a-60961bd2df7b)

# Consents  
To understand why consents are required, please go over [User and admin consent in Microsoft Entra ID
](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/user-admin-consent-overview).  
**Please note that consents are required for CRUD/Jobs to work and to acquire tokens across tenants**.

## How do consents work in Fabric workloads?
To grant a consent for a specific application, Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application Id and asks for a token for the provided scopes (additionalScopesToConsent - see AcquireAccessTokenParams).
When asking for a token with the workload application for a specific scope, Microsoft entra Id will display a popup consent in case it's missing, and then redirect the popup window to the **redirect URI** configured in the application.

 Typically the redirect URI is in the same domain as the page that requested the token so the page can access the popup and close it.  
In our case it's not in the same domain since Fabric is requesting the token and the redirect URI of the workload is not in the Fabric domain, so when the consent dialog opens it needs to be closed manually after redirect - we don't use the code returned in the redirectUri hence we just auto-close it (when Microsoft Entra Id redirects the popup to the redirect URI it simply closes).  
You can see the code/configuration of the redirect Uri in [index.ts](../Frontend//src//index.ts) file.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [Setup](./Setup.md):  
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/bbed9d85-fb26-4db0-8997-6ba7263aa7a8)

We will see how to work with consents when we talk about AcquireAccessTokenParams.

### Another way to grant consents in the Home tenant (Optional)
To get a consent in the home tenant of the application, you can ask your tenant admin to grant a consent for the whole tenant using this url (Insert your tenant Id and the client Id):  
https://login.microsoftonline.com/{tenantId}/adminconsent?client_id={clientId}


## AcquireAccessTokenParams
When calling acquireAccessToken JS API, we can provide 2 parameters:  

* additionalScopesToConsent: Additional scopes to ask for a consent for, for example re-consent scenarios.
* claimsForConditionalAccessPolicy: Claims returned from AAD when OBO flows fail, for example OBO requires Multi Factor Authentication.

let's review these 2 parameters and see what to provide when calling acquireAccessToken.

## additionalScopesToConsent
Here's what to provide in additionalScopesToConsent when calling acquireAccessToken:
Scenario | 1. Acquiring a token to call the Workload BE | 2. Crud/JOBS operation fails | 3. OBO flow for scope 'https://analysis.windows.net/powerbi/api/Workspace.Read.All/' fails with consent required error 
--- | --- | --- | --- 
AdditionalScopesToConsent | null | ['.default'] | ['https://analysis.windows.net/powerbi/api/Workspace.Read.All'] 

1. Acquiring a token to call the BE Workload: when you want to acquire a token to call your BE workload, simply call acquireAccessToken without providing any additionalScopesToConsent.
    * If the user is in the home tenant of the application, the workload will be able to acquire a token without granting any consent.
    * If the user is in another tenant, he will need to grant consent (or have the admin of the tenant grant consent to the app) before the workload can recieve a token.

2. Crud/Jobs JS API fail: if these operations fail, the workload must ask for a token with ['.default'] as additionalScopesToConsent, this will trigger a consent for the dependencies of the application (the configured API Permissions in our APP (see [Setup](./Setup.md) for more info).

3. OBO flow for a specific scope fails with consent required error:
   ![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/b96ebb8c-0457-456d-9d07-b7a69dd56673)

If the OBO flow in the workload BE fails with consent required error for a specific scope/s, the workload backend must inform the frontend to call acquireAccessToken API with those scope/s.  

## claimsForConditionalAccessPolicy
This is used when facing OBO failures in the workload BE because of some conditional access policy has been configured on the tenant.
OBO failures because of conditional access policies return a string called "claims", this string should be sent to the workload FE where the FE should ask for a token and pass the claim as claimsForConditionalAccessPolicy.
see [Handling multi-factor auth (MFA), conditional access and incremental consent](https://learn.microsoft.com/en-us/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-c).

Refer to [AuthenticationService](../Backend/src/Services/AuthenticationService.cs) AddBearerClaimToResponse usage in the BE sample to see examples of responses when OBO operations fail due to consent missing or conditional access policy.


For a detailed explanation of the authentication process and implentation, please refer to [workload backend smaple example](./backend-authentication.md). It covers the purpose and usage of the `SubjectAndAppToken`, including its validation, the user context it provides, and its role in inter-service communication. The document also outlines the main authentication checks performed for the `SubjectAndAppToken`, such as validation and parsing of the authorization header value, Entra token properties validation, and `appToken` properties validation. It includes links to the relevant methods in the codebase for further reference. A sample `appToken` with its claims is also provided for better understanding.