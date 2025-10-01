---
title: Query Mirrored Databases in Spark Notebook
description: Connect and query mirrored databases (mirrored DBs) directly from your Spark notebooks.
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: how-to
ms.custom:
ms.date: 10/01/2025
ms.search.form: Query Mirrored Databases with Spark Notebook
---

# Query mirrored databases in Spark notebook

Connect to and query mirrored databases (Mirrored DBs) directly from your Spark notebook in Microsoft Fabric. Mirrored databases let you analyze data from external sources—such as Azure Cosmos DB, Azure SQL Database, Snowflake, and Open Mirroring—without migrating data into Fabric.

With Spark notebooks, you can run read-only queries on open format tables using advanced analytics engines, all within Fabric. This enables seamless, frictionless analytics across multiple enterprise data sources, so you can gain insights without moving or duplicating your data.

## Key capabilities

With mirrored databases in Spark notebooks, you can:

- **Add mirrored databases as data sources in your Notebook Object Explorer (OE):** Seamlessly add MirrorDBs to your Spark notebook as a data source using the Object Explorer, just like you do with Lakehouses.
-  **Query your mirrored databases:** Run read-only Spark queries on MirrorDB tables using SparkSQL or PySpark. To enable this, ensure your notebook either has no lakehouse attached or a schema-enabled lakehouse attached.
- **Run read-only queries without a Lakehouse attached:** Query Lakehouse and mirrored DB tables without attaching a default lakehouse by using fully qualified four-part names (workspace.database.schema.table) for precise and compatible querying.
- **Join MirrorDB and Lakehouse Tables:** Perform joins between mirrored DB tables and Lakehouse tables to unlock deeper insights across your Fabric data assets.
- **Supported MirrorDBs:** Azure SQL, Cosmos DB, Snowflake, and Open Mirroring. 

## Get Started: Add and query a mirrored database

1. **Add a mirrored database as a data source.**

        a. Open a notebook and make sure the language is set to SparkSQL or PySpark.
    b. Go to object explorer and select **Add Data Source** > **Existing data sources**, then select the mirrored databases to add to your notebook.
    c. After connecting, you see all added mirrored databases in object explorer.
    d. Browse schemas, tables, and table details like you do with Lakehouses.

    :::image type="content" source="media\query-mirrored-database-spark-notebooks\select-mirrored-db-oe.png" alt-text="Screenshot of adding a mirrored database in object explorer." lightbox="media\query-mirrored-database-spark-notebooks\select-mirrored-db-oe.png":::

2. **Query your mirrored database tables.**

    To run read-only queries on your mirrored databases (mirrored DBs), make sure your notebook either has a schema-enabled Lakehouse attached or no lakehouse attached at all.

    You can then use SparkSQL or PySpark to query your mirrored DB tables. 
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

3. **Join mirrored database tables with Lakehouse tables.**

    You can join mirrored DB tables with lakehouse tables for unified analytics. 


Join mirrored DB tables with schema-enabled lakehouse tables using PySpark:

```python
df = spark.sql("SELECT * 
FROM workspaceName.mirroredDBName.schemaName.tableName a 
JOIN workspaceName.lakehouseName.schemaName.tableName b
ON a.id = b.id")
display(df)
```
    
Join mirrored DB tables with nonschema lakehouse tables using PySpark: 

```python
df = spark.sql("SELECT * 
FROM workspaceName.mirroredDBName.schemaName.tableName a 
JOIN workspaceName.lakehouseName.tableName b
ON a.id = b.id")
display(df)
```

## Best Practices & Troubleshooting

- Always use fully qualified names (workspace.database.schema.table) for mirrored DB queries.
- Mirrored DB currently supports read-only operations in Spark notebooks.
- Lakehouse attachment isn't required for read-only queries, but ensure you use the correct naming conventions.
- Lakehouse attachments are required for any write operations on a Lakehouse.
- Nonschema Lakehouse attachments don't enable the mirrored DB query experience.

## Known Limitations

- Currently supported mirrored DBs are Azure SQL, Cosmos DB, Snowflake, and Open Mirroring. More sources will be added in future iterations.
- You can't query mirrored DBs with a nonschema lakehouse attached in your notebook.

## Related content

- [Create custom Spark pools in Microsoft Fabric](create-custom-spark-pools.md)
- [Workspace roles and permissions in lakehouse](workspace-roles-lakehouse.md)
