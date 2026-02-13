---
title: What is a lakehouse?
description: A lakehouse is a collection of files, folders, and tables that represent a database over a data lake used by Apache Spark and SQL for big data processing.
ms.reviewer: avinandac
ms.author: eur
author: eric-urban
ms.topic: overview
ms.custom:
ms.date: 07/20/2025
ms.search.form: Lakehouse Overview
---

# What is a lakehouse in Microsoft Fabric?

Microsoft Fabric Lakehouse is a data repository for storing, managing, and analyzing structured and unstructured data in a single location. It's a flexible and scalable solution that allows organizations to handle large volumes of data using various tools and frameworks to process and analyze that data. It integrates with other data management and analytics tools to provide a comprehensive solution for data engineering and analytics. A lakehouse combines the scalability of a data lake with the performance and structure of a data warehouse, providing a unified platform for data storage, management, and analytics.

:::image type="content" source="media\lakehouse-overview\lakehouse-overview.gif" alt-text="Visual representation of overall lakehouse experience." lightbox="media\lakehouse-overview\lakehouse-overview.gif":::

## Lakehouse SQL analytics endpoint

When you create a Lakehouse in Microsoft Fabric, a [SQL analytics endpoint](lakehouse-sql-analytics-endpoint.md) is automatically generated. This endpoint provides a read-only, relational interface over your Delta tables, allowing users to explore and query data using T-SQL. While it offers a familiar SQL experience, it doesn't support the full T-SQL capabilities of a traditional transactional data warehouse. The endpoint also includes a default semantic model, making it easier to use the Lakehouse data in Power BI for reporting and visualization. Together, this setup enables a streamlined experience from data ingestion to analysis and reporting.

> [!NOTE]
> Only the tables in Delta format are available in the SQL analytics endpoint. Parquet, CSV, and other formats can't be queried using the SQL analytics endpoint. If you don't see your table, you need to convert it to Delta format.

## Automatic table discovery and registration

The automatic table discovery and registration is a feature of Lakehouse that provides a fully managed file to table experience for data engineers and data scientists. You can drop a file into the managed area of the Lakehouse and the system automatically validates it for supported structured formats, and registers it into the metastore with the necessary metadata such as column names, formats, compression, and more. (Currently the only supported format is Delta table.) You can then reference the file as a table and use SparkSQL syntax to interact with the data.

## Interacting with the Lakehouse item

A data engineer can interact with the lakehouse and the data within the lakehouse in several ways:

- **The Lakehouse explorer**: The explorer is the main Lakehouse interaction page. You can load data in your Lakehouse, explore data in the Lakehouse using the object explorer, set MIP labels & various other things. Learn more about the explorer experience: [Navigate the Fabric Lakehouse explorer](navigate-lakehouse-explorer.md).

- **Notebooks**: Data engineers can use the notebook to write code to read, transform, and write directly to Lakehouse as tables and/or folders. You can learn more about how to use notebooks for Lakehouse: [Explore the data in your lakehouse with a notebook](lakehouse-notebook-explore.md) and [How to use a notebook to load data into your lakehouse](lakehouse-notebook-load-data.md).

- **Pipelines**: Data engineers can use data integration tools such as pipeline copy tool to pull data from other sources and land into the Lakehouse. Find more information on how to use the copy activity: [How to copy data using copy activity](../data-factory/copy-data-activity.md).

- **Apache Spark job definitions**: Data engineers can develop robust applications and orchestrate the execution of compiled Spark jobs in Java, Scala, and Python. Learn more about Spark jobs: [What is an Apache Spark job definition?](spark-job-definition.md)

- **Dataflows Gen 2**: Data engineers can use Dataflows Gen 2 to ingest and prepare their data. Find more information on load data using dataflows: [Create your first dataflow to get and transform data](../data-factory/create-first-dataflow-gen2.md).

Learn more about the different ways to load data into your lakehouse: [Options to get data into the Fabric Lakehouse](load-data-lakehouse.md).

## Multitasking with lakehouse

The multitasking experience provides a browser tab design that allows you to open and switch between multiple items seamlessly allowing you to manage your data lakehouse more efficiently than ever. No more juggling between different windows or losing track of your tasks. Lakehouse provides an enhanced multitasking experience to make your data management journey as efficient and user-friendly as possible with the following capabilities:

- **Preserve running operations:** You can upload or run data load operation in one tab and check on another task in a different tab. With enhanced multi-tasking, the running operations aren't canceled when you navigate between tabs. You can focus on your work without interruptions.

- **Retain your context:** Selected objects, data tables, or files remain open and readily available when you switch between tabs. The context of your data lakehouse is always at your fingertips.

- **Non-blocking list reload:** A nonblocking reload mechanism for your files and tables list. You can keep working while the list refreshes in the background. It ensures that you have the latest data while providing you with a smooth and uninterrupted experience.

- **Clearly defined notifications:** The toast notifications specify which lakehouse they're coming from, making it easier to track changes and updates in your multi-tasking environment.

## Accessible lakehouse design

Accessibility has always been a top priority to ensure that Lakehouse is inclusive and user-friendly for everyone. Here are the key initiatives we implemented so far to support accessibility:

- **Screen reader compatibility:** You can work seamlessly with popular screen readers, enabling visually impaired users to navigate and interact with our platform effectively.

- **Text reflow** Responsive design that adapts to different screen sizes and orientations. Text and content reflow dynamically, making it easier for users to view and interact with our application on various devices.

- **Keyboard navigation:** Improved keyboard navigation to allow users to move through the lakehouse without relying on a mouse, enhancing the experience for those with motor disabilities.

- **Alternative text for images:** All images now include a descriptive alt text, making it possible for screen readers to convey meaningful information.

- **Form fields and Labels:** All form fields have associated labels, simplifying data input for everyone, including those using screen readers.

## Related content

In this overview, you get a basic understanding of a lakehouse. Advance to the next article to learn how to create and use your own lakehouse:

- To start using lakehouses, see [Create a lakehouse in Microsoft Fabric](create-lakehouse.md).
- To recover accidentally deleted lakehouse files, see [Recover deleted files in OneLake](../onelake/soft-delete.md).
