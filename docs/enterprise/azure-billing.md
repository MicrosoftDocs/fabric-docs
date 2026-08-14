---
title: Azure Billing for Your Fabric Capacity
description: Learn how to navigate your Azure bill for a Fabric capacity, including the invoice meters and how to reconcile your charges with your usage.
author: dknappettmsft
ms.author: daknappe
ms.topic: concept-article
ms.date: 08/03/2026
ai-usage: ai-assisted
#customer intent: As a Fabric capacity administrator, I want to understand the meters on my Azure bill so that I can reconcile my charges with my Fabric usage.
---

# Understand your Azure bill for a Fabric capacity

A Microsoft Fabric capacity is an Azure resource, so your Azure bill in the Microsoft Cost Management experience in the Azure portal shows its usage charges. Your bill splits these charges across many separate meters, which makes it hard to tell how each meter maps to the Fabric usage in your organization.

This article explains the meters that make up your Fabric capacity charges and shows how to reconcile your Azure bill with the usage that the Microsoft Fabric Capacity Metrics app reports.

## Invoice meters

In [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview), your cost analysis and invoice show multiple meters related to your Fabric capacity resource. Most consumption meters follow a common naming pattern: a workload or feature name followed by a usage suffix. Each meter represents the compute (CU) that a workload consumes.

The exact set of meters changes as Fabric adds features. Some meters represent features that are still in preview, and some meters have temporary names such as `Fabric Meter 24` and represent features that aren't yet publicly named. The following list is representative; to retrieve the current, complete list, see [Get the current list of meters](#get-the-current-list-of-meters).

Most consumption meter names end with the suffix `Capacity Usage CU`, which indicates the compute charged against your provisioned Fabric capacity. The OneLake transaction meters add further suffixes for the storage tier (`Hot`, `Cool`, or `Cold`), the access path (`via API`), and business continuity and disaster recovery (`BCDR`).

