---
title: Runtime 1.2 in Fabric
description: Gain a deep understanding of the Apache Spark-based Runtime 1.2 available in Fabric. By learning about unique features, capabilities, and best practices, you can confidently choose Fabric and implement your data-related solutions.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.date: 10/22/2023
---

# Runtime 1.2

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. This document covers the Runtime 1.2 components and versions.

[!INCLUDE [preview-note](../includes/preview-note.md)]

Microsoft Fabric Runtime 1.2 is the latest runtime version. The major components of Runtime 1.2 include:

- Apache Spark 3.4.1
- Operating System: Mariner 2.0
- Java: 11
- Scala: 2.12.15
- Python: 3.10
- Delta Lake: 2.4
- R: 4.2.2

:::image type="content" source="media\workspace-admin-settings\runtime-version-1-2.png" alt-text="Screenshot showing where to select runtime version.":::

Microsoft Fabric Runtime 1.2 comes with a collection of default level packages, including a full Anaconda installation and commonly used libraries for Java/Scala, Python, and R. These libraries are automatically included when using notebooks or jobs in the Microsoft Fabric platform. Refer to the documentation for a complete list of libraries. Microsoft Fabric periodically rolls out maintenance updates for Runtime 1.2, providing bug fixes, performance enhancements, and security patches. *Staying up to date ensures optimal performance and reliability for your data processing tasks.*

## New features and improvements of Spark Release 3.4.1
Apache Spark 3.4.0 is the fifth release of the 3.x line. With tremendous contribution from the open-source community, this release managed to resolve in excess of 2,600 Jira tickets. This release introduces Python client for Spark Connect, augments Structured Streaming with async progress tracking and Python arbitrary stateful processing, increases Pandas API coverage and provides NumPy input support, simplifies the migration from traditional data warehouses by improving ANSI compliance and implementing dozens of new built-in functions, and boosts development productivity and debuggability with memory profiling. Runtime 1.2 is based on Apache Spark 3.4.1 which is a maintenance release containing stability fixes.

