---
title: Data Factory tutorial - Introduction
description: This article introduces an end-to-end data integration tutorial that provides step-by-step guidance to help you complete a full data integration scenario with Data Factory in Microsoft Fabric within an hour.
ms.reviewer: jonburchel
ms.author: xupzhou
author: pennyzhou-msft
ms.topic: tutorial
ms.date: 05/23/2023
---

# Introduction: Create your first end-to-end data intgegration scenario within an hour with Data Factory in Microsoft Fabric

This tutorial helps you accelerate the evaluation process for Data Factory in Microsoft Fabric by providing a step-by-step guidance for an full data integration scenario within one hour. By the end of this tutorial, you'll understand the value and key capabilities of Data Factory and know how to complete a common end-to-end data integration scenario.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Overview: Why Data Factory in Microsoft Fabric?

This section helps you understand the role of Fabric generally, as well as the role Data Factory plays within it.

### Understand the value of Microsoft Fabric

Microsoft Fabric provides a one-stop shop for all the analytical needs for every enterprise. It covers a complete spectrum of services including data movement, data lake, data engineering, data integration and data science, real time analytics, and business intelligence. With Fabric, there is no need to stitch together different services from multiple vendors. Instead, your users enjoy an end-to-end, highly integrated, single, and comprehensive product that is easy to understand, onboard, create, and operate.

### Understand the value of Data Factory in Microsoft Fabric

Data Factory in Fabric combines the ease-of-use of [Power Query](/power-query) with the scale and power of [Azure Data Factory](/azure/data-factory/introduction.md). It brings the best of both products together into a unified experience. The goal is to make sure Data Integration in Factory works well for both citizen and professional data developers. It provides low-code, AI-enabled data preparation and transformation experiences, petabyte-scale transformation, 100s of connectors with hybrid, multi-cloud connectivity. Purview provides governance, and the service features enterprise scale Data/Op commitments, CI/CD, application lifecycle management, and monitoring.

### Understand three key components of Data Factory

- Data ingestion: The Copy activity in pipelines lets you move petabyte-scale data from 100s of data sources into your data Lakehouse for further processing.
- Data transformation and preparation: Dataflows gen2 provide a low-code interface for transforming your data using 300+ data transformations, with the ability to load the transformed results into multiple destinations such as Azure SQL databases, Lakehouse, and more.
- End-to-end integration flow automation: Pipelines provide orchestration of activities that include [Copy, Dataflow, and Notebook activities, and more](activity-overview.md). This lets you manage activities all in one place. Activities in a pipeline can be chained together to operate sequentially, or they can operate independently in parallel.

In this end-to-end data integration use case, you learn:

- How to ingest data using a Copy Activity in a pipeline
- How to transform the data using a dataflow either with a no-code experience, or by writing your own code to process the data with a Script or Notebook activity
- How to automate the entire end-to-end data integration flow using a pipeline with triggers and flexible control flow activities.

### Your data integration story line

In the next 50 minutes, you are tasked with completing an end-to-end data integration scenario. This includes ingesting raw data from a source store into the Bronze table of a Lakehouse, processing all the data, moving it to the Gold table of the data Lakehouse, sending an email to notify you once all the jobs are complete, and finally, setting up the entire flow to run on a scheduled basis.

The scenario is divided into three modules:

- [Module 1: Create your first pipeline](tutorial-end-to-end-pipeline.md) to ingest raw data from a Blob storage to a Bronze table in a data Lakehouse.
- [Module 2: Create your first dataflow](tutorial-end-to-end-dataflow.md) to process the raw data from your Bronze table and move it to a Gold table in the data Lakehouse.
- [Module 3: Integrate your pipeline](tutorial-end-to-end-integration.md) to send an email to notify you once all the jobs are complete, and finally, setup the entire flow to run on a scheduled basis.

:::image type="content" source="media/tutorial-end-to-end-introduction/tutorial-explanation-diagram.png" alt-text="A diagram of the data flow and modules of the tutorial.":::

You will use the sample dataset **NYC-Taxi** as the data source for the tutorial. After you finish, you'll be able to gain insight into daily discounts on taxi fares for a specific period of time using Data Factory in Trident.

## Next steps

In this introduction to our end-to-end tutorial for your first data integration using Data Factory in Microsoft Fabric, you learned:

> [!div class="checklist"]
> - The value and role of Microsoft Fabric
> - The value and role of Data Factory in Fabric
> - Key components of Data Factory
> - What you will learn in this tutorial

Continue to the next section now to create your data pipeline.

> [!div class="nextstepaction"]
> [Module 1: Create your first pipeline](tutorial-end-to-end-pipeline.md)