To identify a specific line on your bill, find its meter group in the following alphabetical list, then review the workload that generates it and what it covers. The list shows meter groups by their base name, without the `Capacity Usage CU` suffix or the OneLake tier and access-path variants. The list is representative of the meter groups available when this article was last updated. For the authoritative current list, see [Get the current list of meters](#get-the-current-list-of-meters).

| Meter group | Workload | Description |
| ----------- | -------- | ---------------------- |
| `Activator - Event Analytics` | Real-Time Intelligence | Activator alerts and event analytics. |
| `Anomaly Detector Queries` | Real-Time Intelligence | Anomaly detection queries against eventhouse data. |
| `Apache Airflow job` | Data Factory | Apache Airflow job runs. |
| `API for GraphQL Query` | Developer and API | GraphQL API query execution. |
| `autoscale for Data Warehouse` | Data Warehouse | Autoscale compute for warehouses. |
| `autoscale for Spark` | Data Engineering | Autoscale compute for Spark. |
| `Capacity Overage` | Capacity management | Carryforward (overage) consumption above your capacity. |
| `Compute Pool` | Capacity management | The base provisioned capacity available to your workloads. |
| `Copilot and AI` | Data Science and AI | Copilot and generative AI features across workloads. |
| `Cosmos Database in Microsoft Fabric` | Databases | Compute for Cosmos DB in Fabric. |
| `Data Movement` | Data Factory | Pipeline data movement (copy) activities. |
| `Data Movement - Incremental copy` | Data Factory | Incremental copy data movement. |
| `Data Orchestration` | Data Factory | Pipeline orchestration activities. |
| `Data Warehouse` | Data Warehouse | T-SQL query compute for warehouses. |
| `Data Warehouse (Accelerated)` | Data Warehouse | Accelerated warehouse compute. |
| `Dataflows Standard Compute` | Data Factory | Standard dataflow transformations. |
| `dbt job` | Data Factory | dbt job runs. |
| `Digital Twin Builder` | Real-Time Intelligence | Digital twin builder usage. |
| `Digital Twin Builder Operation` | Real-Time Intelligence | Scheduled and on-demand digital twin builder flow operations. |
| `Digital Twin Builder Query` | Real-Time Intelligence | Digital twin builder queries. |
| `Eventhouse` | Real-Time Intelligence | eventhouse ingestion and query compute. |
| `Eventstream Data Traffic` | Real-Time Intelligence | Eventstream data ingress and egress. |
| `Eventstream Flat` | Real-Time Intelligence | Flat-rate eventstream processing. |
| `Eventstream Processor` | Real-Time Intelligence | Eventstream processing and transformation compute. |
| `eventstreams connectors` | Real-Time Intelligence | Eventstream source and destination connectors. |
| `Fabric Planning - Automated Jobs` | Fabric IQ | Automated jobs for plans. |
| `Fabric Planning - Planner Sessions` | Fabric IQ | Planner sessions in plans. |
| `Fabric Planning - Stakeholder Sessions` | Fabric IQ | Stakeholder sessions in plans. |
| `Fabric Planning - Viewer Sessions` | Fabric IQ | Viewer sessions in plans. |
| `Graph data management` | Graph | Graph data management operations. |
| `Graph data science` | Graph | Graph analytics and data science operations. |
| `High Scale Dataflow Compute - Spark` | Data Factory | High-scale dataflow staging compute on Spark. |
| `High Scale Dataflow Compute - SQL` | Data Factory | High-scale dataflow staging compute on SQL. |
| `Map processing` | Real-Time Intelligence | Map data processing. |
| `Map services` | Real-Time Intelligence | Map rendering and services. |
| `ML Model Endpoint` | Data Science and AI | Machine learning model endpoint serving. |
| `OneLake Data Retrieval` | OneLake | Retrieval of cold-tier OneLake data. |
| `OneLake diagnostics` | OneLake | OneLake diagnostic logging. |
| `OneLake Iterative Read Operations` | OneLake | Iterative read transactions against OneLake. |
| `OneLake Iterative Write Operations` | OneLake | Iterative write transactions against OneLake. |
| `OneLake Other Operations` | OneLake | Other OneLake transactions. |
| `OneLake Read Operations` | OneLake | Read and shortcut-read transactions against OneLake. |
| `OneLake Security` | OneLake | OneLake security enforcement. |
| `OneLake Table Read via API` | OneLake | OneLake table reads through the API. |
| `OneLake Write Operations` | OneLake | Write and shortcut-write transactions against OneLake. |
| `Ontology AI` | Fabric IQ | Fabric IQ ontology AI operations. |
| `Ontology Logic and Operations` | Fabric IQ | Fabric IQ ontology logic and operations. |
| `Ontology Modeling` | Fabric IQ | Fabric IQ ontology modeling. |
| `Operations Agents Autonomous Reasoning` | Fabric IQ | Operations agent autonomous reasoning. |
| `Operations Agents Compute` | Fabric IQ | Operations agent compute. |
| `Power BI` | Power BI | Power BI queries, refreshes, and report rendering. |
| `RTI Event Listener and Alert` | Real-Time Intelligence | Real-Time Intelligence event listeners and alerts. |
| `RTI Event Operations` | Real-Time Intelligence | Real-Time Intelligence event operations. |
| `Spark GPU Optimized` | Data Engineering | GPU-optimized Spark compute. |
| `Spark Memory Optimized` | Data Engineering | Memory-optimized Spark compute for notebooks and jobs. |
| `SQL database in Microsoft Fabric` | Databases | Compute for SQL database in Fabric. |
| `SQL DB in Microsoft Fabric LR` | Databases | Long-term retention for SQL database in Fabric. |
| `SSIS in Fabric` | Data Factory | SSIS package runs in Fabric. |
| `user data functions` | Developer and API | User data functions execution. |
| `VNet Data Gateway` | Data Factory | Connections through the virtual network data gateway. |

The total usage from all consumption meters adds up to the cost of the provisioned Fabric capacity.

### Get the current list of meters

The [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page lists capacity SKU prices and per-GB storage rates, but it doesn't enumerate the individual consumption meters. To get the current, complete list of meters, call the [Azure Retail Prices API](/rest/api/cost-management/retail-prices/azure-retail-prices) and filter on the service name `Microsoft Fabric`. The API returns every Fabric meter with its pricing, region, and unit of measure.

### Storage meters

Fabric also charges for data stored in OneLake and in the databases hosted on your capacity. Fabric measures these meters in GB per month rather than in capacity units, so they appear separately from the consumption meters.

| Meter name | Description |
| ---------- | ----------- |
| OneLake Storage (Hot, Cool, Cold) | Represents OneLake data stored in each storage tier |
| OneLake BCDR Storage (Hot, Cool, Cold) | Represents OneLake business continuity and disaster recovery data stored in each tier |
| OneLake Cache | Represents cached OneLake data stored on your capacity |
| SQL Storage | Represents data stored in SQL database in Fabric |
| SQL Backup Storage | Represents backup data stored for SQL database in Fabric |
| Cosmos DB Storage | Represents data stored in Cosmos DB in Fabric |
| Cosmos DB Backup Storage | Represents backup data stored for Cosmos DB in Fabric |
| Cosmos DB Data Restore | Represents data restored for Cosmos DB in Fabric |
| Storage Mirroring | Represents mirrored data stored on your capacity |
| Storage Mirroring Free | Represents the free allocation of mirrored data stored on your capacity |

If you buy reserved capacity, the reservation appears under a separate `Fabric Capacity` meter rather than the consumption meters.

## Compare your Azure bill with your usage

Use the [Microsoft Fabric Capacity Metrics](metrics-app-compute-page.md) app to correlate your Azure bill with your organization's Fabric usage analytics.

The default view in the app shows trends in consumption by workload over the past 14 days.

The items table aggregates usage by workspace, workload type, and item name. It measures the billable usage that each item generates in capacity units (CUs).

To compare the information in the Microsoft Fabric Capacity Metrics app to what Azure shows, filter your cost management view in the Azure portal so that it shows the same time period as the app. Review the cost under the meter for the item you're reviewing. For example, for a warehouse, it's the `Data Warehouse Capacity Usage CU` meter. The price per CU hour for your capacity depends on your capacity's region. View the Fabric prices per region on the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page.

## Related content

[Microsoft Fabric Capacity Metrics](metrics-app-compute-page.md)
