---
title: Get started with the Lakehouse in Microsoft Fabric
description: Learn more about querying the Lakehouse in Microsoft Fabric via the SQL Endpoint.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: conceptual
ms.date: 04/05/2023
---

# Get started with the Lakehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-se.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

Currently, delta tables in the Lakehouse are automatically added to the default dataset. The default dataset is queried via the [SQL Endpoint](sql-endpoint.md) and updated via changes to the Lakehouse. You can also query the default dataset via [cross-database queries](query-warehouse.md#write-a-cross-database-sql-query) from a [Synapse Data Warehouse](warehouse.md).

Every delta table from a Lakehouse is represented as one table.

Every Lakehouse has one [SQL Endpoint](sql-endpoint.md) and each workspace can have more than one Lakehouse.

The [default dataset](datasets.md) follows the naming convention of the Lakehouse.

## Load data into the Lakehouse

- [Understand default datasets](datasets.md)
- [Get data experience for Lakehouse](../data-engineering/load-data-lakehouse.md)
- [How to: How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md)
- [Tutorial: Move data into Lakehouse via Copy assistant](../data-factory/move-data-lakehouse-copy-assistant.md)