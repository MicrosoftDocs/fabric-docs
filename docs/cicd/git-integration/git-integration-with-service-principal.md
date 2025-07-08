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

This article provides a step-by-step guide on how to set up a service principal for integrating Microsoft Fabric with Azure DevOps. This will allow the Fabric user to perform git operation using a service principal. To automate Git Integration by using APIs with a service principal see [Automate Git integration by using APIs](git-automation.md)

## Prerequisites

To register an application with your Microsoft Entra tenant and use it to integrate your Fabric workspace with Git, you need to have:

- At least [Cloud Application Administrator](/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator) permissions.
- A Fabric workspace with Admin permissions.

## Step 1: Register an application with Microsoft Entra ID

Register your application with Microsoft Entra ID, and create a secret by following the directions in [Register your app](/power-bi/developer/embedded/register-app#register-your-app). Confirm that your organization's policies allow the creation of client secrets and their use for token acquisition. Be sure to save the secret, as it will be required in a later step. 

 >[!NOTE]
>Be sure to save the secret. It will be used in the later steps.

For more information, see [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals) and [Security best practices for application properties in Microsoft Entra ID](/entra/identity-platform/security-best-practices-for-app-registration).

For an example of application registration and service principal creation, see [Register a Microsoft Entra app and create a service principal](/entra/identity-platform/howto-create-service-principal-portal).

## Step 2: Assign service principal to a DevOps organization

 1. Log in to your Azure DevOps organization
 2. Browse to **Organization settings -> User -> Add users**
 3. Select to add the service principal  
 4. Navigate to relevant Azure DevOps project settings -> Teams  
 5. Add the service principal to relevant team


## Step 3: Create Azure DevOps source control connection
Next, we will create the Azure DevOps source control connection.  The following information is required to complete this step.

### Obtain the tenant ID 
To obtain the tenant ID, use the following steps.

1. Go to the [Azure portal](https://portal.azure.com) and sign in with your credentials. 
2. Navigate to Microsoft Entra Id (Azure Active Directory)
3. Under the "Overview" section, you will see your "Tenant ID" listed.
 
 :::image type="content" source="media/git-integration-with-service-principal/tenant-id-3.png" alt-text="Screenshot of tenant id in Azure portal." lightbox="media/git-integration-with-service-principal/tenant-id-3.png":::

For additional ways to obtain the tenant ID, see [How to find your Microsoft Entra tenant ID](/entra/fundamentals/how-to-find-tenant).

### Obtain the Service Principal ID
To obtain the Service principal ID, use the following steps.

1. Go to the [Azure portal](https://portal.azure.com) and sign in with your credentials. 
2. Navigate to Microsoft Entra Id (Azure Active Directory)
3. On the left, select **App registrations**
4. Navigating to the app and select the Overview tab
5. Use the **Application (client) Id** for the **Service Principal ID**

:::image type="content" source="./media/git-integration-with-service-principal/tenant-id.png" alt-text="Screenshot showing where to find the tenant ID in the Azure portal.":::

### Create the source control connection
To create the source control connection, use the following details and steps.

|Name|Description|
|-----|-----|
|Display Name|The name of the source control connection. It should be unique.|
|Azure DevOps URL|The url to your repository in Azure DevOps.|
|Authentication method|The authentication method for the connection. Service Principal should be selected|
|Tenant ID|The ID of the tenant where Azure DevOps is located.  See the [Obtain the tenant ID](#obtain-the-tenant-id) section.|
|Service principal ID|The Application (client) Id from the app overview in the Azure portal.  See the [Obtain Service Principal ID](#obtain-the-service-principal-id) section.|
|Service principal key|That's the secret obtained in step 1.|

1. From a workspace, select **workspace settings**
2. Select **Git Integration**
3. Select **Azure DevOps**
4. Click on **Add Account**
5. Under **Display name**, enter a name.
6. Enter the Azure DevOps URL.
7. Under **Authentication method**, select **Service Principal**. 
8. Complete the other details (Tenant ID, Service principal ID, Service principal key) using the information from above.

 :::image type="content" source="media/git-integration-with-service-principal/new-connection-2.png" alt-text="Screenshot of a new connection using the preferred method." lightbox="media/git-integration-with-service-principal/new-connection-2.png":::

9. After adding the connection, you need to click on **connect** and complete the git connection details. For more information see [Connect to a workspace](git-get-started.md#connect-to-a-workspace)




## Appendix: Edit service principal connection details
When you need to update your service principal details, for example, update service principal key, use the following instructions:

1. In [Fabric settings](../../fundamentals/fabric-settings.md), navigate to **Manage Connections and Gateways**. Locate the cloud connection that you previously created in the steps above.
2. Edit the connection with the updated settings.

 :::image type="content" source="media/git-integration-with-service-principal/edit-connection-1.png" alt-text="Screenshot of editing the connection details." lightbox="media/git-integration-with-service-principal/edit-connection-1.png":::

 >[!NOTE]
 > If you want to create a new connection instead of editing an existing one, you can do this by selecting **+New** in the top left corner to add a new cloud connection.

3. Once you have finished editing the connection, click **Save**.

## Related content

- [Automate Git integration by using APIs](git-automation.md)
- [Understand the Git integration process](./git-integration-process.md)
- [Manage Git branches](./manage-branches.md)
- [Git integration best practices](../best-practices-cicd.md)