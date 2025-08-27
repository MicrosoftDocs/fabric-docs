---
title: Understand Eventhouse as an Endpoint
description: Use an eventhouse endpoint to query Lakehouse tables with enhanced performance and flexibility in Real-Time Intelligence.
ms.reviewer: spelluru
ms.author: tzgitlin
author: tzgitlin
ms.topic: how-to
ms.date: 08/27/2025
---

# Eventhouse as an endpoint

The Eventhouse endpoint enables users to query Lakehouse tables with enhanced performance and flexibility, supporting multiple query languages and data formats. Enabling the Eventhouse endpoint creates a managed Eventhouse child item linked to the data source, which automatically syncs tables and schema changes, providing a seamless and efficient querying experience.

Use this endpoint to:

- Automatically sync and query source tables with no manual setup.
- Run fast, scalable analytics on structured and semi-structured data.
- Use time-series, anomaly detection, and even embedded Python for advanced insights.
- Access all current and future source data directly from the Eventhouse experience.

**Mirrored schema**

Enabling the endpoint adds a new branch to the Lakehouse data source tree. The branch shows the KQL database and external tables with query acceleration (QAP) and reflects source schema changes within seconds.

// diagram of LH structure vs EH structure or image of both structures

**User permissions**

Users with view, contributor, or owner permissions on the parent data source automatically receive view permissions on the Eventhouse, enabling query execution and consumption experiences.

**Embedded KQL Queryset**

Enables query exploration and visual data analysis.

**Disabling the endpoint**

Users can remove the Eventhouse endpoint from the Workspace or from the OneLake catalog.  

## Prerequisites

- A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
- An exixting Lakehouse or Data Warehouse.

## Get Started

There are multiple ways to enable the Eventhouse endpoint:

**From your Fabric workspace:**

1. Navigate to your Fabric workspace.

1. Browse to the Lakehouse you want to enable the Eventhouse endpoint for.

1. Click the more options mene select ** Eventhouse endpoint**.

        //image
        :::image type="content" source="media/eventhouse/enable-endpoint.png" alt-text="Screenshot showing how to enable the Eventhouse endpoint from a Lakehouse." lightbox="media/eventhouse/enable-endpoint.png":::

1. A new Eventhouse endpoint child item is created under the Lakehouse item.
        
        //image
        :::image type="content" source="media/eventhouse/enabled-endpoint.png" alt-text="Screenshot showing the enabled Eventhouse endpoint under a Lakehouse." lightbox="media/eventhouse/enabled-endpoint.png":::

**From the OneLake catalog:**

TBD

**From a Lakehouse**

 TBD analyze data

## Eventhouse endpoint experience

Every schema at the source is represented by one KQL Database. Changes in the source structure are reflected in Eventhouse with a 10-second delay.  

The Eventhouse structure cannot be updated by users, but settings like cache and retention can be managed.

From the Eventhouse endpoint you can run queries, create visualizations, and perform advanced analytics using KQL or SQL. For more details on using the Eventhouse endpoint, see [Eventhouse overview](eventhouse.md).

## Disable the endpoint

The user can remove the eventhouse endpoint from both the OneLake catalog or from the Workpace:

1. Navigate to your Fabric workspace.

1. Browse to the Lakehouse with the Eventhouse endpoint enabled.

1. Right-click the child Eventhouse endpoint item, and select **Delete**.
