---
title: Query Mirrored Databases in Spark Notebook
description: Connect and query mirrored databases (Mirrored DBs) directly from your Spark notebooks.
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

Spark notebooks now allow you to connect and query Mirrored Databases (Mirrored DBs) directly from your notebook. 

You can explore and run **read-only queries on top of your open formats tables** and enjoy our advanced analytics engines, and frictionless analytics experiences without needing to migrate any of your data sitting outside of Fabric. This means you can seamlessly analyze data across multiple enterprise sources—such as Azure Cosmos DB, Azure SQL Database, Snowflake, and Open Mirroring, without the need to migrate external data into Fabric.

### Key Capabilities
This feature allows you to:  
- **Add Mirrored Databases as data sources in your Notebook Object Explorer (OE):** Seamlessly add MirrorDBs to your Spark notebook as a data source using the Object Explorer, just like you do with Lakehouses.
-  **Query your Mirrored Databases:** Run read-only Spark queries on MirrorDB tables using SparkSQL or PySpark. To enable this, ensure your notebook either has no lakehouse attached or a schema-enabled lakehouse attached.
- **Run read-only queries without a Lakehouse attached:** Query Lakehouse and Mirrored DB tables without attaching a default lakehouse by using fully qualified four-part names (workspace.database.schema.table) for precise and compatible querying.
- **Join MirrorDB and Lakehouse Tables:** Perform joins between Mirrored DB tables and Lakehouse tables to unlock deeper insights across your Fabric data assets.
- **Supported MirrorDBs:** Azure SQL, Cosmos DB, Snowflake, and Open Mirroring. 

## Getting Started: Adding and Querying a MirrorDB
1. **Add Mirrored Database as a data source**

    - Open a notebook of choice & make sure the language is set to either SparkSQL or PySpark. 
    - Navigate to object explorer and click on "Add Data Source > Existing data sources" button and select the Mirrored DBs you would like to add to your notebook.
    - Once connected, you can visualize all your added Mirrored DBs in the object explorer.
    - Browse schemas, tables, and table details just like you would with your Lakehouses. 

    :::image type="content" source="media\query-mirrored-database-spark-notebooks\select-mirrored-db-oe.png" alt-text="How to add a mirrored database to your object explorer." lightbox="media\query-mirrored-database-spark-notebooks\select-mirrored-db-oe.png":::

2. **Query your Mirrored Database tables**

    To run read-only queries on your Mirrored Databases (Mirrored DBs), make sure **your notebook either has a schema-enabled Lakehouse attached or no lakehouse attached at all.**

    You can then use SparkSQL or PySpark to query your Mirrored DB tables. 
    - You can use the built-in context-menu action on a table (**Load data > Spark**) to generate a pySpark query. 
    - You can also drag and drop a table to a notebook cell to automatically generate a query. 
    

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

    You can join Mirrored DB tables with lakehouse tables for unified analytics. 


Join Mirrored DB tables with schema-enabled lakehouse tables using PySpark:

```python
    df = spark.sql("SELECT * 
    FROM workspaceName.mirroredDBName.schemaName.tableName a 
    JOIN workspaceName.lakehouseName.schemaName.tableName b
    ON a.id = b.id")
    display(df)
```
    
Join Mirrored DB tables with nonschema lakehouse tables using PySpark: 

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
- Lakehouse attachment isn't required for read-only queries, but ensure you use the correct naming conventions. 
- Lakehouse attachment is required for any write operations on a Lakehouse.
- Nonschema Lakehouse attachement will not enable the Mirrored DBs query experience. 

## Known Limitations 
- Currently supported Mirrored DBs are Azure SQL, Cosmos DB, Snowflake, and Open Mirroring. More sources will be added in future iterations.
- You will not be able to query Mirrored DBs with a nonschema lakehouse attached in your notebook.