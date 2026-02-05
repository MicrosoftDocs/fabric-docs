---
title: Data Factory end-to-end tutorial introduction and architecture
description: This article introduces an end-to-end data integration tutorial that provides an hour long step-by-step guide to help you complete a full data integration scenario with Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: overview
ms.date: 05/05/2025
ms.search.form: product-data-factory
ms.custom: pipelines
---

# Data Factory end-to-end scenario: introduction and architecture

This tutorial helps you accelerate the evaluation process for Data Factory in Microsoft Fabric by providing the steps for a full data integration scenario within one hour. By the end of this tutorial, you understand the value and key capabilities of Data Factory and know how to complete a common end-to-end data integration scenario.

The scenario is divided into an introduction and three modules:

- [Introduction](#why-data-factory-in-microsoft-fabric) to the tutorial and why you should use Data Factory in Microsoft Fabric.
- [Module 1: Create a pipeline with Data Factory](tutorial-end-to-end-pipeline.md) to ingest raw data from a Blob storage to a [bronze](/azure/databricks/lakehouse/medallion#bronze) data layer table in a data Lakehouse.
- [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md) to process the raw data from your [bronze](/azure/databricks/lakehouse/medallion#bronze) table and move it to a [gold](/azure/databricks/lakehouse/medallion#gold) data layer table in the data Lakehouse.
- [Module 3: Complete your first data integration journey](tutorial-end-to-end-integration.md) and send an email to notify you once all the jobs are complete, and finally, setup the entire flow to run on a schedule.

## Why Data Factory in Microsoft Fabric?

**Microsoft Fabric** provides a single platform for all the analytical needs of an enterprise. It covers the spectrum of analytics including data movement, data lakes, data engineering, data integration, data science, real time analytics, and business intelligence. With Fabric, there's no need to stitch together different services from multiple vendors. Instead, your users enjoy a comprehensive product that is easy to understand, create, onboard, and operate.

**Data Factory in Fabric** combines the ease-of-use of [Power Query](/power-query) with the scale and power of [Azure Data Factory](/azure/data-factory/introduction). It brings the best of both products together into a single experience. The goal is for both citizen and professional data developers to have the right data integration tools. Data Factory provides low-code, AI-enabled data preparation and transformation experiences, petabyte-scale transformation, and hundreds of connectors with hybrid and multicloud connectivity.

## Three key features of Data Factory

- **Data ingestion:** The Copy activity in pipelines (or the standalone [Copy job](what-is-copy-job.md)) lets you move petabyte-scale data from hundreds of data sources into your data Lakehouse for further processing.
- **Data transformation and preparation:** Dataflow Gen2 provides a low-code interface for transforming your data using 300+ data transformations, with the ability to load the transformed results into multiple destinations like Azure SQL databases, Lakehouse, and more.
- **End-to-end automation:** Pipelines provide orchestration of activities that include [Copy, Dataflow, and Notebook activities, and more](activity-overview.md). Activities in a pipeline can be chained together to operate sequentially, or they can operate independently in parallel. Your entire data integration flow runs automatically, and can be monitored in one place.

## Tutorial architecture

In the next 50 minutes, you'll learn through all three key features of Data Factory as you complete an end-to-end data integration scenario.

The scenario is divided into three modules:

- [Module 1: Create a pipeline with Data Factory](tutorial-end-to-end-pipeline.md) to ingest raw data from a Blob storage to a [bronze](/azure/databricks/lakehouse/medallion#bronze) data layer table in a data Lakehouse.
- [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md) to process the raw data from your [bronze](/azure/databricks/lakehouse/medallion#bronze) table and move it to a [gold](/azure/databricks/lakehouse/medallion#gold) data layer table in the data Lakehouse.
- [Module 3: Complete your first data integration journey](tutorial-end-to-end-integration.md) and send an email to notify you once all the jobs are complete, and finally, setup the entire flow to run on a schedule.

:::image type="content" source="media/tutorial-end-to-end-introduction/tutorial-explanation-diagram.png" alt-text="A diagram of the data flow and modules of the tutorial.":::

You use the sample dataset **NYC-Taxi** as the data source for the tutorial. After you finish, you'll be able to gain insights into daily discounts on taxi fares for a specific period of time using Data Factory in Microsoft Fabric.

## Next step

Continue to the next section to create your pipeline.

> [!div class="nextstepaction"]
> [Module 1: Create a pipeline with Data Factory](tutorial-end-to-end-pipeline.md)
