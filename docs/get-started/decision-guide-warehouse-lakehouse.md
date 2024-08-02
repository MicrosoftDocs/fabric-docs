---
title: "Microsoft Fabric decision guide: Choose between Warehouse and Lakehouse"
description: "Learn more about the decisions for your data in the Warehouse or Lakehouse workloads in Microsoft Fabric."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.topic: product-comparison  #Don't change in the template.
ms.date: 08/02/2024
---
# Microsoft Fabric decision guide: Choose between Warehouse and Lakehouse

Microsoft Fabric offers two enterprise-scale, open standard format workloads for data storage: [Warehouse](data-warehousing.md) and [Lakehouse](../data-engineering/lakehouse-overview.md). This article compares the two platforms and the decision points for each.

## Criterion

:::image type="content" source="../get-started/media/decision-guide-warehouse-lakehouse/lakehouse-warehouse-choose.png" alt-text="Diagram that contains decision trees for Lakehouse and Warehouse in Microsoft Fabric.":::

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

The **Warehouse** item in Fabric Synapse Data Warehouse is an enterprise scale data warehouse with open standard format.​

- No knobs performance with minimal set-up and deployment, no configuration of compute or storage needed. ​
- Simple and intuitive warehouse experiences for both beginner and experienced data professionals (no/pro code)​.
- Lake-centric warehouse stores data in OneLake in open Delta format with easy data recovery and management​.
- Fully integrated with all Fabric workloads.
- Data loading and transforms at scale, with full multi-table transactional guarantees provided by the SQL engine.​
- Virtual warehouses with cross-database querying and a fully integrated semantic layer​.
- Enterprise-ready platform with end-to-end performance and usage visibility, with built-in governance and security​.
- Flexibility to build data warehouse or data mesh based on organizational needs and choice of no-code, low-code, or T-SQL for transformations​.

The **Lakehouse** item in Fabric Synapse Data Engineering

- Store, manage, and analyze structured and unstructured data in a single location to gain insights and make decisions faster and efficiently.​
- Flexible and scalable solution that allows organizations to handle large volumes of data of all types and sizes.​
- Easily ingest data from many different sources, which are converted into a unified Delta format ​
- Automatic table discovery and registration for a fully managed file-to-table experience for data engineers and data scientists. ​
- Automatic SQL analytics endpoint and default dataset that allows T-SQL querying of delta tables in the lake

Both are included in Power BI Premium or Fabric capacities​.

## Related content

- [Microsoft Fabric decision guide: choose a data store](../get-started/decision-guide-data-store.md)
- [Microsoft Fabric decision guide: copy activity, dataflow, or Spark](../get-started/decision-guide-pipeline-dataflow-spark.md)