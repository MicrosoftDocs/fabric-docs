---
title: Delta Lake table format interoperability
description: Learn about Delta Lake table format interoperability in Microsoft Fabric.
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.custom:
ms.date: 2/20/2025
ms.search.form: delta lake interoperability
---

# Delta Lake table format interoperability

In Microsoft Fabric, the Delta Lake table format is the standard for analytics. [Delta Lake](https://docs.delta.io/latest/delta-intro.html) is an open-source storage layer that brings ACID (Atomicity, Consistency, Isolation, Durability) transactions to big data and analytics workloads.

All Fabric experiences generate and consume Delta Lake tables, driving interoperability and a unified product experience. Delta Lake tables produced by one compute engine, such as Fabric Data Warehouse or Synapse Spark, can be consumed by any other engine, such as Power BI. When you ingest data into Fabric, Fabric stores it as Delta tables by default. You can easily integrate external data containing Delta Lake tables by using OneLake shortcuts.

## Delta Lake features and Fabric experiences

To achieve interoperability, all the Fabric experiences align on the Delta Lake features and Fabric capabilities. Some experiences can only write to Delta Lake tables, while others can read from it.

* **Writers**: Data warehouses, eventstreams, and exported Power BI semantic models into OneLake
* **Readers**: SQL analytics endpoint and Power BI direct lake semantic models
* **Writers and readers**: Fabric Spark runtime, dataflows, data pipelines, and Kusto Query Language (KQL) databases

The following matrix shows key Delta Lake features and their support on each Fabric capability.

|Fabric capability|Name-based column mappings|Deletion vectors|V-order writing|Table optimization and maintenance|Write partitions|Read partitions|Liquid Clustering|TIMESTAMP_NTZ|Delta reader/writer version and default table features|
|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|
|Data warehouse Delta Lake export|No|Yes|Yes|Yes|No|Yes|No|No|Reader: 3<br/>Writer: 7<br/>Deletion Vectors|
SQL analytics endpoint|Yes|Yes|N/A (not applicable)|N/A (not applicable)|N/A (not applicable)|Yes|Yes|No|N/A (not applicable)|
Fabric Spark Runtime 1.3|Yes|Yes|Yes|Yes|Yes|Yes|Yes|Yes|Reader: 1<br/>Writer: 2|
Fabric Spark Runtime 1.2|Yes|Yes|Yes|Yes|Yes|Yes|Yes, read only|Yes|Reader: 1<br/>Writer: 2|
Fabric Spark Runtime 1.1|Yes|No|Yes|Yes|Yes|Yes|Yes, read only|No|Reader: 1<br/>Writer: 2|
Dataflows|Yes|Yes|Yes|No|Yes|Yes|Yes, read only|No|Reader: 1<br/>Writer: 2<br/>|
Data pipelines|No|No|Yes|No|Yes, overwrite only|Yes|Yes, read only|No|Reader: 1<br/>Writer: 2|
Power BI direct lake semantic models|Yes|Yes|N/A (not applicable)|N/A (not applicable)|N/A (not applicable)|Yes|Yes|No|N/A (not applicable)|
Export Power BI semantic models into OneLake|Yes|N/A (not applicable)|Yes|No|Yes|N/A (not applicable)|No|No|Reader: 2<br/>Writer: 5|
KQL databases|Yes|Yes|No|No<sup>*</sup>|Yes|Yes|No|No|Reader: 1<br/>Writer: 1|
Eventstreams|No|No|No|No|Yes|N/A (not applicable)|No|No|Reader: 1<br/>Writer: 2|

<sup>*</sup> KQL databases provide certain table maintenance capabilities such as [retention](../real-time-intelligence/data-policies.md). Data is removed at the end of the retention period from OneLake. For more information, see [One Logical copy](../real-time-intelligence/one-logical-copy.md).

> [!NOTE]
>
> * Fabric doesn't write name-based column mappings by default. The default Fabric experience generates tables that are compatible across the service. Delta Lake tables produced by third-party services may have incompatible table features.
> * Some Fabric experiences do not have inherited table optimization and maintenance capabilities, such as bin-compaction, V-order, and clean up of old unreferenced files. To keep Delta Lake tables optimal for analytics, follow the techniques in [Use table maintenance feature to manage delta tables in Fabric](../data-engineering/lakehouse-table-maintenance.md) for tables ingested using those experiences.

## Current limitations

Currently, Fabric doesn't support these Delta Lake features:

* Delta Lake 3.x Uniform. This is supported in the Data Engineering Spark-compute only (Notebooks, Spark Jobs).
* Identity columns writing (proprietary Databricks feature)
* Delta Live Tables (proprietary Databricks feature)
* Delta Lake 4.x features: Type widening, collations, variant type, coordinated commits.

## Special characters on table names

Microsoft Fabric supports special characters as part of the table names. This allows the usage of unicode characters to compose table names in Microsoft Fabric experiences.

The following special characters are either reserved or not compatible with at least one of Microsoft Fabric technologies and should not be used as part of a table name: " (double quotes), ' (single quote), #, %, +, :, ?, ` (backtick).

## Related content

* [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
* Learn more about [Delta Lake tables](../data-engineering/lakehouse-and-delta-tables.md) in Fabric Lakehouse and Synapse Spark.
* [Learn about Direct Lake in Power BI and Microsoft Fabric](../fundamentals/direct-lake-overview.md).
* Learn more about [querying tables from the Warehouse through its published Delta Lake Logs](../data-warehouse/query-delta-lake-logs.md).
