---
title: Prepare and transform data in Microsoft Fabric
description: Prepare and transform data effortlessly in Microsoft Fabric using low-code tools like Dataflow Gen2 or code-first options like Notebooks and User Data Functions.
#customer intent: As a data analyst, I want to use Dataflow Gen2 to clean and transform raw data so that I can prepare it for analysis in a Lakehouse or Warehouse.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/11/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Prepare and transform data

After you have data in Fabric, either landed natively in OneLake or accessible through shortcuts, you can refine and transform it for analysis. Microsoft Fabric provides both low-code and code-first approaches to data preparation, supporting a range of users from business-friendly data wranglers to advanced data engineers.

## Transform data with Dataflow Gen2

:::image type="content" source="./media/prepare-data/prepare-dataflow.png" alt-text="Diagram of the Dataflow Gen2 data preparation interface.":::

For low-code data preparation, [Dataflow Gen2](../data-factory/dataflows-gen2-overview.md) is the primary tool in Fabric. With Dataflows Gen2, you prepare and transform data by using the familiar [Power Query](/power-query/power-query-what-is-power-query) interface, the same technology used in Excel and Power BI. You can [apply filters, derive columns, aggregate, and merge data through a visual, step-by-step experience](/power-query/power-query-ui). In Fabric, Dataflows Gen2 can act as standalone ETL processes or be [invoked within pipelines as activities](../data-factory/tutorial-dataflows-gen2-pipeline-activity.md). For example, after you ingest raw sales data into a Lakehouse, a Dataflow can clean the data (remove duplicates, standardize fields) and then output a curated table into a "Gold" area of the Lakehouse or into a Warehouse.

Because Dataflows are cloud-based and use Fabric's scale-out compute (the same engine behind Power Query in the cloud), they can handle large volumes of data and complex transformations without any coding. Data analysts or BI developers can shape data without engineering support. Because [Dataflows Gen2 can write their output to various destinations such as Lakehouse tables and Warehouse tables](/power-query/connectors/), the prepared data becomes part of Fabric's unified storage or warehousing layer.

## Code-first preparation with notebooks and user data functions

For code-first preparation and advanced data engineering, Fabric offers Notebooks, Spark jobs, and User Data Functions in the Data Engineering experience.

:::image type="content" source="./media/prepare-data/prepare-notebook-function.png" alt-text="Diagram of notebooks and user data functions for data preparation.":::

A [Fabric Notebook](../data-engineering/how-to-use-notebook.md) provides a Jupyter-like environment in the Fabric portal where you can write code in languages such as [Python](../data-engineering/using-python-experience-on-notebook.md), [T-SQL](../data-engineering/author-tsql-notebook.md), or Scala to work with data in OneLake.

This environment is ideal for data engineers and data scientists who need to perform complex transformations, use custom algorithms, or integrate with Python libraries (for example, to apply machine learning or advanced statistics). In a notebook, you can load raw JSON or Parquet files from a Lakehouse into a Spark DataFrame, perform cleansing and enrichment (such as joining with another DataFrame or running windowed aggregations), and then save the results back as a Delta table in OneLake.

Notebooks in Fabric are deeply integrated. They can directly [connect to Lakehouses](../data-engineering/lakehouse-notebook-explore.md) and Warehouses and read or write data without extra credentials or setup, because everything is within the Fabric workspace security context. You can also [schedule and orchestrate notebooks as part of Data Factory pipelines](../data-factory/notebook-activity.md), which bridges the gap between code-centric and workflow-centric data preparation.

[Fabric User Data Functions (UDFs)](../data-engineering/user-data-functions/user-data-functions-overview.md) let developers embed custom Python logic directly within the platform, enabling advanced workflows and reusable business rules across pipelines, notebooks, and Activator rules. With support for PyPI libraries, UDFs can interact with [Fabric data sources](../data-engineering/user-data-functions/connect-to-data-sources.md) and expose REST endpoints for external integration. These capabilities make them ideal for encapsulating complex operations and promoting modular, scalable solutions within enterprise environments. You can invoke User Data Functions from [Notebooks](../data-engineering/notebook-utilities.md#user-data-function-udf-utilities), [Pipelines](../data-engineering/user-data-functions/create-functions-activity-data-pipelines.md), [Activator rules](../real-time-intelligence/data-activator/activator-rules-overview.md), and as part of [Translytical task flows in Power BI reports](/power-bi/create-reports/translytical-task-flow-overview).

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Store data in Microsoft Fabric](store-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
* [External integration and platform connectivity](external-integration.md)
