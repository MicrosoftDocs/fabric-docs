---
title: Eventhouse Endpoint for Lakehouse
description: Use an eventhouse endpoint to query Lakehouse tables with enhanced performance and flexibility in Real-Time Intelligence.
ms.reviewer: spelluru
ms.author: tzgitlin
author: tzgitlin
ms.topic: how-to
ms.date: 09/01/2025
---

# Eventhouse endpoint for lakehouse

Use the Eventhouse endpoint for lakehouse to query lakehouse tables with high performance and flexibility. It’s ideal for discovering real-time insights across your data and streamlines access and analysis for structured, semi-structured, and unstructured data.

By enabling the Eventhouse endpoint, lakehouse users gain:

* **Instant schema sync**: The endpoint syncs tables and schema changes within seconds. No manual setup required.

* **Fast, scalable queries**: Run analytics in KQL or SQL using advanced operators and commands.

* **Advanced insights**: Run time series analysis, detect anomalies, and use Python for complex processing.

* **Unified experience**: Access current and future source Lakehouse data through a mirrored schema in a dedicated KQL database view. Use [Query Acceleration Policy](query-acceleration-overview.md) on external tables.

* **Rich consumption and visualization options**: Use Copilot and NL2KQL, dashboards, embedded queries, and visual data exploration.

* **Reflected in lakehouse tree**: The endpoint is added as a new branch to your lakehouse data source tree and provides a managed Eventhouse item that evolves with your data.

## Permissions

Users with view, contributor, or owner permissions on the parent data source automatically receive view permissions for the Eventhouse endpoint, enabling query execution and consumption experiences.

## Prerequisites

* A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity).
* Write permissions to the workspace. 
* An existing Lakehouse containing tables with a [query acceleration policy](query-acceleration-overview.md).

## Enable the eventhouse endpoint

Once enabled, the item tracks the source Lakehouse data and optimizes it for Eventhouse-like query performance and flexibility.

1. Navigate to your **Fabric workspace** or **OneLake catalog** and find the Lakehouse* you want to query.

1. Right-click the more options menu **...** and select **Eventhouse endpoint**.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-workspace.png" alt-text="Screenshot showing how to enable the Eventhouse endpoint from a Lakehouse listed in the workspace.":::

1. A new Eventhouse tab opens with a welcome to the eventhouse endpoint message. **Close** the message to view the new Eventhouse.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome-small.png" alt-text="Screenshot showing the welcome message for the Eventhouse endpoint." lightbox="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-welcome.png":::

    * The Eventhouse is named **Eventhouse Endpoint**
    * The Eventhouse opens in viewing mode
    * The Eventhouse contains an embedded KQL queryset named **<LakhouseName>_EventhouseEndpoint_queryset**
    * The Lakehouse tables with query acceleration policies are listed as external tables under the KQL database **Shortcuts**
    * In the eventhouse System Overview and databases page, you see the synchronization status and a link to the source Lakehouse.
    * In the table shortcut, you see the table schema, a preview of the data, and the sync status of the table.

        //image
        :::image type="content" source="media/eventhouse/enabled-endpoint.png" alt-text="Screenshot showing the enabled Eventhouse endpoint under a Lakehouse." lightbox="media/eventhouse/enabled-endpoint.png":::

## Query the Eventhouse endpoint

Every source schema is represented by one KQL Database. Changes in the source structure are reflected in the Eventhouse with a 10-second delay.  

The Eventhouse structure cannot be updated by users, but settings like cache and retention can be managed.

From the Eventhouse endpoint you can run queries, create visualizations, and perform advanced analytics using KQL or SQL. For more details on using the Eventhouse endpoint, see [Eventhouse overview](eventhouse.md).

## Disable the endpoint

Users can remove the Eventhouse endpoint from the Workspace or from the OneLake catalog.

1. Navigate to your Fabric workspace.

1. Browse to the Lakehouse with the Eventhouse endpoint enabled.

1. Right-click the child Eventhouse endpoint item, and select **Delete**.

## Sync status

The Eventhouse endpoint syncs the source Lakehouse tables and schema changes within seconds. The sync status is displayed in the System Overview and databases page, as well as in each table shortcut.

These are the possible sync statuses: 