---
title: Include file for Eventhouse Endpoint in Analyze data menu
description: Include file for Eventhouse Endpoint in in Analyze data menu.
author: spelluru
ms.author: spelluru
ms.reviewer: tzgitlin, salilkanade, wiassaf
ms.topic: include
ms.date: 02/25/2026
---

The Lakehouse and Warehouse main pages include Eventhouse endpoint as part of the **Analyze data with** menu. The Eventhouse endpoint provides an Eventhouse-powered query experience directly on top of Lakehouse and Warehouse data, without data duplication or manual synchronization.

:::image type="content" source="media/analyze-data-with.png" alt-text="Screenshot of the analyze data with button expanded to see the SQL analytics endpoint, eventhouse endpoint, and notebook options.":::

When you enable the Eventhouse endpoint, an Eventhouse and a KQL database are automatically created as child items of the source Lakehouse or Warehouse, with schema synchronization handled in the background. The endpoint always reflects the current schema of the source data, enabling near-real-time analytical access.

This integration makes Eventhouse a natural extension of the data source, rather than a separate system you need to set up and manage. For more information about the Eventhouse Endpoint, see [Enable Eventhouse endpoint for lakehouse and warehouse](../real-time-intelligence/eventhouse-as-endpoint.md).