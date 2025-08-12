---
title: Comparing Copy Job, Mirroring, and Copy Activity in Microsoft Fabric
description: Compare Mirroring, Copy Job, and Copy Activity in Microsoft Fabric to find the best data movement method for your needs. Learn their features and use cases.
author: whhender
ms.author: whhender
ms.reviewer: whhender
ms.date: 08/12/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Microsoft Fabric decision guide: choose a data movement strategy

Microsoft Fabric gives you several ways to bring data into Fabric, based on what you need. Today, you can use **Mirroring**, **Copy activity in Data Pipelines**, or **Copy job**. Each option offers a different level of control and complexity, so you can pick what fits your scenario best.

Mirroring is designed to be simple and free, but it won't cover every advanced scenario. Copy activity in Data pipelines gives you powerful data ingestion features, but it requires you to build and manage pipelines. Copy job fills the gap between these options. It gives you more flexibility and control than Mirroring, plus native support for both batch and incremental copying, without the complexity of building pipelines.

:::image type="content" source="media/decision-guide-data-movement/decision-guide-data-movement.svg" alt-text="Screenshot of a data movement strategy decision tree, comparing mirroring, copy job, and copy activity." lightbox="media/decision-guide-data-movement/decision-guide-data-movement.svg":::

## Key concepts

- **Mirroring** gives you a **simple and free** way to copy operational data into Fabric for analytics. It's optimized for ease of use with minimal setup, and it writes to a single, read-only destination in OneLake.

- **Copy activity in Data Pipelines** is built for users who need **orchestrated, pipeline-based data ingestion workflows**. You can customize it extensively and add transformation logic, but you need to define and manage pipeline components.

- **Copy Job** gives you a complete data ingestion experience from any source to any destination. It **makes data ingestion easier with native support for both batch and incremental copying, so you don't need to build pipelines**, while still giving you access to many advanced options. It supports many sources and destinations and works well when you want more control than Mirroring but less complexity than managing pipelines with Copy activity.

## Data movement decision guide

| **Capability** | **Mirroring** | **Copy job** | **Copy Activity (Pipeline)** |
| --- | --- | --- | --- |
| Sources | Databases + third-party integration into Open Mirroring | All supported data sources and formats | All supported data sources and formats |
| Destinations | Tabular format in Fabric OneLake (read-only) | All supported destinations and formats | All supported destinations and formats |
| Flexibility | Simple setup with fixed behavior | Easy to use + Advanced options | Advanced and fully customizable options |
| Custom scheduling |  | X | X |
| Table and Column management |  | X | X |
| Copy behavior: Append, Upsert, Override |  | X | X |
| Advanced observability + auditing |  | x | X |
| Copy modes |  |  |  |
| CDC-based continuous replication | X | X |  |
| Batch or bulk copy |  | X | X |
| Native support for Incremental copy (watermark-based) |  | X |  |
| Copy using user defined query |  |  | X |
| Use cases |  |  |  |
| Continuous Replication for analytics and reporting | X | X |  |
| Metadata driven ELT/ETL for data warehousing |  | X | X |
| Data consolidation |  | X | X |
| Data migration / Data backup / Data sharing |  | X | X |
| Free of cost | X |  |  |
| Predictable performance |  | X | X |

## Scenarios

Review these scenarios to help you choose which data movement strategy works best for your needs.

### Scenario 1

James is a finance manager at an insurance company. His team uses Azure SQL Database to track policy data, claims, and customer information across multiple business units. The executive team wants to create real-time dashboards for business performance monitoring, but James can't allow analytics queries to slow down the operational systems that process thousands of daily transactions.

James needs continuous data replication without any setup complexity or ongoing maintenance. He doesn't want to manage scheduling, configure incremental loads, or worry about table selection - he needs everything mirrored automatically. Since this is for executive reporting only, having the data in a read-only format in OneLake works perfectly. The solution also needs to be cost-effective since it's coming out of his department budget.

James looks at the options and chooses **Mirroring**. Mirroring provides the CDC-based continuous replication he needs, automatically handling all tables without any configuration. The simple setup means he doesn't need technical expertise, and the free cost fits his budget. The read-only tabular format in OneLake gives his team the real-time analytics access they need without impacting operational performance.

### Scenario 2

Lisa is a business analyst at a logistics company. She needs to copy shipment data from multiple Snowflake databases into Fabric Lakehouse tables for supply chain analysis. The data includes both historical records for the initial load and new shipments that arrive throughout the day. Lisa wants to run this process on a custom schedule - every 4 hours during business hours and once overnight for the full refresh.

Lisa needs to select specific tables from each Snowflake instance, map columns to standardized names, and use upsert behavior to handle updates to existing shipment records. She needs table and column management capabilities to handle different schemas across regions, and she wants advanced monitoring to track data quality and processing performance.

Lisa looks at the options and selects **Copy job**. Copy job provides the custom scheduling she needs for her business hours requirements, supports all data sources including Snowflake, and offers the table and column management capabilities for her multi-region setup. The easy-to-use interface with advanced configuration options lets her handle incremental copy with watermark-based detection and upsert behavior without building pipelines.

### Scenario 3

David is a senior data engineer at a telecommunications company. He's building a complex data ingestion workflow that needs to extract customer usage data from Oracle using custom SQL queries, apply business transformations, and load it into multiple destinations including both Fabric Warehouse and external systems. The workflow also needs to coordinate with other pipeline activities like data validation and notification steps.

David needs full control over the copy process, including the ability to use user-defined queries to join tables and filter data at the source. He needs advanced and fully customizable configuration options, predictable performance for large data volumes, and the ability to integrate the copy process into broader pipeline orchestration workflows with dependencies and error handling.

David reviews the available options and chooses **Copy Activity in Pipelines**. This approach gives him the advanced and fully customizable configuration he needs, supports user-defined queries for complex data extraction, and provides the pipeline-based orchestration required for his workflow. The advanced monitoring and auditing capabilities help him track the complex process, while the pipeline framework lets him coordinate copy activities with other data processing steps.

## Get started

Now that you have an idea of which data movement strategy to use, you can get started with these resources:

- [Get started with Mirroring](/fabric/database/mirrored-database/overview)
- [Create a Copy Job](/fabric/data-factory/create-copy-job)
- [Create a Copy Activity](/fabric/data-factory/copy-data-activity)