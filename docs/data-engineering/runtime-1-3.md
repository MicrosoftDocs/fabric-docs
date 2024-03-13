---
title: Runtime 1.3 in Fabric
description: Gain a deep understanding of the Apache Spark-based Runtime 1.3 available in Fabric. By learning about unique features, capabilities, and best practices, you can confidently choose Fabric and implement your data-related solutions.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
  - ignite-2023
ms.date: 03/15/2024
---

# Fabric Runtime 1.3

Fabric Runtime offers a seamless integration with Azure, providing a sophisticated environment for both data engineering and data science projects leveraging Apache Spark. This documentation provides an overview of the essential features and components of Fabric Runtime 1.3, the newest edition of the runtime for big data computations.

Fabric Runtime 1.3, incorporates a variety of components and updates designed to enhance your data processing capabilities:
- Apache Spark 3.5
- Operating System: Mariner 2.0
- Java: 11
- Scala: 2.12.17
- Python: 3.10
- Delta Lake: 3.0.0 (OSS version)

> [!NOTE]
> Fabric Runtime 1.3 is currently in an experimental public preview phase. [Review all associated limitations and notes](./runtime-1-3.md#limitations).

To integrate Runtime 1.3 into your workspace and leverage its new features, follow the instructions below:
1. Navigate to the `Workspace settings` tab within your Fabric workspace.
2. Go to `Data Engineering/Science` and select `Spark Settings`.
3. Click on the `Environment` tab. 
4. In the `Runtime Versions` dropdown, see available runtimes.
5. Select `1.3 Experimental (Spark 3.5, Delta 3.0 (OSS)` and save your changes. This action will set Runtime 1.3 as the default runtime for your workspace.

:::image type="content" source="media\mrs\runtime13.png" alt-text="Screenshot showing where to select runtime version." lightbox="media\mrs\runtime13.png":::

By following these straightforward steps, you can efficiently adopt and start experimenting with the newest improvements and functionalities introduced in Fabric Runtime 1.3 (Spark 3.5 and Delta Lake 3.0).

> [!IMPORTANT]
> The startup time for Spark 3.5 sessions is currently estimated between 2-5 minutes. Efforts are underway to integrate Spark 3.5 runtime into the starter pools for a reduced startup time, aiming for around 10 seconds.

## Experimental Public Preview

The experimental stage for Fabric Runtime 1.3 is designed to provide customers with early access to the newest features and APIs for Apache Spark, particularly with the introduction of Spark 3.5 as a Long-Term Support (LTS) version ahead of the major updates expected in Spark 4.0. This approach ensures that users can immediately leverage the latest Spark-based runtime enhancements as they are released, facilitating a seamless transition and preparation for future technological shifts, such as the upgrade to Scala 2.13. Our aim with this experimental phase is to align closely with our users' evolving needs and development timelines, enhancing their data engineering and science projects with cutting-edge, stable, and integrated solutions directly within the Azure ecosystem.

### Limitations
Fabric Runtime 1.3 is currently in an experimental public preview stage, designed for users to explore and experiment with the latest features and APIs from Spark and Delta Lake. While this version offers access to core functionalities, there are certain limitations to note:
* Users can engage with Spark 3.5 sessions, author code directly in notebooks, schedule Spark job definitions, and work with PySpark, Scala, and Spark SQL. R is not available in this version.
* You can install libraries directly within your code and set Spark settings via the %%configure options in notebooks and Spark Job Definitions (SJDs).
* Reading and writing to the Lakehouse with Delta 3.0 OSS is supported, except some advanced functionalities like V-order, native Parquet writing, auto-compaction, optimize write, and low-shuffle merge, merge, schema evolution, or time travel which are not available in this early release. 
* While there is a temporary limitation with using relative paths for accessing data from the Lakehouse, absolute paths can be used as a reliable alternative.
* Note that the Spark Advisor is currently unavailable; however, monitoring tools such as Spark UI and logs remain operational.
* Features such as Data Science integrations and connectors (including Kusto, SQL Analytics, CosmosDB, and MySQL Java Connector) are expected to be fully integrated in the upcoming full scope of the Public Preview. 
* Users interested in testing Runtime 1.3 can do so at the workspace level. Integration with Environment artifact will be fully added in the upcoming Public Preview release. 
* Data Science libraries are not supported in PySpark environments. Users can only employ PySpark with a basic Conda setup, which includes PySpark without additional libraries. CoPilot features are not operational in the experimental stage.


> [!TIP]
> We welcome your feedback on Fabric Runtime via our platform at [https://ideas.fabric.microsoft.com/](https://ideas.fabric.microsoft.com/). Please include details about the specific runtime version and release stage. We prioritize enhancements based on community votes, ensuring that changes reflect user needs and preferences. Your input is essential in shaping the future of Fabric Runtime.

## Key Spark 3.5 highlights
[Apache Spark 3.5.0](https://spark.apache.org/releases/spark-release-3-5-0.html) marks the sixth version in the 3.x series. This version is a product of extensive collaboration within the open-source community, addressing more than 1,300 issues as recorded in Jira.

In this version, there's an upgrade in compatibility for Structured Streaming. Additionally, this release broadens the functionality within PySpark and SQL, adding features such as the SQL IDENTIFIER clause, named arguments in SQL function calls, and the inclusion of SQL functions for HyperLogLog approximate aggregations. New capabilities also include Python user-defined table functions, the simplification of distributed training via DeepSpeed, and new Structured Streaming capabilities like watermark propagation and the dropDuplicatesWithinWatermark operation.

### Highlights
*   Introduce Arrow Python UDFs [SPARK-40307](https://issues.apache.org/jira/browse/SPARK-40307)
*   Support Python user-defined table functions [SPARK-43798](https://issues.apache.org/jira/browse/SPARK-43798)
*   Migrate PySpark errors onto error classes [SPARK-42986](https://issues.apache.org/jira/browse/SPARK-42986)
*   PySpark Test Framework [SPARK-44042](https://issues.apache.org/jira/browse/SPARK-44042)
*   Add support for Datasketches HllSketch [SPARK-16484](https://issues.apache.org/jira/browse/SPARK-16484)
*   Built-in SQL Function Improvement [SPARK-41231](https://issues.apache.org/jira/browse/SPARK-41231)
*   IDENTIFIER clause [SPARK-43205](https://issues.apache.org/jira/browse/SPARK-43205)
*   Add SQL functions into Scala, Python and R API [SPARK-43907](https://issues.apache.org/jira/browse/SPARK-43907)
*   Add named argument support for SQL functions [SPARK-43922](https://issues.apache.org/jira/browse/SPARK-43922)
*   Avoid unnecessary task rerun on decommissioned executor lost if shuffle data migrated [SPARK-41469](https://issues.apache.org/jira/browse/SPARK-41469)
*   Distributed ML <> spark connect [SPARK-42471](https://issues.apache.org/jira/browse/SPARK-42471)
*   DeepSpeed Distributor [SPARK-44264](https://issues.apache.org/jira/browse/SPARK-44264)
*   Implement changelog checkpointing for RocksDB state store [SPARK-43421](https://issues.apache.org/jira/browse/SPARK-43421)
*   Introduce watermark propagation among operators [SPARK-42376](https://issues.apache.org/jira/browse/SPARK-42376)
*   Introduce dropDuplicatesWithinWatermark [SPARK-42931](https://issues.apache.org/jira/browse/SPARK-42931)
*   RocksDB state store provider memory management enhancements [SPARK-43311](https://issues.apache.org/jira/browse/SPARK-43311)
*   Scala and Go client support in Spark Connect [SPARK-42554](https://issues.apache.org/jira/browse/SPARK-42554) [SPARK-43351](https://issues.apache.org/jira/browse/SPARK-43351)
*   PyTorch-based distributed ML Support for Spark Connect [SPARK-42471](https://issues.apache.org/jira/browse/SPARK-42471)
*   Structured Streaming support for Spark Connect in Python and Scala [SPARK-42938](https://issues.apache.org/jira/browse/SPARK-42938)
*   Pandas API support for the Python Spark Connect Client [SPARK-42497](https://issues.apache.org/jira/browse/SPARK-42497)

### Spark SQL

#### Features

*   Add metadata column file block start and length [SPARK-42423](https://issues.apache.org/jira/browse/SPARK-42423)
*   Support positional parameters in Scala/Java sql() [SPARK-44066](https://issues.apache.org/jira/browse/SPARK-44066)
*   Add named parameter support in parser for function calls [SPARK-43922](https://issues.apache.org/jira/browse/SPARK-43922)
*   Support SELECT DEFAULT with ORDER BY, LIMIT, OFFSET for INSERT source relation [SPARK-43071](https://issues.apache.org/jira/browse/SPARK-43071)
*   Add SQL grammar for PARTITION BY and ORDER BY clause after TABLE arguments for TVF calls [SPARK-44503](https://issues.apache.org/jira/browse/SPARK-44503)
*   Include column default values in DESCRIBE and SHOW CREATE TABLE output [SPARK-42123](https://issues.apache.org/jira/browse/SPARK-42123)
*   Add optional pattern for Catalog.listCatalogs [SPARK-43792](https://issues.apache.org/jira/browse/SPARK-43792)
*   Add optional pattern for Catalog.listDatabases [SPARK-43881](https://issues.apache.org/jira/browse/SPARK-43881)
*   Callback when ready for execution [SPARK-44145](https://issues.apache.org/jira/browse/SPARK-44145)
*   Support Insert By Name statement [SPARK-42750](https://issues.apache.org/jira/browse/SPARK-42750)
*   Add call\_function for Scala API [SPARK-44131](https://issues.apache.org/jira/browse/SPARK-44131)
*   Stable derived column aliases [SPARK-40822](https://issues.apache.org/jira/browse/SPARK-40822)
*   Support general constant expressions as CREATE/REPLACE TABLE OPTIONS values [SPARK-43529](https://issues.apache.org/jira/browse/SPARK-43529)
*   Support subqueries with correlation through INTERSECT/EXCEPT [SPARK-36124](https://issues.apache.org/jira/browse/SPARK-36124)
*   IDENTIFIER clause [SPARK-43205](https://issues.apache.org/jira/browse/SPARK-43205)
*   ANSI MODE: Conv should return an error if the internal conversion overflows [SPARK-42427](https://issues.apache.org/jira/browse/SPARK-42427)

#### Functions

*   Add support for Datasketches HllSketch [SPARK-16484](https://issues.apache.org/jira/browse/SPARK-16484)
*   Support the CBC mode by aes\_encrypt()/aes\_decrypt() [SPARK-43038](https://issues.apache.org/jira/browse/SPARK-43038)
*   Support TABLE argument parser rule for TableValuedFunction [SPARK-44200](https://issues.apache.org/jira/browse/SPARK-44200)
*   Implement bitmap functions [SPARK-44154](https://issues.apache.org/jira/browse/SPARK-44154)
*   Add the try\_aes\_decrypt() function [SPARK-42701](https://issues.apache.org/jira/browse/SPARK-42701)
*   array\_insert should fail with 0 index [SPARK-43011](https://issues.apache.org/jira/browse/SPARK-43011)
*   Add to\_varchar alias for to\_char [SPARK-43815](https://issues.apache.org/jira/browse/SPARK-43815)
*   High-order function: array\_compact implementation [SPARK-41235](https://issues.apache.org/jira/browse/SPARK-41235)
*   Add analyzer support of named arguments for built-in functions [SPARK-44059](https://issues.apache.org/jira/browse/SPARK-44059)
*   Add NULLs for INSERTs with user-specified lists of fewer columns than the target table [SPARK-42521](https://issues.apache.org/jira/browse/SPARK-42521)
*   Adds support for aes\_encrypt IVs and AAD [SPARK-43290](https://issues.apache.org/jira/browse/SPARK-43290)
*   DECODE function returns wrong results when passed NULL [SPARK-41668](https://issues.apache.org/jira/browse/SPARK-41668)
*   Support udf ‘luhn\_check’ [SPARK-42191](https://issues.apache.org/jira/browse/SPARK-42191)
*   Support implicit lateral column alias resolution on Aggregate [SPARK-41631](https://issues.apache.org/jira/browse/SPARK-41631)
*   Support implicit lateral column alias in queries with Window [SPARK-42217](https://issues.apache.org/jira/browse/SPARK-42217)
*   Add 3-args function aliases DATE\_ADD and DATE\_DIFF [SPARK-43492](https://issues.apache.org/jira/browse/SPARK-43492)

#### Data Sources

*   Char/Varchar Support for JDBC Catalog [SPARK-42904](https://issues.apache.org/jira/browse/SPARK-42904)
*   Support Get SQL Keywords Dynamically Thru JDBC API and TVF [SPARK-43119](https://issues.apache.org/jira/browse/SPARK-43119)
*   DataSource V2: Handle MERGE commands for delta-based sources [SPARK-43885](https://issues.apache.org/jira/browse/SPARK-43885)
*   DataSource V2: Handle MERGE commands for group-based sources [SPARK-43963](https://issues.apache.org/jira/browse/SPARK-43963)
*   DataSource V2: Handle UPDATE commands for group-based sources [SPARK-43975](https://issues.apache.org/jira/browse/SPARK-43975)
*   DataSource V2: Allow representing updates as deletes and inserts [SPARK-43775](https://issues.apache.org/jira/browse/SPARK-43775)
*   Allow jdbc dialects to override the query used to create a table [SPARK-41516](https://issues.apache.org/jira/browse/SPARK-41516)
*   SPJ: Support partially clustered distribution [SPARK-42038](https://issues.apache.org/jira/browse/SPARK-42038)
*   DSv2 allows CTAS/RTAS to reserve schema nullability [SPARK-43390](https://issues.apache.org/jira/browse/SPARK-43390)
*   Add spark.sql.files.maxPartitionNum [SPARK-44021](https://issues.apache.org/jira/browse/SPARK-44021)
*   Handle UPDATE commands for delta-based sources [SPARK-43324](https://issues.apache.org/jira/browse/SPARK-43324)
*   Allow V2 writes to indicate advisory shuffle partition size [SPARK-42779](https://issues.apache.org/jira/browse/SPARK-42779)
*   Support lz4raw compression codec for Parquet [SPARK-43273](https://issues.apache.org/jira/browse/SPARK-43273)
*   Avro: writing complex unions [SPARK-25050](https://issues.apache.org/jira/browse/SPARK-25050)
*   Speed up Timestamp type inference with user-provided format in JSON/CSV data source [SPARK-39280](https://issues.apache.org/jira/browse/SPARK-39280)
*   Avro to Support custom decimal type backed by Long [SPARK-43901](https://issues.apache.org/jira/browse/SPARK-43901)
*   Avoid shuffle in Storage-Partitioned Join when partition keys mismatch, but join expressions are compatible [SPARK-41413](https://issues.apache.org/jira/browse/SPARK-41413)
*   Change binary to unsupported dataType in CSV format [SPARK-42237](https://issues.apache.org/jira/browse/SPARK-42237)
*   Allow Avro to convert union type to SQL with field name stable with type [SPARK-43333](https://issues.apache.org/jira/browse/SPARK-43333)
*   Speed up Timestamp type inference with legacy format in JSON/CSV data source [SPARK-39281](https://issues.apache.org/jira/browse/SPARK-39281)

#### Query Optimization

*   Subexpression elimination support shortcut expression [SPARK-42815](https://issues.apache.org/jira/browse/SPARK-42815)
*   Improve join stats estimation if one side can keep uniqueness [SPARK-39851](https://issues.apache.org/jira/browse/SPARK-39851)
*   Introduce the group limit of Window for rank-based filter to optimize top-k computation [SPARK-37099](https://issues.apache.org/jira/browse/SPARK-37099)
*   Fix behavior of null IN (empty list) in optimization rules [SPARK-44431](https://issues.apache.org/jira/browse/SPARK-44431)
*   Infer and push down window limit through window if partitionSpec is empty [SPARK-41171](https://issues.apache.org/jira/browse/SPARK-41171)
*   Remove the outer join if they are all distinct aggregate functions [SPARK-42583](https://issues.apache.org/jira/browse/SPARK-42583)
*   Collapse two adjacent windows with the same partition/order in subquery [SPARK-42525](https://issues.apache.org/jira/browse/SPARK-42525)
*   Push down limit through Python UDFs [SPARK-42115](https://issues.apache.org/jira/browse/SPARK-42115)
*   Optimize the order of filtering predicates [SPARK-40045](https://issues.apache.org/jira/browse/SPARK-40045)

#### Code Generation and Query Execution

*   Runtime filter should supports multi level shuffle join side as filter creation side [SPARK-41674](https://issues.apache.org/jira/browse/SPARK-41674)
*   Codegen Support for HiveSimpleUDF [SPARK-42052](https://issues.apache.org/jira/browse/SPARK-42052)
*   Codegen Support for HiveGenericUDF [SPARK-42051](https://issues.apache.org/jira/browse/SPARK-42051)
*   Codegen Support for build side outer shuffled hash join [SPARK-44060](https://issues.apache.org/jira/browse/SPARK-44060)
*   Implement code generation for to\_csv function (StructsToCsv) [SPARK-42169](https://issues.apache.org/jira/browse/SPARK-42169)
*   Make AQE support InMemoryTableScanExec [SPARK-42101](https://issues.apache.org/jira/browse/SPARK-42101)
*   Support left outer join build left or right outer join build right in shuffled hash join [SPARK-36612](https://issues.apache.org/jira/browse/SPARK-36612)
*   Respect RequiresDistributionAndOrdering in CTAS/RTAS [SPARK-43088](https://issues.apache.org/jira/browse/SPARK-43088)
*   Coalesce buckets in join applied on broadcast join stream side [SPARK-43107](https://issues.apache.org/jira/browse/SPARK-43107)
*   Set nullable correctly on coalesced join key in full outer USING join [SPARK-44251](https://issues.apache.org/jira/browse/SPARK-44251)
*   Fix IN subquery ListQuery nullability [SPARK-43413](https://issues.apache.org/jira/browse/SPARK-43413)

#### Other Notable Changes

*   Set nullable correctly for keys in USING joins [SPARK-43718](https://issues.apache.org/jira/browse/SPARK-43718)
*   Fix COUNT(\*) is null bug in correlated scalar subquery [SPARK-43156](https://issues.apache.org/jira/browse/SPARK-43156)
*   Dataframe.joinWith outer-join should return a null value for unmatched row [SPARK-37829](https://issues.apache.org/jira/browse/SPARK-37829)
*   Automatically rename conflicting metadata columns [SPARK-42683](https://issues.apache.org/jira/browse/SPARK-42683)
*   Document the Spark SQL error classes in user-facing documentation [SPARK-42706](https://issues.apache.org/jira/browse/SPARK-42706)

### PySpark

#### Features

*   Support positional parameters in Python sql() [SPARK-44140](https://issues.apache.org/jira/browse/SPARK-44140)
*   Support parameterized SQL by sql() [SPARK-41666](https://issues.apache.org/jira/browse/SPARK-41666)
*   Support Python user-defined table functions [SPARK-43797](https://issues.apache.org/jira/browse/SPARK-43797)
*   Support to set Python executable for UDF and pandas function APIs in workers during runtime [SPARK-43574](https://issues.apache.org/jira/browse/SPARK-43574)
*   Add DataFrame.offset to PySpark [SPARK-43213](https://issues.apache.org/jira/browse/SPARK-43213)
*   Implement **dir**() in pyspark.sql.dataframe.DataFrame to include columns [SPARK-43270](https://issues.apache.org/jira/browse/SPARK-43270)
*   Add option to use large variable width vectors for arrow UDF operations [SPARK-39979](https://issues.apache.org/jira/browse/SPARK-39979)
*   Make mapInPandas / mapInArrow support barrier mode execution [SPARK-42896](https://issues.apache.org/jira/browse/SPARK-42896)
*   Add JobTag APIs to PySpark SparkContext [SPARK-44194](https://issues.apache.org/jira/browse/SPARK-44194)
*   Support for Python UDTF to analyze in Python [SPARK-44380](https://issues.apache.org/jira/browse/SPARK-44380)
*   Expose TimestampNTZType in pyspark.sql.types [SPARK-43759](https://issues.apache.org/jira/browse/SPARK-43759)
*   Support nested timestamp type [SPARK-43545](https://issues.apache.org/jira/browse/SPARK-43545)
*   Support UserDefinedType in createDataFrame from pandas DataFrame and toPandas \[[SPARK-43817](https://issues.apache.org/jira/browse/SPARK-43817)\][SPARK-43702](https://issues.apache.org/jira/browse/SPARK-43702)
*   Add descriptor binary option to Pyspark Protobuf API [SPARK-43799](https://issues.apache.org/jira/browse/SPARK-43799)
*   Accept generics tuple as typing hints of Pandas UDF [SPARK-43886](https://issues.apache.org/jira/browse/SPARK-43886)
*   Add array\_prepend function [SPARK-41233](https://issues.apache.org/jira/browse/SPARK-41233)
*   Add assertDataFrameEqual util function [SPARK-44061](https://issues.apache.org/jira/browse/SPARK-44061)
*   Support arrow-optimized Python UDTFs [SPARK-43964](https://issues.apache.org/jira/browse/SPARK-43964)
*   Allow custom precision for fp approx equality [SPARK-44217](https://issues.apache.org/jira/browse/SPARK-44217)
*   Make assertSchemaEqual API public [SPARK-44216](https://issues.apache.org/jira/browse/SPARK-44216)
*   Support fill\_value for ps.Series [SPARK-42094](https://issues.apache.org/jira/browse/SPARK-42094)
*   Support struct type in createDataFrame from pandas DataFrame [SPARK-43473](https://issues.apache.org/jira/browse/SPARK-43473)

#### Other Notable Changes

*   Deprecate & remove the APIs that will be removed in pandas 2.0 \[[SPARK-42593](https://issues.apache.org/jira/browse/SPARK-42593)\]
*   Make Python the first tab for code examples - Spark SQL, DataFrames and Datasets Guide [SPARK-42493](https://issues.apache.org/jira/browse/SPARK-42493)
*   Updating remaining Spark documentation code examples to show Python by default [SPARK-42642](https://issues.apache.org/jira/browse/SPARK-42642)
*   Use deduplicated field names when creating Arrow RecordBatch \[[SPARK-41971](https://issues.apache.org/jira/browse/SPARK-41971)\]
*   Support duplicated field names in createDataFrame with pandas DataFrame \[[SPARK-43528](https://issues.apache.org/jira/browse/SPARK-43528)\]
*   Allow columns parameter when creating DataFrame with Series \[[SPARK-42194](https://issues.apache.org/jira/browse/SPARK-42194)\]

### Core

*   Schedule mergeFinalize when push merge shuffleMapStage retry but no running tasks [SPARK-40082](https://issues.apache.org/jira/browse/SPARK-40082)
*   Introduce PartitionEvaluator for SQL operator execution [SPARK-43061](https://issues.apache.org/jira/browse/SPARK-43061)
*   Allow ShuffleDriverComponent to declare if shuffle data is reliably stored [SPARK-42689](https://issues.apache.org/jira/browse/SPARK-42689)
*   Add max attempts limitation for stages to avoid potential infinite retry [SPARK-42577](https://issues.apache.org/jira/browse/SPARK-42577)
*   Support log level configuration with static Spark conf [SPARK-43782](https://issues.apache.org/jira/browse/SPARK-43782)
*   Optimize PercentileHeap [SPARK-42528](https://issues.apache.org/jira/browse/SPARK-42528)
*   Add reason argument to TaskScheduler.cancelTasks [SPARK-42602](https://issues.apache.org/jira/browse/SPARK-42602)
*   Avoid unnecessary task rerun on decommissioned executor lost if shuffle data migrated [SPARK-41469](https://issues.apache.org/jira/browse/SPARK-41469)
*   Fixing accumulator undercount in the case of the retry task with rdd cache [SPARK-41497](https://issues.apache.org/jira/browse/SPARK-41497)
*   Use RocksDB for spark.history.store.hybridStore.diskBackend by default [SPARK-42277](https://issues.apache.org/jira/browse/SPARK-42277)
*   Support spark.kubernetes.setSubmitTimeInDriver [SPARK-43014](https://issues.apache.org/jira/browse/SPARK-43014)
*   NonFateSharingCache wrapper for Guava Cache [SPARK-43300](https://issues.apache.org/jira/browse/SPARK-43300)
*   Improve the performance of MapOutputTracker.updateMapOutput [SPARK-43043](https://issues.apache.org/jira/browse/SPARK-43043)
*   Allowing apps to control whether their metadata gets saved in the db by the External Shuffle Service [SPARK-43179](https://issues.apache.org/jira/browse/SPARK-43179)
*   Port executor failure tracker from Spark on YARN to K8s [SPARK-41210](https://issues.apache.org/jira/browse/SPARK-41210)
*   Parameterize the max number of attempts for driver props fetcher in KubernetesExecutorBackend [SPARK-42764](https://issues.apache.org/jira/browse/SPARK-42764)
*   Add SPARK\_DRIVER\_POD\_IP env variable to executor pods [SPARK-42769](https://issues.apache.org/jira/browse/SPARK-42769)
*   Mounts the hadoop config map on the executor pod [SPARK-43504](https://issues.apache.org/jira/browse/SPARK-43504)

### Structured Streaming

*   Add support for tracking pinned blocks memory usage for RocksDB state store [SPARK-43120](https://issues.apache.org/jira/browse/SPARK-43120)
*   Add RocksDB state store provider memory management enhancements [SPARK-43311](https://issues.apache.org/jira/browse/SPARK-43311)
*   Introduce dropDuplicatesWithinWatermark [SPARK-42931](https://issues.apache.org/jira/browse/SPARK-42931)
*   Introduce a new callback onQueryIdle() to StreamingQueryListener [SPARK-43183](https://issues.apache.org/jira/browse/SPARK-43183)
*   Add option to skip commit coordinator as part of StreamingWrite API for DSv2 sources/sinks [SPARK-42968](https://issues.apache.org/jira/browse/SPARK-42968)
*   Introduce a new callback “onQueryIdle” to StreamingQueryListener [SPARK-43183](https://issues.apache.org/jira/browse/SPARK-43183)
*   Implement Changelog based Checkpointing for RocksDB State Store Provider [SPARK-43421](https://issues.apache.org/jira/browse/SPARK-43421)
*   Add support for WRITE\_FLUSH\_BYTES for RocksDB used in streaming stateful operators [SPARK-42792](https://issues.apache.org/jira/browse/SPARK-42792)
*   Add support for setting max\_write\_buffer\_number and write\_buffer\_size for RocksDB used in streaming [SPARK-42819](https://issues.apache.org/jira/browse/SPARK-42819)
*   RocksDB StateStore lock acquisition should happen after getting input iterator from inputRDD [SPARK-42566](https://issues.apache.org/jira/browse/SPARK-42566)
*   Introduce watermark propagation among operators [SPARK-42376](https://issues.apache.org/jira/browse/SPARK-42376)
*   Cleanup orphan sst and log files in RocksDB checkpoint directory [SPARK-42353](https://issues.apache.org/jira/browse/SPARK-42353)
*   Expand QueryTerminatedEvent to contain error class if it exists in exception [SPARK-43482](https://issues.apache.org/jira/browse/SPARK-43482)

### ML

*   Support Distributed Training of Functions Using Deepspeed [SPARK-44264](https://issues.apache.org/jira/browse/SPARK-44264)
*   Base interfaces of sparkML for spark3.5: estimator/transformer/model/evaluator [SPARK-43516](https://issues.apache.org/jira/browse/SPARK-43516)
*   Make MLv2 (ML on spark connect) supports pandas >= 2.0 [SPARK-43783](https://issues.apache.org/jira/browse/SPARK-43783)
*   Update MLv2 Transformer interfaces [SPARK-43516](https://issues.apache.org/jira/browse/SPARK-43516)
*   New pyspark ML logistic regression estimator implemented on top of distributor [SPARK-43097](https://issues.apache.org/jira/browse/SPARK-43097)
*   Add Classifier.getNumClasses back [SPARK-42526](https://issues.apache.org/jira/browse/SPARK-42526)
*   Write a Deepspeed Distributed Learning Class DeepspeedTorchDistributor [SPARK-44264](https://issues.apache.org/jira/browse/SPARK-44264)
*   Basic saving / loading implementation for ML on spark connect [SPARK-43981](https://issues.apache.org/jira/browse/SPARK-43981)
*   Improve logistic regression model saving [SPARK-43097](https://issues.apache.org/jira/browse/SPARK-43097)
*   Implement pipeline estimator for ML on spark connect [SPARK-43982](https://issues.apache.org/jira/browse/SPARK-43982)
*   Implement cross validator estimator [SPARK-43983](https://issues.apache.org/jira/browse/SPARK-43983)
*   Implement classification evaluator [SPARK-44250](https://issues.apache.org/jira/browse/SPARK-44250)
*   Make PyTorch Distributor compatible with Spark Connect [SPARK-42993](https://issues.apache.org/jira/browse/SPARK-42993)

### UI

*   Add a Spark UI page for Spark Connect [SPARK-44394](https://issues.apache.org/jira/browse/SPARK-44394)
*   Support Heap Histogram column in Executors tab [SPARK-44153](https://issues.apache.org/jira/browse/SPARK-44153)
*   Show error message on UI for each failed query [SPARK-44367](https://issues.apache.org/jira/browse/SPARK-44367)
*   Display Add/Remove Time of Executors on Executors Tab [SPARK-44309](https://issues.apache.org/jira/browse/SPARK-44309)

You can check the full list and detailed changes here: [https://spark.apache.org/releases/spark-release-3-5-0.html](https://spark.apache.org/releases/spark-release-3-5-0.html).


#### Migration Guides

*   [Spark Core](https://spark.apache.org/docs/3.5.0/core-migration-guide.html)
*   [SQL, Datasets, and DataFrame](https://spark.apache.org/docs/3.5.0/sql-migration-guide.html)
*   [Structured Streaming](https://spark.apache.org/docs/3.5.0/ss-migration-guide.html)
*   [MLlib (Machine Learning)](https://spark.apache.org/docs/3.5.0/ml-migration-guide.html)
*   [PySpark (Python on Spark)](https://spark.apache.org/docs/3.5.0/api/python/migration_guide/pyspark_upgrade.html)
*   [SparkR (R on Spark)](https://spark.apache.org/docs/3.5.0/sparkr-migration-guide.html)


## Key Delta 3.0 highlights
Delta Lake 3.0 marks a collective commitment to making Delta Lake interoperable across formats, easier to work with, and more performant. This release includes hundreds of improvements and bug fixes, but we'd like to call out the following:

### Delta Spark

Delta Spark 3.0.0 is built on top of [Apache Spark™ 3.5](https://spark.apache.org/releases/spark-release-3-5-0.html). Similar to Apache Spark, we have released Maven artifacts for both Scala 2.12 and Scala 2.13. Note that the Delta Spark maven artifact has been renamed from **delta-core** to **delta-spark**.

*   Documentation: [https://docs.delta.io/3.0.0/index.html](https://docs.delta.io/3.0.0/index.html)
*   API documentation: [https://docs.delta.io/3.0.0/delta-apidoc.html#delta-spark](https://docs.delta.io/3.0.0/delta-apidoc.html#delta-spark)
*   Maven artifacts: [delta-spark\_2.12](https://repo1.maven.org/maven2/io/delta/delta-spark_2.12/3.0.0/), [delta-spark\_2.13](https://repo1.maven.org/maven2/io/delta/delta-spark_2.13/3.0.0/), [delta-contribs\_2.12](https://repo1.maven.org/maven2/io/delta/delta-contribs_2.12/3.0.0/), [delta\_contribs\_2.13](https://repo1.maven.org/maven2/io/delta/delta-contribs_2.13/3.0.0/), [delta-storage](https://repo1.maven.org/maven2/io/delta/delta-storage/3.0.0/), [delta-storage-s3-dynamodb](https://repo1.maven.org/maven2/io/delta/delta-storage-s3-dynamodb/3.0.0/), [delta-iceberg\_2.12](https://repo1.maven.org/maven2/io/delta/delta-iceberg_2.12/3.0.0/), [delta-iceberg\_2.13](https://repo1.maven.org/maven2/io/delta/delta-iceberg_2.13/3.0.0/)
*   Python artifacts: [https://pypi.org/project/delta-spark/3.0.0/](https://pypi.org/project/delta-spark/3.0.0/)

The key features of this release are:

*   [Support for Apache Spark 3.5](https://github.com/delta-io/delta/commit/4f9c8b9cc294ec7b321847115bf87909c356bc5a)
*   [Delta Universal Format](https://github.com/delta-io/delta/commit/9b50cd206004ae28105846eee9d910f39019ab8b) - Write as Delta, read as Iceberg! See the highlighted section above.
*   [Up to 10x performance improvement of UPDATE using Deletion Vectors](https://github.com/delta-io/delta/commit/0a0ea97b) - Delta UPDATE operations now support writing Deletion Vectors. When enabled, the performance of UPDATEs will receive a significant boost.
*   [More than 2x performance improvement of DELETE using Deletion Vectors](https://github.com/delta-io/delta/commit/fc39f78d) - This fix improves the file path canonicalization logic by avoiding calling expensive `Path.toUri.toString` calls for each row in a table, resulting in a several hundred percent speed boost on DELETE operations (only when Deletion Vectors have been [enabled](https://docs.delta.io/latest/delta-deletion-vectors.html#enable-deletion-vectors) on the table).
*   [Up to 2x faster MERGE operation](https://github.com/delta-io/delta/issues/1827) \- MERGE now better leverages data skipping, the ability to use the insert-only code path in more cases, and an overall improved execution to achieve up to 2x better performance in various scenarios.
*   [Support streaming reads from column mapping enabled tables](https://github.com/delta-io/delta/commit/3441df16) when `DROP COLUMN` and `RENAME COLUMN` have been used. This includes streaming support for Change Data Feed. See the documentation [here](https://docs.delta.io/3.0.0/delta-streaming.html#tracking-non-additive-schema-changes) for more details.
*   [Support specifying the columns for which Delta will collect file-skipping statistics](https://github.com/delta-io/delta/commit/8f2b532a) via the table property `delta.dataSkippingStatsColumns`. Previously, Delta would only collect file-skipping statistics for the first N columns in the table schema (default to 32). Now, users can easily customize this.
*   [Support](https://github.com/delta-io/delta/commit/d9a5f9f9) zero-copy [convert to Delta from Iceberg](https://docs.delta.io/3.0.0/delta-utility.html#convert-an-iceberg-table-to-a-delta-table) tables on Apache Spark 3.5 using `CONVERT TO DELTA`. This feature was excluded from the Delta Lake 2.4 release since Iceberg did not yet support Apache Spark 3.4 (or 3.5). This command generates a Delta table in the same location and does not rewrite any parquet files.
*   [Checkpoint V2](https://github.com/delta-io/delta/blob/master/PROTOCOL.md#v2-checkpoint-table-feature) - Introduced a new [Checkpoint V2 format](https://github.com/delta-io/delta/blob/master/PROTOCOL.md#v2-checkpoint-table-feature) in Delta Protocol Specification and implemented [read](https://github.com/delta-io/delta/commit/6859c863e88bfe7be6d5ccbb0c221bdde57a00c3)/[write](https://github.com/delta-io/delta/commit/7442ebfb8df1ae7ed8630d092abd617c110be5d6) support in Delta Spark. The new checkpoint v2 format provides more reliability over the existing v1 checkpoint format.
*   [Log Compactions](https://github.com/delta-io/delta/commit/5d43f1db5975dca31da29f714b1a155aa4367aee) - Introduced new log compaction files in Delta Protocol Specification which could be useful in reducing the frequency of Delta checkpoints. Added [read support](https://github.com/delta-io/delta/commit/0e05caf5c2124f61da69dc6671c8011450a6e831) for log compaction files in Delta Spark.
*   [Safe casts enabled by default for UPDATE and MERGE operations](https://github.com/delta-io/delta/commit/6d78d434) - Delta UPDATE and MERGE operations now result in an error when values cannot be safely cast to the type in the target table schema. All implicit casts in Delta now follow `spark.sql.storeAssignmentPolicy` instead of `spark.sql.ansi.enabled`.
*   [General Apache Spark catalog support for auxiliary commands](https://github.com/delta-io/delta/commit/4eb177eaf4c16080887d78407bb64a4183832686) – Several popular auxiliary commands now support general table resolution in Apache Spark. This simplifies the code and also makes it possible to use these commands with custom table catalogs based on Delta Lake tables. The following commands are now supported in this way: VACUUM, RESTORE TABLE, DESCRIBE DETAIL, DESCRIBE HISTORY, SHALLOW CLONE, OPTIMIZE.

Other notable changes include:
*   [Fix](https://github.com/delta-io/delta/commit/7251507fd83518fd206e54574968054f77a11cc0) for a bug in MERGE statements that contain a scalar subquery with non-deterministic results. Such a subquery can return different results during source materialization, while finding matches, and while writing modified rows. This can cause rows to be either dropped or duplicated.
*   [Fix](https://github.com/delta-io/delta/commit/2d922660) for potential resource leak when DV file not found during parquet read
*   [Support](https://github.com/delta-io/delta/commit/f0a38649) protocol version downgrade
*   [Fix](https://github.com/delta-io/delta/commit/9a5eeb73) to initial preview release to support converting null partition values in UniForm
*   [Fix](https://github.com/delta-io/delta/commit/d9ba620c) to WRITE command to not commit empty transactions, just like what DELETE, UPDATE, and MERGE commands do already
*   [Support](https://github.com/delta-io/delta/commit/3ff4075d) 3-part table name identifier. Now, commands like `OPTIMIZE <catalog>.<db>.<tbl>` will work.
*   [Performance improvement](https://github.com/delta-io/delta/commit/d19e989e) to CDF read queries scanning in batch to reduce the number of cloud requests and to reduce Spark scheduler pressure
*   [Fix](https://github.com/delta-io/delta/commit/8a2da73d) for edge case in CDF read query optimization due to incorrect statistic value
*   [Fix](https://github.com/delta-io/delta/commit/d36623f0) for edge case in streaming reads where having the same file with different DVs in the same batch would yield incorrect results as the wrong file and DV pair would be read
*   [Prevent](https://github.com/delta-io/delta/commit/d9070685) table corruption by disallowing `overwriteSchema` when partitionOverwriteMode is set to dynamic
*   [Fix](https://github.com/delta-io/delta/commit/e41db5c1) a bug where DELETE with DVs would not work on Column Mapping-enabled tables
*   [Support](https://github.com/delta-io/delta/commit/dbb22100) automatic schema evolution in structs that are inside maps
*   [Minor fix](https://github.com/delta-io/delta/commit/7e51538d) to Delta table path URI concatenation
*   [Support](https://github.com/delta-io/delta/commit/84c869c5) writing parquet data files to the `data` subdirectory via the SQL configuration `spark.databricks.delta.write.dataFilesToSubdir`. This is used to add UniForm support on BigQuery.

## Related content

- Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
