---
title: What is data warehousing in Microsoft Fabric?
description: Learn more about data warehousing workloads in Synapse Data Warehouse in Microsoft Fabric.
author: joannapea
ms.author: joanpo
ms.reviewer: wiassaf
ms.date: 01/04/2024
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
  - ignite-2023-fabric
ms.search.form: SQL Analytics Endpoint overview, Warehouse overview, Warehouse in workspace overview # This article's title should not change. If so, contact engineering.
---
# What is data warehousing in Microsoft Fabric?

**Applies to:** [!INCLUDE[fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [product-name](../includes/product-name.md)] provides customers with a unified product that addresses every aspect of their data estate by offering a complete, SaaS-ified Data, Analytics and AI platform, which is lake centric and open. The foundation of [!INCLUDE [product-name](../includes/product-name.md)] enables the novice user through to the seasoned professional to leverage Database, Analytics, Messaging, Data Integration and Business Intelligence workloads through a rich, easy to use, shared SaaS experience with Microsoft OneLake as the centerpiece. 

### A lake-centric SaaS experience built for any skill level

[!INCLUDE [product-name](../includes/product-name.md)] introduces a lake centric data warehouse built on an enterprise grade distributed processing engine that enables industry leading performance at scale while eliminating the need for configuration and management. Through an easy to use SaaS experience that is tightly integrated with Power BI for easy analysis and reporting, [!INCLUDE [fabric-dw](includes/fabric-dw.md)] in [!INCLUDE [product-name](../includes/product-name.md)] converges the world of data lakes and warehouses with a goal of greatly simplifying an organizations investment in their analytics estate. Data warehousing workloads benefit from the rich capabilities of the SQL engine over an open data format, enabling customers to focus on data preparation, analysis and reporting over a single copy of their data stored in their Microsoft OneLake. 

The [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is built for any skill level - from the citizen developer through to the professional developer, DBA or data engineer. The rich set of experiences built into [!INCLUDE [product-name](../includes/product-name.md)] workspace enables customers to reduce their time to insights by having an easily consumable, always connected semantic model that is integrated with Power BI in DirectLake mode. This enables second-to-none industry leading performance that ensures a customer's report always has the most recent data for analysis and reporting. Cross-database querying can be leveraged to quickly and seamlessly leverage multiple data sources that span multiple databases for fast insights and zero data duplication. 

### Virtual warehouses with cross database querying

[!INCLUDE [product-name](../includes/product-name.md)] provides customers with the ability to stand up virtual warehouses containing data from virtually any source by using shortcuts. Customers can build a virtual warehouse by creating shortcuts to their data wherever it resides. A virtual warehouse can consist of data from OneLake, Azure Data Lake Storage, or any other cloud vendor storage within a single boundary and with no data duplication.

Seamlessly unlock value from a variety of data sources through the richness of cross-database querying in [!INCLUDE [product-name](../includes/product-name.md)]. Cross database querying enables customers to quickly and seamlessly leverage multiple data sources for fast insights and with zero data duplication. Data stored in different sources can be easily joined together enabling customers to deliver rich insights that previously required significant effort from data integration and engineering teams. 

Cross-database queries can be created through the [Visual Query editor](visual-query-editor.md), which offers a no-code path to insights over multiple tables. The [SQL Query editor](sql-query-editor.md), or other familiar tools such as SQL Server Management Studio (SSMS), can also be used to create cross-database queries. 

### Autonomous workload management

Warehouses in [!INCLUDE [product-name](../includes/product-name.md)] leverage an industry-leading distributed query processing engine, which provides customers with workloads that have a natural isolation boundary. There are no knobs to turn with the autonomous allocation and relinquishing of resources to offer best in breed performance with automatic scale and concurrency built in. True isolation is achieved by separating workloads with different characteristics, ensuring that ETL jobs never interfere with their ad hoc analytics and reporting workloads. 

### Open format for seamless engine interoperability

Data in the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is stored in the parquet file format and published as Delta Lake Logs, enabling ACID transactions and cross engine interoperability that can be leveraged through other [!INCLUDE [product-name](../includes/product-name.md)] workloads such as Spark, Pipelines, Power BI and Azure Data Explorer. Customers no longer need to create multiple copies of their data to enable data professionals with different skill sets. Data engineers that are accustomed to working in Python can easily leverage the same data that was modeled and served by a data warehouse professional that is accustomed to working in SQL. In parallel, BI professionals can quickly and easily leverage the same data to create a rich set of visualizations in Power BI with record performance and no data duplication. 

### Separation of storage and compute

Compute and storage are decoupled in a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] which enables customers to scale near instantaneously to meet the demands of their business. This enables multiple compute engines to read from any supported storage source with robust security and full ACID transactional guarantees. 

### Easily ingest, load and transform at scale

Data can be [ingested](ingest-data.md) into the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] through Pipelines, Dataflows, cross database querying or the COPY INTO command. Once ingested, data can be analyzed by multiple business groups through functionality such as sharing and cross database querying. Time to insights is expedited through a fully integrated BI experience through graphical data modeling easy to use web experience for querying within the Warehouse Editor.

