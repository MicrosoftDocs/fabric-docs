---
title: Create a OneDrive or SharePoint shortcut
description: Learn how to create a OneLake shortcut for OneDrive or SharePoint inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.author: kgremban
author: kgremban
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 11/17/2025
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

   |Field | Description|
   |-----|-----|
   |**Site URL**| The root URL of your SharePoint account.<br><br>To retrieve your URL, sign in to OneDrive. Select the settings gear icon, then **OneDrive settings** > **More settings**. Copy the **OneDrive web URL** from the more settings page and remove anything after `_onmicrosoft_com`. For example, `https://mytenant-my.sharepoint.com/personal/user01_mytenant_onmicrosoft_com`. |
   |**Connection** | The default value, **Create new connection**. |
   |**Connection name** | A name for your connection. The service generates a suggested connection name based on the storage account name, but you can overwrite with a preferred name. |
   |**Authentication kind**| The supported authentication includes Organizational account, [Workspace Identity](/fabric/security/workspace-identity), and [Service Principal](/entra/identity-platform/app-objects-and-service-principals).|
  
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

## Best practices

- HTTP 429 errors when accessing OneDrive or SharePoint shortcuts are due to SharePoint throttling. SharePoint enforces service throttling to protect reliability; review the [official throttling guidance](/sharepoint/dev/general-development/how-to-avoid-getting-throttled-or-blocked-in-sharepoint-online) to understand applicable limits and behaviors. Use the following best practices to minimize throttling:

  - Spark workload concurrency: Avoid running many parallel Spark jobs using the same delegated (user-based) authentication, as this can quickly trigger SharePoint throttling limits. 
  
  - Folder scope: Create shortcuts at the most specific folder level that contains the actual data to be processed (for example, `site/folder1/subfolder2`) rather than at the site or document library root. 
  
## Limitations

The following limitations apply to SharePoint shortcuts:

* OneLake doesn't support shortcuts to personal **or OnPremise** SharePoint sites. Shortcuts can only connect to enterprise SharePoint sites **and OneDrive for Business.**

* Service Principal support is limited to app-only access and does not include user-delegated permissions or user-context behaviors as they are being [retired](/sharepoint/dev/solution-guidance/security-apponly-azureacs).

## Related content

* [Create a OneLake shortcut](create-onelake-shortcut.md)

* [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)

