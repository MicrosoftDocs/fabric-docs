---
title: "Warehouse and Lakehouse: A Decision Guide"
description: "Compare Warehouse and Lakehouse in Microsoft Fabric and review the decision points that help you choose the right data store for your workload."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sngun
ms.date: 09/14/2026
ms.topic: product-comparison
ai-usage: ai-assisted

#customer intent: As a data professional, I want to compare Warehouse and Lakehouse in Microsoft Fabric so that I can choose the data store that fits my development style, data types, and workload.
---
# Microsoft Fabric decision guide: Choose between Warehouse and Lakehouse

Microsoft Fabric offers two enterprise-scale, open-format data stores for analytics: [Warehouse](../data-warehouse/data-warehousing.md) and [Lakehouse](../data-engineering/lakehouse-overview.md). Both store data in [Delta Lake format](delta-lake-overview.md) in [OneLake](../onelake/onelake-overview.md) and share the same SQL engine, but they suit different development styles, data types, and workloads. This article compares them and describes the decision points for each.

This article compares the following options:

- [Warehouse](../data-warehouse/data-warehousing.md)
- [Lakehouse](../data-engineering/lakehouse-overview.md), including its [SQL analytics endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md)

## Choose a candidate service

This section helps you select the most likely service for your needs.

:::image type="content" source="media/decision-guide-lakehouse-warehouse/lakehouse-warehouse-choose.png" alt-text="Diagram that contains decision trees for Lakehouse and Warehouse in Microsoft Fabric." lightbox="media/decision-guide-lakehouse-warehouse/lakehouse-warehouse-choose.png":::

**Development approach: How do you want to develop?**

- Apache Spark (Python, Scala, Spark SQL, or R): Use **Lakehouse**.
- T-SQL: Use **Warehouse**.

**Transactions: Do you need multi-table transactions?**

- Yes: Use **Warehouse**.
- No: Use **Lakehouse**.

**Data type: What type of data are you analyzing?**

- Unstructured and structured data, or you're not sure: Use **Lakehouse**.
- Structured data only: Use **Warehouse**.

The result of this section is a starting point. Use the following sections to evaluate each service in detail.

## Evaluate each service

Evaluate each service in detail to confirm it meets your needs.

The **Warehouse** item in Fabric Data Warehouse is an enterprise-scale relational warehouse on a data lake foundation, developed primarily with T-SQL.

- Stores data in OneLake in open Delta format, so data engineers and business users can share and collaborate without compromising governance.
- Provides full multi-table ACID transactions, views, functions, and stored procedures through the SQL engine.
- Applies autonomous workload management with no compute or storage configuration to tune, and scales storage and compute independently.
- Runs cross-database queries across warehouses and lakehouses with zero data duplication.
- Ingests, loads, and transforms data at scale through the `COPY INTO` command, pipelines, dataflows, and cross-database queries.
- Integrates with Power BI and all other Fabric workloads, and automatically replicates data to OneLake for external access.

The **Lakehouse** item in Fabric Data Engineering is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location.

- Combines the scalability of a data lake with the querying capabilities of a warehouse, so you handle large volumes of data of all types and sizes.
- Uses Delta Lake for ACID transactions, schema enforcement, and time travel.
- Ingests data from many sources and unifies it in open Delta format, and provides live access to external data through [shortcuts in OneLake](../onelake/onelake-shortcuts.md) without copying.
- Provides automatic table discovery and registration for a fully managed file-to-table experience for data engineers and data scientists.
- Supports both Apache Spark and SQL access, so data engineers work in notebooks while analysts query with T-SQL.
- Automatically provides a SQL analytics endpoint for read-only T-SQL querying of Delta tables in the lake.

Both Warehouse and Lakehouse are available in Fabric capacities.

## Compare different warehousing capabilities

This table compares the [!INCLUDE [fabric-dw](../data-warehouse/includes/fabric-dw.md)] to the [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] of the Lakehouse.

:::row:::
   :::column span="1":::
   **[!INCLUDE [product-name](../includes/product-name.md)] offering**
   :::column-end:::
   :::column span="1":::
   **[!INCLUDE [fabric-dw](../data-warehouse/includes/fabric-dw.md)]**
   :::column-end:::
   :::column span="1":::
   **[!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] of the Lakehouse**
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Primary capabilities
   :::column-end:::
   :::column span="1":::
   ACID-compliant, full data warehousing with multi-table transaction support in T-SQL.
   :::column-end:::
   :::column span="1":::
   Read-only, system-generated [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] for T-SQL querying and serving. Supports analytics on the Lakehouse Delta tables and the Delta Lake folders referenced through [shortcuts in OneLake](../onelake/onelake-shortcuts.md).
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Developer profile
   :::column-end:::
   :::column span="1":::
   SQL developers or citizen developers
   :::column-end:::
   :::column span="1":::
   Data engineers or SQL developers
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Data loading
   :::column-end:::
   :::column span="1":::
   T-SQL (`COPY INTO`, `INSERT`, `CREATE TABLE AS SELECT`), pipelines, dataflows
   :::column-end:::
   :::column span="1":::
   Apache Spark, pipelines, dataflows, shortcuts
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Delta table support
   :::column-end:::
   :::column span="1":::
   Reads and writes Delta tables
   :::column-end:::
   :::column span="1":::
   Reads Delta tables
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Storage layer
   :::column-end:::
   :::column span="1":::
   Open Delta format in OneLake
   :::column-end:::
   :::column span="1":::
   Open Delta format in OneLake
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Recommended use case
   :::column-end:::
   :::column span="1":::
   - Enterprise data warehousing
   - Departmental, business unit, or self-service warehousing
   - Structured data analysis in T-SQL with tables, views, procedures, and functions, and advanced SQL support for BI
   :::column-end:::
   :::column span="1":::
   - Exploring and querying Delta tables from the lakehouse
   - Staging and archival zone for analysis
   - [Medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md) with bronze, silver, and gold zones
   - Pairing with a warehouse for enterprise analytics
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   Development experience
   :::column-end:::
   :::column span="1":::
   - Warehouse editor with full support for T-SQL data ingestion, modeling, development, and querying
   - Read/write support for first-party and third-party tooling
   :::column-end:::
   :::column span="1":::
   - Lakehouse [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] with T-SQL support for views, table-valued functions, and queries
   - UI experiences for modeling and querying
   - Limited T-SQL support for first-party and third-party tooling
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1":::
   T-SQL capabilities
   :::column-end:::
   :::column span="1":::
   Full DQL, DML, and DDL T-SQL support with full transaction support
   :::column-end:::
   :::column span="1":::
   Full DQL, no DML, and limited DDL such as SQL views and table-valued functions
   :::column-end:::
:::row-end:::
---

## Related content

- [Microsoft Fabric decision guide: choose a data store](decision-guide-data-store.md)
- [What is Fabric Data Warehouse?](../data-warehouse/data-warehousing.md)
- [What is a lakehouse in Microsoft Fabric?](../data-engineering/lakehouse-overview.md)
- [Delta Lake in Microsoft Fabric overview](delta-lake-overview.md)