## Data warehousing items in Microsoft Fabric

There are two distinct data warehousing items: the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse and the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

### SQL analytics endpoint of the Lakehouse

A [!INCLUDE [fabric-se](includes/fabric-se.md)] is a warehouse that is automatically generated from a [Lakehouse](../data-engineering/lakehouse-overview.md) in [!INCLUDE [product-name](../includes/product-name.md)]. A customer can transition from the "Lake" view of the Lakehouse (which supports data engineering and Apache Spark) to the "SQL" view of the same Lakehouse. The [!INCLUDE [fabric-se](includes/fabric-se.md)] is read-only, and data can only be modified through the "Lake" view of the Lakehouse using Spark. 

Via the [!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse, the user has a subset of SQL commands that can define and query data objects but not manipulate the data. You can perform the following actions in the [!INCLUDE [fabric-se](includes/fabric-se.md)]:

- Query the tables that reference data in your Delta Lake folders in the lake.
- Create views, inline TVFs, and procedures to encapsulate your semantics and business logic in T-SQL.
- Manage permissions on the objects.

In a [!INCLUDE [product-name](../includes/product-name.md)] workspace, a [!INCLUDE [fabric-se](includes/fabric-se.md)] is labeled "[!INCLUDE [fabricse](includes/fabric-se.md)]" under the **Type** column. Each Lakehouse has an autogenerated [!INCLUDE [fabric-se](includes/fabric-se.md)] that can be leveraged through familiar SQL tools such as [SQL Server Management Studio](/sql/ssms/download-sql-server-management-studio-ssms), [Azure Data Studio](/sql/azure-data-studio/what-is-azure-data-studio), the [[!INCLUDE [product-name](../includes/product-name.md)] SQL Query Editor](sql-query-editor.md).

:::image type="content" source="media\data-warehousing\sql-endpoint-type.png" alt-text="Screenshot showing the SQL analytics endpoint type in workspace." lightbox="media\data-warehousing\sql-endpoint-type.png":::

To get started with the [!INCLUDE [fabric-se](includes/fabric-se.md)], see [Better together: the lakehouse and warehouse in Microsoft Fabric](get-started-lakehouse-sql-analytics-endpoint.md).

### Synapse Data Warehouse

In a [!INCLUDE [product-name](../includes/product-name.md)] workspace, a Synapse Data Warehouse or **Warehouse** is labeled as 'Warehouse' under the **Type** column. A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] supports transactions, DDL, and DML queries. 

:::image type="content" source="media\data-warehousing\warehouse-type.png" alt-text="Screenshot showing the Warehouse type in workspace." lightbox="media\data-warehousing\warehouse-type.png":::

Unlike a [!INCLUDE [fabric-se](includes/fabric-se.md)] which only supports read only queries and creation of views and TVFs, a [!INCLUDE [fabric-dw](includes/fabric-dw.md)] has full transactional DDL and DML support and is created by a customer. A [!INCLUDE [fabric-dw](includes/fabric-dw.md)] is populated by one of the supported data ingestion methods such as [COPY INTO](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true), [Pipelines](ingest-data-pipelines.md), [Dataflows](ingest-data.md), or cross database ingestion options such as [CREATE TABLE AS SELECT (CTAS)](/sql/t-sql/statements/create-table-as-select-azure-sql-data-warehouse?view=fabric&preserve-view=true), [INSERT..SELECT](/sql/t-sql/statements/insert-transact-sql?view=fabric&preserve-view=true), or [SELECT INTO](/sql/t-sql/queries/select-into-clause-transact-sql?view=fabric&preserve-view=true).

