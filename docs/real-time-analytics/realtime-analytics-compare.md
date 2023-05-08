---
title: Differences between Real-Time Analytics and Azure Data Explorer
description: Learn about the differences between Real-Time Analytics and Azure Data Explorer.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: overview
ms.date: 05/23/2023
ms.search.form: product-kusto
---
# What is the difference between Real-Time Analytics and Azure Data Explorer?

Synapse Real-Time Analytics is a portfolio of capabilities that provides an end-to-end analytics streaming solution across [!INCLUDE [product-name](../includes/product-name.md)] experiences. It supplies high velocity, low latency data analysis, and is optimized for time-series data, including automatic partitioning and indexing of any data format and structure, such as structured data, semi-structured (JSON), and free text.

Real-Time Analytics delivers high performance when it comes to your increasing volume of data. It accommodates datasets as small as a few gigabytes or as large as several petabytes, and allows you to explore data from different sources and various data formats.

For more information on Real-Time Analytics, see [What is Real-Time Analytics in Fabric?](overview.md).

Real-Time Analytics contains several items that are similar to offerings in Azure Data Explorer. This article details the difference between the two services. Real-Time Analytics also offers additional capabilities, such as [Eventstreams](event-streams/overview.md).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Capability support

| Category | Capability| Synapse Real-Time Analytics | Azure Data Explorer |
|----|----|----|----|
| **Security** | VNET | &cross; | Supports VNet Injection and Azure Private Link  |
|  | CMK | &cross; | &check; |
|  | RBAC | &check; | &check; |
| **Business Continuity** | Availability Zones | &cross; | Optional |
| **SKU** | Compute options | SaaS platform | 22+ Azure VM SKUs to choose from  |
| **Integrations** | Built-in ingestion pipelines | Event Hubs, Event Grid, [!INCLUDE [product-name](../includes/product-name.md)] Pipeline, [!INCLUDE [product-name](../includes/product-name.md)] Dataflow | Event Hubs, Event Grid, IoT Hub |
|  | OneLake integration | Supports data copying to and from OneLake | &cross; |
|  | Spark integration | Built-in Kusto Spark connector integration with support for Azure Active Directory pass-through authentication, Synapse Workspace MSI, and Service Principal | Azure Data Explorer linked service: Built-in Kusto Spark integration with support for Azure Active Directory pass-through authentication, Synapse Workspace MSI, and Service Principal|
|  | KQL artifacts management | Option to save queries as KQL querysets that can be shared within the tenant | &cross; |
|  | Database management | &check; |  &check; |
| **Features** | KQL queries | &check; | &check; |
|  | API and SDKs | &check; | &check; |
|  | Connectors | &check; | &check; |
|  | Query tools | &check; | &check; |
|  | Autoscale | &check; (Built-in) | &check; (Optional: manual, optimized, custom) |
|  | Dashboards| &cross; | &check; |
|  | Power BI quick create | &check; | &cross; |
| **Pricing** | Business Model | Included in the Power BI Premium workspace consumption model. Billing per use and dedicated capacity available | Cost plus billing model with multiple meters: Azure Data Explorer IP markup, Compute, Storage, and Networking |

## Next steps

* Get started with [Real-Time Analytics](tutorial-introduction.md)
