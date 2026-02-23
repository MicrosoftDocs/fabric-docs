---
title: Include file for Eventhouse Endpoint in Lakehouse and Data Warehouse
description: Include file for Eventhouse Endpoint in Lakehouse and Data Warehouse.
author: spelluru
ms.author: spelluru
ms.topic: include
ms.date: 02/23/2026
---

The Lakehouse and Data Warehouse main pages include Eventhouse Endpoint as part of the **Analyze data with** menu. The Eventhouse Endpoint provides an Eventhouse-powered query experience directly on top of Lakehouse and Data Warehouse data, without data duplication or manual synchronization.

:::image type="content" source="media/analyze-data-with.png" alt-text="Screenshot of the analyze data with button expanded to see the SQL endpoint, eventhouse endpoint, and notebook options.":::

When you enable the Eventhouse Endpoint, an Eventhouse and a KQL database are automatically created as child artifacts of the source Lakehouse or Warehouse, with schema synchronization handled in the background. The endpoint always reflects the current schema of the source data, enabling near-real-time analytical access.

From Lakehouse or Data Warehouse, you can:

- Open Eventhouse directly from the source data experience, without navigating to a separate workload.
- Analyze data using SQL Endpoint.
- Analyze data using notebooks, including both new and existing notebooks.

This integration makes Eventhouse a natural extension of the data source, rather than a separate system you need to set up and manage. For more information about the Eventhouse Endpoint, see [Enable Eventhouse endpoint for lakehouse and data warehouse](eventhouse-as-endpoint.md).