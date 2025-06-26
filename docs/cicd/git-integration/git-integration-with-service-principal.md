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

Register your application with Microsoft Entra ID, and create a secret by following the directions in [Register your app](/power-bi/developer/embedded/register-app#register-your-app). Confirm that your organization's policies allow the creation of client secrets and their use for token acquisition. Be sure to save the secret, as it will be required in a later step. For more information, see [Application and service principal objects in Microsoft Entra ID](/entra/identity-platform/app-objects-and-service-principals) and [Security best practices for application properties in Microsoft Entra ID](/entra/identity-platform/security-best-practices-for-app-registration).

## Step 2: Assign service principal to a DevOps organization

 1. Log in to your Azure DevOps organization
 2. Browse to **Organization settings -> User -> Add users**
 3. Select to add the service principal  
 4. Navigate to relevant Azure DevOps project settings -> Teams  
 5. Add the service principal to relevant team



## Step: Get connection information
In order to setup a source control connection with Azure DevOps, some information is required.  

   #### [Microsoft GRAPH](#tab/graph)

     ```
      GET https://graph.microsoft.com/v1.0/organization
     ```

   #### [PowerShell](#tab/powershell)

     ```powershell
        #Install the Azure Powershell module
        Install Module Az -Scope CurrentUser
 
        # Connect to Azure with an authenticated account
        Connect-AzAccount
   
        # Convert secure string to plain text
          $tenantID = (Get-AzContext).Tenant.Id
          Write-Output "Tenant ID: $tenantID"
     ```

## Step 3: Create Azure DevOps source control connection

1. In [Fabric settings](../../fundamentals/fabric-settings.md), navigate to **Manage Connections and Gateways**. Select **+New** in the top right corner to add a new cloud connection.
1. Give it a name and set the **Type** to *Azure DevOps source control* using a *Service Principal* as the authentication method. Complete the other details (Tenant ID, Service principal ID, Service principal key) using the information you saved in [step 1](#step-1-register-an-application-with-microsoft-entra-id).

     :::image type="content" source="./media/git-integration-with-service-principal/new-connection.png" alt-text="Screenshot of new connection interface.":::


     |Name|Value|Description|
     |-----|-----|-----|
     |Tenant Id

     You can also find the *Tenant Id* and *Client Id*  in the Azure portal by navigating to the app in the Azure portal and selecting the Overview tab, use *Application (client) Id* for *Service Principal ID*, use *Directory (tenant) ID* for *Tenant ID* and the secret you kept from step 1 as Service principal key.

     :::image type="content" source="./media/git-integration-with-service-principal/tenant-id.png" alt-text="Screenshot showing where to find the tenant ID in the Azure portal.":::


1. From your workspace settings, go to the *Git integration* tab, and select your newly created account. Complete the remaining information.

## Step 4: Allow calling Git REST APIs with service principal (optional)

### Share the Azure DevOps connection with service principal user

1. From Fabric settings, navigate to **Manage Connections and Gateways**
1. Select the connection you created in [Step 3](#step-3-create-azure-devops-source-control-connection), choose Manage Users 
1. Search for the service principal you create and select **Share**.

### Assign permissions to the service principal

1. Navigate to the relevant workspace.
1. Select **Manage Access -> Add People or Groups**
1. Search for the service principal and assign it a *contributor* role or higher. For more information on permissions, see the [Git integration permission table](./git-integration-process.md#required-fabric-permissions-for-popular-actions).

Now, you can [call Git REST APIs](./git-automation.md) with Service principal authentication.
