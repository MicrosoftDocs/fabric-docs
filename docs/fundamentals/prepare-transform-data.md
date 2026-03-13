---
title: Prepare and transform data in Microsoft Fabric
description: Prepare and transform data effortlessly in Microsoft Fabric using low-code tools like Dataflow Gen2 or code-first options like Notebooks and User Data Functions.
#customer intent: As a data analyst, I want to use Dataflow Gen2 to clean and transform raw data so that I can prepare it for analysis in a Lakehouse or Warehouse.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Prepare and transform data in Microsoft Fabric

After you ingest data into Microsoft Fabric, you typically need to clean, shape, and enrich it before analysis. Whether your goal is to prepare curated tables in a lakehouse or model-ready data in a warehouse, Fabric provides both low-code and code-first transformation options.

This article describes how to use Dataflow Gen2 for visual, low-code data preparation and how to use notebooks and user data functions for advanced, code-driven transformations. Choose the approach that best fits your role, skill set, and workload requirements.

## Transform data with Dataflow Gen2

For low-code data preparation, use [Dataflow Gen2](../data-factory/dataflows-gen2-overview.md). Dataflow Gen2 uses the familiar [Power Query](/power-query/power-query-what-is-power-query) experience, the same technology used in Excel and Power BI.

With the [Power Query interface](/power-query/power-query-ui), you can apply filters, derive columns, aggregate data, merge queries, and perform other transformations through a visual, step-by-step workflow. In Fabric, Dataflow Gen2 can run as a standalone ETL process or as an [activity within a pipeline](../data-factory/tutorial-dataflows-gen2-pipeline-activity.md).

For example, after you ingest raw sales data into a Lakehouse, you can use a dataflow to remove duplicates, standardize column names, apply business rules, and write the cleaned results to curated tables in a Gold layer of the Lakehouse or into a Warehouse.

Dataflow Gen2 runs in the cloud by using Fabric capacity, enabling it to scale to large datasets and complex transformations without requiring custom code. Data analysts and BI developers can prepare data independently, while still writing output to Lakehouse or Warehouse tables as part of Fabric’s unified storage foundation.

## Code-first preparation with notebooks and user data functions

For advanced transformation scenarios with code, use notebooks, Spark jobs, and user data functions in the Data Engineering experience.

A [Fabric notebook](../data-engineering/how-to-use-notebook.md) provides a Jupyter-style environment in the Fabric portal. You can write code in languages such as [Python](../data-engineering/using-python-experience-on-notebook.md), [T-SQL](../data-engineering/author-tsql-notebook.md), or Scala to work with data stored in OneLake.

Notebooks are well suited for complex transformations, custom algorithms, data science workflows, and integration with external libraries. For example, you can load raw JSON or Parquet files from a lakehouse into a Spark DataFrame, join them with other datasets, apply windowed aggregations, enrich the data, and save the results back as Delta tables in OneLake.

Notebooks integrate directly with lakehouses and warehouses in the same workspace. You can read and write data without additional credential configuration because operations run within the Fabric security context. You can also orchestrate and schedule notebooks by using the [notebook activity](../data-factory/notebook-activity.md) in Data Factory pipelines.

[Fabric user data functions](../data-engineering/user-data-functions/user-data-functions-overview.md) enable you to encapsulate reusable Python logic in Fabric. You can use them to implement advanced business rules, call external services, or build modular transformation components. User data functions support PyPI libraries, can connect to [Fabric data sources](../data-engineering/user-data-functions/connect-to-data-sources.md), and can expose REST endpoints for external integration. These capabilities make them suitable for enterprise scenarios that require reusable, governed transformation logic.

You can invoke User Data Functions from [Notebooks](../data-engineering/notebook-utilities.md#user-data-function-udf-utilities), [Pipelines](../data-engineering/user-data-functions/create-functions-activity-data-pipelines.md), [Activator rules](../real-time-intelligence/data-activator/activator-rules-overview.md), and as part of [Translytical task flows in Power BI reports](/power-bi/create-reports/translytical-task-flow-overview).

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Store data in Microsoft Fabric](store-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
* [External integration and platform connectivity](external-integration.md)
