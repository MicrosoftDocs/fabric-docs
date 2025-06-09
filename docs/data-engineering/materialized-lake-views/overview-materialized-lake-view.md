---
title: Overview of materialized lake views
description: Materialized lake views in Microsoft Fabric facilitate the implementation of the medallion architecture by enabling automated creation, scheduling, and execution of materialized lake views.
ms.author: nijelsf 
author: reachnijel
ms.reviewer: balaji.sankaran
ms.topic: overview
ms.date: 06/09/2025
# customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can leverage them for building a Medallion architecture.
---

# What are materialized lake views in Microsoft Fabric? 

Materialized lake views in Microsoft Fabric support building a Medallion architecture by simplifying data transformations and management. They enable users to create, manage, and monitor views using a declarative approach, allowing developers to focus on working with data instead of handling infrastructure.

## Key features and benefits

* **Declarative pipelines**: Materialized lake views allow users to manage data transformations using a declarative approach, streamlining execution without the need to manually configure or maintain individual pipelines. This approach also supports defining data quality rules and specifying how to handle any violations that arise.

* **Visualization and monitoring**: Developers can visualize lineage across all entities in lakehouse, view the dependencies, and track its execution progress. The processing pipeline is optimized for performance by updating the data in the appropriate sequence, managing optimal parallel paths, and refreshing only the parts of the lineage that have changed. This feature offers an integrated data quality report that highlights data quality trends. Additionally, alerts can be configured based on any condition related to data quality rule violations.

## Current limitations

The following features aren't yet available for materialized lake views in Microsoft Fabric:

* PySpark isn't yet supported for materialized lake views.

* Incremental refresh capabilities are currently unavailable.

* There's no API support for managing materialized lake views.

* Cross-lakehouse lineage and execution aren't supported at this time.

## Related content

* [Create a materialized lake view](create-materialized-lake-view.md)
* [Monitor a materialized lake view](monitor-materialized-lake-views.md)
