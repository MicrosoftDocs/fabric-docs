---
title: Delta Lake table format interoperability
description: Learn about Delta Lake table format interoperability in Microsoft Fabric.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: concept-article
ms.custom:
ms.date: 4/25/2025
ms.search.form: delta lake interoperability
ai-usage: ai-assisted
---

# Delta Lake table format interoperability

In Microsoft Fabric, the Delta Lake table format is the standard for analytics. [Delta Lake](https://docs.delta.io/latest/delta-intro.html) is an open-source storage layer that brings ACID (Atomicity, Consistency, Isolation, Durability) transactions to big data and analytics workloads.

All Fabric experiences natively generate and consume Delta Lake tables, providing a unified product experience. Delta Lake tables produced by one compute engine, such as Fabric Data Warehouse or Synapse Spark, can be consumed by any other engine, such as Power BI. When you ingest data into Fabric, Fabric stores it as Delta tables by default. You can easily integrate external data containing Delta Lake tables by using OneLake shortcuts.

## Delta Lake features and Fabric experiences

To achieve interoperability, all the Fabric experiences align on the Delta Lake features and Fabric capabilities. Some experiences can only write to Delta Lake tables, while others can read from it.

* **Writers**: Data warehouses, eventstreams, and exported Power BI semantic models into OneLake
* **Readers**: SQL analytics endpoint and Power BI direct lake semantic models
* **Writers and readers**: Fabric Spark runtime, dataflows, pipelines, and Kusto Query Language (KQL) databases

The following matrix shows key Delta Lake features and its availability on each Fabric experience.

|Fabric capability|Column mappings|Deletion vectors|V-order writing|Table optimization and maintenance|Partitions|Liquid Clustering|TIMESTAMP_NTZ|Delta reader/writer version and default table features|
|---------|---------|---------|---------|---------|---------|---------|---------|---------|
|Data warehouse Delta Lake export|Name: Yes<br/>ID: No|Yes|Yes|Yes|Read: N/A (not applicable)<br/>Write: No|No|No|Reader: 3<br/>Writer: 7<br/>Deletion Vectors,<br/>Column Mappings (name)|
|SQL analytics endpoint|Name: Yes<br/>ID: No|Yes|N/A (not applicable)|N/A (not applicable)|Read: Yes<br/>Write: N/A (not applicable)|Yes|No|N/A (not applicable)|
|Lakehouse explorer and preview|Name: Yes<br/>ID: No|Yes|N/A (not applicable)|Yes|Read: Yes<br/>Write: N/A (not applicable)|Yes|Yes|N/A (not applicable)|
|Fabric Spark Runtime 1.3|Name: Yes<br/>ID: Yes|Yes|Yes|Yes|Read: Yes<br/>Write: Yes|Yes|Yes|Reader: 1<br/>Writer: 2|
|Fabric Spark Runtime 1.2|Name: Yes<br/>ID: Yes|Yes|Yes|Yes|Read: Yes<br/>Write: Yes|Yes, read only|Yes|Reader: 1<br/>Writer: 2|
|Fabric Spark Runtime 1.1|Name: Yes<br/>ID: Yes|No|Yes|Yes|Read: Yes<br/>Write: Yes|Yes, read only|No|Reader: 1<br/>Writer: 2|
|Dataflows Gen2|Name: Yes<br/>ID: No|Yes|Yes|No|Read: Yes<br/>Write: Yes|Yes, read only|No|Reader: 1<br/>Writer: 2<br/>|
Pipelines|Name: No<br/>ID: No|No|Yes|No|Read: Yes<br/>Write: Yes, overwrite only|Yes, read only|No|Reader: 1<br/>Writer: 2|
Power BI direct lake semantic models|Name: Yes<br/>ID: Yes|Yes|N/A (not applicable)|N/A (not applicable)|Read: Yes<br/>Write: N/A (not applicable)|Yes|No|N/A (not applicable)|
Export Power BI semantic models into OneLake|Name: Yes<br/>ID: No|N/A (not applicable)|Yes|No|Read: N/A (not applicable)<br/>Write: No|No|No|Reader: 2<br/>Writer: 5<br/>Column Mappings (name)|
KQL databases|Name: Yes<br/>ID: No|Yes|No|No<sup>*</sup>|Read: Yes<br/>Write: Yes|No|No|Reader: 1<br/>Writer: 1|
Eventstreams|Name: No<br/>ID: No|No|No|No|Read: N/A (not applicable)<br/>Write: Yes|No|No|Reader: 1<br/>Writer: 2|

<sup>*</sup> KQL databases provide certain table maintenance capabilities such as [retention](../real-time-intelligence/data-policies.md). Data is removed at the end of the retention period from OneLake. For more information, see [One Logical copy](../real-time-intelligence/one-logical-copy.md).

> [!NOTE]
>
> * Fabric doesn't write column mappings by default, except where noted. The default Fabric experience generates tables that are compatible across the service. Delta Lake tables produced by third-party services may have incompatible table features.
> * Some Fabric experiences don't offer table optimization and maintenance capabilities, such as bin-compaction, V-order, deletion vector merge (PURGE), and clean up of old unreferenced files (VACUUM). To keep Delta Lake tables optimal for analytics, follow the techniques in [Use table maintenance feature to manage delta tables in Fabric](../data-engineering/lakehouse-table-maintenance.md) for tables ingested using those experiences.
> * For comprehensive cross-workload guidance on table maintenance strategies for different consumption scenarios, see [Cross-workload table maintenance and optimization](table-maintenance-optimization.md).

## Current limitations

Currently, Fabric doesn't support these Delta Lake features:

* V2 Checkpoints aren't uniformly available in all experiences. Only Spark notebooks and Spark jobs can read and write to tables with V2 Checkpoints. Lakehouse and SQL Analytics don't correctly list tables containing V2 Checkpoint files in the ```__delta_log``` folder.
* Delta Lake 3.x Uniform. This feature is supported only in the Data Engineering Spark-compute (Notebooks, Spark Jobs).
* Identity columns writing (Azure Databricks feature)
* Lakeflow Spark Declarative Pipelines (Azure Databricks feature)
* Delta Lake 4.x features: Type widening, collations, variant type, coordinated commits.

## Special characters on table names

Microsoft Fabric supports special characters as part of the table names. This feature allows the usage of unicode characters to compose table names in Microsoft Fabric experiences.

The following special characters are either reserved or not compatible with at least one of Microsoft Fabric technologies and must not be used as part of a table name: " (double quotes), ' (single quote), #, %, +, :, ?, ` (backtick).

## Related content

* [Cross-workload table maintenance and optimization](table-maintenance-optimization.md)
* [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
* Learn more about [Delta Lake tables](../data-engineering/lakehouse-and-delta-tables.md) in Fabric Lakehouse and Synapse Spark.
* [Learn about Direct Lake in Power BI and Microsoft Fabric](../fundamentals/direct-lake-overview.md).
* Learn more about [querying tables from the Warehouse through its published Delta Lake Logs](../data-warehouse/query-delta-lake-logs.md).
