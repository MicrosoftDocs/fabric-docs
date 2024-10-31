
# Workload authentication guidelines & deep dive 

Before we get familiar with guidelines on how to work with authentication when building workloads, please make sure you went over [Authentication overview](https://learn.microsoft.com/en-us/fabric/workload-development-kit/authentication-concept) & [Authentication setup](https://learn.microsoft.com/en-us/fabric/workload-development-kit/authentication-tutorial). 

 

### data plane and control plane APIs 

Data plane APIs are APIs that the workload backend exposes, and the workload frontend can call them directly. 

For data plane APIs - the workload backend can decide on what APIs to expose. 

Control plane APIs are APIs that go through Fabric, it starts with the workload frontend calling a JS API and it ends with Fabric calling the workload backend. 

An example of such an API is create item. 

For control plane APIs – the workload must follow the contracts defined in the workload backend and implement those APIs. 

 

###  "Expose an API" tab on the workload’s application 

In this tab, you will need to add scopes for control plane APIs and scopes for data plane APIs: 

* The scopes added for control plane APIs should preauthorize "d2450708-699c-41e3-8077-b0c8341509aa", those scopes will be included in the token that's received when Fabric calls the workload backend. 

You need to add at least one for control plane API for the flow to work. 

* The scopes added for data plane APIs should preauthorize "871c010f-5e61-4fb1-83ac-98610a7e9110" and will be included in the token that's returned in the acquireAccessToken javascript API. 

 

For data plane APIs, ideally you should add a set of scopes for each API the workload backend exposes and validate that the token received includes those scopes when those APIs are called from the client.   

For example: If my workload exposes 2 APIs to the client "ReadData" & "WriteData", the workload can expose 2 data plane scopes "data.read" & "data.write", and in "ReadData" API the workload will validate that "data.read" scope is included in the token before continuing with the flow - the same applies to "WriteData". 

 

### "API permissons" tab on the workload’s application 

In this tab, you will need to add all the scopes your workload will need to exchange a token for.   

Another scope needed is "Fabric.Extend" under power bi service. 

 

## Working with tokens & consents 

Here's how the workload frontend should use the JavaScript API / OBO flows to acquire tokens for the workload / external services and work with consents: 

 

### Step 1: Acquiring a token 

The workload will start with asking for a token using the JavaScript API without providing any parameters, this may result in 2 scenarios: 

1. The user will see a consent window of all the static dependencies the workload has configured, this will happen if the user is not a part of the home tenant of the application and they did not grant consent to this application before. 

2. The user will not see a consent window, this will happen if the user has already consented at least once for the application or if the user is a part of the application's home tenant. 

 

In both scenarios the workload should not care whether the user gave full consent for all of the dependencies or not (and cannot know at this point). 

The token received will have the workload backend audience and can be used to directly call the workload backend from the workload frontend. 

 

### Step 2: Trying to access external services 

The workload may need to access services that require authentication, for that it will need to perform the OBO flow (see [Microsoft identity platform and OAuth 2.0 On-Behalf-Of flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow)) where it exchanges the token it received from its client or from Fabric to another service. 

The token exchange may fail as a result of lack of consent or some conditional access policy that's configured on the resource that the workload is trying to exchange the token for. 

To solve this, it is the workload's responsibility to propagate the error to the client when working with direct calls between the frontend and the backend, and it is also its responsibility to propagate the error to the client when working with calls from Fabric using the error propagation described here. (attach link to error propagation). 

After propagating the error, the workload can call the acquireAccessToken JS API to solve the consent / conditional access policy issue and retry the operation. 

 

### Examples of different scenarios 

Let's say we are building a workload that needs to access 3 Fabric APIs: 

1. List Workspaces: `GET https://api.fabric.microsoft.com/v1/workspaces` 

2. Create a warehouse: `POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/warehouses` 

3. Write to Lakehouse file : `PUT https://onelake.dfs.fabric.microsoft.com/{filePath}?resource=file` 

 

To be able to work with those APIs we will need to exchange tokens for the following scopes: 

1. For List Workspaces we need `https://analysis.windows.net/powerbi/api/Workspace.Read.All` or `https://analysis.windows.net/powerbi/api/Workspace.ReadWrite.All`. 

2. For creating a warehouse we need `https://analysis.windows.net/powerbi/api/Warehouse.ReadWrite.All` or `https://analysis.windows.net/powerbi/api/Item.ReadWrite.All`. 

3. To be able to write to a Lakehouse file, we need `https://storage.azure.com/user_impersonation` 

 

So to start, we will add the required permissions to our application under API permissions. 

Let’s take a look at examples of different scenarios that the workload may encounter: 

 

#### Example 1 

Let's say the workload backend has a data plane API that gets the workspaces of the user and returns them to the client. 

* The workload frontend asks for a token using the JavaScript API. 

* The workload frontend calls the workload backend API to get the workspaces of the user and attaches the token in the request. 

* The workload backend validates the token and tries to exchange it for the required scope (let's say `https://analysis.windows.net/powerbi/api/Workspace.Read.All`). 

* The workload fails to exchange the token for the specified resource because the user did not consent for the application to access this resource (see [AADSTS error codes](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes#aadsts-error-codes)) 

* The workload backend propagates the error to the workload frontend specifying that it needs a consent for that resource, and the workload frontend will call acquireAccessToken javascript API and provide additionalScopesToConsent:   

`workloadClient.auth.acquireAccessToken({ 

        additionalScopesToConsent: ["https://analysis.windows.net/powerbi/api/Workspace.Read.All"]})` 

* Alternatively, the workload can decide to ask for a consent for all of its static dependencies that are configured on its application regardless whether the user has already granted consent to some of them or not, so it calls the javascript API and provide promptFullConsent:   

`workloadClient.auth.acquireAccessToken({promptFullConsent: true})`. 

 

After that the workload frontend can retry the operation.   

**Note**: If the token exchange still fails on a consent error it means that the user did not grant consent, the workload will need to handle such scenarios e.g. notify the user that this API requires consent and will not work without it. 

 

#### Example 2 

Let's say that the workload backend needs to access OneLake on create item API (call from Fabric to the workload). 

* The workload frontend calls the create item JavaScript API. 

* The workload backend will receive a call from Fabric and will extract the delegated token and validate it. 

* The workload will try to exchange the token for `https://storage.azure.com/user_impersonation` but fails because the tenant administrator of the user configured MFA needed to access Storage (see [AADSTS error codes](https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes#aadsts-error-codes)). 

* The workload will propagate the error alongside the claims returned in the error from Entra Id to the client using error propagation described [here](add the link to error propagation). 

* The workload frontend will call acquireAccessToken JavaScript API and provide "claims" as claimsForConditionalAccessPolicy where "claims" are the claims propagated from the workload backend:   

`workloadClient.auth.acquireAccessToken({claimsForConditionalAccessPolicy: claims})`. 

 

After that the workload can retry the operation. 

 

## Handling errors when requesting consents 

Sometimes the user will be unable to grant a consent because of various errors. 

When requesting consents, the response will be returned to the redirect URI, in our example, this is the code that handles the response (you can find it in index.ts file):   

     

 const redirectUriPath = '/close'; 

const url = new URL(window.location.href); 

if (url.pathname?.startsWith(redirectUriPath)) { 

    // Handle errors, Please refer to https://learn.microsoft.com/en-us/entra/identity-platform/reference-error-codes 

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

 

The workload frontend can extract the error code from the url and handle it accordingly, please note that in both scenarios (error & success) the workload SHOULD always close the window. 

 

 

 
