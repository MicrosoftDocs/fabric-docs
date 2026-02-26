---
title: Disable V-Order in Warehouse
description: Learn how to disable V-Order in a warehouse item in Microsoft Fabric.
ms.reviewer: procha
ms.date: 07/29/2024
ms.topic: how-to
---
# Disable V-Order on Warehouse in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

This article explains how to disable [V-Order](v-order.md) on [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

Disabling V-Order causes any new Parquet files produced by the warehouse engine to be created without V-Order optimization.

> [!CAUTION]
> Currently, disabling V-Order can only be done at the warehouse level, and it is irreversible: once disabled, it cannot be enabled again. Users must consider all the performance impact of disabling V-Order before deciding to do so.

## Disable V-Order on a warehouse

To permanently disable V-Order on a warehouse, use the following T-SQL code to execute [ALTER DATABASE ... SET](/sql/t-sql/statements/alter-database-transact-sql-set-options?view=fabric&preserve-view=true) in a [new query window](sql-query-editor.md):

```sql
ALTER DATABASE CURRENT SET VORDER = OFF;
```

## Check the V-Order state of a warehouse

To check the current status of V-Order on all warehouses, of your workspace, use the following T-SQL code to query [sys.databases](/sql/relational-databases/system-catalog-views/sys-databases-transact-sql?view=fabric&preserve-view=true) in a new query window:

```sql
SELECT [name], [is_vorder_enabled] 
FROM sys.databases;
```

This query outputs each warehouse on the current workspace, with their V-Order status. A V-Order state of `1` indicates V-Order is enabled for a warehouse, while a state of `0` indicates disabled.

:::image type="content" source="media/disable-v-order/v-order-status-by-warehouse.png" alt-text="Screenshot showing a query result listing four warehouses and the V-Order state for each." lightbox="media/disable-v-order/v-order-status-by-warehouse.png":::

## Related content

- [Understand and manage V-Order for Warehouse](v-order.md)
