---
title: Add Kusto data to a map
description: Learn how to create layers using Kusto Tables, Functions, and Materialized Views in Fabric Maps.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/06/2026
ms.search.form: Kusto, fabric maps layers, kusto layer
---

# How to add Kusto data to a map

## Prerequisites

Before you begin, ensure that:

- You have access to a KQL database in Microsoft Fabric.
- The target table, function, or materialized view returns latitude and longitude columns.
- You have permission to create and edit maps in Fabric.

## Create a data layer from a KQL database

1. Open your map in Edit mode.
1. In the Unified Explorer, locate your connected KQL database.
1. Expand Tables, Functions, or Materialized views.
1. Right‑click the target object, and select Show on map.

This action launches the data layer configuration wizard.

## Preview query results

In the Preview data step, review the query output to confirm that the expected columns and values are returned. This preview reflects the data that will be rendered on the map.

## Configure geometry and refresh settings

1. Specify how geometry is defined:
    - Select **Latitude and longitude data located in separate columns**.
    - Choose the latitude and longitude columns from the list.
1. Set a **Data refresh interval** to control how often the layer updates.
1. Provide a descriptive name for the data layer.
1. Select **Next** to continue.

## Review and add the layer

Review the configuration summary, then select Add to map. The Kusto data is added as a new data layer and rendered immediately.

## Style and filter the layer

After the layer is added, you can:

1. Change the layer type to **Marker**.
1. Apply color, size, and rotation using data‑driven styling.
1. Enable clustering for dense datasets.
1. Add filters to restrict the displayed features based on field values.

These options allow you to tailor the visualization to your scenario without modifying the underlying KQL object.

## Migration from embedded querysets

If your map uses an embedded KQL queryset, migrate it to a supported Kusto object to ensure continued compatibility.

- Use a Kusto table, function, or materialized view to host the query logic.
- Update the map to reference the new object.

For detailed steps, see [Migrate KQL Queryset to Kusto Tables, Functions, and Materialized Views](TBD.md).
