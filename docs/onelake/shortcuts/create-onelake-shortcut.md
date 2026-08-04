---
title: Create a same-tenant OneLake shortcut
description: Learn how to create a OneLake shortcut to data in another Fabric item in the same tenant, including how to choose between passthrough and delegated authentication.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 07/31/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to create a OneLake shortcut to data in another Fabric item in my tenant so that I can access the data from my lakehouse or KQL database.
---

# Create a same-tenant OneLake shortcut

In this article, you learn how to create a OneLake shortcut that points to data inside another Fabric item in your tenant.

For an overview of shortcuts, see [OneLake shortcuts](../onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts/create-shortcut?tabs=HTTP).

## Prerequisites

A lakehouse or KQL database in OneLake. If you don't have one of these, create a test lakehouse by following these steps: [Create a lakehouse](../../data-engineering/create-lakehouse.md).

## Create a shortcut

1. Open your lakehouse or KQL database.

1. Right-click on a directory within the **Explorer** pane.

1. Create a new shortcut from the menu.

   * In a lakehouse, select **New shortcut**, **New table shortcut**, or **New schema shortcut** depending on your lakehouse settings.
   * In a KQL database, select **+** > **New** > **OneLake shortcut**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut-lake-view.png" alt-text="Screenshot showing where to select New shortcut from the Lake view.":::

1. Under **Internal sources**, select **Microsoft OneLake**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing available shortcut sources. The option titled OneLake is highlighted.":::

1. Select the data source that you want to connect to, and then select **Next**.

   :::image type="content" source="media/create-onelake-shortcut/data-source.png" alt-text="Screenshot of the Select a data source type window showing the available data sources to use with the shortcut. The Next button is highlighted." lightbox="media/create-onelake-shortcut/data-source.png":::

   >[!TIP]
   >If you want to connect to data in a different Fabric tenant, follow the steps to create a [Cross-tenant OneLake shortcut](create-cross-tenant-onelake-shortcut.md).

1. Select a **Connection method**:

   * **Pass-through** (default): Each user's own identity is used to access the target data. Continue to the next step.
   * **Delegated identity**: A configured connection identity is used to access the target data instead of each user's identity. If you select this option, select **Connect** and then configure the connection. For more information, see [Delegated authentication](../onelake-shortcut-security.md#delegated-authentication).

     To configure a delegated connection:

     1. Select **Existing connection** and choose a connection from the list, or select **New connection** to create one.
     1. For a new connection, enter the connection details:
       * **Path**: Confirm or enter the OneLake path.
       * **Connection**: Select **Create new connection**.
       * **Connection name**: Enter a recognizable name.
       * **Authentication kind**: Choose **Organizational account** or **Service principal**.
         * For **Organizational account**, select **Sign in** and complete authentication.
             * For **Service principal**, enter the tenant ID, application (client) ID, and client secret.
     1. Select **Next**.

1. Expand **Files** or **Tables** to view the available subfolders. Subfolders in the tables directory that contain valid Delta or Iceberg tables are indicated with a table icon. Files or unidentified folders in the tables section are indicated with a folder icon.

   :::image type="content" source="media/create-onelake-shortcut/table-folder-icons.png" alt-text="Screenshot that shows the expanded Tables and Files directories of a lakehouse.":::

1. Select one or more subfolders to connect to, then select **Next**.

   You can select up to 50 subfolders when creating shortcuts in OneLake.

   :::image type="content" source="media/create-onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the lakehouse.":::

1. Review your selected shortcut locations. Use the edit action to change the default shortcut name. Use the delete action to remove any undesired selections. Select **Create** to generate shortcuts.

   :::image type="content" source="media/create-onelake-shortcut/review-shortcut-selection.png" alt-text="Screenshot of the New shortcut window showing selected shortcut locations and providing the option to delete or rename selections." lightbox="media/create-onelake-shortcut/review-shortcut-selection.png":::

The lakehouse automatically refreshes. The shortcut appears under the selected directory in the **Explorer** pane. You can differentiate a regular file or table from the shortcut from its properties. The properties have a **Shortcut Type** parameter that indicates the item is a shortcut.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol.":::

To edit or delete an existing shortcut, see [Edit or delete a OneLake shortcut](edit-delete-shortcut.md).

## Related content

* [Create a cross-tenant OneLake shortcut](create-cross-tenant-onelake-shortcut.md)
* [Edit or delete a shortcut](edit-delete-shortcut.md)
* [OneLake shortcut security](../onelake-shortcut-security.md)
* [Manage connections for shortcuts](../manage-shortcut-connections.md)
* [Use shortcut REST APIs](../onelake-shortcuts-rest-api.md)
