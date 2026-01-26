---
title: Decision Guide for Data Movement and Transformation
description: Identify the best strategy for your workload and skill level with our Microsoft Fabric data integration decision guide, and compare data integration strategies like Mirrored Database, Copy Job, Copy Activity, Pipelines, Apache Airflow Job, Notebooks, and Dataflow Gen2.
author: whhender
ms.author: whhender
ms.reviewer: whhender
ms.date: 08/08/2025
ms.topic: product-comparison
ai-usage: ai-assisted
---

# Microsoft Fabric decision guide: Choose a data integration strategy

Microsoft Fabric has a comprehensive suite of tools to handle data and analytics workloads efficiently. With so many options available, including batch, pipeline, and real-time streaming capabilities, it can be challenging to pick the right tool for your specific needs. This decision guide provides a roadmap to help you select the right strategy.

:::image type="content" source="media/decision-guide-data-integration/decision-guide.svg" alt-text="Screenshot of data integration workflow diagram showing columns for data movement, orchestration, and transformation." lightbox="media/decision-guide-data-integration/decision-guide.svg":::

To choose the right data integration service in Microsoft Fabric, consider these questions:

- **What's your primary goal?** Do you want to ingest data, transform it, replicate it, orchestrate data movement, or stream and act on data in real-time?

- **What's your technical skill level?** Do you prefer no-code or low-code solutions, or are you comfortable working with code?

- **What type of data workload are you working with?** Is it batch, bulk, incremental, continuous streaming, or near real-time?

- **What kind of data transformation do you need?** Are you doing light transformations or complex ones?

For the list of supported connectors across Copy job, Copy activity, and Dataflow Gen 2, see the [connector overview](/fabric/data-factory/connector-overview). For the list of supported Eventstream sources, see the [sources list](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-sources).

## Data movement strategies

