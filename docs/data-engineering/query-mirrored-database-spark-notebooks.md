---
title: Query Mirrored Databases in Spark Notebook
description: Connect and query mirrored databases (MirrorDBs) directly from your Spark notebooks.
ms.reviewer: avinandac
ms.author: avinandac
author: avinandac
ms.topic: how-to
ms.custom:
ms.date: 09/25/2025
ms.search.form: Query Mirrored Databases with Spark Notebook
---

# Query Mirrored Databases in Spark Notebook

## Overview

Spark notebooks now allow you to connect and query Mirrored Databases (MirroredDBs) directly from your notebook. 

You can explore and run **read-only queries on top of your open formats tables** and enjoy our advanced analytics engines, and frictionless analytics experiences without needing to migrate any of your data sitting outside of Fabric. This means you can seamlessly analyze data across multiple enterprise sources—such as Azure Cosmos DB, Azure SQL Database, Snowflake, and Open Mirroring, without the need to migrate external data into Fabric.

### Key Capabilities
This feature allows you to:  
- **Add Mirrored Databases as data sources in your Notebook OE:** Add MirroredDBs to your Spark notebook as a data source using the Object Explorer just like Lakehouses.
-  **Query your Mirrored Databases:** Run read-only Spark queries on mirrored DBs tables using SparkSQL or PySpark.
- **Run queries without a Lakehouse:** You can query Mirrored DB tables without attaching a default lakehouse, using fully qualified four-part names (workspace.database.schema.table) for precise and compatible querying.
- **Join MirrorDB and Lakehouse Tables:** Perform joins between MirrorDB tables and lakehouse tables to unlock deeper insights across all your Fabric data assets.

## Getting Started: Adding and Querying a MirrorDB
1. **Add Mirrored Database as a data source**

    - Open a notebook of choice & make sure the language is set to either SparkSQL or PySpark. 
    - Navigate to object explorer and click on "Add Data Source > Existing data sources" button and select the Mirrored DBs you would like to add to your notebook.
    - Once connected, you can visualize all youe added Mirrored DBs in the object explorer.
    - Browse schemas, tables and table details just like you would with your Lakehouses. 

2. **Query your Mirrored Database tables**
Use SparkSQL or PySpark to query your Mirrored DB tables. 
    - You can leverage the built-in context-menu action on a table (Load data > Spark) to generate a pySpark query. 
    - You can also drag and drop a table to notebook cell to generate a query. 


    Using SparkSQL: 

     ```python
      %%sql
   
    SELECT * FROM workspaceName.databaseName.schemaName.tableName
    ```

    Using PySpark: 

     ```python
    df = spark.sql("SELECT * FROM workspaceName.databaseName.schemaName.tableName")
    display(df)
    ```

3. **Joining Mirrored Database tables with Lakehouse tables**

    You can join MirrorDB tables with lakehouse tables for unified analytics. 

    - Join MirrorDB tables with schema-enabled lakehouse tables using PySpark: 
     ```python
    df = spark.sql("SELECT * 
    FROM workspaceName.mirroredDBName.schemaName.tableName a 
    JOIN workspaceName.lakehouseName.schemaName.tableName b
    ON a.id = b.id")
    display(df)
    ```
    
    
    - Join MirrorDB tables with non-schema lakehouse tables using PySpark: 
     ```python
    df = spark.sql("SELECT * 
    FROM workspaceName.mirroredDBName.schemaName.tableName a 
    JOIN workspaceName.lakehouseName.tableName b
    ON a.id = b.id")
    display(df)
    ```

## Best Practices & Troubleshooting

- Always use fully qualified names (workspace.database.schema.table) for Mirrored DB queries.
- Mirrored DB currently support read-only operations in Spark notebooks.
- Lakehouse attachment is not required for read-only queries, but ensure you use the correct naming conventions. 
- Lakehouse attachement is required for any write operations on a Lakehouse.
- Currently supported Mirrored DBs are Azure SQL, Cosmos DB, Snowflake, and Open Mirroring. 