---
title: Overview of Fabric Workload Authentication Guidelines 
description: This article describes important concepts and guidelines when you're working with authentication in Microsoft Fabric workloads.
author: ramizsha
ms.author: rashahoc
ms.topic: best-practice
ms.date: 11/03/2024
#customer intent: As a developer, I want to understand what the best practices are for working with authentication to grant users the optimal experience.
---

# Overview of workload authentication guidelines in Microsoft Fabric

This article provides guidelines on how to work with authentication when you're building Microsoft Fabric workloads. It includes information about working with tokens and consents.

Before you begin, make sure you're familiar with the concepts in [Authentication overview](./authentication-concept.md) and [Authentication setup](./authentication-tutorial.md).

## Data plane and control plane APIs

* *Data plane APIs* are APIs that the workload backend exposes. The workload frontend can call them directly. For data plane APIs, the workload backend can decide on what APIs to expose.
* *Control plane APIs* are APIs that go through Fabric. The process starts with the workload frontend calling a JavaScript API, and it ends with Fabric calling the workload backend. An example of such an API is Create Item.  

  For control plane APIs, the workload must follow the contracts defined in the workload backend and implement those APIs.

## Expose an API tab on the workload's application in Microsoft Entra ID

On the **Expose an API** tab, you need to add scopes for control plane APIs and scopes for data plane APIs:

* The scopes added for control plane APIs should preauthorize the Fabric Client for Workloads application with application ID `d2450708-699c-41e3-8077-b0c8341509aa`. Those scopes are included in the token that the workload backend receives when Fabric calls it.

  You need to add at least one scope for the control plane API for the flow to work.
* The scopes added for data plane APIs should preauthorize Microsoft Power BI with application ID `871c010f-5e61-4fb1-83ac-98610a7e9110`. They're included in the token that the `acquireAccessToken` JavaScript API returns.

  For data plane APIs, you can use this tab to manage granular permissions for each API that your workload exposes. Ideally, you should add a set of scopes for each API that the workload backend exposes and validate that the received token includes those scopes when those APIs are called from the client. For example:

  * The workload exposes two APIs to the client, `ReadData` and `WriteData`.  
  * The workload exposes two data plane scopes, `data.read` and `data.write`.  
  * In the `ReadData` API, the workload validates that the `data.read` scope is included in the token before it continues with the flow. The same applies to `WriteData`.

## API permissions tab on the workload's application in Microsoft Entra ID

On the **API permissions** tab, you need to add all the scopes that your workload needs to exchange a token for. A mandatory scope to add is `Fabric.Extend` under the Power BI service. Requests to Fabric might fail without this scope.

## Working with tokens and consents

When you're working with data plane APIs, the workload frontend needs to acquire a token for calls to the workload backend.

The following sections describe how the workload frontend should use the [JavaScript API](./authentication-javascript-api.md) and [on-behalf-of (OBO) flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow) to acquire tokens for the workload and external services, and to work with consents.

### Step 1: Acquire a token

The workload starts with asking for a token by using the JavaScript API without providing any parameters. This call can result in two scenarios:

* The user sees a consent window of all the static dependencies (what's configured on the **API permissions** tab) that the workload configured. This scenario happens if the user isn't a part of the home tenant of the application, and the user didn't grant consent to Microsoft Graph for this application before.

* The user doesn't see a consent window. This scenario happens if the user already consented at least once to Microsoft Graph for this application, or if the user is a part of the application's home tenant.

In both scenarios, the workload shouldn't care whether or not the user gave full consent for all of the dependencies (and can't know at this point).
The received token has the workload backend audience and can be used to directly call the workload backend from the workload frontend.

### Step 2: Try to access external services

The workload might need to access services that require authentication. For that access, it needs to perform the [OBO flow](/entra/identity-platform/v2-oauth2-on-behalf-of-flow), where it exchanges the token that it received from its client or from Fabric to another service. The token exchange might fail because of lack of consent or some Microsoft Entra Conditional Access policy that's configured on the resource that the workload is trying to exchange the token for.

To solve this problem, it's the workload's responsibility to propagate the error to the client when working with direct calls between the frontend and the backend. It's also the workload's responsibility to propagate the error to the client when working with calls from Fabric by using the error propagation described in [Workload communication](./workload-communication.md).

After the workload propagates the error, it can call the `acquireAccessToken` JavaScript API to solve the consent or Conditional Access policy problem and retry the operation.

For data plane API failures, see [Handling multifactor authentication, Conditional Access, and incremental consent](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#handling-multi-factor-auth-mfa-conditional-access-and-incremental-consent). For control plane API failures, see [Workload communication](./workload-communication.md).

## Example scenarios

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

### Example 1

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

### Example 2

Let's assume that the workload backend needs to access OneLake on the Create Item API (call from Fabric to the workload):
  
1. The workload frontend calls the Create Item JavaScript API.
1. The workload backend receives a call from Fabric and extracts the delegated token and validates it.
1. The workload tries to exchange the token for `https://storage.azure.com/user_impersonation` but fails because the tenant administrator of the user-configured multifactor authentication needed to access Azure Storage (see [AADSTS error codes](/entra/identity-platform/reference-error-codes#aadsts-error-codes)).
1. The workload propagates the error alongside the claims returned in the error from Microsoft Entra ID to the client by using the error propagation described in [Workload communication](./workload-communication.md).
1. The workload frontend calls the `acquireAccessToken` JavaScript API and provides claims as `claimsForConditionalAccessPolicy`, where `claims` refers to the claims propagated from the workload backend:

   `workloadClient.auth.acquireAccessToken({claimsForConditionalAccessPolicy: claims})`

After that, the workload can retry the operation.

## Handling errors when requesting consents

Sometimes the user can't grant consent because of various errors. After a consent request, the response is returned to the redirect URI. In our example, this code is responsible for handling the response. (You can find it in the index.ts file.)

```
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
