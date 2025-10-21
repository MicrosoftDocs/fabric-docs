---
title: Comparing Copy Job, Mirroring, Copy Activity, and Eventstreams in Microsoft Fabric
description: Compare Mirroring, Copy Job, and Copy Activity and Eventstreams in Microsoft Fabric to find the best data movement method for your needs. Learn their features and use cases.
author: whhender
ms.author: whhender
ms.reviewer: whhender
ms.date: 08/12/2025
ms.topic: concept-article
ai-usage: ai-assisted
---

# Microsoft Fabric decision guide: Choose a data movement strategy

Microsoft Fabric gives you several ways to bring data into Fabric, based on what you need. Today, you can use **Mirroring**, **Copy activities in Pipelines**, **Copy job**, or **Eventstreams**. Each option offers a different level of control and complexity, so you can pick what fits your scenario best.

Mirroring is designed to be simple and free solution to mirror database to Fabric, but it won't cover every advanced scenario. Copy activities in pipelines give you fully customizable data ingestion features, but they require you to build and manage pipeline by yourself. Copy job fills the gap between these 2 options. It gives you more flexibility and control than Mirroring, plus native support for both batch and incremental copying, without the complexity of building pipelines.

For real-time streaming ingestion and event-driven scenarios, try Eventstreams in Real-Time Intelligence. They provide low-latency data movement, let you transform data with no code or SQL transformations, and support content-based routing to multiple destinations including Eventhouse, Lakehouse and Activator.

:::image type="content" source="media/decision-guide-data-movement/decision-guide-data-movement.svg" alt-text="Screenshot of a data movement strategy decision tree, comparing mirroring, eventstream, copy job, and copy activity." lightbox="media/decision-guide-data-movement/decision-guide-data-movement.svg":::

## Key concepts

- **Mirroring** gives you a **simple and free** way to mirror operational data into Fabric for analytics. It's optimized for ease of use with minimal setup, and it writes to a single, read-only destination in OneLake.

- **Copy activities in Pipelines** is built for users who need **orchestrated, pipeline-based data ingestion workflows**. You can customize it extensively and add transformation logic, but you need to define and manage pipeline components yourself, including tracking the state of the last run for incremental copy.

- **Copy Job** makes data ingestion easier with **native support for multiple delivery styles, including bulk copy, incremental copy, and change data capture (CDC) replication, and you don't need to build pipelines**, while still giving you access to many advanced options. It supports many sources and destinations, and works well when you want more control than Mirroring but less complexity than managing pipelines with Copy activity.

- **Eventstreams**: Designed for real-time ingestion, transformation and processing of streaming data. Supports low-latency pipelines, schema management, and routing to destinations like Eventhouse, Lakehouse, Activator and Custom Endpoints supporting (AMQP, Kafka and HTTP endpoints).

## Data movement decision guide

| | **Mirroring** | **Copy job** | **Copy Activity (Pipeline)** | **Eventstreams** |
| --- | --- | --- | --- | --- |
| **Sources** | Databases + third-party integration into Open Mirroring | All supported data sources and formats | All supported data sources and formats | 25+ sources and all formats |
| **Destinations** | Tabular format in Fabric OneLake (read-only) | All supported destinations and formats | All supported destinations and formats | 4+ destinations |
| **Flexibility** | Simple setup with fixed behavior | Easy to use + Advanced options | Advanced and fully customizable options | Simple and customizable options |

| **Capability** | **Mirroring** | **Copy job** | **Copy Activity (Pipeline)** | **Eventstreams** |
| --- | :---: | :---: | :---: | :---: |
| Custom scheduling |  | Yes | Yes | Continuous |
| Table and Column management |  | Yes | Yes | Yes (schema, event & field management) |
| Copy behavior: Append, Upsert, Override |  | Yes | Yes | Append |
| Advanced observability + auditing |  | Yes | Yes | |
| **Copy modes** |  |  |  |   |
| CDC-based continuous replication | Yes | Yes |  | Yes |
| Batch or bulk copy |  | Yes | Yes | Yes (CDC initial snapshot replication) |
| Native support for Incremental copy (watermark-based) |  | Yes |  |  |
| Copy using user defined query |  | Yes | Yes |  | 
| **Use cases** |  |  |  |
| Continuous Replication for analytics and reporting | Yes | Yes |  | Yes |
| Metadata driven ELT/ETL for data warehousing |  | Yes | Yes |  |
| Data consolidation |  | Yes | Yes | Yes |
| Data migration / Data backup / Data sharing |  | Yes | Yes | Yes |
| Free of cost | Yes |  |  |  |
| Predictable performance |  | Yes | Yes |  Yes |

