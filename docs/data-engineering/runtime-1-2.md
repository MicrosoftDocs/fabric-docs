---
title: Runtime 1.2 in Fabric
description: Gain a deep understanding of the Apache Spark-based Runtime 1.2 available in Fabric. By learning about unique features, capabilities, and best practices, you can confidently choose Fabric and implement your data-related solutions.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Runtime 1.2

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of data engineering and data science experiences. This document covers the Runtime 1.2 components and versions.

Microsoft Fabric Runtime 1.2 is the latest GA runtime version. The major components of Runtime 1.2 include:

- Apache Spark 3.4.1
- Operating System: Mariner 2.0
- Java: 11
- Scala: 2.12.17
- Python: 3.10
- Delta Lake: 2.4.0
- R: 4.2.2

:::image type="content" source="media\workspace-admin-settings\runtime-version-1-2.png" alt-text="Screenshot showing where to select runtime version.":::

Microsoft Fabric Runtime 1.2 comes with a collection of default level packages, including a full Anaconda installation and commonly used libraries for Java/Scala, Python, and R. These libraries are automatically included when using notebooks or jobs in the Microsoft Fabric platform. Refer to the documentation for a complete list of libraries. Microsoft Fabric periodically rolls out maintenance updates for Runtime 1.2, providing bug fixes, performance enhancements, and security patches. *Staying up to date ensures optimal performance and reliability for your data processing tasks.*

## New features and improvements of Spark Release 3.4.1
Apache Spark 3.4.0 is the fifth release in the 3.x line. This release, driven by the open-source community, resolved over 2,600 Jira tickets. It introduces a Python client for Spark Connect, enhances Structured Streaming with async progress tracking and Python stateful processing. It expands Pandas API coverage with NumPy input support, simplifies migration from traditional data warehouses through ANSI compliance and new built-in functions. It also improves development productivity and debuggability with memory profiling. Additionally, Runtime 1.2 is based on Apache Spark 3.4.1, a maintenance release focused on stability fixes.

