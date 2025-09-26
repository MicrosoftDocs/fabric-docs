---
title:  Fabric decision guide - copy activity, dataflow, Eventstream, or Spark
description: Review a reference table and some quick scenarios to help in choosing whether to use copy activity, dataflow, Eventstream, or Spark to work with your data in Fabric.
ms.reviewer: sngun
ms.author: chschmidt
author: christophermschmidt
ms.topic: quickstart
ms.custom:
ms.date: 06/04/2025
---

# Microsoft Fabric decision guide: copy activity, Copy job, dataflow, Eventstream, or Spark

Use this reference guide and the example scenarios to help you in deciding whether you need a copy activity, Copy job, a dataflow, an Eventstream, or Spark for your Microsoft Fabric workloads.

## Copy activity, Copy job, dataflow, Eventstream, and Spark properties

| | **Pipeline copy activity** | **Copy job** | **Dataflow Gen 2** | **Eventstream** | **Spark** |
|---|:---:|:---:|:---:|:---:|:---:|
| **Use case** | Data lake and data warehouse migration,<br>data ingestion,<br>lightweight transformation | Data Ingestion,<br>Incremental copy,<br>Replication,<br>Data Lake and Data Warehouse migration,<br>lightweight transformation  | Data ingestion,<br>data transformation,<br>data wrangling,<br>data profiling | event data ingestion,<br>event data transformation | Data ingestion,<br>data transformation,<br>data processing,<br>data profiling |
| **Primary developer persona** | Data engineer,<br>data integrator |Business Analyst,<br>Data Integrator,<br>Data Engineer| Data engineer,<br>data integrator,<br>business analyst | Data engineer,<br>data scientist,<br>data developer | Data integrator,<br>data engineer |
| **Primary developer skill set** | ETL,<br>SQL,<br>JSON |  ETL,<br>SQL,<br>JSON | ETL,<br>M,<br>SQL | SQL, JSON, messaging | Spark (Scala, Python, Spark SQL, R) |
| **Code written** | No code,<br>low code | No code,<br>low code | No code,<br>low code | No Code, <br>low code | Code |
| **Data volume** | Low to high | Low to high | Low to high | Medium to High | Low to high |
| **Development interface** | Wizard,<br>canvas | Wizard,<br>canvas | Power query | Canvas | Notebook,<br>Spark job definition |
| **Sources** | 50+ connectors | 50+ connectors | 150+ connectors | Database supporting CDC (Change Data Capture), Kafka, Messaging Systems that support publish and subscribe pattern, Event streams | Hundreds of Spark libraries |
| **Destinations** | 40+ connectors | 40+ connectors | Lakehouse,<br>Azure SQL database,<br>Azure Data explorer,<br>Azure Synapse analytics | Eventhouse, Lakehouse, Activator Alert, Derived Stream, Custom Endpoint | Hundreds of Spark libraries |
| **Transformation complexity** | Low:<br>lightweight - type conversion, column mapping, merge/split files, flatten hierarchy | Low:<br>lightweight - type conversion, column mapping, merge/split files, flatten hierarchy | Low to high:<br>300+ transformation functions | Low: <br>lightweight | Low to high:<br>support for native Spark and open-source libraries |

## Scenarios

Review the following scenarios for help with choosing how to work with your data in Fabric.

## Scenario 1

Leo, a data engineer, needs to ingest a large volume of data from external systems, both on-premises and cloud. These external systems include databases, file systems, and APIs. Leo doesn’t want to write and maintain code for each connector or data movement operation. He wants to follow the medallion layers best practices, with bronze, silver, and gold. Leo doesn't have any experience with Spark, so he prefers the drag and drop UI as much as possible, with minimal coding. And he also wants to process the data on a schedule.

