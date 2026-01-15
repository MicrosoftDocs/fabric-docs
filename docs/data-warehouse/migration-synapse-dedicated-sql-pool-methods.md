---
title: Migration Methods for ​​Azure Synapse Dedicated SQL Pools to Fabric Migration​
description: This article details the methods of migration of data warehousing in Azure Synapse dedicated SQL pools to Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: arturv, johoang
ms.date: 04/06/2025
ms.topic: concept-article
ms.custom:
  - fabric-cat
---

# Migration​ methods for ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

This article details the methods of migration of data warehousing in Azure Synapse Analytics dedicated SQL pools to Microsoft Fabric Warehouse.  

> [!TIP]
> For more information on strategy and planning your migration, see [Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-warehouse.md).
>
> An automated experience for migration from Azure Synapse Analytics dedicated SQL pools is available using the [Fabric Migration Assistant for Data Warehouse](migration-assistant.md). The rest of this article contains more manual migration steps.

This table summarizes information for data schema (DDL), database code (DML), and data migration methods. We expand further on each scenario later in this article, linked in the **Option** column.

| Option Number | Option | What it does | Skill/Preference | Scenario |
|:--|:--|:--|:--|:--|
|1| [Data Factory](#option-1-schemadata-migration---copy-wizard-and-foreach-copy-activity) | Schema (DDL) conversion<br />Data extract<br />Data ingestion | ADF/Pipeline| Simplified all in one schema (DDL) and data migration. Recommended for [dimension tables](dimensional-modeling-dimension-tables.md).|
|2| [Data Factory with partition](#option-2-ddldata-migration---pipeline-using-partition-option) | Schema (DDL) conversion<br />Data extract<br />Data ingestion | ADF/Pipeline | Using partitioning options to increase read/write parallelism providing ten times the throughput vs option 1, recommended for [fact tables](dimensional-modeling-fact-tables.md).|
|3| [Data Factory with accelerated code](#option-3-ddl-migration---copy-wizard-foreach-copy-activity) | Schema (DDL) conversion | ADF/Pipeline | Convert and migrate the schema (DDL) first, then use CETAS to extract and COPY/Data Factory to ingest data for optimal overall ingestion performance. |
|4| [Stored procedures accelerated code](#migration-using-stored-procedures-in-synapse-dedicated-sql-pool) | Schema (DDL) conversion<br />Data extract<br />Code assessment | T-SQL | SQL user using IDE with more granular control over which tasks they want to work on. Use COPY/Data Factory to ingest data. |
|5| [SQL Database Project extension for Visual Studio Code](#migrate-using-sql-database-projects) | Schema (DDL) conversion<br />Data extract<br />Code assessment | SQL Project | SQL Database Project for deployment with the integration of option 4. Use COPY or Data Factory to ingest data.|
|6| [CREATE EXTERNAL TABLE AS SELECT (CETAS)](#migration-of-data-with-cetas) | Data extract | T-SQL | Cost effective and high-performance data extract into Azure Data Lake Storage (ADLS) Gen2. Use COPY/Data Factory to ingest data.|
|7| [Migrate using dbt](#migration-via-dbt) | Schema (DDL) conversion<br />database code (DML) conversion | dbt | Existing dbt users can use the dbt Fabric adapter to convert their DDL and DML. You must then migrate data using other options in this table. |

## Choose a workload for the initial migration

When you're deciding where to start on the Synapse dedicated SQL pool to Fabric Warehouse migration project, choose a workload area where you're able to:

- Prove the viability of migrating to Fabric Warehouse by quickly delivering the benefits of the new environment. Start small and simple, prepare for multiple small migrations.
- Allow your in-house technical staff time to gain relevant experience with the processes and tools that they use when they migrate to other areas.
- Create a template for further migrations that's specific to the source Synapse environment, and the tools and processes in place to help. 

> [!TIP]
> Create an inventory of objects that need to be migrated, and document the migration process from start to end, so that it can be repeated for other dedicated SQL pools or workloads.

The volume of migrated data in an initial migration should be large enough to demonstrate the capabilities and benefits of the Fabric Warehouse environment, but not too large to quickly demonstrate value. A size in the 1-10 terabyte range is typical.

## Migration with Fabric Data Factory

In this section, we discuss the options using Data Factory for the low-code/no-code persona who are familiar with Azure Data Factory and Synapse Pipeline. This drag and drop UI option provides a simple step to convert the DDL and migrate the data.

Fabric Data Factory can perform the following tasks:

- Convert the schema (DDL) to Fabric Warehouse syntax.
- Create the schema (DDL) on Fabric Warehouse.
- Migrate the data to Fabric Warehouse.

### Option 1. Schema/Data migration - Copy Wizard and ForEach Copy Activity

This method uses Data Factory Copy assistant to connect to the source dedicated SQL pool, convert the dedicated SQL pool DDL syntax to Fabric, and copy data to Fabric Warehouse. You can select one or more target tables (for TPC-DS dataset there are 22 tables). It generates the ForEach to loop through the list of tables selected in the UI and spawn 22 parallel Copy Activity threads.

- 22 SELECT queries (one for each table selected) were generated and executed in the dedicated SQL pool.
- Make sure you have the appropriate DWU and resource class to allow the queries generated to be executed. For this case, you need a minimum of DWU1000 with `staticrc10` to allow a maximum of 32 queries to handle 22 queries submitted.
- Data Factory direct copying data from the dedicated SQL pool to Fabric Warehouse requires staging. The ingestion process consisted of two phases. 
    - The first phase consists of extracting the data from the dedicated SQL pool into ADLS and is referred as staging.  
    - The second phase consists of ingesting the data from staging into Fabric Warehouse. Most of the data ingestion timing is in the staging phase. In summary, staging has a huge impact on ingestion performance.  

#### Recommended use

Using the Copy Wizard to generate a ForEach provides simple UI to convert DDL and ingest the selected tables from the dedicated SQL pool to Fabric Warehouse in one step. 

However, it isn't optimal with the overall throughput. The requirement to use staging, the need to parallelize read and write for the "Source to Stage" step are the major factors for the performance latency. It's recommended to use this option for dimension tables only.

<a id="option-2-ddldata-migration---data-pipeline-using-partition-option"></a>

### Option 2. DDL/Data migration - Pipeline using partition option

To address improving the throughput to load larger fact tables using Fabric pipeline, it's recommended to use Copy Activity for each Fact table with partition option. This provides the best performance with Copy activity. 

You have the option of using the source table physical partitioning, if available. If table doesn't have physical partitioning, you must specify the partition column and supply min/max values to use dynamic partitioning. In the following screenshot, the pipeline **Source** options are specifying a dynamic range of partitions based on the `ws_sold_date_sk` column.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-source-partition-option.png" alt-text="Screenshot of a pipeline, depicting the option to specify the primary key, or the date for the dynamic partition column.":::

While using partition can increase the throughput with the staging phase, there are considerations to make the appropriate adjustments:

- Depending on your partition range, it might potentially use all the concurrency slots as it might generate over 128 queries on the dedicated SQL pool.  
- You're required to scale to a minimum of DWU6000 to allow all queries to be executed.
- As an example, for TPC-DS `web_sales` table, 163 queries were submitted to the dedicated SQL pool. At DWU6000, 128 queries were executed while 35 queries were queued.
- Dynamic partition automatically selects the range partition. In this case, an 11-day range for each SELECT query submitted to the dedicated SQL pool. For example:
    ```sql
    WHERE [ws_sold_date_sk] > '2451069' AND [ws_sold_date_sk] <= '2451080')
    ...
    WHERE [ws_sold_date_sk] > '2451333' AND [ws_sold_date_sk] <= '2451344')
    ```

#### Recommended use

For fact tables, we recommended using Data Factory with partitioning option to increase throughput. 

However, the increased parallelized reads require dedicated SQL pool to scale to higher DWU to allow the extract queries to be executed. Leveraging partitioning, the rate is improved ten times over a no partition option. You could increase the DWU to get additional throughput via compute resources, but the dedicated SQL pool has a maximum 128 active queries allow.

For more information on Synapse DWU to Fabric mapping, see [Blog: Mapping ​​Azure Synapse dedicated SQL pools to Fabric data warehouse compute](https://blog.fabric.microsoft.com/blog/mapping-azure-synapse-dedicated-sql-pools-to-fabric-data-warehouse-compute/).

### Option 3. DDL migration - Copy Wizard ForEach Copy Activity

The two previous options are great data migration options for *smaller* databases. But if you require higher throughput, we recommend an alternative option:

1. Extract the data from the dedicated SQL pool to ADLS, therefore mitigating the stage performance overhead.
1. Use either Data Factory or the COPY command to ingest the data into Fabric Warehouse.

#### Recommended use

You can continue to use Data Factory to convert your schema (DDL). Using the Copy Wizard, you can select the specific table or **All tables**. By design, this migrates the schema and data in one step, extracting the schema without any rows, using the false condition, `TOP 0` in the query statement.

The following code sample covers schema (DDL) migration with Data Factory.

#### Code example: Schema (DDL) migration with Data Factory

You can use Fabric Pipelines to easily migrate over your DDL (schemas) for table objects from any source Azure SQL Database or dedicated SQL pool. This pipeline migrates over the schema (DDL) for the source dedicated SQL pool tables to Fabric Warehouse.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-schema-migration.png" alt-text="Screenshot from Fabric Data Factory showing a Lookup object leading to a For Each Object. Inside the For Each Object, there are Activities to Migrate DDL.":::

##### Pipeline design: parameters

This pipeline accepts a parameter `SchemaName`, which allows you to specify which schemas to migrate over. The `dbo` schema is the default. 

In the **Default value** field, enter a comma-delimited list of table schema indicating which schemas to migrate: `'dbo','tpch'` to provide two schemas, `dbo` and `tpch`.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-parameters-schemaname.png" alt-text="Screenshot from Data Factory showing the Parameters tab of a Pipeline. In the Name field, 'SchemaName'. In the Default value field, 'dbo','tpch', indicating these two schemas should be migrated.":::

##### Pipeline design: Lookup activity

Create a Lookup Activity and set the Connection to point to your source database. 

In the **Settings** tab:

- Set **Data store type** to **External**.
- **Connection** is your Azure Synapse dedicated SQL pool. **Connection type** is **Azure Synapse Analytics**.
- **Use query** is set to **Query**.
- The *Query* field needs to be built using a dynamic expression, allowing the parameter SchemaName to be used in a query that returns a list of target source tables. Select **Query** then select **Add dynamic content**.

    This expression within the LookUp Activity generates a SQL statement to query the system views to retrieve a list of schemas and tables. References the SchemaName parameter to allow for filtering on SQL schemas. The Output of this is an Array of SQL schema and tables that will be used as input into the ForEach Activity.

    Use the following code to return a list of all user tables with their schema name.

    ```json
    @concat('
    SELECT s.name AS SchemaName,
    t.name  AS TableName
    FROM sys.tables AS t
    INNER JOIN sys.schemas AS s
    ON t.type = ''U''
    AND s.schema_id = t.schema_id
    AND s.name in (',coalesce(pipeline().parameters.SchemaName, 'dbo'),')
    ')
    ```

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-query-dynamic-content.png" alt-text="Screenshot from Data Factory showing the Settings tab of a Pipeline. The 'Query' button is selected and code is pasted into the 'Query' field.":::

##### Pipeline design: ForEach Loop

For the ForEach Loop, configure the following options in the **Settings** tab: 

- Disable **Sequential** to allow for multiple iterations to run concurrently.
- Set **Batch count** to `50`, limiting the maximum number of concurrent iterations.
- The Items field needs to use dynamic content to reference the output of the LookUp Activity. Use the following code snippet: `@activity('Get List of Source Objects').output.value`

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-settings-foreach-loop-items.png" alt-text="Screenshot showing the ForEach Loop Activity's settings tab.":::
 
##### Pipeline design: Copy Activity inside the ForEach Loop

Inside the ForEach Activity, add a Copy Activity. This method uses the Dynamic Expression Language within pipelines to build a `SELECT TOP 0 * FROM <TABLE>` to migrate only the schema without data into a Fabric Warehouse.

In the **Source** tab:

- Set **Data store type** to **External**.
- **Connection** is your Azure Synapse dedicated SQL pool. **Connection type** is **Azure Synapse Analytics**.
- Set **Use Query** to **Query**.
- In the **Query** field, paste in the dynamic content query and use this expression which will return zero rows, only the table schema: `@concat('SELECT TOP 0 * FROM ',item().SchemaName,'.',item().TableName)`

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-foreach-copy-activity-source.png" alt-text="Screenshot from Data Factory showing the Source tab of the Copy Activity inside the ForEach Loop." lightbox="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-foreach-copy-activity-source.png":::

In the **Destination** tab:

- Set **Data store type** to **Workspace**.
- The **Workspace data store type** is **Data Warehouse** and the **Data Warehouse** is set to the Fabric Warehouse.
- The destination **Table**'s schema and table name are defined using dynamic content. 
    - Schema refers to the current iteration's field, SchemaName with the snippet: `@item().SchemaName`
    - Table is referencing TableName with the snippet: `@item().TableName`

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-foreach-copy-activity-destination.png" alt-text="Screenshot from Data Factory showing the Destination tab of the Copy Activity inside each ForEach Loop." lightbox="media/migration-synapse-dedicated-sql-pool-methods/fabric-data-factory-foreach-copy-activity-destination.png":::

##### Pipeline design: Sink

For Sink, point to your Warehouse and reference the Source Schema and Table name.

Once you run this pipeline, you see your Data Warehouse populated with each table in your source, with the proper schema.

## Migration using stored procedures in Synapse dedicated SQL pool

This option uses stored procedures to perform the Fabric Migration. 

You can get the [code samples at microsoft/fabric-migration on GitHub.com](https://github.com/microsoft/fabric-migration/tree/main/data-warehouse). This code is shared as open source, so feel free to contribute to collaborate and help the community.

What Migration Stored Procedures can do:

- Convert the schema (DDL) to Fabric Warehouse syntax.
- Create the schema (DDL) on Fabric Warehouse.
- Extract data from Synapse dedicated SQL pool to ADLS.
- Flag nonsupported Fabric syntax for T-SQL codes (stored procedures, functions, views).

#### Recommended use

This is a great option for those who:

- Are familiar with T-SQL.
- Want to use an integrated development environment such as SQL Server Management Studio (SSMS).
- Want more granular control over which tasks they want to work on.

You can execute the specific stored procedure for the schema (DDL) conversion, data extract, or T-SQL code assessment.

For the data migration, you need to use either COPY INTO or Data Factory to ingest the data into Fabric Warehouse.

## Migrate using SQL database projects

Microsoft Fabric Data Warehouse is supported in the [SQL Database Projects extension](/sql/tools/visual-studio-code-extensions/sql-database-projects/sql-database-projects-extension?view=fabric&preserve-view=true) available inside of [Visual Studio Code](https://visualstudio.microsoft.com/downloads/).

This extension is available inside Visual Studio Code. This feature enables capabilities for source control, database testing, and schema validation.  

For more information on source control for warehouses in Microsoft Fabric, including Git integration and deployment pipelines, see [Source Control with Warehouse](source-control.md).

#### Recommended use

This is a great option for those who prefer to use SQL Database Project for their deployment. This option essentially integrated the Fabric Migration Stored Procedures into the SQL Database Project to provide a seamless migration experience.  

A SQL Database Project can:

- Convert the schema (DDL) to Fabric Warehouse syntax.
- Create the schema (DDL) on Fabric Warehouse.
- Extract data from Synapse dedicated SQL pool to ADLS.
- Flag nonsupported syntax for T-SQL codes (stored procedures, functions, views).

For the data migration, you'll then use either COPY INTO or Data Factory to ingest the data into Fabric Warehouse. 

The Microsoft Fabric CAT team has provided a set of PowerShell scripts to handle the extraction, creation, and deployment of schema (DDL) and database code (DML) via a SQL Database Project. For a walkthrough of using the SQL Database project with our helpful PowerShell scripts, see [microsoft/fabric-migration on GitHub.com](https://github.com/microsoft/fabric-migration/tree/main/data-warehouse#deploy_and_create_migration_scripts_from_sourceps1---deploy-as-sql-package). 

For more information on SQL Database Projects, see [Getting started with the SQL Database Projects extension](/azure-data-studio/extensions/sql-database-project-extension-getting-started?view=fabric&preserve-view=true) and [Build and Publish a project](/azure-data-studio/extensions/sql-database-project-extension-build?view=fabric&preserve-view=true).

## Migration of data with CETAS

The T-SQL CREATE EXTERNAL TABLE AS SELECT (CETAS) command provides the most cost effective and optimal method to extract data from Synapse dedicated SQL pools to Azure Data Lake Storage (ADLS) Gen2.

What CETAS can do:

- Extract data into ADLS.
    - This option requires users to create the schema (DDL) on Fabric Warehouse before ingesting the data. Consider the options in this article to migrate schema (DDL).

The advantages of this option are:

- Only a single query per table is submitted against the source Synapse dedicated SQL pool. This won't use up all the concurrency slots, and so won't block concurrent customer production ETL/queries.
- Scaling to DWU6000 isn't required, as only a single concurrency slot is used for each table, so customers can use lower DWUs.
- The extract is run in parallel across all the compute nodes, and this is the key to the improvement of performance.

#### Recommended use

Use CETAS to extract the data to ADLS as Parquet files. Parquet files provide the advantage of efficient data storage with columnar compression that will take less bandwidth to move across the network. Furthermore, since Fabric stored the data as Delta parquet format, data ingestion will be 2.5x faster compared to text file format, since there's no conversion to the Delta format overhead during ingestion.  

To increase CETAS throughput:

- Add parallel CETAS operations, increasing the use of concurrency slots but allowing more throughput.
- Scale the DWU on Synapse dedicated SQL pool.

## Migration via dbt

In this section, we discuss dbt option for those customers who are already using dbt in their current Synapse dedicated SQL pool environment.

What dbt can do:

- Convert the schema (DDL) to Fabric Warehouse syntax.
- Create the schema (DDL) on Fabric Warehouse.
- Convert database code (DML) to Fabric syntax.

The dbt framework generates DDL and DML (SQL scripts) on the fly with each execution. With model files expressed in SELECT statements, the DDL/DML can be translated instantly to any target platform by changing the profile (connection string) and the adapter type.

#### Recommended use

The dbt framework is code-first approach. The data must be migrated by using options listed in this document, such as [CETAS](#migration-of-data-with-cetas) or [COPY/Data Factory](#option-1-schemadata-migration---copy-wizard-and-foreach-copy-activity).

The dbt adapter for Microsoft Fabric Data Warehouse allows the existing dbt projects that were targeting different platforms such as Synapse dedicated SQL pools, Snowflake, Databricks, Google Big Query, or Amazon Redshift to be migrated to a Fabric Warehouse with a simple configuration change.

To get started with a dbt project targeting Fabric Warehouse, see [Tutorial: Set up dbt for Fabric Data Warehouse](tutorial-setup-dbt.md). This document also lists an option to move between different warehouses/platforms.

## Data Ingestion into Fabric Warehouse

For ingestion into Fabric Warehouse, use COPY INTO or Fabric Data Factory, depending on your preference. Both methods are the recommended and best performing options, as they have equivalent performance throughput, given the prerequisite that the files are already extracted to Azure Data Lake Storage (ADLS) Gen2.

Several factors to note so that you can design your process for maximum performance:

- With Fabric, there isn't any resource contention when loading multiple tables from ADLS to Fabric Warehouse concurrently. As a result, there's no performance degradation when loading parallel threads. The maximum ingestion throughput will only be limited by the compute power of your Fabric capacity.
- Fabric workload management provides separation of resources allocated for load and query. There's no resource contention while queries and data loading executed at the same time.

## Related content

- [Fabric Migration Assistant for Data Warehouse](migration-assistant.md)
- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
- [Blog: Mapping ​​Azure Synapse dedicated SQL pools to Fabric data warehouse compute](https://blog.fabric.microsoft.com/blog/mapping-azure-synapse-dedicated-sql-pools-to-fabric-data-warehouse-compute/)
- [Microsoft Fabric Migration Overview](../fundamentals/migration.md)
