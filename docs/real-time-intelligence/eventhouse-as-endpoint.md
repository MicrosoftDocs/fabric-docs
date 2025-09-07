---
title: Eventhouse Endpoint for Lakehouse
description: Use an eventhouse endpoint to query Lakehouse tables with enhanced performance and flexibility in Real-Time Intelligence.
ms.reviewer: spelluru
ms.author: tzgitlin
author: tzgitlin
ms.topic: how-to
ms.date: 09/01/2025
---

# Enable eventhouse endpoint for lakehouse

Use the Eventhouse endpoint to query lakehouse data and to discover real-time insights across your data estate and to streamline access and analysis for structured, semi-structured, and unstructured data. Once enabled, the item tracks the source lakehouse data and optimizes it for Eventhouse-like query performance and flexibility. The source data is optimized with [query acceleration policies](query-acceleration-overview.md), and the endpoint is populated with OneLake shortcuts that can be queried as external tables. The eventhouse shortcuts are automatically updated as the source lakehouse schema evolves.

By enabling the Eventhouse endpoint, lakehouse users gain:

* **Instant schema sync**: The endpoint syncs tables and schema changes within seconds. No manual setup required. See the list of [sync statuses](#sync-statuses).
* **Mirrored schema**: Access current and future source Lakehouse data through a mirrored schema in a dedicated KQL database view.
* **Rich consumption and visualization options**: Use Copilot and NL2KQL, dashboards, embedded queries, and visual data exploration.
* **Reflected in lakehouse and workhouse tree**: The endpoint is added as a new branch to your lakehouse data source tree and provides a managed Eventhouse item that evolves with your data.
* **Fast, scalable queries**: Run analytics in KQL or SQL using advanced operators and commands.
* **Advanced insights**: Run time series analysis, detect anomalies, and use Python for complex processing.

## Permissions

Users with contributor or owner permissions on the parent data source receive contributor permissions for the Eventhouse endpoint, allowing them to manage settings like cache and retention.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* An existing Lakehouse containing tables with a [query acceleration policy](query-acceleration-overview.md).

## Enable the eventhouse endpoint

You can enable the Eventhouse endpoint from either your Fabric workspace or your OneLake catalog.

1. Navigate to your **Fabric workspace** or **OneLake catalog** and browse to the Lakehouse you want to query in an Eventhouse.

1. Right-click the more options menu **...** and select **Eventhouse endpoint**.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-workspace.png" alt-text="Screenshot showing how to enable the Eventhouse endpoint from a Lakehouse listed in the workspace.":::

1. A new Eventhouse tab opens with a welcome message. **Close** the message to view the new Eventhouse.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome-small.png" alt-text="Screenshot showing the welcome message for the Eventhouse endpoint." lightbox="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome.png":::

## Eventhouse endpoint structure

A new Eventhouse endpoint is created with the following characteristics:

* The Eventhouse is named **Eventhouse Endpoint** and is read-only.
* The KQL database is named **<LakehouseName>_EventhouseEndpoint**
* The embedded KQL queryset is named **<LakhouseName>_EventhouseEndpoint_queryset**
* The shortcuts are references to the OneLake external tables. Each shortcut can be queried directly by using the external_table function.

The Onelake catalog displays the Eventhouse endpoint and the KQL Database as child items of the Lakehouse.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-structure.png" alt-text="Screenshot showing the Eventhouse endpoint and KQL database as child items of the Lakehouse in the OneLake catalog.":::

## Performance and sync status

The Eventhouse endpoint can be used immediately after creation. The first queries may take longer to execute as the data is being cached. Subsequent queries when the data is fully synched, are faster. Review the sync status in the System Overview and Databases page, and in each external table shortcut. See the list of [sync statuses](#sync-statuses).

## Sync statuses

The Eventhouse endpoint syncs the source Lakehouse tables and schema changes within seconds. The sync status is displayed in the System Overview and databases page, and in each table shortcut.

Example of sync status in the System Overview and databases page:

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-sync-status.png" alt-text="Screenshot showing the sync status in the System Overview and databases page.":::

**Sync statuses for the eventhouse endpoint**:

| Sync status | Desription |
|--|--|
| synced | All OneLake shortcuts are synchronized. Source link: {link} |
| workInProgress | Synchronization in progress. ${syncing} of ${total} OneLake shortcuts are currently syncing. Some OneLake shortcuts are still warming up. Source link: {link} |

**Sync statuses for each OneLake shortcut**:

| Sync status | Desription |
|--|--|
| synced | This shortcut is fully synchronized. Over 98% of the data is in sync with the source. Source link: {link} |
| workInProgress | Synchronization is underway. Between 20% and 98% of the data is currently synced with the source. Source link: {link} |
| warmingUp | Synchronization is in progress. Less than 20% of the data is currently synced with the source. Source link: {link} |

## Query the eventhouse endpoint

From the Eventhouse endpoint you can run queries, create [visualizations](dashboard-real-time-create.md), and perform advanced analytics using KQL or SQL.

When running queries in the KQL queryset, use the [external_table()](/kusto/query/external-table-function?view=azure-data-explorer&preserve-view=true) function.

## Sharing the endpoint KQL database

When sharing one or more KQL databases in the eventhouse endpoint, you need to configure the sharing settings for both the Eventhouse and for the source data in the Lakehouse.

## Disable the endpoint

Users can remove the Eventhouse endpoint from the Workspace or from the OneLake catalog.

1. Navigate to your Fabric workspace.

1. Browse to the Lakehouse with the Eventhouse endpoint enabled.

1. Right-click the child Eventhouse endpoint item, and select **Delete**.

## Re-enable the endpoint

If you want to re-enable the Eventhouse endpoint after deletion, you can do so by following the steps in the [Enable the eventhouse endpoint](#enable-the-eventhouse-endpoint) section. If the endpoint is still being deleted, an error message asks you to wait a few seconds before trying again.

:::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-deleted.png" alt-text="Message stating that the endpoint is being deleted and to wait a few seconds.":::

## Related content

* [What is Eventhouse?](what-is-eventhouse.md)
* [OneLake shortcuts in a KQL database](onelake-shortcuts.md)
* [Query acceleration overview](query-acceleration-overview.md)