The first step is to get the raw data into the bronze layer lakehouse from Azure data resources and various third party sources (like Snowflake Web, REST, AWS S3, GCS, etc.). He wants a consolidated lakehouse, so that all the data from various LOB, on-premises, and cloud sources reside in a single place. Leo reviews the options and selects **pipeline copy activity** as the appropriate choice for his raw binary copy. This pattern applies to both historical and incremental data refresh. With copy activity, Leo can load Gold data to a data warehouse with no code if the need arises and pipelines provide high scale data ingestion that can move petabyte-scale data. Copy activity is the best low-code and no-code choice to move petabytes of data to lakehouses and warehouses from varieties of sources, either ad-hoc or via a schedule.

## Scenario 2

Mary is a data engineer with a deep knowledge of the multiple LOB analytic reporting requirements. An upstream team has successfully implemented a solution to migrate multiple LOB's historical and incremental data into a common lakehouse. Mary has been tasked with cleaning the data, applying business logics, and loading it into multiple destinations (such as Azure SQL DB, ADX, and a lakehouse) in preparation for their respective reporting teams.

Mary is an experienced Power Query user, and the data volume is in the low to medium range to achieve desired performance. Dataflows provide no-code or low-code interfaces for ingesting data from hundreds of data sources. With dataflows, you can transform data using 300+ data transformation options, and write the results into multiple destinations with an easy to use, highly visual user interface. Mary reviews the options and decides that it makes sense to use **Dataflow Gen 2** as her preferred transformation option.

## Scenario 3

Prashant, a data integrator with deep expertise in business processes and systems. An upstream team has successfully exposed event data from business applications as messages that can be consumed through downstream systems. Prashant has been assigned to integrate event data from business applications into Microsoft Fabric for real-time decision support.

Given the medium to high data volume and the organization's preference for no-code solutions, Prashant seeks a way to seamlessly forward events as they occur without managing extraction schedules. To meet this need, he chooses **Eventstreams** in Microsoft Fabric. Eventstreams within the Real-Time Intelligence experience enables real-time data ingestion, transformation, and routing to various destinations—all without writing any code.

## Scenario 4

Adam is a data engineer working for a large retail company that uses a lakehouse to store and analyze its customer data. As part of his job, Adam is responsible for building and maintaining the pipelines that extract, transform, and load data into the lakehouse. One of the company's business requirements is to perform customer review analytics to gain insights into their customers' experiences and improve their services.

Adam decides the best option is to use **Spark** to build the extract and transformation logic. Spark provides a distributed computing platform that can process large amounts of data in parallel. He writes a Spark application using Python or Scala, which reads structured, semi-structured, and unstructured data from OneLake for customer reviews and feedback. The application cleanses, transforms, and writes data to Delta tables in the lakehouse. The data is then ready to be used for downstream analytics.

## Scenario 5

Rajesh, a data engineer, is tasked with ingesting incremental data from an on-premises SQL Server into an Azure SQL Database. Rajesh's On-premises SQL Server instance already has Change Data Capture (CDC) enabled on key tables.

Rajesh is looking for a simple, low-code, wizard-driven solution that enables him to:

- Select multiple native CDC enabled source tables
- Perform an initial full load
- Automatically switch to incremental data loads based on CDC
- Schedule data refreshes for recurring updates

He wants to avoid writing custom code or managing complex orchestrations. Ideally, he wants a "5x5 wizard" where he can accomplish the setup in just a few clicks.

Rajesh chooses the Copy job feature in Microsoft Fabric. With on-premises gateway support, he securely connects to his SQL Server, selects the desired tables, and configures the flow to land into the target Azure SQL Database.

The Copy job provides a low-friction and scalable data movement experience, meeting Rajesh’s requirements without the need to maintain complex pipelines.

## Related content

- [How to copy data using copy activity](../data-factory/copy-data-activity.md)
- [Quickstart: Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md)
- [How to create an Apache Spark job definition in Fabric](../data-engineering/create-spark-job-definition.md)
- [How to create an Eventstream in Fabric](../real-time-intelligence/event-streams/create-manage-an-eventstream.md)
