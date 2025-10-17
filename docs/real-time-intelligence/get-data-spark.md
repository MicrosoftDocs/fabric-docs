---
title: Get data from Apache Spark
description: Learn how to get data from Apache Spark using the Kusto connector for Spark.
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
#customer intent: I want to learn how to get data from Apache Spark using the Kusto connector for Spark.
---
# Get data from Apache Spark

[Apache Spark](https://spark.apache.org/) is a unified analytics engine for large-scale data processing.

The Kusto connector for Spark is an [open source project](https://github.com/Azure/azure-kusto-spark) that can run on any Spark cluster. It implements data source and data sink for moving data across Azure Data Explorer and Spark clusters. Using an Eventhouse and Apache Spark, you can build fast and scalable applications targeting data driven scenarios. For example, machine learning (ML), Extract-Transform-Load (ETL), and Log Analytics. With the connector, Eventhouses become a valid data store for standard Spark source and sink operations, such as write, read, and writeStream.

You can write to Eventhouse via queued ingestion or streaming ingestion. Reading from Eventhouses supports column pruning and predicate pushdown, which filters the data in the Eventhouse, reducing the volume of transferred data.

This article describes how to install and configure the Spark connector and move data between an Eventhouse and Apache Spark clusters.

> [!NOTE]
> Although some of the examples below refer to an [Azure Databricks](/azure/databricks/) Spark cluster, the Spark connector does not take direct dependencies on Databricks or any other Spark distribution.

## Prerequisites

* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). This is used for authentication using Microsoft Entra ID.
* A [KQL database in Microsoft Fabric](create-database.md). Copy the URI of this database using the instructions in [Access an existing KQL database](access-database-copy-uri.md).
* A Spark cluster
* Install connector library:
    * Prebuilt libraries for [Spark 2.4+Scala 2.11 or Spark 3+scala 2.12](https://github.com/Azure/azure-kusto-spark/releases) 
    * [Maven repo](https://mvnrepository.com/artifact/com.microsoft.azure.kusto/spark-kusto-connector)
* [Maven 3.x](https://maven.apache.org/download.cgi) installed

> [!TIP]
> Spark 2.3.x versions are also supported, but might require some changes in pom.xml dependencies.


[!INCLUDE [ingest-data-spark](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-spark.md)]

## Related content

* [Kusto Spark Connector GitHub repository](https://github.com/Azure/azure-kusto-spark/tree/master/docs)
* See the [sample code for Scala and Python](https://github.com/Azure/azure-kusto-spark/tree/master/samples/src/main)