| | [**Mirroring**](/fabric/mirroring/overview) | [**Copy Job**](/fabric/data-factory/create-copy-job) | [**Copy Activity (Pipeline)**](/fabric/data-factory/copy-data-activity) | [**Eventstreams**](/fabric/real-time-intelligence/event-streams/overview) |
|---|---|---|---|---|
| **Use Case** | Data Replication | Data Ingestion & Replication | Data Ingestion | Streaming Data Ingestion & Processing |
| **Flagship Scenarios** | Near real-time sync with turn-key setup. Replication | Incremental Copy / Replication (water-mark + Native CDC), Data Lake / Storage Data Migration, Medallion Ingestion, Out-of-the-box multi-table copy. | Data Lake / Storage Data Migration, Medallion Ingestion, Incremental copy via pipeline expressions & control tables (water-mark only)| Incremental processing, event-driven, and real-time AI applications |
| **Source** | 6+ [connectors](../mirroring/overview.md#types-of-mirroring) | 50+ [connectors](/fabric/data-factory/connector-overview) | 50+ [connectors](/fabric/data-factory/connector-overview) | 25+ [sources](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-sources) |
| **Destination** | Mirrored database (stored as read-only Delta table in Fabric OneLake) | 40+ [connectors](/fabric/data-factory/connector-overview) | 40+ [connectors](/fabric/data-factory/connector-overview) | 4+ [destinations](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-destinations) |
| **Type of Incoming Data** | Near Real-time | Batch / Incremental Copy (water-mark based & change data capture) / Near Real-time | Batch / Bulk / Manual Watermark-based incremental copy | Real-time streaming data, Change Data Capture/Feeds |
| **Persona** | Business Analyst, Database Administrator | Business Analyst, Data Integrator, Data Engineer | Data Integrator, Business Analyst, Data Engineer | Data Engineer & Integrator, Data Analyst |
| **Skillset** | None | ETL, SQL | ETL, SQL | ETL, SQL, KQL |
| **Coding Level** | No code | No code / Low code | No code / Low code | No code / Low code |
| **Transformation Support** | None | Low | Low | Medium (stream analytics) |

For more details, see the [data movement strategy](/fabric/data-factory/decision-guide-data-movement).

## Orchestration strategies

| | [**Pipeline**](pipeline-overview.md) | [**Apache Airflow Job**](/fabric/data-factory/apache-airflow-jobs-concepts) |
|---|---|---|
| **Use Case** | Low Code Orchestration | Code-first Orchestration |
| **Flagship Scenarios** | Logical grouping of several activities together to perform a task. | Python Code-Centric Authoring |
| **Source** | [All Fabric compatible sources](/fabric/data-factory/connector-overview) (depending on selected pipeline activities) | 100+ connectors |
| **Destination** | [All Fabric compatible sources](/fabric/data-factory/connector-overview) (depending on selected pipeline activities) | 100+ connectors |
| **Type of Incoming Data** | All types | All types |
| **Persona** | Data Integrator, Business Analyst, Data Engineer | Apache Airflow Users |
| **Skillset** | ETL, SQL, Spark (Scala, Py, SQL, R) | Python |
| **Coding Level** | No code / Low code | Code-first |
| **Transformation Support** | None | None |

## Transformation strategies

| | [**Notebooks**](/fabric/data-engineering/how-to-use-notebook) | [**Dataflow Gen 2**](/fabric/data-factory/dataflows-gen2-overview) | [**Eventstreams**](/fabric/real-time-intelligence/event-streams/overview) |
|---|---|---|---|
| **Use Case** | Code-first Data Prep / Transform | Code-free Data Prep / Transform | Code-free Transformation / SQL-based Stream Analytics |
| **Flagship Scenarios** | Complex Transformations | Transformation & Profiling | Stream Processing & Analytics | 
| **Source** | 100+ Spark Libraries | 170+ built-in [connectors](/fabric/data-factory/connector-overview) + Custom SDK | 25+ [sources](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-sources) |
| **Destination** | 100+ Spark Libraries | 7+ [connectors](/fabric/data-factory/connector-overview) | 4+ [destinations](/fabric/real-time-intelligence/event-streams/add-manage-eventstream-destinations) |
| **Type of Incoming Data** | All types | All types | All Types incl. JSON, AVRO, CSV, XML, TXT etc. |
| **Persona** | Data Scientist, Developer | Data Engineer, Data Integrator, Business Analyst | Data Engineer & Analyst |
| **Skillset** | Spark (Scala, Py, SQL, R) | ETL, M, SQL | SQL, KQL |
| **Coding Level** | Code-first | No code / Low code | No code / Low code |
| **Transformation Support** | High | High (400+ activities) | Medium |

## Scenarios

Review these scenarios to help you choose which data integration strategy to use in Microsoft Fabric.

### Scenario 1

Hanna is a database administrator for a financial services company. She manages multiple critical SQL Server databases that power the organization's trading applications. The business needs near real-time access to this transactional data for regulatory reporting and risk analysis. However, Hanna needs to avoid impacting the performance of the production systems.

Hanna's challenge is providing analytics teams with up-to-date data without creating extra load on the operational databases. She doesn't want to build complex ETL pipelines or manage data movement processes. The data volumes are substantial, and the business needs the data available for analysis within minutes of transactions occurring in the source systems.

Hanna reviews the options and chooses **Mirroring** as the ideal solution. With Mirroring, she can set up near real-time data replication from her SQL Server databases to Microsoft Fabric with minimal configuration. The mirrored data becomes available in OneLake as Delta tables, enabling downstream analytics without affecting source system performance. Mirroring provides the turnkey setup she needs, automatically managing the complexity of data replication while ensuring business continuity.

### Scenario 2

Charlie is a data analyst at a retail company. He's responsible for consolidating sales data from multiple regional databases into a central data warehouse. The company operates across different time zones, and each region's database uses change data capture (CDC) to track inventory and sales transactions. Charlie needs a solution that can handle the initial full load of historical data and then switch to incremental updates based on CDC.

Charlie wants a no-code, wizard-driven approach that lets him select multiple tables from various regional SQL Server instances, perform the initial bulk migration, and then automatically maintain up-to-date data through CDC-based incremental loads. The solution needs to handle both inserts and updates, and should merge changes into the destination without manual intervention.

Charlie evaluates the options and selects **Copy Job** as his preferred approach. Copy Job provides the multi-table selection capability he needs, supports both watermark-based and native CDC incremental copying, and offers an intuitive wizard interface. The out-of-the-box functionality lets him configure the entire data replication process without writing code, and the automatic detection of CDC-enabled tables simplifies the setup process.

### Scenario 3

Rukmina is a data engineer at a manufacturing company. She needs to migrate large volumes of historical production data from an on-premises Oracle database to a new Fabric Warehouse. The migration involves copying hundreds of tables with millions of records, and she needs to implement a medallion architecture with bronze, silver, and gold layers. Rukmina has experience with SQL but prefers low-code solutions when possible.

The project requires her to copy raw data to the bronze layer, then apply lightweight transformations like data type conversions and column mapping as the data moves through the medallion layers. Rukmina needs to ensure the solution can handle the high data volumes efficiently and can be scheduled to run incrementally for ongoing operations. The stakeholders want a solution that can scale from gigabytes to petabytes of data as the business grows.

Rukmina reviews the available options and chooses **Copy Activity in Pipelines**. This approach gives her the drag-and-drop interface she prefers while providing the scalability needed for large data volumes. Copy Activity supports the 50+ connectors she needs for various source systems, and the pipeline framework lets her orchestrate the movement between medallion layers. With copy activity, she can implement both historical and incremental data refresh patterns while maintaining the performance required for petabyte-scale operations.

### Scenario 4

Julian is a business analyst with strong SQL skills. He needs to orchestrate a complex data processing workflow that involves multiple steps: extracting data from various systems, running data quality checks, performing transformations, loading data into multiple destinations, and sending notifications to stakeholders. The workflow needs to run on a schedule and handle dependencies between different activities.

Julian's organization uses a mix of Azure services and on-premises systems, and the workflow requires both data movement and orchestration logic. He needs to coordinate activities like running stored procedures, calling web APIs, moving files, and executing other pipelines. While Julian is comfortable with SQL and basic scripting, he prefers a visual, low-code approach for building and maintaining these complex workflows.

Julian evaluates the options and selects **Pipelines** as the best fit for his requirements. Pipelines provide the visual canvas and drag-and-drop activities he needs to build complex orchestration workflows. The solution supports logical grouping of activities, dependency management, and scheduling capabilities. With 50+ connectors and various activity types (copy, lookup, stored procedure, web, etc.), Pipelines give him the flexibility to coordinate diverse tasks while maintaining the low-code approach he prefers.

### Scenario 5

Darshan is a data scientist with extensive Python experience. He needs to build and maintain complex data processing workflows that integrate machine learning models, custom algorithms, and various external APIs. His organization's data science team prefers code-first approaches and wants to leverage their existing Python expertise, including custom libraries and advanced orchestration patterns.

Darshan needs a solution that supports Python-based directed acyclic graphs (DAGs), can handle complex dependencies between tasks, and integrates with the team's existing DevOps processes. The workflows involve data ingestion from multiple sources, feature engineering, model training, batch scoring, and custom business logic that requires the flexibility of full Python programming. The team values Apache Airflow's ecosystem and wants to maintain compatibility with their existing workflows.

Darshan reviews the options and chooses **Apache Airflow Jobs** as the ideal solution. This code-first approach lets his team use their Python expertise while building sophisticated data processing workflows. Apache Airflow Jobs provides the DAG-based orchestration they're familiar with, supports 100+ connectors through the Airflow ecosystem, and lets them implement custom business logic using Python. The managed service approach eliminates infrastructure concerns while preserving the flexibility and power of Apache Airflow.

### Scenario 6

René is a data scientist at a research university. She needs to perform complex data analysis and transformation tasks on large datasets stored across multiple formats and sources. Her work involves statistical analysis, machine learning model development, and custom data processing algorithms that require the full power of distributed computing.

René works with structured and unstructured data including CSV files, JSON documents, Parquet files, and real-time streams. Her analysis requires complex transformations like joins across multiple large datasets, aggregations, statistical computations, and custom algorithms implemented in Python and Scala. She needs the flexibility to work interactively during exploration phases and then operationalize her code for production workloads.

René evaluates her options and chooses **Notebooks** as her primary tool. Notebooks provide the code-first environment she needs with full access to Spark's distributed computing capabilities. She can work with hundreds of Spark libraries, implement complex transformations using multiple languages (Python, Scala, SQL, R), and use the interactive development environment for data exploration. The notebook interface lets her combine code, visualizations, and documentation while providing the high-performance compute needed for her large-scale data processing requirements.

### Scenario 7

Ako is a business analyst at a healthcare organization. She needs to integrate data from multiple sources including databases, web services, and file systems to create clean, business-ready datasets. Ako has extensive experience with Power Query from her work in Excel and Power BI, and she prefers visual, no-code interfaces for data preparation tasks.

Ako's responsibilities include cleaning healthcare data, applying business rules, validating data quality, and creating standardized datasets that feed into regulatory reporting systems. The data sources include patient management systems, laboratory information systems, and external API services. She needs to perform complex transformations like data profiling, duplicate removal, standardization of medical codes, and creation of calculated fields based on business logic.

Ako reviews the available options and selects **Dataflow Gen 2** as her preferred solution. Dataflow Gen 2 provides the familiar Power Query experience she knows from other Microsoft tools, while offering enhanced performance and capabilities. With 170+ built-in connectors, she can connect to all her diverse data sources, apply 300+ transformation functions through the visual interface, and take advantage of data profiling tools to ensure data quality. The no-code approach lets her focus on the business logic rather than technical implementation details.

### Scenario 8

Ash is a product manager at a telecom company. Her team needs to monitor customer support metrics, like call volumes, wait times, and agent performance, in real time to ensure service-level agreements (SLAs) are met. The data comes from multiple operational systems including CRM, call center logs, and agent assignment databases.

Ash wants to build real-time dashboards and trigger automated workflows when thresholds are breached (for example, when wait times exceed SLA limits). She also wants to avoid building complex ETL pipelines or managing infrastructure.

Ash evaluates the options and selects Fabric Eventstreams. With Eventstreams, she can ingest data from multiple sources using streaming connectors, apply lightweight transformations, and route events to destinations like Eventhouse and Data Activator. She sets up alerts and dashboards that update in seconds, enabling her team to respond quickly to operational issues.

Fabric Eventstreams and Real-Time Intelligence provides the low-latency, low-code experience Ash needs to build event-driven applications without disrupting existing systems.

## Get started

Now that you understand which service to use, you can start building your data integration solutions in Microsoft Fabric.

- [Get started with Mirroring](/fabric/mirroring/overview)
- [Create a Copy Job](/fabric/data-factory/create-copy-job)
- [Create a Copy Activity](/fabric/data-factory/copy-data-activity)
- [Get started with Pipelines](pipeline-overview.md)
- [Get started with Eventstreams](/fabric/real-time-intelligence/event-streams/overview)
- [Get started with Apache Airflow Jobs](/fabric/data-factory/apache-airflow-jobs-concepts)
- [Create and use Notebooks](/fabric/data-engineering/how-to-use-notebook)
- [Get started with dataflows](dataflows-gen2-overview.md)
