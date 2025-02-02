---
title: "Microsoft Fabric Decision Guide: Choose between Warehouse and Lakehouse"
description: "Learn more about the decisions for your data in the Warehouse or Lakehouse workloads in Microsoft Fabric."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.date: 08/20/2024
ms.topic: product-comparison  #Don't change in the template.
ms.custom:
  - ignite-2024
---
# Microsoft Fabric decision guide: Choose between Warehouse and Lakehouse

Microsoft Fabric offers two enterprise-scale, open standard format workloads for data storage: [Warehouse](../data-warehouse/data-warehousing.md) and [Lakehouse](../data-engineering/lakehouse-overview.md). This article compares the two platforms and the decision points for each.

## Criterion

:::image type="content" source="media/decision-guide-lakehouse-warehouse/lakehouse-warehouse-choose.png" alt-text="Diagram that contains decision trees for Lakehouse and Warehouse in Microsoft Fabric." lightbox="media/decision-guide-lakehouse-warehouse/lakehouse-warehouse-choose.png":::

**No Code or Pro Code solutions: How do you want to develop?​**

- Spark
    - Use **Lakehouse​**
- T-SQL​
    - Use **Warehouse​**

**Warehousing needs​: Do you need multi-table transactions?​**

- Yes
    - Use **Warehouse​**
- No​
    - Use **Lakehouse​**

**Data complexity​: What type of data are you analyzing?​**

- Don't know​
    - Use **Lakehouse​**
- Unstructured and structured​ data
    - Use **Lakehouse​**
- Structured​ data only
    - Use **Warehouse​**

## Choose a candidate service

Perform a detailed evaluation of the service to confirm that it meets your needs.

The **Warehouse** item in Fabric Data Warehouse is an enterprise scale data warehouse with open standard format.​

- No knobs performance with minimal set-up and deployment, no configuration of compute or storage needed. ​
- Simple and intuitive warehouse experiences for both beginner and experienced data professionals (no/pro code)​.
- Lake-centric warehouse stores data in OneLake in open Delta format with easy data recovery and management​.
- Fully integrated with all Fabric workloads.
- Data loading and transforms at scale, with full multi-table transactional guarantees provided by the SQL engine.​
- Virtual warehouses with cross-database querying and a fully integrated semantic layer​.
- Enterprise-ready platform with end-to-end performance and usage visibility, with built-in governance and security​.
- Flexibility to build data warehouse or data mesh based on organizational needs and choice of no-code, low-code, or T-SQL for transformations​.

The **Lakehouse** item in Fabric Data Engineering is a data architecture platform for storing, managing, and analyzing structured and unstructured data in a single location.

- Store, manage, and analyze structured and unstructured data in a single location to gain insights and make decisions faster and efficiently.​
- Flexible and scalable solution that allows organizations to handle large volumes of data of all types and sizes.​
- Easily ingest data from many different sources, which are converted into a unified Delta format ​
- Automatic table discovery and registration for a fully managed file-to-table experience for data engineers and data scientists. ​
- Automatic SQL analytics endpoint and default dataset that allows T-SQL querying of delta tables in the lake

Both are included in Power BI Premium or Fabric capacities​.

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
ACID compliant, full data warehousing with transactions support in T-SQL.
   :::column-end:::
   :::column span="1"::: 
Read only, system generated [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] for Lakehouse for T-SQL querying and serving. Supports analytics on the Lakehouse Delta tables, and the Delta Lake folders referenced via [shortcuts](../onelake/onelake-shortcuts.md).
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
 - Lakehouse [!INCLUDE [fabric-se](../data-warehouse/includes/fabric-se.md)] with limited T-SQL support for views, table valued functions, and SQL Queries
 - UI experiences for modeling and querying
 - Limited T-SQL support for 1st and 3rd party tooling  
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
:::row-end:::
---

## Related content

- [Microsoft Fabric decision guide: choose a data store](../fundamentals/decision-guide-data-store.md)
