---
title: Understand on-demand billing meters and multipliers
description: Learn how Microsoft Fabric operations map to on-demand billing categories, Azure billing meters, and pricing multipliers.
author: harieswar7
ms.author: harieswar
ms.topic: reference
ms.date: 11/06/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand how on-demand operations are metered and priced so that I can interpret and manage my Azure charges.
---

# Understand on-demand billing meters and multipliers

On-demand billing lets supported Microsoft Fabric operations run outside the capacity's shared compute limit and be billed separately through Azure on-demand billing meters. Each operation maps to an on-demand billing category, meter, and multiplier. The multiplier applies to the regional pay-as-you-go price per CU-hour.

For example, a multiplier of `1.3` means the applicable on-demand meter rate is 1.3 times the regional pay-as-you-go price per CU-hour. The multiplier applies to the price, not to the amount of usage reported by the operation.

To calculate the pay-as-you-go price per CU-hour, find the hourly price for a Fabric capacity SKU in your region and currency on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page, and then divide that price by the number of CUs in the SKU. For example, divide the F2 hourly price by `2`. The pricing page provides the underlying capacity SKU price, not the final rate for an on-demand billing meter.

> [!IMPORTANT]
> On-demand billing prices and multipliers are subject to change. Use the current Azure pricing information for your region and currency when you estimate charges.

For more information about Fabric charges in Azure, see [Understand your Azure bill for a Fabric capacity](azure-billing.md). For descriptions of Fabric operations and how they consume resources, see [Fabric operations](fabric-operations.md).

## Billing concepts

| Concept | Description |
| --- | --- |
| **On-demand billing category** | A configuration and billing boundary that groups related Fabric operations. When you enable a category for on-demand billing, its mapped operations run and bill independently of the capacity's shared compute limit. |
| **Operation** | A specific Fabric activity that consumes resources. Most operation names appear in the Capacity Metrics app. Some operations use legacy names. |
| **On-demand billing meter** | The Azure billing meter that receives usage for an operation while its category uses on-demand billing. On-demand meter names are separate from the meters used for provisioned capacity usage. |
| **On-demand billing multiplier** | The factor applied to the corresponding pay-as-you-go rate to determine the on-demand meter rate. For example, `1` means the same rate, `1.5` means 1.5 times the rate, and `3` means three times the rate. |

The following simplified formula shows how the multiplier affects pricing:

> **On-demand meter rate per CU-hour = pay-as-you-go price per CU-hour × on-demand billing multiplier**

The estimated charge for an operation is:

> **Estimated on-demand charge = CU-hours consumed × on-demand meter rate per CU-hour**

Your charge is based on the metered usage and the resulting on-demand meter rate. Other Azure pricing factors, including region, currency, and applicable agreements, can affect the final charge.

> [!NOTE]
> The [Azure Retail Prices REST API](/rest/api/cost-management/retail-prices/azure-retail-prices) returns the regional retail rate for an on-demand billing meter in the `retailPrice` and `unitPrice` properties. This rate already includes the on-demand billing multiplier. Don't apply the multiplier again to a rate returned for an on-demand billing meter. The formulas in this article explain how the on-demand meter rate is derived from the pay-as-you-go price per CU-hour; they aren't an additional calculation to apply to the API result.

## On-demand billing categories

The following table lists the on-demand billing categories and the operations they group.

| On-demand billing category | Definition |
| --- | --- |
| AI data transform | AI Functions and AI Services, Dataflow Gen2, notebook and Spark job runs, shortcut transformations, Project Osmos, SQL analytics endpoint and Warehouse queries, and AI Function Evaluation operations. |
| Application Development | User Data Functions and API for GraphQL operations. |
| Copilot | Copilot operations in Fabric. |
| Cosmos DB database | Cosmos DB capacity usage operations. |
| Data agents | AI query operations. |
| Data Factory | Dataflow, data movement, pipeline activity, and Apache Airflow job operations. |
| VNet data gateway | VNet data gateway uptime operations. |
| Mirroring | Extended capabilities for mirroring billing operations. |
| Data Science | Machine learning model endpoint operations. |
| Data Warehouse | Warehouse query, SQL analytics endpoint query, snapshot query, and notebooks running T-SQL operations. |
| Fabric IQ | Ontology modeling, discovery, AI and reasoning, Graph general, ingestion, and serving, and Fabric Planning background and session operations. |
| OneLake | OneLake read, write, security, and diagnostic operations. |
| Power BI Core Services | Full report email subscription, interactive and public API exports, subscription export, parameter processing, and report rendering operations. |
| Power BI Semantic Models | Semantic model refresh, queries, AI Function Evaluation, VNet data gateway, web modeling, and XMLA read and write operations. |
| Real-Time Intelligence - Eventhouse | Eventhouse uptime, KQL Database, and KQL Queryset operations. |
| Real-Time Intelligence | Eventstream, event ingestion and operations, listeners and alerts, anomaly detection, Activator event computations, Investigation agent reasoning, Operations Agent reasoning and compute, and Maps operations. |
| SQL Database | SQL database in Fabric usage operations. |

