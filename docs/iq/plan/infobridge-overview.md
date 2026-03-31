---
title: InfoBridge in plan (preview)
description: Learn about the InfoBridge component of the plan (preview) item. InfoBridge is a no-code data integration and transformation tool to connect multiple data sources, prepare data, and create unified reports.
ms.date: 03/30/2026
ms.topic: overview
ai-usage: ai-assisted
#customer intent: As a user, I want to use InfoBridge to consolidate my plans, budgets, simulations, and forecasts across source systems and reports.
---

# What is InfoBridge in plan (preview)?

The *InfoBridge* component of plan (preview) is a no-code data integration, preparation, and transformation engine that lets you connect to multiple data sources and consolidate them into a single, unified report. It has a user-friendly transformation interface to perform common data transformations on data sources, such as appending, merging, pivoting, un-pivoting, and grouping data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Why use InfoBridge?

Business reporting and planning often involve multi-page reports with data at varying granularities. The data from multiple visuals needs to be written back into a single write-back table, or be consumed in either a consolidated P&L statement or an executive dashboard that aggregates data to the highest level. InfoBridge can help with many use cases that typically require composite modeling, ETL and automation tools, complex DAX and SQL scripting, extensive BI expertise, and IT overheads.

InfoBridge offers these features:

* **No code platform**: InfoBridge offers a no-code experience for use cases that would normally demand intensive DAX and composite modeling.
* **Visual data integration**: With InfoBridge, you can seamlessly access data from any Planning sheet in real time. Pull data from different visuals without ETL expertise.
* **Pivoting data**: You can add pivot and un-pivot dimensions and measures on demand. Adding new dimensions or pivoting data can be done with a few clicks instead of using complex SQL and DAX scripts.
* **Write-back**: InfoBridge allows the consolidation of multiple visuals into a single write-back table. Without InfoBridge, you'd need to write back to separate tables and maintain each of them.

### Where to use InfoBridge

* **Regional and global budgeting**: Manage regional budgets with dedicated pages for each region, consolidated into a global budget page.
* **Operational expense planning**: Plan expenses at a granular level (for example, salary plans at the employee level) and consolidate them into broader expense categories.
* **Financial planning and analysis**: Import sales and COGS data from product-level reports into consolidated P & L statements. Perform planning and forecasts on the consolidated data.
* **Planning in pharmaceutical and manufacturing industries**: Plan at the material level and aggregate data to higher levels like plant or product family.
* **Cost center planning**: Perform planning at detailed levels (for example, IT maintenance costs, miscellaneous costs within specific cost centers) and aggregate the data for executive dashboards.
* **Capacity planning**: Convert volume forecasts from the planning sheets into headcount and resource requirements.

## Key capabilities

The following table lists the core capabilities of InfoBridge.

| Capability | Description |
|---|---|
| **Centralized data access** | Access business data from multiple systems in a single platform, reducing the need to switch between tools. |
| **Data integration** | Combine and harmonize data from different types of sources to create unified reports. |
| **Collaborative planning** | Create forecasts, budgets, and plans across multiple planning sheets and integrate them with InfoBridge. |
| **Advanced data transformation** | Join, merge, append, group, and pivot rows and columns. |
| **Data cleansing functions** | Built-in data cleansing functions, such as rounding, text manipulation, find-and-replace, and sorting to help standardize, clean, and organize datasets. |


## Next steps
 
Learn how to use InfoBridge in the following articles:

* [Connect measures between Planning sheets](infobridge-how-to-share-measures.md)
* [Write back InfoBridge data](infobridge-how-to-write-back-data.md)
