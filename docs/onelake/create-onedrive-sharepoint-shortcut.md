---
title: Create a OneDrive or SharePoint shortcut
description: Learn how to create a OneLake shortcut for OneDrive or SharePoint inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag, shinarayanan
ms.author: kgremban
author: kgremban
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 02/10/2026
#customer intent: As a data engineer, I want to learn how to create a OneDrive or SharePoint shortcut inside a Microsoft Fabric lakehouse so that I can efficiently manage and access my data.
---

# Create a OneDrive or SharePoint shortcut (preview)

In this article, you learn how to create a OneDrive or SharePoint shortcut inside a Microsoft Fabric lakehouse.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

>[!NOTE]
>OneDrive and SharePoint shortcuts are currently in public preview.

## Prerequisites

* A lakehouse in Microsoft Fabric. If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](create-lakehouse-onelake.md).
* Data in a OneDrive or SharePoint folder.

## Create a shortcut

1. Open a lakehouse in Fabric.

1. Right-click on a directory in the **Explorer** pane of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot that shows selecting 'new shortcut' from a directory menu.":::

## Select a source

When you create a shortcut in a lakehouse, the **New shortcut** window opens to walk you through the configuration details.

1. On the **New shortcut** window, under **External sources**, select **OneDrive (preview)** or **SharePoint Folder (preview)**.

