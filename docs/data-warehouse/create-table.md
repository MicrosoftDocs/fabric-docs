---
title: Create tables in Synapse data warehouses
description: Learn how to use SSMS to create tables in your Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/15/2023
---

# Create tables in Synapse Data Warehouse 

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

To get started, you must complete the following prerequisites:

- Have access to a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] within a premium per capacity workspace with contributor or above permissions.
- Have a warehouse connected to SSMS via T-SQL Connection String (see [Connectivity](connectivity.md)).
- Choose your query tool. This tutorial uses SQL Server Management Studio (SSMS), but you can use any T-SQL querying tool.
    - [Download SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) (use the latest version available).
    - [Download Azure Data Studio](http://aka.ms/azuredatastudio).
    - Use the [SQL query editor in the Fabric portal](sql-query-editor.md).

For more information on connecting to your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)], see [Connectivity](connectivity.md). 

> [!NOTE]
> For complete syntax, refer to [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric#DataTypes&preserve-view=true).

### Create a new table

1. In SSMS, locate the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in the **Object Explorer** and right-click to select **New Query**. This opens a tab to write a new query.

   :::image type="content" source="media\create-table-sql-server-management-studio\right-click-new-query.png" alt-text="Screenshot showing where to select New Query in the right-click menu." lightbox="media\create-table-sql-server-management-studio\right-click-new-query.png":::

1. A new tab appears for you to write your CREATE TABLE SQL query.

   :::image type="content" source="media\create-table-sql-server-management-studio\create-table-new-tab.png" alt-text="Screenshot of a new tab opened next to the Object Explorer pane." lightbox="media\create-table-sql-server-management-studio\create-table-new-tab.png":::

1. Refer to syntax of [CREATE TABLE](/sql/t-sql/statements/create-table-azure-sql-data-warehouse?view=fabric&preserve-view=true). For example:

```sql
CREATE TABLE myTable
  (  
    id int NOT NULL,  
    lastName varchar(20),  
    zipCode varchar(6)  
  );  
```

## Known limitations

See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

## Next steps

- [Transactions and modify tables with SSMS](transactions.md)
