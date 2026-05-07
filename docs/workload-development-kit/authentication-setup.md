---
title: Working with authentication in the Workload Development Kit
description: Learn about authentication when building a Fabric workload.
author: billmath  
ms.author: billmath
ms.date: 05/07/2026
ms.topic: how-to
---

# Working with authentication in the Workload Development Kit

All interactions between workloads and other Fabric or Azure components must be accompanied by proper authentication support for requests received or sent. Tokens sent out must be generated properly, and tokens received must be validated properly as well.

Fabric workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization. It's recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It's also recommended to review [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist).

### Data plane and control plane APIs

* *Data plane APIs* are APIs that the workload backend exposes. The workload frontend can call them directly. For data plane APIs, the workload backend can decide on what APIs to expose.
* *Control plane APIs* are APIs that go through Fabric. The process starts with the workload frontend calling a JavaScript API, and it ends with Fabric calling the workload backend. An example of such an API is Create Item.

  For control plane APIs, the workload must follow the contracts defined in the workload backend and implement those APIs.

### Expose an API tab on the workload's application in Microsoft Entra ID

On the **Expose an API** tab, you need to add scopes for control plane APIs and scopes for data plane APIs:

* The scopes added for control plane APIs should preauthorize the Fabric Client for Workloads application with application ID `d2450708-699c-41e3-8077-b0c8341509aa`. Those scopes are included in the token that the workload backend receives when Fabric calls it.

  You need to add at least one scope for the control plane API for the flow to work.
* The scopes added for data plane APIs should preauthorize Microsoft Power BI with application ID `871c010f-5e61-4fb1-83ac-98610a7e9110`. They're included in the token that the `acquireAccessToken` JavaScript API returns.

  For data plane APIs, you can use this tab to manage granular permissions for each API that your workload exposes. Ideally, you should add a set of scopes for each API that the workload backend exposes and validate that the received token includes those scopes when those APIs are called from the client. For example:

  * The workload exposes two APIs to the client, `ReadData` and `WriteData`.
  * The workload exposes two data plane scopes, `data.read` and `data.write`.
  * In the `ReadData` API, the workload validates that the `data.read` scope is included in the token before it continues with the flow. The same applies to `WriteData`.

### API permissions tab on the workload's application in Microsoft Entra ID

On the **API permissions** tab, you need to add all the scopes that your workload needs to exchange a token for. A mandatory scope to add is `Fabric.Extend` under the Power BI service. Requests to Fabric might fail without this scope.

### Working with tokens and consents

When you're working with data plane APIs, the workload frontend needs to acquire a token for calls to the workload backend.

The workload frontend should use the JavaScript authentication API and [on-behalf-of (OBO) flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow) to acquire tokens for the workload and external services, and to work with consents.

#### Step 1: Acquire a token

The workload starts with asking for a token by using the JavaScript API without providing any parameters. This call can result in two scenarios:

* The user sees a consent window of all the static dependencies (what's configured on the **API permissions** tab) that the workload configured. This scenario happens if the user isn't a part of the home tenant of the application, and the user didn't grant consent to Microsoft Graph for this application before.

* The user doesn't see a consent window. This scenario happens if the user already consented at least once to Microsoft Graph for this application, or if the user is a part of the application's home tenant.

In both scenarios, the workload shouldn't care whether or not the user gave full consent for all of the dependencies (and can't know at this point).
The received token has the workload backend audience and can be used to directly call the workload backend from the workload frontend.

#### Step 2: Try to access external services

The workload might need to access services that require authentication. For that access, it needs to perform the [OBO flow](/entra/identity-platform/v2-oauth2-on-behalf-of-flow), where it exchanges the token that it received from its client or from Fabric to another service. The token exchange might fail because of lack of consent or some Microsoft Entra Conditional Access policy that's configured on the resource that the workload is trying to exchange the token for.

To solve this problem, it's the workload's responsibility to propagate the error to the client when working with direct calls between the frontend and the backend. It's also the workload's responsibility to propagate the error to the client when working with calls from Fabric by using the error propagation described in [Workload communication](./workload-communication.md).

After the workload propagates the error, it can call the `acquireAccessToken` JavaScript API to solve the consent or Conditional Access policy problem and retry the operation.

For data plane API failures, see [Handling multifactor authentication, Conditional Access, and incremental consent](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-conditional-access-and-incremental-consent). For control plane API failures, see [Workload communication](./workload-communication.md).

### Example scenarios

Let's take a look at a workload that needs to access three Fabric APIs:

