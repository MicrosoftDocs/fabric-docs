---
title: Tables in Synapse Data Warehouses
description: Learn about tables in your Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/29/2023
---

# Tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)]

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]
 
Tables are database objects that contain all the data in a [!INCLUDE[fabricdw](includes/fabric-dw.md)]. In tables, data is logically organized in a row-and-column format. Each row represents a unique record, and each column represents a field in the record. 

## Types of tables

 Besides the standard role of basic user-defined tables, [!INCLUDE[fabricdw](includes/fabric-dw.md)] provides the following types of tables that serve special purposes in a database.

## Known limitations

At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

## Next steps

- [Create tables in [!INCLUDE[fabricdw](includes/fabric-dw.md)] using SQL Server Management Studio (SSMS)](create-table-sql-server-management-studio.md)
- [Create a [!INCLUDE[fabricdw](includes/fabric-dw.md)]](create-warehouse.md)
- [Transactions and modify tables with SSMS](transactions.md)