### Key highlights
*   Python client for Spark Connect ([SPARK-39375](https://issues.apache.org/jira/browse/SPARK-39375))
*   Implement support for DEFAULT values for columns in tables ([SPARK-38334](https://issues.apache.org/jira/browse/SPARK-38334))
*   Support TIMESTAMP WITHOUT TIMEZONE data type ([SPARK-35662](https://issues.apache.org/jira/browse/SPARK-35662))
*   Support “Lateral Column Alias References” ([SPARK-27561](https://issues.apache.org/jira/browse/SPARK-27561))
*   Harden SQLSTATE usage for error classes ([SPARK-41994](https://issues.apache.org/jira/browse/SPARK-41994))
*   Enable Bloom filter Joins by default ([SPARK-38841](https://issues.apache.org/jira/browse/SPARK-38841))
*   Better Spark UI scalability and Driver stability for large applications ([SPARK-41053](https://issues.apache.org/jira/browse/SPARK-41053))
*   Async Progress Tracking in Structured Streaming ([SPARK-39591](https://issues.apache.org/jira/browse/SPARK-39591))
*   Python Arbitrary Stateful Processing in Structured Streaming ([SPARK-40434](https://issues.apache.org/jira/browse/SPARK-40434))
*   Pandas API coverage improvements ([SPARK-42882](https://issues.apache.org/jira/browse/SPARK-42882)) and NumPy input support in PySpark ([SPARK-39405](https://issues.apache.org/jira/browse/SPARK-39405))
*   Provide a memory profiler for PySpark user-defined functions ([SPARK-40281](https://issues.apache.org/jira/browse/SPARK-40281))
*   Implement PyTorch Distributor ([SPARK-41589](https://issues.apache.org/jira/browse/SPARK-41589))
*   Publish SBOM artifacts ([SPARK-41893](https://issues.apache.org/jira/browse/SPARK-41893))
*   Implement support for DEFAULT values for columns in tables ([SPARK-38334](https://issues.apache.org/jira/browse/SPARK-38334))
*   Support parameterized SQL ([SPARK-41271](https://issues.apache.org/jira/browse/SPARK-41271), [SPARK-42702](https://issues.apache.org/jira/browse/SPARK-42702))
*   Implement support for DEFAULT values for columns in tables ([SPARK-38334](https://issues.apache.org/jira/browse/SPARK-38334))
*   Add Dataset.as(StructType) ([SPARK-39625](https://issues.apache.org/jira/browse/SPARK-39625))
*   Support parameterized SQL ([SPARK-41271](https://issues.apache.org/jira/browse/SPARK-41271), [SPARK-42702](https://issues.apache.org/jira/browse/SPARK-42702))
*   Add unpivot / melt ([SPARK-38864](https://issues.apache.org/jira/browse/SPARK-38864), [SPARK-39876](https://issues.apache.org/jira/browse/SPARK-39876))
*   Support “lateral column alias references” ([SPARK-27561](https://issues.apache.org/jira/browse/SPARK-27561))
*   Support result offset clause ([SPARK-28330](https://issues.apache.org/jira/browse/SPARK-28330), [SPARK-39159](https://issues.apache.org/jira/browse/SPARK-39159))
*   Support Timestamp without time zone data type ([SPARK-35662](https://issues.apache.org/jira/browse/SPARK-35662))
*   Support scalar subquery in time travel ([SPARK-39306](https://issues.apache.org/jira/browse/SPARK-39306))
*   Make Catalog API be compatible with 3-layer-namespace ([SPARK-39235](https://issues.apache.org/jira/browse/SPARK-39235))
*   Support timestamp in seconds for TimeTravel using Dataframe options ([SPARK-39633](https://issues.apache.org/jira/browse/SPARK-39633))
*   Add SparkSession.config(Map) ([SPARK-40163](https://issues.apache.org/jira/browse/SPARK-40163))
*   Support changing session catalog’s default database ([SPARK-35242](https://issues.apache.org/jira/browse/SPARK-35242))
*   Protobuf support for Spark - from\_protobuf AND to\_protobuf ([SPARK-40654](https://issues.apache.org/jira/browse/SPARK-40654))
*   Add WHEN NOT MATCHED BY SOURCE clause to MERGE INTO ([SPARK-40921](https://issues.apache.org/jira/browse/SPARK-40921))
*   Relax ordering constraint for CREATE TABLE column options ([SPARK-40944](https://issues.apache.org/jira/browse/SPARK-40944))
*   SQL Equivalent for Dataframe overwrite command ([SPARK-40956](https://issues.apache.org/jira/browse/SPARK-40956))
*   Support Generate with no required child output to host outer references ([SPARK-41441](https://issues.apache.org/jira/browse/SPARK-41441))
*   ORDER BY ALL ([SPARK-41637](https://issues.apache.org/jira/browse/SPARK-41637))
*   GROUP BY ALL ([SPARK-41635](https://issues.apache.org/jira/browse/SPARK-41635))
*   Add flatMapSortedGroups and cogroupSorted ([SPARK-38591](https://issues.apache.org/jira/browse/SPARK-38591))
*   Support subqueries with correlated non-equality predicates ([SPARK-36114](https://issues.apache.org/jira/browse/SPARK-36114))
*   Support subqueries with correlation through UNION/INTERSECT/EXCEPT ([SPARK-36124](https://issues.apache.org/jira/browse/SPARK-36124))
*   Fix the OOM error can’t be reported when AQE on ([SPARK-42290](https://issues.apache.org/jira/browse/SPARK-42290))
*   Fix the trim logic did not handle ASCII control characters correctly ([SPARK-44383](https://issues.apache.org/jira/browse/SPARK-44383))
*   Dataframe.joinWith outer-join should return a null value for unmatched row ([SPARK-37829](https://issues.apache.org/jira/browse/SPARK-37829))
*   Use the utils to get the switch for dynamic allocation used in local checkpoint ([SPARK-42421](https://issues.apache.org/jira/browse/SPARK-42421))
*   Add CapturedException to utils ([SPARK-42078](https://issues.apache.org/jira/browse/SPARK-42078))
*   Support SELECT DEFAULT with ORDER BY, LIMIT, OFFSET for INSERT source relation ([SPARK-43071](https://issues.apache.org/jira/browse/SPARK-43071))

Read the full version of the release notes for a specific Apache Spark version by visiting both [Spark 3.4.0](https://spark.apache.org/releases/spark-release-3-4-0.html) and [Spark 3.4.1](https://spark.apache.org/releases/spark-release-3-4-1.html). 


### Migration guide from Runtime 1.1 to Runtime 1.2

When migrating from Runtime 1.1, powered by Apache Spark 3.3, to Runtime 1.2, powered by Apache Spark 3.4, please review [the official migration guide](https://spark.apache.org/docs/3.4.0/migration-guide.html). Here are the key highlights:

#### Core
*   Since Spark 3.4, Spark driver will own `PersistentVolumnClaim`s and try to reuse if they are not assigned to live executors. To restore the behavior before Spark 3.4, you can set `spark.kubernetes.driver.ownPersistentVolumeClaim` to `false` and `spark.kubernetes.driver.reusePersistentVolumeClaim` to `false`.
*   Since Spark 3.4, Spark driver will track shuffle data when dynamic allocation is enabled without shuffle service. To restore the behavior before Spark 3.4, you can set `spark.dynamicAllocation.shuffleTracking.enabled` to `false`.
*   Since Spark 3.4, Spark will try to decommission cached RDD and shuffle blocks if both `spark.decommission.enabled` and `spark.storage.decommission.enabled` are true. To restore the behavior before Spark 3.4, you can set both `spark.storage.decommission.rddBlocks.enabled` and `spark.storage.decommission.shuffleBlocks.enabled` to `false`.
*   Since Spark 3.4, Spark will use RocksDB store if `spark.history.store.hybridStore.enabled` is true. To restore the behavior before Spark 3.4, you can set `spark.history.store.hybridStore.diskBackend` to `LEVELDB`. 
#### PySpark
*   In Spark 3.4, the schema of an array column is inferred by merging the schemas of all elements in the array. To restore the previous behavior where the schema is only inferred from the first element, you can set `spark.sql.pyspark.legacy.inferArrayTypeFromFirstElement.enabled` to `true`.
*   In Spark 3.4, if Pandas on Spark API `Groupby.apply`’s `func` parameter return type is not specified and `compute.shortcut_limit` is set to 0, the sampling rows will be set to 2 (ensure sampling rows always >= 2) to make sure infer schema is accurate.
*   In Spark 3.4, if Pandas on Spark API `Index.insert` is out of bounds, will raise IndexError with `index {} is out of bounds for axis 0 with size {}` to follow pandas 1.4 behavior.
*   In Spark 3.4, the series name will be preserved in Pandas on Spark API `Series.mode` to follow pandas 1.4 behavior.
*   In Spark 3.4, the Pandas on Spark API `Index.__setitem__` will first to check `value` type is `Column` type to avoid raising unexpected `ValueError` in `is_list_like` like Cannot convert column into bool: please use ‘&’ for ‘and’, ‘|’ for ‘or’, ‘~’ for ‘not’ when building DataFrame boolean expressions..
*   In Spark 3.4, the Pandas on Spark API `astype('category')` will also refresh `categories.dtype` according to original data `dtype` to follow pandas 1.4 behavior.
*   In Spark 3.4, the Pandas on Spark API supports groupby positional indexing in `GroupBy.head` and `GroupBy.tail` to follow pandas 1.4. Negative arguments now work correctly and result in ranges relative to the end and start of each group, Previously, negative arguments returned empty frames.
*   In Spark 3.4, the infer schema process of `groupby.apply` in Pandas on Spark, will first infer the pandas type to ensure the accuracy of the pandas `dtype` as much as possible.
*   In Spark 3.4, the `Series.concat` sort parameter will be respected to follow pandas 1.4 behaviors.
*   In Spark 3.4, the `DataFrame.__setitem__` will make a copy and replace pre-existing arrays, which will NOT be over-written to follow pandas 1.4 behaviors.
*   In Spark 3.4, the `SparkSession.sql` and the Pandas on Spark API `sql` have got new parameter `args` which provides binding of named parameters to their SQL literals.
*   In Spark 3.4, Pandas API on Spark follows for the pandas 2.0, and some APIs were deprecated or removed in Spark 3.4 according to the changes made in pandas 2.0. Please refer to the \[release notes of pandas\]([https://pandas.pydata.org/docs/dev/whatsnew/](https://pandas.pydata.org/docs/dev/whatsnew/)) for more details.

#### SQL, Datasets and DataFrame
* Since Spark 3.4, INSERT INTO commands with explicit column lists comprising fewer columns than the target table will automatically add the corresponding default values for the remaining columns (or NULL for any column lacking an explicitly-assigned default value). In Spark 3.3 or earlier, these commands would have failed returning errors reporting that the number of provided columns does not match the number of columns in the target table. Note that disabling `spark.sql.defaultColumn.useNullsForMissingDefaultValues` will restore the previous behavior.
*   Since Spark 3.4, Number or Number(\*) from Teradata will be treated as Decimal(38,18). In Spark 3.3 or earlier, Number or Number(\*) from Teradata will be treated as Decimal(38, 0), in which case the fractional part will be removed.
*   Since Spark 3.4, v1 database, table, permanent view and function identifier will include ‘spark\_catalog’ as the catalog name if database is defined, e.g. a table identifier will be: `spark_catalog.default.t`. To restore the legacy behavior, set `spark.sql.legacy.v1IdentifierNoCatalog` to `true`.
*   Since Spark 3.4, when ANSI SQL mode(configuration `spark.sql.ansi.enabled`) is on, Spark SQL always returns NULL result on getting a map value with a non-existing key. In Spark 3.3 or earlier, there will be an error.
*   Since Spark 3.4, the SQL CLI `spark-sql` does not print the prefix `Error in query:` before the error message of `AnalysisException`.
*   Since Spark 3.4, `split` function ignores trailing empty strings when `regex` parameter is empty.
*   Since Spark 3.4, the `to_binary` function throws error for a malformed `str` input. Use `try_to_binary` to tolerate malformed input and return NULL instead.
    *   Valid Base64 string should include symbols from in base64 alphabet (A-Za-z0-9+/), optional padding (`=`), and optional whitespaces. Whitespaces are skipped in conversion except when they are preceded by padding symbol(s). If padding is present it should conclude the string and follow rules described in RFC 4648 § 4.
    *   Valid hexadecimal strings should include only allowed symbols (0-9A-Fa-f).
    *   Valid values for `fmt` are case-insensitive `hex`, `base64`, `utf-8`, `utf8`.
*   Since Spark 3.4, Spark throws only `PartitionsAlreadyExistException` when it creates partitions but some of them exist already. In Spark 3.3 or earlier, Spark can throw either `PartitionsAlreadyExistException` or `PartitionAlreadyExistsException`.
*   Since Spark 3.4, Spark will do validation for partition spec in ALTER PARTITION to follow the behavior of `spark.sql.storeAssignmentPolicy` which may cause an exception if type conversion fails, e.g. `ALTER TABLE .. ADD PARTITION(p='a')` if column `p` is int type. To restore the legacy behavior, set `spark.sql.legacy.skipTypeValidationOnAlterPartition` to `true`.
*   Since Spark 3.4, vectorized readers are enabled by default for the nested data types (array, map and struct). To restore the legacy behavior, set `spark.sql.orc.enableNestedColumnVectorizedReader` and `spark.sql.parquet.enableNestedColumnVectorizedReader` to `false`.
*   Since Spark 3.4, `BinaryType` is not supported in CSV datasource. In Spark 3.3 or earlier, users can write binary columns in CSV datasource, but the output content in CSV files is `Object.toString()` which is meaningless; meanwhile, if users read CSV tables with binary columns, Spark will throw an `Unsupported type: binary` exception.
*   Since Spark 3.4, bloom filter joins are enabled by default. To restore the legacy behavior, set `spark.sql.optimizer.runtime.bloomFilter.enabled` to `false`.

#### Structured Streaming
*   Since Spark 3.4, `Trigger.Once` is deprecated, and users are encouraged to migrate from `Trigger.Once` to `Trigger.AvailableNow`. Please refer [SPARK-39805](https://issues.apache.org/jira/browse/SPARK-39805) for more details.
*   Since Spark 3.4, the default value of configuration for Kafka offset fetching (`spark.sql.streaming.kafka.useDeprecatedOffsetFetching`) is changed from `true` to `false`. The default no longer relies consumer group based scheduling, which affect the required ACL. For further details please see [Structured Streaming Kafka Integration](https://spark.apache.org/docs/3.4.0/structured-streaming-kafka-integration.html#offset-fetching).
    


## New features and improvements of Delta Lake 2.4
[Delta Lake](https://delta.io/) is an [open source project](https://github.com/delta-io/delta) that enables building a lakehouse architecture on top of data lakes. Delta Lake provides [ACID transactions](https://docs.delta.io/2.4.0/concurrency-control.html), scalable metadata handling, and unifies [streaming](https://docs.delta.io/2.4.0/delta-streaming.html) and [batch](https://docs.delta.io/2.4.0/delta-batch.html) data processing on top of existing data lakes.

Specifically, Delta Lake offers:
*   [ACID transactions](https://docs.delta.io/2.4.0/concurrency-control.html) on Spark: Serializable isolation levels ensure that readers never see inconsistent data.
*   Scalable metadata handling: Leverages Spark distributed processing power to handle all the metadata for petabyte-scale tables with billions of files at ease.
*   [Streaming](https://docs.delta.io/2.4.0/delta-streaming.html) and [batch](https://docs.delta.io/2.4.0/delta-batch.html) unification: A table in Delta Lake is a batch table as well as a streaming source and sink. Streaming data ingest, batch historic backfill, interactive queries all just work out of the box.
*   Schema enforcement: Automatically handles schema variations to prevent insertion of bad records during ingestion.
*   [Time travel](https://docs.delta.io/2.4.0/delta-batch.html#-deltatimetravel): Data versioning enables rollbacks, full historical audit trails, and reproducible machine learning experiments.
*   [Upserts](https://docs.delta.io/2.4.0/delta-update.html#-delta-merge) and [deletes](https://docs.delta.io/2.4.0/delta-update.html#-delta-delete): Supports merge, update and delete operations to enable complex use cases like change-data-capture, slowly-changing-dimension (SCD) operations, streaming upserts, and so on.


### The key features in this release are as follows

*   Support for [Apache Spark 3.4](https://spark.apache.org/releases/spark-release-3-4-0.html).
*   [Support](https://github.com/delta-io/delta/issues/1591) writing [Deletion Vectors](https://github.com/delta-io/delta/blob/master/PROTOCOL.md#deletion-vectors) for the `DELETE` command. Previously, when deleting rows from a Delta table, any file with at least one matching row would be rewritten. With Deletion Vectors these expensive rewrites can be avoided. See [What are deletion vectors?](https://docs.delta.io/2.4.0/delta-deletion-vectors.html) for more details.
*   Support for all write operations on tables with Deletion Vectors enabled.
*   [Support](https://github.com/delta-io/delta/commit/9fac2e6af313b28bf9cd3961aa5dec8ea27a2e7b) `PURGE` to remove Deletion Vectors from the current version of a Delta table by rewriting any data files with deletion vectors. See the [documentation](https://docs.delta.io/2.4.0/delta-deletion-vectors.html#apply-changes-with-reorg-table) for more details.
*   [Support](https://github.com/delta-io/delta/issues/1701) reading Change Data Feed for tables with Deletion Vectors enabled.
*   [Support](https://github.com/delta-io/delta/commit/7c352e9a0bf4b348a60ca040f9179171d2db5f0d) `REPLACE WHERE` expressions in SQL to selectively overwrite data. Previously “replaceWhere” options were only supported in the DataFrameWriter APIs.
*   [Support](https://github.com/delta-io/delta/commit/c53e95c71f25e62871a3def8771be9eb5ca27a2e) `WHEN NOT MATCHED BY SOURCE` clauses in SQL for the Merge command.
*   [Support](https://github.com/delta-io/delta/commit/422a670bc6b232e451db83537dcad34a5de97b67) omitting generated columns from the column list for SQL `INSERT INTO` queries. Delta will automatically generate the values for any unspecified generated columns.
*   [Support](https://github.com/delta-io/delta/pull/1626) the `TimestampNTZ` data type added in Spark 3.3. Using `TimestampNTZ` requires a Delta protocol upgrade; see the [documentation](https://docs.delta.io/2.4.0/versioning.html) for more information.
*   Increased resiliency for S3 multi-cluster reads and writes.
    *   [Use](https://github.com/delta-io/delta/pull/1711) a per-JVM lock to minimize the number of concurrent recovery attempts. Concurrent recoveries may cause concurrent readers to see a `RemoteFileChangedException`.
    *   [Catch](https://github.com/delta-io/delta/pull/1712) any `RemoteFileChangedException` in the reader and retry reading.
*   [Allow](https://github.com/delta-io/delta/commit/303d640a) changing the column type of a `char` or `varchar` column to a compatible type in the `ALTER TABLE` command. The new behavior is the same as in Apache Spark and allows upcasting from `char` or `varchar` to `varchar` or `string`.
*   [Block](https://github.com/delta-io/delta/commit/579a3151db611c5049e5ca04a32fc6cccb77448b) using `overwriteSchema` with dynamic partition overwrite. This can corrupt the table as not all the data may be removed, and the schema of the newly written partitions may not match the schema of the unchanged partitions.
*   [Return](https://github.com/delta-io/delta/commit/83513484) an empty `DataFrame` for Change Data Feed reads when there are no commits within the timestamp range provided. Previously an error would be thrown.
*   [Fix](https://github.com/delta-io/delta/commit/5ab678db) a bug in Change Data Feed reads for records created during the ambiguous hour when daylight savings occurs.
*   [Fix](https://github.com/delta-io/delta/commit/28148976) a bug where querying an external Delta table at the root of an S3 bucket would throw an error.
*   [Remove](https://github.com/delta-io/delta/commit/81c7a58e) leaked internal Spark metadata from the Delta log to make any affected tables readable again.

Note: the Delta Lake 2.4.0 release does not include the [Iceberg to Delta converter](https://docs.delta.io/2.4.0/delta-utility.html#convert-an-iceberg-table-to-a-delta-table) because `iceberg-spark-runtime` does not support Spark 3.4 yet. The Iceberg to Delta converter is still supported when using Delta 2.3 with Spark 3.3.

Read the full version of the release notes for [Delta Lake 2.4](https://github.com/delta-io/delta/releases/tag/v2.4.0).



