---
title: Infobridge in Plan (Preview)
description: Learn about the Infobridge component of the plan (preview) item. Infobridge is a no-code data integration and transformation tool to connect multiple data sources, prepare data, and create unified reports.
ms.date: 03/30/2026
ms.topic: overview
ms.search.form: Getting Started with Infobridge
ai-usage: ai-assisted
#customer intent: As a user, I want to use Infobridge to consolidate my plans, budgets, simulations, and forecasts across source systems and reports.
---

# What is Infobridge in plan (preview)?

The *Infobridge* component of plan (preview) is a no-code data integration, preparation, and transformation engine that lets you connect to multiple data sources and consolidate them into a single, unified report. You can also perform common transformations on data sources, such as appending, merging, pivoting, unpivoting, and grouping data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Why use Infobridge?

Business reporting and planning often involve multi-page reports with data at varying granularities. Infobridge consolidates data from multiple sheets into a single writeback table—simplifying data management and ensuring consistency across reports. Without Infobridge, each sheet writes back to its own table, and you maintain multiple tables separately.

Infobridge solves use cases that require:

* Composite modeling
* Extract, transform, load (ETL) and automation tools
* Complex Data Analysis Expressions (DAX) and SQL scripting
* Extensive business intelligence expertise

>[!NOTE]
>**Best practice**  
>Use a single writeback table whenever possible. This approach minimizes maintenance overhead and makes it easier to consume data in consolidated profit and loss (P&L) statements or executive dashboards.

## Use cases for Infobridge

* **Regional and global budgeting**: Manage regional budgets with dedicated pages for each region, and consolidate them into a global budget page.
* **Operational expense planning**: Plan expenses at a granular level (for example, salary plans at the employee level) and consolidate them into broader expense categories.
* **Financial planning and analysis**: Import sales and cost of goods sold (COGS) data from product-level reports into consolidated P&L statements. Plan and forecast on the consolidated data.
* **Planning in pharmaceutical and manufacturing industries**: Plan at the material level and aggregate data to higher levels like plant or product family.
* **Cost center planning**: Plan at detailed levels (for example, IT maintenance costs, miscellaneous costs within specific cost centers) and aggregate the data for executive dashboards.
* **Capacity planning**: Convert volume forecasts from the planning sheets into headcount and resource requirements.

## Key capabilities

The following table lists the core capabilities of Infobridge.

| Capability | Description |
|---|---|
| **Centralized data access** | Access business data from multiple systems in a single platform, reducing the need to switch between tools. |
| **Data integration** | Combine data from different types of sources to create unified reports. |
| **Collaborative planning** | Create forecasts, budgets, and plans across multiple planning sheets and integrate them with Infobridge. |
| **Advanced data transformation** | Join, merge, append, group, and pivot rows and columns. |
| **Data cleansing functions** | Standardize, clean, and organize datasets with built-in functions, such as rounding, text manipulation, find-and-replace, and sorting. |

## Infobridge integration with plan

Infobridge integrates data from planning sheets, PowerTable sheets, and other data sources, and then writes the consolidated data back to a single destination table.

This process involves the following tasks:

* Create a bridge from a planning sheet.
* Add data sources from sheets or external files.
* Transform and prepare data within the bridge.
* Write the consolidated data back to the destination table.

## Next steps

Learn how to use Infobridge in the following articles:

* [Connect measures between planning sheets](infobridge-how-to-share-measures.md)
* [Write back Infobridge data](infobridge-how-to-write-back-data.md)
