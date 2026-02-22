---
title: Unifying Analytics Across Fabric
description: Include file for unifying analytics accross fabric with streamlined "Analyze data with" experience in Lakehouse, Data Warehouse, and Eventhouse.
author: sspellurua
ms.author: spelluru
ms.topic: include
ms.date: 02/18/2026
---
 
# Unifying Analytics Across Fabric

Microsoft Fabric continues to converge analytics experiences across workloads. Historically, Fabric users had multiple ways to analyze data, with options across different menus and experiences. As users move from data to analysis customers can use a singular, predictable starting point for analysis, regardless of whether the data lives in a Lakehouse, Data Warehouse, or Eventhouse.

## Analyze data with: an entry point for all analytics

**Analyze data with** brings a consistent, discoverable, and powerful way to analyze data using SQL Endpoint, Eventhouse Endpoint, and Notebooks - both new and existing. <!--  should te notebook link be to notebooks in RTI or data engineering? --->

 **Analyze data with** is a first-class action across Fabric experiences and consolidates all analytical entry points into one consistent menu, making it clear how to move from data to insights, while preserving the flexibility power users expect.

Lakehouse, Eventhouse, and Data Warehouse main pages include **Analyze data with** as a primary action, with these options to analyze data:

| -- | Lakehouse | Eventhouse | Data Warehouse |
|--|--|--|--|
| [SQL Endpoint](../database/sql/sql-analytics-endpoint.md) | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: |
| [Eventhouse Endpoint](#eventhouse-endpoint-in-lakehouse-and-data-warehouse-main-pages) | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: | --- | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: |
| Notebook | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: | :::image type="content" source="media/yes-icon.png" alt-text="a yes icon"::: |

## Eventhouse Endpoint in Lakehouse and Data Warehouse main pages

Eventhouse Endpoint is designed to provide an Eventhouse-powered query experience directly on top of Lakehouse and Data Warehouse data, without data duplication or manual synchronization. When enabled, an Eventhouse and a KQL Database are automatically created as child artifacts of the source Lakehouse or Warehouse, with schema synchronization handled automatically in the backend.

Eventhouse Endpoint provides near-real-time analytical access to the source data without needing to manage a separate Eventhouse instance, or navigating to a separate workload. This integration makes Eventhouse a natural extension of the data source, rather than a separate system users must explicitly wire up and manage

For more information, see [Eventhouse Endpoint](../real-time-intelligence/eventhouse-as-endpoint.md).

## Analyze data with: from Eventhouse

The same *Analyze data with* concept is now applied directly within Eventhouse itself. A new unified action menu appears at the database level, consolidating all supported analytics tools in one place.

From Eventhouse, users can now:
Analyze data using SQL Endpoint (when OneLake availability and sync are enabled).
Analyze data using [Notebooks](../real-time-intelligence/notebooks.md), including both new and existing notebooks.
Launch analysis actions from a single, predictable location next to Share, rather than hunting through the ribbon.
This design reinforces a consistent mental model: no matter where you start, Lakehouse, Warehouse, or Eventhouse, the way you analyze data looks and feels the same.
Notebook support: new and existing, everywhere
Notebook integration is a core part of the “Analyze data with” experience across workloads. From both Lakehouse/Data Warehouse and Eventhouse entry points, users can seamlessly open new or existing notebooks and immediately start analyzing data.
Notable capabilities include:
Opening a notebook directly from a KQL Database or Eventhouse, with the database automatically added to the notebook environment.
Consistent behavior across Spark notebooks, regardless of whether the starting point is Lakehouse, Warehouse, or Eventhouse.
A single integration model that avoids special cases or duplicated flows.
This enables users to fluidly move between exploratory analysis, advanced transformations, and experimentation, without switching contexts or reconfiguring access.
A consistent experience across Fabric workloads
From internal PM and UX discussions, one theme was clear: consistency matters as much as capability. By integrating Eventhouse Endpoint into “Analyze data with” across all relevant main pages, Fabric delivers:
A unified entry point for analytics.
Clear discoverability for Eventhouse, SQL Endpoint, and Notebooks.
Reduced onboarding friction for new users.
A scalable model that allows additional workloads and tools to plug into the same pattern over time.
Rather than forcing users to learn different interaction models per workload, Fabric now offers a single, repeatable way to analyze data, powered by Eventhouse, wherever the data lives.
The integration of Eventhouse Endpoint into “Analyze data with” is not just a UI change, it’s a foundational step toward a more cohesive Fabric analytics experience. By aligning Lakehouse, Data Warehouse, and Eventhouse around the same analysis entry points, Fabric makes it easier for users to focus on what matters most: deriving insights from their data, fast.
 
 