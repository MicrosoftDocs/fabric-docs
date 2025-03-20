---
title: "Microsoft Fabric materialized views tutorial"
description: This tutorial outlines the steps and considerations for implementing a medallion architecture for a sales analytics pipeline Fabric materialized views.
ms.author: rkottackal 
author: rkottackal 
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 03/20/2025
---

# Introduction
This tutorial outlines the steps and considerations for implementing a medallion architecture for a sales analytics pipeline Fabric Materialized Views. By the end of this tutorial, you will understand the key features and capabilities of Fabric Materialized Views and be able to create an automated data transformation workflow.
## Overview
Fabric Materialized Views are designed to simplify the implementation of the Medallion architecture using Spark SQL. These views allow for automated creation, scheduling, and execution of materialized views, optimizing data transformations through a declarative approach. Fabric materialized views offers declarative pipelines, manages dependencies, automates data processing workflows, and  robust monitoring capabilities to help data professionals in their data transformation journey.

## Key features and benefits
*	Declarative Pipelines: They help manage data transformations through a declarative approach, optimizing execution as opposed to manually setting up and managing pipelines individually.
*	Data Quality Checks: Users can define and implement data quality checks and actions to be taken on errors, ensuring high data quality.
*	Performance Optimization: The processing pipeline can optimize for performance by identifying the right sequence to update the data, only refreshing segments of the DAG that have changes.
*	Visualization and Monitoring: Developers can create and monitor data pipelines using SQL syntax extensions, visualize the directed acyclic graph (DAG) of the pipeline, and track its performance and status.

## Medallion architecture for sales analytics use case

**Layers**
* Bronze Layer: Ingests raw data
* Silver Layer: Cleanses data
* Gold Layer: Curates data for analytics and reporting

## Creating a pipeline

The high-level steps in module 1 are as follows:
1. Bronze Layer: Ingests raw data in the form of CSV files using Load to Table.
1. Silver Layer: Cleanses data using Fabric Materialized Views
1. Gold Layer: Curates data for analytics and reporting using Fabric Materialized Views.

As prerequisites to this tutorial, complete the following steps:
1.	Sign into your Power BI online account, or if you don't have an account yet, sign up for a free trial.
1.	Enable Microsoft Fabric in your tenant. Select the default Power BI icon at the bottom left of the screen and select Fabric.
1.	Create a Microsoft Fabric enabled Workspace: Create a workspace.
1.	Select a workspace from the Workspaces tab, then select + New item, and choose Data engineering. Provide a pipeline name. Then select Create.
1.	Create a Lakehouse titled SalesLakehouse and load the sample data files for raw data into the Lakehouse. For more information, see [Lakehouse tutorial](/fabric/data-engineering/tutorial-build-lakehouse).

## Next steps
