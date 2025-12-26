---
title: Set up a Microsoft Entra ID application of your Workload Development Kit solution's
description: Learn how to set up a Microsoft Entra ID application for your workload development environment.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 02/05/2025

#customer intent: As an Independent Software Vendor (ISV) or a developer, I want to learn how to set up the authorization for a customized Fabric workload.
---

# Set up an Entra ID application

For your workload to work in Fabric, you need to register an application with the Microsoft identity platform, also known as Microsoft Entra ID. This application is used to authenticate your workload against Azure.

## Prerequisites

* At least a [Cloud Application Administrator](/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) role.

## Step 1: Register an Entra ID application

To create a new Entra ID application, follow these steps:

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to **Identity > Applications > App registrations** and select **New registration**.

3. Enter a display Name for your application.

4. In the *Supported account types* section, select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**.

5. Select **Register**.

## Step 2: Configure the redirect URI

You need to configure your redirect URI to a URI that closes the page immediately when navigating to it. For more information, see [Redirect URI (reply URL) outline and restrictions](/entra/identity-platform/reply-url).

To configure your Entra ID application, follow these steps:

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. Select **Add a Redirect URI**.

4. From Platform configurations,* select **Add a platform**.

5. In the *Configure platforms* pane, select **Single-page application**.

6. In the *Configure single-page application*, add a redirect URI to **Redirect URIs**. The [sample example](quickstart-sample.md#step-4-create-a-microsoft-entra-id-application) uses `http://localhost:60006/close` as the redirect URI.

9. Select **Configure**.

## Step 3: Verify that you have a multitenant app

To verify that your app is a multitenant app, follow these steps.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Authentication**.

4. In the *Supported account types*, verify that *Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)* is selected. If it isn't, select it and then select **Save**.

## Step 4: Enter an application ID URI

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

## Step 5: Add scopes

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

## Step 6: Add Client applications

Allow Fabric to request a token for your application without user consent.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Expose an API**.

4. In *Scopes defined by this API*, select **Add a scope**.

5. Select **Add a client application**.

6. Add the client applications listed below. You can find the application IDs of these apps in [Application IDs of commonly used Microsoft applications](/troubleshoot/azure/entra/entra-id/governance/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications). You need to add each client application on its own.

   * `d2450708-699c-41e3-8077-b0c8341509aa` - The Fabric client for backend operations.
   * `871c010f-5e61-4fb1-83ac-98610a7e9110` - The Fabric client for frontend operations.

## Step 7: Add API permissions

API permissions allow your app to use external service dependencies. To add API permissions to your app, follow the steps in [Add permissions to an application](/entra/identity-platform/howto-update-permissions#add-permissions-to-an-application).

## Step 8: Generate a secret for your application

To configure the [backend](extensibility-back-end.md), you need to configure a secret for your application.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Certificates & secrets**.

4. Select the *Client secretes* and then select **New client secret**.

5. In the *Add a client secret* pane, enter the following:
   * **Description** - The name you want to use as a secret.
   * **Expires** - Select the expiration date for the secret.

6. Select **Add**.

## Step 9: Add an idtyp optional claim

Te `idtype` [claim](/entra/identity-platform/optional-claims-reference) signals that the token that the workload gets from Fabric is an app only token.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to  *Applications > App registration* and select your application.

3. In your application, from the *Manage* section, select **Token configuration**.

4. Select **Add optional claim**.

5. In the *Add optional claim* pane, for *Token type*, select **Access**.

6. In *Claim*, select **idtyp**.

7. Select **Add**.

## Related content

* Learn how to work with [authentication in workloads](./authentication-guidelines.md).