* List workspaces: `GET https://api.fabric.microsoft.com/v1/workspaces`

* Create a warehouse: `POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/warehouses`

* Write to a lakehouse file: `PUT https://onelake.dfs.fabric.microsoft.com/{filePath}?resource=file`

To be able to work with those APIs, the workload backend needs to exchange tokens for the following scopes:

* For listing workspaces: `https://analysis.windows.net/powerbi/api/Workspace.Read.All` or `https://analysis.windows.net/powerbi/api/Workspace.ReadWrite.All`
* For creating a warehouse: `https://analysis.windows.net/powerbi/api/Warehouse.ReadWrite.All` or `https://analysis.windows.net/powerbi/api/Item.ReadWrite.All`
* For writing to a lakehouse file: `https://storage.azure.com/user_impersonation`

> [!NOTE]
> You can find scopes needed for each Fabric API in [this reference article](/rest/api/fabric/articles/using-fabric-apis).

The scopes mentioned earlier need to be configured on the workload application under **API permissions**.

Let's take a look at examples of scenarios that the workload might encounter.

#### Example 1

Let's assume that the workload backend has a data plane API that gets the workspaces of the user and returns them to the client:

1. The workload frontend asks for a token by using the JavaScript API.
1. The workload frontend calls the workload backend API to get the workspaces of the user and attaches the token in the request.
1. The workload backend validates the token and tries to exchange it for the required scope (let's say `https://analysis.windows.net/powerbi/api/Workspace.Read.All`).
1. The workload fails to exchange the token for the specified resource because the user didn't consent for the application to access this resource (see [AADSTS error codes](/entra/identity-platform/reference-error-codes#aadsts-error-codes)).
1. The workload backend propagates the error to the workload frontend by specifying that it needs consent for that resource. The workload frontend calls the `acquireAccessToken` JavaScript API and provides `additionalScopesToConsent`:

   `workloadClient.auth.acquireAccessToken({additionalScopesToConsent: ["https://analysis.windows.net/powerbi/api/Workspace.Read.All"]})`

   Alternatively, the workload can decide to ask for consent for all of its static dependencies that are configured on its application, so it calls the JavaScript API and provides `promptFullConsent`:

   `workloadClient.auth.acquireAccessToken({promptFullConsent: true})`.

This call prompts a consent window regardless of whether or not the user has consented to some of the dependencies. After that, the workload frontend can retry the operation.

> [!NOTE]
> If the token exchange still fails on a consent error, it means that the user didn't grant consent. The workload needs to handle such scenarios; for example, notify the user that this API requires consent and won't work without it.

#### Example 2

Let's assume that the workload backend needs to access OneLake on the Create Item API (call from Fabric to the workload):

1. The workload frontend calls the Create Item JavaScript API.
1. The workload backend receives a call from Fabric and extracts the delegated token and validates it.
1. The workload tries to exchange the token for `https://storage.azure.com/user_impersonation` but fails because the tenant administrator of the user-configured multifactor authentication needed to access Azure Storage (see [AADSTS error codes](/entra/identity-platform/reference-error-codes#aadsts-error-codes)).
1. The workload propagates the error alongside the claims returned in the error from Microsoft Entra ID to the client by using the error propagation described in [Workload communication](./workload-communication.md).
1. The workload frontend calls the `acquireAccessToken` JavaScript API and provides claims as `claimsForConditionalAccessPolicy`, where `claims` refers to the claims propagated from the workload backend:

   `workloadClient.auth.acquireAccessToken({claimsForConditionalAccessPolicy: claims})`

After that, the workload can retry the operation.

### Handling errors when requesting consents

Sometimes the user can't grant consent because of various errors. After a consent request, the response is returned to the redirect URI. In the following example, the code handles the response. (You can find it in the `index.ts` file.)

```typescript
const redirectUriPath = '/close';
const url = new URL(window.location.href);
if (url.pathname?.startsWith(redirectUriPath)) {
    // Handle errors, Please refer to https://learn.microsoft.com/entra/identity-platform/reference-error-codes
    if (url?.hash?.includes("error")) {
        // Handle missing service principal error
        if (url.hash.includes("AADSTS650052")) {
            printFormattedAADErrorMessage(url?.hash);
        // handle user declined the consent error
        } else  if (url.hash.includes("AADSTS65004")) {
            printFormattedAADErrorMessage(url?.hash);
        }
    }
    // Always close the window
    window.close();
}
```

The workload frontend can extract the error code from the URL and handle it accordingly.

> [!NOTE]
> In both scenarios (error and success), the workload must always close the window immediately, with no latency.

## Set up an Entra ID application

For your workload to work in Fabric, you need to register an application with the Microsoft identity platform, also known as Microsoft Entra ID. This application is used to authenticate your workload against Azure.

### Prerequisites

* At least a [Cloud Application Administrator](/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) role.

### Step 1: Register an Entra ID application

To create a new Entra ID application, follow these steps:

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to **Identity > Applications > App registrations** and select **New registration**.

3. Enter a display Name for your application.

4. In the *Supported account types* section, select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**.

5. Select **Register**.

### Step 2: Configure the redirect URI

You need to configure your redirect URI to a URI that closes the page immediately when navigating to it. For more information, see [Redirect URI (reply URL) outline and restrictions](/entra/identity-platform/reply-url).

To configure your Entra ID application, follow these steps:

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. Select **Add a Redirect URI**.

4. From Platform configurations,* select **Add a platform**.

5. In the *Configure platforms* pane, select **Single-page application**.

6. In the *Configure single-page application*, add a redirect URI to **Redirect URIs**. The [sample example](quickstart-sample.md#step-4-create-a-microsoft-entra-id-application) uses `http://localhost:60006/close` as the redirect URI.

9. Select **Configure**.

### Step 3: Verify that you have a multitenant app

To verify that your app is a multitenant app, follow these steps.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Authentication**.

4. In the *Supported account types*, verify that *Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)* is selected. If it isn't, select it and then select **Save**.

### Step 4: Enter an application ID URI

Create an application ID URI using this format: `api://localdevinstance/<tenant ID>/<workload name>/<(optional)subpath>`. The ID URI can't end with a slash.

* **Workload name** - The name of the workload you're developing. The workload name must be identical to the [WorkloadName](backend-manifest.md#workloadname-attribute) specified in the backend manifest, and start with `Org.`.
* **Tenant ID** - Your tenant ID. If you don't know what's your tenant ID, see [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).
* **Subpath** - (Optional) A string of English lower or upper case letters, numbers, and dashes. The subpath string can be up to 36 characters long.

Here are examples of valid and invalid URIs when the tenant ID  is *bbbbcccc-1111-dddd-2222-eeee3333ffff*, and the workload name is *Fabric.WorkloadSample* then:

* **Valid URIs**

   * api://localdevinstance/bbbbcccc-1111-dddd-2222-eeee3333ffff/Org.WorkloadSample
   * api://localdevinstance/bbbbcccc-1111-dddd-2222-eeee3333ffff/Org.WorkloadSample/abc

* **Invalid URIs**:

   * api://localdevinstance/bbbbcccc-1111-dddd-2222-eeee3333ffff/Org.WorkloadSample/af/
   * api://localdevinstance/bbbbcccc-1111-dddd-2222-eeee3333ffff/Org.WorkloadSample/af/a

To add an application ID URI to your app, follow these steps.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Expose an API**.

4. Next to *Application ID URI*, select **Add**.

5. In the *Edit application ID URI* pane, add your application ID URI.

### Step 5: Add scopes

You need to define [scopes](/entra/identity-platform/scopes-oidc) (also known as permissions) for your app. The scopes allow others to use your app's functionality. For example, the [workload sample](quickstart-sample.md) gives four examples of API permissions that other can use. You can see these mock permissions in [scopes.cs](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Constants/WorkloadScopes.cs):

* `Item1.Read.All` - For reading workload items

* `Item1.ReadWrite.All` - For reading and writing workload items

* `FabricLakehouse.Read.All` - For reading lakehouse files

* `FabricLakehouse.ReadWrite.All` - For reading and writing lakehouse files

To add scopes to your app, follow these steps.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Expose an API**.

4. In *Scopes defined by this API*, select **Add a scope**.

5. Select **Add a scope** and follow the instructions in [Add a scope](/entra/identity-platform/quickstart-configure-app-expose-web-apis#add-a-scope).

### Step 6: Add Client applications

Allow Fabric to request a token for your application without user consent.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Expose an API**.

4. In *Scopes defined by this API*, select **Add a scope**.

5. Select **Add a client application**.

6. Add the client applications listed below. You can find the application IDs of these apps in [Application IDs of commonly used Microsoft applications](/troubleshoot/azure/entra/entra-id/governance/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications). You need to add each client application on its own.

   * `d2450708-699c-41e3-8077-b0c8341509aa` - The Fabric client for backend operations.
   * `871c010f-5e61-4fb1-83ac-98610a7e9110` - The Fabric client for frontend operations.

### Step 7: Add API permissions

API permissions allow your app to use external service dependencies. To add API permissions to your app, follow the steps in [Add permissions to an application](/entra/identity-platform/howto-update-permissions#add-permissions-to-an-application).

### Step 8: Generate a secret for your application

To configure the [backend](extensibility-back-end.md), you need to configure a secret for your application.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Certificates & secrets**.

4. Select the *Client secretes* and then select **New client secret**.

5. In the *Add a client secret* pane, enter the following:
   * **Description** - The name you want to use as a secret.
   * **Expires** - Select the expiration date for the secret.

6. Select **Add**.

### Step 9: Add an idtyp optional claim

The `idtype` [claim](/entra/identity-platform/optional-claims-reference) signals that the token that the workload gets from Fabric is an app only token.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Token configuration**.

4. Select **Add optional claim**.

5. In the *Add optional claim* pane, for *Token type*, select **Access**.

6. In *Claim*, select **idtyp**.

7. Select **Add**.




## Authentication JavaScript API

The Fabric front end offers a JavaScript API for Fabric workloads to acquire a token for their application in Microsoft Entra ID. This article describes this API. 

### API

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

### Consents  

To understand why consents are required, please go over [User and admin consent in Microsoft Entra ID](/entra/identity/enterprise-apps/user-admin-consent-overview).

> [!NOTE]
> Consents are required for CRUD/Jobs to work and to acquire tokens across tenants.

#### How do consents work in Fabric workloads?

To grant a consent for a specific application, the Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application ID and asks for a token for the provided scopes (additionalScopesToConsent - see [AcquireAccessTokenParams](#acquireaccesstokenparams)).

When asking for a token with the workload application for a specific scope, Microsoft Entra ID displays a popup consent in case it's missing, and then redirects the popup window to the **redirect URI** configured in the application.

Typically the redirect URI is in the same domain as the page that requested the token, so the page can access the popup and close it.
  
In our case, it's not in the same domain, since Fabric is requesting the token and the redirect URI of the workload isn't in the Fabric domain. So when the consent dialog opens, it needs to be closed manually after redirect. We don't use the code returned in the redirectUri, hence we just autoclose it (when Microsoft Entra ID redirects the popup to the redirect URI it simply closes).
  
You can see the code/configuration of the redirect Uri in the [index.ts](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Frontend/src/index.ts) file.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [authentication setup](./authentication-tutorial.md):

:::image type="content" source="./media/authentication-api/permissions-requested-dialog.png" alt-text="Screenshot of Permissions required dialog.":::

#### Another way to grant consents in the home tenant (optional)

To get a consent in the home tenant of the application, you can ask your tenant admin to grant a consent for the whole tenant using a URL in the following format (insert your own tenant ID and the client ID):

`https://login.microsoftonline.com/{tenantId}/adminconsent?client_id={clientId}`

### AcquireAccessTokenParams

When calling the acquireAccessToken JS API, we can provide three parameters:  

* *additionalScopesToConsent*: Other scopes to ask for a consent for, for example reconsent scenarios.
* *claimsForConditionalAccessPolicy*: Claims returned from Microsoft Entra ID when OBO flows fail, for example OBO requires multifactor authentication.
* *promptFullConsent*: Prompts a full consent window of the static dependencies of the workloads application.


#### additionalScopesToConsent
If The workload frontend is asking for a token to use for calls to the workload backend, this parameter should be null.
Workload backend can fail to perform OBO on the token received because of a consent missing error, in that case the workload backend will need to propagate the error to the workload frontend and provide this parameter.

#### claimsForConditionalAccessPolicy

This parameter is used when facing OBO failures in the workload BE because of some conditional access policy that has been configured on the tenant.

OBO failures because of conditional access policies return a string called "claims." This string should be sent to the workload FE where the FE should ask for a token and pass the claim as claimsForConditionalAccessPolicy. For more information, see [Handling multi-factor auth (MFA), conditional access, and incremental consent](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-c).

Refer to [AuthenticationService](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthenticationService.cs) AddBearerClaimToResponse usage in the BE sample to see examples of responses when OBO operations fail due to consent missing or conditional access policies.

#### promptFullConsent
When passed as true, a full consent of the static dependencies will pop for the user regardless whether it provided a consent previously or not.
An example usage for this parameter is to add a button to the UX where the user can use it to grant full consent to the workload.
