---
title:  Fabric decision guide - copy activity, dataflow, or Spark
description: Review a reference table and some quick scenarios to help in choosing whether to use copy activity, dataflow, or Spark to work with your data in Fabric.
ms.reviewer: sngun
ms.author: scbradl
author: bradleyschacht
ms.topic: quickstart
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 5/12/2023
---

# Microsoft Fabric decision guide: copy activity, dataflow, or Spark

Use this reference guide and the example scenarios to help you in deciding whether you need a copy activity, a dataflow, or Spark for your Microsoft Fabric workloads.

## Copy activity, dataflow, and Spark properties

| | **Pipeline copy activity** | **Dataflow Gen 2** | **Spark** |
|---|:---:|:---:|:---:|
| **Use case** | Data lake and data warehouse migration,<br>data ingestion,<br>lightweight transformation | Data ingestion,<br>data transformation,<br>data wrangling,<br>data profiling | Data ingestion,<br>data transformation,<br>data processing,<br>data profiling |
| **Primary developer persona** | Data engineer,<br>data integrator | Data engineer,<br>data integrator,<br>business analyst | Data engineer,<br>data scientist,<br>data developer |
| **Primary developer skill set** | ETL,<br>SQL,<br>JSON | ETL,<br>M,<br>SQL | Spark (Scala, Python, Spark SQL, R) |
| **Code written** | No code,<br>low code | No code,<br>low code | Code |
| **Data volume** | Low to high | Low to high | Low to high |
| **Development interface** | Wizard,<br>canvas | Power query | Notebook,<br>Spark job definition |
| **Sources** | 30+ connectors | 150+ connectors | Hundreds of Spark libraries |
| **Destinations** | 18+ connectors | Lakehouse,<br>Azure SQL database,<br>Azure Data explorer,<br>Azure Synapse analytics | Hundreds of Spark libraries |
| **Transformation complexity** | Low:<br>lightweight - type conversion, column mapping, merge/split files, flatten hierarchy | Low to high:<br>300+ transformation functions | Low to high:<br>support for native Spark and open-source libraries |

Review the following three scenarios for help with choosing how to work with your data in Fabric.

## Scenario1

Leo, a data engineer, needs to ingest a large volume of data from external systems, both on-premises and cloud. These external systems include databases, file systems, and APIs. Leo doesn’t want to write and maintain code for each connector or data movement operation. He wants to follow the medallion layers best practices, with bronze, silver, and gold. Leo doesn't have any experience with Spark, so he prefers the drag and drop UI as much as possible, with minimal coding. And he also wants to process the data on a schedule.

The first step is to get the raw data into the bronze layer lakehouse from Azure data resources and various third party sources (like Snowflake Web, REST, AWS S3, GCS, etc.). He wants a consolidated lakehouse, so that all the data from various LOB, on-premises, and cloud sources reside in a single place. Leo reviews the options and selects **pipeline copy activity** as the appropriate choice for his raw binary copy. This pattern applies to both historical and incremental data refresh. With copy activity, Leo can load Gold data to a data warehouse with no code if the need arises and pipelines provide high scale data ingestion that can move petabyte-scale data. Copy activity is the best low-code and no-code choice to move petabytes of data to lakehouses and warehouses from varieties of sources, either ad-hoc or via a schedule.

## Scenario2

Mary is a data engineer with a deep knowledge of the multiple LOB analytic reporting requirements. An upstream team has successfully implemented a solution to migrate multiple LOB's historical and incremental data into a common lakehouse. Mary has been tasked with cleaning the data, applying business logics, and loading it into multiple destinations (such as Azure SQL DB, ADX, and a lakehouse) in preparation for their respective reporting teams.

Mary is an experienced Power Query user, and the data volume is in the low to medium range to achieve desired performance. Dataflows provide no-code or low-code interfaces for ingesting data from hundreds of data sources. With dataflows, you can transform data using 300+ data transformation options, and write the results into multiple destinations with an easy to use, highly visual user interface. Mary reviews the options and decides that it makes sense to use **Dataflow Gen 2** as her preferred transformation option.

## Scenario3

Adam is a data engineer working for a large retail company that uses a lakehouse to store and analyze its customer data. As part of his job, Adam is responsible for building and maintaining the data pipelines that extract, transform, and load data into the lakehouse. One of the company's business requirements is to perform customer review analytics to gain insights into their customers' experiences and improve their services.

Adam decides the best option is to use **Spark** to build the extract and transformation logic. Spark provides a distributed computing platform that can process large amounts of data in parallel. He writes a Spark application using Python or Scala, which reads structured, semi-structured, and unstructured data from OneLake for customer reviews and feedback. The application cleanses, transforms, and writes data to Delta tables in the lakehouse. The data is then ready to be used for downstream analytics.

## Related content

- [How to copy data using copy activity](../data-factory/copy-data-activity.md)
- [Quickstart: Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md)
- [How to create an Apache Spark job definition in Fabric](../data-engineering/create-spark-job-definition.md)
