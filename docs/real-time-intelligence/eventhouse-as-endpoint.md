---
title: Eventhouse Endpoint for Lakehouse
description: Use an eventhouse endpoint to query Lakehouse tables with enhanced performance and flexibility in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.date: 09/16/2025
---

# Enable Eventhouse endpoint for lakehouse

The Eventhouse endpoint for lakehouse is a powerful capability in Microsoft Fabric that enables users to query Lakehouse tables with exceptional speed and ease.

Use the Eventhouse endpoint to query lakehouse data, discover real-time insights across your data estate, and streamline analysis of structured, semi-structured, and unstructured data.

## Benefits

Enable the Eventhouse endpoint to get:

* **Instant schema sync**: The endpoint syncs tables and schema changes within seconds with no manual setup. See the list of [sync statuses](#sync-statuses).
* **Mirrored schema**: Access current and future Lakehouse data through a mirrored schema in a dedicated KQL database view.
* **Rich consumption and visualization options**: Use Copilot, NL2KQL, dashboards, embedded queries, and visual data exploration.
* **Reflected in Workspace and OneLake catalog trees**: The endpoint eventhouse and database appear as new branches in your lakehouse tree.
* **Fast, scalable queries**: Run analytics in KQL or SQL using advanced table operators and commands.
* **Advanced insights**: Run time series analysis, detect anomalies, and use Python for advanced processing.

After you enable the endpoint, it tracks the source lakehouse data and optimizes it for Eventhouse-like performance and flexibility. Each lakehouse table is attached to a [OneLake shortcut](onelake-shortcuts.md) in the Eventhouse endpoint with [Query acceleration policies](query-acceleration-overview.md) that optimize the source data. <!-- Eventhouse shortcuts update automatically as the source lakehouse schema changes.-->

## Performance

Use the Eventhouse endpoint immediately after you create it. The first queries can run more slowly while the service caches data. Within 10 seconds, the endpoint is fully synced. As more data is cached, the query performance improves. You can check the sync status on the **System Overview** or **Databases** page, and check the status for each **Shortcut**. See [sync statuses](#sync-statuses).

## Permissions

Users with contributor or owner permission on the parent data source get contributor permission on the Eventhouse endpoint. They can manage cache and retention settings.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) in a [capacity](../enterprise/licenses.md#capacity) with Microsoft Fabric enabled
* A Lakehouse with tables in your workspace or in your OneLake catalog

## Enable the Eventhouse endpoint

After you enable the endpoint, it appears as a child item of the Lakehouse in both the workspace and the OneLake catalog.

1. Select the Lakehouse you want to query. You can enable the Eventhouse endpoint from your Fabric workspace, your OneLake catalog, or from the Lakehouse ribbon.

    * From your Fabric **Workspace**, browse to the **Lakehouse**, and from the more options menu **...** select **Eventhouse endpoint**.

      :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-workspace.png" alt-text="Screenshot of enabling the Eventhouse endpoint from the Workspace.":::

    * From the **OneLake catalog**, browse to the **Lakehouse**, and from the more options menu **...** select **Eventhouse endpoint**.

      :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-catalog.png" alt-text="Screenshot of enabling the Eventhouse endpoint from the OneLake catalog."::: 

    * From the **OneLake catalog**, select the **Lakehouse**, and from the Lakehouse toolbar select **Analyze Data** > **Eventhouse endpoint**.

      :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-ribbon.png" alt-text="Screenshot of enabling the Eventhouse endpoint from the Lakehouse ribbon." lightbox="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-ribbon.png":::

1. The **Eventhouse Endpoint** opens with a welcome message. Select **Close** to view and start querying the Eventhouse.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome-small.png" alt-text="Screenshot of the welcome message for the Eventhouse endpoint." lightbox="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome.png":::

The new Eventhouse endpoint has these characteristics:

* The Eventhouse is named **Eventhouse Endpoint** and is read-only.
* The KQL database is named **<Lakehouse_Name>_EventhouseEndpoint**.
* The embedded KQL queryset is named **<Lakehouse_Name>_EventhouseEndpoint_queryset**.
* Shortcuts reference OneLake tables.
  * Query each shortcut directly by using the table function.
  * If the lakehouse has multiple schemas, the schema name shows in each shortcut name. For example, if the schemas are `sales` and `marketing` and each has a table named `customers`, the shortcuts are `sales_customers` and `marketing_customers`.

The workspace and the OneLake catalog show the endpoint and the KQL database as child items of the Lakehouse.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-structure.png" alt-text="Screenshot of the Eventhouse endpoint and KQL database as child items of the Lakehouse in the OneLake catalog.":::

## Query the Eventhouse endpoint

From the Eventhouse endpoint, run queries, create [visualizations](dashboard-real-time-create.md), and perform advanced analytics using KQL or SQL.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-query.png" alt-text="Screenshot of the KQL queryset with a get table schema query." lightbox="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-query.png":::

## Share the Eventhouse endpoint

To be able to share the Eventhouse endpoint with other users, you need to configure the share settings for both the source data and the endpoint. You can share the Eventhouse endpoint, or the KQL database.

1. Share the data warehouse or the lakehouse. See [Share your data and manage permissions](../data-warehouse/share-warehouse-manage-permissions.md) or [How lakehouse sharing works](../data-engineering/lakehouse-sharing.md).

1. Share the Eventhouse endpoint or the KQL database. See [Share an eventhouse](create-eventhouse.md#share-an-eventhouse) or [Share a KQL database link](access-database-copy-uri.md#share-a-kql-database-link).

## Disable the Eventhouse endpoint

Remove the Eventhouse endpoint from the workspace or the OneLake catalog. The Eventhouse endpoint and the KQL database are deleted. The Lakehouse remains unchanged.

1. Open the Fabric workspace.

1. Browse to the Eventhouse Endpoint branch of the Lakehouse tree, and from the more options menu **...** select **Delete**.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-delete.png" alt-text="Screenshot of the Lakehouse tree with the more options menu open and Delete highlighted.":::

1. In the confirmation dialog, select **Delete**.

## Re-enable the Eventhouse endpoint

If you delete the Eventhouse endpoint, you can re-enable it at any time. The new endpoint creates a new Eventhouse and KQL database. The new database doesn't retain any previous queries, visualizations, or dashboards. If you try to re-enable the endpoint while the previous endpoint is still being deleted, you see a message to wait a few seconds. After the previous endpoint is deleted, you can re-enable it.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-deleted.png" alt-text="Message stating that the endpoint is being deleted and to wait a few seconds.":::

## Sync statuses

The Eventhouse endpoint syncs the source Lakehouse tables and schema changes within seconds. The sync status is displayed in the System Overview and databases page, and in each table shortcut. Here's an example of a sync status:

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-sync-status.png" alt-text="Screenshot showing the sync status in the System Overview and databases page.":::

**Sync statuses for the Eventhouse endpoint**:

| Sync status | Desription |
|--|--|
| synced | All OneLake shortcuts are synchronized. Source link: {link} |
| workInProgress | Synchronization in progress. ${syncing} of ${total} OneLake shortcuts are currently syncing. Some OneLake shortcuts are still warming up. Source link: {link} |
| warmingUp | Eventhouse endpoint is warming up. More than 50% of some OneLake shortcuts are warming up. The system is aligning with the source engine. Source link: {link} |

**Sync statuses for shortcut**:

| Sync status | Desription |
|--|--|
| synced | This shortcut is fully synchronized. Over 98% of the data is in sync with the source. Source link: {link} |
| workInProgress | Synchronization is underway. Between 20% and 98% of the data is currently synced with the source. Source link: {link} |
| warmingUp | Synchronization is in progress. Less than 20% of the data is currently synced with the source. Source link: {link} |

## Considerations and limitations

* You can't currently enable the Eventhouse endpoint from within an open lakehouse.
* The System overview page of the Eventhouse endpoint doesn't show any statistics.
* Updates to the Eventhouse endpoint cache policy aren't supported
* Changing the source table schema won't be reflected at the Eventhouse endpoint.

## Related content

* [Eventhouse overview](eventhouse.md)
* [OneLake shortcuts in a KQL database](onelake-shortcuts.md)
* [Query acceleration overview](query-acceleration-overview.md)
