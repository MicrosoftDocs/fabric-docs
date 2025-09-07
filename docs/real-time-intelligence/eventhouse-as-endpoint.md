---
title: Eventhouse Endpoint for Lakehouse
description: Use an eventhouse endpoint to query Lakehouse tables with enhanced performance and flexibility in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.date: 09/01/2025
---

# Enable Eventhouse endpoint for lakehouse

Use the Eventhouse endpoint to query lakehouse data, discover real-time insights across your data estate, and streamline analysis of structured, semi-structured, and unstructured data. After you enable the endpoint, it tracks the source lakehouse data and optimizes it for Eventhouse-like performance and flexibility. [Query acceleration policies](query-acceleration-overview.md) optimize the source data, and the endpoint adds OneLake shortcuts that you query as external tables. Eventhouse shortcuts update automatically as the source lakehouse schema changes.

## Benefits

Enable the Eventhouse endpoint to get:

* **Instant schema sync**: The endpoint syncs tables and schema changes within seconds with no manual setup. See the list of [sync statuses](#sync-statuses).
* **Mirrored schema**: Access current and future Lakehouse data through a mirrored schema in a dedicated KQL database view.
* **Rich consumption and visualization options**: Use Copilot, NL2KQL, dashboards, embedded queries, and visual data exploration.
* **Reflected in Workspace and OneLake catalog trees**: The endpoint eventhouse and database appear as new branches in your lakehouse tree.
* **Fast, scalable queries**: Run analytics in KQL or SQL using advanced external table operators and commands.
* **Advanced insights**: Run time series analysis, detect anomalies, and use Python for advanced processing.

## Performance

Use the Eventhouse endpoint immediately after you create it. Within 10 seconds, the data is fully synced. The first queries can run more slowly while the service caches data. After the data is fully synced, later queries run faster. Check the sync status on the **System Overview** or **Databases** page, and check the status for each shortcut. See [sync statuses](#sync-statuses).

## Permissions

Users with contributor or owner permission on the parent data source get contributor permission on the Eventhouse endpoint. They can manage cache and retention settings.

## Sharing

To be able to share the endpoint, configure sharing settings for both the KQL database and the Lakehouse source data.

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) in a [capacity](../enterprise/licenses.md#capacity) with Microsoft Fabric enabled
* A Lakehouse with tables in your workspace or in your OneLake catalog

## Enable the Eventhouse endpoint

Enable the Eventhouse endpoint from your Fabric workspace or your OneLake catalog.

1. Go to your **Fabric workspace** or **OneLake catalog**, then open the Lakehouse you want to query in an Eventhouse.

1. Open the more options menu **...** and select **Eventhouse endpoint**.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-workspace.png" alt-text="Screenshot of enabling the Eventhouse endpoint from a Lakehouse listed in the workspace.":::

1. A new **Eventhouse Endpoint** opens with a welcome message. Select **Close** to view the Eventhouse.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome-small.png" alt-text="Screenshot of the welcome message for the Eventhouse endpoint." lightbox="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome.png":::

The new Eventhouse endpoint has these characteristics:

* The Eventhouse is named **Eventhouse Endpoint** and is read-only.
* The KQL database is named **<Lakehouse_Name>_EventhouseEndpoint**.
* The embedded KQL queryset is named **<Lakehouse_Name>_EventhouseEndpoint_queryset**.
* Shortcuts reference OneLake external tables. Query each shortcut directly by using the external_table function.

The workspace and the OneLake catalog show the endpoint and the KQL database as child items of the Lakehouse.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-structure.png" alt-text="Screenshot of the Eventhouse endpoint and KQL database as child items of the Lakehouse in the OneLake catalog.":::

## Query the Eventhouse endpoint

From the Eventhouse endpoint, run queries, create [visualizations](dashboard-real-time-create.md), and perform advanced analytics using KQL or SQL. In the KQL queryset, use the [external_table()](/kusto/query/external-table-function?view=azure-data-explorer&preserve-view=true) function.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-query.png" alt-text="Screenshot of the KQL queryset with a get external table schema query.":::

## Disable the endpoint

Remove the Eventhouse endpoint from the workspace or the OneLake catalog.

1. Go to your Fabric workspace.

1. Go to the Lakehouse that has the Eventhouse endpoint enabled.

1. Open the shortcut menu for the Eventhouse endpoint item, and select **Delete**.

## Re-enable the endpoint

[Enable the eventhouse endpoint](#enable-the-eventhouse-endpoint)

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-deleted.png" alt-text="Message stating that the endpoint is being deleted and to wait a few seconds.":::

## Sync statuses

The Eventhouse endpoint syncs the source Lakehouse tables and schema changes within seconds. The sync status is displayed in the System Overview and databases page, and in each table shortcut. Here is an example of a sync status:

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-sync-status.png" alt-text="Screenshot showing the sync status in the System Overview and databases page.":::

**Sync statuses for the eventhouse endpoint**:

| Sync status | Desription |
|--|--|
| synced | All OneLake shortcuts are synchronized. Source link: {link} |
| workInProgress | Synchronization in progress. ${syncing} of ${total} OneLake shortcuts are currently syncing. Some OneLake shortcuts are still warming up. Source link: {link} |

**Sync statuses for shortcuts**:

| Sync status | Desription |
|--|--|
| synced | This shortcut is fully synchronized. Over 98% of the data is in sync with the source. Source link: {link} |
| workInProgress | Synchronization is underway. Between 20% and 98% of the data is currently synced with the source. Source link: {link} |
| warmingUp | Synchronization is in progress. Less than 20% of the data is currently synced with the source. Source link: {link} |

## Related content

* [Eventhouse overview](eventhouse.md)
* [OneLake shortcuts in a KQL database](onelake-shortcuts.md)
* [Query acceleration overview](query-acceleration-overview.md)
