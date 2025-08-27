---
title: What is Data Factory
description: Overview of Data Factory dataflows and data pipelines.
ms.author: whhender
author: whhender
ms.reviewer: makromer
ms.topic: overview
ms.custom: configuration, sfi-image-nochange
ms.search.form: product-data-integration, Data_Factory_Overview, product-data-factory
ms.date: 08/27/2025
ai-usage: ai-assisted
---

# What is Data Factory in Microsoft Fabric?

Data Factory in Microsoft Fabric helps you solve one of business's toughest challenges: turning scattered data into useful insights.

Your organization's data lives in many different places: databases, files, cloud services, and legacy systems. This makes it hard to get a complete picture of your business. Data Factory connects to over 170 data sources and helps you move and transform your data at scale. It turns your data into formats that work well for analytics and decision-making.

Whether you're a business user building your first dataflow or a developer creating complex pipelines, you'll find the right tools to:

- Bring your data together
- Clean it up
- Make it ready for analysis in your Lakehouse or Data Warehouse

Data Factory in Fabric provides data integration for your data platform. It helps your teams move faster, collaborate better, and make smarter decisions with complete, up-to-date information.

## What's data integration?

Data integration brings all your data together so you can access and analyze it. It's a key part of any business that wants to make data-driven decisions.

ETL is one part of data integration. ETL stands for Extract, Transform, Load. It takes information from many different sources, transforms it into a format you can analyze, and loads it into a destination system for analysis or reporting. When you implement an ETL process in your business's data platform, it improves data consistency, quality, and accessibility.

Here's what each phase does:

- **Extract**: Reads data from your sources and moves it to a central storage location. Sources can be databases, files, APIs, websites, and more.
- **Transform**: Cleans, enriches, and transforms your data into a format that's easy to analyze. For example, you might want to compare sales data from a SQL database with scanned, historical sales documents. After extracting the data, you need to transform the data from each source so it's in the same format, check for corruptions or duplicates, and combine the data into a single dataset.
- **Load**: Writes the transformed data to a destination system, like a data warehouse or data lake. The destination system is where you can run queries and reports on your data.

What if you already have good, clean data? You still need access your data where it lives and surface it to your analytics tools. Analyzing data to make informed decisions is the next key aspect of data integration.

## ETL or ELT?

When you work with data, how you move and transform it matters. Fabric Data Factory supports two approaches: ETL (Extract, Transform, Load) and ELT (Extract, Load, Transform). Each has strengths, depending on your needs for performance, scalability, and cost.

**ETL**: Transform your data before loading it into its destination. This works well when you need to clean, standardize, or enrich data as it moves. For example, use Data Factory's Dataflows to apply transformations at scale before loading data into a warehouse or Lakehouse.

**ELT**: Load raw data first, then transform it where it's stored. This approach uses the power of analytics engines like Fabric's OneLake, Spark Notebooks, or SQL-based tools. ELT works well for handling large datasets with modern, cloud-scale compute.

Fabric Data Factory lets you:

- Build classic ETL pipelines for immediate data quality and readiness
- Use ELT workflows to take advantage of integrated compute and storage for large-scale transformations
- Combine both approaches in the same solution for flexibility

## Data Factory is a powerful data integration solution

Data Factory connects to your data, moves it, transforms it, and orchestrates your data movement and transformation tasks from one place.

**Connect to your data**: Whether on-premises or in the cloud, Data Factory connects to your data sources and destinations. It supports a wide range of data sources, including databases, data lakes, file systems, APIs, and more. See [available connectors](connector-overview.md) for a complete list of supported data sources and destinations.

**Move data**: Data Factory provides several methods to move data from source to destination, or provide easy access to existing data, depending on your needs.

- [Copy activity](copy-data-activity.md) - Move data from one place to another using Data Factory pipelines at any scale. It supports a wide range of data sources and destinations, and lets you copy data in parallel for better performance.
- [Copy job](what-is-copy-job.md) - A way to copy data from one place to another without creating a pipeline.
- [Mirroring](/fabric/database/mirrored-database/overview) - Create a near real-time replica of your operational database within OneLake in Microsoft Fabric to make your analytics and reporting easier.

**Transform**: Data Factory provides activities to connect you to your custom transformation scripts or the powerful dataflows designer.

- [Pipeline activities](activity-overview.md#data-transformation-activities) - Fabric notebook, HDInsight activity, Spark job definition, stored procedure, SQL scripts, and more. These activities let you run custom code or scripts to transform your data.
- [Dataflows](dataflows-gen2-overview.md) - Transform your data using a low-code interface with over 300 transformations. You can perform joins, aggregations, data cleansing, custom transformations, and much more.

**Orchestrate**: Data Factory lets you create pipelines that can run multiple data movements, transformations, and other activities in a single workflow. You can schedule these pipelines to run at specific times or trigger them based on events. Pipelines can include control flow logic, such as loops and conditionals, to handle complex workflows and orchestrate all of your data processing using a simple low-code pipeline designer UI. If you prefer to express your orchestration processes in code, Fabric Data Factory includes the Apache Airflow job as a way to build DAGs for orchestration using Python.

For all these tools, Copilot in Fabric is there to help you get started and assist you in building your dataflows and pipelines. Copilot can help you with everything from writing queries to creating dataflows to building pipelines. For more information, see [Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory.md).

## What do you need to get started?

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. If you don't have one, you can [create a free account](https://azure.microsoft.com/free/).
- A [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace. [Learn how to create a workspace.](../fundamentals/create-workspaces.md)

## Related content

For more information, and to get started with [!INCLUDE [product-name](../includes/product-name.md)], follow these guides:

- [Guided data factory lab](https://regale.cloud/Microsoft/play/4344/fabric-data-factory#/0/0) - demo of Data Factory in Fabric
- [What can you connect to?](connector-overview.md) - all available sources and destinations for Data Factory
- [End-to-end Data Factory tutorial](tutorial-end-to-end-introduction.md) - we'll guide you through the whole ETL process, from data ingestion to transformation and loading into a destination system
