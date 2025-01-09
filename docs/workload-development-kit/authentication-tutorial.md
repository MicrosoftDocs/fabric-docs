---
title: Fabric Workload Development Kit authentication setup
description: Learn how to set up authentication for a Microsoft Fabric customized workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 07/14/2024

#customer intent: As an Independent Software Vendor (ISV) or a developer, I want to learn how to set up the authorization for a customized Fabric workload.
---

# Set up an enterprise application

For your workload to work in Fabric, you need to set up an Azure enterprise application. This application is used to authenticate your workload against Azure.

## Prerequisites

* At least a [Cloud Application Administrator](/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) role.

## Step 1: Create a new enterprise application

To create a new enterprize application, follow these steps:

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to **Identity > Applications > App registrations** and select **New registration**.

3. Enter a display Name for your application.

4. In the *Supported account types* section, select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**.

5. Select **Register**.

## Step 2: Configure the redirect URI

The redirect URI is a URI that closes the page when you go to it. When users don't give consent to use your app, they'll be directed to the redirect URI. You can add several redirect URIs to your app.

To configure your enterprise application, follow these steps:

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to *Enterprize applications > All applications* and select your application.

3. From the *Manage* section, select **Single sign-on**.

4. In *Configure application properties*, select the **Go to application** link.

5. Select **Add a Redirect URI**.

6. From *Platform configurations* select **Add a platform**.

7. In the *Configure platforms* pane, select **Single-page application**.

8. In the *Configure single-page application* add a redirect URI to **Redirect URIs**. The [sample example](quickstart-sample.md#step-4-create-a-microsoft-entra-id-application) uses `http://localhost:60006/close` as the redirect URI.

9. Select **Configure**.

## Step 3: Verify that you have a multitenant app

To verify that your app is a multitenant app, follow these steps .

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to *Enterprize applications > All applications* and select your application.

3. From the *Manage* section, select **Single sign-on**.

4. In *Configure application properties*, select the **Go to application** link.

5. In your application, from the *Manage* section, select **Authentication**.

6. In the *Supported account types*, verify that *Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)* is selected. If it isn't, select it and then select **Save**.

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

2. Navigate to *Enterprize applications > All applications* and select your application.

3. From the *Manage* section, select **Single sign-on**.

4. In *Configure application properties*, select the **Go to application** link.

5. In your application, from the *Manage* section, select **Expose an API**.

6. Next to *Application ID URI*, select **Add**.

7. In the *Edit application ID URI* pane, add your application ID URI.

## Step 5: Add scopes

