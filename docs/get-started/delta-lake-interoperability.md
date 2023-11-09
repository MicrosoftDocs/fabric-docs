---
title: Delta Lake table format interoperability
description: Delta Lake table format interoperability reference for Microsoft Fabric 
ms.reviewer: snehagunda
ms.author: dacoelho
author: DaniBunny
ms.topic: conceptual
ms.custom: build-2023
ms.date: 11/9/2023
ms.search.form: delta lake interoperability
---

# Delta Lake table format interoperability

In Microsoft Fabric, the Delta Lake table format is used as the standard for analytics. [Delta Lake](https://docs.delta.io/latest/delta-intro.html) is an open-source storage layer that brings ACID (Atomicity, Consistency, Isolation, Durability) transactions to big data and analytics workloads. 

All Microsoft Fabric workloads produce and consume Delta Lake tables, driving interoperability and unifying the product experience. Delta Lake tables produced by one compute-engine, such as SQL Data Warehouse or Synapse Spark, may be consumed by any other engine, such as Power BI. Data ingestion in Microsoft Fabric also produces Delta Tables by default, and it’s easy to integrate external data lakes containing Delta Lake tables using OneLake’s Shortcuts capabilities. 

## Delta Lake features and Microsoft Fabric workloads

To achieve interoperability, all Microsoft Fabric workloads align on Delta Lake features and Microsoft Fabric capabilities. Note that some workloads only write to Delta Lake tables, while others read from it. 

* Writers: Data Warehouse, Event Streams and Export Power BI Semantic Models into One Lake. 
* Readers: SQL Analytics Endpoint, and PowerBI Direct Lake Semantic Models 
* Writers and readers: Fabric Spark Runtime, Dataflows, Data Pipelines, and Kusto  

The following matrix contains key Delta Lake features and its supportability state on each Microsoft Fabric workload.

|Workload|Name-based column mappings|Deletion vectors|V-Order writing|Table Optimization and Maintenance|Write Partitions|Read Partitions|Delta reader/writer version and default table features|
|---------|---------|---------|---------|---------|---------|---------|---------|
|Data Warehouse Delta Lake export|No|Yes|Yes|Yes|No|Yes|Reader: 3 Writer: 7 Deletion Vectors|
SQL Analytics Endpoint|No|Yes|N/A (not applicable)|N/A (not applicable)|N/A (not applicable)|Yes|N/A (not applicable)|
Fabric Spark Runtime 1.2|Yes|Yes|Yes|Yes|Yes|Yes|Reader: 1 Writer: 2 |
Fabric Spark Runtime 1.1|Yes|No|Yes|Yes|Yes|Yes|Reader: 1 Writer: 2 |
Dataflows|Yes|Yes|Yes|No|Yes|Yes|Reader: 1 Writer: 2 |
Data Pipelines|No|No|Yes|No|Yes,|Yes|Reader: 1 Writer: 2 Overwrite only|
PowerBI Direct Lake Semantic Models|Yes|Yes|N/A (not applicable)|N/A (not applicable)|N/A (not applicable)|Yes|N/A (not applicable)|
Export Power BI Semantic Models into One Lake|Yes|N/A (not applicable)|Yes|No|Yes|N/A (not applicable)|Reader: 2 Writer: 5|
Kusto|No|No|No|No|Yes|Yes|Reader: 1 Writer: 1|
EventStreams|No|No|No|No|Yes|N/A (not applicable)|Reader: 1 Writer: 2|

> [!NOTE]
>
> * Name-based column mappings are not written by default on Microsoft Fabric. The default Microsoft Fabric experience will generate tables that are compatible across the service. Delta Lake, produced by third-party services may have incompatible table features.
> * Some workloads do not have inherited table optimization and maintenance capabilities: bin-compaction, V-Order and old unreferenced files clean-up. Tables ingested using those services should use techniques described on [Use table maintenance feature to manage delta tables in Fabric](../data-engineering/lakehouse-table-maintenance.md) to keep Delta Lake tables optimal for analytics. 

## Current limitations

The following Delta Lake features are not supported in Microsoft Fabric.

* Column mappings using IDs.
* Delta Lake 3.x UniForm.
* Delta Lake 3.x Liquid clustering.
* TIMESTAMP_NTZ data type.
* Identity columns writing (proprietary Databricks feature).
* Delta Live Tables (proprietary Databricks feature).

## Next steps

* [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
* Learn more about Delta Lake in Fabric Lakehouse and Synapse Spark: [Lakehouse and Delta Lake tables](../data-engineering/lakehouse-and-delta-tables.md).
* [Learn about Direct Lake in Power BI and Microsoft Fabric](/power-bi/enterprise/directlake-overview).
* Learn more about querying tables from the Warehouse through its published Delta Lake Logs: [Delta Lake logs in Warehouse in Microsoft Fabric](../data-warehouse/query-delta-lake-logs.md).
