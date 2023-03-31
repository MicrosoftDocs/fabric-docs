---
title: Create tables in Synapse data warehouses using SSMS
description: Learn how to use SSMS to create tables in your Synapse Data Warehouse in Microsoft Fabric.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/15/2023
---

# Create tables in Synapse Data Warehouse using SQL Server Management Studio (SSMS)

**Applies to:** [!INCLUDE[fabric-se](includes/applies-to-version/fabric-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

To get started, you must complete the following prerequisites:

- [Download SSMS](/sql/ssms/download-sql-server-management-studio-ssms) (use the latest version available).
- Have access to a warehouse item within a premium per capacity workspace with contributor or above permissions.
- Have a warehouse connected to SSMS via T-SQL Connection String (see [Connectivity](connectivity.md)).

## How to create a table

The following steps detail how to create a table using SSMS when connected to a warehouse. For more information on connecting via SSMS, S\see Connectivity. You should also review [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a listing of unsupported T-SQL commands.

### Create a new table script based on a warehouse connection

1. To open a tab to write a new query, locate the warehouse and right-click to select **New Query**.

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

At this time, there's limited T-SQL functionality in the warehouse. See [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a list of T-SQL commands that are currently not available.

## Next steps

- [Transactions and modify tables with SSMS](transactions.md)
