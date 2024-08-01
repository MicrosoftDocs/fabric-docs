---
title: Data Factory end-to-end scenario - introduction and architecture
description: This article introduces an end-to-end data integration tutorial that provides step-by-step guidance to help you complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
ms.search.form: product-data-factory
---

# Data Factory end-to-end scenario: introduction and architecture

This tutorial helps you accelerate the evaluation process for Data Factory in Microsoft Fabric by providing a step-by-step guidance for a full data integration scenario within one hour. By the end of this tutorial, you understand the value and key capabilities of Data Factory and know how to complete a common end-to-end data integration scenario.

## Overview: Why Data Factory in Microsoft Fabric?

This section helps you understand the role of Fabric generally, and the role Data Factory plays within it.

### Understand the value of Microsoft Fabric

Microsoft Fabric provides a one-stop shop for all the analytical needs for every enterprise. It covers a complete spectrum of services including data movement, data lake, data engineering, data integration and data science, real time analytics, and business intelligence. With Fabric, there's no need to stitch together different services from multiple vendors. Instead, your users enjoy an end-to-end, highly integrated, single, and comprehensive product that is easy to understand, onboard, create, and operate.

### Understand the value of Data Factory in Microsoft Fabric

Data Factory in Fabric combines the ease-of-use of [Power Query](/power-query) with the scale and power of [Azure Data Factory](/azure/data-factory/introduction). It brings the best of both products together into a unified experience. The goal is to make sure Data Integration in Factory works well for both citizen and professional data developers. It provides low-code, AI-enabled data preparation and transformation experiences, petabyte-scale transformation, hundreds of connectors with hybrid, multicloud connectivity. Purview provides governance, and the service features enterprise scale Data/Op commitments, CI/CD, application lifecycle management, and monitoring.

## Introduction - Understand three key features of Data Factory

- Data ingestion: The Copy activity in pipelines lets you move petabyte-scale data from hundreds of data sources into your data Lakehouse for further processing.
- Data transformation and preparation: Dataflow Gen2 provides a low-code interface for transforming your data using 300+ data transformations, with the ability to load the transformed results into multiple destinations such as Azure SQL databases, Lakehouse, and more.
- End-to-end integration flow automation: Pipelines provide orchestration of activities that include [Copy, Dataflow, and Notebook activities, and more](activity-overview.md). This lets you manage activities all in one place. Activities in a pipeline can be chained together to operate sequentially, or they can operate independently in parallel.

In this end-to-end data integration use case, you learn:

- How to ingest data using the copy assistant in a pipeline
- How to transform the data using a dataflow either with a no-code experience, or by writing your own code to process the data with a Script or Notebook activity
- How to automate the entire end-to-end data integration flow using a pipeline with triggers and flexible control flow activities.

## Architecture

In the next 50 minutes, you're tasked with completing an end-to-end data integration scenario. This includes ingesting raw data from a source store into the Bronze table of a Lakehouse, processing all the data, moving it to the Gold table of the data Lakehouse, sending an email to notify you once all the jobs are complete, and finally, setting up the entire flow to run on a scheduled basis.

The scenario is divided into three modules:

- [Module 1: Create a pipeline with Data Factory](tutorial-end-to-end-pipeline.md) to ingest raw data from a Blob storage to a Bronze table in a data Lakehouse.
- [Module 2: Transform data with a dataflow in Data Factory](tutorial-end-to-end-dataflow.md) to process the raw data from your Bronze table and move it to a Gold table in the data Lakehouse.
- [Module 3: Complete your first data integration journey](tutorial-end-to-end-integration.md) to send an email to notify you once all the jobs are complete, and finally, setup the entire flow to run on a scheduled basis.

:::image type="content" source="media/tutorial-end-to-end-introduction/tutorial-explanation-diagram.png" alt-text="A diagram of the data flow and modules of the tutorial.":::

You use the sample dataset **NYC-Taxi** as the data source for the tutorial. After you finish, you'll be able to gain insight into daily discounts on taxi fares for a specific period of time using Data Factory in Microsoft Fabric.

## Related content

In this introduction to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned:

> [!div class="checklist"]
> - The value and role of Microsoft Fabric
> - The value and role of Data Factory in Fabric
> - Key features of Data Factory
> - What you will learn in this tutorial

Continue to the next section now to create your data pipeline.

> [!div class="nextstepaction"]
> [Module 1: Create a pipeline with Data Factory](tutorial-end-to-end-pipeline.md)
