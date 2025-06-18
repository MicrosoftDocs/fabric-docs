---
title: Overview of Materialized Lake Views
description: Materialized lake views in Microsoft Fabric facilitate the implementation of the medallion architecture by enabling automated creation, scheduling, and execution of materialized lake views.
ms.author: nijelsf 
author: reachnijel
ms.reviewer: balaji.sankaran
ms.topic: overview
ms.date: 06/09/2025
# customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can leverage them for building a Medallion architecture.
---

# What are materialized lake views in Microsoft Fabric? 

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

Materialized lake views in Microsoft Fabric facilitate the implementation of a Medallion architecture, significantly enhancing data management. This functionality aids in the creation, management, and monitoring of views, and improves transformations through a declarative approach. Developers are empowered to concentrate on generating insights derived from data rather than dealing with infrastructure maintenance. 

## Key features and benefits

* **Declarative pipelines**: MLVs allow users to manage data transformations using a declarative approach, streamlining execution without the need to manually configure or maintain individual pipelines. This approach also supports defining data quality rules and specifying how to handle any violations that arise.

* **Visualization and monitoring**: Developers can visualize lineage across all entities in lakehouse, view the dependencies, and track its execution progress. The processing pipeline is optimized for performance by updating the data in the appropriate sequence, managing optimal parallel paths, and refreshing only the parts of the lineage that have changed. This feature offers an integrated data quality report that highlights data quality trends. Additionally, alerts can be configured based on any condition related to data quality rule violations.

## Current limitations

The following features aren't yet available for MLVs in Microsoft Fabric:

* PySpark isn't yet supported for MLVs.

* Incremental refresh capabilities are currently unavailable.

* There's no API support for managing MLVs.

* Cross-lakehouse DAG and execution aren't supported at this time.

* Cross-lakehouse lineage and execution aren't supported at this time.

## Related content

* [Create materialized lake views in a lakehouse](create-materialized-lake-view.md)
* [Monitor materialized lake views](monitor-materialized-lake-views.md)
