---
title: Differences between Real-time Analytics and Azure Data Explorer
description: Learn about the differences between Real-time Analytics and Azure Data Explorer.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: overview
ms.date: 03/21/2023
ms.search.form: product-kusto
---

# What is the difference between Azure Data Explorer and Synapse Real-time Analytics?

Real-time Analytics is a portfolio of capabilities that provides an end-to-end analytics streaming solution across [!INCLUDE [product-name](../includes/product-name.md)] experiences. It supplies high velocity, low latency data analysis, and is optimized for time-series data, including automatic partitioning and indexing of any data format and structure, such as structured data, semi-structured (JSON), and free text.

Real-time Analytics delivers high performance when it comes to your increasing volume of data. It accommodates datasets as small as a few gigabytes or as large as several petabytes, and allows you to explore data from different sources and various data formats.

You can use Real-time Analytics for a range of solutions, such as IoT analytics and log analytics, and in many scenarios including manufacturing operations, oil and gas, automotive, and more.

## Capability support

| Category | Capability | Azure Data Explorer | Synapse Real-time Analytics|
|--|--|--|--|
| **Security** | VNET | Supports VNet Injection and Azure Private Link | &cross; |
|  | CMK | ✓ | &cross; |
|  | RBAC  | &check; | &cross;|
| **Business Continuity** | Availability Zones | Optional | &cross; (for GA?) |
| **SKU** | Compute options | 22+ Azure VM SKUs to choose from | SaaS platform |
| **Integrations** | Built-in ingestion pipelines | Event Hub, Event Grid, IoT Hub | Event Hub, Event Grid, [!INCLUDE [product-name](../includes/product-name.md)] Pipeline, [!INCLUDE [product-name](../includes/product-name.md)] Dataflow|
|  | OneLake integration | &cross; | Ability to mirror data in both directions|
|  | Spark integration| Azure Data Explorer linked service: Built-in Kusto Spark integration with support for Azure Active Directory pass-through authentication, Synapse Workspace MSI, and Service Principal| Built-in Kusto Spark connector integration with support for Azure Active Directory pass-through authentication, Synapse Workspace MSI, and Service Principal|
|  | KQL artifacts management | &cross; | Save KQL queries via Query Set and share across Org |
|  | Database management | &check; |  &check; |
| **Features** | KQL queries | &check; | &check; |
|  | API and SDKs | &check; | &check; |
|  | Connectors | &check; | &check; |
|  | Query tools | &check; | &check; |
|  | Auto-scale | &check; (Optional: manual, optimized, custom) | &check; (Built-in)|
|  | ADX Dashboards| &check; | &cross; |
|  | PowerBI quick create | &cross; | &check; |
| **Pricing** | Business Model | Cost plus billing model with multiple meters: Azure Data Explorer IP markup, Compute, Storage, and Networking | Part of consumption model in Premium PowerBI workspace. Pay per Use and Dedicated Capacity available |

## Next steps

TODO: <!-- [Real-time Analytics in [!INCLUDE [product-name](../includes/product-name.md)] ](overview.md)-->.
