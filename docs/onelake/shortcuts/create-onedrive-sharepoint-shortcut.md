---
title: Create a OneDrive or SharePoint shortcut
description: Learn how to create a OneLake shortcut for OneDrive or SharePoint inside a Microsoft Fabric lakehouse.
ms.reviewer: shinarayanan # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 08/27/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to learn how to create a OneDrive or SharePoint shortcut inside a Microsoft Fabric lakehouse so that I can efficiently manage and access my data.
---

# Create a OneDrive or SharePoint shortcut

In this article, you learn how to create a OneDrive or SharePoint shortcut inside a Fabric lakehouse.

For an overview of shortcuts, see [OneLake shortcuts](../onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](../onelake-shortcuts-rest-api.md).

## Prerequisites

* A lakehouse in Fabric. If you don't have a lakehouse, create one by following these steps: [Create a lakehouse](../../data-engineering/create-lakehouse.md).
* Data in a OneDrive or SharePoint folder.

## Create a shortcut

1. Open a lakehouse in Fabric.

1. Right-click on a directory in the **Explorer** pane of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut-lake-view.png" alt-text="Screenshot that shows selecting 'new shortcut' from a directory menu.":::

## Select a source

When you create a shortcut in a lakehouse, the **New shortcut** window opens to walk you through the configuration details.

1. On the **New shortcut** window, under **External sources**, select **OneDrive** or **SharePoint Folder**.

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

1. On the **Transform** page, select a transformation option if you want to transform the data in your shortcut or select **Skip**. AI-powered shortcut transformations are available for .txt files. For more information, see [Transform unstructured text files into Delta tables by using AI-powered tools](transformations-ai.md).

1. On the review page, verify your selections. Here you can see each shortcut to be created. In the **Actions** column, you can select the pencil icon to edit the shortcut name. You can select the trash can icon to delete the shortcut.

1. Select **Create**.

1. The lakehouse automatically refreshes. The shortcut or shortcuts appear in the **Explorer** pane.

   :::image type="content" source="./media/create-onedrive-sharepoint-shortcut/view-shortcuts.png" alt-text="Screenshot showing the lakehouse explorer view with a list of folders that display the shortcut symbol.":::

## Authentication

OneDrive and SharePoint shortcuts support the following methods for authentication:

* Organizational account

