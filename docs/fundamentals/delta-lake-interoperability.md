---
title: Delta Lake Table Format Interoperability
description: Learn about Delta Lake table format interoperability in Microsoft Fabric.
author: SnehaGunda
ms.author: sngun
ms.reviewer: dacoelho
ms.date: 05/08/2026
ms.topic: concept-article
ms.search.form: delta lake interoperability
ai-usage: ai-assisted
---

# Delta Lake table format interoperability

In Microsoft Fabric, the Delta Lake table format is the standard for analytics. [Delta Lake](https://docs.delta.io/latest/delta-intro.html) is an open-source storage layer that brings ACID (Atomicity, Consistency, Isolation, Durability) transactions to big data and analytics workloads.

All Fabric experiences natively generate and consume Delta Lake tables, providing a unified product experience. Delta Lake tables produced by one compute engine, such as Fabric Data Warehouse or Synapse Spark, can be consumed by any other engine, such as Power BI. When you ingest data into Fabric, Fabric stores it as Delta tables by default. You can easily integrate external data containing Delta Lake tables by using OneLake shortcuts.

## Delta Lake features and Fabric experiences

To achieve interoperability, all the Fabric experiences align on the Delta Lake features and Fabric capabilities. Some experiences can only write to Delta Lake tables, while others can read from it.

- **Writers**: Data warehouses, eventstreams, and exported Power BI semantic models into OneLake
- **Readers**: SQL analytics endpoint and Power BI direct lake semantic models
- **Writers and readers**: Fabric Spark runtime, dataflows, pipelines, and Kusto Query Language (KQL) databases

The following matrix shows key Delta Lake features and its availability on each Fabric experience.

| Fabric capability | Column mappings | Deletion vectors | V-order writing | Table optimization and maintenance | Partitions |
| --- | --- | --- | --- | --- | --- |
| Data warehouse Delta Lake export | Name: Yes<br />ID: No | Yes | Yes | Yes | Read: N/A (not applicable)<br />Write: No |
| SQL analytics endpoint | Name: Yes<br />ID: No | Yes | N/A (not applicable) | N/A (not applicable) | Read: Yes<br />Write: N/A (not applicable) |
| Lakehouse explorer and preview | Name: Yes<br />ID: No | Yes | N/A (not applicable) | Yes | Read: Yes<br />Write: N/A (not applicable) |
| Fabric Spark Runtime 2.0 (Preview) | Name: Yes<br />ID: Yes | Yes | Yes | Yes | Read: Yes<br />Write: Yes |
| Fabric Spark Runtime 1.3 | Name: Yes<br />ID: Yes | Yes | Yes | Yes | Read: Yes<br />Write: Yes |
| Fabric Spark Runtime 1.2 | Name: Yes<br />ID: Yes | Yes | Yes | Yes | Read: Yes<br />Write: Yes |
| Fabric Spark Runtime 1.1 | Name: Yes<br />ID: Yes | No | Yes | Yes | Read: Yes<br />Write: Yes |
| Python notebooks | Name: No<br />ID: No | No | No | Yes | Read: Yes<br />Write: Yes |
| Dataflows Gen2 | Name: Yes<br />ID: No | Yes | Yes | No | Read: Yes<br />Write: Yes |
| Pipelines | Name: No<br />ID: No | No | Yes | No | Read: Yes<br />Write: Yes, overwrite only |
| Power BI direct lake semantic models | Name: Yes<br />ID: Yes | Yes | N/A (not applicable) | N/A (not applicable) | Read: Yes<br />Write: N/A (not applicable) |
| Export Power BI semantic models into OneLake | Name: Yes<br />ID: No | N/A (not applicable) | Yes | No | Read: N/A (not applicable)<br />Write: No |
| KQL databases | Name: Yes<br />ID: No | Yes | No | No <sup>1</sup> | Read: Yes<br />Write: Yes |
| Eventstreams | Name: No<br />ID: No | No | No | No | Read: N/A (not applicable)<br />Write: Yes |

<sup>1</sup> KQL databases provide certain table maintenance capabilities such as [retention](../real-time-intelligence/data-policies.md). Data is removed at the end of the retention period from OneLake. For more information, see [One Logical copy](../real-time-intelligence/one-logical-copy.md).

| Fabric capability | Liquid Clustering | TIMESTAMP_NTZ | Delta reader/writer version and default table features | Type Widening |
| --- | --- | --- | --- | --- |
| Data warehouse Delta Lake export | No | No | Reader: 3<br />Writer: 7<br />Deletion Vectors,<br />Column Mappings (name) | Yes |
| SQL analytics endpoint | Yes | No | N/A (not applicable) | Yes |
| Lakehouse explorer and preview | Yes | Yes | N/A (not applicable) | Yes |
| Fabric Spark Runtime 2.0 (Preview) | Yes | Yes | Reader: 3<br />Writer: 7<br />Deletion Vectors | Yes |
| Fabric Spark Runtime 1.3 | Yes | Yes | Reader: 1<br />Writer: 2 | No |
| Fabric Spark Runtime 1.2 | Yes, read only | Yes | Reader: 1<br />Writer: 2 | No |
| Fabric Spark Runtime 1.1 | Yes, read only | No | Reader: 1<br />Writer: 2 | No |
| Python notebooks | No | Yes | Reader: 1<br />Writer: 2 | No |
| Dataflows Gen2 | Yes, read only | No | Reader: 1<br />Writer: 2 | Yes |
| Pipelines | Yes, read only | No | Reader: 1<br />Writer: 2 | Yes: DI Data Pipelines (Copy, Lookup activity)<br />No: DI CopyJob pipelines |
| Power BI direct lake semantic models | Yes | No | N/A (not applicable) | Yes |
| Export Power BI semantic models into OneLake | No | No | Reader: 2<br />Writer: 5<br />Column Mappings (name) | No |
| KQL databases | No | No | Reader: 1<br />Writer: 1 | No |
| Eventstreams | No | No | Reader: 1<br />Writer: 2 | No |

> [!NOTE]  
>
> * Fabric doesn't write column mappings by default, except where noted. The default Fabric experience generates tables that are compatible across the service. Delta Lake tables produced by third-party services might have incompatible table features.
> * Some Fabric experiences don't offer table optimization and maintenance capabilities, such as bin-compaction, V-order, deletion vector merge (PURGE), and clean up of old unreferenced files (VACUUM). To keep Delta Lake tables optimal for analytics, follow the techniques in [Run Delta table maintenance in Lakehouse](../data-engineering/lakehouse-table-maintenance.md) for tables ingested using those experiences.
> * For comprehensive cross-workload guidance on table maintenance strategies for different consumption scenarios, see [Cross-workload table maintenance and optimization in Microsoft Fabric](table-maintenance-optimization.md).

## Current limitations

Currently, Fabric doesn't support these Delta Lake features:

- V2 Checkpoints aren't uniformly available in all experiences. Only Spark notebooks and Spark jobs can read and write to tables with V2 Checkpoints. Lakehouse and SQL analytics endpoints don't correctly list tables containing V2 Checkpoint files in the ```__delta_log``` folder.
- Delta Lake 3.x Uniform. This feature is supported only in the Data Engineering Spark-compute (Notebooks, Spark Jobs).
- Identity columns writing (Azure Databricks feature)
- Lakeflow Spark Declarative Pipelines (Azure Databricks feature)
- Delta Lake 4.x features outside of Lakehouse and Spark Notebooks and Jobs: collations, variant type, coordinated commits, etc. Type widening is supported where noted on previous features matrix in this article.
- **Python notebooks Delta Lake feature support**: Python notebooks use [delta-rs](https://delta-io.github.io/delta-rs/) (`deltalake`), [DuckDB](https://duckdb.org/), and [Polars](https://pola.rs/) instead of the Spark Delta Lake reader/writer to read and write Delta Lake tables. The `deltalake` versions currently pinned by Fabric don't support some Delta Lake table features, including deletion vectors, column mapping, liquid clustering writes and optimization, and type widening. Polars `read_delta` and `write_delta` use `deltalake` as the backend, so they share the same limitations.
- **Python notebooks Delta Lake workarounds and fallback**: The DuckDB `delta_scan` function can provide a read-only workaround for some tables that `deltalake` can't read, such as tables with deletion vectors. If a Delta Lake capability isn't available or doesn't work in a Python notebook, use a PySpark notebook instead. PySpark notebooks provide the most complete Delta Lake support in Fabric and cover the Delta Lake scenarios listed for Fabric Spark runtimes in these tables. For more information, see [Data interaction in Python notebooks](../data-engineering/using-python-experience-on-notebook.md#data-interaction) and the [Choosing between Python and PySpark Notebooks in Microsoft Fabric](../data-engineering/fabric-notebook-selection-guide.md).

## Special characters on table names

Microsoft Fabric supports special characters as part of the table names. This feature allows the usage of unicode characters to compose table names in Fabric experiences.

The following special characters are either reserved or not compatible with at least one of Fabric technologies and must not be used as part of a table name: `"` (double quotes), `'` (single quote), `#`, `%`, `+`, `:`, `?`, or ` (backtick).

## Related content

- [Cross-workload table maintenance and optimization in Microsoft Fabric](table-maintenance-optimization.md)
- [What is Delta Lake?](/azure/synapse-analytics/spark/apache-spark-what-is-delta-lake)
- [Lakehouse and Delta Lake tables](../data-engineering/lakehouse-and-delta-tables.md)
- [Direct Lake overview](direct-lake-overview.md)
- [querying tables from the Warehouse through its published Delta Lake Logs](../data-warehouse/query-delta-lake-logs.md)
