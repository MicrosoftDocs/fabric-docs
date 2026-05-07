---
title: Overview of Fabric Workload Development Kit authentication
description: This article describes how to use tokens to authenticate and validate for a customized Fabric workload.
ms.topic: concept-article
ms.custom: sfi-image-nochange
ms.date: 05/07/2026
#customer intent: As a developer, I want to understand how to authenticate a customized Fabric workload so that I can create customized user experiences.
---

# Authentication overview

Fabric workloads rely on integration with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization.

All interactions between workloads and other Fabric or Azure components must be accompanied by proper authentication support for requests received or sent. Tokens sent out must be generated properly, and tokens received must be validated properly as well.  

Authentication in the workload development context ensures that:

- **Identity is verified**: Every request between components proves who (or what service) is making the call.
- **Authorization is enforced**: Tokens carry scopes and claims that determine what actions the caller can perform.
- **Trust boundaries are maintained**: The dual-token (SubjectAndApp) pattern ensures both the user identity and the calling service identity are validated independently.

It's recommended that you become familiar with the [Microsoft identity platform](/entra/identity-platform/) before starting to work with Fabric workloads. It's also recommended to go over [Microsoft identity platform best practices and recommendations](/entra/identity-platform/identity-platform-integration-checklist).

## Flows

The following table summarizes the authentication flows between Fabric workload components:

| Communication path | Token type | Purpose |
|--------------------|-----------|---------|
| Workload FE → Workload BE | Subject token (delegated/bearer) | User-initiated data plane calls |
| Fabric BE → Workload BE | SubjectAndApp token | Lifecycle management (create, update, delete items) |
| Workload BE → Fabric BE | SubjectAndApp token (control APIs) or Subject token (public APIs) | Item permission resolution, calling Fabric services |
| Workload BE → External services | Subject token (OBO) or App token | Accessing Azure resources like Lakehouse, OneLake |

* From workload frontend to workload backend

   An example of such communication is any data plane API. This communication is done with a Subject token (Delegated token).

   For information on how to acquire a token in the workload FE, read [Authentication API](./authentication-javascript-api.md). In addition, make sure you go over token validation in the [Backend authentication and authorization overview](back-end-authentication.md).

* From Fabric backend to workload backend

   An example of such communication is Create workload item. This communication is done with a SubjectAndApp token, which is a special token that includes an app token and a subject token combined (see the [Backend authentication and authorization overview](back-end-authentication.md) to learn more about this token).

   For this communication to work, the user using this communication must give consent to the Microsoft Entra application.

* From workload backend to Fabric backend

   This is done with a SubjectAndApp token for workload control APIs (for example, ResolveItemPermissions), or with a Subject token (for other Fabric APIs).

   - **Workload control APIs** (for example, `ResolveItemPermissions`, `NotifyWorkloadItemStateChange`): Use the SubjectAndApp token format. The `appToken` proves the request comes from your registered workload; the `subjectToken` provides user context for permission checks.
   - **Public Fabric APIs** (for example, OneLake APIs, Power BI REST APIs): Use a standard OBO Subject token. Acquire this token by exchanging the user's delegated token via the [On-Behalf-Of flow](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

* From workload backend to external services

   An example of such communication is writing to a Lakehouse file. This is done with Subject token or an App token, depending on the API.

   If you plan on communicating with services using a Subject token, make sure you're familiar with [On behalf of flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

   Refer to [Set up workload authentication](./authentication-setup.md) to configure your environment to work with authentication.

## Authentication JavaScript API

Fabric front-end offers a JavaScript API for Fabric workloads to acquire a token for their application in Microsoft Entra ID. Before working with the authentication JavaScript API, make sure you go over the [authentication JavaScript API](./authentication-javascript-api.md) documentation.

### Consents  

To understand why consents are required, review [User and admin consent in Microsoft Entra ID](/entra/identity/enterprise-apps/user-admin-consent-overview).  

### How do consents work in Fabric workloads?

