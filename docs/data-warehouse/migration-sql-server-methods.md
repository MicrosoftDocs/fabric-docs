---
title: Migration methods for SQL Server to Fabric Data Warehouse
description: This article details methods for migrating data warehouses in SQL Server to Microsoft Fabric.
ms.reviewer: prlangad, arturv, johoang
ms.date: 09/21/2026
ms.topic: concept-article
ai-usage: ai-assisted
ms.custom:
  - fabric-cat
---

# Migration methods for SQL Server to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

This article describes methods for migrating data warehouses in SQL Server to Microsoft Fabric Data Warehouse.

> [!TIP]
> For more information about strategy and planning, see [Migration planning: SQL Server to Fabric Data Warehouse](migration-sql-server-planning.md).
>
> Use the [Fabric Migration Assistant for Data Warehouse](migration-assistant.md) for an automated migration experience from SQL Server. The rest of this article describes more manual migration steps.

The following table summarizes methods for migrating the data schema (DDL), database code (DML), and data. Each option is described later in this article.

| Option | Method | What it does | Skill or preference | Scenario |
|:--|:--|:--|:--|:--|
| 1 | [Data Factory](#option-1-schema-and-data-migration-with-copy-assistant) | Schema conversion<br />Data extraction<br />Data ingestion | Data Factory pipeline | Simplified schema and data migration. Recommended for [dimension tables](dimensional-modeling-dimension-tables.md). |
| 2 | [Data Factory with partitioning](#option-2-data-migration-with-partitioning) | Schema conversion<br />Data extraction<br />Data ingestion | Data Factory pipeline | Parallelized migration for large [fact tables](dimensional-modeling-fact-tables.md). |
| 3 | [Schema-first migration](#option-3-schema-first-migration) | Schema conversion | Data Factory pipeline | Migrate the schema first, and then extract and ingest data separately for greater control over throughput. |
| 4 | [SQL migration scripts](#migrate-using-sql-scripts) | Schema conversion<br />Data extraction<br />Code assessment | T-SQL | Use an IDE and scripts for granular control over migration tasks. |
| 5 | [SQL database projects](#migrate-using-sql-database-projects) | Schema conversion<br />Code assessment | SQL project | Use a database project for source control, assessment, and deployment. |
| 6 | [dbt](#migration-with-dbt) | Schema conversion<br />Database code conversion | dbt | Reuse an existing dbt project by changing the adapter and target configuration. |

## Choose a workload for the initial migration

When you decide where to start a SQL Server to Fabric Data Warehouse migration project, choose a workload area where you can:

- Prove the viability of migrating to Fabric Data Warehouse by quickly delivering the benefits of the new environment. Start small and simple, and prepare for multiple small migrations.
- Give your technical staff time to gain relevant experience with the processes and tools that they use to migrate other workloads.
- Create a template for further migrations that's specific to your SQL Server environment, tools, and processes.

> [!TIP]
> Create an inventory of objects that need to be migrated, and document the migration process from start to finish so that it can be repeated for other databases or workloads.

The volume of data in an initial migration should be large enough to demonstrate the capabilities and benefits of Fabric Data Warehouse, but small enough to demonstrate value quickly. A size in the 1-10 terabyte range is typical.

## Migrate with Fabric Data Factory

Fabric Data Factory provides a low-code interface that can convert table DDL and migrate data from SQL Server.

Fabric Data Factory can perform the following tasks:

- Convert schema (DDL) to Fabric Data Warehouse syntax.
- Create schema objects in Fabric Data Warehouse.
- Migrate data to Fabric Data Warehouse.

### Option 1. Schema and data migration with Copy assistant

This method uses the Data Factory Copy assistant to connect to the source SQL Server database, convert table DDL to Fabric syntax, and copy data to Fabric Data Warehouse. You can select one or more source tables. The generated pipeline uses a ForEach activity to copy the selected tables in parallel.

When you configure the copy operation:

- Use the SQL Server connector for the source connection.
- Limit parallel copies to a level that the source database and network can sustain.
- Monitor source CPU, I/O, transaction log use, and production workload latency during extraction.

#### Recommended use

Use Copy assistant for a simple interface that converts DDL and ingests selected tables in one operation. This method is a good fit for dimension tables and smaller workloads.

For large tables, use partitioning to increase read and write parallelism.

### Option 2. Data migration with partitioning

For large fact tables, use a Copy activity for each table and configure source partitioning. Use physical partitions when available, or configure dynamic range partitioning by specifying a suitable numeric or date column and its minimum and maximum values.

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-source-partition-option.png" alt-text="Screenshot of a pipeline source with dynamic range partitioning options.":::

When you use partitioning:

- Choose a partition column that distributes rows evenly.
- Avoid creating more concurrent source queries than SQL Server can process without affecting production workloads.
- Test the partition range and parallel-copy settings against a representative workload.
- Increase parallelism gradually while monitoring the source and destination.

#### Recommended use

Use Data Factory partitioning for large fact tables when parallel extraction improves throughput. Size the batch count and partition ranges according to your source database resources and network capacity.

### Option 3. Schema-first migration

For larger databases, separate schema migration from data migration:

1. Convert and create table schemas in Fabric Data Warehouse.
1. Extract source data into Azure Data Lake Storage (ADLS) Gen2.
1. Use Data Factory or the [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) command to ingest the staged data into Fabric Data Warehouse.

Separating these phases lets you tune extraction and ingestion independently.

#### Schema migration with Data Factory

You can use a Fabric pipeline to migrate table schemas from SQL Server to Fabric Data Warehouse without copying rows.

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-schema-migration.png" alt-text="Screenshot from Fabric Data Factory showing a Lookup activity connected to a ForEach activity that migrates DDL.":::

##### Configure pipeline parameters

Create a `SchemaName` parameter that specifies which schemas to migrate. Use `dbo` as the default, or enter a comma-delimited list such as `'dbo','sales'`.

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-parameters-schema-name.png" alt-text="Screenshot from Data Factory showing the SchemaName pipeline parameter.":::

##### Configure the Lookup activity

Create a Lookup activity, and set its connection to the source SQL Server database. In the **Settings** tab:

- Set **Data store type** to **External**.
- Select the source SQL Server connection.
- Set **Use query** to **Query**.
- Add a dynamic query that returns the source schema and table names.

Use the following expression to create the query:

```json
@concat('
SELECT s.name AS SchemaName,
t.name AS TableName
FROM sys.tables AS t
INNER JOIN sys.schemas AS s
ON t.type = ''U''
AND s.schema_id = t.schema_id
AND s.name in (',coalesce(pipeline().parameters.SchemaName, 'dbo'),')
')
```

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-query-dynamic-content.png" alt-text="Screenshot from Data Factory showing a dynamic query in the Lookup activity.":::

##### Configure the ForEach activity

In the **Settings** tab for the ForEach activity:

- Disable **Sequential** to allow iterations to run concurrently.
- Set **Batch count** to a value the source database can sustain. Start with a conservative value and test it.
- Set **Items** to `@activity('Get List of Source Objects').output.value`.

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-settings-foreach-loop-items.png" alt-text="Screenshot showing the settings for a ForEach activity.":::

##### Configure the Copy activity

Inside the ForEach activity, add a Copy activity. In the **Source** tab:

- Set **Data store type** to **External**.
- Select the source SQL Server connection.
- Set **Use query** to **Query**.
- Set **Query** to `@concat('SELECT TOP 0 * FROM ',item().SchemaName,'.',item().TableName)` so that only table metadata is migrated.

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-foreach-copy-activity-source.png" alt-text="Screenshot from Data Factory showing the source settings for the Copy activity." lightbox="media/migration-sql-server-methods/fabric-data-factory-foreach-copy-activity-source.png":::

In the **Destination** tab:

- Set **Data store type** to **Workspace**.
- Set **Workspace data store type** to **Data Warehouse**, and select the destination warehouse.
- Set the destination schema to `@item().SchemaName`.
- Set the destination table to `@item().TableName`.

:::image type="content" source="media/migration-sql-server-methods/fabric-data-factory-foreach-copy-activity-destination.png" alt-text="Screenshot from Data Factory showing the destination settings for the Copy activity." lightbox="media/migration-sql-server-methods/fabric-data-factory-foreach-copy-activity-destination.png":::

After you run the pipeline, verify that Fabric Data Warehouse contains each selected table with the expected schema.

## Migrate using SQL scripts

Use T-SQL and PowerShell migration scripts when you want granular control over schema conversion, data extraction, and code assessment.

Migration scripts can:

- Convert schema (DDL) to Fabric Data Warehouse syntax.
- Create schema objects in Fabric Data Warehouse.
- Extract data from SQL Server to ADLS Gen2.
- Flag unsupported T-SQL syntax in stored procedures, functions, and views.

The Microsoft Fabric CAT team provides migration code samples in the [fabric-migration repository](https://github.com/microsoft/fabric-migration/tree/main/data-warehouse).

#### Recommended use

Use scripts when you're familiar with T-SQL, prefer an integrated development environment, and need to control individual migration tasks. Use `COPY INTO` or Data Factory to ingest extracted data into Fabric Data Warehouse.

## Migrate using SQL database projects

Fabric Data Warehouse is supported in the [SQL Database Projects extension](/sql/tools/visual-studio-code-extensions/sql-database-projects/sql-database-projects-extension?view=fabric&preserve-view=true) for [Visual Studio Code](https://visualstudio.microsoft.com/downloads/).

A SQL database project provides source control, database testing, schema validation, and deployment capabilities. It can:

- Convert schema (DDL) to Fabric Data Warehouse syntax.
- Create schema objects in Fabric Data Warehouse.
- Assess unsupported T-SQL syntax in stored procedures, functions, and views.

For data migration, use Data Factory to copy directly from SQL Server, or extract data to ADLS Gen2 and ingest it with `COPY INTO` or Data Factory.

For a walkthrough of using SQL database projects with migration scripts, see the [fabric-migration repository](https://github.com/microsoft/fabric-migration/tree/main/data-warehouse#deploy_and_create_migration_scripts_from_sourceps1---deploy-as-sql-package).

For more information, see [Get started with the SQL Database Projects extension](/sql/tools/visual-studio-code-extensions/sql-database-projects/getting-started-sql-database-projects-extension?view=fabric&preserve-view=true) and [Build a database project from the command line](/sql/tools/visual-studio-code-extensions/sql-database-projects/build-database-project-from-command-line?view=fabric&preserve-view=true).

## Migration with dbt

If your SQL Server data warehouse uses dbt, you can use the dbt adapter for Fabric Data Warehouse to convert schema and database code by changing the target profile and adapter.

The dbt framework generates DDL and DML scripts from model files. You must migrate the data separately by using Data Factory or another data migration option in this article.

To get started, see [Tutorial: Set up dbt for Fabric Data Warehouse](tutorial-setup-dbt.md).

## Data ingestion into Fabric Data Warehouse

For staged data, use `COPY INTO` or Fabric Data Factory to ingest files from ADLS Gen2 into Fabric Data Warehouse. Consider the following guidance:

- Extract large tables in parallel when the source database and network have sufficient capacity.
- Prefer Parquet files to reduce storage and network use and improve ingestion efficiency.
- Load multiple destination tables concurrently when your Fabric capacity can support the workload.
- Monitor both source extraction and Fabric capacity to find the optimal degree of parallelism.

## Related content

- [Fabric Migration Assistant for Data Warehouse](migration-assistant.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
- [Microsoft Fabric migration overview](../fundamentals/migration.md)