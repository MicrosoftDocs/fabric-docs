---
title: Fabric Workload Development Kit backend authentication
description: Learn about building the backend authentication of a customized Fabric workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
---

# Backend authentication and authorization overview

The Fabric developer workload sample has the following authentication flows on the backend side.

## Authentication and authorization of requests from Fabric to the workload

### Authorization header structure

The authorization header uses a specific token format:

`SubjectAndAppToken1.0 subjectToken="delegated token", appToken="S2S token"`

This format includes two distinct tokens:

* `subjectToken`: A delegated token representing the user on whose behalf the operation is being performed.
* `appToken`: A token specific to the Fabric application.

The rationale behind using a dual-token header is threefold:

* **Validation**: The workload can verify that the request originated from Fabric by validating the `appToken`.

* **User Context**: The `subjectToken` provides a user context for the action being performed.

* **Inter-Service Communication**: The workload can acquire an On-Behalf-Of (OBO) token using the `subjectToken`, allowing it to call other services with a user token.

### Authentication

The main authentication checks performed for the SubjectAndAppToken are:

* **Validation and parsing of the authorization header value** is done in the [AuthenticateControlPlaneCall](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthenticationService.cs#L53) method. The token must start with the "SubjectAndAppToken1.0" prefix and include two tokens - `subjectToken` and `appToken`.

* **Entra token properties validation**: Both `subjectToken` and `appToken` are validated for common Microsoft Entra token properties in the [ValidateAadTokenCommon](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthenticationService.cs#L252) method. These properties include token signature, token lifetime, token audience (workload app audience), and token version (1.0) and issuer.

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

See [IAuthenticationService](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/IAuthenticationService.cs).

> [!NOTE]
> All the validations in our sample code are for version 1.0 tokens.

### Authorization

Once confirmed that the request originates from the Fabric service (via the `appToken`), Fabric verified that the user has the necessary permissions to perform the action, based on Fabric's permissions metadata.

## Authentication and authorization of requests from workload to Fabric

### Workload control requests

Workload control APIs are special Fabric APIs that support workloads with their Fabric item lifecycle management. These APIs use the same SubjectAndAppToken1.0 authorization header format.

`SubjectAndAppToken1.0 subjectToken="delegated token", appToken="S2S token"`

Calls coming from the workload, included following tokens:

* `subjectToken`: A user-delegated token (obtained through the OBO flow) representing the user on whose behalf the operation is being performed. Fabric verifies that the user has the required permissions to perform the needed action.

* `appToken`: A token specific to the workload application. Fabric checks that this token is from the Microsoft Entra app of the workload that the relevant Fabric item belongs to and that is on the workload publisher's tenant.

See the `ValidatePermissions` method in [AuthorizationHandler](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthorizationHandler.cs#L37).

### Public APIs

To call public Fabric APIs, the workload should acquire a standard Microsoft Entra OBO token with the relevant API scopes and pass it as a bearer token in the request's authorization header.

See [FabricExtensionController](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Controllers/FabricExtensionController.cs).

## Authentication and authorization of requests from workload FE to workload BE

### Authorization header

The authorization header in a request sent from the workload FE to the workload BE uses a standard bearer token.

### Authentication

The [AuthenticateControlPlaneCall](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthenticationService.cs#L53) method in the workload BE is responsible for validating the token. The primary checks performed are:

* **Token lifetime**: Ensures the token is within its valid usage period.

* **Signature**: Verifies the authenticity of the token.

* **Audience**: Checks that the token's audience matches the workload Microsoft Entra app.

* **Issuer**: Validates the issuer of the token.

* **Allowed scopes**: Validates the scopes that the token is permitted to access.

Authorization is achieved by invoking the [ValidatePermissions](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthorizationHandler.cs#L37) method. This method calls the `resolvePermissions` API in the Fabric workload-control endpoint for the relevant Fabric item and verifies that the user has the necessary permissions for the operation.

## Long-running operations - refresh Token

Authorization is achieved by invoking the [ValidatePermissions](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Services/AuthorizationHandler.cs#L37) method. This method calls the `resolvePermissions` API in the Fabric workload-control endpoint for the relevant Fabric item and verifies that the user has the necessary permissions for the operation.

If your workloads include long running operations, for example, as part of [JobScheduler](./monitoring-hub.md) you might run into a situation where the Token lifetime isn't sufficient. For more information about how to authenticate long running process, [Long-running OBO processes](/entra/msal/dotnet/acquiring-tokens/web-apps-apis/on-behalf-of-flow#long-running-obo-processes).