To grant a consent for a specific application, Fabric FE creates an [MSAL](https://www.npmjs.com/package/@azure/msal-browser) instance configured with the workload's application ID and asks for a token for the provided scope (additionalScopesToConsent - see [AcquireAccessTokenParams](./authentication-javascript-api.md#acquireaccesstokenparams)). 

When asking for a token with the workload application for a specific scope, Microsoft Entra ID displays a popup consent in case it's missing, and then redirect the popup window to the **redirect URI** configured in the application.

Typically the redirect URI is in the same domain as the page that requested the token so the page can access the popup and close it.

In our case, it's not in the same domain since Fabric is requesting the token and the redirect URI of the workload isn't in the Fabric domain, so when the consent dialog opens, it needs to be closed manually after redirect - we don't use the code returned in the redirectUri, and hence we just autoclose it (when Microsoft Entra ID redirects the popup to the redirect URI, it closes).  

You can see the code/configuration of the redirect Uri in the file *index.ts*. This file can be found in the [Microsoft-Fabric-workload-development-sample](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample), under the front-end folder.

Here's an example of a consent popup for our app "my workload app" and its dependencies (storage and Power BI) that we configured when going over [the authentication set up](./authentication-tutorial.md):  

:::image type="content" source="./media/authentication-concept/environment-setup-consent-popup.png" alt-text="Screenshot of the consent popup.":::

## Backend authentication and authorization overview

The Fabric developer workload sample has the following authentication flows on the backend side.

### Authentication and authorization of requests from Fabric to the workload

#### Authorization header structure

The authorization header uses a specific token format:

`SubjectAndAppToken1.0 subjectToken="delegated token", appToken="S2S token"`

This format includes two distinct tokens:

* `subjectToken`: A delegated token representing the user on whose behalf the operation is being performed.
* `appToken`: A token specific to the Fabric application.

The rationale behind using a dual-token header is threefold:

* **Validation**: The workload can verify that the request originated from Fabric by validating the `appToken`.

* **User Context**: The `subjectToken` provides a user context for the action being performed.

* **Inter-Service Communication**: The workload can acquire an On-Behalf-Of (OBO) token using the `subjectToken`, allowing it to call other services with a user token.

#### Authentication

The main authentication checks performed for the SubjectAndAppToken are:

* **Validation and parsing of the authorization header value** is done in the [AuthenticateControlPlaneCall](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthenticationService.cs#L53) method. The token must start with the "SubjectAndAppToken1.0" prefix and include two tokens - `subjectToken` and `appToken`.

* **Entra token properties validation**: Both `subjectToken` and `appToken` are validated for common Microsoft Entra token properties in the [ValidateAadTokenCommon](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthenticationService.cs#L252) method. These properties include token signature, token lifetime, token audience (workload app audience), and token version (1.0) and issuer.

* **appToken properties validation**: The `appToken` shouldn't have an `scp` claim but should have an `idtyp` claim with *app* as the value. We also check that `tid` claim in the workload publisher tenant ID.

    Sample appToken claims:

    ```json
    {
    "aud": "api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/123",
    "iss": "https://sts.windows.net/12345678-77f3-4fcc-bdaa-487b920cb7ee/",
    "iat": 1700047232,
    "nbf": 1700047232,
    "exp": 1700133932,
    "aio": "E2VgYLjBuv2l+c6cmm/iP/bnL2v+AQA=",
    "appid": "11112222-bbbb-3333-cccc-4444dddd5555"
    "appidacr": "2",
    "idp": "https://sts.windows.net/12345678-77f3-4fcc-bdaa-487b920cb7ee/",
    "idtyp": "app",
    "oid": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "rh": "0.ACgAGX-u-vN3zE-9qkh7kgy37hQbaU7-v2xFr59O_foS7VLZAAA.",
    "sub": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb",
    "tid": "bbbbcccc-1111-dddd-2222-eeee3333ffff",
    "uti": "5bgMXs3uMUSAHCruRjACAA",
    "ver": "1.0"
    }
    ```

* **subjectToken properties validation**: Ensure that the subjectToken includes an `scp` claim with the `FabricWorkloadControl` scope, that there's no `idtyp` claim present in the token, and that it has same `appid` as in the `appToken`.

    Sample subjectToken claims:

    ```json
    {
    "aud": "api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/123",
    "iss": "https://sts.windows.net/12345678-77f3-4fcc-bdaa-487b920cb7ee/",
    "iat": 1700050446,
    "nbf": 1700050446,
    "exp": 1700054558,
    "acr": "1",
    "aio": "ATQAy/8VAAAAUgWRMRnBo4VGHvrKRykUXOXBNKS1cHnBxLrYkZJJGSjAVyJGBecbLdSud1GUakER",
    "amr": [
        "pwd"
    ],
    "appid": "11112222-bbbb-3333-cccc-4444dddd5555"
    "appidacr": "2",
    "ipaddr": "46.117.19.50",
    "name": "john doe",
    "oid": "bbbbbbbb-1111-2222-3333-cccccccccccc",
    "rh": "0.ASgAGX-u-vN3zE-9qkh7kgy37hQbaU7-v2xFr59O_foS7VLZANQ.",
    "scp": "FabricWorkloadControl",
    "sub": "X0Wl85UA-uOmdkQz5MoT-hEgYZXDq9FYdS8g2bFUaZA",
    "tid": "bbbbcccc-1111-dddd-2222-eeee3333ffff",
    "unique_name": "user1@constso.com",
    "upn": "user1@constso.com",
    "uti": "_llZwmJoSUiHv-kw6tfDAA",
    "ver": "1.0"
    }
    ```

See [IAuthenticationService](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/IAuthenticationService.cs).

> [!NOTE]
> All the validations in our sample code are for version 1.0 tokens.

#### Authorization

Once confirmed that the request originates from the Fabric service (via the `appToken`), Fabric verified that the user has the necessary permissions to perform the action, based on Fabric's permissions metadata.

### Authentication and authorization of requests from workload to Fabric

#### Workload control requests

Workload control APIs are special Fabric APIs that support workloads with their Fabric item lifecycle management. These APIs use the same SubjectAndAppToken1.0 authorization header format.

`SubjectAndAppToken1.0 subjectToken="delegated token", appToken="S2S token"`

Calls coming from the workload, included following tokens:

* `subjectToken`: A user-delegated token (obtained through the OBO flow) representing the user on whose behalf the operation is being performed. Fabric verifies that the user has the required permissions to perform the needed action.

* `appToken`: A token specific to the workload application. Fabric checks that this token is from the Microsoft Entra app of the workload that the relevant Fabric item belongs to and that is on the workload publisher's tenant.

See the `ValidatePermissions` method in [AuthorizationHandler](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthorizationHandler.cs#L37).

#### Public APIs

To call public Fabric APIs, the workload should acquire a standard Microsoft Entra OBO token with the relevant API scopes and pass it as a bearer token in the request's authorization header.

See [FabricExtensionController](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Controllers/FabricExtensionController.cs).

### Authentication and authorization of requests from workload FE to workload BE

#### Authorization header

The authorization header in a request sent from the workload FE to the workload BE uses a standard bearer token.

#### Authentication

The [AuthenticateControlPlaneCall](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthenticationService.cs#L53) method in the workload BE is responsible for validating the token. The primary checks performed are:

* **Token lifetime**: Ensures the token is within its valid usage period.

* **Signature**: Verifies the authenticity of the token.

* **Audience**: Checks that the token's audience matches the workload Microsoft Entra app.

* **Issuer**: Validates the issuer of the token.

* **Allowed scopes**: Validates the scopes that the token is permitted to access.

Authorization is achieved by invoking the [ValidatePermissions](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthorizationHandler.cs#L37) method. This method calls the `resolvePermissions` API in the Fabric workload-control endpoint for the relevant Fabric item and verifies that the user has the necessary permissions for the operation.

### Common authentication errors

| Error | Cause | Resolution |
|-------|-------|------------|
| `401 Unauthorized` — Invalid signature | Token was tampered with or signing keys are stale | Ensure your token validation library refreshes signing keys from the Microsoft Entra discovery endpoint |
| `401 Unauthorized` — Token expired | Access token exceeded its lifetime (default: 60–90 minutes) | Implement token refresh logic; for long-running operations, use the [long-running OBO pattern](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#long-running-obo-processes) |
| `403 Forbidden` — Insufficient permissions | The token's scopes don't include required permissions | Verify your app registration includes the necessary API permissions and that admin consent was granted |
| `AADSTS65001` — Consent not granted | User hasn't consented to your workload application | Trigger the consent popup via the [authentication JavaScript API](./authentication-javascript-api.md) |
| `AADSTS700024` — Client assertion invalid | The `appToken` doesn't match the expected workload publisher tenant | Verify `tid` claim matches your publisher tenant ID in workload configuration |

### Long-running operations - refresh Token

Authorization is achieved by invoking the [ValidatePermissions](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/dotnet/src/Services/AuthorizationHandler.cs#L37) method. This method calls the `resolvePermissions` API in the Fabric workload-control endpoint for the relevant Fabric item and verifies that the user has the necessary permissions for the operation.

If your workloads include long running operations, for example, as part of [JobScheduler](./monitoring-hub.md) you might run into a situation where the Token lifetime isn't sufficient. For more information about how to authenticate long running process, [Long-running OBO processes](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#long-running-obo-processes).

> [!NOTE]
> Microsoft Entra access tokens have a default lifetime of 60–90 minutes (configurable via [token lifetime policies](/entra/identity-platform/configurable-token-lifetimes)). For workload operations that exceed this window — such as scheduled jobs or batch processing — you must implement the long-running OBO pattern to maintain valid authentication throughout the operation.

### Related content

* [Set up workload authentication](./authentication-setup.md)
* [Authentication JavaScript API](./authentication-javascript-api.md)
* [Backend authentication and authorization overview](./back-end-authentication.md)
* [Development Kit overview](./development-kit-overview.md)
* [Workload communication](./workload-communication.md)
* [Microsoft identity platform best practices](/entra/identity-platform/identity-platform-integration-checklist)