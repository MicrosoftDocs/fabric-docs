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
*   Fix the trim logic didn't handle ASCII control characters correctly ([SPARK-44383](https://issues.apache.org/jira/browse/SPARK-44383))
*   Dataframe.joinWith outer-join should return a null value for unmatched row ([SPARK-37829](https://issues.apache.org/jira/browse/SPARK-37829))
*   Use the utils to get the switch for dynamic allocation used in local checkpoint ([SPARK-42421](https://issues.apache.org/jira/browse/SPARK-42421))
*   Add CapturedException to utils ([SPARK-42078](https://issues.apache.org/jira/browse/SPARK-42078))
*   Support SELECT DEFAULT with ORDER BY, LIMIT, OFFSET for INSERT source relation ([SPARK-43071](https://issues.apache.org/jira/browse/SPARK-43071))

Read the full version of the release notes for a specific Apache Spark version by visiting both [Spark 3.4.0](https://spark.apache.org/releases/spark-release-3-4-0.html) and [Spark 3.4.1](https://spark.apache.org/releases/spark-release-3-4-1.html). 


## Migration guide from Runtime 1.1 to Runtime 1.2

When migrating from Runtime 1.1, powered by Apache Spark 3.3, to Runtime 1.2, powered by Apache Spark 3.4, please review [the official migration guide](https://spark.apache.org/docs/3.4.0/migration-guide.html). Here are the key highlights:

#### Core
*   Since Spark 3.4, Spark driver will own `PersistentVolumnClaim`s and try to reuse if they're not assigned to live executors. To restore the behavior before Spark 3.4, you can set `spark.kubernetes.driver.ownPersistentVolumeClaim` to `false` and `spark.kubernetes.driver.reusePersistentVolumeClaim` to `false`.
*   Since Spark 3.4, Spark driver will track shuffle data when dynamic allocation is enabled without shuffle service. To restore the behavior before Spark 3.4, you can set `spark.dynamicAllocation.shuffleTracking.enabled` to `false`.
*   Since Spark 3.4, Spark will try to decommission cached RDD and shuffle blocks if both `spark.decommission.enabled` and `spark.storage.decommission.enabled` are true. To restore the behavior before Spark 3.4, you can set both `spark.storage.decommission.rddBlocks.enabled` and `spark.storage.decommission.shuffleBlocks.enabled` to `false`.
*   Since Spark 3.4, Spark will use RocksDB store if `spark.history.store.hybridStore.enabled` is true. To restore the behavior before Spark 3.4, you can set `spark.history.store.hybridStore.diskBackend` to `LEVELDB`. 
#### PySpark
*   In Spark 3.4, the schema of an array column is inferred by merging the schemas of all elements in the array. To restore the previous behavior where the schema is only inferred from the first element, you can set `spark.sql.pyspark.legacy.inferArrayTypeFromFirstElement.enabled` to `true`.
*   In Spark 3.4, if Pandas on Spark API `Groupby.apply`’s `func` parameter return type isn't specified and `compute.shortcut_limit` is set to 0, the sampling rows will be set to 2 (ensure sampling rows always >= 2) to make sure infer schema is accurate.
*   In Spark 3.4, if Pandas on Spark API `Index.insert` is out of bounds, will raise IndexError with `index {} is out of bounds for axis 0 with size {}` to follow pandas 1.4 behavior.
*   In Spark 3.4, the series name will be preserved in Pandas on Spark API `Series.mode` to follow pandas 1.4 behavior.
*   In Spark 3.4, the Pandas on Spark API `Index.__setitem__` will first to check `value` type is `Column` type to avoid raising unexpected `ValueError` in `is_list_like` like Can't convert column into bool: please use ‘&’ for ‘and’, ‘|’ for ‘or’, ‘~’ for ‘not’ when building DataFrame boolean expressions..
*   In Spark 3.4, the Pandas on Spark API `astype('category')` will also refresh `categories.dtype` according to original data `dtype` to follow pandas 1.4 behavior.
*   In Spark 3.4, the Pandas on Spark API supports group by positional indexing in `GroupBy.head` and `GroupBy.tail` to follow pandas 1.4. Negative arguments now work correctly and result in ranges relative to the end and start of each group. Previously, negative arguments returned empty frames.
*   In Spark 3.4, the infer schema process of `groupby.apply` in Pandas on Spark, will first infer the pandas type to ensure the accuracy of the pandas `dtype` as much as possible.
*   In Spark 3.4, the `Series.concat` sort parameter will be respected to follow pandas 1.4 behaviors.
*   In Spark 3.4, the `DataFrame.__setitem__` will make a copy and replace pre-existing arrays, which will NOT be over-written to follow pandas 1.4 behaviors.
*   In Spark 3.4, the `SparkSession.sql` and the Pandas on Spark API `sql` have got new parameter `args` which provides binding of named parameters to their SQL literals.
*   In Spark 3.4, Pandas API on Spark follows for the pandas 2.0, and some APIs were deprecated or removed in Spark 3.4 according to the changes made in pandas 2.0. Please refer to the \[release notes of pandas\]([https://pandas.pydata.org/docs/dev/whatsnew/](https://pandas.pydata.org/docs/dev/whatsnew/)) for more details.

#### SQL, Datasets and DataFrame
* Since Spark 3.4, INSERT INTO commands with explicit column list comprising fewer columns then the target table will automatically add the corresponding default values for the remaining columns (or NULL for any column lacking an explicitly assigned default value). In Spark 3.3 or earlier, these commands would have failed returning errors reporting that the number of provided columns doesn't match the number of columns in the target table. Note that disabling `spark.sql.defaultColumn.useNullsForMissingDefaultValues` will restore the previous behavior.
*   Since Spark 3.4, Number or Number(\*) from Teradata will be treated as Decimal(38,18). In Spark 3.3 or earlier, Number or Number(\*) from Teradata will be treated as Decimal(38, 0), in which case the fractional part will be removed.
*   Since Spark 3.4, v1 database, table, permanent view and function identifier will include ‘spark\_catalog’ as the catalog name if database is defined, e.g. a table identifier will be: `spark_catalog.default.t`. To restore the legacy behavior, set `spark.sql.legacy.v1IdentifierNoCatalog` to `true`.
*   Since Spark 3.4, when ANSI SQL mode(configuration `spark.sql.ansi.enabled`) is on, Spark SQL always returns NULL result on getting a map value with a nonexisting key. In Spark 3.3 or earlier, there will be an error.
*   Since Spark 3.4, the SQL CLI `spark-sql` doesn't print the prefix `Error in query:` before the error message of `AnalysisException`.
*   Since Spark 3.4, `split` function ignores trailing empty strings when `regex` parameter is empty.
*   Since Spark 3.4, the `to_binary` function throws error for a malformed `str` input. Use `try_to_binary` to tolerate malformed input and return NULL instead.
    *   Valid Base64 string should include symbols from in base64 alphabet (A-Za-z0-9+/), optional padding (`=`), and optional whitespaces. Whitespaces are skipped in conversion except when they're preceded by padding symbol(s). If padding is present it should conclude the string and follow rules described in RFC 4648 § 4.
    *   Valid hexadecimal strings should include only allowed symbols (0-9A-Fa-f).
    *   Valid values for `fmt` are case-insensitive `hex`, `base64`, `utf-8`, `utf8`.
*   Since Spark 3.4, Spark throws only `PartitionsAlreadyExistException` when it creates partitions but some of them exist already. In Spark 3.3 or earlier, Spark can throw either `PartitionsAlreadyExistException` or `PartitionAlreadyExistsException`.
*   Since Spark 3.4, Spark will do validation for partition spec in ALTER PARTITION to follow the behavior of `spark.sql.storeAssignmentPolicy` which may cause an exception if type conversion fails, e.g. `ALTER TABLE .. ADD PARTITION(p='a')` if column `p` is int type. To restore the legacy behavior, set `spark.sql.legacy.skipTypeValidationOnAlterPartition` to `true`.
*   Since Spark 3.4, vectorized readers are enabled by default for the nested data types (array, map, and struct). To restore the legacy behavior, set `spark.sql.orc.enableNestedColumnVectorizedReader` and `spark.sql.parquet.enableNestedColumnVectorizedReader` to `false`.
*   Since Spark 3.4, `BinaryType` isn't supported in CSV datasource. In Spark 3.3 or earlier, users can write binary columns in CSV datasource, but the output content in CSV files is `Object.toString()` which is meaningless; meanwhile, if users read CSV tables with binary columns, Spark will throw an `Unsupported type: binary` exception.
*   Since Spark 3.4, bloom filter joins are enabled by default. To restore the legacy behavior, set `spark.sql.optimizer.runtime.bloomFilter.enabled` to `false`.

#### Structured Streaming
*   Since Spark 3.4, `Trigger.Once` is deprecated, and users are encouraged to migrate from `Trigger.Once` to `Trigger.AvailableNow`. Please refer [SPARK-39805](https://issues.apache.org/jira/browse/SPARK-39805) for more details.
*   Since Spark 3.4, the default value of configuration for Kafka offset fetching (`spark.sql.streaming.kafka.useDeprecatedOffsetFetching`) is changed from `true` to `false`. The default no longer relies consumer group based scheduling, which affects the required ACL. For more information, see [Structured Streaming Kafka Integration](https://spark.apache.org/docs/3.4.0/structured-streaming-kafka-integration.html#offset-fetching).
    


## New features and improvements of Delta Lake 2.4
[Delta Lake](https://delta.io/) is an [open source project](https://github.com/delta-io/delta) that enables building a lakehouse architecture on top of data lakes. Delta Lake provides [ACID transactions](https://docs.delta.io/2.4.0/concurrency-control.html), scalable metadata handling, and unifies [streaming](https://docs.delta.io/2.4.0/delta-streaming.html) and [batch](https://docs.delta.io/2.4.0/delta-batch.html) data processing on top of existing data lakes.

Specifically, Delta Lake offers:
*   [ACID transactions](https://docs.delta.io/2.4.0/concurrency-control.html) on Spark: Serializable isolation levels ensure that readers never see inconsistent data.
*   Scalable metadata handling: Leverages Spark distributed processing power to handle all the metadata for petabyte-scale tables with billions of files at ease.
*   [Streaming](https://docs.delta.io/2.4.0/delta-streaming.html) and [batch](https://docs.delta.io/2.4.0/delta-batch.html) unification: A table in Delta Lake is a batch table as well as a streaming source and sink. Streaming data ingest, batch historic backfill, interactive queries all just work out of the box.
*   Schema enforcement: Automatically handles schema variations to prevent insertion of bad records during ingestion.
*   [Time travel](https://docs.delta.io/2.4.0/delta-batch.html#-deltatimetravel): Data versioning enables rollbacks, full historical audit trails, and reproducible machine learning experiments.
*   [Upserts](https://docs.delta.io/2.4.0/delta-update.html#-delta-merge) and [deletes](https://docs.delta.io/2.4.0/delta-update.html#-delta-delete): Supports merge, update and delete operations to enable complex use cases like change-data-capture, slowly changing dimension (SCD) operations, streaming upserts, and so on.


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
*   [Fix](https://github.com/delta-io/delta/commit/5ab678db) a bug in Change Data Feed reads for records created during the ambiguous hour when daylight savings occur.
*   [Fix](https://github.com/delta-io/delta/commit/28148976) a bug where querying an external Delta table at the root of an S3 bucket would throw an error.
*   [Remove](https://github.com/delta-io/delta/commit/81c7a58e) leaked internal Spark metadata from the Delta log to make any affected tables readable again.

Note: the Delta Lake 2.4.0 release doesn't include the [Iceberg to Delta converter](https://docs.delta.io/2.4.0/delta-utility.html#convert-an-iceberg-table-to-a-delta-table) because `iceberg-spark-runtime` doesn't support Spark 3.4 yet. The Iceberg to Delta converter is still supported when using Delta 2.3 with Spark 3.3.

Read the full version of the release notes for [Delta Lake 2.4](https://github.com/delta-io/delta/releases/tag/v2.4.0).


## Default level packages for Java/Scala libraries

The following table lists all the default level packages for Java/Scala and their respective versions.

| **GroupId**                            | **ArtifactId**                              | **Version**                 |
|----------------------------------------|---------------------------------------------|-----------------------------|
| com.aliyun                             | aliyun-java-sdk-core                        | 4.5.10                      |
| com.aliyun                             | aliyun-java-sdk-kms                         | 2.11.0                      |
| com.aliyun                             | aliyun-java-sdk-ram                         | 3.1.0                       |
| com.aliyun                             | aliyun-sdk-oss                              | 3.13.0                      |
| com.amazonaws                          | aws-java-sdk-bundle                         | 1.12.262                    |
| com.clearspring.analytics              | stream                                      | 2.9.6                       |
| com.esotericsoftware                   | kryo-shaded                                 | 4.0.2                       |
| com.esotericsoftware                   | minlog                                      | 1.3.0                       |
| com.fasterxml.jackson                  | jackson-annotations                         | 2.14.2                      |
| com.fasterxml.jackson                  | jackson-core                                | 2.14.2                      |
| com.fasterxml.jackson                  | jackson-core-asl                            | 1.9.13                      |
| com.fasterxml.jackson                  | jackson-databind                            | 2.14.2                      |
| com.fasterxml.jackson                  | jackson-dataformat-cbor                     | 2.14.2                      |
| com.fasterxml.jackson                  | jackson-mapper-asl                          | 1.9.13                      |
| com.fasterxml.jackson                  | jackson-module-scala_2.12                   | 2.14.2                      |
| com.github.joshelser                   | dropwizard-metrics-hadoop-metrics2-reporter | 0.1.2                       |
| com.github.luben                       | zstd-jni                                    | 1.5.2-5                     |
| com.github.vowpalwabbit                | vw-jni                                      | 9.3.0                       |
| com.github.wendykierp                  | JTransforms                                 | 3.1                         |
| com.google.cloud.bigdataoss            | gcs-connector                               | hadoop3-2.2.11              |
| com.google.code.findbugs               | jsr305                                      | 3.0.0                       |
| com.google.code.gson                   | gson                                        | 2.2.4                       |
| com.google.crypto.tink                 | tink                                        | 1.7.0                       |
| com.google.flatbuffers                 | flatbuffers-java                            | 1.12.0                      |
| com.google.guava                       | guava                                       | 14.0.1                      |
| com.google.protobuf                    | protobuf-java                               | 2.5.0                       |
| com.googlecode.json-simple             | json-simple                                 | 1.1.1                       |
| com.jcraft                             | jsch                                        | 0.1.54                      |
| com.jolbox                             | bonecp                                      | 0.8.0.RELEASE               |
| com.linkedin.isolation-forest          | isolation-forest_3.2.0_2.12                 | 2.0.8                       |
| com.microsoft.azure                    | azure-data-lake-store-sdk                   | 2.3.9                       |
| com.microsoft.azure                    | azure-eventhubs                             | 3.3.0                       |
| com.microsoft.azure                    | azure-eventhubs-spark_2.12                  | 2.3.22                      |
| com.microsoft.azure                    | azure-keyvault-core                         | 1.0.0                       |
| com.microsoft.azure                    | azure-storage                               | 7.0.1                       |
| com.microsoft.azure                    | cosmos-analytics-spark-3.4.1-connector_2.12 | 1.8.10                      |
| com.microsoft.azure                    | qpid-proton-j-extensions                    | 1.2.4                       |
| com.microsoft.azure                    | synapseml_2.12                              | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-cognitive_2.12                    | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-core_2.12                         | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-deep-learning_2.12                | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-internal_2.12                     | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-lightgbm_2.12                     | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-opencv_2.12                       | 0.11.2-spark3.4             |
| com.microsoft.azure                    | synapseml-vw_2.12                           | 0.11.2-spark3.4             |
| com.microsoft.azure.kusto              | kusto-data                                  | 3.2.1                       |
| com.microsoft.azure.kusto              | kusto-ingest                                | 3.2.1                       |
| com.microsoft.azure.kusto              | kusto-spark_3.0_2.12                        | 3.1.16                      |
| com.microsoft.azure.kusto              | spark-kusto-synapse-connector_3.1_2.12      | 1.3.3                       |
| com.microsoft.cognitiveservices.speech | client-jar-sdk                              | 1.14.0                      |
| com.microsoft.sqlserver                | msslq-jdbc                                  | 8.4.1.jre8                  |
| com.ning                               | compress-lzf                                | 1.1.2                       |
| com.sun.istack                         | istack-commons-runtime                      | 3.0.8                       |
| com.tdunning                           | json                                        | 1.8                         |
| com.thoughtworks.paranamer             | paranamer                                   | 2.8                         |
| com.twitter                            | chill-java                                  | 0.10.0                      |
| com.twitter                            | chill_2.12                                  | 0.10.0                      |
| com.typesafe                           | config                                      | 1.3.4                       |
| com.univocity                          | univocity-parsers                           | 2.9.1                       |
| com.zaxxer                             | HikariCP                                    | 2.5.1                       |
| commons-cli                            | commons-cli                                 | 1.5.0                       |
| commons-codec                          | commons-codec                               | 1.15                        |
| commons-collections                    | commons-collections                         | 3.2.2                       |
| commons-dbcp                           | commons-dbcp                                | 1.4                         |
| commons-io                             | commons-io                                  | 2.11.0                      |
| commons-lang                           | commons-lang                                | 2.6                         |
| commons-logging                        | commons-logging                             | 1.1.3                       |
| commons-pool                           | commons-pool                                | 1.5.4.jar                   |
| dev.ludovic.netlib                     | arpack                                      | 3.0.3                       |
| dev.ludovic.netlib                     | blas                                        | 3.0.3                       |
| dev.ludovic.netlib                     | lapack                                      | 3.0.3                       |
| io.airlift                             | aircompressor                               | 0.21                        |
| io.delta                               | delta-core_2.12                             | 2.4.0.6                     |
| io.delta                               | delta-storage                               | 2.6.0.6                     |
| io.dropwizard.metrics                  | metrics-core                                | 4.2.15                      |
| io.dropwizard.metrics                  | metrics-graphite                            | 4.2.15                      |
| io.dropwizard.metrics                  | metrics-jmx                                 | 4.2.15                      |
| io.dropwizard.metrics                  | metrics-json                                | 4.2.15                      |
| io.dropwizard.metrics                  | metrics-jvm                                 | 4.2.15                      |
| io.github.resilience4j                 | resilience4j-core                           | 1.7.1                       |
| io.github.resilience4j                 | resilience4j-retry                          | 1.7.1                       |
| io.netty                               | netty-all                                   | 4.1.87.Final                |
| io.netty                               | netty-buffer                                | 4.1.87.Final                |
| io.netty                               | netty-codec                                 | 4.1.87.Final                |
| io.netty                               | netty-codec-http2                           | 4.1.87.Final                |
| io.netty                               | netty-codec-http-4                          | 4.1.87.Final                |
| io.netty                               | netty-codec-socks                           | 4.1.87.Final                |
| io.netty                               | netty-common                                | 4.1.87.Final                |
| io.netty                               | netty-handler                               | 4.1.87.Final                |
| io.netty                               | netty-handler-proxy                         | 4.1.87.Final                |
| io.netty                               | netty-resolver                              | 4.1.87.Final                |
| io.netty                               | netty-transport                             | 4.1.87.Final                |
| io.netty                               | netty-transport-classes-epoll               | 4.1.87.Final                |
| io.netty                               | netty-transport-classes-kqueue              | 4.1.87.Final                |
| io.netty                               | netty-transport-native-epoll                | 4.1.87.Final-linux-aarch_64 |
| io.netty                               | netty-transport-native-epoll                | 4.1.87.Final-linux-x86_64   |
| io.netty                               | netty-transport-native-kqueue               | 4.1.87.Final-osx-aarch_64   |
| io.netty                               | netty-transport-native-kqueue               | 4.1.87.Final-osx-x86_64     |
| io.netty                               | netty-transport-native-unix-common          | 4.1.87.Final                |
| io.opentracing                         | opentracing-api                             | 0.33.0                      |
| io.opentracing                         | opentracing-noop                            | 0.33.0                      |
| io.opentracing                         | opentracing-util                            | 0.33.0                      |
| io.spray                               | spray-json_2.12                             | 1.3.5                       |
| io.vavr                                | vavr                                        | 0.10.4                      |
| io.vavr                                | vavr-match                                  | 0.10.4                      |
| jakarta.annotation                     | jakarta.annotation-api                      | 1.3.5                       |
| jakarta.inject                         | jakarta.inject                              | 2.6.1                       |
| jakarta.servlet                        | jakarta.servlet-api                         | 4.0.3                       |
| jakarta.validation-api                 | 2.0.2                                       |                             |
| jakarta.ws.rs                          | jakarta.ws.rs-api                           | 2.1.6                       |
| jakarta.xml.bind                       | jakarta.xml.bind-api                        | 2.3.2                       |
| javax.activation                       | activation                                  | 1.1.1                       |
| javax.jdo                              | jdo-api                                     | 3.0.1                       |
| javax.transaction                      | jta                                         | 1.1                         |
| javax.transaction                      | transaction-api                             | 1.1                         |
| javax.xml.bind                         | jaxb-api                                    | 2.2.11                      |
| javolution                             | javolution                                  | 5.5.1                       |
| jline                                  | jline                                       | 2.14.6                      |
| joda-time                              | joda-time                                   | 2.12.2                      |
| mysql                                  | mysql-connector-java                        | 8.0.18                      |
| net.razorvine                          | pickle                                      | 1.3                         |
| net.sf.jpam                            | jpam                                        | 1.1                         |
| net.sf.opencsv                         | opencsv                                     | 2.3                         |
| net.sf.py4j                            | py4j                                        | 0.10.9.7                    |
| net.sourceforge.f2j                    | arpack_combined_all                         | 0.1                         |
| org.antlr                              | ST4                                         | 4.0.4                       |
| org.antlr                              | antlr-runtime                               | 3.5.2                       |
| org.antlr                              | antlr4-runtime                              | 4.9.3                       |
| org.apache.arrow                       | arrow-format                                | 11.0.0                      |
| org.apache.arrow                       | arrow-memory-core                           | 11.0.0                      |
| org.apache.arrow                       | arrow-memory-netty                          | 11.0.0                      |
| org.apache.arrow                       | arrow-vector                                | 11.0.0                      |
| org.apache.avro                        | avro                                        | 1.11.1                      |
| org.apache.avro                        | avro-ipc                                    | 1.11.1                      |
| org.apache.avro                        | avro-mapred                                 | 1.11.1                      |
| org.apache.commons                     | commons-collections4                        | 4.4                         |
| org.apache.commons                     | commons-compress                            | 1.22                        |
| org.apache.commons                     | commons-crypto                              | 1.1.0                       |
| org.apache.commons                     | commons-lang3                               | 3.12.0                      |
| org.apache.commons                     | commons-math3                               | 3.6.1                       |
| org.apache.commons                     | commons-pool2                               | 2.11.1                      |
| org.apache.commons                     | commons-text                                | 1.10.0                      |
| org.apache.curator                     | curator-client                              | 2.13.0                      |
| org.apache.curator                     | curator-framework                           | 2.13.0                      |
| org.apache.curator                     | curator-recipes                             | 2.13.0                      |
| org.apache.derby                       | derby                                       | 10.14.2.0                   |
| org.apache.hadoop                      | hadoop-aliyun                               | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-annotations                          | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-aws                                  | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-azure                                | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-azure-datalake                       | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-client-api                           | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-client-runtime                       | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-cloud-storage                        | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-openstack                            | 3.3.4.5.3-105251583         |
| org.apache.hadoop                      | hadoop-shaded-guava                         | 1.1.1                       |
| org.apache.hadoop                      | hadoop-yarn-server-web-proxy                | 3.3.4.5.3-105251583         |
| org.apache.hive                        | hive-common                                 | 2.3.9                       |
| org.apache.hive                        | hive-exec                                   | 2.3.9                       |
| org.apache.hive                        | hive-llap-common                            | 2.3.9                       |
| org.apache.hive                        | hive-metastore                              | 2.3.9                       |
| org.apache.hive                        | hive-serde                                  | 2.3.9                       |
| org.apache.hive                        | hive-shims-0.23                             | 2.3.9                       |
| org.apache.hive                        | hive-shims                                  | 2.3.9                       |
| org.apache.hive                        | hive-shims-common                           | 2.3.9                       |
| org.apache.hive                        | hive-shims-scheduler                        | 2.3.9                       |
| org.apache.hive                        | hive-storage-api                            | 2.8.1                       |
| org.apache.httpcomponents              | httpclient                                  | 4.5.14                      |
| org.apache.httpcomponents              | httpcore                                    | 4.4.16                      |
| org.apache.httpcomponents              | httpmime                                    | 4.5.14                      |
| org.apache.httpcomponents.client5      | httpclient5                                 | 5.1.3                       |
| org.apache.iceberg                     | delta-iceberg                               | 2.4.0.6                     |
| org.apache.ivy                         | ivy                                         | 2.5.1                       |
| org.apache.kafka                       | kafka-clients                               | 3.3.2                       |
| org.apache.logging.log4j               | log4j-1.2-api                               | 2.19.0                      |
| org.apache.logging.log4j               | log4j-api                                   | 2.19.0                      |
| org.apache.logging.log4j               | log4j-core                                  | 2.19.0                      |
| org.apache.logging.log4j               | log4j-slf4j-impl                            | 2.19.0                      |
| org.apache.orc                         | orc-core                                    | 1.8.4                       |
| org.apache.orc                         | orc-mapreduce                               | 1.8.4                       |
| org.apache.orc                         | orc-shims                                   | 1.8.4                       |
| org.apache.parquet                     | parquet-column                              | 1.12.3                      |
| org.apache.parquet                     | parquet-common                              | 1.12.3                      |
| org.apache.parquet                     | parquet-encoding                            | 1.12.3                      |
| org.apache.parquet                     | parquet-format-structures                   | 1.12.3                      |
| org.apache.parquet                     | parquet-hadoop                              | 1.12.3                      |
| org.apache.parquet                     | parquet-jackson                             | 1.12.3                      |
| org.apache.qpid                        | proton-j                                    | 0.33.8                      |
| org.apache.spark                       | spark-avro_2.12                             | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-catalyst_2.12                         | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-core_2.12                             | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-graphx_2.12                           | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-hadoop-cloud_2.12                     | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-hive_2.12                             | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-kvstore_2.12                          | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-launcher_2.12                         | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-mllib_2.12                            | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-mllib-local_2.12                      | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-network-common_2.12                   | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-network-shuffle_2.12                  | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-repl_2.12                             | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-sketch_2.12                           | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-sql_2.12                              | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-sql-kafka-0-10_2.12                   | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-streaming_2.12                        | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-streaming-kafka-0-10-assembly_2.12    | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-tags_2.12                             | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-token-provider-kafka-0-10_2.12        | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-unsafe_2.12                           | 3.4.1.5.3-105251583         |
| org.apache.spark                       | spark-yarn_2.12                             | 3.4.1.5.3-105251583         |
| org.apache.thrift                      | libfb303                                    | 0.9.3                       |
| org.apache.thrift                      | libthrift                                   | 0.12.0                      |
| org.apache.xbean                       | xbean-asm9-shaded                           | 4.22                        |
| org.apache.yetus                       | audience-annotations                        | 0.5.0                       |
| org.apache.zookeeper                   | zookeeper                                   | 3.6.3.5.3-105251583         |
| org.apache.zookeeper                   | zookeeper-jute                              | 3.6.3.5.3-105251583         |
| org.apiguardian                        | apiguardian-api                             | 1.1.0                       |
| org.codehaus.janino                    | commons-compiler                            | 3.1.9                       |
| org.codehaus.janino                    | janino                                      | 3.1.9                       |
| org.codehaus.jettison                  | jettison                                    | 1.1                         |
| org.datanucleus                        | datanucleus-api-jdo                         | 4.2.4                       |
| org.datanucleus                        | datanucleus-core                            | 4.1.17                      |
| org.datanucleus                        | datanucleus-rdbms                           | 4.1.19                      |
| org.datanucleusjavax.jdo               | 3.2.0-m3                                    |                             |
| org.eclipse.jetty                      | jetty-util                                  | 9.4.50.v20221201            |
| org.eclipse.jetty                      | jetty-util-ajax                             | 9.4.50.v20221201            |
| org.fusesource.leveldbjni              | leveldbjni-all                              | 1.8                         |
| org.glassfish.hk2                      | hk2-api                                     | 2.6.1                       |
| org.glassfish.hk2                      | hk2-locator                                 | 2.6.1                       |
| org.glassfish.hk2                      | hk2-utils                                   | 2.6.1                       |
| org.glassfish.hk2                      | osgi-resource-locator                       | 1.0.3                       |
| org.glassfish.hk2.external             | aopalliance-repackaged                      | 2.6.1                       |
| org.glassfish.jaxb                     | jaxb-runtime                                | 2.3.2                       |
| org.glassfish.jersey.containers        | jersey-container-servlet                    | 2.36                        |
| org.glassfish.jersey.containers        | jersey-container-servlet-core               | 2.36                        |
| org.glassfish.jersey.core              | jersey-client                               | 2.36                        |
| org.glassfish.jersey.core              | jersey-common                               | 2.36                        |
| org.glassfish.jersey.core              | jersey-server                               | 2.36                        |
| org.glassfish.jersey.inject            | jersey-hk2                                  | 2.36                        |
| org.ini4j                              | ini4j                                       | 0.5.4                       |
| org.javassist                          | javassist                                   | 3.25.0-GA                   |
| org.javatuples                         | javatuples                                  | 1.2                         |
| org.jdom                               | jdom2                                       | 2.0.6                       |
| org.jetbrains                          | annotations                                 | 17.0.0                      |
| org.jodd                               | jodd-core                                   | 3.5.2                       |
| org.json                               | json                                        | 20210307                    |
| org.json4s                             | json4s-ast_2.12                             | 3.7.0-M11                   |
| org.json4s                             | json4s-core_2.12                            | 3.7.0-M11                   |
| org.json4s                             | json4s-jackson_2.12                         | 3.7.0-M11                   |
| org.json4s                             | json4s-scalap_2.12                          | 3.7.0-M11                   |
| org.junit.jupiter                      | junit-jupiter                               | 5.5.2                       |
| org.junit.jupiter                      | junit-jupiter-api                           | 5.5.2                       |
| org.junit.jupiter                      | junit-jupiter-engine                        | 5.5.2                       |
| org.junit.jupiter                      | junit-jupiter-params                        | 5.5.2                       |
| org.junit.platform                     | junit-platform-commons                      | 1.5.2                       |
| org.junit.platform                     | junit-platform-engine                       | 1.5.2                       |
| org.lz4                                | lz4-java                                    | 1.8.0                       |
| org.objenesis                          | objenesis                                   | 3.2                         |
| org.openpnp                            | opencv                                      | 3.2.0-1                     |
| org.opentest4j                         | opentest4j                                  | 1.2.0                       |
| org.postgresql                         | postgresql                                  | 42.2.9                      |
| org.roaringbitmap                      | RoaringBitmap                               | 0.9.38                      |
| org.roaringbitmap                      | shims                                       | 0.9.38                      |
| org.rocksdb                            | rocksdbjni                                  | 7.9.2                       |
| org.scala-lang                         | scala-compiler                              | 2.12.17                     |
| org.scala-lang                         | scala-library                               | 2.12.17                     |
| org.scala-lang                         | scala-reflect                               | 2.12.17                     |
| org.scala-lang.modules                 | scala-collection-compat_2.12                | 2.7.0                       |
| org.scala-lang.modules                 | scala-java8-compat_2.12                     | 0.9.0                       |
| org.scala-lang.modules                 | scala-parser-combinators_2.12               | 2.1.1                       |
| org.scala-lang.modules                 | scala-xml_2.12                              | 2.1.0                       |
| org.scalactic                          | scalactic_2.12                              | 3.2.14                      |
| org.scalanlp                           | breeze-macros_2.12                          | 2.1.0                       |
| org.scalanlp                           | breeze_2.12                                 | 2.1.0                       |
| org.slf4j                              | jcl-over-slf4j                              | 2.0.6                       |
| org.slf4j                              | jul-to-slf4j                                | 2.0.6                       |
| org.slf4j                              | slf4j-api                                   | 2.0.6                       |
| org.threeten                           | threeten-extra                              | 1.7.1                       |
| org.tukaani                            | xz                                          | 1.9                         |
| org.typelevel                          | algebra_2.12                                | 2.0.1                       |
| org.typelevel                          | cats-kernel_2.12                            | 2.1.1                       |
| org.typelevel                          | spire_2.12                                  | 0.17.0                      |
| org.typelevel                          | spire-macros_2.12                           | 0.17.0                      |
| org.typelevel                          | spire-platform_2.12                         | 0.17.0                      |
| org.typelevel                          | spire-util_2.12                             | 0.17.0                      |
| org.wildfly.openssl                    | wildfly-openssl                             | 1.0.7.Final                 |
| org.xerial.snappy                      | snappy-java                                 | 1.1.10.1                    |
| oro                                    | oro                                         | 2.0.8                       |
| pl.edu.icm                             | JLargeArrays                                | 1.5                         |
| stax                                   | stax-api                                    | 1.0.1                       |

## Default-level packages for Python

Synapse-Python310-CPU.yml contains the list of libraries shipped in the default Python 3.10 environment in Runtime 1.2. 

The following table lists all the default level packages for Python and their respective versions.

|          **Library**          |  **Version** |          **Library**          |  **Version** |       **Library**       |     **Version**    |
|-------------------------------|--------------|-------------------------------|--------------|-------------------------|--------------------|
| _libgcc_mutex                 | 0.1          | jsonschema-specifications     | 2023.7.1     | pyasn1-modules          | 0.3.0              |
| _openmp_mutex                 | 4.5          | jsonschema-with-format-nongpl | 4.19.0       | pycosat                 | 0.6.4              |
| _py-xgboost-mutex             | 2.0          | jupyter_client                | 8.3.1        | pycparser               | 2.21               |
| absl-py                       | 1.4.0        | jupyter_core                  | 5.3.1        | pydantic                | 1.10.9             |
| adal                          | 1.2.7        | jupyter_events                | 0.7.0        | pygments                | 2.16.1             |
| adlfs                         | 2023.4.0     | jupyter_server                | 2.7.3        | pyjwt                   | 2.8.0              |
| aiohttp                       | 3.8.5        | jupyter_server_terminals      | 0.4.4        | pynacl                  | 1.5.0              |
| aiosignal                     | 1.3.1        | jupyterlab_pygments           | 0.2.2        | pyodbc                  | 4.0.39             |
| alembic                       | 1.12.0       | jupyterlab_widgets            | 3.0.9        | pyopenssl               | 23.2.0             |
| alsa-lib                      | 1.2.9        | keras                         | 2.12.0       | pyparsing               | 3.0.9              |
| ansi2html                     | 1.8.0        | keras-preprocessing           | 1.1.2        | pyperclip               | 1.8.2              |
| anyio                         | 3.7.1        | keyutils                      | 1.6.1        | pyqt                    | 5.15.9             |
| appdirs                       | 1.4.4        | kiwisolver                    | 1.4.5        | pyqt5-sip               | 12.12.2            |
| argon2-cffi                   | 23.1.0       | krb5                          | 1.21.2       | pysocks                 | 1.7.1              |
| argon2-cffi-bindings          | 21.2.0       | lame                          | 3.100        | python                  | 3.10.12            |
| arrow                         | 1.2.3        | lcms2                         | 2.15         | python-dateutil         | 2.8.2              |
| arrow-cpp                     | 12.0.1       | ld_impl_linux-64              | 2.40         | python-duckdb           | 0.8.1              |
| asttokens                     | 2.4.0        | lerc                          | 4.0.0        | python-fastjsonschema   | 2.18.0             |
| astunparse                    | 1.6.3        | liac-arff                     | 2.5.0        | python-flatbuffers      | 23.5.26            |
| async-timeout                 | 4.0.3        | libabseil                     | 20230125.3   | python-graphviz         | 0.20.1             |
| atk-1.0                       | 2.38.0       | libaec                        | 1.0.6        | python-json-logger      | 2.0.7              |
| attr                          | 2.5.1        | libarrow                      | 12.0.1       | python-tzdata           | 2023.3             |
| attrs                         | 23.1.0       | libbrotlicommon               | 1.0.9        | python-xxhash           | 3.3.0              |
| autopage                      | 0.5.1        | libbrotlidec                  | 1.0.9        | python_abi              | 3.10-3_cp310       |
| aws-c-auth                    | 0.7.3        | libbrotlienc                  | 1.0.9        | pythonnet               | 3.0.1              |
| aws-c-cal                     | 0.6.1        | libcap                        | 2.69         | pytorch                 | 2.0.1.10_cpu_0     |
| aws-c-common                  | 0.9.0        | libclang                      | 15.0.7       | pytorch-mutex           | 1.0                |
| aws-c-compression             | 0.2.17       | libclang13                    | 15.0.7       | pytz                    | 2023.3.post1       |
| aws-c-event-stream            | 0.3.1        | libcrc32c                     | 1.1.2        | pyu2f                   | 0.1.5              |
| aws-c-http                    | 0.7.11       | libcups                       | 2.3.3        | pywin32-on-windows      | 0.1.0              |
| aws-c-io                      | 0.13.32      | libcurl                       | 8.3.0        | pyyaml                  | 6.0.1              |
| aws-c-mqtt                    | 0.9.3        | libdeflate                    | 1.18         | pyzmq                   | 25.1.1             |
| aws-c-s3                      | 0.3.14       | libebm                        | 0.4.3        | qt-main                 | 5.15.8             |
| aws-c-sdkutils                | 0.1.12       | libedit                       | 3.1.20191231 | rdma-core               | 28.9               |
| aws-checksums                 | 0.1.17       | libev                         | 4.33         | re2                     | 2023.03.02         |
| aws-crt-cpp                   | 0.21.0       | libevent                      | 2.1.12       | readline                | 8.2                |
| aws-sdk-cpp                   | 1.10.57      | libexpat                      | 2.5.0        | referencing             | 0.30.2             |
| azure-core                    | 1.29.4       | libffi                        | 3.4.2        | regex                   | 2023.8.8           |
| azure-datalake-store          | 0.0.51       | libflac                       | 1.4.3        | requests                | 2.31.0             |
| azure-identity                | 1.14.0       | libgcc-ng                     | 13.2.0       | requests-oauthlib       | 1.3.1              |
| azure-storage-blob            | 12.18.1      | libgcrypt                     | 1.10.1       | retrying                | 1.3.3              |
| azure-storage-file-datalake   | 12.12.0      | libgd                         | 2.3.3        | rfc3339-validator       | 0.1.4              |
| backcall                      | 0.2.0        | libgfortran-ng                | 13.2.0       | rfc3986-validator       | 0.1.1              |
| backoff                       | 1.11.1       | libgfortran5                  | 13.2.0       | rpds-py                 | 0.10.3             |
| backports                     | 1.0          | libglib                       | 2.78.0       | rsa                     | 4.9                |
| backports.functools_lru_cache | 1.6.5        | libgoogle-cloud               | 2.12.0       | ruamel.yaml             | 0.17.32            |
| bcrypt                        | 4.0.1        | libgpg-error                  | 1.47         | ruamel.yaml.clib        | 0.2.7              |
| beautifulsoup4                | 4.12.2       | libgrpc                       | 1.54.3       | ruamel_yaml             | 0.15.80            |
| blas                          | 1.0          | libhwloc                      | 2.9.2        | s2n                     | 1.3.49             |
| bleach                        | 6.0.0        | libiconv                      | 1.17         | sacremoses              | 0.0.53             |
| blinker                       | 1.6.2        | libjpeg-turbo                 | 2.1.5.1      | salib                   | 1.4.7              |
| brotli                        | 1.0.9        | libllvm14                     | 14.0.6       | scikit-learn            | 1.3.0              |
| brotli-bin                    | 1.0.9        | libllvm15                     | 15.0.7       | scipy                   | 1.10.1             |
| brotli-python                 | 1.0.9        | libnghttp2                    | 1.52.0       | seaborn                 | 0.12.2             |
| bzip2                         | 1.0.8        | libnsl                        | 2.0.0        | seaborn-base            | 0.12.2             |
| c-ares                        | 1.19.1       | libnuma                       | 2.0.16       | send2trash              | 1.8.2              |
| ca-certificates               | 2023.7.22    | libogg                        | 1.3.4        | sentence-transformers   | 2.0.0              |
| cached-property               | 1.5.2        | libopus                       | 1.3.1        | sentry-sdk              | 1.31.0             |
| cached_property               | 1.5.2        | libpng                        | 1.6.39       | seqeval                 | 1.2.2              |
| cachetools                    | 5.3.1        | libpq                         | 15.4         | setproctitle            | 1.3.2              |
| cairo                         | 1.16.0       | libprotobuf                   | 3.21.12      | setuptools              | 68.2.2             |
| catboost                      | 1.1.1        | libpulsar                     | 3.2.0        | shap                    | 0.42.1             |
| certifi                       | 2023.7.22    | librsvg                       | 2.56.3       | sip                     | 6.7.11             |
| cffi                          | 1.15.1       | libsndfile                    | 1.2.2        | six                     | 1.16.0             |
| charset-normalizer            | 3.2.0        | libsodium                     | 1.0.18       | slicer                  | 0.0.7              |
| chromadb                      | 0.3.26       | libsqlite                     | 3.43.0       | smmap                   | 3.0.5              |
| click                         | 8.1.7        | libssh2                       | 1.11.0       | snappy                  | 1.1.10             |
| clickhouse-connect            | 0.6.12       | libstdcxx-ng                  | 13.2.0       | sniffio                 | 1.3.0              |
| cliff                         | 4.2.0        | libsystemd0                   | 254          | soupsieve               | 2.5                |
| cloudpickle                   | 2.2.1        | libthrift                     | 0.18.1       | sqlalchemy              | 2.0.21             |
| clr_loader                    | 0.2.6        | libtiff                       | 4.5.1        | sqlparse                | 0.4.4              |
| cmaes                         | 0.10.0       | libtool                       | 2.4.7        | stack_data              | 0.6.2              |
| cmd2                          | 2.4.3        | libutf8proc                   | 2.8.0        | starlette               | 0.27.0             |
| colorama                      | 0.4.6        | libuuid                       | 2.38.1       | statsmodels             | 0.14.0             |
| coloredlogs                   | 15.0.1       | libuv                         | 1.46.0       | stevedore               | 5.1.0              |
| colorlog                      | 6.7.0        | libvorbis                     | 1.3.7        | sympy                   | 1.12               |
| comm                          | 0.1.4        | libwebp                       | 1.3.1        | tabulate                | 0.9.0              |
| conda-package-handling        | 2.2.0        | libwebp-base                  | 1.3.1        | tbb                     | 2021.10.0          |
| conda-package-streaming       | 0.9.0        | libxcb                        | 1.15         | tenacity                | 8.2.3              |
| configparser                  | 5.3.0        | libxgboost                    | 1.7.6        | tensorboard             | 2.12.3             |
| contourpy                     | 1.1.1        | libxkbcommon                  | 1.5.0        | tensorboard-data-server | 0.7.0              |
| cryptography                  | 41.0.3       | libxml2                       | 2.11.5       | tensorflow              | 2.12.1             |
| cycler                        | 0.11.0       | libxslt                       | 1.1.37       | tensorflow-base         | 2.12.1             |
| cython                        | 3.0.2        | libzlib                       | 1.2.13       | tensorflow-estimator    | 2.12.1             |
| dash                          | 2.13.0       | lightgbm                      | 4.0.0        | termcolor               | 2.3.0              |
| dash-core-components          | 2.0.0        | lime                          | 0.2.0.1      | terminado               | 0.17.1             |
| dash-html-components          | 2.0.0        | llvm-openmp                   | 16.0.6       | threadpoolctl           | 3.2.0              |
| dash-table                    | 5.0.0        | llvmlite                      | 0.40.1       | tiktoken                | 0.5.1              |
| dash_cytoscape                | 0.2.0        | lxml                          | 4.9.3        | tinycss2                | 1.2.1              |
| databricks-cli                | 0.17.7       | lz4                           | 4.3.2        | tk                      | 8.6.12             |
| dataclasses                   | 0.8          | lz4-c                         | 1.9.4        | tokenizers              | 0.13.3             |
| datasets                      | 2.14.4       | mako                          | 1.2.4        | toml                    | 0.10.2             |
| dbus                          | 1.13.6       | markdown                      | 3.4.4        | tomli                   | 2.0.1              |
| debugpy                       | 1.8.0        | markupsafe                    | 2.1.3        | toolz                   | 0.12.0             |
| decorator                     | 5.1.1        | matplotlib                    | 3.7.2        | tornado                 | 6.3.3              |
| defusedxml                    | 0.7.1        | matplotlib-base               | 3.7.2        | tqdm                    | 4.66.1             |
| dill                          | 0.3.7        | matplotlib-inline             | 0.1.6        | traitlets               | 5.10.0             |
| diskcache                     | 5.6.3        | mistune                       | 3.0.1        | transformers            | 4.26.0             |
| distlib                       | 0.3.7        | mkl                           | 2021.4.0     | treeinterpreter         | 0.2.2              |
| docker-py                     | 6.1.3        | mkl-service                   | 2.4.0        | typed-ast               | 1.5.5              |
| docker-pycreds                | 0.4.0        | mkl_fft                       | 1.3.1        | types-pytz              | 2023.3.1.0         |
| entrypoints                   | 0.4          | mkl_random                    | 1.2.2        | typing_extensions       | 4.5.0              |
| et_xmlfile                    | 1.1.0        | ml_dtypes                     | 0.2.0        | typing_utils            | 0.1.0              |
| exceptiongroup                | 1.1.3        | mlflow-skinny                 | 2.6.0        | tzdata                  | 2023c              |
| executing                     | 1.2.0        | monotonic                     | 1.5          | ucx                     | 1.14.1             |
| expat                         | 2.5.0        | mpc                           | 1.3.1        | unicodedata2            | 15.0.0             |
| fastapi                       | 0.103.1      | mpfr                          | 4.2.0        | unixodbc                | 2.3.12             |
| flaml                         | 2.1.1dev1    | mpg123                        | 1.31.3       | uri-template            | 1.3.0              |
| flask                         | 2.3.3        | mpmath                        | 1.3.0        | uvicorn                 | 0.23.2             |
| flatbuffers                   | 23.5.26      | msal                          | 1.24.0       | virtualenv              | 20.23.1            |
| font-ttf-dejavu-sans-mono     | 2.37         | msal_extensions               | 1.0.0        | wandb                   | 0.15.10            |
| font-ttf-inconsolata          | 3.000        | multidict                     | 6.0.4        | wcwidth                 | 0.2.6              |
| font-ttf-source-code-pro      | 2.038        | multiprocess                  | 0.70.15      | webcolors               | 1.13               |
| font-ttf-ubuntu               | 0.83         | munkres                       | 1.1.4        | webencodings            | 0.5.1              |
| fontconfig                    | 2.14.2       | mysql-common                  | 8.0.33       | websocket-client        | 1.6.3              |
| fonts-conda-ecosystem         | 1            | mysql-libs                    | 8.0.33       | werkzeug                | 2.3.7              |
| fonts-conda-forge             | 1            | nbclient                      | 0.8.0        | wheel                   | 0.41.2             |
| fonttools                     | 4.42.1       | nbconvert-core                | 7.8.0        | widgetsnbextension      | 4.0.9              |
| fqdn                          | 1.5.1        | nbformat                      | 5.9.2        | wrapt                   | 1.15.0             |
| freetype                      | 2.12.1       | ncurses                       | 6.4          | xcb-util                | 0.4.0              |
| fribidi                       | 1.0.10       | nest-asyncio                  | 1.5.6        | xcb-util-image          | 0.4.0              |
| frozenlist                    | 1.4.0        | networkx                      | 3.1          | xcb-util-keysyms        | 0.4.0              |
| fsspec                        | 2023.9.1     | nltk                          | 3.8.1        | xcb-util-renderutil     | 0.3.9              |
| gast                          | 0.4.0        | nspr                          | 4.35         | xcb-util-wm             | 0.4.1              |
| gdk-pixbuf                    | 2.42.10      | nss                           | 3.92         | xgboost                 | 1.7.6              |
| geographiclib                 | 1.52         | numba                         | 0.57.1       | xkeyboard-config        | 2.39               |
| geopy                         | 2.3.0        | numpy                         | 1.24.3       | xorg-kbproto            | 1.0.7              |
| gettext                       | 0.21.1       | numpy-base                    | 1.24.3       | xorg-libice             | 1.1.1              |
| gevent                        | 23.9.0.post1 | oauthlib                      | 3.2.2        | xorg-libsm              | 1.2.4              |
| gflags                        | 2.2.2        | onnxruntime                   | 1.15.1       | xorg-libx11             | 1.8.6              |
| giflib                        | 5.2.1        | openai                        | 0.27.8       | xorg-libxau             | 1.0.11             |
| gitdb                         | 4.0.10       | openjpeg                      | 2.5.0        | xorg-libxdmcp           | 1.1.3              |
| gitpython                     | 3.1.36       | openpyxl                      | 3.1.2        | xorg-libxext            | 1.3.4              |
| glib                          | 2.78.0       | openssl                       | 3.1.2        | xorg-libxrender         | 0.9.11             |
| glib-tools                    | 2.78.0       | opt_einsum                    | 3.3.0        | xorg-renderproto        | 0.11.1             |
| glog                          | 0.6.0        | optuna                        | 2.8.0        | xorg-xextproto          | 7.3.0              |
| gmp                           | 6.2.1        | orc                           | 1.9.0        | xorg-xf86vidmodeproto   | 2.3.1              |
| gmpy2                         | 2.1.2        | overrides                     | 7.4.0        | xorg-xproto             | 7.0.31             |
| google-auth                   | 2.17.3       | packaging                     | 23.1         | xxhash                  | 0.8.2              |
| google-auth-oauthlib          | 1.0.0        | pandas                        | 2.0.3        | xz                      | 5.2.6              |
| google-pasta                  | 0.2.0        | pandas-stubs                  | 2.0.3.230814 | yaml                    | 0.2.5              |
| graphite2                     | 1.3.13       | pandasql                      | 0.7.3        | yarl                    | 1.9.2              |
| graphviz                      | 8.1.0        | pandocfilters                 | 1.5.0        | zeromq                  | 4.3.4              |
| greenlet                      | 2.0.2        | pango                         | 1.50.14      | zipp                    | 3.16.2             |
| grpcio                        | 1.54.3       | paramiko                      | 3.3.1        | zlib                    | 1.2.13             |
| gst-plugins-base              | 1.22.5       | parso                         | 0.8.3        | zope.event              | 5.0                |
| gstreamer                     | 1.22.5       | pathos                        | 0.3.1        | zope.interface          | 6.0                |
| gtk2                          | 2.24.33      | pathtools                     | 0.1.2        | zstandard               | 0.21.0             |
| gts                           | 0.7.6        | patsy                         | 0.5.3        | zstd                    | 1.5.5              |
| h11                           | 0.14.0       | pbr                           | 5.11.1       | astor                   | 0.8.1              |
| h5py                          | 3.9.0        | pcre2                         | 10.40        | contextlib2             | 21.6.0             |
| harfbuzz                      | 7.3.0        | pexpect                       | 4.8.0        | filelock                | 3.11.0             |
| hdf5                          | 1.14.2       | pickleshare                   | 0.7.5        | fluent-logger           | 0.10.0             |
| hnswlib                       | 0.7.0        | pillow                        | 10.0.0       | gson                    | 0.0.3              |
| holidays                      | 0.33         | pip                           | 23.1.2       | jaraco-context          | 4.3.0              |
| html5lib                      | 1.1          | pixman                        | 0.40.0       | joblibspark             | 0.5.2              |
| huggingface_hub               | 0.17.1       | pkgutil-resolve-name          | 1.3.10       | json-tricks             | 3.17.3             |
| humanfriendly                 | 10.0         | platformdirs                  | 3.5.1        | jupyter-ui-poll         | 0.2.2              |
| icu                           | 72.1         | plotly                        | 5.16.1       | more-itertools          | 10.1.0             |
| idna                          | 3.4          | ply                           | 3.11         | msgpack                 | 1.0.5              |
| imageio                       | 2.31.1       | pooch                         | 1.7.0        | mypy                    | 1.4.1              |
| importlib-metadata            | 6.8.0        | portalocker                   | 2.8.2        | mypy-extensions         | 1.0.0              |
| importlib_metadata            | 6.8.0        | posthog                       | 3.0.2        | nni                     | 2.10.1             |
| importlib_resources           | 6.0.1        | pox                           | 0.3.3        | powerbiclient           | 3.1.0              |
| intel-openmp                  | 2021.4.0     | ppft                          | 1.7.6.7      | pyspark                 | 3.4.1.5.3.20230713 |
| interpret                     | 0.4.3        | prettytable                   | 3.8.0        | pythonwebhdfs           | 0.2.3              |
| interpret-core                | 0.4.3        | prometheus_client             | 0.17.1       | responses               | 0.23.3             |
| ipykernel                     | 6.25.2       | prompt-toolkit                | 3.0.39       | rouge-score             | 0.1.2              |
| ipython                       | 8.14.0       | prompt_toolkit                | 3.0.39       | schema                  | 0.7.5              |
| ipywidgets                    | 8.0.7        | protobuf                      | 4.21.12      | simplejson              | 3.19.1             |
| isodate                       | 0.6.1        | psutil                        | 5.9.5        | synapseml-mlflow        | 1.0.22.post1       |
| isoduration                   | 20.11.0      | pthread-stubs                 | 0.4          | synapseml-utils         | 1.0.16.post3       |
| itsdangerous                  | 2.1.2        | ptyprocess                    | 0.7.0        | typeguard               | 2.13.3             |
| jax                           | 0.4.14       | pulsar-client                 | 3.3.0        | types-pyyaml            | 6.0.12.11          |
| jaxlib                        | 0.4.14       | pulseaudio-client             | 16.1         | typing-extensions       | 4.8.0              |
| jedi                          | 0.19.0       | pure_eval                     | 0.2.2        | urllib3                 | 1.26.16            |
| jinja2                        | 3.1.2        | py-xgboost                    | 1.7.6        | websockets              | 11.0.3             |
| joblib                        | 1.3.2        | py4j                          | 0.10.9.7     | wolframalpha            | 5.0.0              |
| jsonpointer                   | 2.4          | pyarrow                       | 12.0.1       | xmltodict               | 0.13.0             |
| jsonschema                    | 4.19.0       | pyasn1                        | 0.5.0        |                         |                    |


## Default-level packages for R

The following table lists all the default level packages for R and their respective versions.

| Library                   | Version      | Library         | Version    | Library          | Version    |
|---------------------------|--------------|-----------------|------------|------------------|------------|
| _libgcc_mutex             | 0.1          | r-cellranger    | 1.1.0      | r-processx       | 3.8.2      |
| _openmp_mutex             | 4.5          | r-class         | 7.3_22     | r-prodlim        | 2023.08.28 |
| _r-mutex                  | 1.0.1        | r-cli           | 3.6.1      | r-profvis        | 0.3.8      |
| _r-xgboost-mutex          | 2.0          | r-clipr         | 0.8.0      | r-progress       | 1.2.2      |
| aws-c-auth                | 0.7.0        | r-clock         | 0.7.0      | r-progressr      | 0.14.0     |
| aws-c-cal                 | 0.6.0        | r-codetools     | 0.2_19     | r-promises       | 1.2.1      |
| aws-c-common              | 0.8.23       | r-collections   | 0.3.7      | r-proxy          | 0.4_27     |
| aws-c-compression         | 0.2.17       | r-colorspace    | 2.1_0      | r-pryr           | 0.1.6      |
| aws-c-event-stream        | 0.3.1        | r-commonmark    | 1.9.0      | r-ps             | 1.7.5      |
| aws-c-http                | 0.7.10       | r-config        | 0.3.2      | r-purrr          | 1.0.1      |
| aws-c-io                  | 0.13.27      | r-conflicted    | 1.2.0      | r-quantmod       | 0.4.25     |
| aws-c-mqtt                | 0.8.13       | r-coro          | 1.0.3      | r-r2d3           | 0.2.6      |
| aws-c-s3                  | 0.3.12       | r-cpp11         | 0.4.6      | r-r6             | 2.5.1      |
| aws-c-sdkutils            | 0.1.11       | r-crayon        | 1.5.2      | r-r6p            | 0.3.0      |
| aws-checksums             | 0.1.16       | r-credentials   | 1.3.2      | r-ragg           | 1.2.5      |
| aws-crt-cpp               | 0.20.2       | r-crosstalk     | 1.2.0      | r-rappdirs       | 0.3.3      |
| aws-sdk-cpp               | 1.10.57      | r-crul          | 1.4.0      | r-rbokeh         | 0.5.2      |
| binutils_impl_linux-64    | 2.40         | r-curl          | 5.0.2      | r-rcmdcheck      | 1.4.0      |
| bwidget                   | 1.9.14       | r-data.table    | 1.14.8     | r-rcolorbrewer   | 1.1_3      |
| bzip2                     | 1.0.8        | r-dbi           | 1.1.3      | r-rcpp           | 1.0.11     |
| c-ares                    | 1.19.1       | r-dbplyr        | 2.3.3      | r-reactable      | 0.4.4      |
| ca-certificates           | 2023.7.22    | r-desc          | 1.4.2      | r-reactr         | 0.4.4      |
| cairo                     | 1.16.0       | r-devtools      | 2.4.5      | r-readr          | 2.1.4      |
| cmake                     | 3.27.4       | r-diagram       | 1.6.5      | r-readxl         | 1.4.3      |
| curl                      | 8.2.1        | r-dials         | 1.2.0      | r-recipes        | 1.0.8      |
| expat                     | 2.5.0        | r-dicedesign    | 1.9        | r-rematch        | 2.0.0      |
| font-ttf-dejavu-sans-mono | 2.37         | r-diffobj       | 0.3.5      | r-rematch2       | 2.1.2      |
| font-ttf-inconsolata      | 3.000        | r-digest        | 0.6.33     | r-remotes        | 2.4.2.1    |
| font-ttf-source-code-pro  | 2.038        | r-downlit       | 0.4.3      | r-reprex         | 2.0.2      |
| font-ttf-ubuntu           | 0.83         | r-dplyr         | 1.1.2      | r-reshape2       | 1.4.4      |
| fontconfig                | 2.14.2       | r-dtplyr        | 1.3.1      | r-rjson          | 0.2.21     |
| fonts-conda-ecosystem     | 1            | r-e1071         | 1.7_13     | r-rlang          | 1.1.1      |
| fonts-conda-forge         | 1            | r-ellipsis      | 0.3.2      | r-rlist          | 0.4.6.2    |
| freetype                  | 2.12.1       | r-evaluate      | 0.21       | r-rmarkdown      | 2.22       |
| fribidi                   | 1.0.10       | r-fansi         | 1.0.4      | r-rodbc          | 1.3_20     |
| gcc_impl_linux-64         | 13.1.0       | r-farver        | 2.1.1      | r-roxygen2       | 7.2.3      |
| gettext                   | 0.21.1       | r-fastmap       | 1.1.1      | r-rpart          | 4.1.19     |
| gflags                    | 2.2.2        | r-fontawesome   | 0.5.2      | r-rprojroot      | 2.0.3      |
| gfortran_impl_linux-64    | 13.1.0       | r-forcats       | 1.0.0      | r-rsample        | 1.2.0      |
| glog                      | 0.6.0        | r-foreach       | 1.5.2      | r-rstudioapi     | 0.15.0     |
| glpk                      | 5.0          | r-forge         | 0.2.0      | r-rversions      | 2.1.2      |
| gmp                       | 6.2.1        | r-fs            | 1.6.3      | r-rvest          | 1.0.3      |
| graphite2                 | 1.3.13       | r-furrr         | 0.3.1      | r-sass           | 0.4.7      |
| gsl                       | 2.7          | r-future        | 1.33.0     | r-scales         | 1.2.1      |
| gxx_impl_linux-64         | 13.1.0       | r-future.apply  | 1.11.0     | r-selectr        | 0.4_2      |
| harfbuzz                  | 7.3.0        | r-gargle        | 1.5.2      | r-sessioninfo    | 1.2.2      |
| icu                       | 72.1         | r-generics      | 0.1.3      | r-shape          | 1.4.6      |
| kernel-headers_linux-64   | 2.6.32       | r-gert          | 1.9.3      | r-shiny          | 1.7.5      |
| keyutils                  | 1.6.1        | r-ggplot2       | 3.4.2      | r-slider         | 0.3.0      |
| krb5                      | 1.21.2       | r-gh            | 1.4.0      | r-sourcetools    | 0.1.7_1    |
| ld_impl_linux-64          | 2.40         | r-gistr         | 0.9.0      | r-sparklyr       | 1.8.2      |
| lerc                      | 4.0.0        | r-gitcreds      | 0.1.2      | r-squarem        | 2021.1     |
| libabseil                 | 20230125.3   | r-globals       | 0.16.2     | r-stringi        | 1.7.12     |
| libarrow                  | 12.0.0       | r-glue          | 1.6.2      | r-stringr        | 1.5.0      |
| libblas                   | 3.9.0        | r-googledrive   | 2.1.1      | r-survival       | 3.5_7      |
| libbrotlicommon           | 1.0.9        | r-googlesheets4 | 1.1.1      | r-sys            | 3.4.2      |
| libbrotlidec              | 1.0.9        | r-gower         | 1.0.1      | r-systemfonts    | 1.0.4      |
| libbrotlienc              | 1.0.9        | r-gpfit         | 1.0_8      | r-testthat       | 3.1.10     |
| libcblas                  | 3.9.0        | r-gt            | 0.9.0      | r-textshaping    | 0.3.6      |
| libcrc32c                 | 1.1.2        | r-gtable        | 0.3.4      | r-tibble         | 3.2.1      |
| libcurl                   | 8.2.1        | r-hardhat       | 1.3.0      | r-tidymodels     | 1.1.0      |
| libdeflate                | 1.18         | r-haven         | 2.5.3      | r-tidyr          | 1.3.0      |
| libedit                   | 3.1.20191231 | r-hexbin        | 1.28.3     | r-tidyselect     | 1.2.0      |
| libev                     | 4.33         | r-highcharter   | 0.9.4      | r-tidyverse      | 2.0.0      |
| libevent                  | 2.1.12       | r-highr         | 0.10       | r-timechange     | 0.2.0      |
| libexpat                  | 2.5.0        | r-hms           | 1.1.3      | r-timedate       | 4022.108   |
| libffi                    | 3.4.2        | r-htmltools     | 0.5.6      | r-tinytex        | 0.46       |
| libgcc-devel_linux-64     | 13.1.0       | r-htmlwidgets   | 1.6.2      | r-torch          | 0.11.0     |
| libgcc-ng                 | 13.1.0       | r-httpcode      | 0.3.0      | r-triebeard      | 0.4.1      |
| libgfortran-ng            | 13.1.0       | r-httpuv        | 1.6.11     | r-ttr            | 0.24.3     |
| libgfortran5              | 13.1.0       | r-httr          | 1.4.7      | r-tune           | 1.1.2      |
| libgit2                   | 1.7.1        | r-httr2         | 0.2.3      | r-tzdb           | 0.4.0      |
| libglib                   | 2.76.4       | r-ids           | 1.0.1      | r-urlchecker     | 1.0.1      |
| libgomp                   | 13.1.0       | r-igraph        | 1.5.1      | r-urltools       | 1.7.3      |
| libgoogle-cloud           | 2.12.0       | r-infer         | 1.0.4      | r-usethis        | 2.2.2      |
| libgrpc                   | 1.55.1       | r-ini           | 0.3.1      | r-utf8           | 1.2.3      |
| libiconv                  | 1.17         | r-ipred         | 0.9_14     | r-uuid           | 1.1_1      |
| libjpeg-turbo             | 2.1.5.1      | r-isoband       | 0.2.7      | r-v8             | 4.3.3      |
| liblapack                 | 3.9.0        | r-iterators     | 1.0.14     | r-vctrs          | 0.6.3      |
| libnghttp2                | 1.52.0       | r-jose          | 1.2.0      | r-viridislite    | 0.4.2      |
| libnuma                   | 2.0.16       | r-jquerylib     | 0.1.4      | r-vroom          | 1.6.3      |
| libopenblas               | 0.3.23       | r-jsonlite      | 1.8.7      | r-waldo          | 0.5.1      |
| libpng                    | 1.6.39       | r-juicyjuice    | 0.1.0      | r-warp           | 0.2.0      |
| libprotobuf               | 4.23.2       | r-kernsmooth    | 2.23_22    | r-whisker        | 0.4.1      |
| libsanitizer              | 13.1.0       | r-knitr         | 1.43       | r-withr          | 2.5.0      |
| libssh2                   | 1.11.0       | r-labeling      | 0.4.3      | r-workflows      | 1.1.3      |
| libstdcxx-devel_linux-64  | 13.1.0       | r-later         | 1.3.1      | r-workflowsets   | 1.0.1      |
| libstdcxx-ng              | 13.1.0       | r-lattice       | 0.21_8     | r-xfun           | 0.40       |
| libthrift                 | 0.18.1       | r-lava          | 1.7.2.1    | r-xgboost        | 1.7.4      |
| libtiff                   | 4.5.1        | r-lazyeval      | 0.2.2      | r-xml            | 3.99_0.14  |
| libutf8proc               | 2.8.0        | r-lhs           | 1.1.6      | r-xml2           | 1.3.5      |
| libuuid                   | 2.38.1       | r-lifecycle     | 1.0.3      | r-xopen          | 1.0.0      |
| libuv                     | 1.46.0       | r-lightgbm      | 3.3.5      | r-xtable         | 1.8_4      |
| libv8                     | 8.9.83       | r-listenv       | 0.9.0      | r-xts            | 0.13.1     |
| libwebp-base              | 1.3.1        | r-lobstr        | 1.1.2      | r-yaml           | 2.3.7      |
| libxcb                    | 1.15         | r-lubridate     | 1.9.2      | r-yardstick      | 1.2.0      |
| libxgboost                | 1.7.4        | r-magrittr      | 2.0.3      | r-zip            | 2.3.0      |
| libxml2                   | 2.11.5       | r-maps          | 3.4.1      | r-zoo            | 1.8_12     |
| libzlib                   | 1.2.13       | r-markdown      | 1.8        | rdma-core        | 28.9       |
| lz4-c                     | 1.9.4        | r-mass          | 7.3_60     | re2              | 2023.03.02 |
| make                      | 4.3          | r-matrix        | 1.6_1      | readline         | 8.2        |
| ncurses                   | 6.4          | r-memoise       | 2.0.1      | rhash            | 1.4.4      |
| openssl                   | 3.1.2        | r-mgcv          | 1.9_0      | s2n              | 1.3.46     |
| orc                       | 1.8.4        | r-mime          | 0.12       | sed              | 4.8        |
| pandoc                    | 2.19.2       | r-miniui        | 0.1.1.1    | snappy           | 1.1.10     |
| pango                     | 1.50.14      | r-modeldata     | 1.2.0      | sysroot_linux-64 | 2.12       |
| pcre2                     | 10.40        | r-modelenv      | 0.1.1      | tk               | 8.6.12     |
| pixman                    | 0.40.0       | r-modelmetrics  | 1.2.2.2    | tktable          | 2.10       |
| pthread-stubs             | 0.4          | r-modelr        | 0.1.11     | ucx              | 1.14.1     |
| r-arrow                   | 12.0.0       | r-munsell       | 0.5.0      | unixodbc         | 2.3.12     |
| r-askpass                 | 1.1          | r-nlme          | 3.1_163    | xorg-kbproto     | 1.0.7      |
| r-assertthat              | 0.2.1        | r-nnet          | 7.3_19     | xorg-libice      | 1.1.1      |
| r-backports               | 1.4.1        | r-numderiv      | 2016.8_1.1 | xorg-libsm       | 1.2.4      |
| r-base                    | 4.2.3        | r-openssl       | 2.0.6      | xorg-libx11      | 1.8.6      |
| r-base64enc               | 0.1_3        | r-parallelly    | 1.36.0     | xorg-libxau      | 1.0.11     |
| r-bigd                    | 0.2.0        | r-parsnip       | 1.1.1      | xorg-libxdmcp    | 1.1.3      |
| r-bit                     | 4.0.5        | r-patchwork     | 1.1.3      | xorg-libxext     | 1.3.4      |
| r-bit64                   | 4.0.5        | r-pillar        | 1.9.0      | xorg-libxrender  | 0.9.11     |
| r-bitops                  | 1.0_7        | r-pkgbuild      | 1.4.2      | xorg-libxt       | 1.3.0      |
| r-blob                    | 1.2.4        | r-pkgconfig     | 2.0.3      | xorg-renderproto | 0.11.1     |
| r-brew                    | 1.0_8        | r-pkgdown       | 2.0.7      | xorg-xextproto   | 7.3.0      |
| r-brio                    | 1.1.3        | r-pkgload       | 1.3.2.1    | xorg-xproto      | 7.0.31     |
| r-broom                   | 1.0.5        | r-plotly        | 4.10.2     | xz               | 5.2.6      |
| r-bslib                   | 0.5.1        | r-plyr          | 1.8.8      | zlib             | 1.2.13     |
| r-cachem                  | 1.0.8        | r-praise        | 1.0.0      | zstd             | 1.5.5      |
| r-callr                   | 3.7.3        | r-prettyunits   | 1.1.1      |                  |            |
| r-caret                   | 6.0_94       | r-proc          | 1.18.4     |                  |            |


## Next steps
- Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
