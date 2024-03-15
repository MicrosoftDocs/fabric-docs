---
title: Runtime 1.1 in Fabric
description: Learn about Apache Spark-based Runtime 1.1 that is available in Fabric, including unique features, capabilities, and best practices.
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Runtime 1.1

Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark that enables the execution and management of the Data Engineering and Data Science experiences in Fabric. This document covers the Fabric Runtime 1.1 components and versions.

Microsoft Fabric Runtime 1.1 is one of the runtimes offered within the Microsoft Fabric platform. The Runtime 1.1 major components are:

- Apache Spark 3.3
- Operating System: Ubuntu 18.04
- Java: 1.8.0_282
- Scala: 2.12.15
- Python: 3.10
- Delta Lake: 2.2
- R: 4.2.2

> [!TIP]
> For up-to-date information, a detailed list of changes, and specific release notes for Fabric runtimes, check and subscribe [Spark Runtimes Releases and Updates](https://github.com/microsoft/synapse-spark-runtime).

Microsoft Fabric Runtime 1.1 comes with a collection of default level packages, including a full Anaconda installation and commonly used libraries for Java/Scala, Python, and R. These libraries are automatically included when using notebooks or jobs in the Microsoft Fabric platform. Refer to the documentation for a complete list of libraries.

Microsoft Fabric periodically releases maintenance updates for Runtime 1.1, delivering bug fixes, performance enhancements, and security patches. Ensuring you stay up to date with these updates guarantees optimal performance and reliability for your data processing tasks. **If you are currently using Runtime 1.1, you can upgrade to Runtime 1.2 by navigating to Workspace Settings > Data Engineering / Science > Spark Settings.**

:::image type="content" source="media\workspace-admin-settings\runtime-version-1-2.png" alt-text="Screenshot showing where to select runtime version.":::

## New features and improvements - Apache Spark 3.3.1

The following extended summary describes key new features related to Apache Spark version 3.3.0 and 3.3.1:

- **Row-level filtering**: improve the performance of joins by prefiltering one side, as long as there are no deprecation or regression impacts on using a Bloom filter and IN predicate generated from the values from the other side of the join. ([SPARK-32268](https://issues.apache.org/jira/browse/SPARK-32268))

- Improve the compatibility of Spark with the SQL standard:**ANSI enhancements**. ([SPARK-38860](https://issues.apache.org/jira/browse/SPARK-38860))

- Error message improvements to identify problems faster and take the necessary steps to resolve them. ([SPARK-38781](https://issues.apache.org/jira/browse/SPARK-38781))

- Support **complex types for Parquet vectorized reader**. Previously, Parquet vectorized reader didn't support nested column types like struct, array, and map. The Apache Spark 3.3 contains an implementation of nested column vectorized reader for FB-ORC in our internal fork of Spark. It impacts performance improvements compared to a nonvectorized reader when reading nested columns. In addition, this implementation can help improve the non-nested column performance when reading non-nested and nested columns together in one query. ([SPARK-34863](https://issues.apache.org/jira/browse/SPARK-34863))

- Allows users to query the metadata of the input files for all file formats, expose them as **built-in hidden columns**, meaning **users can only see them when they explicitly reference them.** (For example, file path and file name.) ([SPARK-37273](https://issues.apache.org/jira/browse/SPARK-37273))

- Provide a profiler for Python/Pandas UDFs. ([SPARK-37443](https://issues.apache.org/jira/browse/SPARK-37443))

- Previously, we ran streaming queries with Trigger, which loads all of the available data in a single batch. As a result, the amount of data the queries could process was limited, or the Spark driver would be out of memory. Now, we use **Trigger.AvailableNow** for running streaming queries like Trigger once in multiple batches. ([SPARK-36533](https://issues.apache.org/jira/browse/SPARK-36533))

- More comprehensive DS V2 push down capabilities. ([SPARK-38788](https://issues.apache.org/jira/browse/SPARK-38788))

- Executor **Rolling in Kubernetes** environment. ([SPARK-37810](https://issues.apache.org/jira/browse/SPARK-37810))

- Support **Customized Kubernetes** Schedulers. ( [SPARK-36057](https://issues.apache.org/jira/browse/SPARK-36057))

- Migrating from **log4j 1 to log4j 2** ([SPARK-37814](https://issues.apache.org/jira/browse/SPARK-37814)) to gain in:
  - Performance: Log4j 2 is faster than Log4j 1. Log4j 2 uses **asynchronous logging by default**, which can improve performance significantly.

  - Flexibility: Log4j 2 provides more flexibility in terms of configuration. It supports **multiple configuration formats**, including XML, JSON, and YAML.

  - Extensibility: Log4j 2 is designed to be extensible. It allows developers to **create custom plugins and appenders** to extend the functionality of the logging framework.

  - Security: Log4j 2 provides better security features than Log4j 1. It supports **encryption and secure socket layers** for secure communication between applications.

  - Simplicity: Log4j 2 is simpler to use than Log4j 1. It has **a more intuitive API** and a simpler configuration process.

- Introduce shuffle on **SinglePartition** to improve parallelism and fix performance regression for joins in Spark 3.3 vs Spark 3.2. ([SPARK-40703](https://issues.apache.org/jira/browse/SPARK-40703))

- Optimize **TransposeWindow** rule to extend applicable cases and optimize time complexity. ([SPARK-38034](https://issues.apache.org/jira/browse/SPARK-38034))

- To have a parity in doing TimeTravel via SQL and Dataframe option, **support timestamp** in seconds for **TimeTravel** using Dataframe options. ([SPARK-39633\]](https://issues.apache.org/jira/browse/SPARK-39633))

- Optimize **global Sort** to **RepartitionByExpression** to save a local sort. ([SPARK-39911](https://issues.apache.org/jira/browse/SPARK-39911))

- Ensure the **output** **partitioning** is user-specified in **AQE**. ([SPARK-39915](https://issues.apache.org/jira/browse/SPARK-39915))

- Update Parquet V2 columnar check for nested fields. ([SPARK-39951](https://issues.apache.org/jira/browse/SPARK-39951))

- Reading in **a parquet file partitioned on disk by a \`Byte\`-type column**. ([SPARK-40212](https://issues.apache.org/jira/browse/SPARK-40212))

- Fix column pruning in CSV when \_corrupt\_record is selected. ([SPARK-40468](https://issues.apache.org/jira/browse/SPARK-40468))

## New features and improvements - Delta Lake 2.2

The key features in this release are as follows:

- [`LIMIT`](https://github.com/delta-io/delta/commit/1a94a585) pushdown into Delta scan. Improve the performance of queries containing `LIMIT` clauses by pushing down the `LIMIT` into Delta scan during query planning. Delta scan uses the `LIMIT` and the file-level row counts to reduce the number of files scanned which helps the queries read far less number of files and could make `LIMIT` queries faster by 10-100x depending upon the table size.

- [Aggregate](https://github.com/delta-io/delta/commit/0c349da8) pushdown into Delta scan for SELECT COUNT(\*). Aggregation queries such as `SELECT COUNT(*)` on Delta tables are satisfied using file-level row counts in Delta table metadata rather than counting rows in the underlying data files. This significantly reduces the query time as the query just needs to read the table metadata and could make full table count queries faster by 10-100x.

- [Support](https://github.com/delta-io/delta/commit/a5fcec4f) for collecting file level statistics as part of the CONVERT TO DELTA command. These statistics potentially help speed up queries on the Delta table. By default the statistics are collected now as part of the CONVERT TO DELTA command. In order to disable statistics collection, specify `NO STATISTICS` clause in the command. Example: `CONVERT TO DELTA table_name NO STATISTICS`.

- [Improve](https://github.com/delta-io/delta/commit/9017ac0d811c0a42ba8ac45720bddf06c8f17e63) performance of the [DELETE](https://docs.delta.io/latest/delta-update.html#delete-from-a-table) command by pruning the columns to read when searching for files to rewrite.

- [Fix](https://github.com/delta-io/delta/commit/6dbc55db53332c985e5bc8470df6c95106afac25) for a bug in the DynamoDB-based [S3 multi-cluster mode](https://docs.delta.io/2.1.1/delta-storage.html#setup-configuration-s3-multi-cluster) configuration. The previous version wrote an incorrect timestamp, which was used by [DynamoDB's TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) feature to clean up expired items. This timestamp value has been fixed and the table attribute renamed from `commitTime` to `expireTime`. If you already have TTL enabled, follow the migration steps for [Delta Lake 1.2.1, 2.0.0, or 2.1.0 to Delta Lake 2.0.1, 2.1.1 or above](https://docs.delta.io/latest/porting.html#delta-lake-1-2-1-2-0-0-or-2-1-0-to-delta-lake-2-0-1-2-1-1-or-above).

- [Fix](https://github.com/delta-io/delta/commit/b07257df) [nondeterministic](https://github.com/delta-io/delta/issues/527) behavior during MERGE when working with sources that are nondeterministic.

- [Remove](https://github.com/delta-io/delta/commit/89384632) the restrictions for using Delta tables with column mapping in certain Streaming + CDF cases. Earlier we used to block Streaming+CDF if the Delta table has column mapping enabled even though it doesn't contain any RENAME or DROP columns.

- [Improve](https://github.com/delta-io/delta/commit/38f146b3) the monitoring of the Delta state construction queries (other queries run as part of planning) by making them visible in the Spark UI.

- [Support](https://github.com/delta-io/delta/commit/ddc36911) for multiple `where()` calls in Optimize scala/python API.

- [Support](https://github.com/delta-io/delta/commit/ee3917fc) for passing Hadoop configurations via DeltaTable API.

- [Support](https://github.com/delta-io/delta/commit/3e8d2d16) partition column names starting with `.` or `_` in CONVERT TO DELTA command.

- Improvements to metrics in table history:

  - [Fix](https://github.com/delta-io/delta/commit/5d22a38d) a metric in MERGE command.
  
  - [Source type](https://github.com/delta-io/delta/commit/ac13fcb0) metric for CONVERT TO DELTA.
  
  - [Metrics](https://github.com/delta-io/delta/commit/2118e64b) for DELETE on partitions.
  
  - [More](https://github.com/delta-io/delta/commit/fd503d80) vacuum stats.

- [Fix](https://github.com/delta-io/delta/commit/7e876792efdd92a85aa3f7b81d81f34c8b276d7b) for accidental protocol downgrades with [RESTORE](https://docs.delta.io/latest/delta-utility.html#restore-a-delta-table-to-an-earlier-state) command. Until now, RESTORE TABLE might downgrade the protocol version of the table, which could have resulted in inconsistent reads with time travel. With this fix, the protocol version is never downgraded from the current one.

- [Fix](https://github.com/delta-io/delta/commit/943e1531) a bug in `MERGE INTO` when there are multiple `UPDATE` clauses and one of the UPDATEs is with a schema evolution.

- [Fix](https://github.com/delta-io/delta/commit/68c8e183) a bug where sometimes active `SparkSession` object isn't found when using Delta APIs.

- [Fix](https://github.com/delta-io/delta/commit/951a97d3) an issue where partition schema couldn't be set during the initial commit.

- [Catch](https://github.com/delta-io/delta/commit/e5a7cd05) exceptions when writing `last_checkpoint` file fails.

- [Fix](https://github.com/delta-io/delta/commit/29d3a092) an issue when restarting a streaming query with `AvailableNow` trigger on a Delta table.

- [Fix](https://github.com/delta-io/delta/commit/0bbec372) an issue with CDF and Streaming where the offset isn't correctly updated when there are no data changes.

Check the source and full release notes on [GitHub at delta-io/delta](https://github.com/delta-io/delta/releases).

## Default-level packages for Java/Scala

The following table lists all the default level packages for Java/Scala and their respective versions.

| **GroupId**                       | **ArtifactId**                              | **Version**                 |
|-----------------------------------|---------------------------------------------|-----------------------------|
| com.aliyun                        | aliyun-java-sdk-core                        | 4.5.10                      |
| com.aliyun                        | aliyun-java-sdk-kms                         | 2.11.0                      |
| com.aliyun                        | aliyun-java-sdk-ram                         | 3.1.0                       |
| com.aliyun                        | aliyun-sdk-oss                              | 3.13.0                      |
| com.amazonaws                     | aws-java-sdk-bundle                         | 1.11.1026                   |
| com.chuusai                       | shapeless_2.12                              | 2.3.7                       |
| com.esotericsoftware              | kryo-shaded                                 | 4.0.2                       |
| com.esotericsoftware              | minlog                                      | 1.3.0                       |
| com.fasterxml.jackson             | jackson-annotations-2.13.4.jar              |                             |
| com.fasterxml.jackson             | jackson-core                                | 2.13.4                      |
| com.fasterxml.jackson             | jackson-core-asl                            | 1.9.13                      |
| com.fasterxml.jackson             | jackson-databind                            | 2.13.4.1                    |
| com.fasterxml.jackson             | jackson-dataformat-cbor                     | 2.13.4                      |
| com.fasterxml.jackson             | jackson-mapper-asl                          | 1.9.13                      |
| com.fasterxml.jackson             | jackson-module-scala_2.12                   | 2.13.4                      |
| com.github.joshelser              | dropwizard-metrics-hadoop-metrics2-reporter | 0.1.2                       |
| com.github.wendykierp             | JTransforms                                 | 3.1                         |
| com.google.code.findbugs          | jsr305                                      | 3.0.0                       |
| com.google.code.gson              | gson                                        | 2.8.6                       |
| com.google.flatbuffers            | flatbuffers-java                            | 1.12.0                      |
| com.google.guava                  | guava                                       | 14.0.1                      |
| com.google.protobuf               | protobuf-java                               | 2.5.0                       |
| com.googlecode.json-simple        | json-simple                                 | 1.1.1                       |
| com.jcraft                        | jsch                                        | 0.1.54                      |
| com.jolbox                        | bonecp                                      | 0.8.0.RELEASE               |
| com.linkedin.isolation-forest     | isolation-forest_3.2.0_2.12                 | 2.0.8                       |
| com.ning                          | compress-lzf                                | 1.1                         |
| com.qcloud                        | cos_api-bundle                              | 5.6.19                      |
| com.sun.istack                    | istack-commons-runtime                      | 3.0.8                       |
| com.tdunning                      | json                                        | 1.8                         |
| com.thoughtworks.paranamer        | paranamer                                   | 2.8                         |
| com.twitter                       | chill-java                                  | 0.10.0                      |
| com.twitter                       | chill_2.12                                  | 0.10.0                      |
| com.typesafe                      | config                                      | 1.3.4                       |
| com.zaxxer                        | HikariCP                                    | 2.5.1                       |
| commons-cli                       | commons-cli                                 | 1.5.0                       |
| commons-codec                     | commons-codec                               | 1.15                        |
| commons-collections               | commons-collections                         | 3.2.2                       |
| commons-dbcp                      | commons-dbcp                                | 1.4                         |
| commons-io                        | commons-io                                  | 2.11.0                      |
| commons-lang                      | commons-lang                                | 2.6                         |
| commons-logging                   | commons-logging                             | 1.1.3                       |
| commons-pool                      | commons-pool                                | 1.5.4.jar                   |
| dev.ludovic.netlib                | arpack                                      | 2.2.1                       |
| dev.ludovic.netlib                | blas                                        | 2.2.1                       |
| dev.ludovic.netlib                | lapack                                      | 2.2.1                       |
| io.airlift                        | aircompressor                               | 0.21                        |
| io.dropwizard.metrics             | metrics-core                                | 4.2.7                       |
| io.dropwizard.metrics             | metrics-graphite                            | 4.2.7                       |
| io.dropwizard.metrics             | metrics-jmx                                 | 4.2.7                       |
| io.dropwizard.metrics             | metrics-json                                | 4.2.7                       |
| io.dropwizard.metrics             | metrics-jvm                                 | 4.2.7                       |
| io.netty                          | netty-all                                   | 4.1.74.Final                |
| io.netty                          | netty-buffer                                | 4.1.74.Final                |
| io.netty                          | netty-codec                                 | 4.1.74.Final                |
| io.netty                          | netty-common                                | 4.1.74.Final                |
| io.netty                          | netty-handler                               | 4.1.74.Final                |
| io.netty                          | netty-resolver                              | 4.1.74.Final                |
| io.netty                          | netty-tcnative-classes                      | 2.0.48.Final                |
| io.netty                          | netty-transport                             | 4.1.74.Final                |
| io.netty                          | netty-transport-classes-epoll               | 4.1.74.Final                |
| io.netty                          | netty-transport-classes-kqueue              | 4.1.74.Final                |
| io.netty                          | netty-transport-native-epoll                | 4.1.74.Final-linux-aarch_64 |
| io.netty                          | netty-transport-native-epoll                | 4.1.74.Final-linux-x86_64   |
| io.netty                          | netty-transport-native-kqueue               | 4.1.74.Final-osx-aarch_64   |
| io.netty                          | netty-transport-native-kqueue               | 4.1.74.Final-osx-x86_64     |
| io.netty                          | netty-transport-native-unix-common          | 4.1.74.Final                |
| io.opentracing                    | opentracing-api                             | 0.33.0                      |
| io.opentracing                    | opentracing-noop                            | 0.33.0                      |
| io.opentracing                    | opentracing-util                            | 0.33.0                      |
| jakarta.annotation                | jakarta.annotation-api                      | 1.3.5                       |
| jakarta.inject                    | jakarta.inject                              | 2.6.1                       |
| jakarta.servlet                   | jakarta.servlet-api                         | 4.0.3                       |
| jakarta.validation-api            | 2.0.2                                       |                             |
| jakarta.ws.rs                     | jakarta.ws.rs-api                           | 2.1.6                       |
| jakarta.xml.bind                  | jakarta.xml.bind-api                        | 2.3.2                       |
| javax.activation                  | activation                                  | 1.1.1                       |
| javax.jdo                         | jdo-api                                     | 3.0.1                       |
| javax.transaction                 | jta                                         | 1.1                         |
| javax.xml.bind                    | jaxb-api                                    | 2.2.11                      |
| javolution                        | javolution                                  | 5.5.1                       |
| jline                             | jline                                       | 2.14.6                      |
| joda-time                         | joda-time                                   | 2.10.13                     |
| net.razorvine                     | pickle                                      | 1.2                         |
| net.sf.jpam                       | jpam                                        | 1.1                         |
| net.sf.opencsv                    | opencsv                                     | 2.3                         |
| net.sf.py4j                       | py4j                                        | 0.10.9.5                    |
| net.sourceforge.f2j               | arpack_combined_all                         | 0.1                         |
| org.antlr                         | ST4                                         | 4.0.4                       |
| org.antlr                         | antlr-runtime                               | 3.5.2                       |
| org.antlr                         | antlr4-runtime                              | 4.8                         |
| org.apache.arrow                  | arrow-format                                | 7.0.0                       |
| org.apache.arrow                  | arrow-memory-core                           | 7.0.0                       |
| org.apache.arrow                  | arrow-memory-netty                          | 7.0.0                       |
| org.apache.arrow                  | arrow-vector                                | 7.0.0                       |
| org.apache.avro                   | avro                                        | 1.11.0                      |
| org.apache.avro                   | avro-ipc                                    | 1.11.0                      |
| org.apache.avro                   | avro-mapred                                 | 1.11.0                      |
| org.apache.commons                | commons-collections4                        | 4.4                         |
| org.apache.commons                | commons-compress                            | 1.21                        |
| org.apache.commons                | commons-crypto                              | 1.1.0                       |
| org.apache.commons                | commons-lang3                               | 3.12.0                      |
| org.apache.commons                | commons-math3                               | 3.6.1                       |
| org.apache.commons                | commons-pool2                               | 2.11.1                      |
| org.apache.commons                | commons-text                                | 1.10.0                      |
| org.apache.curator                | curator-client                              | 2.13.0                      |
| org.apache.curator                | curator-framework                           | 2.13.0                      |
| org.apache.curator                | curator-recipes                             | 2.13.0                      |
| org.apache.derby                  | derby                                       | 10.14.2.0                   |
| org.apache.hadoop                 | hadoop-aliyun                               | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-annotations                          | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-aws                                  | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-azure                                | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-azure-datalake                       | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-client-api                           | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-client-runtime                       | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-cloud-storage                        | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-cos                                  | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-openstack                            | 3.3.3.5.2-90111858          |
| org.apache.hadoop                 | hadoop-shaded-guava                         | 1.1.1                       |
| org.apache.hadoop                 | hadoop-yarn-server-web-proxy                | 3.3.3.5.2-90111858          |
| org.apache.hive                   | hive-beeline                                | 2.3.9                       |
| org.apache.hive                   | hive-cli                                    | 2.3.9                       |
| org.apache.hive                   | hive-common                                 | 2.3.9                       |
| org.apache.hive                   | hive-exec                                   | 2.3.9                       |
| org.apache.hive                   | hive-jdbc                                   | 2.3.9                       |
| org.apache.hive                   | hive-llap-common                            | 2.3.9                       |
| org.apache.hive                   | hive-metastore                              | 2.3.9                       |
| org.apache.hive                   | hive-serde                                  | 2.3.9                       |
| org.apache.hive                   | hive-service-rpc                            | 3.1.2                       |
| org.apache.hive                   | hive-shims-0.23                             | 2.3.9                       |
| org.apache.hive                   | hive-shims                                  | 2.3.9                       |
| org.apache.hive                   | hive-shims-common                           | 2.3.9                       |
| org.apache.hive                   | hive-shims-scheduler                        | 2.3.9                       |
| org.apache.hive                   | hive-storage-api                            | 2.7.2                       |
| org.apache.hive                   | hive-vector-code-gen                        | 2.3.9                       |
| org.apache.httpcomponents         | httpclient                                  | 4.5.13                      |
| org.apache.httpcomponents         | httpcore                                    | 4.4.14                      |
| org.apache.httpcomponents         | httpmime                                    | 4.5.13                      |
| org.apache.httpcomponents.client5 | httpclient5                                 | 5.1.3                       |
| org.apache.ivy                    | ivy                                         | 2.5.1                       |
| org.apache.kafka                  | kafka-clients                               | 2.8.1                       |
| org.apache.logging.log4j          | log4j-1.2-api                               | 2.17.2                      |
| org.apache.logging.log4j          | log4j-api                                   | 2.17.2                      |
| org.apache.logging.log4j          | log4j-core                                  | 2.17.2                      |
| org.apache.logging.log4j          | log4j-slf4j-impl                            | 2.17.2                      |
| org.apache.orc                    | orc-core                                    | 1.7.6                       |
| org.apache.orc                    | orc-mapreduce                               | 1.7.6                       |
| org.apache.orc                    | orc-shims                                   | 1.7.6                       |
| org.apache.parquet                | parquet-column                              | 1.12.3                      |
| org.apache.parquet                | parquet-common                              | 1.12.3                      |
| org.apache.parquet                | parquet-encoding                            | 1.12.3                      |
| org.apache.parquet                | parquet-format-structures                   | 1.12.3                      |
| org.apache.parquet                | parquet-hadoop                              | 1.12.3                      |
| org.apache.parquet                | parquet-jackson                             | 1.12.3                      |
| org.apache.qpid                   | proton-j                                    | 0.33.8                      |
| org.apache.thrift                 | libfb303                                    | 0.9.3                       |
| org.apache.thrift                 | libthrift                                   | 0.12.0                      |
| org.apache.yetus                  | audience-annotations                        | 0.5.0                       |
| org.apiguardian                   | apiguardian-api                             | 1.1.0                       |
| org.codehaus.janino               | commons-compiler                            | 3.0.16                      |
| org.codehaus.janino               | janino                                      | 3.0.16                      |
| org.codehaus.jettison             | jettison                                    | 1.1                         |
| org.datanucleus                   | datanucleus-api-jdo                         | 4.2.4                       |
| org.datanucleus                   | datanucleus-core                            | 4.1.17                      |
| org.datanucleus                   | datanucleus-rdbms                           | 4.1.19                      |
| org.datanucleusjavax.jdo          | 3.2.0-m3                                    |                             |
| org.eclipse.jdt                   | core                                        | 1.1.2                       |
| org.eclipse.jetty                 | jetty-util                                  | 9.4.48.v20220622            |
| org.eclipse.jetty                 | jetty-util-ajax                             | 9.4.48.v20220622            |
| org.fusesource.leveldbjni         | leveldbjni-all                              | 1.8                         |
| org.glassfish.hk2                 | hk2-api                                     | 2.6.1                       |
| org.glassfish.hk2                 | hk2-locator                                 | 2.6.1                       |
| org.glassfish.hk2                 | hk2-utils                                   | 2.6.1                       |
| org.glassfish.hk2                 | osgi-resource-locator                       | 1.0.3                       |
| org.glassfish.hk2.external        | aopalliance-repackaged                      | 2.6.1                       |
| org.glassfish.jaxb                | jaxb-runtime                                | 2.3.2                       |
| org.glassfish.jersey.containers   | jersey-container-servlet                    | 2.36                        |
| org.glassfish.jersey.containers   | jersey-container-servlet-core               | 2.36                        |
| org.glassfish.jersey.core         | jersey-client                               | 2.36                        |
| org.glassfish.jersey.core         | jersey-common                               | 2.36                        |
| org.glassfish.jersey.core         | jersey-server                               | 2.36                        |
| org.glassfish.jersey.inject       | jersey-hk2                                  | 2.36                        |
| org.ini4j                         | ini4j                                       | 0.5.4                       |
| org.javassist                     | javassist                                   | 3.25.0-GA                   |
| org.javatuples                    | javatuples                                  | 1.2                         |
| org.jdom                          | jdom2                                       | 2.0.6                       |
| org.jetbrains                     | annotations                                 | 17.0.0                      |
| org.jodd                          | jodd-core                                   | 3.5.2                       |
| org.json4s                        | json4s-ast_2.12                             | 3.7.0-M11                   |
| org.json4s                        | json4s-core_2.12                            | 3.7.0-M11                   |
| org.json4s                        | json4s-jackson_2.12                         | 3.7.0-M11                   |
| org.json4s                        | json4s-scalap_2.12                          | 3.7.0-M11                   |
| org.junit.jupiter                 | junit-jupiter                               | 5.5.2                       |
| org.junit.jupiter                 | junit-jupiter-api                           | 5.5.2                       |
| org.junit.jupiter                 | junit-jupiter-engine                        | 5.5.2                       |
| org.junit.jupiter                 | junit-jupiter-params                        | 5.5.2                       |
| org.junit.platform                | junit-platform-commons                      | 1.5.2                       |
| org.junit.platform                | junit-platform-engine                       | 1.5.2                       |
| org.lz4                           | lz4-java                                    | 1.8.0                       |
| org.objenesis                     | objenesis                                   | 3.2                         |
| org.openpnp                       | opencv                                      | 3.2.0-1                     |
| org.opentest4j                    | opentest4j                                  | 1.2.0                       |
| org.postgresql                    | postgresql                                  | 42.2.9                      |
| org.roaringbitmap                 | RoaringBitmap                               | 0.9.25                      |
| org.roaringbitmap                 | shims                                       | 0.9.25                      |
| org.rocksdb                       | rocksdbjni                                  | 6.20.3                      |
| org.scala-lang                    | scala-compiler                              | 2.12.15                     |
| org.scala-lang                    | scala-library                               | 2.12.15                     |
| org.scala-lang                    | scala-reflect                               | 2.12.15                     |
| org.scala-lang.modules            | scala-collection-compat_2.12                | 2.1.1                       |
| org.scala-lang.modules            | scala-java8-compat_2.12                     | 0.9.0                       |
| org.scala-lang.modules            | scala-parser-combinators_2.12               | 1.1.2                       |
| org.scala-lang.modules            | scala-xml_2.12                              | 1.2.0                       |
| org.scalactic                     | scalactic_2.12                              | 3.2.14                      |
| org.scalanlp                      | breeze-macros_2.12                          | 1.2                         |
| org.scalanlp                      | breeze_2.12                                 | 1.2                         |
| org.slf4j                         | jcl-over-slf4j                              | 1.7.32                      |
| org.slf4j                         | jul-to-slf4j                                | 1.7.32                      |
| org.slf4j                         | slf4j-api                                   | 1.7.32                      |
| org.typelevel                     | algebra_2.12                                | 2.0.1                       |
| org.typelevel                     | cats-kernel_2.12                            | 2.1.1                       |
| org.typelevel                     | spire-macros_2.12                           | 0.17.0                      |
| org.typelevel                     | spire-platform_2.12                         | 0.17.0                      |
| org.typelevel                     | spire-util_2.12                             | 0.17.0                      |
| org.xerial.snappy                 | snappy-java                                 | 1.1.8.4                     |
| oro                               | oro                                         | 2.0.8                       |
| pl.edu.icm                        | JLargeArrays                                | 1.5                         |

## Default-level packages for Python

The following table lists all the default level packages for Python and their respective versions.

| **Library**                   | **Version** | **Library**              | **Version**  | **Library**             | **Version** |
|-------------------------------|-------------|--------------------------|--------------|-------------------------|-------------|
| _libgcc_mutex                 | 0.1         | ipykernel                | 6.22.0       | pickleshare             | 0.7.5       |
| _openmp_mutex                 | 4.5         | ipython                  | 8.9.0        | pillow                  | 9.4.0       |
| _py-xgboost-mutex             | 2.0         | ipywidgets               | 8.0.4        | pip                     | 23.0.1      |
| absl-py                       | 1.4.0       | isodate                  | 0.6.1        | pixman                  | 0.40.0      |
| adal                          | 1.2.7       | itsdangerous             | 2.1.2        | pkginfo                 | 1.9.6       |
| adlfs                         | 2023.1.0    | jack                     | 1.9.22       | pkgutil-resolve-name    | 1.3.10      |
| aiohttp                       | 3.8.4       | jedi                     | 0.18.2       | platformdirs            | 3.2.0       |
| aiosignal                     | 1.3.1       | jeepney                  | 0.8.0        | plotly                  | 5.13.0      |
| alsa-lib                      | 1.2.8       | jinja2                   | 3.1.2        | ply                     | 3.11        |
| anyio                         | 3.6.2       | jmespath                 | 1.0.1        | pooch                   | 1.7.0       |
| argcomplete                   | 2.1.2       | joblib                   | 1.2.0        | portalocker             | 2.7.0       |
| argon2-cffi                   | 21.3.0      | jpeg                     | 9e           | pox                     | 0.3.2       |
| argon2-cffi-bindings          | 21.2.0      | jsonpickle               | 2.2.0        | ppft                    | 1.7.6.6     |
| arrow-cpp                     | 11.0.0      | jsonschema               | 4.17.3       | prettytable             | 3.6.0       |
| asttokens                     | 2.2.1       | jupyter_client           | 8.1.0        | prometheus_client       | 0.16.0      |
| astunparse                    | 1.6.3       | jupyter_core             | 5.3.0        | prompt-toolkit          | 3.0.38      |
| async-timeout                 | 4.0.2       | jupyter_events           | 0.6.3        | protobuf                | 4.21.12     |
| atk-1.0                       | 2.38.0      | jupyter_server           | 2.2.1        | psutil                  | 5.9.4       |
| attr                          | 2.5.1       | jupyter_server_terminals | 0.4.4        | pthread-stubs           | 0.4         |
| attrs                         | 22.2.0      | jupyterlab_pygments      | 0.2.2        | ptyprocess              | 0.7.0       |
| aws-c-auth                    | 0.6.24      | jupyterlab_widgets       | 3.0.7        | pulseaudio              | 16.1        |
| aws-c-cal                     | 0.5.20      | keras                    | 2.11.0       | pulseaudio-client       | 16.1        |
| aws-c-common                  | 0.8.11      | keras-preprocessing      | 1.1.2        | pulseaudio-daemon       | 16.1        |
| aws-c-compression             | 0.2.16      | keyutils                 | 1.6.1        | pure_eval               | 0.2.2       |
| aws-c-event-stream            | 0.2.18      | kiwisolver               | 1.4.4        | py-xgboost              | 1.7.1       |
| aws-c-http                    | 0.7.4       | knack                    | 0.10.1       | py4j                    | 0.10.9.5    |
| aws-c-io                      | 0.13.17     | krb5                     | 1.20.1       | pyarrow                 | 11.0.0      |
| aws-c-mqtt                    | 0.8.6       | lame                     | 3.100        | pyasn1                  | 0.4.8       |
| aws-c-s3                      | 0.2.4       | lcms2                    | 2.15         | pyasn1-modules          | 0.2.7       |
| aws-c-sdkutils                | 0.1.7       | ld_impl_linux-64         | 2.40         | pycosat                 | 0.6.4       |
| aws-checksums                 | 0.1.14      | lerc                     | 4.0.0        | pycparser               | 2.21        |
| aws-crt-cpp                   | 0.19.7      | liac-arff                | 2.5.0        | pygments                | 2.14.0      |
| aws-sdk-cpp                   | 1.10.57     | libabseil                | 20220623.0   | pyjwt                   | 2.6.0       |
| azure-common                  | 1.1.28      | libaec                   | 1.0.6        | pynacl                  | 1.5.0       |
| azure-core                    | 1.26.4      | libarrow                 | 11.0.0       | pyodbc                  | 4.0.35      |
| azure-datalake-store          | 0.0.51      | libblas                  | 3.9.0        | pyopenssl               | 23.1.1      |
| azure-graphrbac               | 0.61.1      | libbrotlicommon          | 1.0.9        | pyparsing               | 3.0.9       |
| azure-identity                | 1.12.0      | libbrotlidec             | 1.0.9        | pyperclip               | 1.8.2       |
| azure-mgmt-authorization      | 3.0.0       | libbrotlienc             | 1.0.9        | pyqt                    | 5.15.7      |
| azure-mgmt-containerregistry  | 10.1.0      | libcap                   | 2.67         | pyqt5-sip               | 12.11.0     |
| azure-mgmt-core               | 1.4.0       | libcblas                 | 3.9.0        | pyrsistent              | 0.19.3      |
| azure-mgmt-keyvault           | 10.2.1      | libclang                 | 15.0.7       | pysocks                 | 1.7.1       |
| azure-mgmt-resource           | 21.2.1      | libclang13               | 15.0.7       | pyspark                 | 3.3.1       |
| azure-mgmt-storage            | 20.1.0      | libcrc32c                | 1.1.2        | python                  | 3.10.10     |
| azure-storage-blob            | 12.15.0     | libcups                  | 2.3.3        | python_abi              | 3.10        |
| azure-storage-file-datalake   | 12.9.1      | libcurl                  | 7.88.1       | python-dateutil         | 2.8.2       |
| azureml-core                  | 1.49.0      | libdb                    | 6.2.32       | python-fastjsonschema   | 2.16.3      |
| backcall                      | 0.2.0       | libdeflate               | 1.17         | python-flatbuffers      | 23.1.21     |
| backports                     | 1.0         | libebm                   | 0.3.1        | python-graphviz         | 0.20.1      |
| backports-tempfile            | 1.0         | libedit                  | 3.1.20191231 | python-json-logger      | 2.0.7       |
| backports-weakref             | 1.0.post1   | libev                    | 4.33         | pytorch                 | 1.13.1      |
| backports.functools_lru_cache | 1.6.4       | libevent                 | 2.1.10       | pytz                    | 2022.7.1    |
| bcrypt                        | 3.2.2       | libexpat                 | 2.5.0        | pyu2f                   | 0.1.5       |
| beautifulsoup4                | 4.11.2      | libffi                   | 3.4.2        | pywin32-on-windows      | 0.1.0       |
| bleach                        | 6.0.0       | libflac                  | 1.4.2        | pyyaml                  | 6.0         |
| blinker                       | 1.6.1       | libgcc-ng                | 12.2.0       | pyzmq                   | 25.0.2      |
| brotli                        | 1.0.9       | libgcrypt                | 1.10.1       | qt-main                 | 5.15.8      |
| brotli-bin                    | 1.0.9       | libgd                    | 2.3.3        | re2                     | 2023.02.01  |
| brotli-python                 | 1.0.9       | libgfortran-ng           | 12.2.0       | readline                | 8.2         |
| brotlipy                      | 0.7.0       | libgfortran5             | 12.2.0       | regex                   | 2022.10.31  |
| bzip2                         | 1.0.8       | libglib                  | 2.74.1       | requests                | 2.28.2      |
| c-ares                        | 1.18.1      | libgoogle-cloud          | 2.7.0        | requests-oauthlib       | 1.3.1       |
| ca-certificates               | 2022.12.7   | libgpg-error             | 1.46         | rfc3339-validator       | 0.1.4       |
| cached_property               | 1.5.2       | libgrpc                  | 1.51.1       | rfc3986-validator       | 0.1.1       |
| cached-property               | 1.5.2       | libhwloc                 | 2.9.0        | rsa                     | 4.9         |
| cachetools                    | 5.3.0       | libiconv                 | 1.17         | ruamel_yaml             | 0.15.80     |
| cairo                         | 1.16.0      | liblapack                | 3.9.0        | ruamel.yaml             | 0.17.21     |
| certifi                       | 2022.12.7   | libllvm11                | 11.1.0       | ruamel.yaml.clib        | 0.2.7       |
| cffi                          | 1.15.1      | libllvm15                | 15.0.7       | s2n                     | 1.3.37      |
| charset-normalizer            | 2.1.1       | libnghttp2               | 1.52.0       | salib                   | 1.4.7       |
| click                         | 8.1.3       | libnsl                   | 2.0.0        | scikit-learn            | 1.2.0       |
| cloudpickle                   | 2.2.1       | libogg                   | 1.3.4        | scipy                   | 1.10.1      |
| colorama                      | 0.4.6       | libopenblas              | 0.3.21       | seaborn                 | 0.12.2      |
| comm                          | 0.1.3       | libopus                  | 1.3.1        | seaborn-base            | 0.12.2      |
| conda-package-handling        | 2.0.2       | libpng                   | 1.6.39       | secretstorage           | 3.3.3       |
| conda-package-streaming       | 0.7.0       | libpq                    | 15.2         | send2trash              | 1.8.0       |
| configparser                  | 5.3.0       | libprotobuf              | 3.21.12      | setuptools              | 67.6.1      |
| contextlib2                   | 21.6.0      | librsvg                  | 2.54.4       | shap                    | 0.41.0      |
| contourpy                     | 1.0.7       | libsndfile               | 1.2.0        | sip                     | 6.7.7       |
| cryptography                  | 40.0.1      | libsodium                | 1.0.18       | six                     | 1.16.0      |
| cycler                        | 0.11.0      | libsqlite                | 3.40.0       | sleef                   | 3.5.1       |
| dash                          | 2.9.2       | libssh2                  | 1.10.0       | slicer                  | 0.0.7       |
| dash_cytoscape                | 0.2.0       | libstdcxx-ng             | 12.2.0       | smmap                   | 3.0.5       |
| dash-core-components          | 2.0.0       | libsystemd0              | 253          | snappy                  | 1.1.10      |
| dash-html-components          | 2.0.0       | libthrift                | 0.18.0       | sniffio                 | 1.3.0       |
| dash-table                    | 5.0.0       | libtiff                  | 4.5.0        | soupsieve               | 2.3.2.post1 |
| databricks-cli                | 0.17.6      | libtool                  | 2.4.7        | sqlalchemy              | 2.0.9       |
| dbus                          | 1.13.6      | libudev1                 | 253          | sqlparse                | 0.4.3       |
| debugpy                       | 1.6.7       | libutf8proc              | 2.8.0        | stack_data              | 0.6.2       |
| decorator                     | 5.1.1       | libuuid                  | 2.38.1       | statsmodels             | 0.13.5      |
| defusedxml                    | 0.7.1       | libuv                    | 1.44.2       | synapseml-mlflow        | 1.0.14      |
| dill                          | 0.3.6       | libvorbis                | 1.3.7        | synapseml-utils         | 1.0.7       |
| distlib                       | 0.3.6       | libwebp                  | 1.2.4        | tabulate                | 0.9.0       |
| docker-py                     | 6.0.0       | libwebp-base             | 1.2.4        | tbb                     | 2021.8.0    |
| entrypoints                   | 0.4         | libxcb                   | 1.13         | tenacity                | 8.2.2       |
| et_xmlfile                    | 1.1.0       | libxgboost               | 1.7.1        | tensorboard             | 2.11.2      |
| executing                     | 1.2.0       | libxkbcommon             | 1.5.0        | tensorboard-data-server | 0.6.1       |
| expat                         | 2.5.0       | libxml2                  | 2.10.3       | tensorboard-plugin-wit  | 1.8.1       |
| fftw                          | 3.3.10      | libxslt                  | 1.1.37       | tensorflow              | 2.11.0      |
| filelock                      | 3.11.0      | libzlib                  | 1.2.13       | tensorflow-base         | 2.11.0      |
| flask                         | 2.2.3       | lightgbm                 | 3.3.3        | tensorflow-estimator    | 2.11.0      |
| flask-compress                | 1.13        | lime                     | 0.2.0.1      | termcolor               | 2.2.0       |
| flatbuffers                   | 22.12.06    | llvm-openmp              | 16.0.1       | terminado               | 0.17.1      |
| flit-core                     | 3.8.0       | llvmlite                 | 0.39.1       | threadpoolctl           | 3.1.0       |
| fluent-logger                 | 0.10.0      | lxml                     | 4.9.2        | tinycss2                | 1.2.1       |
| font-ttf-dejavu-sans-mono     | 2.37        | lz4-c                    | 1.9.4        | tk                      | 8.6.12      |
| font-ttf-inconsolata          | 3.000       | markdown                 | 3.4.1        | toml                    | 0.10.2      |
| font-ttf-source-code-pro      | 2.038       | markupsafe               | 2.1.2        | toolz                   | 0.12.0      |
| font-ttf-ubuntu               | 0.83        | matplotlib               | 3.6.3        | tornado                 | 6.2         |
| fontconfig                    | 2.14.2      | matplotlib-base          | 3.6.3        | tqdm                    | 4.65.0      |
| fonts-conda-ecosystem         | 1           | matplotlib-inline        | 0.1.6        | traitlets               | 5.9.0       |
| fonts-conda-forge             | 1           | mistune                  | 2.0.5        | treeinterpreter         | 0.2.2       |
| fonttools                     | 4.39.3      | mkl                      | 2022.2.1     | typed-ast               | 1.4.3       |
| freetype                      | 2.12.1      | mlflow-skinny            | 2.1.1        | typing_extensions       | 4.5.0       |
| fribidi                       | 1.0.10      | mpg123                   | 1.31.3       | typing-extensions       | 4.5.0       |
| frozenlist                    | 1.3.3       | msal                     | 1.21.0       | tzdata                  | 2023c       |
| fsspec                        | 2023.4.0    | msal_extensions          | 1.0.0        | unicodedata2            | 15.0.0      |
| gast                          | 0.4.0       | msgpack                  | 1.0.5        | unixodbc                | 2.3.10      |
| gdk-pixbuf                    | 2.42.10     | msrest                   | 0.7.1        | urllib3                 | 1.26.14     |
| geographiclib                 | 1.52        | msrestazure              | 0.6.4        | virtualenv              | 20.19.0     |
| geopy                         | 2.3.0       | multidict                | 6.0.4        | wcwidth                 | 0.2.6       |
| gettext                       | 0.21.1      | multiprocess             | 0.70.14      | webencodings            | 0.5.1       |
| gevent                        | 22.10.2     | munkres                  | 1.1.4        | websocket-client        | 1.5.1       |
| gflags                        | 2.2.2       | mypy                     | 0.780        | werkzeug                | 2.2.3       |
| giflib                        | 5.2.1       | mypy-extensions          | 0.4.4        | wheel                   | 0.40.0      |
| gitdb                         | 4.0.10      | mysql-common             | 8.0.32       | widgetsnbextension      | 4.0.7       |
| gitpython                     | 3.1.31      | mysql-libs               | 8.0.32       | wrapt                   | 1.15.0      |
| glib                          | 2.74.1      | nbclient                 | 0.7.3        | xcb-util                | 0.4.0       |
| glib-tools                    | 2.74.1      | nbconvert-core           | 7.3.0        | xcb-util-image          | 0.4.0       |
| glog                          | 0.6.0       | nbformat                 | 5.8.0        | xcb-util-keysyms        | 0.4.0       |
| google-auth                   | 2.17.2      | ncurses                  | 6.3          | xcb-util-renderutil     | 0.3.9       |
| google-auth-oauthlib          | 0.4.6       | ndg-httpsclient          | 0.5.1        | xcb-util-wm             | 0.4.1       |
| google-pasta                  | 0.2.0       | nest-asyncio             | 1.5.6        | xgboost                 | 1.7.1       |
| graphite2                     | 1.3.13      | nspr                     | 4.35         | xkeyboard-config        | 2.38        |
| graphviz                      | 2.50.0      | nss                      | 3.89         | xorg-kbproto            | 1.0.7       |
| greenlet                      | 2.0.2       | numba                    | 0.56.4       | xorg-libice             | 1.0.10      |
| grpcio                        | 1.51.1      | numpy                    | 1.23.5       | xorg-libsm              | 1.2.3       |
| gson                          | 0.0.3       | oauthlib                 | 3.2.2        | xorg-libx11             | 1.8.4       |
| gst-plugins-base              | 1.22.0      | openjpeg                 | 2.5.0        | xorg-libxau             | 1.0.9       |
| gstreamer                     | 1.22.0      | openpyxl                 | 3.1.0        | xorg-libxdmcp           | 1.1.3       |
| gstreamer-orc                 | 0.4.33      | openssl                  | 3.1.0        | xorg-libxext            | 1.3.4       |
| gtk2                          | 2.24.33     | opt_einsum               | 3.3.0        | xorg-libxrender         | 0.9.10      |
| gts                           | 0.7.6       | orc                      | 1.8.2        | xorg-renderproto        | 0.11.1      |
| h5py                          | 3.8.0       | packaging                | 21.3         | xorg-xextproto          | 7.3.0       |
| harfbuzz                      | 6.0.0       | pandas                   | 1.5.3        | xorg-xproto             | 7.0.31      |
| hdf5                          | 1.14.0      | pandasql                 | 0.7.3        | xz                      | 5.2.6       |
| html5lib                      | 1.1         | pandocfilters            | 1.5.0        | yaml                    | 0.2.5       |
| humanfriendly                 | 10.0        | pango                    | 1.50.14      | yarl                    | 1.8.2       |
| icu                           | 70.1        | paramiko                 | 2.12.0       | zeromq                  | 4.3.4       |
| idna                          | 3.4         | parquet-cpp              | 1.5.1        | zipp                    | 3.15.0      |
| imageio                       | 2.25.0      | parso                    | 0.8.3        | zlib                    | 1.2.13      |
| importlib_metadata            | 5.2.0       | pathos                   | 0.3.0        | zope.event              | 4.6         |
| importlib_resources           | 5.12.0      | pathspec                 | 0.11.1       | zope.interface          | 6.0         |
| importlib-metadata            | 5.2.0       | patsy                    | 0.5.3        | zstandard               | 0.19.0      |
| interpret                     | 0.3.1       | pcre2                    | 10.40        | zstd                    | 1.5.2       |
| interpret-core                | 0.3.1       | pexpect                  | 4.8.0        |                         |             |

## Default-level packages for R

The following table lists all the default level packages for R and their respective versions.

| **Library**                   | **Version** | **Library**              | **Version**  | **Library**             | **Version** |
|-------------------------------|-------------|--------------------------|--------------|-------------------------|-------------|
| askpass       | 1.1         | highcharter  | 0.9.4       |    readr     | 2.1.3       |
| assertthat    | 0.2.1       |    highr     | 0.9         |    readxl    | 1.4.1       |
| backports     | 1.4.1       |     hms      | 1.1.2       |   recipes    | 1.0.3       |
| base64enc     | 0.1-3       |  htmltools   | 0.5.3       |   rematch    | 1.0.1       |
| bit           | 4.0.5       | htmlwidgets  | 1.5.4       |   rematch2   | 2.1.2       |
| bit64         | 4.0.5       |   httpcode   | 0.3.0       |   remotes    | 2.4.2       |
| blob          | 1.2.3       |    httpuv    | 1.6.6       |    reprex    | 2.0.2       |
| brew          | 1.0-8       |     httr     | 1.4.4       |   reshape2   | 1.4.4       |
| brio          | 1.1.3       |     ids      | 1.0.1       |    rjson     | 0.2.21      |
| broom         | 1.0.1       |    igraph    | 1.3.5       |    rlang     | 1.0.6       |
| bslib         | 0.4.1       |    infer     | 1.0.3       |    rlist     | 0.4.6.2     |
| cachem        | 1.0.6       |     ini      | 0.3.1       |  rmarkdown   | 2.18        |
| callr         | 3.7.3       |    ipred     | 0.9-13      |    RODBC     | 1.3-19      |
| caret         | 6.0-93      |   isoband    | 0.2.6       |   roxygen2   | 7.2.2       |
| cellranger    | 1.1.0       |  iterators   | 1.0.14      |  rprojroot   | 2.0.3       |
| cli           | 3.4.1       |  jquerylib   | 0.1.4       |   rsample    | 1.1.0       |
| clipr         | 0.8.0       |   jsonlite   | 1.8.3       |  rstudioapi  | 0.14        |
| clock         | 0.6.1       |    knitr     | 1.41        |  rversions   | 2.1.2       |
| colorspace    | 2.0-3       |   labeling   | 0.4.2       |    rvest     | 1.0.3       |
| commonmark    | 1.8.1       |    later     | 1.3.0       |     sass     | 0.4.4       |
| config        | 0.3.1       |     lava     | 1.7.0       |    scales    | 1.2.1       |
| conflicted    | 1.1.0       |   lazyeval   | 0.2.2       |   selectr    | 0.4-2       |
| coro          | 1.0.3       |     lhs      | 1.1.5       | sessioninfo  | 1.2.2       |
| cpp11         | 0.4.3       |  lifecycle   | 1.0.3       |    shiny     | 1.7.3       |
| crayon        | 1.5.2       |   lightgbm   | 3.3.3       |    slider    | 0.3.0       |
| credentials   | 1.3.2       |   listenv    | 0.8.0       | sourcetools  | 0.1.7       |
| crosstalk     | 1.2.0       |    lobstr    | 1.1.2       |   sparklyr   | 1.7.8       |
| crul          | 1.3         |  lubridate   | 1.9.0       |   SQUAREM    | 2021.1      |
| curl          | 4.3.3       |   magrittr   | 2.0.3       |   stringi    | 1.7.8       |
| data.table    | 1.14.6      |     maps     | 3.4.1       |   stringr    | 1.4.1       |
| DBI           | 1.1.3       |   memoise    | 2.0.1       |     sys      | 3.4.1       |
| dbplyr        | 2.2.1       |     mime     | 0.12        | systemfonts  | 1.0.4       |
| desc          | 1.4.2       |    miniUI    | 0.1.1.1     |   testthat   | 3.1.5       |
| devtools      | 2.4.5       |  modeldata   | 1.0.1       | textshaping  | 0.3.6       |
| dials         | 1.1.0       |   modelenv   | 0.1.0       |    tibble    | 3.1.8       |
| DiceDesign    | 1.9         | ModelMetrics | 1.2.2.2     |  tidymodels  | 1.0.0       |
| diffobj       | 0.3.5       |    modelr    | 0.1.10      |    tidyr     | 1.2.1       |
| digest        | 0.6.30      |   munsell    | 0.5.0       |  tidyselect  | 1.2.0       |
| downlit       | 0.4.2       |   numDeriv   | 2016.8-1.1  |  tidyverse   | 1.3.2       |
| dplyr         | 1.0.10      |   openssl    | 2.0.4       |  timechange  | 0.1.1       |
| dtplyr        | 1.2.2       |  parallelly  | 1.32.1      |   timeDate   | 4021.106    |
| e1071         | 1.7-12      |   parsnip    | 1.0.3       |   tinytex    | 0.42        |
| ellipsis      | 0.3.2       |  patchwork   | 1.1.2       |    torch     | 0.9.0       |
| evaluate      | 0.18        |    pillar    | 1.8.1       |  triebeard   | 0.3.0       |
| fansi         | 1.0.3       |   pkgbuild   | 1.4.0       |     TTR      | 0.24.3      |
| farver        | 2.1.1       |  pkgconfig   | 2.0.3       |     tune     | 1.0.1       |
| fastmap       | 1.1.0       |   pkgdown    | 2.0.6       |     tzdb     | 0.3.0       |
| fontawesome   | 0.4.0       |   pkgload    | 1.3.2       |  urlchecker  | 1.0.1       |
| forcats       | 0.5.2       |    plotly    | 4.10.1      |   urltools   | 1.7.3       |
| foreach       | 1.5.2       |     plyr     | 1.8.8       |   usethis    | 2.1.6       |
| forge         | 0.2.0       |    praise    | 1.0.0       |     utf8     | 1.2.2       |
| fs            | 1.5.2       | prettyunits  | 1.1.1       |     uuid     | 1.1-0       |
| furrr         | 0.3.1       |     pROC     | 1.18.0      |    vctrs     | 0.5.1       |
| future        | 1.29.0      |   processx   | 3.8.0       | viridisLite  | 0.4.1       |
| future.apply  | 1.10.0      |   prodlim    | 2019.11.13  |    vroom     | 1.6.0       |
| gargle        | 1.2.1       |   profvis    | 0.3.7       |    waldo     | 0.4.0       |
| generics      | 0.1.3       |   progress   | 1.2.2       |     warp     | 0.2.0       |
| gert          | 1.9.1       |  progressr   | 0.11.0      |   whisker    | 0.4         |
| ggplot2       | 3.4.0       |   promises   | 1.2.0.1     |    withr     | 2.5.0       |
| gh            | 1.3.1       |    proxy     | 0.4-27      |  workflows   | 1.1.2       |
| gistr         | 0.9.0       |     pryr     | 0.1.5       | workflowsets | 1.0.0       |
| gitcreds      | 0.1.2       |      ps      | 1.7.2       |     xfun     | 0.35        |
| globals       | 0.16.2      |    purrr     | 0.3.5       |   xgboost    | 1.6.0.1     |
| glue          | 1.6.2       |   quantmod   | 0.4.20      |     XML      | 3.99-0.12   |
| googledrive   | 2.0.0       |     r2d3     | 0.2.6       |     xml2     | 1.3.3       |
| googlesheets4 | 1.0.1       |      R6      | 2.5.1       |    xopen     | 1.0.0       |
| gower         | 1.0.0       |     ragg     | 1.2.4       |    xtable    | 1.8-4       |
| GPfit         | 1.0-8       |   rappdirs   | 0.3.3       |     xts      | 0.12.2      |
| gtable        | 0.3.1       |    rbokeh    | 0.5.2       |     yaml     | 2.3.6       |
| hardhat       | 1.2.0       |  rcmdcheck   | 1.4.0       |  yardstick   | 1.1.0       |
| haven         | 2.5.1       | RColorBrewer | 1.1-3       |     zip      | 2.2.2       |
| hexbin        | 1.28.2      |     Rcpp     | 1.0.9       |     zoo      | 1.8-11      |

## Migration between different Apache Spark versions

Migrating your workloads to Fabric Runtime 1.1 (Apache Spark 3.3) from an older version of Apache Spark involves a series of steps to ensure a smooth migration. This guide outlines the necessary steps to help you migrate efficiently and effectively.

1. Review Fabric Runtime 1.1 release notes, including checking the components and default-level packages included into the runtime, to understand the new features and improvements.

1. Check compatibility of your current setup and all related libraries, including dependencies and integrations. Review the migration guides to identify potential breaking changes:

   - Review the [Spark Core migration guide](https://spark.apache.org/docs/latest/core-migration-guide.html).
   - Review the [SQL, Datasets and DataFrame migration guide](https://spark.apache.org/docs/latest/sql-migration-guide.html).
   - If your solution is Apache Spark Structure Streaming related, review the [Structured Streaming migration guide](https://spark.apache.org/docs/latest/ss-migration-guide.html).
   - If you use PySpark, reviewe the [Pyspark migration guide](https://spark.apache.org/docs/latest/api/python/migration_guide/pyspark_upgrade.html).
   - If you migrate code from Koalas to PySpark, review the [Koalas to pandas API on Spark migration guide](https://spark.apache.org/docs/latest/api/python/migration_guide/koalas_to_pyspark.html).

1. Move your workloads to Fabric and ensure that you have backups of your data and configuration files in case you need to revert to the previous version.

1. Update any dependencies that the new version of Apache Spark or other Fabric Runtime 1.1 related components might impact, including third-party libraries or connectors. Make sure to test the updated dependencies in a staging environment before deploying to production.

1. Update the Apache Spark configuration on your workload, including updating configuration settings, adjusting memory allocations, and modifying any deprecated configurations.

1. Modify your Apache Spark applications (notebooks and Apache Spark job definitions) to use the new APIs and features introduced in Fabric Runtime 1.1 and Apache Spark 3.3. You might need to update your code to accommodate any deprecated or removed APIs, and refactor your applications to take advantage of performance improvements and new functionalities.

1. Thoroughly test your updated applications in a staging environment to ensure compatibility and stability with Apache Spark 3.3. Perform performance testing, functional testing, and regression testing to identify and resolve any issues that might arise during the migration process.

1. After validating your applications in a staging environment, deploy the updated applications to your production environment. Monitor the performance and stability of your applications after the migration to identify any issues that need to be addressed.

1. Update your internal documentation and training materials to reflect the changes introduced in Fabric Runtime 1.1. Ensure that your team members are familiar with the new features and improvements to maximize the benefits of the migration.

## Related content

- Read about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
- [Runtime 1.2 (Spark 3.4, Java 11, Python 3.10, Delta Lake 2.4)](./runtime-1-2.md)
- [Runtime 1.3 (Spark 3.5, Java 11, Python 3.10, Delta Lake 3.0)](./runtime-1-3.md)
