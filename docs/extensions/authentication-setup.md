---
title: Fabric extensibility authentication setup
description: Learn how to set up the authorization for a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 01/29/2024
---

# Authentication setup

In order to be able to work with authentication, you need to go through three setups:

1. Microsoft Entra ID Application (formerly Azure AD App)
1. FE sample
1. BE sample

Follow this guide carefuly to be able to work with authentication in Fabric.

## Azure Storage service provisioning

This sample demonstrates storing and reading data from/to lakehouses. This requires generating tokens for the Azure Storage service in OBO flows. To be able to do this, users need to consent to the application using Azure Storage, and for ththis, Azure Storage needs to be provisioned in the tenant.

To make sure Azure Storage is provisioned in the tenant:

1. Log into https://portal.azure.com
1. Go to **Microsoft Entra ID** > **Enterprise applications**
1. In the filters, choose **application type = all aplications**. The application ID starts with e406a681-f3d4-42a8-90b6-c2b029497af1

    :::image type="content" source="./media/authentication-setup/azure-storage-provisioning.png" alt-text="Screenshot showing Azure Storage provisioning." lightbox="./media/authentication-setup/azure-storage-provisioning.png":::

If you see the Azure Storage application, you're set! If not, a tenant admin needs to provision it. To do so, ask your tenant admin to perform the following:
  
Open Windows PowerShell as administrator and run the following:  

```console
Install-Module az  
Import-Module az  
Connect-AzureAD  
New-AzureADServicePrincipal -AppId e406a681-f3d4-42a8-90b6-c2b029497af1
```

## Configuring your application in Microsoft Entra ID

To work with authentication, you need to have an application registered in Microsoft Entra ID. If you don't have an application registered, follow [this guide](/entra/identity-platform/quickstart-register-app#register-an-application) to create a new application.

You need to apply the following configurations to your application:

* The application should be a multi-tenant app.
* For dev applications, the redirect URI should be configured as `http://localhost:60006/close` with SPA platform. This is required for our consent support. You can also add other redirect URIs as desired.
  
> [!NOTE]
> The redirect URI should be a URI that simply closes the page when navigating to it. The URI `http://localhost:60006/close` is already configured in the frontend sample and you can change it in [Frontend/src/index.ts](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Frontend/src/index.ts) (If you change it, make sure it matches the one configured for your application).

:::image type="content" source="./media/authentication-setup/register-application.png" alt-text="Screenshot of application registration UI." lightbox="./media/authentication-setup/register-application.png":::

> [!NOTE]
> You can configure the redirect URI after creating the application under **Manage** > **Authentication**.

Next, you need to change the Application ID URI for your application. To do so, go to **Manage** > **Expose an API**, and edit the Application ID URI for your app:

For the development scenario, the Application ID URI should start with: `api://localdevinstance/<Workload publisher's tenant ID in lower case (the tenant ID of the user used in Fabric to run the sample)>/<Name of your workload>` and an optional sub-path at the end that starts with `/` (see examples).

Where:

* The workload name name must be exactly as it's specified in the manifest.
* The ID URI should not end with a slash.
* At the end of the ID URI there can be an optional sub-path: a string consisting of English lower or upper case letters, numbers, and dashes, up to 36 characters.

> [!NOTE]
> For help finding the tenant ID, see [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).

