---
title: What is Data Factory
description: Overview of Data Factory dataflows and data pipelines.
ms.author: whhender
author: whhender
ms.reviewer: makromer
ms.topic: overview
ms.custom: configuration, sfi-image-nochange
ms.search.form: product-data-integration, Data_Factory_Overview, product-data-factory
ms.date: 12/18/2024
---

# What is Data Factory in Microsoft Fabric?

Data Factory empowers you with a modern data integration experience to ingest, prepare and transform data from a rich set of data sources (for example, databases, data warehouse, Lakehouse, real-time data, and more). Whether you are a citizen or professional developer, you will be able to transform the data with intelligent transformations and leverage a rich set of activities. We can create pipelines to execute one or more activities, access data sources or services through connections, and after creating a pipeline, we can add triggers to automatically run our processes at specific times or in response to changing scenarios. With Data Factory in Microsoft Fabric, we are bringing fast copy  (data movement) capabilities to both dataflows and data pipelines. With Fast Copy, you can move data between your favorite data stores blazing fast. Most importantly, Fast Copy enables you to bring data to your Lakehouse and Data Warehouse in Microsoft Fabric for analytics.

There are several high-level features Data Factory implements: dataflows, pipelines, the Copy jobs, and Apache Airflow jobs.

- Dataflows enable you to leverage more than 300 transformations in the dataflows designer, letting you transform data easier and with more flexibility than any other tool - including smart AI-based data transformations.
- Data pipelines enable you to leverage the out-of-the-box rich data orchestration capabilities to compose flexible data workflows that meet your enterprise needs.
- Copy jobs enable you to quickly and easily move data from any of the hundreds of supported connectors in Fabric, with a simple user interface and minimal learning curve.
- Apache Airflow jobs enable you to use the full breadth of the Apache Airflow Workflow Orchestration Manager capabilities and leverage your existing workflows within Data Factory.

## Dataflows

Dataflows provide a low-code interface for ingesting data from hundreds of data sources, transforming your data using 300+ data transformations. You can then load the resulting data into multiple destinations, such as Azure SQL databases and more. Dataflows can be run repeatedly using manual or scheduled refresh, or as part of a data pipeline orchestration.

Dataflows are built using the familiar [Power Query](/power-query/power-query-what-is-power-query) experience that's available today across several Microsoft products and services such as Excel, Power BI, Power Platform, Dynamics 365 Insights applications, and more. Power Query empowers all users, from citizen to professional data integrators, to perform data ingestion and data transformations across their data estate. Perform joins, aggregations, data cleansing, custom transformations, and much more all from an easy-to-use, highly visual, low-code UI.

:::image type="content" source="media/data-factory-overview/dataflow-experience.png" alt-text="Screenshot of the Power BI user interface showing the dataflow experience." lightbox="media/data-factory-overview/dataflow-experience.png":::

## Data pipelines

Data pipelines enable powerful workflow capabilities at cloud-scale. With data pipelines, you can build complex workflows that can refresh your dataflow, move PB-size data, and define sophisticated control flow pipelines.

Use data pipelines to build complex ETL and data factory workflows that can perform many different tasks at scale. Control flow capabilities are built into data pipelines that allow you to build workflow logic, which provides loops and conditionals.

Add a configuration-driven copy activity together with your low-code dataflow refresh in a single pipeline for an end-to-end ETL data pipeline. You can even add code-first activities for Spark Notebooks, SQL scripts, stored procs, and more.

:::image type="content" source="media/data-factory-overview/data-pipelines.png" alt-text="Screenshot of the user interface showing copy activity." lightbox="media/data-factory-overview/data-pipelines.png":::

## Copy jobs

Data pipelines in Data Factory implement the Copy activity, which supports the full flexibility and integration with other activities in traditional pipelines, but also involves a learning curve, which can impose challenges and create barriers for new users who want to rapidly instrument the movement of data from source to destination. The Copy job was introduced to simplify the copy process and make moving data quick and easy for a broad range of scenarios that don't require further instrumentation or integration with other activities.

:::image type="content" source="media/copy-job/copy-job-mode.png" alt-text="Screenshot of the user interface showing a Copy job." lightbox="media/copy-job/copy-job-mode.png":::

Learn more about how to use the Copy job to move your data with ease in [What is Copy job](what-is-copy-job.md).

## Apache Airflow jobs

Many Data Factory users are familiar with Apache Airflow. The Apache Airflow job is the next generation of Data Factory's Workflow Orchestration Manager. It's a simple and efficient way to create and manage Apache Airflow orchestration jobs, enabling you to run Directed Acyclic Graphs (DAGs) at scale with ease. It empowers you with a modern data integration experience to ingest, prepare and transform data from a rich set of data sources for example, databases, data warehouse, Lakehouse, real-time data, and more.

While there are many things you can do with Apache Airflow, the following image shows an example of a running simple Hello World Python script using the feature:

:::image type="content" source="media/apache-airflow-jobs/boilerplate-directed-acyclic-graph.png" alt-text="Screenshot of the user interface showing an Apache Airflow job." lightbox="media/apache-airflow-jobs/boilerplate-directed-acyclic-graph.png":::

Learn more and get started with the Apache Airflow job in [What is Apache Airflow job](apache-airflow-jobs-concepts.md)

## Related content

To get started with [!INCLUDE [product-name](../includes/product-name.md)], go to [Quickstart: Create your first Dataflow Gen2 to get and transform data](create-first-dataflow-gen2.md).
