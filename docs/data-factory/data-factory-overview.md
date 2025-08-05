---
title: What is Data Factory
description: Overview of Data Factory dataflows and data pipelines.
ms.author: whhender
author: whhender
ms.reviewer: makromer
ms.topic: overview
ms.custom: configuration, sfi-image-nochange
ms.search.form: product-data-integration, Data_Factory_Overview, product-data-factory
ms.date: 07/22/2025
ai-usage: ai-assisted
---

# What is Data Factory in Microsoft Fabric?

Data Factory in Microsoft Fabric tackles one of today's biggest business challenges: turning scattered data into actionable insights. Your organization's valuable data lives in different places: databases, files, cloud services, and legacy systems—making it hard to get a complete picture of your business. Data Factory breaks down these data silos by connecting to over 150 data sources, moving data at scale, and transforming it into formats that work for analytics and decision-making. Whether you're a business user building your first dataflow or a developer creating complex pipelines, you'll find the right tools to bring your data together, clean it up, and make it ready for analysis in your Lakehouse or Data Warehouse.

Data Factory in Fabric provides data integration for your data platform to help your teams move faster, collaborate better, and make smarter decisions based on complete, up-to-date information.

## What's data integration?

Data integration is the process of bringing all your data together so you can access it and analyze it. Data integration is a key part of any business that's ready to make data-driven decisions.

ETL is one aspect of data integration. ETL stands for Extract, Transform, Load. It's a process that takes information from many different sources, transforms it into a format that can be analyzed, and loads it into a destination system for more analysis or reporting. Implementing an ETL process in a business's data platform improves data consistency, quality, and accessibility. So let's talk about each phase:

- **Extract**: This is the process of reading data from your sources and moving it to a central storage location. Sources can be anything from databases to files, APIs, websites, etc.
- **Transform**: This is the process of cleaning, enriching, and transforming your data into a format that can be easily analyzed. For example, you might want to compare sales data coming from a SQL database and scanned, historical sales documents. After extracting the data, you need to transform the data from each source so it's in the same format, check the data to make sure there are no corruptions or duplicates, and then combine the data into a single dataset.
- **Load**: This is the process of writing the transformed data to a destination system, like a data warehouse or a data lake. The destination system is where you can run queries and reports on your data.

But what if you already have good, clean data? Being able to access your data where it lives and surface it to your analytics tools is another key aspect of data integration. Mirroring in Fabric provides an easy experience to break down data silos between technology solutions.

And powerful tools to manage your data integration processes are essential to make sure your data is always up-to-date, and that you can respond to changes in your data sources or business requirements.

## Data factory is a powerful data integration solution

Data Factory allows you to connect to your data, move it, transform it, and orchestrate your data movement and transformation tasks from one place.

- **Connect to your data** - Whether on-premises or in the cloud, Data Factory allows you to connect to your data sources and destinations. It supports a wide range of data sources, including databases, data lakes, file systems, APIs, and more. See [available connectors](connector-overview.md) for a complete list of supported data sources and destinations.
- **Move data** - Data Factory provides several methods to move data from source to destination, or provide easy access to existing data, depending on your needs.
    - [Copy activity](copy-data-activity.md) - the most common way to move data from one place to another. It supports a wide range of data sources and destinations, and allows you to copy data in parallel for better performance.
    - [Copy job](what-is-copy-job.md) - a way to copy data from one place to another without the need to create a pipeline.
    - Mirroring - create a near real-time replica of your operational database within OneLake in Microsoft Fabric to make your analytics and reporting easier.
- **Transform**: Data Factory provides activities to connect you to your custom transformation scripts or the powerful dataflows designer.
    - [Pipeline activities](activity-overview.md#data-transformation-activities) - Fabric notebook, HDInsight activity, Spark job definition, stored procedure, SQL scripts, and more. These activities allow you to run custom code or scripts to transform your data.
    - [Dataflows](dataflows-gen2-overview.md) - transform your data using a low-code interface with over 300 transformations. You can perform joins, aggregations, data cleansing, custom transformations, and much more.
- **Orchestrate**: Data Factory allows you to create pipelines that can run multiple data movements, transformations, and other activities in a single workflow. You can schedule these pipelines to run at specific times or trigger them based on events. Pipelines can include control flow logic, such as loops and conditionals, to handle complex workflows and even integrate with Apache Airflow.

And for all these tools, Copilot in Fabric is there to help you get started and assist you in building your dataflows and pipelines. Copilot can help you with everything from writing queries to creating dataflows to building pipelines. For more information, see [Copilot in Fabric in the Data Factory workload](copilot-fabric-data-factory.md).

## What do you need to get started?

- A [!INCLUDE [product-name](../includes/product-name.md)] tenant account with an active subscription. If you don't have one, you can [create a free account](https://azure.microsoft.com/free/).
- A [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace. [Learn how to create a workspace.](../fundamentals/create-workspaces.md)
- Access to [Power BI](https://app.powerbi.com/).

## Related content

For more information, and to get started with [!INCLUDE [product-name](../includes/product-name.md)], follow these guides:

- [Guided data factory lab](https://regale.cloud/Microsoft/play/4344/fabric-data-factory#/0/0) - demo of Data Factory in Fabric
- [What can you connect to?](connector-overview.md) - all available sources and destinations for Data Factory
- [End-to-end Data Factory tutorial](tutorial-end-to-end-introduction.md) - we'll guide you through the whole ETL process, from data ingestion to transformation and loading into a destination system
