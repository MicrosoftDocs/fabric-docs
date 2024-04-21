---
title: ​​Azure Synapse dedicated SQL pools to Fabric Migration​
description: This article details the strategy, considerations, and methods of migration of data warehousing in Azure Synapse dedicated SQL pools to Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: arturv, johoang
ms.date: 11/15/2023
ms.topic: conceptual
ms.custom:
  - fabric-cat
  - ignite-2023
  - ignite-2023-fabric
---

# Migration​: ​Azure Synapse Analytics dedicated SQL pools to Fabric

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

This article details the strategy, considerations, and methods of migration of data warehousing in Azure Synapse Analytics dedicated SQL pools to Microsoft Fabric Warehouse. 

## Migration introduction

As Microsoft introduced [Microsoft Fabric](../get-started/microsoft-fabric-overview.md), an all-in-one SaaS analytics solution for enterprises that offers a comprehensive suite of services, including [Data Factory](../data-factory/data-factory-overview.md), [Data Engineering](../data-engineering/data-engineering-overview.md), [Data Warehousing](../data-warehouse/data-warehousing.md), [Data Science](../data-science/data-science-overview.md), [Real-Time Analytics](../real-time-analytics/overview.md), and [Power BI](/power-bi/fundamentals/power-bi-overview). 

This article focuses on options for schema (DDL) migration, database code (DML) migration, and data migration. Microsoft offers several options, and here we discuss each option in detail and provide guidance on which of these options you should consider for your scenario. This article uses the TPC-DS industry benchmark for illustration and performance testing. Your actual result might vary depending on many factors including type of data, data types, width of tables, data source latency, etc.

## Prepare for migration

Carefully plan your migration project before you get started and ensure that your schema, code, and data are compatible with Fabric Warehouse. There are some [limitations](../data-warehouse/limitations.md) that you need to consider. Quantify the refactoring work of the incompatible items, as well as any other resources needed before the migration delivery.

Another key goal of planning is to adjust your design to ensure that your solution takes full advantage of the high query performance that Fabric Warehouse is designed to provide. Designing data warehouses for scale introduces unique design patterns, so traditional approaches aren't always the best. Review the [Fabric Warehouse performance guidelines](../data-warehouse/guidelines-warehouse-performance.md), because although some design adjustments can be made after migration, making changes earlier in the process will save you time and effort. Migration from one technology/environment to another is always a major effort.

The following diagram depicts the Migration Lifecycle listing the major pillars consisting of **Assess and Evaluate**, **Plan and Design**, **Migrate**, **Monitor and Govern**, **Optimize and Modernize** pillars with the associated tasks in each pillar to plan and prepare for the smooth migration.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/warehouse-migration-lifecycle.png" alt-text="Diagram of the Migration Lifecycle." lightbox="media/migration-synapse-dedicated-sql-pool-warehouse/warehouse-migration-lifecycle.png":::

## Runbook for migration

Consider the following activities as a planning runbook for your migration from Synapse dedicated SQL pools to Fabric Warehouse.

1. **Assess and Evaluate**
    1. Identify objectives and motivations. Establish clear desired outcomes.
    1. Discovery, assess, and baseline the existing architecture.
    1. Identify key stakeholders and sponsors.
    1. Define the scope of what is to be migrated.
        1. Start small and simple, prepare for multiple small migrations.
        1. Begin to monitor and document all stages of the process.
        1. Build inventory of data and processes for migration.
        1. Define data model changes (if any).
        1. Set up the Fabric Workspace.
    1. What is your skillset/preference?
        1. Automate wherever possible.
        1. Use Azure built-in tools and features to reduce migration effort.
    1. Train staff early on the new platform.
        1. Identify upskilling needs and training assets, including [Microsoft Learn](/training/paths/get-started-fabric/).
