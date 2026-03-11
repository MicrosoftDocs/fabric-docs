---
title: Migrate KQL Queryset to Kusto functions
description: Learn how to Migrate KQL Queryset to a Kusto function.
ms.reviewer: smunk, sipa
ms.topic: how-to
ms.service: fabric
ms.subservice: rti-core
ms.date: 3/12/2026
ms.search.form: Migrate KQL Queryset, Kusto layer
---

# Migrate KQL Queryset to Kusto function

Starting in March 2026, Fabric Maps no longer supports KQL querysets as a data source for creating map layers. To continue using Kusto data in maps, you must create new layers based on KQL functions.

This article explains how to migrate an existing map layer that was created from a KQL query to a new layer backed by a KQL function, and how to configure the migrated layer for visualization in Fabric Maps. For an overview of supported Kusto data sources, see [Kusto integration in Fabric Maps](about-kusto-integration.md). For information of how to create new layers from a Kusto data source, see [Create layers using Kusto data](create-layers-using-kusto-data.md).

> [!NOTE]
> Existing layers created from a KQL query will continue to work until June 29, 2026. To avoid service disruptions, migrate these queries to Kusto functions as described in this article.

## Prerequisites

Before you begin, ensure that:

- You have access to a KQL database in Microsoft Fabric.
- You have permission to create and edit maps in Fabric.

## Migrate a KQL query to a Kusto function

To simplify migration from an embedded KQL queryset, convert the query into a Kusto function and update the map layer to reference that function.

### Original query

The following example shows a KQL query used in an existing map layer:

```kusto
SourceTable
| where timestamp > ago(1d)
```

### Create a Kusto function

In your KQL database, create a function that encapsulates the query logic:

```kusto
.create-or-alter function resultFromOneDay() {
    SourceTable
    | where timestamp > ago(1d)
}
```

A new user-defined stored function is created under the Functions node of the KQL database. You'll use this function in the next step to create a new map layer.

### Add a new data layer from the Kusto function

After migrating the embedded KQL query to a Kusto function, create a new map layer that uses the function as its data source.

1. Create a new data layer from the Kusto function by following the steps in [Create layers using Kusto data](create-layers-using-kusto-data.md).
1. Configure the layer geometry, refresh settings, and any required styling or formatting.
1. Verify that the new layer renders correctly on the map.

After the new layer is configured and validated, you can remove the existing map layer that was sourced from the embedded KQL queryset.

The map layer now references a supported Kusto entity, allowing it to continue working as KQL querysets are deprecated.