* [Workspace identity](../../security/workspace-identity.md)

   To use workspace identity authentication for OneDrive or SharePoint shortcuts, grant your workspace identity access to the OneDrive or SharePoint site. Use the steps in [Configure SharePoint access](#configure-sharepoint-access).

* [Service principal](/entra/identity-platform/app-objects-and-service-principals)

   To use service principal authentication, grant the service principal access to the SharePoint site, and use a certificate credential for the Fabric connection. The service principal needs at least **read** permission on the SharePoint site. Use the steps in [Configure SharePoint access](#configure-sharepoint-access) and [Create a certificate-based service principal connection](#create-a-certificate-based-service-principal-connection).

   Service principal authentication with key/secret pairs is *no longer supported*. For more information, see [Granting access via Entra ID application permissions](/sharepoint/dev/solution-guidance/security-apponly-azuread).

### Configure SharePoint access

The steps in this section require PowerShell. You can [Install PowerShell](/powershell/scripting/install/install-powershell) or run the PowerShell commands in [Azure Cloud Shell](/azure/cloud-shell/get-started/classic?tabs=powershell).

Complete these steps for either a workspace identity or service principal. For a workspace identity, you must be a workspace admin, and the workspace can't be **My Workspace**.

1. Identify the application that you want to grant access to:

    * For a workspace identity, follow the steps to [create a workspace identity](../../security/workspace-identity.md#create-and-manage-a-workspace-identity).

    * For a service principal, [register an application in Microsoft Entra ID](/entra/identity-platform/quickstart-register-app).

1. In the [Azure portal](https://portal.azure.com), go to **Microsoft Entra ID** > **App registrations** > **All applications**, and then search for and select the application. For a workspace identity, the application name is the same as the workspace name.

1. Copy the application ID to use later.

1. In the application, go to **Manage** > **API permissions**.

1. Select **Add a permission**.

1. Select **SharePoint**.

1. On the **Request API permissions** page, select **Application permissions**, and then select **Sites** > **Sites.Selected**.

   :::image type="content" source="media/create-onedrive-sharepoint-shortcut/sharepoint-application-permissions.png" alt-text="Screenshot of the Azure portal that shows selecting the Sites.Selected API permissions for SharePoint.":::

1. Select **Add permissions** to confirm.

1. Select **Grant admin consent for [tenant]**, and then select **Yes**. Confirm that the status for **Sites.Selected** is **Granted for [tenant]**.

1. Open a PowerShell command window or start a cloud shell session in the Azure portal.

1. Check if the **Microsoft.Graph** PowerShell module is installed in your environment.

   ```powershell
   Get-InstalledModule Microsoft.Graph
   ```

   If not, install it.

   ```powershell
   Install-Module Microsoft.Graph -Scope AllUsers -Force
   ```

   Or update to the latest version.

   ```powershell
   Update-Module Microsoft.Graph
   ```

1. Connect to Microsoft Graph with the required permissions for this task.

   ```powershell
   Connect-MgGraph -Scopes "Sites.FullControl.All","AppRoleAssignment.ReadWrite.All","Directory.Read.All"
   ```

1. Verify the granted scopes.

   ```powershell
   Get-MgContext | Select-Object -ExpandProperty Scopes
   ```

   In the output, you should see `Sites.FullControl.All` (recommended) or `Sites.ReadWrite.All`.

1. Create a variable to store the site ID for your SharePoint site. Replace the `<TENANT_NAME>` and `<SITE_NAME>` placeholders with your own values.

   ```powershell
   $site = Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/v1.0/sites/<TENANT_NAME>.sharepoint.com:/<SITE_NAME>:"
   ```

   The value of `<SITE_NAME>` depends on the site URL. For example:

   * For `https://test.sharepoint.com/teams/OneLake`, use `teams/OneLake`.

   * For `https://test.sharepoint.com/sites/OneLake`, use `sites/OneLake`.

   * For `https://test.sharepoint.com/OneLake`, use `OneLake`.

1. Verify that Microsoft Graph returns the intended site.

   ```powershell
   $site.webUrl
   ```

   Confirm that the value matches your SharePoint site URL. If it shows the root site or a different site, correct `<SITE_NAME>` before you continue.

1. Create variables for the permissions command. Replace `<APPLICATION_ID>` and `<APPLICATION_NAME>` with the values for your workspace identity or service principal.

   ```powershell
   $PrincipalClientId = "<APPLICATION_ID>"
   $Role = "read" # read | write | owner
   $DisplayName = "<APPLICATION_NAME>"
   ```

1. Create the body for the permissions command.

   ```powershell
   $body = @{ 
     roles = @($Role)  # read | write | owner 
     grantedToIdentities = @( 
       @{ 
         application = @{ 
                id = $PrincipalClientId
           displayName = $DisplayName 
         } 
       } 
     ) 
   } | ConvertTo-Json -Depth 6 
   ```

1. Grant the permissions.

   ```powershell
   $siteId = $site.Id
   $grant = Invoke-MgGraphRequest -Method POST -Uri "https://graph.microsoft.com/v1.0/sites/$siteId/permissions" -Body $body -ContentType "application/json" -ErrorAction Stop
   ```

1. Confirm that the permission object was created successfully.

   ```powershell
   Write-Host ("Granted: id={0} roles={1}" -f $grant.id, ($grant.roles -join ",")) -ForegroundColor Green
   ```

1. Retrieve the site permissions to verify that the application ID appears with the expected role.

   ```powershell
   (Invoke-MgGraphRequest -Method GET -Uri "https://graph.microsoft.com/v1.0/sites/$siteId/permissions").value | ConvertTo-Json -Depth 6
   ```

The workspace identity or service principal now has access to the SharePoint site.

### Create a certificate-based service principal connection

Service principal connections for OneDrive and SharePoint shortcuts use a certificate credential and an Azure Key Vault reference.

> [!IMPORTANT]
> You can create a certificate-based connection in **Manage Connections and Gateways**. The option to create this connection in the **New shortcut** flow is rolling out and might not be available in every region.

1. If you need to create the service principal and certificate, follow the Azure CLI guidance to [create a service principal and store its certificate in Azure Key Vault](/cli/azure/azure-cli-sp-tutorial-3#work-with-azure-key-vault). If the service principal already exists, store its certificate in Azure Key Vault.

1. [Configure an Azure Key Vault reference](../../data-factory/azure-key-vault-reference-configure.md) in Fabric.

1. In Fabric, select the settings gear icon, and then select **Manage Connections and Gateways**.

1. Create a connection that uses **Service principal** authentication and the Azure Key Vault reference for the certificate credential.

1. When you create the shortcut, select **Existing connection**, and then select the certificate-based connection. If your region supports certificate credentials in the **New shortcut** flow, you can create the connection there instead.

## Sensitivity label alignment for SharePoint shortcuts

OneLake supports sensitivity label alignment during the creation of SharePoint shortcuts to help ensure consistent data protection between SharePoint and Fabric item. When a shortcut is created, OneLake compares the sensitivity label of the SharePoint site with the target Fabric item. If the SharePoint site has a more restrictive label, users are prompted to optionally align the Fabric item’s label to match. Sensitivity labels are evaluated only at creation time and are not re-evaluated afterward.

### Prerequisite

The tenant must enable sensitivity labeling for Fabric content. An admin must turn on **Allow users to apply sensitivity labels for content** in the Fabric/Power BI admin portal. If this setting is disabled, the label alignment option is not available during shortcut creation, and no label updates can be applied.

### Behavior

* Sensitivity label comparison occurs only during initial shortcut creation. No sensitivity label checks or updates occur during shortcut updates or after creation.

* If the SharePoint site has a more restrictive label than the Fabric item, a **Data integrity** warning is displayed.

* The **Apply the same sensitivity label** checkbox is enabled by default, allowing the Fabric item label to be updated to match SharePoint. Users can clear the checkbox to proceed without updating the Fabric item label.

* If sensitivity label validation or the label update fails, shortcut creation fails.

## Best practices

* HTTP 429 errors when accessing OneDrive or SharePoint shortcuts are due to SharePoint throttling. SharePoint enforces service throttling to protect reliability; review the [official throttling guidance](/sharepoint/dev/general-development/how-to-avoid-getting-throttled-or-blocked-in-sharepoint-online) to understand applicable limits and behaviors. Use the following best practices to minimize throttling:

  * Spark workload concurrency: Avoid running many parallel Spark jobs using the same delegated (user-based) authentication, as this can quickly trigger SharePoint throttling limits.
  
  * Folder scope: Create shortcuts at the most specific folder level that contains the actual data to be processed (for example, `site/folder1/subfolder2`) rather than at the site or document library root.

  * Use **Workspace Identity (WI)** authentication instead of **Organizational Account** authentication to reduce throttling.

* You can use service principal authentication to connect to SharePoint or OneDrive across different tenants.

## Limitations

The following limitations apply to SharePoint shortcuts:

* OneLake doesn't support shortcuts to personal **or OnPremise** SharePoint sites. Shortcuts can only connect to enterprise SharePoint sites **and OneDrive for Business.**

* Create certificate-based service principal connections in **Manage Connections and Gateways**. Creating these connections in the **New shortcut** flow is rolling out and might not be available in every region.

* SharePoint and OneDrive Shortcuts are supported only at folder level and not at file level.

* SharePoint shortcuts don't support SharePoint subsites or hub sites.

## Related content

* [Create a OneLake shortcut](../shortcuts/create-onelake-shortcut.md)

* [Use OneLake shortcuts REST APIs](../onelake-shortcuts-rest-api.md)
