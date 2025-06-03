---
title: "Overview of materialized lake views"
description: Materialized lake views in Microsoft Fabric facilitate the implementation of the medallion architecture by enabling automated creation, scheduling, and execution of materialized lake views.
ms.author: nijelsf 
author: reachnijel
ms.reviewer: balaji.sankaran
ms.topic: tutorial
ms.date: 06/03/2025
---

# What is materialized lake views in Microsoft Fabric? 

Materialized lake views in Microsoft Fabric facilitate the implementation of a Medallion architecture, thereby enhancing data management. This functionality aids in the creation, management, and monitoring of views, and improves transformations through a declarative approach. Developers are enabled to focus on delivering insights based on data rather than concerning themselves with infrastructure maintenance. 

## Key features and benefits

*	**Declarative pipelines**: Materialized lake views facilitate the management of data transformations through a declarative methodology, thereby optimizing execution without necessitating manual configuration and administration of individual pipelines. This syntax provides the capability to establish data quality regulations and address any infractions that may occur through defined actions.
  
*	**Visualization and monitoring**: Visualization and monitoring: Developers can visualize lineage across all entities in lakehouse, view the dependencies and track its execution progress. The processing pipeline shall be optimized for performance by updating the data in the appropriate sequence, managing optimal parallel paths, and exclusively refreshing segments of the lineage that have changes. This feature offers an integrated data quality report that highlights data quality trends. Additionally, alerts can be configured based on any condition related to data quality rule violations. 

## Future enhancements

*	PySpark support for materialized lake views.
*	Incremental refresh of materialized lake views.
*	API support for Materialized lake view management.
*	Support for Cross lakehouse DAG and Execution. 