> [!NOTE]
> * Autoscale Billing for Apache Spark has been renamed **On-demand Billing for Apache Spark**. This separate Spark billing feature has its own configuration and meter and isn't represented in this article. Some operations in the mappings use the **Spark Memory Optimized OD On-Demand Usage CU** meter as part of category-based on-demand billing. Those mappings don't represent or change the separate On-demand Billing for Apache Spark configuration. To learn more, see [On-demand Billing for Spark](../data-engineering/autoscale-billing-for-spark-overview.md).

Some OneLake operations use legacy names that contain **via Proxy** or **via Redirect**. Since May 2026, the Capacity Metrics app consolidates these names by operation and storage tier. To reconcile a legacy mapping with the name shown in the app, see [OneLake consumption](../onelake/onelake-consumption.md) and [Understand OneLake capacity consumption](../onelake/onelake-capacity-consumption.md).

## Operation, meter, and multiplier mappings

The following table lists the customer-facing Azure billing meter and pay-as-you-go multiplier for each operation that supports on-demand billing.

An operation name can appear in more than one category when Fabric emits the same name from different workload contexts. Use the billing category and operation together to identify the applicable configuration, quota, spend limit, meter, and multiplier.

| On-demand billing category | Operation | On-demand billing meter | Multiplier against pay-as-you-go rate |
| --- | --- | --- | --- |
| AI data transform | AI Function Evaluation | Power BI OD On-Demand Usage CU | 3 |
| AI data transform | AI Functions | Copilot and AI OD On-Demand Usage CU | 1 |
| AI data transform | AI Services | Copilot and AI OD On-Demand Usage CU | 1 |
| AI data transform | Dataflow Gen2 Refresh | Dataflows Standard Compute OD On-Demand Usage CU | 1.2 |
| AI data transform | Dataflow Gen2 Run Queries | Dataflows Standard Compute OD On-Demand Usage CU | 1.2 |
| AI data transform | Jupyter Notebook Pipeline Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Jupyter Notebook Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Jupyter Notebook Scheduled Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook HC Pipeline Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook HC Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook Interactive Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook Pipeline Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook Scheduled Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Notebook VSCode Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Project Osmos | Copilot and AI OD On-Demand Usage CU | 1 |
| AI data transform | Shortcut Transformations | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Spark Job Pipeline Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Spark Job Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Spark Job Scheduled Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | Spark Job VSCode Run | Spark Memory Optimized OD On-Demand Usage CU | 1 |
| AI data transform | SQL Endpoint Query | Data Warehouse OD On-Demand Usage CU | 1.3 |
| AI data transform | Warehouse Query | Data Warehouse OD On-Demand Usage CU | 1.3 |
| Application Development | GraphQL Query | API for GraphQL Query OD On-Demand Usage CU | 2 |
| Application Development | Query | API for GraphQL Query OD On-Demand Usage CU | 2 |
| Application Development | User Data Functions Execution | user data functions OD On-Demand Usage CU | 2 |
| Application Development | User Data Functions Portal Test | user data functions OD On-Demand Usage CU | 2 |
| Application Development | User Data Functions Static Storage Iterative Read | OneLake Iterative Read Operations OD On-Demand Usage CU | 1 |
| Application Development | User Data Functions Static Storage Other Operations | OneLake Other Operations OD On-Demand Usage CU | 1 |
| Application Development | User Data Functions Static Storage Read | OneLake Read Operations OD On-Demand Usage CU | 1 |
| Application Development | User Data Functions Static Storage Write | OneLake Write Operations OD On-Demand Usage CU | 1 |
| Copilot | Copilot In Fabric | Copilot and AI OD On-Demand Usage CU | 1 |
| Cosmos DB database | CapacityUsage | Cosmos Database in Microsoft Fabric OD On-Demand Usage CU | 2 |
| Cosmos DB database | Cosmos DB Capacity Usage | Cosmos Database in Microsoft Fabric OD On-Demand Usage CU | 2 |
| Data agents | AI Query | Copilot and AI OD On-Demand Usage CU | 1 |
| Data Factory | ActivityRun | Data Orchestration OD On-Demand Usage CU | 1 |
| Data Factory | ApacheAirflowJob Large | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | ApacheAirflowJob Large Extra Node | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | ApacheAirflowJob Small | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | ApacheAirflowJob Small Extra Node | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | Data movement - Incremental copy | Data Movement - Incremental copy OD On-Demand Usage CU | 1 |
| Data Factory | Data transformation - dbt job | dbt job OD On-Demand Usage CU | 1.3 |
| Data Factory | Dataflow Gen2 Refresh | Dataflows Standard Compute OD On-Demand Usage CU | 1.2 |
| Data Factory | Dataflow Gen2 Run Queries | Dataflows Standard Compute OD On-Demand Usage CU | 1.2 |
| Data Factory | Dataflow Refresh | Power BI OD On-Demand Usage CU | 3 |
| Data Factory | Dataflows Gen2 Run Query API | Dataflows Standard Compute OD On-Demand Usage CU | 1.2 |
| Data Factory | DataMovement | Data Movement OD On-Demand Usage CU | 1 |
| Data Factory | DataWorkflow Large | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | DataWorkflow Large Extra Node | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | DataWorkflow Small | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | DataWorkflow Small Extra Node | Apache Airflow job OD On-Demand Usage CU | 1.5 |
| Data Factory | High Scale Dataflow Compute - Spark Query | High Scale Dataflow Compute - Spark OD On-Demand Usage CU | 1.2 |
| Data Factory | SQL Server Integration Services Uptime | SSIS in Fabric OD On-Demand Usage CU | 1 |
| VNet data gateway | VNet Data Gateway Uptime | VNet Data Gateway OD On-Demand Usage CU | 1.5 |
| Mirroring | Mirror Replication Premium | Data Movement - Incremental copy OD On-Demand Usage CU | 1 |
| Data Science | Investigation agent reasoning | Operations Agents Autonomous Reasoning OD On-Demand Usage CU | 1 |
| Data Science | Model Endpoint | ML Model Endpoint OD On-Demand Usage CU | 1 |
| Data Warehouse | SQL Endpoint Query | Data Warehouse OD On-Demand Usage CU | 1.3 |
| Data Warehouse | SQL Endpoint Query (Accelerated) | Data Warehouse Accelerated OD On-Demand Usage CU | 1.3 |
| Data Warehouse | Warehouse Query | Data Warehouse OD On-Demand Usage CU | 1.3 |
| Data Warehouse | Warehouse Query (Accelerated) | Data Warehouse Accelerated OD On-Demand Usage CU | 1.3 |
| Data Warehouse | Warehouse Snapshot Query | Data Warehouse OD On-Demand Usage CU | 1.3 |
| Data Warehouse | Warehouse Snapshot Query (Accelerated) | Data Warehouse Accelerated OD On-Demand Usage CU | 1.3 |
| Fabric IQ | Background Job | Fabric Planning - Automated Jobs OD On-Demand Usage CU | 3 |
| Fabric IQ | Graph General Operations | Graph data management OD On-Demand Usage CU | 3 |
| Fabric IQ | Graph Ingestion Operations | Graph data management OD On-Demand Usage CU | 3 |
| Fabric IQ | Graph Serving Operations | Graph data management OD On-Demand Usage CU | 3 |
| Fabric IQ | Ontology AI | Ontology AI OD On-Demand Usage CU | 1 |
| Fabric IQ | Ontology AI Reasoning | Ontology AI OD On-Demand Usage CU | 1 |
| Fabric IQ | Ontology Discovery | Ontology Discovery OD On-Demand Usage CU | 3 |
| Fabric IQ | Ontology Modeling | Ontology Modeling OD On-Demand Usage CU | 3 |
| Fabric IQ | Planner Session | Fabric Planning - Planner Sessions OD On-Demand Usage CU | 3 |
| Fabric IQ | Stakeholder Session | Fabric Planning - Stakeholder Sessions OD On-Demand Usage CU | 3 |
| Fabric IQ | Viewer Session | Fabric Planning - Viewer Sessions OD On-Demand Usage CU | 3 |
| OneLake | OneLake BCDR Data Retrieval Cold | OneLake Data Retrieval Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Data Retrieval Cool | OneLake Data Retrieval Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Diagnostics Event Operation | OneLake BCDR Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Diagnostics Event Operation Cold | OneLake BCDR Write Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Diagnostics Event Operation Cool | OneLake BCDR Write Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read Hot | OneLake BCDR Iterative Read Operation Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read Operations Cold | OneLake BCDR Iterative Read Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read Operations Cool | OneLake BCDR Iterative Read Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read via Proxy | OneLake BCDR Iterative Read Operation Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read via Proxy Preview | OneLake BCDR Iterative Read Operation Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read via Proxy Public | OneLake BCDR Iterative Read Operation Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read via Redirect | OneLake BCDR Iterative Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read via Redirect Preview | OneLake BCDR Iterative Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Read via Redirect Public | OneLake BCDR Iterative Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write Hot | OneLake BCDR Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write Operations Cold | OneLake BCDR Iterative Write Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write Operations Cool | OneLake BCDR Iterative Write Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write via Proxy | OneLake BCDR Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write via Proxy Preview | OneLake BCDR Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write via Proxy Public | OneLake BCDR Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write via Redirect | OneLake BCDR Iterative Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write via Redirect Preview | OneLake BCDR Iterative Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Iterative Write via Redirect Public | OneLake BCDR Iterative Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations | OneLake BCDR Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Cold | OneLake BCDR Other Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Cool | OneLake BCDR Other Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Hot | OneLake BCDR Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Preview | OneLake BCDR Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Public | OneLake BCDR Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Via Redirect | OneLake BCDR Other Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Via Redirect Preview | OneLake BCDR Other Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Other Operations Via Redirect Public | OneLake BCDR Other Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read Hot | OneLake BCDR Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read Operations Cold | OneLake BCDR Read Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read Operations Cool | OneLake BCDR Read Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read via Proxy | OneLake BCDR Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read via Proxy Preview | OneLake BCDR Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read via Proxy Public | OneLake BCDR Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read via Redirect | OneLake BCDR Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read via Redirect Preview | OneLake BCDR Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Read via Redirect Public | OneLake BCDR Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write Hot | OneLake BCDR Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write Operations Cold | OneLake BCDR Write Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write Operations Cool | OneLake BCDR Write Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write via Proxy | OneLake BCDR Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write via Proxy Preview | OneLake BCDR Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write via Proxy Public | OneLake BCDR Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write via Redirect | OneLake BCDR Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write via Redirect Preview | OneLake BCDR Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake BCDR Write via Redirect Public | OneLake BCDR Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Data Retrieval Cold | OneLake Data Retrieval Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Data Retrieval Cool | OneLake Data Retrieval Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Diagnostics Data Transfer | OneLake diagnostics OD On-Demand Usage CU | 1 |
| OneLake | OneLake Diagnostics Event Operation | OneLake Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Diagnostics Event Operation Cold | OneLake Write Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Diagnostics Event Operation Cool | OneLake Write Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read Hot | OneLake Iterative Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read Operations Cold | OneLake Iterative Read Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read Operations Cool | OneLake Iterative Read Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read via Proxy | OneLake Iterative Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read via Proxy Preview | OneLake Iterative Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read via Proxy Public | OneLake Iterative Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read via Redirect | OneLake Iterative Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read via Redirect Preview | OneLake Iterative Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Read via Redirect Public | OneLake Iterative Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write Hot | OneLake Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write Operations Cold | OneLake Iterative Write Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write Operations Cool | OneLake Iterative Write Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write via Proxy | OneLake Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write via Proxy Preview | OneLake Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write via Proxy Public | OneLake Iterative Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write via Redirect | OneLake Iterative Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write via Redirect Preview | OneLake Iterative Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Iterative Write via Redirect Public | OneLake Iterative Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations | OneLake Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Cold | OneLake Other Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Cool | OneLake Other Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Hot | OneLake Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Preview | OneLake Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Public | OneLake Other Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Via Redirect | OneLake Other Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Via Redirect Preview | OneLake Other Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Other Operations Via Redirect Public | OneLake Other Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read Hot | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read Operations Cold | OneLake Read Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read Operations Cool | OneLake Read Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read via Proxy | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read via Proxy Preview | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read via Proxy Public | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read via Redirect | OneLake Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read via Redirect Preview | OneLake Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Read via Redirect Public | OneLake Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Security RLS | OneLake Security OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Read via Proxy | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Read via Proxy Preview | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Read via Proxy Public | OneLake Read Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Read via Redirect | OneLake Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Read via Redirect Preview | OneLake Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Read via Redirect Public | OneLake Read Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Write via Proxy | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Write via Proxy Preview | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Write via Proxy Public | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Write via Redirect | OneLake Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Write via Redirect Preview | OneLake Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Shortcut Write via Redirect Public | OneLake Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Table Preview via API | OneLake Table Read via API OD On-Demand Usage CU | 1 |
| OneLake | OneLake Table Read via API | OneLake Table Read via API OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write Hot | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write Operations Cold | OneLake Write Operations Cold OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write Operations Cool | OneLake Write Operations Cool OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write via Proxy | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write via Proxy Preview | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write via Proxy Public | OneLake Write Operations Hot OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write via Redirect | OneLake Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write via Redirect Preview | OneLake Write Operations OD On-Demand Usage CU | 1 |
| OneLake | OneLake Write via Redirect Public | OneLake Write Operations OD On-Demand Usage CU | 1 |
| Power BI Core Services | Full Report Email Subscription | Power BI OD On-Demand Usage CU | 3 |
| Power BI Core Services | InteractiveExport | Power BI OD On-Demand Usage CU | 3 |
| Power BI Core Services | ProcessParameter | Power BI OD On-Demand Usage CU | 3 |
| Power BI Core Services | PublicApiExport | Power BI OD On-Demand Usage CU | 3 |
| Power BI Core Services | Render | Power BI OD On-Demand Usage CU | 3 |
| Power BI Core Services | SubscriptionExport | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | AI Function Evaluation | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | Dataset On-Demand Refresh | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | Dataset Scheduled Refresh | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | Query | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | VNet Data Gateway | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | Web Modeling Read Operation | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | Web Modeling Write Operation | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | XMLA Read Operation | Power BI OD On-Demand Usage CU | 3 |
| Power BI Semantic Models | XMLA Write Operation | Power BI OD On-Demand Usage CU | 3 |
| Real-Time Intelligence - Eventhouse | EventHouse UpTime | Eventhouse OD On-Demand Usage CU | 1.36 |
| Real-Time Intelligence - Eventhouse | KustoUpTime | Eventhouse OD On-Demand Usage CU | 1.36 |
| Real-Time Intelligence | Anomaly Detection Run Queries | Anomaly Detector Queries OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Event Computations | Activator - Event Analytics OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Event Ingestion | RTI Event Operations OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Event Listener | RTI Event Listener and Alert OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Event Operations | RTI Event Operations OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Eventstream Connector Per vCore-hour | Eventstream Connector OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Eventstream Custom Connector Per vCore-hour | Eventstream Custom Connector OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Eventstream Data Traffic Per GB | Eventstream Data Traffic OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Eventstream Per Hour | Eventstream Flat OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Eventstream Processor Per Hour | Eventstream Processor OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Investigation agent reasoning | Operations Agents Autonomous Reasoning OD On-Demand Usage CU | 1 |
| Real-Time Intelligence | MapProcessing | Map processing OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | MapsCreateTileset | Map processing OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | MapServices | Map services OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | MapsTiles | Map services OD On-Demand Usage CU | 3 |
| Real-Time Intelligence | Operations Agent Autonomous Reasoning | Operations Agents Autonomous Reasoning OD On-Demand Usage CU | 1 |
| Real-Time Intelligence | Operations Agent Compute | Operations Agents Compute OD On-Demand Usage CU | 1 |
| Real-Time Intelligence | Rule Uptime Per Hour | RTI Event Listener and Alert OD On-Demand Usage CU | 3 |
| SQL Database | Sql Uptime | SQL database in Microsoft Fabric OD On-Demand Usage CU | 2 |
| SQL Database | Sql Usage | SQL database in Microsoft Fabric OD On-Demand Usage CU | 2 |

## Related content

- [Understand your Azure bill for a Fabric capacity](azure-billing.md)
- [Fabric operations](fabric-operations.md)
- [Capacity overage in Microsoft Fabric](capacity-overage-overview.md)
- [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md)
- [On-demand billing for Apache Spark in Microsoft Fabric](../data-engineering/autoscale-billing-for-spark-overview.md)
- [What is the Microsoft Fabric Capacity Metrics app?](metrics-app.md)
