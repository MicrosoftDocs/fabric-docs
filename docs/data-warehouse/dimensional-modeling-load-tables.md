---
title: "Load tables in a dimensional model"
description: "Learn about loading tables in a dimensional model in Microsoft Fabric Warehouse."
author: peter-myers
ms.author: v-myerspeter
ms.reviewer: wiassaf, drubiolo, chweb
ms.date: 06/16/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: conceptual
ms.custom: fabric-cat
---

# Dimensional modeling in Microsoft Fabric Warehouse: Load tables

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [dimensional-modeling-series](includes/dimensional-modeling-series.md)]

This article provides you with guidance and best practices for loading dimension and fact tables in a dimensional model. It specifically focuses on implementing a dimensional model inside a warehouse. [[!INCLUDE [fabric-dw](includes/fabric-dw.md)] in Microsoft Fabric](data-warehousing.md) is an experience that supports many T-SQL capabilities, like creating tables and managing data in tables. So, you're in complete control of creating your dimensional model tables and loading them with data.

> [!NOTE]
> In this article, the term _data warehouse_ refers to an enterprise data warehouse, which delivers comprehensive integration of critical data across the organization. In contrast, the standalone term _warehouse_ refers to a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)], which is a software as a service (SaaS) relational database offering that you can use to implement a data warehouse. For clarity, in this article the latter is mentioned as _Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]_.

> [!TIP]
> If you're inexperienced with dimensional modeling, consider this series of articles your first step. It isn't intended to provide a complete discussion on dimensional modeling design. For more information, refer directly to widely adopted published content, like _The Data Warehouse Toolkit: The Definitive Guide to Dimensional Modeling_ (3rd edition, 2013) by Ralph Kimball, and others.

## Load a dimensional model

Loading a dimensional model involves periodically running an Extract, Transform, and Load (ETL) process. An ETL process orchestrates the running of other processes, which are generally concerned with staging source data, synchronizing dimension data, and inserting rows into new fact tables, and capturing all the auditing and error handling data needed.

For a Fabric warehouse solution, you can use [Data Factory](../data-factory/data-factory-overview.md) to develop and run your ETL process. The process can stage, transform, and load source data into your dimensional model tables.

Specifically, you can:

- Use [data pipelines](../data-factory/data-factory-overview.md#data-pipelines) to build workflows to orchestrate the ETL process. Data pipelines can execute SQL scripts, stored procedures, and more.
- Use [dataflows](../data-factory/data-factory-overview.md#dataflows) to develop low-code logic to ingest data from hundreds of data sources. Dataflows support combining data from multiple sources, transforming data, and then loading it to a destination, like a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] table. Dataflows are built by using the familiar [Power Query](/power-query/power-query-what-is-power-query) experience that's available today across many Microsoft products, including Microsoft Excel and Power BI Desktop.

> [!NOTE]
> ETL development can be complex, and development can be challenging. It's estimated that 60-80 percent of a data warehouse development effort is dedicated to the ETL process.

### Orchestration

The general workflow of an ETL process is to:

1. Optionally, [load staging tables](#stage-data).
1. [Process dimension tables](#process-dimension-tables).
1. [Process fact tables](#process-fact-tables).

Optionally, do post-processing tasks, like triggering the refresh of dependent Fabric content, like semantic models.

:::image type="content" source="media/dimensional-modeling-load-tables/etl-process-steps.svg" alt-text="Diagram shows the four steps of the ETL process as described in the previous paragraph." border="false":::

Dimension tables should be processed first to ensure that they store all dimension members, including those added to source systems since the last ETL process. When there are dependencies between dimensions, as is the case with [outrigger dimensions](dimensional-modeling-dimension-tables.md#outrigger-dimensions), dimension tables should be processed in order of dependency. For example, a geography dimension that's used by a customer dimension and a vendor dimension should be processed before the other two dimensions.

The fact tables can be processed once all dimension tables are processed.

When all dimensional model tables are processed, you might trigger the refresh of dependent semantic models. It's also a good idea to send a notification to relevant staff of the outcome of the ETL process.

### Stage data

Staging source data can help support data loading and transformation requirements. It involves extracting the data from source systems and loading it into staging tables, which you create to support the ETL process. Staging source data delivers several benefits. It can:

- Minimize the impact on operational systems.
- Be used to assist with, and optimize, ETL processing.
- Provide the ability to restart the ETL process, without the need to reload data from source systems.

Data in staging tables should never be made available to business users. It's only relevant to the ETL process.

> [!NOTE]
> When your data is stored in a [Fabric lakehouse](../data-engineering/lakehouse-overview.md), it might not be necessary to stage its data in the warehouse. If it implements a [medallion architecture](../fabric/onelake/onelake-medallion-lakehouse-architecture.md), you could source its data from either the bronze, silver, or gold layer.

We recommend that you create a schema in the warehouse, possibly named `staging`. Staging tables should resemble the source tables as closely as possible in terms of column names and data types. The contents of each table should be removed at the start of the ETL process.

Note that Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)] tables [can't be truncated](tsql-surface-area.md#limitations). Instead, you can drop and recreate each staging table before loading it with data.

You can also consider data virtualization alternatives as part of your staging strategy. You can use:

- [Mirroring](../database/mirrored-database/overview.md), which is a low-cost and low-latency turnkey solution that allows you to create a replica of your data in OneLake. For more information, see [Why use Mirroring in Fabric?](../database/mirrored-database/overview.md#why-use-mirroring-in-fabric).
- [OneLake shortcuts](../onelake/onelake-shortcuts.md), which point to other storage locations that could contain your source data. Shortcuts can be [used as tables in T-SQL queries](../onelake/onelake-shortcuts.md#sql).
- [PolyBase in SQL Server](/sql/relational-databases/polybase/polybase-guide?view=sql-server-ver16&preserve-view=true), which a data virtualization feature for SQL Server. PolyBase allows T-SQL queries to join data from external sources to relational tables in an instance of SQL Server.
- [Data virtualization with Azure SQL Managed Instance](/azure/azure-sql/managed-instance/data-virtualization-overview?view=azuresql&tabs=managed-identity&preserve-view=true), which allows you to execute T-SQL queries on files storing data in common data formats in [Azure Data Lake Storage (ADLS) Gen2](/azure/storage/blobs/data-lake-storage-introduction) or [Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction), and combine it with locally stored relational data by using joins.

### Transform data

The structure of your source data might not resemble the destination structures of your dimensional model tables. So, your ETL process needs to reshape the source data to align with the structure of the dimensional model tables.

Also, the data warehouse must deliver cleansed and conformed data, so source data might need to be transformed to ensure quality and consistency.

> [!NOTE]
> The concept of _garbage in, garbage out_ certainly applies to data warehousing—therefore, avoid loading garbage (low quality) data into your dimensional model tables.

Here are some transformations that your ETL process could perform.

- **Combine data:** Data from different sources can be integrated (merged) based on matching keys. For example, product data is stored in different systems, yet they all record a common stock-keeping unit (SKU). Data can also be appended when it shares a common structure. For example, sales data is stored in multiple systems. A union of the sales from each system can produce a superset of all sales data.
- **Convert data types:** Data types can be converted to those defined in the dimensional model tables.
- **Calculations:** Calculations can be done to produce values for the dimensional model tables. For example, for an employee dimension table, you might concatenate first and last names to produce the full name. As another example, for your sales fact table, you might calculate gross sales revenue, which is the product of unit price and quantity.
- **Detect and manage historical change:** Change can be detected and appropriately stored in dimension tables. For more information, see [Manage historical change](dimensional-modeling-dimension-tables.md#manage-historical-change) later in this article.
- **Aggregate data:** Aggregation can be used to reduce fact table dimensionality and/or to raise the granularity of the fact table. For example, the sales fact table doesn't need to store sales order numbers. Therefore, an aggregated result that groups by all dimension keys can be used to store the fact table data.

### Load data

You can load tables in a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)] by using the following [data ingestion options](ingest-data.md#data-ingestion-options).

- **COPY (T-SQL):** This option is useful when the source data comprise Parquet or CSV files stored in an external Azure storage account, like [Azure Data Lake Storage (ADLS) Gen2](/azure/storage/blobs/data-lake-storage-introduction) or [Azure Blob Storage](/azure/storage/blobs/storage-blobs-introduction).
- **Data pipelines:** In addition to orchestrating the ETL process, data pipelines can include activities to run T-SQL statements, perform lookups, or copy data from a source to a destination.
- **Dataflows:** As an alternative to data pipelines, dataflows provide a code-free experience to transform and clean data.
- **Cross-warehouse ingestion:** When data is stored in the same workspace, cross-warehouse ingestion allows joining different [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or lakehouse tables. It supports T-SQL commands like `INSERT…SELECT`, `SELECT INTO`, and `CREATE TABLE AS SELECT (CTAS)`. These commands are especially useful when you want to transform and load data from staging tables within the same workspace. They're also set-based operations, which is likely the most efficient and fastest way to load dimensional tables.

> [!TIP]
> For a complete explanation of these data ingestion options including best practices, see [Ingest data into the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](ingest-data.md).

### Logging

ETL processes usually require dedicated monitoring and maintenance. For these reasons, we recommend that you log the results of the ETL process to non-dimensional model tables in your warehouse. Generate a unique ID for each ETL process and use it to log details about every operation.

Consider logging:

- **ETL process:**
  - A unique ID for each ETL execution
  - Start time and end time
  - Status (success or failure)
  - Any errors encountered
- **Each staging and dimensional model table:**
  - Start time and end time
  - Status (success or failure)
  - Rows inserted, updated, or deleted
  - Final table row count
  - Any errors encountered
- **Other operations:**
  - Start time and end time of semantic model refresh operations

> [!TIP]
> You can create a semantic model that's dedicated to monitoring and analyzing your ETL processes. Process durations can help you identify bottlenecks that might benefit from review and optimization. Row counts can allow you to understand the size of the incremental load each time the ETL runs, and also help to predict a warehouse's future size (and when to scale up the Fabric capacity, if necessary).

## Process dimension tables

Processing a dimension table involves synchronizing the data warehouse data with the source systems. Source data is first transformed and prepared for loading into its dimension table. This data is then matched with the existing dimension table data by joining on the business keys. It's then possible to determine whether the source data represents new or modified data. When the dimension table requires a slowly changing dimension (SCD) Type 1, changes are applied by updating the existing dimension table rows. When the table requires Type 2 changes, the existing version is expired and a new version is inserted.

:::image type="content" source="media/dimensional-modeling-load-tables/load-dimension-table.svg" alt-text="Diagram shows a flow that describes how new and changed source rows are loaded to a dimension table, as described in the previous paragraph." border="false":::

For example:

- When new products are added to the source system, rows are inserted into the `Product` dimension table.
- When products are modified, existing rows in the dimension table are updated or inserted.
  - When SCD Type 1 applies, updates are made to the existing rows.
  - When SCD Type 2 applies, updates are made to _expire_ the current row versions, and new rows that represent the current version are inserted.
  - When SCD Type 3 applies, a process similar to SCD Type 1 occurs, updating an existing row without inserting a new record.

### Surrogate keys

It's a recommended practice that each dimension table has a [surrogate key](dimensional-modeling-dimension-tables.md#surrogate-key), which should use the smallest possible integer type. In SQL Server-based environments that's typically done by creating an identity column, however this feature isn't supported in a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. Instead, you'll need to use a [workaround technique that generates unique identifiers](generate-unique-identifiers.md).

> [!IMPORTANT]
> When a dimension table includes automatically generated surrogate keys, you should never perform a truncate and full reload of it. That's because it would invalidate the data loaded into fact tables that use the dimension. Also, if the dimension table supports [SCD Type 2](dimensional-modeling-dimension-tables.md#scd-type-2) changes, it might not be possible to regenerate the historical versions.

### Manage historical change

When the dimension table must store historical change, you'll need to implement a slowly changing dimension (SCD).

> [!NOTE]
> If the dimension table row is an [inferred member](#inferred-dimension-members) (inserted by a fact load process), you should treat any changes as late arriving dimension details instead of an SCD change. In this case, any changed attributes should be updated and the inferred member flag column set to `FALSE`.

It's possible that a dimension could support SCD Type 1 and/or SCD Type 2 changes.

#### SCD Type 1

When [SCD Type 1](dimensional-modeling-dimension-tables.md#scd-type-1) changes are detected, use the following logic.

1. Update any changed attributes.
1. If the table includes _last modified date_ and _last modified by_ columns, set the current date and process that made the modifications.

#### SCD Type 2

When [SCD Type 2](dimensional-modeling-dimension-tables.md#scd-type-2) changes are detected, use the following logic.

1. Expire the current version by setting the end date validity column to the ETL processing date (or a suitable timestamp in the source system) and the current flag to `FALSE`.
1. If the table includes _last modified date_ and _last modified by_ columns, set the current date and process that made the modifications.
1. Insert new members that have the start date validity column set to the end date validity column value (used to update the prior version) and has the current version flag set to `TRUE`.
1. If the table includes _created date_ and _created by_ columns, set the current date and process that made the insertions.

### Dimension member deletions

Take care if source data indicates that dimension members are deleted (either because they're not retrieved from the sources system, or they've been flagged as deleted). You shouldn't synchronize deletions with the dimension table, unless dimension members were created in error and there are no fact records related to them.

The appropriate way to handle source deletions is to record them as a _soft delete_. A soft delete marks a dimension member as no longer active or valid. To support this case, your dimension table should include a boolean attribute with the bit data type, like `IsDeleted`. Update this column for any deleted dimension members to `TRUE` (1). The current, latest version of a dimension member might similarly be marked with a Boolean (bit) value in the `IsCurrent` or `IsActive` columns. All reporting queries and Power BI semantic models should filter out records that are soft deleted.

### Date dimension

[Calendar and time dimensions](dimensional-modeling-dimension-tables.md#calendar-and-time) are special cases because they usually don't have source data. Instead, they're generated by using fixed logic.

You should load the [date dimension](dimensional-modeling-dimension-tables.md#date-dimension) table at the beginning of every new year to extend its rows to a specific number of years ahead. There might be other business data, for example fiscal year data, holidays, week numbers, and others, to update regularly.

When the date dimension table includes relative offset attributes, the ETL process must be run daily to update offset attribute values based on the current date (today).

We recommend that the logic to extend or update the date dimension table be written in T-SQL and encapsulated in a stored procedure.

## Process fact tables

Processing a fact table involves synchronizing the data warehouse data with the source system facts. Source data is first transformed and prepared for loading into its fact table. Then, for each dimension key, a lookup determines the surrogate key value to store in the fact row. When a dimension supports SCD Type 2, the surrogate key for the _current version_ of the dimension member should be retrieved.

> [!NOTE]
> Usually the surrogate key can be computed for the date and time dimensions because they should use `YYYYMMDD` or `HHMM` format. For more information, see [Calendar and time](dimensional-modeling-dimension-tables.md#calendar-and-time).

If a dimension key lookup fails, it could indicate an integrity issue with the source system. In this case, the fact row must still get inserted into the fact table. A valid dimension key must still be stored. One approach is to store a [special dimension member](dimensional-modeling-dimension-tables.md#special-dimension-members) (like _Unknown_). This approach requires a later update to correctly assign the true dimension key value, when known.

> [!IMPORTANT]
> Because Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)] doesn't enforce foreign keys, it's critical that the ETL process check for integrity when it loads data.

Another approach, relevant when there's confidence that the [natural key](dimensional-modeling-dimension-tables.md#natural-keys) is valid, is to insert a new dimension member and then store its surrogate key value. For more information, see [Inferred dimension members](#inferred-dimension-members) later in this section.

:::image type="content" source="media/dimensional-modeling-load-tables/load-fact-table.svg" alt-text="Diagram shows a flow that describes how new source rows are loaded to a fact table, as described in the previous paragraph." border="false":::

Whenever possible, a fact table should be loaded incrementally, meaning that new facts are detected and inserted.

> [!IMPORTANT]
> Especially for a large fact table, it should be a last resort to truncate and reload a fact table. That approach is expensive in terms of process time, compute resources, and possible disruption of the source system. It also involves complexity when the fact table dimensions apply SCD Type 2. That's because dimension key lookups will need to be done within the validity period of the dimension member versions.

Hopefully, you can efficiently detect new facts by relying on source system identifiers or timestamps. For example, when a source system reliably records sales orders that are in a sequence, you can store the latest sales order number retrieved. The next process can use that sales order number to retrieve newly created sales orders, and again, store the latest sales order number retrieved for use by the next process. Likewise, a _create date_ column could be stored and used to detect new orders.

If you can't rely on the source system data to efficiently detect new facts, you might be able to rely on a capability of the source system to perform an incremental load. For example, SQL Server and Azure SQL Managed Instance have a feature called [change data capture (CDC)](/sql/relational-databases/track-changes/about-change-data-capture-sql-server?view=sql-server-ver16&preserve-view=true), to track changes to each row in a table. SQL Server, Azure SQL Managed Instance, and Azure SQL Database have a feature called change tracking, used to identify rows that have changed. When enabled, it can help you to efficiently detect new or changed data in any database table. You might also be able to add triggers to relational tables that store keys of inserted, updated, or deleted table records. An incremental load strategy is more scalable and reduces the workload for both the source data and the destination systems in an ETL.

Lastly, you might be able to correlate source data to fact table by using attributes. For example, the sales order number and sales order line number. However, for large fact tables, it could be a very expensive operation to detect new, changed, or deleted facts. It could also be problematic when the source system archives operational data.

### Inferred dimension members

When a fact load process inserts a new dimension member, it's known as an _inferred member_. For example, when a hotel guest checks in, they're asked to join the hotel chain as a loyalty member. A membership number is issued immediately, but the details of the guest might not follow until the paperwork is submitted by the guest (if ever).

All that's known about the dimension member is its natural key. The fact load process needs to create a new dimension member by using _Unknown_ attribute values. Importantly, it must set the `IsInferredMember` attribute to `TRUE`. That way, when the late arriving details are sourced, the dimension load process can make the necessary updates to the dimension row. For more information, see [Manage historical change](#manage-historical-change) in this article.

### Fact updates or deletions

You might be required to update or delete fact data. For example, when a sales order gets canceled, or an order quantity is changed. As described earlier for loading fact tables, you need to efficiently detect changes and perform appropriate modifications to the fact data. In this example for the canceled order, a sales order status dimension would probably change from _Open_ to _Canceled_. That change would require an _update_ to the fact data, and not the _deletion_ of a row. For the quantity change, an update of the fact row quantity measure would be necessary. This strategy of using _soft deletes_ preserves history. A soft delete marks a row as no longer active or valid, and all reporting queries and Power BI semantic models should filter out records that are soft deleted.

When you anticipate fact updates or deletions, you should include attributes (like a sales order number and its sales order line number) in the fact table to help identify the fact rows to modify. Be sure to index the columns to support efficient modification operations.

Lastly, if fact data was inserted by using a special dimension member (like _Unknown_), you'll need to run a periodic process that retrieves current source data for such fact rows and updates dimension keys to valid values.

## Related content

For an introduction to dimensional modeling related to Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see the [Dimensional modeling overview](dimensional-modeling-overview.md) article.

For more information about loading data into a Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see:

- [Ingest data into the [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](ingest-data.md)
- [Ingest data into your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using data pipelines](ingest-data-pipelines.md)
- [Ingest data into your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using the COPY statement](ingest-data-copy.md)
- [Ingest data into your [!INCLUDE [fabric-dw](includes/fabric-dw.md)] using Transact-SQL](ingest-data-tsql.md)
- [Tutorial: Set up dbt for Fabric [!INCLUDE [fabric-dw](includes/fabric-dw.md)]](tutorial-setup-dbt.md)