Your app requires [scopes](/entra/identity-platform/scopes-oidc) (also known as permissions) to work with Create, Read, Update, and Delete (CRUD) APIs.

  for workload items, and to perform other operations with jobs, [add a scope](/entra/identity-platform/quickstart-configure-app-expose-web-apis#add-a-scope). In addition, add two dedicated Fabric applications to the preauthorized applications for that scope to indicate that your API (the scope you created) trusts Fabric.

To add scopes to your app, follow these steps.

1. Sign into the [Microsoft Entra admin center](https://entra.microsoft.com).

2. Navigate to *Enterprize applications > All applications* and select your application.

3. From the *Manage* section, select **Single sign-on**.

4. In *Configure application properties*, select the **Go to application** link.

5. In your application, from the *Manage* section, select **Expose an API**.

6. In *Scopes defined by this API*, select **Add a scope**.




























```






  










### Add a scope for CRUD APIs and jobs

To work with Create, Read, Update, and Delete (CRUD) APIs for workload items, and to perform other operations with jobs, [add a scope](/entra/identity-platform/quickstart-configure-app-expose-web-apis#add-a-scope). In addition, add two dedicated Fabric applications to the preauthorized applications for that scope to indicate that your API (the scope you created) trusts Fabric.

To add a scope:

1. Under **Expose an API**, select **Add a scope**. Name the scope `FabricWorkloadControl` and enter the required details.

1. Under **Authorized client applications**, select **Add a client application**. Add `d2450708-699c-41e3-8077-b0c8341509aa` (the Fabric client for a workload application) and select your scope.

### Add scopes for the data plane API

Other scopes need to be registered to represent groups of operations that are exposed by the data plane API.

In the backend sample, we provide four examples. You can see the examples in [Backend/src/Constants/scopes.cs](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Constants/WorkloadScopes.cs).

The scopes are:

* `Item1.Read.All`: For reading workload items
* `Item1.ReadWrite.All`: For reading/writing workload items
* `FabricLakehouse.Read.All`: For reading lakehouse files
* `FabricLakehouse.ReadWrite.All`: For reading/writing lakehouse files

Preauthorize `871c010f-5e61-4fb1-83ac-98610a7e9110` (the Fabric client application) for these scopes.

You can find the application IDs of these apps under **Microsoft Power BI** and **Power BI Service** in [Application IDs of commonly used Microsoft applications](/troubleshoot/azure/entra/entra-id/governance/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications).  

Here's how the **Expose an API** section should look in your application. In this example, the ID URI is `api://localdevinstance/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/Fabric.WorkloadSample`.

:::image type="content" source="./media/authentication-tutorial/expose-api-section.png" alt-text="Screenshot showing how your Expose an API section should look." lightbox="./media/authentication-tutorial/expose-api-section.png":::

### Generate a secret for your application

Under **Certificates & secrets**, select the **Secrets** tab and add a secret. Enter any name you want to use, and then save it. Use this secret when you configure the [backend sample](extensibility-back-end.md).

:::image type="content" source="./media/authentication-tutorial/generate-secrets-dialog.png" alt-text="Screenshot of the generate secrets dialog.":::

### Add an idtyp optional claim

Under **Token configuration**, select **Add optional claim**. For **Token type**, select **Access**, and then select **idtyp**.

:::image type="content" source="./media/authentication-tutorial/add-claim-idtyp.png" alt-text="Screenshot showing adding claim idtyp." lightbox="./media/authentication-tutorial/add-claim-idtyp.png":::

### Add API permissions

Under **API permissions**, add the permissions you need for your application. For the backend sample, add Azure Storage user_impersonation (for OneLake APIs) and Power BI Service Workspace.Read.all (for workload control APIs):

:::image type="content" source="./media/authentication-tutorial/add-api-permissions.png" alt-text="Screenshot showing adding API permissions." lightbox="./media/authentication-tutorial/add-api-permissions.png":::

To learn more about API permissions, see [Update an app's requested permissions in Microsoft Entra ID](/entra/identity-platform/howto-update-permissions).

### Set your application to work with auth token v1

Under **Manifest**, make sure that `accessTokenAcceptedVersion` is set either to `null` or to `1`.

## Configure your application in Microsoft Entra ID by using a script

For a streamlined setup of your application in Microsoft Entra ID, you can use an automated PowerShell script (optional).

1. **Install the Azure CLI**: To begin, [install the Azure CLI for Windows](/cli/azure/).
1. **Execute the CreateDevAADApp.ps1 script**: Run the [CreateDevAADApp script](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Authentication/CreateDevAADApp.ps1). You're prompted to sign in by using the credentials of the user account under which you intend to create the application.
1. **Provide required information**: When prompted, enter the name to use for your application, the workload name (prefixed with *Org.*), and your tenant ID.

When the script runs successfully, it returns all the details that are required to configure your workload. It also provides a direct URL to your application and an administrative consent URL for tenant-wide application authorization.

### Example usage

To create an application named myWorkloadApp with the workload name Org.Myworkload for the specified tenant, run the following command in PowerShell:

```powershell
powershell .\CreateDevAADApp.ps1 -applicationName "myWorkloadApp" -workloadName "Org.Myworkload" -tenantId "bbbbcccc-1111-dddd-2222-eeee3333ffff"
```

This example demonstrates how to use the *CreateDevAADApp.ps1* script with command-line arguments to automate the application setup process. The provided tenant ID is an example only. Replace the example tenant ID with your actual tenant ID.

## Configure your workload (backend)

1. In the backend sample, go to the *src/appsettings.json* file in the [repository](https://go.microsoft.com/fwlink/?linkid=2272254) and configure the settings:

   * `PublisherTenantId`: The tenant ID of the publisher.
   * `ClientId`: Your application ID (you can find it in the Microsoft Entra ID overview).  
   * `ClientSecret`: The [secret you created](#generate-a-secret-for-your-application) when you configured the Microsoft Entra app.  
   * `Audience`: The [ID URI you configured](#configure-your-application-in-microsoft-entra-id-manually) in the Microsoft Entra app.  

1. Configure the *workloadManifest.xml* file. In the [repository](https://go.microsoft.com/fwlink/?linkid=2272254), go to the *src/Packages/manifest/files/WorkloadManifest.xml* file. Under `AADApp`, configure `AppId`, `redirectUri`, and `ResourceId` (the ID URI).

```xml
<AADApp>
    <AppId>YourApplicationId</AppId>
    <RedirectUri>YourRedirectUri</RedirectUri>
    <ResourceId>YourResourceId</ResourceId>
</AADApp>
```

## Configure the workload local manifest

> [!NOTE]
> This step applies only in a developer mode scenario.

After you configure your application, update the following configurations in the *.env.dev* configuration file that's located in the [Frontend folder](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/tree/main/Frontend):

```
"DEV_AAD_CONFIG_AUDIENCE": "", // The ID URI configured in your application for a developer scenario

"DEV_AAD_CONFIG_REDIRECT_URI": "http://localhost:60006/close", // Or the path you configured in index.ts

"DEV_AAD_CONFIG_APPID": "" // Your app ID
```

:::image type="content" source="./media/authentication-tutorial/configure-workload-env-dev.png" alt-text="Screenshot that shows the configuration of an .env.dev file.":::

## Related content

* Learn how to work with [authentication in workloads](./authentication-guidelines.md).
