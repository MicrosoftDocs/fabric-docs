---
title: Overview of Fabric workload authentication JavaScript API
description: Learn how to use JavaScript APIs to authenticate a customized Fabric workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 05/21/2024
---

# Authentication JavaScript API

The Fabric front end offers a JavaScript API for Fabric workloads to acquire a token for their application in Microsoft Entra ID. This article describes this API. 

## API

```javascript
acquireAccessToken(params: AcquireAccessTokenParams): Promise<AccessToken>;  
export interface AcquireAccessTokenParams {
    additionalScopesToConsent?: string[];  
    claimsForConditionalAccessPolicy?: string;
    promptFullConsent?: boolean;
}
```

The API returns an AccessToken object that contains the token itself and an expiry date for the token.

To call the API in the Frontend sample, create a sample item and then scroll down and select **Navigate to Authentication page**. From there you can select **Get access token** to receive a token back.

:::image type="content" source="./media/authentication-api/authentication.png" alt-text="Screenshot showing authentication section.":::

## Consents  

To understand why consents are required, please go over [User and admin consent in Microsoft Entra ID](/entra/identity/enterprise-apps/user-admin-consent-overview).

> [!NOTE]
> Consents are required for CRUD/Jobs to work and to acquire tokens across tenants.

### How do consents work in Fabric workloads?

To grant a consent for a specific application, the Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application ID and asks for a token for the provided scopes (additionalScopesToConsent - see [AcquireAccessTokenParams](#acquireaccesstokenparams)).

When asking for a token with the workload application for a specific scope, Microsoft Entra ID displays a popup consent in case it's missing, and then redirects the popup window to the **redirect URI** configured in the application.

Typically the redirect URI is in the same domain as the page that requested the token, so the page can access the popup and close it.
  
In our case, it's not in the same domain, since Fabric is requesting the token and the redirect URI of the workload isn't in the Fabric domain. So when the consent dialog opens, it needs to be closed manually after redirect. We don't use the code returned in the redirectUri, hence we just autoclose it (when Microsoft Entra ID redirects the popup to the redirect URI it simply closes).
  
You can see the code/configuration of the redirect Uri in the [index.ts](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Frontend/src/index.ts) file.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [authentication setup](./authentication-tutorial.md):

:::image type="content" source="./media/authentication-api/permissions-requested-dialog.png" alt-text="Screenshot of Permissions required dialog.":::

### Another way to grant consents in the home tenant (optional)

To get a consent in the home tenant of the application, you can ask your tenant admin to grant a consent for the whole tenant using a URL in the following format (insert your own tenant ID and the client ID):

`https://login.microsoftonline.com/{tenantId}/adminconsent?client_id={clientId}`

## AcquireAccessTokenParams

When calling the acquireAccessToken JS API, we can provide three parameters:  

* *additionalScopesToConsent*: Other scopes to ask for a consent for, for example reconsent scenarios.
* *claimsForConditionalAccessPolicy*: Claims returned from Microsoft Entra ID when OBO flows fail, for example OBO requires multifactor authentication.
* *promptFullConsent*: Prompts a full consent window of the static dependencies of the workloads application.


### additionalScopesToConsent
If The workload frontend is asking for a token to use for calls to the workload backend, this parameter should be null.
Workload backend can fail to perform OBO on the token received because of a consent missing error, in that case the workload backend will need to propagate the error to the workload frontend and provide this parameter.

### claimsForConditionalAccessPolicy

This parameter is used when facing OBO failures in the workload BE because of some conditional access policy that has been configured on the tenant.

OBO failures because of conditional access policies return a string called "claims." This string should be sent to the workload FE where the FE should ask for a token and pass the claim as claimsForConditionalAccessPolicy. For more information, see [Handling multi-factor auth (MFA), conditional access, and incremental consent](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-c).

Refer to [AuthenticationService](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthenticationService.cs) AddBearerClaimToResponse usage in the BE sample to see examples of responses when OBO operations fail due to consent missing or conditional access policies.

**To learn more about this additionalScopesToConsent and claimsForConditionalAccessPolicy and see examples of usage, see [Workload authentication guidelines & deep dive](./authentication-guidelines.md).**

### promptFullConsent
When passed as true, a full consent of the static dependencies will pop for the user regardless whether it provided a consent previously or not.
An example usage for this parameter is to add a button to the UX where the user can use it to grant full consent to the workload.
