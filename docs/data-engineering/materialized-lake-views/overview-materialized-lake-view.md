---
title: Overview of Materialized Lake Views
description: Learn about the features, availability, and limitations of materialized lake views in Microsoft Fabric.
ms.author: nijelsf 
author: reachnijel
ms.reviewer: balaji.sankaran
ms.topic: overview
ms.date: 07/18/2025
# customer intent: As a data engineer, I want to understand what materialized lake views are in Microsoft Fabric so that I can use them for building a medallion architecture.
---

# What are materialized lake views in Microsoft Fabric?

[!INCLUDE [preview-note](./includes/materialized-lake-views-preview-note.md)]

Materialized lake views in Microsoft Fabric facilitate the implementation of a medallion architecture to enhance data management. This functionality aids in the creation, management, and monitoring of views, and it improves transformations through a declarative approach. Developers can concentrate on generating insights derived from data rather than dealing with infrastructure maintenance.

## Key features and benefits

* **Declarative pipelines**: With materialized lake views, you can manage data transformations by using a declarative approach. This approach streamlines execution without the need to manually configure or maintain individual pipelines. This approach also supports defining data quality rules and specifying how to handle any violations that arise.

* **Visualization and monitoring**: You can visualize lineage across all entities in a lakehouse, view the dependencies, and track execution progress. The processing pipeline is optimized for performance by updating the data in the appropriate sequence, managing optimal parallel paths, and refreshing only the parts of the lineage that changed.

  This feature offers an integrated report that highlights data quality trends. You can also configure alerts based on any condition related to violations of a data quality rule.

## Regional availability

This feature is currently available in:

* Australia East, Australia Southeast
* Brazil South
* Canada Central, Canada East
* Central India
* Central US, East US, East US 2, West US, West US 2, West US 3
* East Asia, Southeast Asia
* France Central
* Germany West Central
* Israel Central
* Italy North
* Japan East, Japan West
* Korea Central
* Mexico Central
* North Europe, West Europe Capacity Regions
* Norway East
* Poland Central
* South Africa North
* Spain Central
* Sweden Central
* Switzerland North, Switzerland West
* UAE North
* UK South, UK West

## Current limitations

The following features are currently not available for materialized lake views in Microsoft Fabric:

* Declarative syntax support for PySpark. You can use Spark SQL syntax to create and refresh materialized lake views.
* Incremental refresh capabilities to enhance data freshness and efficiency. All refresh operations are performed as full refreshes.
* API support for managing materialized lake views.
* Cross-lakehouse lineage and execution features.

## Related content

* [Spark SQL reference for materialized lake views](create-materialized-lake-view.md)
* [Monitor materialized lake views](monitor-materialized-lake-views.md)
