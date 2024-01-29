---
title: Overview of Fabric extensibility authentication JavaScript API
description: Learn how to use JavaScript APIs to authenticate a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 01/29/2024
---

# Authentication Javascript API

Fabric frontend offers a Javascript API for Fabric workloads to acquire a token for their application in Microsoft Entra ID. Before working with authentication JS API, make sure you go over the [Setup](./Setup.md) documentation.

## API

```javascript
acquireAccessToken(params: AcquireAccessTokenParams): Promise<AccessToken>;  
export interface AcquireAccessTokenParams {
    additionalScopesToConsent?: string[];  
    claimsForConditionalAccessPolicy?: string;  
}
```

The API returns an AccessToken object that contains the token itself and an expiry date for the token.

To call the API in the Frontend sample, create a sample item and then scroll down and click on **Navigate to Authentication page**. From there you can click on **Get access token** and you'll receive a token back.

:::image type="content" source="./media/authentication-api/authentication.png" alt-text="Screenshot showing authentication section.":::

## Consents  

To understand why consents are required, please go over [User and admin consent in Microsoft Entra ID
](/entra/identity/enterprise-apps/user-admin-consent-overview).

> [!NOTE]
> Consents are required for CRUD/Jobs to work and to acquire tokens across tenants.

### How do consents work in Fabric workloads?

To grant a consent for a specific application, the Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application ID and asks for a token for the provided scopes (additionalScopesToConsent - see [AcquireAccessTokenParams](#acquireaccesstokenparams)).

When asking for a token with the workload application for a specific scope, Microsoft Entra ID displays a popup consent in case it's missing, and then redirects the popup window to the **redirect URI** configured in the application.

Typically the redirect URI is in the same domain as the page that requested the token, so the page can access the popup and close it.
  
In our case, it's not in the same domain since Fabric is requesting the token and the redirect URI of the workload is not in the Fabric domain. So when the consent dialog opens, it needs to be closed manually after redirect. We don't use the code returned in the redirectUri, hence we just auto-close it (when Microsoft Entra ID redirects the popup to the redirect URI it simply closes).
  
You can see the code/configuration of the redirect Uri in the [index.ts](../Frontend//src//index.ts) file.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [Setup](./Setup.md):

:::image type="content" source="./media/authentication-api/permissions-requested-dialog.png" alt-text="Screenshot of Permissions required dialog.":::

We'll see how to work with consents when we talk about [AcquireAccessTokenParams](#acquireaccesstokenparams).

### Another way to grant consents in the home tenant (optional)

To get a consent in the home tenant of the application, you can ask your tenant admin to grant a consent for the whole tenant using this a URL in this format (insert your own tenant ID and the client ID):

`https://login.microsoftonline.com/{tenantId}/adminconsent?client_id={clientId}`

## AcquireAccessTokenParams

When calling the acquireAccessToken JS API, we can provide two parameters:  

* *additionalScopesToConsent*: Additional scopes to ask for a consent for, for example re-consent scenarios.
* *claimsForConditionalAccessPolicy*: Claims returned from Entra ID when OBO flows fail, for example OBO requires Multi Factor Authentication.

Let's review these two parameters and see what to provide when calling acquireAccessToken.

### additionalScopesToConsent

Here's what to provide in additionalScopesToConsent when calling acquireAccessToken:

Scenario | 1. Acquiring a token to call the workload BE | 2. Crud/JOBS operation fails | 3. OBO flow for scope `https://analysis.windows.net/powerbi/api/Workspace.Read.All/` fails with a consent required error
--- | --- | --- | --- 
AdditionalScopesToConsent | null | ['.default'] | ['https://analysis.windows.net/powerbi/api/Workspace.Read.All'] 

1. Acquiring a token to call the BE Workload: When you want to acquire a token to call your BE workload, call acquireAccessToken without providing any additionalScopesToConsent.

    * If the user's in the home tenant of the application, the workload will be able to acquire a token without granting any consent.

    * If the user is in another tenant, they'll need to grant consent (or have the admin of the tenant grant consent to the app) before the workload can receive a token.

2. Crud/Jobs JS API fail: If these operations fail, the workload must ask for a token with ['.default'] as additionalScopesToConsent. This trigger's a consent for the dependencies of the application (the configured API Permissions in our app). For more information, see [Setup](./Setup.md).

3. OBO flow for a specific scope fails with consent required error:

    :::image type="content" source="./media/authentication-api/consent-required-error.png" alt-text="Screenshot of consent required error.":::

If the OBO flow in the workload BE fails with a consent required error for a specific scope/s, the workload backend must inform the frontend to call acquireAccessToken API with those scope/s.  

### claimsForConditionalAccessPolicy

This parameter is used when facing OBO failures in the workload BE because of some conditional access policy that has been configured on the tenant.

OBO failures because of conditional access policies return a string called "claims". This string should be sent to the workload FE where the FE should ask for a token and pass the claim as claimsForConditionalAccessPolicy. For more information, see [Handling multi-factor auth (MFA), conditional access and incremental consent](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-c).

Refer to [AuthenticationService](../Backend/src/Services/AuthenticationService.cs) AddBearerClaimToResponse usage in the BE sample to see examples of responses when OBO operations fail due to consent missing or conditional access policies.