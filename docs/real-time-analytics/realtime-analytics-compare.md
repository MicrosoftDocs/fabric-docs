---
title: Differences between Synapse Real-time Analytics and Azure Data Explorer
description: Learn about the differences between Synapse Real-time Analytics and Azure Data Explorer.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: overview
ms.date: 03/21/2023
ms.search.form: product-kusto
---

# What is the difference between Synapse Real-time Analytics and Azure Data Explorer?

Synapse Real-time Analytics is a portfolio of capabilities that provides an end-to-end analytics streaming solution across [!INCLUDE [product-name](../includes/product-name.md)] experiences. It supplies high velocity, low latency data analysis, and is optimized for time-series data, including automatic partitioning and indexing of any data format and structure, such as structured data, semi-structured (JSON), and free text.

Real-time Analytics delivers high performance when it comes to your increasing volume of data. It accommodates datasets as small as a few gigabytes or as large as several petabytes, and allows you to explore data from different sources and various data formats.

You can use Real-time Analytics for a range of solutions, such as IoT analytics and log analytics, and in many scenarios including manufacturing operations, oil and gas, automotive, and more.

## Capability support

| Category | Capability| Synapse Real-time Analytics | Azure Data Explorer |
|--|--|--|--|
| **Security** | VNET | &cross; | Supports VNet Injection and Azure Private Link  |
|  | CMK | &cross; | &cross; |
|  | RBAC | &cross; | &check; |
| **Business Continuity** | Availability Zones | &cross; (for GA?) | Optional |
| **SKU** | Compute options | SaaS platform | 22+ Azure VM SKUs to choose from  |
| **Integrations** | Built-in ingestion pipelines | Event Hubs, Event Grid, [!INCLUDE [product-name](../includes/product-name.md)] Pipeline, [!INCLUDE [product-name](../includes/product-name.md)] Dataflow | Event Hubs, Event Grid, IoT Hub |
|  | OneLake integration | Ability to mirror data in both directions | &cross; |
|  | Spark integration | Built-in Kusto Spark connector integration with support for Azure Active Directory pass-through authentication, Synapse Workspace MSI, and Service Principal | Azure Data Explorer linked service: Built-in Kusto Spark integration with support for Azure Active Directory pass-through authentication, Synapse Workspace MSI, and Service Principal|
|  | KQL artifacts management | Save KQL queries via Query Set and share across Org | &cross; |
|  | Database management | &check; |  &check; |
| **Features** | KQL queries | &check; | &check; |
|  | API and SDKs | &check; | &check; |
|  | Connectors | &check; | &check; |
|  | Query tools | &check; | &check; |
|  | Autoscale | &check; (Built-in) | &check; (Optional: manual, optimized, custom) |
|  | ADX Dashboards| &cross; | &check; |
|  | PowerBI quick create | &check; | &cross; |
| **Pricing** | Business Model | Part of consumption model in Premium PowerBI workspace. Pay per Use and Dedicated Capacity available | Cost plus billing model with multiple meters: Azure Data Explorer IP markup, Compute, Storage, and Networking |

## Next steps

TODO: <!-- [Real-time Analytics in [!INCLUDE [product-name](../includes/product-name.md)] ](overview.md)-->.
