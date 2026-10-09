---
title: Migration strategy and planning for SQL Server to Fabric Data Warehouse
description: This article details the strategy and considerations for migrating data warehouses in SQL Server to Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: arturv, johoang
ms.date: 09/18/2026
ms.topic: concept-article
ai-usage: ai-assisted
ms.custom:
  - fabric-cat
---

# Migration planning: SQL Server to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

This article details the strategy, considerations, and methods for migrating data warehouses in SQL Server to Microsoft Fabric Data Warehouse.

> [!TIP]
> An automated experience for migration from SQL Server is available by using the [Fabric Migration Assistant for Data Warehouse](migration-assistant.md). This article contains important strategic and planning information.

## Migration introduction

[Microsoft Fabric](../fundamentals/microsoft-fabric-overview.md) is an all-in-one SaaS analytics solution for enterprises that offers a comprehensive suite of services, including [Data Factory](../data-factory/data-factory-overview.md), [Data Engineering](../data-engineering/data-engineering-overview.md), [Data Warehousing](../data-warehouse/data-warehousing.md), [Data Science](../data-science/data-science-overview.md), [Real-Time Intelligence](../real-time-intelligence/overview.md), and [Power BI](/power-bi/fundamentals/power-bi-overview).

This article describes options for schema (DDL), database code (DML), and data migration and helps you choose an option for your scenario. It uses the TPC-DS industry benchmark for illustration and performance testing. Your results might vary depending on factors such as data types, table width, and source latency.

## Prepare for migration

Carefully plan your migration project before you get started, and ensure that your schema, code, and data are compatible with Fabric Data Warehouse. Consider the [limitations](limitations.md). Quantify the refactoring work of the incompatible items, as well as any other resources needed before the migration delivery.

Another key goal of planning is to adjust your design to ensure that your solution takes full advantage of the high query performance that Fabric Data Warehouse is designed to provide. Designing data warehouses for scale introduces unique design patterns, so traditional approaches aren't always the best. Review the [performance guidelines](guidelines-warehouse-performance.md). Although some design adjustments can be made after migration, making changes earlier in the process will save you time and effort. Migration from one technology or environment to another is always a major effort.

The following diagram depicts the migration lifecycle. It lists the major pillars consisting of **Assess and Evaluate**, **Plan and Design**, **Migrate**, **Monitor and Govern**, and **Optimize and Modernize**, with the associated tasks in each pillar to plan and prepare for a smooth migration.

:::image type="content" source="media/migration-sql-server-planning/warehouse-migration-lifecycle.png" alt-text="Diagram of the migration lifecycle, including Assess and Evaluate, Plan and Design, Migrate, Monitor and Govern, and Optimize and Modernize." lightbox="media/migration-sql-server-planning/warehouse-migration-lifecycle.png":::

## Runbook for migration

Consider the following activities as a planning runbook for your migration from SQL Server to Fabric Data Warehouse.

1. **Assess and Evaluate**
    1. Identify objectives and motivations. Establish clear desired outcomes.
    1. Discover, assess, and baseline the existing architecture.
    1. Identify key stakeholders and sponsors.
    1. Define the scope of what to migrate.
        1. Start small and simple, and prepare for multiple small migrations.
        1. Begin to monitor and document all stages of the process.
        1. Build an inventory of data and processes for migration.
        1. Define data model changes, if any.
        1. Set up the Fabric workspace.
    1. Assess your team's skill set and preferences.
        1. Automate wherever possible.
        1. Use built-in tools and features to reduce migration effort.
    1. Train staff early on the new platform.
        1. Identify upskilling needs and training assets, including [Microsoft Learn](/training/paths/get-started-fabric/).
1. **Plan and Design**
    1. Define the desired architecture.
    1. Select the [methods and tools for the migration](migration-sql-server-methods.md) to accomplish the following tasks:
        1. Extract data from the source.
        1. Convert the schema (DDL), including metadata for tables and views.
        1. Ingest data, including historical data.
            1. If necessary, re-engineer the data model by using the new platform's performance and scalability.
        1. Migrate database code (DML).
            1. Migrate or refactor stored procedures and business processes.
    1. Inventory and extract the security features and object permissions from the source.
    1. Design and plan to replace or modify existing ETL or ELT processes for incremental load.
        1. Create parallel ETL or ELT processes in the new environment.
    1. Prepare a detailed migration plan.
        1. Map the current state to the new desired state.
