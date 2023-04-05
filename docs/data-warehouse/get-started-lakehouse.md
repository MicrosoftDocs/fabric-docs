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

Currently, delta tables in the [Lakehouse](../data-engineering/lakehouse-overview.md) are automatically added to the default dataset. The default dataset is queried via the [SQL Endpoint](sql-endpoint.md) and updated via changes to the Lakehouse. You can also query the default dataset via [cross-database queries](query-warehouse.md#write-a-cross-database-sql-query) from a [Synapse Data Warehouse](warehouse.md).

- [OneLake](../onelake/onelake-overview.md) is a single, unified, logical data lake for the whole organization. OneLake is the OneDrive for data. OneLake can contain multiple workspaces, for example, along your organizational divisions.
- Every Lakehouse has one [SQL Endpoint](sql-endpoint.md) and each workspace can have more than one Lakehouse.
- Every delta table from a Lakehouse is represented as one table.
- The [default dataset](datasets.md) follows the naming convention of the Lakehouse.

## Get started

- [What is a Lakehouse?](../data-engineering/lakehouse-overview.md)
- [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md)
- [Understand default datasets](datasets.md)
- [Load data into the Lakehouse](../data-engineering/load-data-lakehouse.md)
- [How to: How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md)
- [Tutorial: Move data into Lakehouse via Copy assistant](../data-factory/move-data-lakehouse-copy-assistant.md)