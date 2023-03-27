---
title: Data warehousing overview
description: Learn more about the data warehousing experience.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: overview
ms.date: 03/27/2023
ms.search.form: SQL Endpoint overview, Warehouse overview, Warehouse in workspace overview
---

# Data warehousing overview

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [preview-note](../includes/preview-note.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides two distinct data warehousing experiences. The **[!INCLUDE[fabric-se](includes/fabric-se.md)]** in [!INCLUDE [product-name](../includes/product-name.md)] enables data engineers to build a relational layer on top of physical data in the Lakehouse and expose it to analysis and reporting tools using T-SQL/TDS end-point. **[!INCLUDE[fabric-dw](includes/fabric-dw.md)]** in [!INCLUDE [product-name](../includes/product-name.md)] provides a "traditional", transactional data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse.

> [!IMPORTANT]
> This article provides a comprehensive overview of two distinct data warehousing experiences.

## SQL Endpoint

The SQL Endpoint on the Lakehouse allows a user to transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" experiences that a data warehouse would provide, supporting T-SQL. Via the SQL Endpoint, the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in the SQL Endpoint:

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

For more information on the SQL Endpoint for the Lakehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [SQL Endpoint](sql-endpoint.md).

## Data Warehouse

The Warehouse functionality is a 'traditional' data warehouse and supports the full transactional T-SQL capabilities you would expect from an enterprise data warehouse. 

This warehouse is displayed in the [!INCLUDE product-name] portal with a warehouse icon, however under the Type column, you see the type listed as Warehouse. 

For more information on the warehouse in [!INCLUDE [product-name](../includes/product-name.md)], see [Warehouse](warehouse.md).

## Connectivity

You can use the [!INCLUDE [product-name](../includes/product-name.md)] portal, or the TDS endpoint to connect to and query the SQL Endpoint and your transactional data warehouses via [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) version 18.0+ or [Azure Data Studio (ADS)](https://aka.ms/azuredatastudio).

For more information and how-to connect, see [Connectivity](connectivity.md).

## Prerequisites and known limitations

1. Currently, Datamarts must be enabled at the tenant level and / or for any users of the [!INCLUDE [product-name](../includes/product-name.md)] preview for the warehousing features to be available.

1. This documentation assumes that the user has already loaded data into a [!INCLUDE [product-name](../includes/product-name.md)] Lakehouse and is ready to explore their data via any SQL based analysis or reporting tool. If needed, detailed instructions for loading data in your Lakehouse can be found in the Data Engineering documentation. However, there are some known limitations specific to warehouse workloads that you may encounter if you're loading new data sets for exploring warehouse capabilities:

   - When you create a Lakehouse table from a pipeline, if the pipeline errors out before inserting rows into the Lakehouse table, the table will be corrupt. Go back to your Lakehouse, delete the table folder from "lake view" and then reapply your pipeline.

   - If you're loading parquet files generated from Apache Spark 2.x, data pipelines aren't gracefully handling the upgrade for datetime fields discussed here and Lakehouse tables will be corrupt. For this scenario, as a workaround, use notebooks to load Spark 2.x generated parquet files.

      ```python
      spark.conf.set("spark.sql.parquet.int96RebaseModeInWrite","LEGACY")
      df = spark.read.parquet(wasbs_path)
      df.write.format("delta").save("Tables/" + tableName)
      ```

   - If you're loading partitioned data, partition discovery in data pipelines isn't properly creating delta format Lakehouse tables. Tables may appear to work in Spark but during metadata synchronization, to warehouse they'll be corrupt. For this scenario, as a workaround, use notebooks as mentioned in (1b) to load partitioned source data.

   - Unlike (1c), if a data engineering team has already loaded data into your Lakehouse and they explicitly partitioned the data with code like `df.write.partitionBy("FiscalMonthID").format("delta").save("Tables/" + tableName)`, a folder structure is introduced into your Lakehouse and columns in the partitionBy function won't be present in the warehouse. To avoid this issue, load data as shown previously in (1b) without the partitionBy function.

1. You can't query tables that are partitioned or the tables with renamed columns.

1. You can't load case sensitive tables to data warehouse (for example, "Cat", "cat", and "CAT" are all read as the same table name by SQL). Duplicate table names can cause the data warehouse to fail. Use unique table and file names for all items in a warehouse.

1. Data should be in parquet, delta or .csv format.

1. The following limitations are regarding query lifecycle DMVs:

   - When querying `sys.dm_exec_connections`, you may encounter the following error, even if you're an Admin of your workspace.

      ***Error Message:*** *The user doesn't have the external policy action 'Microsoft.Sql/Sqlservers/SystemViewsAndFunctions/ServerPerformanceState/Rows/Select' or permission 'VIEW SERVER PERFORMANCE STATE' to perform this action.*

   - The dynamic management view `sys.dm_exec_sessions` provides a limited view as not all active query results will display.

1. Permissions:

   - The user who created the Lakehouse will have "dbo" permissions, everyone else is limited to "Select".

   - GRANT, REVOKE, DENY commands are currently not supported.

## T-SQL surface area

Creating, altering, and dropping tables, and insert, update, and delete are only supported in the transactional warehouse, not in the SQL Endpoint.

At this time, the following list of commands is NOT currently supported. Don't try to use these commands because even though they may appear to succeed, they could cause corruption to your warehouse.

- ALTER TABLE ADD/ALTER/DROP COLUMN
- BULK LOAD
- CREATE ROLE
- CREATE SECURITY POLICY - Row Level Security (RLS)
- CREATE USER
- CTAS
- GRANT/DENY/REVOKE
- Hints
- Identity Columns
- Manually created multi-column stats
- MASK and UNMASK (Dynamic Data Masking)
- MATERIALIZED VIEWS
- MERGE
- OPENROWSET
- PREDICT
- Queries targeting system and user tables
- Recursive queries
- Result Set Caching
- Schema and Table names can't contain / or \
- SELECT - FOR (except JSON)
- SELECT - INTO
- sp_showmemo_xml
- sp_showspaceused
- Sp_rename
- Temp Tables
- Triggers
- TRUNCATE
- There's a known issue with creating foreign and primary keys. For now, you can create them as though they're enforceable but they won't be enforced by the engine.


## Keyboard shortcuts

Keyboard shortcuts provide a quick way to navigate and allow users to work more efficiently in SQL query editor. The table in this article lists all the shortcuts available in SQL query editor.

SQL query editor:

| **Function** | **Shortcut** |
|---|---|
| New SQL query | Ctrl + Q |
| Close current tab | Ctrl + Shift + F4 |
| Run SQL script | Ctrl + Enter, Shift +Enter |
| Cancel running SQL script | Alt+Break |
| Search string | Ctrl + F |
| Replace string | Ctrl + H |
| Undo | Ctrl + Z |
| Redo | Ctrl + Y |
| Go one word left | Ctrl + Left arrow key |
| Go one word right*| Ctrl + Right arrow key |
| Indent increase | Tab |
| Indent decrease | Shift + Tab |
| Comment | Ctrl + K, Ctrl + C |
| Uncomment | Ctrl + K, Ctrl + U |
| Move cursor up | ↑ |
| Move cursor down | ↓ |
|Select All | Ctrl + A |

## Next steps

- [Create a warehouse](create-warehouse.md)
- [Creating reports](create-reports.md)
