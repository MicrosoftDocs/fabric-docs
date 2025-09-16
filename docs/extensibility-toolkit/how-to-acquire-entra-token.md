---
title: HowTo - Acquire a Microsoft Entra Token
description: Learn how to Acquire a Microsoft Entra Token that allows to access APIs
author: gsaurer
ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 09/04/2025
---
# Acquire a Microsoft Entra Token

With the Extensibility Toolkit, you can obtain a Microsoft Entra token directly within your frontend application, enabling secure access to any Entra-protected API. This capability allows you to deeply integrate with Microsoft Fabric services — for example, you can read and store data in OneLake, create and interact with other Fabric items, or use Spark as a processing engine via the Livy APIs. For more information, see the [Microsoft Entra documentation](/entra/), [OneLake documentation](../onelake/onelake-overview.md), [Fabric REST APIs](/rest/api/fabric/), and [Spark in Fabric](../data-engineering/how-to-use-notebook.md).

An example of how to acquire a Token with the right scope and make a call to the API can be found in the [ApiAuthenticationFrontend.tsx](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/app/components/ClientSDKPlayground/ApiAuthenticationFrontend.tsx) file. `sendWorkloadServerRequest`shows a generic method to parse the token for Fabric API calls.

## callAuthAcquireFrontendAccessToken  

This method, which provides you with the ability to get a Microsoft Entra Token for your FE application for specific scopes.  

```typescript
function callAuthAcquireFrontendAccess(workloadClient, scopes) {
    callAuthAcquireFrontendAccessToken(workloadClient, scopes)
      .then(result => setToken(result.token))
      .catch((errorResult) => {
          setToken(null);
          console.error("Error acquiring token:", errorResult);
          switch (errorResult.error) {
              case WorkloadAuthError.WorkloadConfigError:
                  setAcquireTokenError("Workload config error - make sure that you have added the right configuration for your AAD app!");
                  break;
              case WorkloadAuthError.UserInteractionFailedError:
                  setAcquireTokenError("User interaction failed!");
                  break;
              case WorkloadAuthError.UnsupportedError:
                  setAcquireTokenError("Authentication is not supported in this environment!");
                  break;
              default:
                  setAcquireTokenError("Failed to fetch token");
          }
      }
}
```

## sendWorkloadServerRequest  

Demonstrates how to use the token to access a Microsoft Entra secured API.

```typescript
function sendWorkloadServerRequest(url: string, token: string, httpMethod: string, requestBody?: string): Promise<string> {
    if (url.length == 0) {
        return Promise.resolve('Please provide a valid url');
    }
    if (httpMethod == 'PUT') {
        return fetch(url, { method: httpMethod, body: requestBody, headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } }).then(response => response.text());
    }
    return fetch(url, { method: httpMethod, headers: { 'Authorization': 'Bearer ' + token } }).then(response => response.text());
}
```

We also implemented [Public Fabric API wrappers](./how-to-access-fabric-apis.md) to make it easier for you to interact with Fabric directly. The same method described can also be used to connect to your Microsoft Entra Secured APIs.
