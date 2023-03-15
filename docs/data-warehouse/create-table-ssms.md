---
title: Creating tables in warehouses using SSMS
description: Learn how to use SSMS to create tables in your warehouse.
ms.reviewer: wiassaf
ms.author: kecona
author: KevinConanMSFT
ms.topic: how-to
ms.date: 03/15/2023
---

# Creating tables in warehouses using SQL Server Management Studio (SSMS)

[!INCLUDE [preview-note](../includes/preview-note.md)]

**Applies to:** Warehouse

To get started, you must complete the following prerequisites:

- [Download SSMS Version 18.0+](/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16&preserve-view=true)
- Have access to a warehouse item within a premium per capacity workspace with contributor or above permissions
- Have a warehouse connected to SSMS via T-SQL Connection String (see Connectivity)

## How to create a table

The following steps detail how to create a table using SSMS when connected to a warehouse. For more information on connecting via SSMS, S\see Connectivity. You should also review [T-SQL surface area](data-warehousing.md#t-sql-surface-area) for a listing of unsupported T-SQL commands.

### Create a new table script based on a warehouse connection

1. To open a tab to write a new query, locate the warehouse and right-click to select **New Query**.

   :::image type="content" source="media\create-table-ssms\right-click-new-query.png" alt-text="Screenshot showing where to select New Query in the right-click menu." lightbox="media\create-table-ssms\right-click-new-query.png":::

1. A new tab appears for you to write your CREATE TABLE SQL query

   :::image type="content" source="media\create-table-ssms\create-table-new-tab.png" alt-text="Screenshot of a new tab opened next to the Object Explorer pane." lightbox="media\create-table-ssms\create-table-new-tab.png":::

### CREATE TABLE T-SQL syntax

```
CREATE TABLE { database_name.schema_name.table_name | schema_name.table_name | table_name } 
    (  
      { column_name <data_type>  [ <column_options> ] } [ ,...n ] 
    )  
[;]   
 
<column_options> ::= 
    [ COLLATE Windows_collation_name ] 
    [ NULL | NOT NULL ] -- default is NULL 
    [ <column_constraint> ] 
 
<column_constraint>::= 
    { 
        DEFAULT constant_expression 
        | PRIMARY KEY NONCLUSTERED NOT ENFORCED
        | UNIQUE NOT ENFORCED 
    } 
<data type> ::= 
      datetimeoffset [ ( n ) ]   
    | datetime2 [ ( n ) ]   
    | datetime   
    | smalldatetime   
    | date   
    | time [ ( n ) ]   
    | float [ ( n ) ]   
    | real [ ( n ) ]   
    | decimal [ ( precision [ , scale ] ) ]    
    | numeric [ ( precision [ , scale ] ) ]    
    | money   
    | smallmoney   
    | bigint   
    | int    
    | smallint   
    | tinyint   
    | bit   
    | varchar [ ( n | max )  ] -- max applies only to Azure Synapse Analytics   
    | char [ ( n ) ]   
    | varbinary [ ( n | max ) ] -- max applies only to Azure Synapse Analytics   
    | binary [ ( n ) ]   
    | uniqueidentifier 
```

Example:

```
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

- Transactions and modify tables with SSMS