### Key highlights
*   Implement support for DEFAULT values for columns in tables ([SPARK-38334](https://issues.apache.org/jira/browse/SPARK-38334))
*   Support TIMESTAMP WITHOUT TIMEZONE data type ([SPARK-35662](https://issues.apache.org/jira/browse/SPARK-35662))
*   Support "Lateral Column Alias References" ([SPARK-27561](https://issues.apache.org/jira/browse/SPARK-27561))
*   Harden SQLSTATE usage for error classes ([SPARK-41994](https://issues.apache.org/jira/browse/SPARK-41994))
*   Enable Bloom filter Joins by default ([SPARK-38841](https://issues.apache.org/jira/browse/SPARK-38841))
*   Better Spark UI scalability and Driver stability for large applications ([SPARK-41053](https://issues.apache.org/jira/browse/SPARK-41053))
*   Async Progress Tracking in Structured Streaming ([SPARK-39591](https://issues.apache.org/jira/browse/SPARK-39591))
*   Python Arbitrary Stateful Processing in Structured Streaming ([SPARK-40434](https://issues.apache.org/jira/browse/SPARK-40434))
*   Pandas API coverage improvements ([SPARK-42882](https://issues.apache.org/jira/browse/SPARK-42882)) and NumPy input support in PySpark ([SPARK-39405](https://issues.apache.org/jira/browse/SPARK-39405))
*   Provide a memory profiler for PySpark user-defined functions ([SPARK-40281](https://issues.apache.org/jira/browse/SPARK-40281))
*   Implement PyTorch Distributor ([SPARK-41589](https://issues.apache.org/jira/browse/SPARK-41589))
*   Publish SBOM (software bill of materials) artifacts ([SPARK-41893](https://issues.apache.org/jira/browse/SPARK-41893))
*   Implement support for DEFAULT values for columns in tables ([SPARK-38334](https://issues.apache.org/jira/browse/SPARK-38334))
*   Support parameterized SQL ([SPARK-41271](https://issues.apache.org/jira/browse/SPARK-41271), [SPARK-42702](https://issues.apache.org/jira/browse/SPARK-42702))
*   Implement support for DEFAULT values for columns in tables ([SPARK-38334](https://issues.apache.org/jira/browse/SPARK-38334))
*   Add Dataset.as(StructType) ([SPARK-39625](https://issues.apache.org/jira/browse/SPARK-39625))
*   Support parameterized SQL ([SPARK-41271](https://issues.apache.org/jira/browse/SPARK-41271), [SPARK-42702](https://issues.apache.org/jira/browse/SPARK-42702))
*   Add unpivot / melt ([SPARK-38864](https://issues.apache.org/jira/browse/SPARK-38864), [SPARK-39876](https://issues.apache.org/jira/browse/SPARK-39876))
*   Support "lateral column alias references" ([SPARK-27561](https://issues.apache.org/jira/browse/SPARK-27561))
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
*   Fix the OOM error can’t be reported when AQE (adaptive query execution) on ([SPARK-42290](https://issues.apache.org/jira/browse/SPARK-42290))
*   Fix the trim logic didn't handle ASCII control characters correctly ([SPARK-44383](https://issues.apache.org/jira/browse/SPARK-44383))
*   Dataframe.joinWith outer-join should return a null value for unmatched row ([SPARK-37829](https://issues.apache.org/jira/browse/SPARK-37829))
*   Use the utils to get the switch for dynamic allocation used in local checkpoint ([SPARK-42421](https://issues.apache.org/jira/browse/SPARK-42421))
*   Add CapturedException to utils ([SPARK-42078](https://issues.apache.org/jira/browse/SPARK-42078))
*   Support SELECT DEFAULT with ORDER BY, LIMIT, OFFSET for INSERT source relation ([SPARK-43071](https://issues.apache.org/jira/browse/SPARK-43071))
*   Python client for Spark Connect ([SPARK-39375](https://issues.apache.org/jira/browse/SPARK-39375))

Read the full version of the release notes for a specific Apache Spark version by visiting both [Spark 3.4.0](https://spark.apache.org/releases/spark-release-3-4-0.html) and [Spark 3.4.1](https://spark.apache.org/releases/spark-release-3-4-1.html). 


### New custom query optimizations

#### Concurrent Writes Support in Spark

Encountering a 404 error with the message 'Operation failed: The specified path doesn't exist' is a common issue when performing parallel data insertions into the same table using an SQL INSERT INTO query. This error can result in data loss. Our new feature, the File Output Committer Algorithm, resolves this issue, allowing customers to perform parallel data insertion seamlessly.

To access this feature, enable the `spark.sql.enable.concurrentWrites` feature flag, which is enabled by default starting from Runtime 1.2 (Spark 3.4). While this feature is also available in other Spark 3 versions, it isn't enabled by default. This feature doesn't support parallel execution of INSERT OVERWRITE queries where each concurrent job overwrites data on different partitions of the same table dynamically. For this purpose, Spark offers an alternative feature, which can be activated by configuring the `spark.sql.sources.partitionOverwriteMode` setting to [dynamic](https://spark.apache.org/docs/3.4.0/configuration.html#:~:text=spark.sql.sources.partitionOverwriteMode).


#### Smart reads, which skip files from failed jobs
In the current Spark committer system, when an insert into a table job fails but some tasks succeed, the files generated by the successful tasks coexist with files from the failed job. This coexistence can cause confusion for users as it becomes challenging to distinguish between files belonging to successful and unsuccessful jobs. Moreover, when one job reads from a table while another is inserting data concurrently into the same table, the reading job might access uncommitted data. If a write job fails, the reading job could process incorrect data.

The `spark.sql.auto.cleanup.enabled` flag controls our new feature, addressing this issue. When enabled, Spark automatically skips reading files that haven't been committed when it performs `spark.read` or selects queries from a table. Files written before enabling this feature continue to be read as usual.

Here are the visible changes:
* All files now include a `tid-{jobID}` identifier in their filenames.
*  Instead of the `_success` marker typically created in the output location upon successful job completion, a new `_committed_{jobID}` marker is generated. This marker associates successful Job IDs with specific filenames. 
* We introduced a new SQL command that users can run periodically to manage storage and clean up uncommitted files. The syntax for this command is as follows:
  * To clean up a specific directory: `CLEANUP ('/path/to/dir') [RETAIN number HOURS];`
  * To clean up a specific table: `CLEANUP [db_name.]table_name [RETAIN number HOURS];`
  In this syntax, `path/to/dir` represents the location URI where cleanup is required, and `number` is a double type value representing the retention period. The default retention period is set to seven days.
* We introduced a new configuration option called `spark.sql.deleteUncommittedFilesWhileListing`, which is set to `false` by default. Enabling this option results in the automatic deletion of uncommitted files during reads, but this scenario might slow down read operations. It's recommended to manually run the cleanup command when the cluster is idle instead of enabling this flag.


## Migration guide from Runtime 1.1 to Runtime 1.2

When migrating from Runtime 1.1, powered by Apache Spark 3.3, to Runtime 1.2, powered by Apache Spark 3.4, review [the official migration guide](https://spark.apache.org/docs/3.4.0/migration-guide.html). Here are the key highlights:

#### Core
*   Since Spark 3.4, Spark driver owns `PersistentVolumnClaim`s and try to reuse if they're not assigned to live executors. To restore the behavior before Spark 3.4, you can set `spark.kubernetes.driver.ownPersistentVolumeClaim` to `false` and `spark.kubernetes.driver.reusePersistentVolumeClaim` to `false`.
*   Since Spark 3.4, Spark driver tracks shuffle data when dynamic allocation is enabled without shuffle service. To restore the behavior before Spark 3.4, you can set `spark.dynamicAllocation.shuffleTracking.enabled` to `false`.
*   Since Spark 3.4, Spark tries to decommission cached RDD (resilient distributed dataset) and shuffle blocks if both `spark.decommission.enabled` and `spark.storage.decommission.enabled` are true. To restore the behavior before Spark 3.4, you can set both `spark.storage.decommission.rddBlocks.enabled` and `spark.storage.decommission.shuffleBlocks.enabled` to `false`.
*   Since Spark 3.4, Spark uses RocksDB store if `spark.history.store.hybridStore.enabled` is true. To restore the behavior before Spark 3.4, you can set `spark.history.store.hybridStore.diskBackend` to `LEVELDB`. 
#### PySpark
*   In Spark 3.4, the schema of an array column is inferred by merging the schemas of all elements in the array. To restore the previous behavior where the schema is only inferred from the first element, you can set `spark.sql.pyspark.legacy.inferArrayTypeFromFirstElement.enabled` to `true`.
*   In Spark 3.4, when using the Pandas on Spark API `Groupby.apply`, if the return type of the `func` parameter isn't specified and `compute.shortcut_limit` is set to 0, the number of sampling rows are automatically set to 2. This adjustment ensures that there are always at least two sampling rows to maintain accurate schema inference.
*   In Spark 3.4, if Pandas on Spark API `Index.insert` is out of bounds, it raises IndexError with `index {} is out of bounds for axis 0 with size {}` to follow pandas 1.4 behavior.
*   In Spark 3.4, the series name is preserved in Pandas on Spark API `Series.mode` to align with pandas 1.4 behavior.
*   In Spark 3.4, the Pandas on Spark API `Index.__setitem__`  first checks `value` type is `Column` type to avoid raising unexpected `ValueError` in `is_list_like` like Can't convert column into bool: use ‘&’ for ‘and’, ‘|’ for ‘or’, ‘~’ for ‘not’ when building DataFrame boolean expressions..
*   In Spark 3.4, the Pandas on Spark API `astype('category')` also refreshes `categories.dtype` according to original data `dtype` to follow pandas 1.4 behavior.
*   In Spark 3.4, the Pandas on Spark API supports group by positional indexing in `GroupBy.head` and `GroupBy.tail` to follow pandas 1.4. Negative arguments now work correctly and result in ranges relative to the end and start of each group. Previously, negative arguments returned empty frames.
*   In Spark 3.4, the infer schema process of `groupby.apply` in Pandas on Spark, will first infer the pandas type to ensure the accuracy of the pandas `dtype` as much as possible.
*   In Spark 3.4, the `Series.concat` sort parameter is respected to follow pandas 1.4 behaviors.
*   In Spark 3.4, the `DataFrame.__setitem__` makes a copy and replace pre-existing arrays, which will NOT be over-written to follow pandas 1.4 behaviors.
*   In Spark 3.4, the `SparkSession.sql` and the Pandas on Spark API `sql` got the new parameter `args`, which provides binding of named parameters to their SQL literals.
*   In Spark 3.4, Pandas API on Spark follows for the pandas 2.0, and some APIs were deprecated or removed in Spark 3.4 according to the changes made in pandas 2.0.  Refer to the \[release notes of pandas\]([https://pandas.pydata.org/docs/dev/whatsnew/](https://pandas.pydata.org/docs/dev/whatsnew/)) for more details.

#### SQL, datasets and dataframe
* Since Spark 3.4, INSERT INTO commands with explicit column list comprising fewer columns than the target table automatically adds the corresponding default values for the remaining columns (or NULL for any column lacking an explicitly assigned default value). In Spark 3.3 or earlier, these commands would fail, returning errors reporting that the number of provided columns doesn't match the number of columns in the target table. Disabling `spark.sql.defaultColumn.useNullsForMissingDefaultValues` restores the previous behavior.
*   Since Spark 3.4, Number or Number(\*) from Teradata is treated as Decimal(38,18). In Spark 3.3 or earlier, Number or Number(\*) from Teradata is treated as Decimal(38, 0), in which case the fractional part is removed.
*   Since Spark 3.4, v1 database, table, permanent view and function identifier includes ‘spark\_catalog’ as the catalog name if database is defined, for example, a table identifier is: `spark_catalog.default.t`. To restore the legacy behavior, set `spark.sql.legacy.v1IdentifierNoCatalog` to `true`.
*   Since Spark 3.4, when ANSI SQL mode(configuration `spark.sql.ansi.enabled`) is on, Spark SQL always returns NULL result on getting a map value with a nonexisting key. In Spark 3.3 or earlier, there's an error.
*   Since Spark 3.4, the SQL CLI `spark-sql` doesn't print the prefix `Error in query:` before the error message of `AnalysisException`.
*   Since Spark 3.4, `split` function ignores trailing empty strings when `regex` parameter is empty.
*   Since Spark 3.4, the `to_binary` function throws error for a malformed `str` input. Use `try_to_binary` to tolerate malformed input and return NULL instead.
    *   Valid `Base64` string should include symbols from in `base64` alphabet (A-Za-z0-9+/), optional padding (`=`), and optional whitespaces. Whitespaces are skipped in conversion except when they're preceded by padding symbols. If padding is present, it should conclude the string and follow rules described in RFC 4648 § 4.
    *   Valid hexadecimal strings should include only allowed symbols (0-9A-Fa-f).
    *   Valid values for `fmt` are case-insensitive `hex`, `base64`, `utf-8`, `utf8`.
*   Since Spark 3.4, Spark throws only `PartitionsAlreadyExistException` when it creates partitions but some of them exist already. In Spark 3.3 or earlier, Spark can throw either `PartitionsAlreadyExistException` or `PartitionAlreadyExistsException`.
*   Since Spark 3.4, Spark validates for partition spec in ALTER PARTITION to follow the behavior of `spark.sql.storeAssignmentPolicy`, which can cause an exception if type conversion fails, e.g. `ALTER TABLE .. ADD PARTITION(p='a')` if column `p` is int type. To restore the legacy behavior, set `spark.sql.legacy.skipTypeValidationOnAlterPartition` to `true`.
*   Since Spark 3.4, vectorized readers are enabled by default for the nested data types (array, map, and struct). To restore the legacy behavior, set `spark.sql.orc.enableNestedColumnVectorizedReader` and `spark.sql.parquet.enableNestedColumnVectorizedReader` to `false`.
*   Since Spark 3.4, `BinaryType` isn't supported in CSV datasource. In Spark 3.3 or earlier, users can write binary columns in CSV datasource, but the output content in CSV files is `Object.toString()`, which is meaningless; meanwhile, if users read CSV tables with binary columns, Spark throws an `Unsupported type: binary` exception.
*   Since Spark 3.4, bloom filter joins are enabled by default. To restore the legacy behavior, set `spark.sql.optimizer.runtime.bloomFilter.enabled` to `false`.

#### Structured Streaming
*   Since Spark 3.4, `Trigger.Once` is deprecated, and users are encouraged to migrate from `Trigger.Once` to `Trigger.AvailableNow`. Refer [SPARK-39805](https://issues.apache.org/jira/browse/SPARK-39805) for more details.
*   Since Spark 3.4, the default value of configuration for Kafka offset fetching (`spark.sql.streaming.kafka.useDeprecatedOffsetFetching`) is changed from `true` to `false`. The default no longer relies consumer group based scheduling, which affects the required ACL. For more information, see [Structured Streaming Kafka Integration](https://spark.apache.org/docs/3.4.0/structured-streaming-kafka-integration.html#offset-fetching).
    


## New features and improvements of Delta Lake 2.4
[Delta Lake](https://delta.io/) is an [open source project](https://github.com/delta-io/delta) that enables building a lakehouse architecture on top of data lakes. Delta Lake provides [ACID transactions](https://docs.delta.io/2.4.0/concurrency-control.html), scalable metadata handling, and unifies [streaming](https://docs.delta.io/2.4.0/delta-streaming.html) and [batch](https://docs.delta.io/2.4.0/delta-batch.html) data processing on top of existing data lakes.

Specifically, Delta Lake offers:
*   [ACID transactions](https://docs.delta.io/2.4.0/concurrency-control.html) on Spark: Serializable isolation levels ensure that readers never see inconsistent data.
*   Scalable metadata handling: Uses Spark distributed processing power to handle all the metadata for petabyte-scale tables with billions of files at ease.
*   [Streaming](https://docs.delta.io/2.4.0/delta-streaming.html) and [batch](https://docs.delta.io/2.4.0/delta-batch.html) unification: A table in Delta Lake is a batch table and a streaming source and sink. Streaming data ingest, batch historic backfill, interactive queries all just work out of the box.
*   Schema enforcement: Automatically handles schema variations to prevent insertion of bad records during ingestion.
*   [Time travel](https://docs.delta.io/2.4.0/delta-batch.html#-deltatimetravel): Data versioning enables rollbacks, full historical audit trails, and reproducible machine learning experiments.
*   [Upserts](https://docs.delta.io/2.4.0/delta-update.html#-delta-merge) and [deletes](https://docs.delta.io/2.4.0/delta-update.html#-delta-delete): Supports merge, update, and delete operations to enable complex use cases like change-data-capture, slowly changing dimension (SCD) operations, streaming upserts, and so on.


### The key features in this release are as follows

*   Support for [Apache Spark 3.4](https://spark.apache.org/releases/spark-release-3-4-0.html).
*   [Support](https://github.com/delta-io/delta/issues/1591) writing [Deletion Vectors](https://github.com/delta-io/delta/blob/master/PROTOCOL.md#deletion-vectors) for the `DELETE` command. Previously, when deleting rows from a Delta table, any file with at least one matching row would be rewritten. With Deletion Vectors these expensive rewrites can be avoided. See [What are deletion vectors?](https://docs.delta.io/2.4.0/delta-deletion-vectors.html) for more details.
*   Support for all write operations on tables with Deletion Vectors enabled.
*   [Support](https://github.com/delta-io/delta/commit/9fac2e6af313b28bf9cd3961aa5dec8ea27a2e7b) `PURGE` to remove Deletion Vectors from the current version of a Delta table by rewriting any data files with deletion vectors. See the [documentation](https://docs.delta.io/2.4.0/delta-deletion-vectors.html#apply-changes-with-reorg-table) for more details.
*   [Support](https://github.com/delta-io/delta/issues/1701) reading Change Data Feed for tables with Deletion Vectors enabled.
*   [Support](https://github.com/delta-io/delta/commit/7c352e9a0bf4b348a60ca040f9179171d2db5f0d) `REPLACE WHERE` expressions in SQL to selectively overwrite data. Previously “replaceWhere” options were only supported in the DataFrameWriter APIs.
*   [Support](https://github.com/delta-io/delta/commit/c53e95c71f25e62871a3def8771be9eb5ca27a2e) `WHEN NOT MATCHED BY SOURCE` clauses in SQL for the Merge command.
*   [Support](https://github.com/delta-io/delta/commit/422a670bc6b232e451db83537dcad34a5de97b67) omitting generated columns from the column list for SQL `INSERT INTO` queries. Delta  automatically generates the values for any unspecified generated columns.
*   [Support](https://github.com/delta-io/delta/pull/1626) the `TimestampNTZ` data type added in Spark 3.3. Using `TimestampNTZ` requires a Delta protocol upgrade; see the [documentation](https://docs.delta.io/2.4.0/versioning.html) for more information.
*   [Allow](https://github.com/delta-io/delta/commit/303d640a) changing the column type of a `char` or `varchar` column to a compatible type in the `ALTER TABLE` command. The new behavior is the same as in Apache Spark and allows upcasting from `char` or `varchar` to `varchar` or `string`.
*   [Block](https://github.com/delta-io/delta/commit/579a3151db611c5049e5ca04a32fc6cccb77448b) using `overwriteSchema` with dynamic partition overwrite. This scenario can corrupt the table as not all the data can be removed, and the schema of the newly written partitions can't match the schema of the unchanged partitions.
*   [Return](https://github.com/delta-io/delta/commit/83513484) an empty `DataFrame` for Change Data Feed reads when there are no commits within the timestamp range provided. Previously an error would be thrown.
*   [Fix](https://github.com/delta-io/delta/commit/5ab678db) a bug in Change Data Feed reads for records created during the ambiguous hour when daylight savings occur.
*   [Fix](https://github.com/delta-io/delta/commit/28148976) a bug where querying an external Delta table at the root of an S3 bucket would throw an error.
*   [Remove](https://github.com/delta-io/delta/commit/81c7a58e) leaked internal Spark metadata from the Delta log to make any affected tables readable again.

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
| io.delta                               | delta-core_2.12                             | 2.4.0                       |
| io.delta                               | delta-storage                               | 2.4.0                       |
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

The following table lists all the default level packages for Python and their respective versions.

| Library                       | Version      | Library                  | Version      | Library                 | Version            |
|-------------------------------|--------------|--------------------------|--------------|-------------------------|--------------------|
| _libgcc_mutex                 | 0.1          | jupyter_client           | 8.5.0        | pycosat                 | 0.6.6              |
| _openmp_mutex                 | 4.5          | jupyter_core             | 5.4.0        | pycparser               | 2.21               |
| _py-xgboost-mutex             | 2.0          | jupyter_events           | 0.8.0        | pydantic                | 1.10.9             |
| absl-py                       | 2.0.0        | jupyter_server           | 2.7.3        | pygments                | 2.16.1             |
| adal                          | 1.2.7        | jupyter_server_terminals | 0.4.4        | pyjwt                   | 2.8.0              |
| adlfs                         | 2023.4.0     | jupyterlab_pygments      | 0.2.2        | pynacl                  | 1.5.0              |
| aiohttp                       | 3.8.6        | jupyterlab_widgets       | 3.0.9        | pyodbc                  | 4.0.39             |
| aiosignal                     | 1.3.1        | keras                    | 2.12.0       | pyopenssl               | 23.2.0             |
| alembic                       | 1.12.0       | keras-preprocessing      | 1.1.2        | pyparsing               | 3.0.9              |
| alsa-lib                      | 1.2.10       | keyutils                 | 1.6.1        | pyperclip               | 1.8.2              |
| ansi2html                     | 1.8.0        | kiwisolver               | 1.4.5        | pypika                  | 0.48.9             |
| anyio                         | 3.7.1        | krb5                     | 1.21.2       | pyqt                    | 5.15.9             |
| appdirs                       | 1.4.4        | lame                     | 3.100        | pyqt5-sip               | 12.12.2            |
| argon2-cffi                   | 23.1.0       | lcms2                    | 2.15         | pysocks                 | 1.7.1              |
| argon2-cffi-bindings          | 21.2.0       | ld_impl_linux-64         | 2.40         | python                  | 3.10.12            |
| arrow                         | 1.3.0        | lerc                     | 4.0.0        | python-dateutil         | 2.8.2              |
| asttokens                     | 2.4.0        | liac-arff                | 2.5.0        | python-fastjsonschema   | 2.18.1             |
| astunparse                    | 1.6.3        | libabseil                | 20230125.3   | python-flatbuffers      | 23.5.26            |
| async-timeout                 | 4.0.3        | libaec                   | 1.1.2        | python-graphviz         | 0.20.1             |
| atk-1.0                       | 2.38.0       | libarrow                 | 12.0.1       | python-json-logger      | 2.0.7              |
| attr                          | 2.5.1        | libbrotlicommon          | 1.0.9        | python-tzdata           | 2023.3             |
| attrs                         | 23.1.0       | libbrotlidec             | 1.0.9        | python-xxhash           | 3.4.1              |
| autopage                      | 0.5.2        | libbrotlienc             | 1.0.9        | python_abi              | 3.10               |
| aws-c-auth                    | 0.7.3        | libcap                   | 2.69         | pythonnet               | 3.0.1              |
| aws-c-cal                     | 0.6.1        | libclang                 | 15.0.7       | pytorch                 | 2.0.1              |
| aws-c-common                  | 0.9.0        | libclang13               | 15.0.7       | pytorch-mutex           | 1.0                |
| aws-c-compression             | 0.2.17       | libcrc32c                | 1.1.2        | pytz                    | 2023.3.post1       |
| aws-c-event-stream            | 0.3.1        | libcups                  | 2.3.3        | pyu2f                   | 0.1.5              |
| aws-c-http                    | 0.7.11       | libcurl                  | 8.4.0        | pywin32-on-windows      | 0.1.0              |
| aws-c-io                      | 0.13.32      | libdeflate               | 1.19         | pyyaml                  | 6.0.1              |
| aws-c-mqtt                    | 0.9.3        | libebm                   | 0.4.3        | pyzmq                   | 25.1.1             |
| aws-c-s3                      | 0.3.14       | libedit                  | 3.1.20191231 | qt-main                 | 5.15.8             |
| aws-c-sdkutils                | 0.1.12       | libev                    | 4.33         | rdma-core               | 28.9               |
| aws-checksums                 | 0.1.17       | libevent                 | 2.1.12       | re2                     | 2023.03.02         |
| aws-crt-cpp                   | 0.21.0       | libexpat                 | 2.5.0        | readline                | 8.2                |
| aws-sdk-cpp                   | 1.10.57      | libffi                   | 3.4.2        | referencing             | 0.30.2             |
| azure-core                    | 1.29.4       | libflac                  | 1.4.3        | regex                   | 2023.8.8           |
| azure-datalake-store          | 0.0.51       | libgcc-ng                | 13.2.0       | requests                | 2.31.0             |
| azure-identity                | 1.14.1       | libgcrypt                | 1.10.1       | requests-oauthlib       | 1.3.1              |
| azure-storage-blob            | 12.18.3      | libgd                    | 2.3.3        | retrying                | 1.3.3              |
| azure-storage-file-datalake   | 12.12.0      | libgfortran-ng           | 13.2.0       | rfc3339-validator       | 0.1.4              |
| backcall                      | 0.2.0        | libgfortran5             | 13.2.0       | rfc3986-validator       | 0.1.1              |
| backoff                       | 1.11.1       | libglib                  | 2.78.0       | rich                    | 13.6.0             |
| backports                     | 1.0          | libgoogle-cloud          | 2.12.0       | rpds-py                 | 0.10.6             |
| backports.functools_lru_cache | 1.6.5        | libgpg-error             | 1.47         | rsa                     | 4.9                |
| bcrypt                        | 4.0.1        | libgrpc                  | 1.54.3       | ruamel.yaml             | 0.17.32            |
| beautifulsoup4                | 4.12.2       | libhwloc                 | 2.9.3        | ruamel.yaml.clib        | 0.2.7              |
| blas                          | 1.0          | libiconv                 | 1.17         | ruamel_yaml             | 0.15.80            |
| bleach                        | 6.1.0        | libjpeg-turbo            | 2.1.5.1      | s2n                     | 1.3.49             |
| blinker                       | 1.6.3        | libllvm14                | 14.0.6       | sacremoses              | 0.0.53             |
| brotli                        | 1.0.9        | libllvm15                | 15.0.7       | salib                   | 1.4.7              |
| brotli-bin                    | 1.0.9        | libnghttp2               | 1.52.0       | scikit-learn            | 1.3.0              |
| brotli-python                 | 1.0.9        | libnsl                   | 2.0.1        | scipy                   | 1.10.1             |
| bzip2                         | 1.0.8        | libnuma                  | 2.0.16       | seaborn                 | 0.12.2             |
| c-ares                        | 1.20.1       | libogg                   | 1.3.4        | seaborn-base            | 0.12.2             |
| ca-certificates               | 2023.7.22    | libopus                  | 1.3.1        | send2trash              | 1.8.2              |
| cached-property               | 1.5.2        | libpng                   | 1.6.39       | sentence-transformers   | 2.0.0              |
| cached_property               | 1.5.2        | libpq                    | 15.4         | sentry-sdk              | 1.32.0             |
| cachetools                    | 5.3.2        | libprotobuf              | 3.21.12      | seqeval                 | 1.2.2              |
| cairo                         | 1.18.0       | libpulsar                | 3.2.0        | setproctitle            | 1.3.3              |
| catboost                      | 1.1.1        | librsvg                  | 2.56.3       | setuptools              | 68.2.2             |
| certifi                       | 2023.7.22    | libsndfile               | 1.2.2        | shap                    | 0.42.1             |
| cffi                          | 1.16.0       | libsodium                | 1.0.18       | shellingham             | 1.5.4              |
| charset-normalizer            | 3.3.1        | libsqlite                | 3.43.2       | sip                     | 6.7.12             |
| chroma-hnswlib                | 0.7.3        | libssh2                  | 1.11.0       | six                     | 1.16.0             |
| chromadb                      | 0.4.13       | libstdcxx-ng             | 13.2.0       | slicer                  | 0.0.7              |
| click                         | 8.1.7        | libsystemd0              | 254          | smmap                   | 5.0.0              |
| cliff                         | 4.2.0        | libthrift                | 0.18.1       | snappy                  | 1.1.10             |
| cloudpickle                   | 2.2.1        | libtiff                  | 4.6.0        | sniffio                 | 1.3.0              |
| clr_loader                    | 0.2.6        | libtool                  | 2.4.7        | soupsieve               | 2.5                |
| cmaes                         | 0.10.0       | libutf8proc              | 2.8.0        | sqlalchemy              | 2.0.22             |
| cmd2                          | 2.4.3        | libuuid                  | 2.38.1       | sqlparse                | 0.4.4              |
| colorama                      | 0.4.6        | libuv                    | 1.46.0       | stack_data              | 0.6.2              |
| coloredlogs                   | 15.0.1       | libvorbis                | 1.3.7        | starlette               | 0.27.0             |
| colorlog                      | 6.7.0        | libwebp                  | 1.3.2        | statsmodels             | 0.14.0             |
| comm                          | 0.1.4        | libwebp-base             | 1.3.2        | stevedore               | 5.1.0              |
| conda-package-handling        | 2.2.0        | libxcb                   | 1.15         | sympy                   | 1.12               |
| conda-package-streaming       | 0.9.0        | libxgboost               | 1.7.6        | tabulate                | 0.9.0              |
| configparser                  | 5.3.0        | libxkbcommon             | 1.6.0        | tbb                     | 2021.10.0          |
| contourpy                     | 1.1.1        | libxml2                  | 2.11.5       | tenacity                | 8.2.3              |
| cryptography                  | 41.0.5       | libxslt                  | 1.1.37       | tensorboard             | 2.12.3             |
| cycler                        | 0.12.1       | libzlib                  | 1.2.13       | tensorboard-data-server | 0.7.0              |
| cython                        | 3.0.4        | lightgbm                 | 4.0.0        | tensorflow              | 2.12.1             |
| dash                          | 2.14.0       | lime                     | 0.2.0.1      | tensorflow-base         | 2.12.1             |
| dash-core-components          | 2.0.0        | llvm-openmp              | 17.0.3       | tensorflow-estimator    | 2.12.1             |
| dash-html-components          | 2.0.0        | llvmlite                 | 0.40.1       | termcolor               | 2.3.0              |
| dash-table                    | 5.0.0        | lxml                     | 4.9.3        | terminado               | 0.17.1             |
| dash_cytoscape                | 0.2.0        | lz4-c                    | 1.9.4        | threadpoolctl           | 3.2.0              |
| databricks-cli                | 0.18.0       | mako                     | 1.2.4        | tiktoken                | 0.5.1              |
| dataclasses                   | 0.8          | markdown                 | 3.4.4        | tinycss2                | 1.2.1              |
| datasets                      | 2.14.6       | markdown-it-py           | 3.0.0        | tk                      | 8.6.13             |
| dbus                          | 1.13.6       | markupsafe               | 2.1.3        | tokenizers              | 0.13.3             |
| debugpy                       | 1.8.0        | matplotlib               | 3.7.2        | toml                    | 0.10.2             |
| decorator                     | 5.1.1        | matplotlib-base          | 3.7.2        | tomli                   | 2.0.1              |
| defusedxml                    | 0.7.1        | matplotlib-inline        | 0.1.6        | toolz                   | 0.12.0             |
| dill                          | 0.3.7        | mdurl                    | 0.1.0        | tornado                 | 6.3.3              |
| diskcache                     | 5.6.3        | mistune                  | 3.0.1        | tqdm                    | 4.66.1             |
| distlib                       | 0.3.7        | mkl                      | 2021.4.0     | traitlets               | 5.12.0             |
| docker-py                     | 6.1.3        | mkl-service              | 2.4.0        | transformers            | 4.26.0             |
| docker-pycreds                | 0.4.0        | mkl_fft                  | 1.3.1        | treeinterpreter         | 0.2.2              |
| entrypoints                   | 0.4          | mkl_random               | 1.2.2        | typed-ast               | 1.5.5              |
| et_xmlfile                    | 1.1.0        | ml_dtypes                | 0.3.1        | typer                   | 0.9.0              |
| exceptiongroup                | 1.1.3        | mlflow-skinny            | 2.6.0        | types-python-dateutil   | 2.8.19.14          |
| executing                     | 1.2.0        | monotonic                | 1.5          | types-pytz              | 2023.3.1.1         |
| expat                         | 2.5.0        | mpc                      | 1.3.1        | typing_extensions       | 4.5.0              |
| fastapi                       | 0.103.2      | mpfr                     | 4.2.1        | typing_utils            | 0.1.0              |
| flaml                         | 2.1.1dev2    | mpg123                   | 1.32.3       | tzdata                  | 2023c              |
| flask                         | 3.0.0        | mpmath                   | 1.3.0        | ucx                     | 1.14.1             |
| flatbuffers                   | 23.5.26      | msal                     | 1.24.1       | unicodedata2            | 15.1.0             |
| font-ttf-dejavu-sans-mono     | 2.37         | msal_extensions          | 1.0.0        | unixodbc                | 2.3.12             |
| font-ttf-inconsolata          | 3.000        | multidict                | 6.0.4        | uri-template            | 1.3.0              |
| font-ttf-source-code-pro      | 2.038        | multiprocess             | 0.70.15      | urllib3                 | 1.26.17            |
| font-ttf-ubuntu               | 0.83         | munkres                  | 1.1.4        | uvicorn                 | 0.23.2             |
| fontconfig                    | 2.14.2       | mysql-common             | 8.0.33       | virtualenv              | 20.23.1            |
| fonts-conda-ecosystem         | 1            | mysql-libs               | 8.0.33       | wandb                   | 0.15.12            |
| fonts-conda-forge             | 1            | nbclient                 | 0.8.0        | wcwidth                 | 0.2.8              |
| fonttools                     | 4.43.1       | nbconvert-core           | 7.9.2        | webcolors               | 1.13               |
| fqdn                          | 1.5.1        | nbformat                 | 5.9.2        | webencodings            | 0.5.1              |
| freetype                      | 2.12.1       | ncurses                  | 6.4          | websocket-client        | 1.6.4              |
| fribidi                       | 1.0.10       | nest-asyncio             | 1.5.8        | werkzeug                | 3.0.1              |
| frozenlist                    | 1.4.0        | networkx                 | 3.2          | wheel                   | 0.41.2             |
| fsspec                        | 2023.10.0    | nltk                     | 3.8.1        | widgetsnbextension      | 4.0.9              |
| gast                          | 0.4.0        | nspr                     | 4.35         | wrapt                   | 1.15.0             |
| gdk-pixbuf                    | 2.42.10      | nss                      | 3.94         | xcb-util                | 0.4.0              |
| geographiclib                 | 1.52         | numba                    | 0.57.1       | xcb-util-image          | 0.4.0              |
| geopy                         | 2.3.0        | numpy                    | 1.24.3       | xcb-util-keysyms        | 0.4.0              |
| gettext                       | 0.21.1       | numpy-base               | 1.24.3       | xcb-util-renderutil     | 0.3.9              |
| gevent                        | 23.9.0.post1 | oauthlib                 | 3.2.2        | xcb-util-wm             | 0.4.1              |
| gflags                        | 2.2.2        | onnxruntime              | 1.16.1       | xgboost                 | 1.7.6              |
| giflib                        | 5.2.1        | openai                   | 0.27.8       | xkeyboard-config        | 2.40               |
| gitdb                         | 4.0.11       | openjpeg                 | 2.5.0        | xorg-kbproto            | 1.0.7              |
| gitpython                     | 3.1.40       | openpyxl                 | 3.1.2        | xorg-libice             | 1.1.1              |
| glib                          | 2.78.0       | openssl                  | 3.1.4        | xorg-libsm              | 1.2.4              |
| glib-tools                    | 2.78.0       | opt-einsum               | 3.3.0        | xorg-libx11             | 1.8.7              |
| glog                          | 0.6.0        | opt_einsum               | 3.3.0        | xorg-libxau             | 1.0.11             |
| gmp                           | 6.2.1        | optuna                   | 2.8.0        | xorg-libxdmcp           | 1.1.3              |
| gmpy2                         | 2.1.2        | orc                      | 1.9.0        | xorg-libxext            | 1.3.4              |
| google-auth                   | 2.23.3       | overrides                | 7.4.0        | xorg-libxrender         | 0.9.11             |
| google-auth-oauthlib          | 1.0.0        | packaging                | 23.2         | xorg-renderproto        | 0.11.1             |
| google-pasta                  | 0.2.0        | pandas                   | 2.0.3        | xorg-xextproto          | 7.3.0              |
| graphite2                     | 1.3.13       | pandas-stubs             | 2.1.1.230928 | xorg-xf86vidmodeproto   | 2.3.1              |
| graphviz                      | 8.1.0        | pandasql                 | 0.7.3        | xorg-xproto             | 7.0.31             |
| greenlet                      | 3.0.1        | pandocfilters            | 1.5.0        | xxhash                  | 0.8.2              |
| grpcio                        | 1.54.3       | pango                    | 1.50.14      | xz                      | 5.2.6              |
| gst-plugins-base              | 1.22.6       | paramiko                 | 3.3.1        | yaml                    | 0.2.5              |
| gstreamer                     | 1.22.6       | parso                    | 0.8.3        | yarl                    | 1.9.2              |
| gtk2                          | 2.24.33      | pathos                   | 0.3.1        | zeromq                  | 4.3.5              |
| gts                           | 0.7.6        | pathtools                | 0.1.2        | zipp                    | 3.17.0             |
| h11                           | 0.14.0       | patsy                    | 0.5.3        | zlib                    | 1.2.13             |
| h5py                          | 3.10.0       | pbr                      | 5.11.1       | zope.event              | 5.0                |
| harfbuzz                      | 8.2.1        | pcre2                    | 10.40        | zope.interface          | 6.1                |
| hdf5                          | 1.14.2       | pexpect                  | 4.8.0        | zstandard               | 0.21.0             |
| holidays                      | 0.35         | pickleshare              | 0.7.5        | zstd                    | 1.5.5              |
| html5lib                      | 1.1          | pillow                   | 10.0.1       | astor                   | 0.8.1              |
| huggingface_hub               | 0.18.0       | pip                      | 23.1.2       | contextlib2             | 21.6.0             |
| humanfriendly                 | 10.0         | pixman                   | 0.42.2       | filelock                | 3.11.0             |
| icu                           | 73.2         | pkgutil-resolve-name     | 1.3.10       | fluent-logger           | 0.10.0             |
| idna                          | 3.4          | platformdirs             | 3.5.1        | gson                    | 0.0.3              |
| imageio                       | 2.31.1       | plotly                   | 5.16.1       | jaraco-context          | 4.3.0              |
| importlib-metadata            | 6.8.0        | ply                      | 3.11         | joblibspark             | 0.5.2              |
| importlib-resources           | 6.1.0        | pooch                    | 1.8.0        | json-tricks             | 3.17.3             |
| importlib_metadata            | 6.8.0        | portalocker              | 2.8.2        | jupyter-ui-poll         | 0.2.2              |
| importlib_resources           | 6.1.0        | posthog                  | 3.0.2        | more-itertools          | 10.1.0             |
| intel-openmp                  | 2021.4.0     | pox                      | 0.3.3        | msgpack                 | 1.0.7              |
| interpret                     | 0.4.3        | ppft                     | 1.7.6.7      | mypy                    | 1.4.1              |
| interpret-core                | 0.4.3        | prettytable              | 3.8.0        | mypy-extensions         | 1.0.0              |
| ipykernel                     | 6.26.0       | prometheus_client        | 0.17.1       | nni                     | 2.10.1             |
| ipython                       | 8.14.0       | prompt-toolkit           | 3.0.39       | powerbiclient           | 3.1.1              |
| ipywidgets                    | 8.0.7        | prompt_toolkit           | 3.0.39       | pyspark                 | 3.4.1.5.3.20230713 |
| isodate                       | 0.6.1        | protobuf                 | 4.21.12      | pythonwebhdfs           | 0.2.3              |
| isoduration                   | 20.11.0      | psutil                   | 5.9.5        | responses               | 0.23.3             |
| itsdangerous                  | 2.1.2        | pthread-stubs            | 0.4          | rouge-score             | 0.1.2              |
| jax                           | 0.4.17       | ptyprocess               | 0.7.0        | schema                  | 0.7.5              |
| jaxlib                        | 0.4.14       | pulsar-client            | 3.3.0        | simplejson              | 3.19.2             |
| jedi                          | 0.19.1       | pulseaudio-client        | 16.1         | synapseml-mlflow        | 1.0.22.post2       |
| jinja2                        | 3.1.2        | pure_eval                | 0.2.2        | synapseml-utils         | 1.0.18.post1       |
| joblib                        | 1.3.2        | py-xgboost               | 1.7.6        | typeguard               | 2.13.3             |
| jsonpointer                   | 2.4          | py4j                     | 0.10.9.7     | types-pyyaml            | 6.0.12.12          |
| jsonschema                    | 4.19.1       | pyarrow                  | 12.0.1       | typing-extensions       | 4.8.0              |
| jsonschema-specifications     | 2023.7.1     | pyasn1                   | 0.5.0        | websockets              | 12.0               |
| jsonschema-with-format-nongpl | 4.19.1       | pyasn1-modules           | 0.3.0        | wolframalpha            | 5.0.0              |
|                               |              |                          |              | xmltodict               | 0.13.0             |

## Default-level packages for R

The following table lists all the default level packages for R and their respective versions.

| Library                   | Version      | Library         | Version    | Library          | Version    |
|---------------------------|--------------|-----------------|------------|------------------|------------|
| _libgcc_mutex             | 0.1          | r-caret         | 6.0_94     | r-praise         | 1.0.0      |
| _openmp_mutex             | 4.5          | r-cellranger    | 1.1.0      | r-prettyunits    | 1.2.0      |
| _r-mutex                  | 1.0.1        | r-class         | 7.3_22     | r-proc           | 1.18.4     |
| _r-xgboost-mutex          | 2.0          | r-cli           | 3.6.1      | r-processx       | 3.8.2      |
| aws-c-auth                | 0.7.0        | r-clipr         | 0.8.0      | r-prodlim        | 2023.08.28 |
| aws-c-cal                 | 0.6.0        | r-clock         | 0.7.0      | r-profvis        | 0.3.8      |
| aws-c-common              | 0.8.23       | r-codetools     | 0.2_19     | r-progress       | 1.2.2      |
| aws-c-compression         | 0.2.17       | r-collections   | 0.3.7      | r-progressr      | 0.14.0     |
| aws-c-event-stream        | 0.3.1        | r-colorspace    | 2.1_0      | r-promises       | 1.2.1      |
| aws-c-http                | 0.7.10       | r-commonmark    | 1.9.0      | r-proxy          | 0.4_27     |
| aws-c-io                  | 0.13.27      | r-config        | 0.3.2      | r-pryr           | 0.1.6      |
| aws-c-mqtt                | 0.8.13       | r-conflicted    | 1.2.0      | r-ps             | 1.7.5      |
| aws-c-s3                  | 0.3.12       | r-coro          | 1.0.3      | r-purrr          | 1.0.2      |
| aws-c-sdkutils            | 0.1.11       | r-cpp11         | 0.4.6      | r-quantmod       | 0.4.25     |
| aws-checksums             | 0.1.16       | r-crayon        | 1.5.2      | r-r2d3           | 0.2.6      |
| aws-crt-cpp               | 0.20.2       | r-credentials   | 2.0.1      | r-r6             | 2.5.1      |
| aws-sdk-cpp               | 1.10.57      | r-crosstalk     | 1.2.0      | r-r6p            | 0.3.0      |
| binutils_impl_linux-64    | 2.40         | r-crul          | 1.4.0      | r-ragg           | 1.2.6      |
| bwidget                   | 1.9.14       | r-curl          | 5.1.0      | r-rappdirs       | 0.3.3      |
| bzip2                     | 1.0.8        | r-data.table    | 1.14.8     | r-rbokeh         | 0.5.2      |
| c-ares                    | 1.20.1       | r-dbi           | 1.1.3      | r-rcmdcheck      | 1.4.0      |
| ca-certificates           | 2023.7.22    | r-dbplyr        | 2.3.4      | r-rcolorbrewer   | 1.1_3      |
| cairo                     | 1.18.0       | r-desc          | 1.4.2      | r-rcpp           | 1.0.11     |
| cmake                     | 3.27.6       | r-devtools      | 2.4.5      | r-reactable      | 0.4.4      |
| curl                      | 8.4.0        | r-diagram       | 1.6.5      | r-reactr         | 0.5.0      |
| expat                     | 2.5.0        | r-dials         | 1.2.0      | r-readr          | 2.1.4      |
| font-ttf-dejavu-sans-mono | 2.37         | r-dicedesign    | 1.9        | r-readxl         | 1.4.3      |
| font-ttf-inconsolata      | 3.000        | r-diffobj       | 0.3.5      | r-recipes        | 1.0.8      |
| font-ttf-source-code-pro  | 2.038        | r-digest        | 0.6.33     | r-rematch        | 2.0.0      |
| font-ttf-ubuntu           | 0.83         | r-downlit       | 0.4.3      | r-rematch2       | 2.1.2      |
| fontconfig                | 2.14.2       | r-dplyr         | 1.1.3      | r-remotes        | 2.4.2.1    |
| fonts-conda-ecosystem     | 1            | r-dtplyr        | 1.3.1      | r-reprex         | 2.0.2      |
| fonts-conda-forge         | 1            | r-e1071         | 1.7_13     | r-reshape2       | 1.4.4      |
| freetype                  | 2.12.1       | r-ellipsis      | 0.3.2      | r-rjson          | 0.2.21     |
| fribidi                   | 1.0.10       | r-evaluate      | 0.23       | r-rlang          | 1.1.1      |
| gcc_impl_linux-64         | 13.2.0       | r-fansi         | 1.0.5      | r-rlist          | 0.4.6.2    |
| gettext                   | 0.21.1       | r-farver        | 2.1.1      | r-rmarkdown      | 2.22       |
| gflags                    | 2.2.2        | r-fastmap       | 1.1.1      | r-rodbc          | 1.3_20     |
| gfortran_impl_linux-64    | 13.2.0       | r-fontawesome   | 0.5.2      | r-roxygen2       | 7.2.3      |
| glog                      | 0.6.0        | r-forcats       | 1.0.0      | r-rpart          | 4.1.21     |
| glpk                      | 5.0          | r-foreach       | 1.5.2      | r-rprojroot      | 2.0.3      |
| gmp                       | 6.2.1        | r-forge         | 0.2.0      | r-rsample        | 1.2.0      |
| graphite2                 | 1.3.13       | r-fs            | 1.6.3      | r-rstudioapi     | 0.15.0     |
| gsl                       | 2.7          | r-furrr         | 0.3.1      | r-rversions      | 2.1.2      |
| gxx_impl_linux-64         | 13.2.0       | r-future        | 1.33.0     | r-rvest          | 1.0.3      |
| harfbuzz                  | 8.2.1        | r-future.apply  | 1.11.0     | r-sass           | 0.4.7      |
| icu                       | 73.2         | r-gargle        | 1.5.2      | r-scales         | 1.2.1      |
| kernel-headers_linux-64   | 2.6.32       | r-generics      | 0.1.3      | r-selectr        | 0.4_2      |
| keyutils                  | 1.6.1        | r-gert          | 2.0.0      | r-sessioninfo    | 1.2.2      |
| krb5                      | 1.21.2       | r-ggplot2       | 3.4.2      | r-shape          | 1.4.6      |
| ld_impl_linux-64          | 2.40         | r-gh            | 1.4.0      | r-shiny          | 1.7.5.1    |
| lerc                      | 4.0.0        | r-gistr         | 0.9.0      | r-slider         | 0.3.1      |
| libabseil                 | 20230125.3   | r-gitcreds      | 0.1.2      | r-sourcetools    | 0.1.7_1    |
| libarrow                  | 12.0.0       | r-globals       | 0.16.2     | r-sparklyr       | 1.8.2      |
| libblas                   | 3.9.0        | r-glue          | 1.6.2      | r-squarem        | 2021.1     |
| libbrotlicommon           | 1.0.9        | r-googledrive   | 2.1.1      | r-stringi        | 1.7.12     |
| libbrotlidec              | 1.0.9        | r-googlesheets4 | 1.1.1      | r-stringr        | 1.5.0      |
| libbrotlienc              | 1.0.9        | r-gower         | 1.0.1      | r-survival       | 3.5_7      |
| libcblas                  | 3.9.0        | r-gpfit         | 1.0_8      | r-sys            | 3.4.2      |
| libcrc32c                 | 1.1.2        | r-gt            | 0.9.0      | r-systemfonts    | 1.0.5      |
| libcurl                   | 8.4.0        | r-gtable        | 0.3.4      | r-testthat       | 3.2.0      |
| libdeflate                | 1.19         | r-gtsummary     | 1.7.2      | r-textshaping    | 0.3.7      |
| libedit                   | 3.1.20191231 | r-hardhat       | 1.3.0      | r-tibble         | 3.2.1      |
| libev                     | 4.33         | r-haven         | 2.5.3      | r-tidymodels     | 1.1.0      |
| libevent                  | 2.1.12       | r-hexbin        | 1.28.3     | r-tidyr          | 1.3.0      |
| libexpat                  | 2.5.0        | r-highcharter   | 0.9.4      | r-tidyselect     | 1.2.0      |
| libffi                    | 3.4.2        | r-highr         | 0.10       | r-tidyverse      | 2.0.0      |
| libgcc-devel_linux-64     | 13.2.0       | r-hms           | 1.1.3      | r-timechange     | 0.2.0      |
| libgcc-ng                 | 13.2.0       | r-htmltools     | 0.5.6.1    | r-timedate       | 4022.108   |
| libgfortran-ng            | 13.2.0       | r-htmlwidgets   | 1.6.2      | r-tinytex        | 0.48       |
| libgfortran5              | 13.2.0       | r-httpcode      | 0.3.0      | r-torch          | 0.11.0     |
| libgit2                   | 1.7.1        | r-httpuv        | 1.6.12     | r-triebeard      | 0.4.1      |
| libglib                   | 2.78.0       | r-httr          | 1.4.7      | r-ttr            | 0.24.3     |
| libgomp                   | 13.2.0       | r-httr2         | 0.2.3      | r-tune           | 1.1.2      |
| libgoogle-cloud           | 2.12.0       | r-ids           | 1.0.1      | r-tzdb           | 0.4.0      |
| libgrpc                   | 1.55.1       | r-igraph        | 1.5.1      | r-urlchecker     | 1.0.1      |
| libiconv                  | 1.17         | r-infer         | 1.0.5      | r-urltools       | 1.7.3      |
| libjpeg-turbo             | 3.0.0        | r-ini           | 0.3.1      | r-usethis        | 2.2.2      |
| liblapack                 | 3.9.0        | r-ipred         | 0.9_14     | r-utf8           | 1.2.4      |
| libnghttp2                | 1.55.1       | r-isoband       | 0.2.7      | r-uuid           | 1.1_1      |
| libnuma                   | 2.0.16       | r-iterators     | 1.0.14     | r-v8             | 4.4.0      |
| libopenblas               | 0.3.24       | r-jose          | 1.2.0      | r-vctrs          | 0.6.4      |
| libpng                    | 1.6.39       | r-jquerylib     | 0.1.4      | r-viridislite    | 0.4.2      |
| libprotobuf               | 4.23.2       | r-jsonlite      | 1.8.7      | r-vroom          | 1.6.4      |
| libsanitizer              | 13.2.0       | r-juicyjuice    | 0.1.0      | r-waldo          | 0.5.1      |
| libssh2                   | 1.11.0       | r-kernsmooth    | 2.23_22    | r-warp           | 0.2.0      |
| libstdcxx-devel_linux-64  | 13.2.0       | r-knitr         | 1.45       | r-whisker        | 0.4.1      |
| libstdcxx-ng              | 13.2.0       | r-labeling      | 0.4.3      | r-withr          | 2.5.2      |
| libthrift                 | 0.18.1       | r-labelled      | 2.12.0     | r-workflows      | 1.1.3      |
| libtiff                   | 4.6.0        | r-later         | 1.3.1      | r-workflowsets   | 1.0.1      |
| libutf8proc               | 2.8.0        | r-lattice       | 0.22_5     | r-xfun           | 0.41       |
| libuuid                   | 2.38.1       | r-lava          | 1.7.2.1    | r-xgboost        | 1.7.4      |
| libuv                     | 1.46.0       | r-lazyeval      | 0.2.2      | r-xml            | 3.99_0.14  |
| libv8                     | 8.9.83       | r-lhs           | 1.1.6      | r-xml2           | 1.3.5      |
| libwebp-base              | 1.3.2        | r-lifecycle     | 1.0.3      | r-xopen          | 1.0.0      |
| libxcb                    | 1.15         | r-lightgbm      | 3.3.5      | r-xtable         | 1.8_4      |
| libxgboost                | 1.7.4        | r-listenv       | 0.9.0      | r-xts            | 0.13.1     |
| libxml2                   | 2.11.5       | r-lobstr        | 1.1.2      | r-yaml           | 2.3.7      |
| libzlib                   | 1.2.13       | r-lubridate     | 1.9.3      | r-yardstick      | 1.2.0      |
| lz4-c                     | 1.9.4        | r-magrittr      | 2.0.3      | r-zip            | 2.3.0      |
| make                      | 4.3          | r-maps          | 3.4.1      | r-zoo            | 1.8_12     |
| ncurses                   | 6.4          | r-markdown      | 1.11       | rdma-core        | 28.9       |
| openssl                   | 3.1.4        | r-mass          | 7.3_60     | re2              | 2023.03.02 |
| orc                       | 1.8.4        | r-matrix        | 1.6_1.1    | readline         | 8.2        |
| pandoc                    | 2.19.2       | r-memoise       | 2.0.1      | rhash            | 1.4.4      |
| pango                     | 1.50.14      | r-mgcv          | 1.9_0      | s2n              | 1.3.46     |
| pcre2                     | 10.40        | r-mime          | 0.12       | sed              | 4.8        |
| pixman                    | 0.42.2       | r-miniui        | 0.1.1.1    | snappy           | 1.1.10     |
| pthread-stubs             | 0.4          | r-modeldata     | 1.2.0      | sysroot_linux-64 | 2.12       |
| r-arrow                   | 12.0.0       | r-modelenv      | 0.1.1      | tk               | 8.6.13     |
| r-askpass                 | 1.2.0        | r-modelmetrics  | 1.2.2.2    | tktable          | 2.10       |
| r-assertthat              | 0.2.1        | r-modelr        | 0.1.11     | ucx              | 1.14.1     |
| r-backports               | 1.4.1        | r-munsell       | 0.5.0      | unixodbc         | 2.3.12     |
| r-base                    | 4.2.3        | r-nlme          | 3.1_163    | xorg-kbproto     | 1.0.7      |
| r-base64enc               | 0.1_3        | r-nnet          | 7.3_19     | xorg-libice      | 1.1.1      |
| r-bigd                    | 0.2.0        | r-numderiv      | 2016.8_1.1 | xorg-libsm       | 1.2.4      |
| r-bit                     | 4.0.5        | r-openssl       | 2.1.1      | xorg-libx11      | 1.8.7      |
| r-bit64                   | 4.0.5        | r-parallelly    | 1.36.0     | xorg-libxau      | 1.0.11     |
| r-bitops                  | 1.0_7        | r-parsnip       | 1.1.1      | xorg-libxdmcp    | 1.1.3      |
| r-blob                    | 1.2.4        | r-patchwork     | 1.1.3      | xorg-libxext     | 1.3.4      |
| r-brew                    | 1.0_8        | r-pillar        | 1.9.0      | xorg-libxrender  | 0.9.11     |
| r-brio                    | 1.1.3        | r-pkgbuild      | 1.4.2      | xorg-libxt       | 1.3.0      |
| r-broom                   | 1.0.5        | r-pkgconfig     | 2.0.3      | xorg-renderproto | 0.11.1     |
| r-broom.helpers           | 1.14.0       | r-pkgdown       | 2.0.7      | xorg-xextproto   | 7.3.0      |
| r-bslib                   | 0.5.1        | r-pkgload       | 1.3.3      | xorg-xproto      | 7.0.31     |
| r-cachem                  | 1.0.8        | r-plotly        | 4.10.2     | xz               | 5.2.6      |
| r-callr                   | 3.7.3        | r-plyr          | 1.8.9      | zlib             | 1.2.13     |
|                           |              |                 |            | zstd             | 1.5.5      |

## Related content

- Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
