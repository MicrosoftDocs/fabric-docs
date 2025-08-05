---
title: Overview of Materialized Lake Views
description: Materialized lake views in Microsoft Fabric facilitate the implementation of the medallion architecture by enabling automated creation, scheduling, and execution of materialized lake views.
ms.author: nijelsf 
author: reachnijel
ms.reviewer: balaji.sankaran
ms.topic: overview
ms.date: 07/18/2025
# customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can leverage them for building a Medallion architecture.
---

# What are materialized lake views in Microsoft Fabric? 

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

Materialized lake views in Microsoft Fabric facilitate the implementation of a Medallion architecture, significantly enhancing data management. This functionality aids in the creation, management, and monitoring of views, and improves transformations through a declarative approach. Developers are empowered to concentrate on generating insights derived from data rather than dealing with infrastructure maintenance. 

## Key features and benefits

* **Declarative pipelines**: MLVs allow users to manage data transformations using a declarative approach, streamlining execution without the need to manually configure or maintain individual pipelines. This approach also supports defining data quality rules and specifying how to handle any violations that arise.

* **Visualization and monitoring**: Developers can visualize lineage across all entities in lakehouse, view the dependencies, and track its execution progress. The processing pipeline is optimized for performance by updating the data in the appropriate sequence, managing optimal parallel paths, and refreshing only the parts of the lineage that have changed. This feature offers an integrated data quality report that highlights data quality trends. Additionally, alerts can be configured based on any condition related to data quality rule violations.

> [!NOTE]
> - This feature will be rolling out in North Central US, South India Capacity Regions in next few weeks.
> - This feature is currently available in UK South, Canada East, France Central, Germany West Central, Israel Central, Italy North, Norway East, Poland Central,
 South Africa North, Spain Central, Sweden Central, Switzerland North, Canada Central, UK West, Switzerland West, Australia East, Australia Southeast, Brazil South,
 Central India, Central US, East Asia, East US, East US 2, Japan East, Japan West, Korea Central, Mexico Central, Southeast Asia, UAE North, West US, West US 2
 West US 3, North Europe, West Europe Capacity Regions.

## Current limitations

The following features aren't yet available for MLVs in Microsoft Fabric:

* Declarative syntax support for PySpark is on the roadmap and will be available in future updates. In the meantime, you can use Spark SQL syntax to create and refresh MLVs.
* Incremental refresh capabilities are planned for upcoming releases to enhance data freshness and efficiency. Currently, all refresh operations are performed as full refreshes.
* API support for managing MLVs is currently not supported.
* Cross-lakehouse lineage and execution features are being actively explored for future integration.

## Related content

* [Create materialized lake views in a lakehouse](create-materialized-lake-view.md)
* [Monitor materialized lake views](monitor-materialized-lake-views.md)