## Scenarios

Review these scenarios to help you choose which data movement strategy works best for your needs.

### Scenario 1

James is a finance manager at an insurance company. His team uses Azure SQL Database to track policy data, claims, and customer information across multiple business units. The executive team wants to create real-time dashboards for business performance monitoring, but James can't allow analytics queries to slow down the operational systems that process thousands of daily transactions.

James needs continuous data replication without any setup complexity or ongoing maintenance. He doesn't want to manage scheduling, configure incremental loads, or worry about table selection - he needs everything mirrored automatically. Since this is for executive reporting only, having the data in a read-only format in OneLake works perfectly. The solution also needs to be cost-effective since it's coming out of his department budget.

James looks at the options and chooses **Mirroring**. Mirroring provides the CDC-based continuous replication he needs, automatically handling all tables without any configuration. The simple setup means he doesn't need technical expertise, and the free cost fits his budget. The read-only tabular format in OneLake gives his team the real-time analytics access they need without impacting operational performance.

### Scenario 2

Lisa is a business analyst at a logistics company. She needs to copy shipment data from multiple Snowflake databases into Fabric Lakehouse tables for supply chain analysis. The data includes both historical records for the initial load and new shipments that arrive throughout the day. Lisa wants to run this process on a custom schedule - every 4 hours during business hours.

Lisa needs to select specific tables from each Snowflake instance, map columns to standardized names, and use upsert behavior to handle updates to existing shipment records. She needs table and column management capabilities to handle different schemas across regions, and she wants advanced monitoring to track data quality and processing performance.

Lisa looks at the options and selects **Copy job**. Copy job provides the custom scheduling she needs for her business hours requirements, supports all data sources including Snowflake, and offers the table and column management capabilities for her multi-region setup. The easy-to-use interface with advanced configuration options lets her handle incremental copy with watermark-based detection and upsert behavior without building pipelines.

### Scenario 3

David is a senior data engineer at a telecommunications company. He's building a complex data ingestion workflow that needs to extract customer usage data from Oracle using custom SQL queries, apply business transformations, and load it into multiple destinations including both Fabric Warehouse and external systems. The workflow also needs to coordinate with other pipeline activities like data validation and notification steps.

David needs full control over the copy process, including the ability to use user-defined queries to join tables and filter data at the source. He needs advanced and fully customizable configuration options, predictable performance for large data volumes, and the ability to integrate the copy process into broader pipeline orchestration workflows with dependencies and error handling.

David reviews the available options and chooses **Copy Activities in Pipelines**. This approach gives him the advanced and fully customizable configuration he needs, supports user-defined queries for complex data extraction, and provides the pipeline-based orchestration required for his workflow. The advanced monitoring and auditing capabilities help him track the complex process, while the pipeline framework lets him coordinate copy activities with other data processing steps.

### Scenario 4
Ash is a product manager at a telecom company. Her team needs to monitor customer support metrics like call volumes, wait times, and agent performance, in real time to ensure SLA compliance and improve customer satisfaction. The data comes from multiple operational systems including CRM platforms, call center logs, and agent assignment databases, and arrives at high frequency throughout the day.

Ash uses **Fabric Eventstreams** to ingest and transform this data in motion. She configures streaming connectors to pull data from various sources, applies transformations using the no-code experience, and routes the processed events to **Eventhouse** for real-time analytics. She integrates **Data Activator** to trigger alerts and automated workflows when SLA thresholds are breached so she can send notifications to supervisors or adjusting staffing levels dynamically.

The result is a real-time dashboard that updates within seconds, giving Ash’s team visibility into live performance metrics and enabling fast, data-driven decisions. This streaming architecture eliminates the latency of batch pipelines and empowers the business to respond instantly to customer needs.

## Get started

Now that you have an idea of which data movement strategy to use, you can get started with these resources:

- [Get started with Mirroring](/fabric/mirroring/overview)
- [Get started with Eventstreams](/fabric/real-time-intelligence/event-streams/overview)
- [Create a Copy Job](/fabric/data-factory/create-copy-job)
- [Create a Copy Activity](/fabric/data-factory/copy-data-activity)
