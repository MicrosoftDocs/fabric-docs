---
title: Understand Eventhouse as an Endpoint
description: 
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

**Eventhouse endpoint with Query Acceleration Policy (QAP)**
Enabling the endpoint adds a new branch in the data source tree showing KQL Database and external tables with QAP, reflecting source schema changes within seconds. Additions, deletions, and updates to tables in the data source are automatically and promptly mirrored in the Eventhouse endpoint. The eventhouse maintains metadata of database structures, listens for schema changes, and ensures high accuracy and timely notifications for updates, defining each schema as one KQL Database.  

**User permissions**
Users with view, contributor, or owner permissions on the parent data source automatically receive view permissions on the Eventhouse, enabling query execution and consumption experiences.

**Embedded KQL Queryset**
Enables query exploration and visual data analysis.

**Disabling the endpoint**
Users can deactivate the Eventhouse Endpoint via the data source interface, reverting the child item to a dormant state and removing optimizations and KQL Database from the tree.  

## Prerequisites

- A [workspace](../../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../../enterprise/licenses.md#capacity)
- An exixting Lakehouse or Data Warehouse.

## Getting Started / Enabling the Eventhouse endpoint

From Fabric > Browse > Lakehouse > Eventhouse as endpoint
From OneLake catalog > analyze data
From Lakehouse > analyze data

## Eventhouse endpoint experience

Every schema at the source is represented by one KQL Database. Changes in the source structure are reflected in Eventhouse with a 10-second delay.  

The Eventhouse structure cannot be updated by users, but settings like cache and retention can be managed.

From the Eventhouse endpoint you can run queries, create visualizations, and perform advanced analytics using KQL or SQL. For more details on using the Eventhouse endpoint, see [Eventhouse overview](eventhouse.md).


## Disabling the Eventhouse endpoint