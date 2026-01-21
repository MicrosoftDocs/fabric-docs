---
title: Migration Strategy and Planning for ​​Azure Synapse Dedicated SQL Pools to Fabric Migration​
description: This article details the strategy and considerations of migration of data warehousing in Azure Synapse dedicated SQL pools to Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: arturv, johoang
ms.date: 04/06/2025
ms.topic: concept-article
ms.custom:
  - fabric-cat
---

# Migration​ planning: ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](../data-warehouse/includes/applies-to-version/fabric-dw.md)]

This article details the strategy, considerations, and methods of migration of data warehousing in Azure Synapse Analytics dedicated SQL pools to Microsoft Fabric Warehouse. 

> [!TIP]
> An automated experience for migration from Azure Synapse Analytics dedicated SQL pools is available using the [Fabric Migration Assistant for Data Warehouse](migration-assistant.md). This article contains important strategic and planning information.

## Migration introduction

As Microsoft introduced [Microsoft Fabric](../fundamentals/microsoft-fabric-overview.md), an all-in-one SaaS analytics solution for enterprises that offers a comprehensive suite of services, including [Data Factory](../data-factory/data-factory-overview.md), [Data Engineering](../data-engineering/data-engineering-overview.md), [Data Warehousing](../data-warehouse/data-warehousing.md), [Data Science](../data-science/data-science-overview.md), [Real-Time Intelligence](../real-time-intelligence/overview.md), and [Power BI](/power-bi/fundamentals/power-bi-overview). 

This article focuses on options for schema (DDL) migration, database code (DML) migration, and data migration. Microsoft offers several options, and here we discuss each option in detail and provide guidance on which of these options you should consider for your scenario. This article uses the TPC-DS industry benchmark for illustration and performance testing. Your actual result might vary depending on many factors including type of data, data types, width of tables, data source latency, etc.

## Prepare for migration

Carefully plan your migration project before you get started and ensure that your schema, code, and data are compatible with Fabric Warehouse. There are some [limitations](limitations.md) that you need to consider. Quantify the refactoring work of the incompatible items, as well as any other resources needed before the migration delivery.

Another key goal of planning is to adjust your design to ensure that your solution takes full advantage of the high query performance that Fabric Warehouse is designed to provide. Designing data warehouses for scale introduces unique design patterns, so traditional approaches aren't always the best. Review the [performance guidelines](guidelines-warehouse-performance.md), because although some design adjustments can be made after migration, making changes earlier in the process will save you time and effort. Migration from one technology/environment to another is always a major effort.

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
    1. Select the [method/tools for the migration](migration-synapse-dedicated-sql-pool-methods.md) to accomplish the following tasks:
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
        1. [Data ingestion](migration-synapse-dedicated-sql-pool-methods.md#data-ingestion-into-fabric-warehouse)
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
        1. Identify opportunities to modernize your data estate with the [latest Fabric features](../fundamentals/whats-new.md).

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

There are several Data Manipulation Language (DML) syntax differences to be aware of. Refer to [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md). Consider also a [code assessment when choosing method(s) of migration for the database code (DML)](migration-synapse-dedicated-sql-pool-methods.md).

Depending on the parity differences at the time of the migration, you might need to rewrite parts of your T-SQL DML code.

### Data type mapping differences

There are several data type differences in Fabric Warehouse. For more information, see [Data types in Microsoft Fabric](data-types.md).

The following table provides the mapping of supported data types from Synapse dedicated SQL pools to Fabric Warehouse.

|Synapse dedicated SQL pools | Fabric Warehouse|
|:--|:--|
| `money` |     `decimal(19,4)` |
| `smallmoney` |     `decimal(10,4)` |
| `smalldatetime` |     `datetime2` |
| `datetime` |     `datetime2` |
| `nchar` |     `char` |
| `nvarchar` |     `varchar` |
| `tinyint` |     `smallint` |
| `binary` |     `varbinary` |
| `datetimeoffset`\* |     `datetime2` |

\* `Datetime2` does not store the extra time zone offset information that is stored in. Since the `datetimeoffset` data type is not currently supported in Fabric Warehouse, the time zone offset data would need to be extracted into a separate column.

> [!TIP]
> **Ready to migrate?**
>
> To get started with an automated migration experience, see [Fabric Migration Assistant for Data Warehouse](migration-assistant.md).
>
> For more manual migration steps and detail, see [Migration​ methods for ​Azure Synapse Analytics dedicated SQL pools to Fabric Data Warehouse](migration-synapse-dedicated-sql-pool-methods.md).

## Related content

- [Create a Warehouse in Microsoft Fabric](create-warehouse.md)
- [Fabric Data Warehouse performance guidelines](guidelines-warehouse-performance.md)
- [Security for data warehousing in Microsoft Fabric](security.md)
- [Blog: Mapping ​​Azure Synapse dedicated SQL pools to Fabric data warehouse compute](https://blog.fabric.microsoft.com/blog/mapping-azure-synapse-dedicated-sql-pools-to-fabric-data-warehouse-compute/)
- [Microsoft Fabric Migration Overview](../fundamentals/migration.md)