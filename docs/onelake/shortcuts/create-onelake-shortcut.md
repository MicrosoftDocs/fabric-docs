---
title: Create a OneLake shortcut
description: Learn how to create a OneLake shortcut inside a Fabric lakehouse or KQL database, including how to choose between pass-through and delegated authentication.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 06/29/2026
ai-usage: ai-assisted
#customer intent: As a data engineer, I want to learn how to create a OneLake shortcut inside a Fabric lakehouse so that I can efficiently access and manage data within the lakehouse.
---

# Create an internal OneLake shortcut

In this article, you learn how to create a OneLake shortcut inside a Fabric item. You can use a lakehouse or a Kusto Query Language (KQL) database as the source for your shortcut.

For an overview of shortcuts, see [OneLake shortcuts](../onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts/create-shortcut?tabs=HTTP).

## Prerequisite

A lakehouse or KQL database in OneLake. If you don't have one of these, create a test lakehouse by following these steps: [Create a lakehouse](../../data-engineering/create-lakehouse.md).

## Create a shortcut

1. Open your lakehouse or KQL database.

1. Right-click on a directory within the **Explorer** pane.

1. Create a new shortcut from the menu.

   * In a lakehouse, select **New shortcut**, **New table shortcut**, or **New schema shortcut** depending on your lakehouse settings.
   * In a KQL database, select **+** > **New** > **OneLake shortcut**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut-lake-view.png" alt-text="Screenshot showing where to select New shortcut from the Lake view.":::

## Select a source

You can select a data source from the same tenant or tenant outside of your organization. Choose the steps that match your scenario:

* [Same-tenant source](#same-tenant-source)
* [Cross-tenant source](#cross-tenant-source)

### Same-tenant source

Use the following steps to create a shortcut to data in your own Fabric tenant.

1. Under **Internal sources**, select **Microsoft OneLake**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing available shortcut sources. The option titled OneLake is highlighted.":::

1. Select the data source that you want to connect to, and then select **Next**.

   :::image type="content" source="media/create-onelake-shortcut/data-source.png" alt-text="Screenshot of the Select a data source type window showing the available data sources to use with the shortcut. The Next button is highlighted." lightbox="media/create-onelake-shortcut/data-source.png":::

1. Select a **Connection method**:

   * **Pass-through** (default): Each user's own identity is used to access the target data. Continue to the next step.
   * **Delegated identity**: A configured connection identity is used to access the target data instead of each user's identity. If you select this option, select **Connect** and then configure the connection. For more information, see [Authentication](#authentication).

     To configure a delegated connection:

     1. Select **Existing connection** and choose a connection from the list, or select **New connection** to create one.
     1. For a new connection, enter the connection details:
       * **Path**: Confirm or enter the OneLake path.
       * **Connection**: Select **Create new connection**.
       * **Connection name**: Enter a recognizable name.
       * **Authentication kind**: Choose **Organizational account** or **Service principal**.
         * For **Organizational account**, select **Sign in** and complete authentication.
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

### Cross-tenant source

Use the following steps to create a shortcut to data in another Fabric tenant. You provide a connection path to external OneLake data and authenticate with an identity from that tenant. Downstream users of the shortcut can access the external data through the configured delegated identity.

If you don't have an identity in the other Fabric tenant, like if you want to use data from an external partner or customer, use [external data sharing](../../governance/external-data-sharing-overview.md) instead.

1. Under **Internal sources**, select **Microsoft OneLake**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing available shortcut sources. The option titled OneLake is highlighted.":::

1. On the **Create a shortcut to data in another tenant?** banner, select **Enter connection details**.

   :::image type="content" source="./media/create-onelake-shortcut/tenant-enter-connection-details.png" alt-text="Screenshot that shows the button to enter connection details to OneLake in an external tenant.":::

1. Select **Existing connection** and choose a connection from the list, or select **New connection** to create one.

   * For a new connection, enter the connection details:
     * **Path**: Enter the OneLake path from the external tenant.
     * **Connection**: Select **Create new connection**.
     * **Connection name**: Enter a recognizable name.
     * **Authentication kind**: Select **Organizational account** or **Service principal**.
       * For **Organizational account**, select **Sign in** and complete authentication with an account that has access to the external tenant's data.

1. Select **Next**.

1. In the **Microsoft OneLake (Cross-tenant)** page, browse the external data source.

1. Select the folders or tables to include, then select **Next** to review and create the shortcut.

## Authentication

OneLake shortcuts support two authentication methods: pass-through and delegated identity.

* **Pass-through** (default): When a user reads the shortcut, Fabric accesses the target data by using that signed-in user's identity. Each user needs individual permissions on the source data.

* **Delegated identity**: The shortcut uses a configured connection identity (organizational account or service principal) to access the target data, instead of the signed-in user's identity. This approach provides consistent data access across Fabric items and workspaces without requiring each user to have individual permissions on the source.

Use delegated authentication when the default pass-through behavior doesn't match the access pattern you want for your data. For example, instead of managing individual access for downstream business users, a delegated shortcut can use a fixed connection identity that represents a business unit. This approach gives the business unit flexibility to manage [OneLake security](../security/get-started-onelake-security.md) access for their end users while still honoring the security controls applied to the connection identity.

For more information about how these authentication models interact with OneLake security, see [OneLake shortcut security](../onelake-shortcut-security.md#shortcut-auth-models).

### Delegated shortcut considerations

* Delegated authentication is optional. If you don't select it, the shortcut uses the passthrough authentication by default.
* Cross-tenant shortcuts always use delegated authentication.
* The configured connection identity needs access to the target data.
* To switch an existing shortcut between passthrough and delegated authentication, delete and recreate the shortcut with the desired authentication method.
* Delegated shortcuts support column-level security (CLS) on both the target and the shortcut itself.
* Delegated shortcuts support row-level security (RLS) on the target data only.

## Related content

* [Edit or delete a shortcut](edit-delete-shortcut.md)
* [OneLake shortcut security](../onelake-shortcut-security.md)
* [Manage connections for shortcuts](../manage-shortcut-connections.md)
* [Use shortcut REST APIs](../onelake-shortcuts-rest-api.md)
