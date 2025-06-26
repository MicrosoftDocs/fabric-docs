---
title: Git Integration with Service Principal
description: Learn how to integrate Git with a service principal in Microsoft Fabric for streamlined CI/CD workflows.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: how-to
ms.date: 05/11/2025
#customer intent: As a developer, I want to learn how to integrate Git with a service principal in Microsoft Fabric, so that I can automate CI/CD workflows.
---

# Azure DevOps - Git Integration with service principal (preview)

This article provides a step-by-step guide on how to set up a service principal for integrating Microsoft Fabric with Azure DevOps. This integration allows you to automate CI/CD workflows, enabling you to manage your code and deployments more efficiently.

## Prerequisites

To register an application with your Microsoft Entra tenant and use it to integrate your Fabric workspace with Git, you need to have:

- At least [Cloud Application Administrator](/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) permissions.
- A Fabric workspace with Admin permissions.

## Step 1: Register an application with Microsoft Entra ID

Register your application with Microsoft Entra ID, and create a secret by following the directions in [Register your app](/power-bi/developer/embedded/register-app#register-your-app). Confirm that your organization's policies allow the creation of client secrets and their use for token acquisition. Be sure to save the secret, as it will be required in a later step. 

 >[!NOTE]
>Be sure to save the secret. It will be used in the later steps.

For more information, see [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals) and [Security best practices for application properties in Microsoft Entra ID](/entra/identity-platform/security-best-practices-for-app-registration).

## Step 2: Assign service principal to a DevOps organization

 1. Log in to your Azure DevOps organization
 2. Browse to **Organization settings -> User -> Add users**
 3. Select to add the service principal  
 4. Navigate to relevant Azure DevOps project settings -> Teams  
 5. Add the service principal to relevant team



## Step 3: Get source control connection information
In the next step, we will be creating a source control connection to Azure DevOps.  Before doing this, we need to gather the information that will be used for our connection.  The following items are required to create a successful connection:

|Name|Description|
|-----|-----|
|Name|The name of the source control connection|
|Azure DevOps URL|The url for your instance of Azure DevOps|
|Authentication method|The authentication method for the connection. Service Principal should be selected|
|Tenant ID|The ID of the tenant where Azure DevOps is located.  See the [Obtain the tenant ID](#obtain-the-tenant-id) section.|
|Service principal ID|The Application (client) Id from the app overview in the Azure portal.  See the [Obtain Service Principal ID](#obtain-the-service-principal-id) section.|
|Service principal key|Obtained in step 1.|

 :::image type="content" source="media/git-integration-with-service-principal/new-connection-2.png" alt-text="Screenshot of a new connection." lightbox="media/git-integration-with-service-principal/new-connection-2.png":::


### Obtain the tenant ID
There are several ways to get this information.  The quickest and easiest is to pull it from the Azure DevOps URL. The `{organization}` portion of the URL contains the Tenant ID.

 :::image type="content" source="media/git-integration-with-service-principal/tenant-id-2.png" alt-text="Screenshot of a connection." lightbox="media/git-integration-with-service-principal/tenant-id-2.png":::

If you use the wrong tenant ID with the preferred setup flow, you will see the following error:

 :::image type="content" source="media/git-integration-with-service-principal/tenant-error.png" alt-text="Screenshot of tenant connection error." lightbox="media/git-integration-with-service-principal/tenant-error.png":::

 >[!NOTE]
>The target tenant ID for the source control connection, is the tenant ID where Azure DevOps is located.  This may or may not be the same as the Directory (tenant) ID information that is available from viewing an overview of the app.
>
>Be sure to use the tenant ID of the tenant where Azure DevOps is located. 

If you are unable to obtain the tenant ID from the AzureDev Ops URL, you can use MS Graph or PowerShell to retrieve it.
   
#### [MS GRAPH](#tab/graph)
```
GET:https://graph.microsoft.com/v1.0/organization 
```

#### [PowerShell](#tab/powershell)

```powershell

          # Install the Azure PowerShell module     
          Install-Module Az -Scope CurrentUser

          # Connect to your tenant
          Connect-AzAccount

          #Get the Tenant Id
          $tenantId =(Get-AzContext).Tenant.Id
          Write-Output "Tenant ID: $tenantId"

```

---

For additional ways to obtain the tenant ID, see [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).

### Obtain the Service Principal ID

You can find the *Service Principal ID* by navigating to the app in the Azure portal and selecting the Overview tab, use *Application (client) Id* for *Service Principal ID*.

:::image type="content" source="./media/git-integration-with-service-principal/tenant-id.png" alt-text="Screenshot showing where to find the tenant ID in the Azure portal.":::

## Step 4: Create Azure DevOps source control connection
Next, we will create the Azure DevOps source control connection.  There are two ways of doing this, the preferred method and the alternate method. Select one of the methods to proceed. Microsoft recommends using the preferred method.

### Prefered method of source control connection creation
1. From a workspace, select **workspace settings**
2. Select **Git Integration**
3. Select **Azure DevOps**
4. Click on **Add Account**
5. Under **Display name**, enter a name.
6. Enter the Azure DevOps URL.
7. Under **Authentication method**, select **Service Principal**. 
8. Complete the other details (Tenant ID, Service principal ID, Service principal key) using the information from above.

 :::image type="content" source="media/git-integration-with-service-principal/new-connection-2.png" alt-text="Screenshot of a new connection using the preferred method." lightbox="media/git-integration-with-service-principal/new-connection-2.png":::

### Alternate method of source control connection creation
1. In [Fabric settings](../../fundamentals/fabric-settings.md), navigate to **Manage Connections and Gateways**. Select **+New** in the top right corner to add a new cloud connection.
2. Give it a name and set the **Type** to *Azure DevOps source control* using a *Service Principal* as the authentication method. Complete the other details (Tenant ID, Service principal ID, Service principal key) using the information you saved in [step 1](#step-1-register-an-application-with-microsoft-entra-id).

     :::image type="content" source="./media/git-integration-with-service-principal/new-connection.png" alt-text="Screenshot of new connection interface.":::

3. From your workspace settings, go to the *Git integration* tab, and select your newly created account. Complete the remaining information.

## Step 5: Allow calling Git REST APIs with service principal (optional)

### Share the Azure DevOps connection with service principal user

1. From Fabric settings, navigate to **Manage Connections and Gateways**
1. Select the connection you created in [Step 4](#step-4-create-azure-devops-source-control-connection), choose Manage Users 
1. Search for the service principal you create and select **Share**.

### Assign permissions to the service principal

1. Navigate to the relevant workspace.
1. Select **Manage Access -> Add People or Groups**
1. Search for the service principal and assign it a *contributor* role or higher. For more information on permissions, see the [Git integration permission table](./git-integration-process.md#required-fabric-permissions-for-popular-actions).

Now, you can [call Git REST APIs](./git-automation.md) with Service principal authentication.
