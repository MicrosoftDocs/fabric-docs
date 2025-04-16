---
title: "Overview of materialized lake view"
description: Materialized views in Microsoft Fabric facilitate the implementation of the Medallion architecture by enabling automated creation, scheduling, and execution of materialized views.
ms.author: abhishjain 
author: abhishjain002
ms.reviewer: nijelsf
ms.topic: tutorial
ms.date: 04/15/2025
---

# What is materialized view in lakehouse in Microsoft Fabric

Materialized views in Microsoft Fabric are designed to simplify the implementation of the Medallion architecture. These views allow for creation, scheduling, and scheduled execution of materialized views, optimizing data transformations through a declarative approach. 

## Key features and benefits
*	**Declarative pipelines**: They help manage data transformations through a declarative approach, optimizing execution as opposed to manually setting up and managing pipelines individually.
*	**Visualization and monitoring**: Developers can create and monitor data pipelines using SQL syntax extensions, visualize the directed acyclic graph (DAG) of the pipeline, and track its performance and status. The processing pipeline can optimize for performance by identifying the right sequence to update the data, only refreshing segments of the DAG that have changes.    
*	**Data quality Management**: Users can define and implement data quality checks and actions to be taken on errors, ensuring high data quality.

## Future enhancements

*	PySpark support for materialized views.
*	Built-in data quality dashboard.
*	Data quality alerts in Data Activator
*	Incremental refresh of materialized views.
*	Support for Cross lakehouse DAG and Execution.