For example, if the publisher's tenant ID is *853d9f4f-c71b-4420-b6ec-60e503458946*, and the workload's name is *Fabric.WorkloadSample* then:

    The following URIs **are** valid

    * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample`
    * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample/abc`

    The following URIs **are not** valid

    * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample/af/`
    * `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample/af/a`
    * Any ID URI that **does not** start with `api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample`

### Add a scope for CRUD/Jobs:

To be able to work with Create, Read, Update and Delete APIs for workload items, and other operations with jobs - 
you will need to [add a scope](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-configure-app-expose-web-apis#add-a-scope) and add Fabric service application to the preauthorized applications for that scope to indicate that your API (the scope you created) trusts Fabric, to do so:

1. Under Expose an API, click on "Add a scope", name the scope "FabricWorkloadControl" and provide needed details for it (this scope is needed for communication between Fabric BE and the workload BE and will be validated in the workload BE).
2. Under Authorized client applications, click on Add a client application and add "00000009-0000-0000-c000-000000000000" (Fabric service application) and select your scope.

### Add scopes for data plane API:

Additional scopes need to be registered to represent groups of operations, exposed by data plane API.
In the BE sample we provide four as an example (you can see them in [Backend/src/Constants/scopes.cs](../Backend/src/Constants/Scopes.cs) - the scopes are:

1. "Item1.Read.All" - used for reading workload items.
2. "Item1.ReadWrite.All" - used for reading/writing workload items.
3. "FabricLakehouse.Read.All"" - used for reading lakehouse files.
4. "FabricLakehouse.ReadWrite.All" - used for reading/writing from/to lakehouse files.  

You will need to preauthorize "871c010f-5e61-4fb1-83ac-98610a7e9110" (Fabric client application) for these scopes.  
You can find the mentioned application ids above [here](https://learn.microsoft.com/en-us/troubleshoot/azure/active-directory/verify-first-party-apps-sign-in#application-ids-of-commonly-used-microsoft-applications) under "Microsoft Power BI" and "Power BI Service".  

Here's how your 'Expose an API' section should look like in your application (in this example the ID URI is "api://localdevinstance/853d9f4f-c71b-4420-b6ec-60e503458946/Fabric.WorkloadSample":
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/73bb4f32-94da-47cd-b3ad-e305a3c6017b)

### Generate a secret for your applicaiton

Under Certificates & secrets, click on Secrets tab and add a secret, call it whatever you want and save it aside, we will use this secret when configuring our BE sample.
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/181d7cc2-83e7-4d53-bea1-f4325dc765f1)

### Add optional claim 'idtyp'

Under Token configuration, click on add optional claim, choose Access token and add idtyp.
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/8a098482-e1b2-4346-9929-6352fb89846d)

### Add API permissions

Under API permissions, add the desired permissions for your application, for the backend sample you will need to add Storage user_impersonation (for onelake APIs) and Power BI Workspace.Read.all (for workload control APIs): 
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/e0951cd4-bb74-4af5-bc09-6f981b0d5134)

### Make sure your application is set to work with auth token v1

Under Manifest, make sure accessTokenAcceptedVersion is set to either null or "1".

## Configuring your workload (Backend)

In the Backend sample, go to [src/appsettings.json](../Backend/src/appsettings.json) and configure the following:  
PublisherTenantId - the tenant Id of the publisher.  
ClientId - your application Id (you can find it in AAD under overview).  
ClientSecret - the secret we created earlier when configuring our AAD app.  
Audience - the ID URI we configured earlier in our AAD app.  

Next, you will need to configure your workloadManifest.xml, go to [src/Packages/manifest/files/WorkloadManifest.xml](../Backend/src/Packages/manifest/files/WorkloadManifest.xml) and configure your AppId, redirectUri and ResourceId (ID URI) under "AADApps":
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/6223464e-05a7-4c7e-97e8-2fd86cc10a2b)

## Configuring your workload local manifest and acquiring a token for your application (FrontEnd)

After configuring your application, you will need to add the following configurations to your [local workload manifest](../Frontend/README.md#extension-section): 
 
Under "extension", add "devAADAppConfig": {  
			  "audience": "", // The ID URI configured in your application for developer scenario  
			  "redirectUri": "http://localhost:60006/close", // or the path you configured in index.ts  
			  "appId": "" // your app Id  
		  }

   ![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/9fe741c5-f0d5-4d28-bb9d-906c44af8795)


## Ask for a token and consent the application

**Note: This is needed for CRUD/Jobs to work.**  
Run the frontend sample and create a sample item, scroll down until you see Navigate to authentication page button and click on it to go to the authentication section which looks like this:
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/bbd546e7-6008-44c2-85d6-8823b80cbcb3)

Check "Request initial consent" and click on get access token button - this should trigger a consent for your application:
(Additional information on how to handle consents will be updated soon).

![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/97835845/361f6bdf-a86a-4930-83a6-4f328e6aac24)

Note that this consent includes the dependencies you added earlier in "Add API Permissions".

After finishing setting up you should be able to work with CRUD/Jobs operations, you also should be able to get an access token to your application in the client side.
You can use the authentication page in the frontend sample as a playground to call your workload APIs (you can see what kind of APIs the backend sample offers in Backend/src/controllers).
