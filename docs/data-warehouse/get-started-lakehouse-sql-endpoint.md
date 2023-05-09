---
title: Get started with the SQL Endpoint of the Lakehouse
description: Learn more about querying the SQL Endpoint of the Lakehouse in Microsoft Fabric.
author: cynotebo
ms.author: cynotebo
ms.reviewer: wiassaf
ms.date: 05/23/2023
ms.topic: conceptual
ms.search.form: SQL Endpoint overview, Warehouse in workspace overview # This article's title should not change. If so, contact engineering.
---
# Get started with the SQL Endpoint of the Lakehouse in Microsoft Fabric

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-se.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides an [SQL Endpoint](data-warehousing.md#sql-endpoint-of-the-lakehouse) for every Lakehouse artifact in the workspace. The [SQL Endpoint](data-warehousing.md#sql-endpoint-of-the-lakehouse) enables you to query data in the Lakehouse using T-SQL language and TDS protocol. Every Lakehouse has one [SQL Endpoint](data-warehousing.md#sql-endpoint-of-the-lakehouse), and each workspace can have more than one Lakehouse. The number of [SQL Endpoints](data-warehousing.md#sql-endpoint-of-the-lakehouse) in a workspace matches the number of Lakehouse artifacts.
- The SQL Endpoint is automatically generated for every Lakehouse artifact and exposes Delta tables from the Lakehouse as SQL tables that can be queried using the T-SQL language.
- Every delta table from a Lakehouse is represented as one table. Data should be in delta format.
- The [default Power BI dataset](datasets.md) is created for every [SQL Endpoint](data-warehousing.md#sql-endpoint-of-the-lakehouse) and it follows the naming convention of the Lakehouse objects.
 
[OneLake](../onelake/onelake-overview.md) is a single, unified, logical data lake for the whole organization. OneLake is the OneDrive for data. OneLake can contain multiple workspaces, for example, along your organizational divisions. The [SQL Endpoint](data-warehousing.md#sql-endpoint-of-the-lakehouse) exposes data in the `/tables` folder within each Lakehouse folder in [OneLake](../onelake/onelake-overview.md) and enables you to create queries and reports on the [OneLake](../onelake/onelake-overview.md) data. 

The delta tables in the [Lakehouse](../data-engineering/lakehouse-overview.md) are automatically added to the default Power BI dataset. The default Power BI dataset is queried via the [SQL Endpoint of the Lakehouse](data-warehousing.md#sql-endpoint-of-the-lakehouse) and updated via changes to the Lakehouse. You can also query the default Power BI dataset via [cross-database queries](query-warehouse.md#write-a-cross-database-query) from a [Synapse Data Warehouse](data-warehousing.md#synapse-data-warehouse).

## Get started

- [What is a Lakehouse?](../data-engineering/lakehouse-overview.md)
- [Create a lakehouse with OneLake](../onelake/create-lakehouse-onelake.md)
- [Understand default Power BI datasets](datasets.md)
- [Load data into the Lakehouse](../data-engineering/load-data-lakehouse.md)
- [How to copy data using Copy activity in Data pipeline](../data-factory/copy-data-activity.md)
- [Tutorial: Move data into Lakehouse via Copy assistant](../data-factory/tutorial-move-data-lakehouse-copy-assistant.md)

## Next steps

- [Connectivity](connectivity.md)
- [SQL Endpoint of the Lakehouse](data-warehousing.md#sql-endpoint-of-the-lakehouse)
- [Query the Synapse Data Warehouse](query-warehouse.md)