1. **Migrate**
    1. Migrate the schema, data, and code.
        1. Extract data from the source.
        1. Convert the schema (DDL).
        1. [Ingest data](migration-sql-server-methods.md#data-ingestion-into-fabric-data-warehouse).
        1. Migrate database code (DML).
    1. If necessary, scale SQL Server resources temporarily to increase migration speed.
    1. Apply security and permissions.
    1. Migrate existing ETL or ELT processes for incremental load.
        1. Migrate or refactor ETL or ELT incremental load processes.
        1. Test and compare parallel incremental load processes.
    1. Adapt the detailed migration plan as necessary.
1. **Monitor and Govern**
    1. Run in parallel, and compare against your source environment.
        1. Test applications, business intelligence platforms, and query tools.
        1. Benchmark and optimize query performance.
        1. Monitor and manage cost, security, and performance.
    1. Perform a governance benchmark and assessment.
1. **Optimize and Modernize**
    1. When the business is comfortable, transition applications and primary reporting platforms to Fabric.
        1. Scale resources as the workload shifts from SQL Server to Microsoft Fabric.
        1. Build a repeatable template from the experience gained for future migrations. Iterate.
        1. Identify opportunities for cost optimization, security, scalability, and operational excellence.
        1. Identify opportunities to modernize your data estate with the [latest Fabric features](../fundamentals/whats-new.md).

## Lift and shift or modernize?

In general, there are two types of migration scenarios, regardless of the purpose and scope of the planned migration: lift and shift as-is, or a phased approach that incorporates architectural and code changes.

### Lift and shift

In a lift and shift migration, you migrate an existing data model with minor changes to the new Fabric Data Warehouse. This approach minimizes risk and migration time by reducing the new work needed to realize the benefits of migration.

Lift and shift migration is a good fit for these scenarios:

- You have an existing environment with a small number of data marts to migrate.
- You have an existing environment with data that's already in a well-designed star or snowflake schema.
- You're under time and cost pressure to move to Fabric Data Warehouse.

In summary, this approach works well for workloads that are optimized for your current SQL Server environment and therefore don't require major changes in Fabric.

### Modernize in a phased approach with architectural changes

If a legacy data warehouse evolved over a long period of time, you might need to re-engineer it to maintain the required performance levels.

You might also want to redesign the architecture to take advantage of the new engines and features available in the Fabric workspace.

## Design differences between SQL Server and Fabric Data Warehouse

Consider the following differences between SQL Server and Fabric Data Warehouse.

### Table considerations

When you migrate tables between different environments, typically only the raw data and the metadata physically migrate. You usually don't migrate other database elements from the source system, such as indexes, because they might be unnecessary or implemented differently in the new environment.

Performance optimizations in the source environment, such as indexes, indicate where you might add performance optimization in a new environment, but Fabric takes care of that automatically for you.

### T-SQL considerations

Be aware of several Data Manipulation Language (DML) syntax differences. Refer to [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md). Also, consider a [code assessment when choosing migration methods for the database code (DML)](migration-sql-server-methods.md).

Depending on the parity differences at the time of the migration, you might need to rewrite parts of your T-SQL DML code.

### Data type mapping differences

Fabric Data Warehouse has several data type differences from other Microsoft SQL platforms. For more information, see [Data types in Microsoft Fabric](data-types.md).

The following table shows the mapping of supported data types from the [SQL Database Engine](/sql/database-engine/sql-database-engine) to Fabric Data Warehouse.

| SQL Server | Fabric Data Warehouse |
|:--|:--|
| `money` | `decimal(19,4)` |
| `smallmoney` | `decimal(10,4)` |
| `smalldatetime` | `datetime2` |
| `datetime` | `datetime2` |
| `nchar` | `char` |
| `nvarchar` | `varchar` |
| `tinyint` | `smallint` |
| `binary` | `varbinary` |
| `datetimeoffset`\* | `datetime2` |

\* `datetime2` doesn't store the time zone offset information that `datetimeoffset` stores. Because the `datetimeoffset` data type isn't currently supported in Fabric Data Warehouse, extract the time zone offset data into a separate column.

> [!TIP]
> **Ready to migrate?**
>
> To get started with an automated migration experience, see [Fabric Migration Assistant for Data Warehouse](migration-assistant.md).
>
> For more manual migration steps and details, see [Migration methods for SQL Server to Fabric Data Warehouse](migration-sql-server-methods.md).

## Related content

- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
- [Microsoft Fabric migration overview](../fundamentals/migration.md)