1. **Plan and Design**
    1. Define the desired architecture. 
    1. Select the [method/tools for the migration](#schema-code-and-data-migration-methods) to accomplish the following tasks:
        1. Data extraction from the source.
        1. Schema (DDL) conversion, including metadata for tables and views
        1. Data ingestion, including historical data.
            1. If necessary, re-engineer the data model using new platform performance and scalability.
        1. Database code (DML) migration.
            1. Migrate or refactor stored procedures and business processes.
    1. Inventory and extract the security features and object permissions from the source.
    1. Design and plan to replace/modify existing ETL/ELT processes for incremental load.
        1. Create parallel ETL/ELT processes to the new environment.
    1. Prepare a detailed migration plan.
        1. Map current state to new desired state.
1. **Migrate**
    1. Perform schema, data, code migration.
        1. Data extraction from the source.
        1. Schema (DDL) conversion
        1. [Data ingestion](#data-ingestion-into-fabric-warehouse)
        1. Database code (DML) migration.
    1. If necessary, scale the dedicated SQL pool resources up temporarily to aid speed of migration.
    1. Apply security and permissions.
    1. Migrate existing ETL/ELT processes for incremental load.
        1. Migrate or refactor ETL/ELT incremental load processes.
        1. Test and compare parallel increment load processes.
    1. Adapt detail migration plan as necessary.
1. **Monitor and Govern**
    1. Run in parallel, compare against your source environment.
        1. Test applications, business intelligence platforms, and query tools.
        1. Benchmark and optimize query performance.
        1. Monitor and manage cost, security, and performance.
    1. Governance benchmark and assessment.
1. **Optimize and Modernize**
    1. When the business is comfortable, transition applications and primary reporting platforms to Fabric.
        1. Scale resources up/down as workload shifts from Azure Synapse Analytics to Microsoft Fabric.
        1. Build a repeatable template from the experience gained for future migrations. Iterate.
        1. Identify opportunities for cost optimization, security, scalability, and operational excellence
        1. Identify opportunities to modernize your data estate with the [latest Fabric features](../get-started/whats-new.md).

## 'Lift and shift' or modernize?

In general, there are two types of migration scenarios, regardless of the purpose and scope of the planned migration: lift and shift as-is, or a phased approach that incorporates architectural and code changes.

### Lift and shift

In a lift and shift migration, an existing data model is migrated with minor changes to the new Fabric Warehouse. This approach minimizes risk and migration time by reducing the new work needed to realize the benefits of migration.

Lift and shift migration is a good fit for these scenarios:

- You have an existing environment with a small number of data marts to migrate.
- You have an existing environment with data that's already in a well-designed star or snowflake schema.
- You're under time and cost pressure to move to Fabric Warehouse.

In summary, this approach works well for those workloads that is optimized with your current Synapse dedicated SQL pools environment, and therefore doesn't require major changes in Fabric.

### Modernize in a phased approach with architectural changes

If a legacy data warehouse has evolved over a long period of time, you might need to re-engineer it to maintain the required performance levels.

You might also want to redesign the architecture to take advantage of the new engines and features available in the Fabric Workspace.  

## Design differences: Synapse dedicated SQL pools and Fabric Warehouse

Consider the following Azure Synapse and Microsoft Fabric data warehousing differences, comparing dedicated SQL pools to the Fabric Warehouse.

### Table considerations

When you migrate tables between different environments, typically only the raw data and the metadata physically migrate. Other database elements from the source system, such as indexes, usually aren't migrated because they might be unnecessary or implemented differently in the new environment.

Performance optimizations in the source environment, such as indexes, indicate where you might add performance optimization in a new environment, but now Fabric takes care of that automatically for you.

### T-SQL considerations

There are several Data Manipulation Language (DML) syntax differences to be aware of. Refer to [T-SQL surface area in Microsoft Fabric](tsql-surface-area.md). Consider also a [code assessment when choosing method(s) of migration for the database code (DML)](#schema-code-and-data-migration-methods).

Depending on the parity differences at the time of the migration, you might need to rewrite parts of your T-SQL DML code.

### Data type mapping differences

There are several data type differences in Fabric Warehouse. For more information, see [Data types in Microsoft Fabric](data-types.md).

The following table provides the mapping of supported data types from Synapse dedicated SQL pools to Fabric Warehouse.

|Synapse dedicated SQL pools | Fabric Warehouse|
|:--|:--|
| money |     decimal(19,4) |
| smallmoney |     decimal(10,4) |
| smalldatetime |     datetime2 |
| datetime |     datetime2 |
| nchar |     char |
| nvarchar |     varchar |
| tinyint |     smallint |
| binary |     varbinary |
| datetimeoffset\* |     datetime2 |

\* Datetime2 does not store the extra time zone offset information that is stored in. Since the datetimeoffset data type is not currently supported in Fabric Warehouse, the time zone offset data would need to be extracted into a separate column.

## Schema, code, and data migration methods

Review and identify which of these options fits your scenario, staff skill sets, and the characteristics of your data. The option(s) chosen will depend on your experience, preference, and the benefits from each of the tools. Our goal is to continue to develop migration tools that mitigate friction and manual intervention to make that migration experience seamless.

This table summarizes information for data schema (DDL), database code (DML), and data migration methods. We expand further on each scenario later in this article, linked in the **Option** column.

| Option Number | Option | What it does | Skill/Preference | Scenario |
|:--|:--|:--|:--|:--|
|1| [Data Factory](#option-1-schemadata-migration---copy-wizard-and-foreach-copy-activity) | Schema (DDL) conversion<br />Data extract<br />Data ingestion | ADF/Pipeline| Simplified all in one schema (DDL) and data migration.  Recommended for dimension tables.|
|2| [Data Factory with partition](#option-2-ddldata-migration---data-pipeline-using-partition-option) | Schema (DDL) conversion<br />Data extract<br />Data ingestion | ADF/Pipeline | Using partitioning options to increase read/write parallelism providing 10x throughput vs option 1, recommended for fact tables.|
|3| [Data Factory with accelerated code](#option-3-ddl-migration---copy-wizard-foreach-copy-activity) | Schema (DDL) conversion | ADF/Pipeline | Convert and migrate the schema (DDL) first, then use CETAS to extract and COPY/Data Factory to ingest data for optimal overall ingestion performance. |
|4| [Stored procedures accelerated code](#migration-using-stored-procedures-in-synapse-dedicated-sql-pool) | Schema (DDL) conversion<br />Data extract<br />Code assessment | T-SQL | SQL user using IDE with more granular control over which tasks they want to work on. Use COPY/Data Factory to ingest data. |
|5| [SQL Database Project extension for Azure Data Studio](#migration-using-sql-database-project) | Schema (DDL) conversion<br />Data extract<br />Code assessment | SQL Project | SQL Database Project for deployment with the integration of option 4. Use COPY or Data Factory to ingest data.|
|6| [CREATE EXTERNAL TABLE AS SELECT (CETAS)](#migration-of-data-with-cetas) | Data extract | T-SQL | Cost effective and high-performance data extract into Azure Data Lake Storage (ADLS) Gen2. Use COPY/Data Factory to ingest data.|
|7| [Migrate using dbt](#migration-via-dbt) | Schema (DDL) conversion<br />database code (DML) conversion | dbt | Existing dbt users can use the dbt Fabric adapter to convert their DDL and DML. You must then migrate data using other options in this table. |

## Choose a workload for the initial migration

When you're deciding where to start on the Synapse dedicated SQL pool to Fabric Warehouse migration project, choose a workload area where you are able to:

- Prove the viability of migrating to Fabric Warehouse by quickly delivering the benefits of the new environment. Start small and simple, prepare for multiple small migrations.
- Allow your in-house technical staff time to gain relevant experience with the processes and tools that they use when they migrate to other areas.
- Create a template for further migrations that's specific to the source Synapse environment, and the tools and processes in place to help. 

> [!TIP]
> Create an inventory of objects that need to be migrated, and document the migration process from start to end, so that it can be repeated for other dedicated SQL pools or workloads.

The volume of migrated data in an initial migration should be large enough to demonstrate the capabilities and benefits of the Fabric Warehouse environment, but not too large to quickly demonstrate value. A size in the 1-10 terabyte range is typical.

## Migration with Fabric Data Factory

In this section, we discuss the options using Data Factory for the low-code/no-code persona who are familiar with Azure Data Factory and Synapse Pipeline.  This drag and drop UI option provides a simple step to convert the DDL and migrate the data.

Fabric Data Factory can perform the following tasks:

- Convert the schema (DDL) to Fabric Warehouse syntax.
- Create the schema (DDL) on Fabric Warehouse.
- Migrate the data to Fabric Warehouse.

### Option 1. Schema/Data migration - Copy Wizard and ForEach Copy Activity

This method uses Data Factory Copy assistant to connect to the source dedicated SQL pool, convert the dedicated SQL pool DDL syntax to Fabric, and copy data to Fabric Warehouse. You can select 1 or more target tables (for TPC-DS dataset there are 22 tables). It generates the ForEach to loop through the list of tables selected in the UI and spawn 22 parallel Copy Activity threads.

- 22 SELECT queries (one for each table selected) were generated and executed in the dedicated SQL pool.
- Make sure you have the appropriate DWU and resource class to allow the queries generated to be executed. For this case, you need a minimum of DWU1000 with `staticrc10` to allow a maximum of 32 queries to handle 22 queries submitted.
- Data Factory direct copying data from the dedicated SQL pool to Fabric Warehouse requires staging. The ingestion process consisted of two phases. 
    - The first phase consists of extracting the data from the dedicated SQL pool into ADLS and is referred as staging.  
    - The second phase consists of ingesting the data from staging into Fabric Warehouse. Most of the data ingestion timing is in the staging phase. In summary, staging has a huge impact on ingestion performance.  

#### Recommended use

Using the Copy Wizard to generate a ForEach provides simple UI to convert DDL and ingest the selected tables from the dedicated SQL pool to Fabric Warehouse in one step. 

However, it isn't optimal with the overall throughput.  The requirement to use staging, the need to parallelize read and write for the "Source to Stage" step are the major factors for the performance latency. It's recommended to use this option for dimension tables only.

### Option 2. DDL/Data migration - Data pipeline using partition option

To address improving the throughput to load larger fact tables using Fabric data pipeline, it's recommended to use Copy Activity for each Fact table with partition option. This provides the best performance with Copy activity. 

You have the option of using the source table physical partitioning, if available. If table does not have physical partitioning, you must specify the partition column and supply min/max values to use dynamic partitioning. In the following screenshot, the data pipeline **Source** options are specifying a dynamic range of partitions based on the `ws_sold_date_sk` column.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-source-partition-option.png" alt-text="Screenshot of a data pipeline, depicting the option to specify the primary key, or the date for the dynamic partition column.":::

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

However, the increased parallelized reads require dedicated SQL pool to scale to higher DWU to allow the extract queries to be executed. Leveraging partitioning, the rate is improved 10x over no partition option.  You could increase the DWU to get additional throughput via compute resources, but the dedicated SQL pool has a maximum 128 active queries allow.

### Option 3. DDL migration - Copy Wizard ForEach Copy Activity

The two previous options are great data migration options for *smaller* databases. But if you require higher throughput, we recommend an alternative option:

1. Extract the data from the dedicated SQL pool to ADLS, therefore mitigating the stage performance overhead.
1. Use either Data Factory or the COPY command to ingest the data into Fabric Warehouse.

#### Recommended use

You can continue to use Data Factory to convert your schema (DDL). Using the Copy Wizard, you can select the specific table or **All tables**. By design, this migrates the schema and data in one step, extracting the schema without any rows, using the a false condition, `TOP 0` in the query statement.

The following code sample covers schema (DDL) migration with Data Factory.

#### Code example: Schema (DDL) migration with Data Factory

You can use Fabric Data Pipelines to easily migrate over your DDL (schemas) for table objects from any source Azure SQL Database or dedicated SQL pool. This data pipeline migrates over the schema (DDL) for the source dedicated SQL pool tables to Fabric Warehouse.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-schema-migration.png" alt-text="Screenshot from Fabric Data Factory showing a Lookup object leading to a For Each Object. Inside the For Each Object, there are Activities to Migrate DDL.":::

##### Pipeline design: parameters

This Data Pipeline accepts a parameter `SchemaName`, which allows you to specify which schemas to migrate over. The `dbo` schema is the default. 

In the **Default value** field, enter  a comma-delimited list of table schema indicating which schemas to migrate: `'dbo','tpch'` to provide two schemas, `dbo` and `tpch`.

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-parameters-schemaname.png" alt-text="Screenshot from Data Factory showing the Parameters tab of a Data Pipeline. In the Name field, 'SchemaName'. In the Default value field, 'dbo','tpch', indicating these two schemas should be migrated. ":::

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

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-query-dynamic-content.png" alt-text="Screenshot from Data Factory showing the Settings tab of a Data Pipeline. The 'Query' button is selected and code is pasted into the 'Query' field.":::

##### Pipeline design: ForEach Loop

For the ForEach Loop, configure the following options in the **Settings** tab: 

- Disable **Sequential** to allow for multiple iterations to run concurrently.
- Set **Batch count** to `50`, limiting the maximum number of concurrent iterations.
- The Items field needs to use dynamic content to reference the output of the LookUp Activity. Use the following code snippet: `@activity('Get List of Source Objects').output.value`

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-settings-foreach-loop-items.png" alt-text="A screenshot showing the ForEach Loop Activity's settings tab.":::
 
##### Pipeline design: Copy Activity inside the ForEach Loop

Inside the ForEach Activity, add a Copy Activity. This method uses the Dynamic Expression Language within Data Pipelines to build a `SELECT TOP 0 * FROM <TABLE>` to migrate only the schema without data into a Fabric Warehouse.

In the **Source** tab:

- Set **Data store type** to **External**.
- **Connection** is your Azure Synapse dedicated SQL pool. **Connection type** is **Azure Synapse Analytics**.
- Set **Use Query** to **Query**.
- In the **Query** field, paste in the dynamic content query and use this expression which will return zero rows, only the table schema: `@concat('SELECT TOP 0 * FROM ',item().SchemaName,'.',item().TableName)`

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-foreach-copy-activity-source.png" alt-text="Screenshot from Data Factory showing the Source tab of the Copy Activity inside the ForEach Loop." lightbox="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-foreach-copy-activity-source.png":::

In the **Destination** tab:

- Set **Data store type** to **Workspace**.
- The **Workspace data store type** is **Data Warehouse** and the **Data Warehouse** is set to the Fabric Warehouse.
- The destination **Table**'s schema and table name are defined using dynamic content. 
    - Schema refers to the current iteration's field, SchemaName with the snippet: `@item().SchemaName`
    - Table is referencing TableName with the snippet: `@item().TableName`

:::image type="content" source="media/migration-synapse-dedicated-sql-pool-warehouse/fabric-data-factory-foreach-copy-activity-destination.png" alt-text="Screenshot from Data Factory showing the Destination tab of the Copy Activity inside each ForEach Loop.":::

##### Pipeline design: Sink

For Sink, point to your Warehouse and reference the Source Schema and Table name.

Once you run this pipeline, you'll see your Data Warehouse populated with each table in your source, with the proper schema.

## Migration using stored procedures in Synapse dedicated SQL pool

This option uses stored procedures to perform the Fabric Migration. 

You can get the [code samples at microsoft/fabric-migration on GitHub.com](https://github.com/microsoft/fabric-migration/tree/main/data-warehouse). This code is shared as open source, so feel free to contribute to collaborate and help the community.

What Migration Stored Procedures can do:

1. Convert the schema (DDL) to Fabric Warehouse syntax.
1. Create the schema (DDL) on Fabric Warehouse.
1. Extract data from Synapse dedicated SQL pool to ADLS.
1. Flag nonsupported Fabric syntax for T-SQL codes (stored procedures, functions, views).

#### Recommended use

This is a great option for those who:

- Are familiar with T-SQL.
- Want to use an integrated development environment such as SQL Server Management Studio (SSMS).
- Want more granular control over which tasks they want to work on.

You can execute the specific stored procedure for the schema (DDL) conversion, data extract, or T-SQL code assessment.

For the data migration, you'll need to use either COPY INTO or Data Factory to ingest the data into Fabric Warehouse.

## Migration using SQL Database Project

Microsoft Fabric Data Warehouse is supported in the [SQL Database Projects extension](/sql/azure-data-studio/extensions/sql-database-project-extension?view=fabric&preserve-view=true) available inside of [Azure Data Studio](/sql/azure-data-studio/download-azure-data-studio?view=fabric&preserve-view=true) and [Visual Studio Code](https://visualstudio.microsoft.com/downloads/).

This extension is available inside Azure Data Studio and Visual Studio Code. This feature enables capabilities for source control, database testing and schema validation.  

#### Recommended use

This is a great option for those who prefer to use SQL Database Project for their deployment. This option essentially integrated the Fabric Migration Stored Procedures into the SQL Database Project to provide a seamless migration experience.  

A SQL Database Project can:

1. Convert the schema (DDL) to Fabric Warehouse syntax.
1. Create the schema (DDL) on Fabric Warehouse.
1. Extract data from Synapse dedicated SQL pool to ADLS.
1. Flag nonsupported syntax for T-SQL codes (stored procedures, functions, views).

For the data migration, you'll then use either COPY INTO or Data Factory to ingest the data into Fabric Warehouse. 

Adding to the Azure Data Studio supportability to Fabric, the Microsoft Fabric CAT team has provided a set of PowerShell scripts to handle the extraction, creation, and deployment of schema (DDL) and database code (DML) via a SQL Database Project. For a walkthrough of using the SQL Database project with our helpful PowerShell scripts, see [microsoft/fabric-migration on GitHub.com](https://github.com/microsoft/fabric-migration/tree/main/data-warehouse#deploy_and_create_migration_scripts_from_sourceps1---deploy-as-sql-package). 

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

1. Convert the schema (DDL) to Fabric Warehouse syntax.
1. Create the schema (DDL) on Fabric Warehouse.
1. Convert database code (DML) to Fabric syntax.

The dbt framework generates DDL and DML (SQL scripts) on the fly with each execution. With model files expressed in SELECT statements, the DDL/DML can be translated instantly to any target platform by changing the profile (connection string) and the adapter type.

#### Recommended use

The dbt framework is code-first approach. The data must be migrated by using options listed in this document, such as [CETAS](#migration-of-data-with-cetas) or [COPY/Data Factory](#option-1-schemadata-migration---copy-wizard-and-foreach-copy-activity).

The dbt adapter for Microsoft Fabric Synapse Data Warehouse allows the existing dbt projects that were targeting different platforms such as Synapse dedicated SQL pools, Snowflake, Databricks, Google Big Query, or Amazon Redshift to be migrated to a Fabric Warehouse with a simple configuration change.

To get started with a dbt project targeting Fabric Warehouse, see [Tutorial: Set up dbt for Fabric Data Warehouse](tutorial-setup-dbt.md). This document also lists an option to move between different warehouses/platforms.

## Data Ingestion into Fabric Warehouse

For ingestion into Fabric Warehouse, use COPY INTO or Fabric Data Factory, depending on your preference. Both methods are the recommended and best performing options, as they have equivalent performance throughput, given the prerequisite that the files are already extracted to Azure Data Lake Storage (ADLS) Gen2.

Several factors to note so that you can design your process for maximum performance:

- With Fabric, there isn't any resource contention loading multiple tables from ADLS to Fabric Warehouse concurrently. As a result, there is no performance degradation loading parallel threads. The maximum ingestion throughput will only be limited by the compute power of your Fabric capacity.
- Fabric workload management provides separation of resources allocated for load and query. There's no resource contention while queries and data loading executed at the same time.

## Related content

- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Synapse Data Warehouse in Microsoft Fabric performance guidelines](guidelines-warehouse-performance.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
