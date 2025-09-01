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

Use the Eventhouse endpoint for lakehouse to query lakehouse tables with high performance and flexibility. It’s ideal for discovering real-time insights across your data estate and streamlines access and analysis for structured, semi-structured, and unstructured data.

Enabling the Eventhouse endpoint creates a managed Eventhouse child item that is linked to data source, and automatically syncs tables and schema changes, providing a seamless and efficient querying experience.

By enabling the Eventhouse Endpoint, lakehouse users gain:

* **Instant schema sync**: The endpoint syncs tables and schema changes within seconds. No manual setup required.

* **Fast, scalable queries**: Run analytics in KQL or SQL using advanced operators and commands.

* **Advanced insights**: Run time series analysis, detect anomalies, and use Python for complex processing.

* **Unified experience**: Access current and future source data through a mirrored schema in a dedicated KQL database view. the , and use [Query Acceleration Policy](query-acceleration-overview.md) on external tables

* **Rich consumption and visualization options**: Use Copilot and NL2KQL, dashboards, embedded queries, and visual data exploration.

* **Reflected in lakehouse tree**: The endpoint is added as a new branch to your lakehouse data source tree and provides a managed Eventhouse item that evolves with your data.

## Seamless enablement, mirrored schema

Once you enable the Eventhouse Endpoint in one click, you’ll see a new Eventhouse, named Eventhouse Endpoint, containing an embedded KQL queryset, and showing OneLake shortcuts to tables with Query Acceleration policies, automatically synced and ready for querying.

Enabling the endpoint adds a new branch to the Lakehouse data source tree. The branch shows the KQL database and external tables with query acceleration policy and reflects source schema changes within seconds.

// diagram of LH structure vs EH structure or image of both structures

**User permissions**

Users with view, contributor, or owner permissions on the parent data source automatically receive view permissions for the Eventhouse, enabling query execution and consumption experiences.

## Prerequisites

- A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
- An existing Lakehouse containing tables with a [query acceleration policy](query-acceleration-overview.md).

## Enable the eventhouse endpoint

Once enabled, the item forever tracks the source Lakehouse data and optimizes it for Eventhouse-like query performance and flexibility.

1. Navigate to your Fabric workspace or OneLake catalog and find the **Lakehouse** you want to query.

1. Right-click the more options menu **...** and select **Eventhouse endpoint**.

    :::image type="content" source="media/eventhouse-endpoint-for-lakehouse/eventhouse-endpoint-workspace.png" alt-text="Screenshot showing how to enable the Eventhouse endpoint from a Lakehouse listed in the workspace.":::

1. A new Eventhouse tab opens with a welcome to the eventhouse endpoint message. Close the message to view the new Eventhouse.

    - The Eventhouse is named **Eventhouse Endpoint** 
    - The Eventhouse contains an embedded KQL queryset named **<LakhouseName>_EventhouseEndpoint**
    - The Lakehouse tables with query acceleration policies are listed as external tables under the KQL database shortcuts.
        
        //image
        :::image type="content" source="media/eventhouse/enabled-endpoint.png" alt-text="Screenshot showing the enabled Eventhouse endpoint under a Lakehouse." lightbox="media/eventhouse/enabled-endpoint.png":::

## Eventhouse endpoint experience

Every schema at the source is represented by one KQL Database. Changes in the source structure are reflected in Eventhouse with a 10-second delay.  

The Eventhouse structure cannot be updated by users, but settings like cache and retention can be managed.

From the Eventhouse endpoint you can run queries, create visualizations, and perform advanced analytics using KQL or SQL. For more details on using the Eventhouse endpoint, see [Eventhouse overview](eventhouse.md).

## Disable the endpoint

Users can remove the Eventhouse endpoint from the Workspace or from the OneLake catalog.

1. Navigate to your Fabric workspace.

1. Browse to the Lakehouse with the Eventhouse endpoint enabled.

1. Right-click the child Eventhouse endpoint item, and select **Delete**.
