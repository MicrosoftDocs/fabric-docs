---
title: Prepare and Transform Data in Microsoft Fabric
description: Prepare and transform data effortlessly in Microsoft Fabric using low-code tools like Dataflow Gen2 or code-first options like Notebooks and User Data Functions.
#customer intent: As a data analyst, I want to use Dataflow Gen2 to clean and transform raw data so that I can prepare it for analysis in a Lakehouse or Warehouse.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 01/20/2026
ms.topic: concept-article
---

# Prepare data

Once data is in Fabric, either landed natively in OneLake or accessible via Shortcuts, the next step is to refine and transform it to make it useful for analysis. Microsoft Fabric provides both low-code and code-first approaches to data preparation, catering to a spectrum of users from business-friendly data wranglers to advanced data engineers.

### Dataflow Gen2

:::image type="content" source="./media/prepare-data/prepare-dataflowgen2.png" alt-text="Screenshot of Dataflow Gen2 data preparation interface.":::

For low-code data preparation, Fabric's [Dataflow Gen2](/fabric/data-factory/dataflows-gen2-overview) is the primary tool. Dataflows Gen2 allow users to prepare and transform data using the familiar [Power Query](/power-query/power-query-what-is-power-query) interface (the same technology in Excel and Power BI), which means [you can apply filters, derive columns, aggregate, and merge data through a visual, step-by-step experience](/power-query/power-query-ui). In Fabric, Dataflows Gen2 can act as standalone ETL processes or be [invoked within pipelines as activities](/fabric/data-factory/tutorial-dataflows-gen2-pipeline-activity). A typical use case might be: after ingesting raw sales data into a Lakehouse, a Dataflow is used to clean the data (remove duplicates, standardize fields) and then output a curated table into a "Gold" area of the Lakehouse or into a Warehouse. 

Because Dataflows are cloud-based and take advantage of Fabric's scale-out compute (the same engine behind Power Query in the cloud), they can handle large volumes of data and complex transformations, yet require no coding. This allows data analysts or BI developers to shape data without engineering support. Since [Fabric Dataflows Gen2 can write their output to various destinations (Lakehouse tables, Warehouse tables, etc.)](/power-query/connectors/), the prepared data becomes part of Fabric's unified storage or warehousing layer.

### Notebooks and user data functions

For code-first preparation and advanced data engineering, Fabric offers Notebooks, Spark jobs and User Data Functions in the Data Engineering experience. 

:::image type="content" source="./media/prepare-data/prepare-notebookfunction.png" alt-text="Screenshot of Notebooks and User Data Functions for data preparation.":::

A [Fabric Notebook](/fabric/data-engineering/how-to-use-notebook) provides a Jupyter-like environment right in the Fabric portal where you can write code in languages such as [Python](/fabric/data-engineering/using-python-experience-on-notebook), [T-SQL](/fabric/data-engineering/author-tsql-notebook), or Scala to work with data in OneLake. 

This is ideal for data engineers and data scientists who need to perform complex transformations, employ custom algorithms, or integrate with Python libraries (for example, to apply machine learning or advanced statistics). In a notebook, a user might load raw JSON or Parquet files from a Lakehouse into a Spark DataFrame, perform cleansing and enrichment (maybe joining with another DataFrame, or doing windowed aggregations), and then save the results back as a Delta table in OneLake. 

Notebooks in Fabric are deeply integrated; they can directly [connect to Lakehouses](/fabric/data-engineering/lakehouse-notebook-explore) and Warehouses and read/write data without extra credentials or setup, since everything is within the Fabric workspace security context. Additionally, [notebooks can be scheduled and orchestrated as part of Data Factory pipelines](/fabric/data-factory/notebook-activity), bridging the gap between code-centric and workflow-centric data preparation.

[Fabric User Data Functions (UDFs)](/fabric/data-engineering/user-data-functions/user-data-functions-overview) allow developers to embed custom Python logic directly within the platform, enabling advanced workflows and reusable business rules across pipelines, notebooks, and activator rules. With support for PyPI libraries, UDFs can interact with [Fabric data sources](/fabric/data-engineering/user-data-functions/connect-to-data-sources) and expose REST endpoints for external integration, making them ideal for encapsulating complex operations and promoting modular, scalable solutions within enterprise environments. User Data Functions can be invoked from [Notebooks](/fabric/data-engineering/notebook-utilities#user-data-function-udf-utilities), [Pipelines](/fabric/data-engineering/user-data-functions/create-functions-activity-data-pipelines), [Activator rules](/fabric/real-time-intelligence/data-activator/activator-rules-overview) and as part of [Translytical task flows in Power BI reports](/power-bi/create-reports/translytical-task-flow-overview).
