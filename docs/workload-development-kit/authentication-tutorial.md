---
title: Authentication setup
description: Learn how to set up the authentication for a customized Microsoft Fabric workload.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 12/15/2024
---

# Authentication setup

In this article, learn how to work with authentication in Microsoft Fabric.

To authenticate a custom workload in Fabric, first you set up three component parts:

* [Microsoft Entra ID application](/power-bi/developer/visuals/entra-id-authentication)
* [Frontend sample](./extensibility-front-end.md)
* [Backend sample](./extensibility-back-end.md)

> [!NOTE]  
> To configure the authentication settings that are described in this article, you must have the Global Administrator role.

## Azure Storage provisioning

The authentication sample that's used in this article demonstrates how to store data in and read data from a lakehouse architecture. It requires generating tokens for the Azure Storage service in on-behalf-of (OBO) flows. To generate tokens, you must consent to using Azure Storage with your application. To consent, Azure Storage must first be provisioned in the tenant.

To verify that Azure Storage is provisioned in the tenant:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Go to **Microsoft Entra ID** > **Enterprise applications**.
1. In the search filters, select **Application type = All applications**. The application ID starts with `e406a681-f3d4-42a8-90b6-c2b029497af1`.

    :::image type="content" source="./media/authentication-tutorial/azure-storage-provisioning.png" alt-text="Screenshot showing Azure Storage provisioning in the Azure portal." lightbox="./media/authentication-tutorial/azure-storage-provisioning.png":::

If the Azure Storage application is shown in the search results, storage is already provisioned, and you can continue to the [next step](#configure-your-application-in-microsoft-entra-id-manually). Otherwise, a Global Administrator needs to configure the application.

To provision Azure Storage, open Windows PowerShell as administrator and run the following script:
  
```console
Install-Module az  
Import-Module az  
Connect-AzureAD  
New-AzureADServicePrincipal -AppId e406a681-f3d4-42a8-90b6-c2b029497af1
```

## Configure your application in Microsoft Entra ID manually

To authenticate a workload, the workload application must be registered in Microsoft Entra ID. If you don't have an application registered, [create a new application](/entra/identity-platform/quickstart-register-app#register-an-application). Then, complete the following steps.

1. Apply the following configurations to your application:

   1. Make the application a multitenant app.
   1. For dev applications, configure the redirect URI as `http://localhost:60006/close` with the single-page application (SPA) platform. This configuration is required to support Microsoft consent. You can add other redirect URIs.
  
   > [!NOTE]
   >
   >* The redirect URI should be a URI that simply closes the page when you go to it. The URI `http://localhost:60006/close` is already configured in the frontend sample. You can revise the redirect URI in [Frontend/src/index.ts](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Frontend/src/index.ts). If you change the URI, make sure that it matches the URI that's configured for your application.
   >* You can configure the redirect URI after you create the application. To change the redirect URI settings, go to **Authentication** > **Manage**.
   >* The redirect URL must return an HTML page that calls only to JavaScript `windows.close()`.

   :::image type="content" source="./media/authentication-tutorial/register-application.png" alt-text="Screenshot of the application registration UI." lightbox="./media/authentication-tutorial/register-application.png":::

1. Change the application ID URI for your application. Go to **Manage** > **Expose an API**, and edit the value for **Application ID URI** for your app.

   For a developer mode scenario, the application ID URI should start with `api://localdevinstance/<Workload publisher's tenant ID in lowercase (the tenant ID of the user used in Fabric to run the sample)>/<Name of your workload>` and an optional subpath at the end that starts with `/` (see the examples later in this section).

   Application ID URI parameters:

   * The workload name must be exactly as specified in the manifest.
   * The ID URI can't end with a slash (`/`).
   * The end of the ID URI can have an optional subpath identified by a string of up to 36 characters. It can contain only English lowercase and uppercase letters, numbers, and dashes.

   > [!TIP]
   > Get help finding [your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).

   For example, if the publisher's tenant ID is `aaaabbbb-0000-cccc-1111-dddd2222eeee` and the workload name is `Fabric.WorkloadSample`, then:


   * The following URIs *are* valid:

     * `api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample`
     * `api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/abc`

   * The following URIs *aren't* valid:

     * `api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/af/`
     * `api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample/af/a`
     * Any ID URI that doesn't start with `api://localdevinstance/aaaabbbb-0000-cccc-1111-dddd2222eeee/Fabric.WorkloadSample`

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