To get started with the [!INCLUDE [fabric-dw](includes/fabric-dw.md)], see [Create a warehouse in [!INCLUDE [product-name](../includes/product-name.md)]](create-warehouse.md).

## Compare the Warehouse and the SQL analytics endpoint of the Lakehouse

This section describes the differences between the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabricse](includes/fabric-se.md)] in [!INCLUDE [product-name](../includes/product-name.md)].

:::image type="content" source="media\data-warehousing\fabric-workspace.svg" alt-text="Diagram of the Fabric workspace for data warehousing, including the SQL analytics endpoint and Warehouse.":::

The **[!INCLUDE [fabricse](includes/fabric-se.md)]** is a *read-only* warehouse that is automatically generated upon creation from a [Lakehouse](../data-engineering/lakehouse-overview.md) in [!INCLUDE [product-name](../includes/product-name.md)]. Delta tables that are created through Spark in a Lakehouse are automatically discoverable in the [!INCLUDE [fabricse](includes/fabric-se.md)] as tables. The [!INCLUDE [fabricse](includes/fabric-se.md)] enables data engineers to build a relational layer on top of physical data in the Lakehouse and expose it to analysis and reporting tools using the SQL connection string. Data analysts can then use T-SQL to access Lakehouse data using Synapse Data Warehouse. Use [!INCLUDE [fabricse](includes/fabric-se.md)] to design your warehouse for BI needs and serving data.

The **Synapse Data Warehouse** or **Warehouse** is a 'traditional' data warehouse and supports the full transactional T-SQL capabilities like an enterprise data warehouse. As opposed to [!INCLUDE [fabricse](includes/fabric-se.md)], where tables and data are automatically created, you are fully in control of [creating tables](tables.md), loading, transforming, and querying your data in the data warehouse using either the [!INCLUDE [product-name](../includes/product-name.md)] portal or T-SQL commands. 

For more information about querying your data in [!INCLUDE [product-name](../includes/product-name.md)], see [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md).

## Compare different warehousing capabilities

In order to best serve your analytics use cases, there are a variety of capabilities available to you. Generally, the warehouse can be thought of as a superset of all other capabilities, providing a synergistic relationship between all other analytics offerings that provide T-SQL.  

Within fabric, there are users who might need to decide between a [Warehouse](create-warehouse.md), [Lakehouse](get-started-lakehouse-sql-analytics-endpoint.md), and even a [Power BI datamart](../data-engineering/create-lakehouse.md).

:::row:::
   :::column span="1"::: 
**[!INCLUDE [product-name](../includes/product-name.md)] offering** 
   :::column-end:::
   :::column span="1"::: 
**[!INCLUDE [fabric-dw](includes/fabric-dw.md)]** 
   :::column-end:::
   :::column span="1"::: 
**[!INCLUDE [fabric-se](includes/fabric-se.md)] of the Lakehouse**
   :::column-end:::
   :::column span="1"::: 
**Power BI datamart**
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1"::: 
Licensing
   :::column-end:::
   :::column span="1"::: 
Fabric or Power BI Premium
   :::column-end:::
   :::column span="1"::: 
Fabric or Power BI Premium
   :::column-end:::
   :::column span="1"::: 
Power BI Premium only
   :::column-end:::
:::row-end:::
---
:::row::: 
   :::column span="1"::: 
Primary capabilities
   :::column-end:::
   :::column span="1"::: 
ACID compliant, full data warehousing with transactions support in T-SQL.
   :::column-end:::
   :::column span="1"::: 
Read only, system generated [!INCLUDE [fabric-se](includes/fabric-se.md)] for Lakehouse for T-SQL querying and serving. Supports analytics on the Lakehouse Delta tables, and the Delta Lake folders referenced via [shortcuts](../onelake/onelake-shortcuts.md).
   :::column-end:::
   :::column span="1"::: 
No-code data warehousing and T-SQL querying 
   :::column-end:::
:::row-end:::
---
:::row::: 
   :::column span="1"::: 
Developer profile
   :::column-end:::
   :::column span="1"::: 
SQL Developers or citizen developers
   :::column-end:::
   :::column span="1"::: 
