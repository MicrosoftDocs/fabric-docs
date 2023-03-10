---
title: Data warehousing overview
description: Learn more about the data warehousing experience.
ms.reviewer: wiassaf
ms.author: cynotebo
author: cynotebo
ms.topic: overview
ms.date: 03/15/2023
---

# Data warehousing overview

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

The data warehouse experience in [!INCLUDE [product-name](../includes/product-name.md)] enables data engineers to build a relational layer on top of physical data in the Lakehouse and expose it to analysis and reporting tools using T-SQL/TDS end-point. Data analysts use T-SQL language to access Lakehouse data artifacts using the warehouse experience that exposes underlying files, folders, and Cosmos DB containers as tables or views.

> [!IMPORTANT]
> This document provides a comprehensive overview of two distinct data warehousing experiences.

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

1. You can't load case sensitive tables to data warehouse (i.e.., Cat, cat and CAT are all read as the same table name by SQL); doing so causes the data warehouse to fail. Use unique table and file names for all artifacts you use in warehouse mode.

1. Data should be in parquet, delta or .csv format.

1. The following limitations are regarding query lifecycle DMVs:

   - When running “sys.dm_exec_connections”, you may encounter the following error even if you're an Admin of your workspace.

      ***Error Message:*** *The user doesn't have the external policy action 'Microsoft.Sql/Sqlservers/SystemViewsAndFunctions/ServerPerformanceState/Rows/Select' or permission 'VIEW SERVER PERFORMANCE STATE' to perform this action.*

   - “sys.dm_exec_sessions” provides a limited view as not all active query results will display.

1. Permissions:

   - The user who created the Lakehouse will have “dbo” permissions, everyone else is limited to “Select”.

   - GRANT, REVOKE, DENY commands are currently not supported.

## Connectivity

**Applies to**: Warehouse (default) and Warehouse

As mentioned previously, the full [!INCLUDE [product-name](../includes/product-name.md)] portal experience isn't available at this time, so for some activities you will be use a TDS end-point to connect to and query your warehouse (default) and/or warehouse via SSMS or ADS.

In this tutorial, you learn how to find your TDS end-point and use it to connect to SSMS for running SQL queries over either your warehouse (default) or warehouse data.

While not described in this document, we also support Azure Data Services (ADS) if that is your preferred SQL tool and you can use the same TDS end-point to connect via ADS.

## T-SQL surface area

At this stage, we haven't completed development to support the full T-SQL surface area, focusing on those high-value commands that allow you to explore and analyze the data loaded in the Lakehouse. Creating, altering, and dropping tables, and insert, update, and delete are only supported in the transactional warehouse. Additional T-SQL commands and supporting transactional commands will be rolled out in subsequent releases.

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

There's a known issue with creating foreign and primary keys. For now, you can create them as though they're enforceable but they won't be enforced by the engine.

## Warehouse mode

Warehouse mode in the Lakehouse allows a user to transition from the “Lake” view of the Lakehouse (which supports data engineering and Apache Spark) to the “SQL” experiences that a data warehouse would provide, supporting T-SQL. In warehouse mode the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in your warehouse(default):

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

Warehouse mode is primarily oriented towards designing your warehouse and BI needs and serving data.

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

- [Creating reports](../placeholder.md)