1. Select **Existing connection** or **New connection**, depending on whether this account is already connected in your OneLake.

   * For an **Existing connection**, select the connection from the drop-down menu.

   * To create a **New connection**, provide the following connection settings:

   | Field | Description |
   | ----- | ----------- |
   | **Site URL** | The root URL of your SharePoint account.<br><br>To retrieve your URL, sign in to OneDrive. Select the settings gear icon, then **OneDrive settings** > **More settings**. Copy the **OneDrive web URL** from the more settings page and remove anything after `_onmicrosoft_com`. For example, `https://mytenant-my.sharepoint.com/personal/user01_mytenant_onmicrosoft_com`. |
   | **Connection** | The default value, **Create new connection**. |
   | **Connection name** | A name for your connection. The service generates a suggested connection name based on the storage account name, but you can overwrite with a preferred name. |
   | **Authentication kind** | The supported authentication types are **Organizational account**, **Workspace identity**, and **Service principal**. For more information, see [Authentication](#authentication). |
  
1. Select **Next**.

1. Browse to the target location for the shortcut.

   Navigate by selecting a folder or expanding a folder to view its child items.

   Choose one or more target locations by selecting the checkbox next a folder in the navigation view. Then, select **Next**.

   :::image type="content" source="./media/create-onedrive-sharepoint-shortcut/select-target.png" alt-text="Screenshot that shows selecting the target locations for a new shortcut.":::

1. On the **Transform** page, select a transformation option if you want to transform the data in your shortcut or select **Skip**. AI powered transforms are available for .txt files. For more information, see [AI-powered transforms](./shortcuts-ai-transformations/ai-transformations.md).

1. On the review page, verify your selections. Here you can see each shortcut to be created. In the **Actions** column, you can select the pencil icon to edit the shortcut name. You can select the trash can icon to delete the shortcut.

1. Select **Create**.

1. The lakehouse automatically refreshes. The shortcut or shortcuts appear in the **Explorer** pane.

   :::image type="content" source="./media/create-onedrive-sharepoint-shortcut/view-shortcuts.png" alt-text="Screenshot showing the lakehouse explorer view with a list of folders that display the shortcut symbol.":::

## Authentication

OneDrive and SharePoint shortcuts support the following methods for authentication:

* Organizational account
* [Workspace Identity](/fabric/security/workspace-identity)

  To use workspace identity authentication for OneDrive or SharePoint shortcuts, you need to grant your workspace identity access to the OneDrive or SharePoint site. Use the steps in the following section to configure this access.

* [Service Principal](/entra/identity-platform/app-objects-and-service-principals)

  To use service principal authentication, [register an application in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app) and create a client secret. Then, grant the service principal access to your SharePoint site using Microsoft Graph. The service principal needs at least **read** permission on the SharePoint site. For more information about granting site permissions, see [Grant an app-only access token to a SharePoint site](/sharepoint/dev/solution-guidance/security-apponly-azuread#granting-access-using-sharepoint-online).

### Configure workspace identity authentication

The steps in this section require PowerShell. You can [Install PowerShell](/powershell/scripting/install/install-powershell) or run the PowerShell commands in [Azure Cloud Shell](/azure/cloud-shell/get-started/classic?tabs=powershell).

You must be a workspace admin to be able to create a workspace identity. The workspace you're creating the identity for can't be a **My Workspace**.

1. Follow the steps to [Create a workspace identity](../security/workspace-identity.md#create-and-manage-a-workspace-identity).

1. In the [Azure portal](https://portal.azure.com), go to **Microsoft Entra ID** and search your tenant for the workspace identity. The name should be the same as your workspace.

1. Copy the application ID for the workspace identity to use later.

1. Open a PowerShell command window or start a cloud shell session in the Azure portal.

1. Check if the **Microsoft.Graph** PowerShell module is installed in your environment.

   ```powershell
   Get-InstalledModule Microsoft.Graph
   ```

   If not, install it.

   ```powershell
   Install-Module Microsoft.Graph -Scope AllUsers -Force
   ```

   Or update to the latest version.

   ```powershell
   Update-Module Microsoft.Graph
   ```

1. Connect to Microsoft Graph with the required permissions for this task.

   ```powershell
   Connect-MgGraph -Scopes "Sites.FullControl.All","AppRoleAssignment.ReadWrite.All","Directory.Read.All"
   ```

1. Verify the granted scopes.

   ```powershell
   Get-MgContext | Select-Object -ExpandProperty Scopes
   ```

   In the output, you should see `Sites.FullControl.All` (recommended) or `Sites.ReadWrite.All`.

1. Create a variable to store the site ID for your SharePoint site. Replace the `<TENANT_NAME>` and `<SITE_NAME>` placeholders with your own values.

   ```powershell
   $site = Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/v1.0/sites/<TENANT_NAME>.sharepoint.com:<SITE_NAME>:"  
   ```

1. Create variables for the permissions command. Replace the `<WORKSPACE_IDENTITY_APP_ID>` placeholder with the application ID that you retrieved from Microsoft Entra.

   ```powershell
   $ManagedIdentityClientId = "<WORKSPACE_IDENTITY_APP_ID>"
   $Role = "read"  # read | write | owner  
   $DisplayName = "Workspace Identity Name"  
   ```

1. Create the body for the permissions command.

   ```powershell
   $body = @{ 
     roles = @($Role)  # read | write | owner 
     grantedToIdentities = @( 
       @{ 
         application = @{ 
           id = $ManagedIdentityClientId 
           displayName = $DisplayName 
         } 
       } 
     ) 
   } | ConvertTo-Json -Depth 6 
   ```

1. Grant the permissions.

   ```powershell
   $siteId = $site.Id  
   $grant = Invoke-MgGraphRequest -Method POST -Uri "https://graph.microsoft.com/v1.0/sites/$siteId/permissions" -Body $body -ContentType "application/json" -ErrorAction Stop  
   ```

1. Confirm that the permission object was created successfully.

   ```powershell
   Write-Host ("Granted: id={0} roles={1}" -f $grant.id, ($grant.roles -join ",")) -ForegroundColor Green 
   ```

Now, when you create a shortcut you can select **Workspace identity** as the **Authentication kind**.

## Best practices

* HTTP 429 errors when accessing OneDrive or SharePoint shortcuts are due to SharePoint throttling. SharePoint enforces service throttling to protect reliability; review the [official throttling guidance](/sharepoint/dev/general-development/how-to-avoid-getting-throttled-or-blocked-in-sharepoint-online) to understand applicable limits and behaviors. Use the following best practices to minimize throttling:

  * Spark workload concurrency: Avoid running many parallel Spark jobs using the same delegated (user-based) authentication, as this can quickly trigger SharePoint throttling limits. 
  
  * Folder scope: Create shortcuts at the most specific folder level that contains the actual data to be processed (for example, `site/folder1/subfolder2`) rather than at the site or document library root. 

  * Use **Workspace Identity (WI)** authentication instead of **Organizational Account** authentication to reduce throttling.

* You can use Service Principal based authentication to connect to SharePoint or OneDrive across different tenants.

## Limitations

The following limitations apply to SharePoint shortcuts:

* OneLake doesn't support shortcuts to personal **or OnPremise** SharePoint sites. Shortcuts can only connect to enterprise SharePoint sites **and OneDrive for Business.**

* Based on Azure ACL [retirement](/sharepoint/dev/solution-guidance/security-apponly-azureacs), Service Principal authentication will not work for SharePoint tenants created after Nov 1st, 2024.

* SharePoint and OneDrive Shortcuts are supported only at folder level and not at file level.

## Related content

* [Create a OneLake shortcut](create-onelake-shortcut.md)

* [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