Data Engineers or SQL Developers 
   :::column-end:::
   :::column span="1"::: 
Citizen developer only 
   :::column-end:::
:::row-end:::
---
:::row::: 
   :::column span="1":::
Recommended use case
   :::column-end:::
   :::column span="1"::: 
 - Data Warehousing for enterprise use
 - Data Warehousing supporting departmental, business unit or self service use
 - Structured data analysis in T-SQL with tables, views, procedures and functions and Advanced SQL support for BI 
   :::column-end:::
   :::column span="1"::: 
 - Exploring and querying delta tables from the lakehouse
 - Staging Data and Archival Zone for analysis
 - [Medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md) with zones for bronze, silver and gold analysis
 - Pairing with Warehouse for enterprise analytics use cases 
   :::column-end:::
   :::column span="1"::: 
 - Small departmental or business unit warehousing use cases
 - Self service data warehousing use cases
 - Landing zone for Power BI dataflows and simple SQL support for BI 
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1"::: 
Development experience 
   :::column-end:::
   :::column span="1"::: 
 - Warehouse Editor with full support for T-SQL data ingestion, modeling, development, and querying UI experiences for data ingestion, modeling, and querying
 - Read / Write support for 1st and 3rd party tooling 
   :::column-end:::
   :::column span="1"::: 
 - Lakehouse [!INCLUDE [fabric-se](includes/fabric-se.md)] with limited T-SQL support for views, table valued functions, and SQL Queries
 - UI experiences for modeling and querying
 - Limited T-SQL support for 1st and 3rd party tooling  
   :::column-end:::
   :::column span="1"::: 
 - Datamart Editor with UI experiences and queries support
 - UI experiences for data ingestion, modeling, and querying
 - Read-only support for 1st and 3rd party tooling  
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1"::: 
T-SQL capabilities 
   :::column-end:::
   :::column span="1"::: 
Full DQL, DML, and DDL T-SQL support, full transaction support
   :::column-end:::
   :::column span="1"::: 
Full DQL, No DML, limited DDL T-SQL Support such as SQL Views and TVFs    
   :::column-end:::
   :::column span="1"::: 
Full DQL only
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1"::: 
Data loading
   :::column-end:::
   :::column span="1"::: 
SQL, pipelines, dataflows
   :::column-end:::
   :::column span="1"::: 
Spark, pipelines, dataflows, shortcuts 
   :::column-end:::
   :::column span="1"::: 
Dataflows only
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
Reads delta tables   
   :::column-end:::
   :::column span="1"::: 
NA
   :::column-end:::
:::row-end:::
---
:::row:::
   :::column span="1"::: 
Storage layer
   :::column-end:::
   :::column span="1"::: 
Open Data Format - Delta 
   :::column-end:::
   :::column span="1"::: 
Open Data Format - Delta  
   :::column-end:::
   :::column span="1"::: 
NA
   :::column-end:::
:::row-end:::
---

### Automatically generated schema in the SQL analytics endpoint of the Lakehouse

The [!INCLUDE [fabric-se](includes/fabric-se.md)] manages the automatically generated tables so the workspace users can't modify them. Users can enrich the database model by adding their own SQL schemas, views, procedures, and other database objects.

For every Delta table in your [Lakehouse](../data-engineering/lakehouse-overview.md), the [!INCLUDE [fabric-se](includes/fabric-se.md)] automatically generates one table. 

Tables in the [!INCLUDE [fabric-se](includes/fabric-se.md)] are created with a delay. Once you create or update Delta Lake folder/table in the lake, the warehouse table that references the lake data won't be immediately created/refreshed. The changes will be applied in the warehouse after 5-10 seconds.

For autogenerated schema data types for the [!INCLUDE [fabric-se](includes/fabric-se.md)], see [Data types in Microsoft Fabric](data-types.md#autogenerated-data-types-in-the-sql-analytics-endpoint).

## Related content

- [Better together: the lakehouse and warehouse in Microsoft Fabric](get-started-lakehouse-sql-analytics-endpoint.md)
- [Create a warehouse](create-warehouse.md)
- [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md)
- [Introduction to Power BI datamarts](/power-bi/transform-model/datamarts/datamarts-overview)
- [Creating reports](create-reports.md)
