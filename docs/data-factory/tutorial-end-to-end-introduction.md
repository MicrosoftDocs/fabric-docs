---
title: Data Factory End-to-End Tutorial Introduction and Architecture
description: This end-to-end data integration tutorial provides a step-by-step guide to help you complete a full data integration scenario with Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.date: 04/13/2026
ms.topic: overview
ms.custom:
  - pipelines
ms.search.form: product-data-factory
---

# Data Factory end-to-end scenario: introduction and architecture

This tutorial walks you through a complete data integration scenario in about an hour. You'll learn the key capabilities of Data Factory in Microsoft Fabric and how to apply them to common data workflows.

## What you'll build

This tutorial includes an introduction and three modules:

- [Module 1: Ingest data with a Copy job](tutorial-end-to-end-pipeline.md): Create a standalone Copy job to ingest raw data from Blob storage into a [bronze](/azure/databricks/lakehouse/medallion#bronze) table in a Lakehouse.
- [Module 2: Transform data with a dataflow](tutorial-end-to-end-dataflow.md): Process raw data from your [bronze](/azure/databricks/lakehouse/medallion#bronze) table and move it to a [gold](/azure/databricks/lakehouse/medallion#gold) table in the Lakehouse.
- [Module 3: Orchestrate and automate with a pipeline](tutorial-end-to-end-integration.md): Create a pipeline to orchestrate the Copy job and dataflow, send an email notification when jobs complete, and schedule the entire flow.

## Data Factory in Microsoft Fabric

**Microsoft Fabric** is a unified analytics platform that covers data movement, data lakes, data engineering, data integration, data science, real-time analytics, and business intelligence. You don't need to piece together services from multiple vendors.

**Data Factory in Fabric** combines the ease-of-use of [Power Query](/power-query) with the scale of [Azure Data Factory](/azure/data-factory/introduction). It offers low-code, AI-enabled data preparation, petabyte-scale transformation, and hundreds of connectors with hybrid and multicloud connectivity.

## Key features

Data Factory provides three core capabilities for your data integration needs:

- **Data ingestion with Copy job**: A [Copy job](what-is-copy-job.md) is the recommended starting point for data ingestion. It moves petabyte-scale data from hundreds of data sources into your Lakehouse, with native support for bulk, incremental, and CDC-based copying - without needing to build a pipeline.
- **Data transformation**: Dataflow Gen2 provides a low-code interface for transforming your data with 300+ transformations. You can load results into multiple destinations like Azure SQL Database, Lakehouse, and more.
- **End-to-end automation**: Pipelines orchestrate activities including [Copy job, dataflow, notebook, and more](activity-overview.md). Chain activities together to run sequentially or in parallel. Monitor your entire data integration flow in one place.

## Tutorial architecture

You'll explore all three key features as you complete an end-to-end data integration scenario.

The scenario includes three modules:

1. [Ingest data with a Copy job](tutorial-end-to-end-pipeline.md): Create a standalone Copy job to ingest raw data from Blob storage into a [bronze](/azure/databricks/lakehouse/medallion#bronze) table in a Lakehouse.
1. [Transform data with a dataflow](tutorial-end-to-end-dataflow.md): Process the raw data from your [bronze](/azure/databricks/lakehouse/medallion#bronze) table and move it to a [gold](/azure/databricks/lakehouse/medallion#gold) table.
1. [Orchestrate and automate with a pipeline](tutorial-end-to-end-integration.md): Create a pipeline to orchestrate the Copy job and dataflow, send an email notification, and schedule the entire flow.

:::image type="content" source="media/tutorial-end-to-end-introduction/tutorial-explanation-diagram.png" alt-text="Diagram that shows the data flow and modules covered in this tutorial.":::

This tutorial uses the **NYC-Taxi** sample dataset. When you finish, you can analyze daily discounts on taxi fares for a specific time period using Data Factory in Microsoft Fabric.

## Next step

> [!div class="nextstepaction"]
> [Module 1: Ingest data with a Copy job](tutorial-end-to-end-pipeline.md)
