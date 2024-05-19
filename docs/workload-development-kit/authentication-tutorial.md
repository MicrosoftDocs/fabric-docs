---
title: Fabric extensibility authentication setup
description: Learn how to set up the authorization for a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
---

# Authentication setup

In order to be able to work with authentication, you need to setup its three component parts:

1. [Microsoft Entra ID Application](/power-bi/developer/visuals/entra-id-authentication) (formerly Azure AD App)
1. [Frontend sample](extensibility-front-end.md)
1. [Backend sample](extensibility-back-end.md)

To work with authentication in Fabric, follow this guide.

## Azure storage service provisioning

This sample demonstrates how to store and read data from and to lakehouses. This requires generating tokens for the Azure Storage service in OBO flows. To generate tokens, users need to consent to the application using Azure Storage. In order to consent, Azure Storage needs to be provisioned in the tenant.

To make sure Azure Storage is provisioned in the tenant:

1. Log into the [Azure portal](https://portal.azure.com)
1. Go to **Microsoft Entra ID** > **Enterprise applications**
1. In the filters, choose **application type = all aplications**. The application ID starts with e406a681-f3d4-42a8-90b6-c2b029497af1

    :::image type="content" source="./media/authentication-tutorial/azure-storage-provisioning.png" alt-text="Screenshot showing Azure Storage provisioning." lightbox="./media/authentication-tutorial/azure-storage-provisioning.png":::

If you see the Azure Storage application, it's already provisioned and you can continue to the [next step](#configure-your-application-in-microsoft-entra-id). If not, a tenant admin needs to provision it.

Ask your tenant admin to open **Windows PowerShell** as administrator and run the following script:
  
```console
Install-Module az  
Import-Module az  
Connect-AzureAD  
New-AzureADServicePrincipal -AppId e406a681-f3d4-42a8-90b6-c2b029497af1
```

## Configure your application in Microsoft Entra ID

To work with authentication, you need an application registered in Microsoft Entra ID. If you don't have an application registered, follow [this guide](/entra/identity-platform/quickstart-register-app#register-an-application) to create a new application.

1. Apply the following configurations to your application:

   * Make the application a multitenant app.
   * For dev applications, configure the redirect URI as `http://localhost:60006/close` with SPA platform. This configuration is required for our consent support. You can add other redirect URIs as desired.
  
   > [!NOTE]
   >
   >* The redirect URI should be a URI that simply closes the page when navigating to it. The URI `http://localhost:60006/close` is already configured in the frontend sample and you can change it in [Frontend/src/index.ts](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/src/index.ts) (If you change it, make sure it matches the one configured for your application).
   >* You can configure the redirect URI after creating the application from the **Manage** menu under **Authentication**.

   :::image type="content" source="./media/authentication-tutorial/register-application.png" alt-text="Screenshot of application registration UI." lightbox="./media/authentication-tutorial/register-application.png":::

1. Change the *Application ID URI* for your application. Go to **Manage** > **Expose an API**, and edit the Application ID URI for your app:

   For the development scenario, the Application ID URI should start with: `api://localdevinstance/<Workload publisher's tenant ID in lower case (the tenant ID of the user used in Fabric to run the sample)>/<Name of your workload>` and an optional subpath at the end that starts with `/` (see examples).

   Where:

   * The workload name is exactly as it's specified in the manifest.
   * The ID URI doesn't end with a slash.
   * At the end of the *ID URI* there can be an optional subpath consisting of a string of English lower or upper case letters, numbers, and dashes, up to 36 characters.

   > [!TIP]
   > For help finding the tenant ID, see [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).

   For example, if the publisher's tenant ID is *853d9f4f-c71b-4420-b6ec-60e503458946*, and the workload's name is *Fabric.WorkloadSample* then:

   * The following URIs *are* valid

      * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample`
      * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample/abc`

   * The following URIs *aren't* valid

      * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample/af/`
      * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample/af/a`
      * Any ID URI that doesn't start with `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample`

### Add a scope for CRUD/jobs

To work with Create, Read, Update and Delete APIs for workload items, and perform other operations with jobs, [add a scope](/entra/identity-platform/quickstart-configure-app-expose-web-apis#add-a-scope), and add *Fabric service application* to the preauthorized applications for that scope to indicate that your API (the scope you created) trusts Fabric:

1. Under **Expose an API**, select **Add a scope**. Name the scope *FabricWorkloadControl* and provide the necessary details for it.

1. Under **Authorized client applications**, select **Add a client application**. Add `00000009-0000-0000-c000-000000000000` (Fabric service application) and select your scope.

### Add scopes for data plane API

Other scopes need to be registered to represent groups of operations exposed by the data plane API.
In the backend sample, we provide four examples. You can see them in [Backend/src/Constants/scopes.cs](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Backend/src/Constants/Scopes.cs). The scopes are:

* `Item1.Read.All`: Used for reading workload items
* `Item1.ReadWrite.All`: Used for reading/writing workload items
* `FabricLakehouse.Read.All`: Used for reading lakehouse files
* `FabricLakehouse.ReadWrite.All`: Used for reading/writing lakehouse files  

Preauthorize `871c010f-5e61-4fb1-83ac-98610a7e9110` (the Fabric client application) for these scopes.

The application IDs of these apps can be found under [*Microsoft Power BI* and *Power BI Service*](/troubleshoot/azure/active-directory/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications).  

Here's how your *Expose an API* section should look in your application. In this example, the ID URI is `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample`:

:::image type="content" source="./media/authentication-tutorial/expose-api-section.png" alt-text="Screenshot showing how your Expose an API section should look." lightbox="./media/authentication-tutorial/expose-api-section.png":::

### Generate a secret for your application

Under **Certificates & secrets**, select the **Secrets** tab and add a secret. Give it any name you want and save it. Use this secret when configuring the [backend sample](extensibility-back-end.md).

:::image type="content" source="./media/authentication-tutorial/generate-secrets-dialog.png" alt-text="Screenshot of generate secrets dialog.":::

### Add optional claim 'idtyp'

Under **Token configuration**, select **Add optional claim**. Choose **Access token** and add idtyp.

:::image type="content" source="./media/authentication-tutorial/add-claim-idtyp.png" alt-text="Screenshot showing adding claim idtyp." lightbox="./media/authentication-tutorial/add-claim-idtyp.png":::

### Add API permissions

Under ***API permissions**, add the desired permissions for your application. For the backend sample, add **Storage user_impersonation** (for OneLake APIs) and **Power BI Workspace.Read.all** (for workload control APIs):

:::image type="content" source="./media/authentication-tutorial/add-api-permissions.png" alt-text="Screenshot showing adding API permissions." lightbox="./media/authentication-tutorial/add-api-permissions.png":::

### Make sure your application is set to work with auth token v1

Under **Manifest**, make sure `accessTokenAcceptedVersion` is set to either null or "1".

## Configuring your workload (Backend)

1. In the Backend sample, go to [src/appsettings.json](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Backend/src/appsettings.json) and configure the settings:

   * `PublisherTenantId`: The tenant ID of the publisher  
   * `ClientId`: Your application ID (you can find it in Entra ID under overview).  
   * `ClientSecret`: The [secret you created](#generate-a-secret-for-your-application) when configuring the Entra app.  
   * `Audience`: The [ID URI we configured](#configure-your-application-in-microsoft-entra-id) in the Entra app.  

1. Configure your *workloadManifest.xml*. Go to [src/Packages/manifest/files/WorkloadManifest.xml](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Backend/src/Packages/manifest/WorkloadManifest.xml) and configure your `AppId`, `redirectUri` and `ResourceId` (ID URI) under **AADApps**.

   :::image type="content" source="./media/authentication-tutorial/configure-workload-manifest-xml.png" alt-text="Screenshot showing configuration of workload manifest xml file.":::

## Configure the workload local manifest and acquire a token for your application (frontend)

After configuring your application, add the following configurations to the `extension` section of the [local workload manifest](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/Manifests/localWorkloadManifest.json):

```json
"devAADAppConfig": {  
     "audience": "", // The ID URI configured in your application for developer scenario  
     "redirectUri": "http://localhost:60006/close", // or the path you configured in index.ts  
     "appId": "" // your app ID  
}
```

:::image type="content" source="./media/authentication-tutorial/configure-local-workload-manifest-xml.png" alt-text="Screenshot showing configuration of local workload manifest xml file.":::

## Ask for a token and consent the application

> [!NOTE]
> This step is necessary in order for CRUD/Jobs to work.
  
1. Run the frontend sample and create a sample item.
1. Scroll down and select *Navigate to authentication page*.

   :::image type="content" source="./media/authentication-tutorial/configured-authentication-section.png" alt-text="Screenshot showing the configured authentication section." lightbox="./media/authentication-tutorial/configured-authentication-section.png":::

1. Check **Request initial consent** and select **Get access token**. This should trigger a consent for your application:

   :::image type="content" source="./media/authentication-tutorial/initial-consent.png" alt-text="Screenshot showing permissions request dialog for initial consent.":::

This consent includes the dependencies you added previously under [Add API Permissions](#add-api-permissions).

You can now do the following tasks:

* Work with CRUD/Jobs operations.
* Get an access token for your application on the client side.
* Use the authentication page in the frontend sample as a playground to call your workload APIs. 
* See what APIs the backend sample offers in [Backend/src/controllers](https://github.com/microsoft/Microsoft-Fabric-developer-sample/tree/main/Backend/src/Controllers).
