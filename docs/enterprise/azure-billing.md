---
title: Understand your Fabric capacity Azure bill
description: Learn how to navigate your Azure bill for A Fabric capacity.
author: JulCsc
ms.author: juliacawthra
ms.topic: concept-article
ms.custom:
ms.date: 06/06/2025
---

# Understand your Azure bill on a Fabric capacity

When you use a Fabric capacity, your usage charges appear in the Azure portal under your subscription in the [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview) experience.

## Invoice meters

In Microsoft Cost Management, your cost analysis and invoice show multiple meters related to your Fabric capacity resource. The following table includes a complete list of all of the meters.

| Name | Description | State |
| ---- | ----------- | ----- |
| Activator - Event Analytics                    | Represents Data Activator on your capacity                                          | GA |
| Apache Airflow job                             | Represents Apache Airflow on your capacity                                          | GA |
| API for GraphQL Query                          | Represents GraphQL Query API for your capacity                                      | GA |
| Autoscale for Spark                            | Represents autoscale for Spark on your capacity                                     | GA |
| Compute Pool Capacity Usage CU                 | Represents the available capacity                                                   | GA |
| Copilot and AI                                 | Represents Copilot and AI on your capacity                                          | GA |
| Data Movement Capacity Usage CU                | Represents the Pipelines Data Movement usage on your capacity                       | GA |
| Data Orchestration Capacity Usage CU           | Represents the Pipelines Data Orchestration usage on your capacity                  | GA |
| Data Warehouse Capacity Usage CU               | Represents the Fabric Data Warehouse usage on your capacity                         | GA |
| Dataflows High Scale Compute Capacity Usage CU | Represents the Dataflows High Scale Compute used for staging items on your capacity | GA |
| Dataflows Standard Compute Capacity Usage CU   | Represents the Dataflows Standard Compute usage on your capacity                    | GA |
| Digital Twin Builder Operation Capacity Usage CU | Represents the on-demand and scheduled digital twin builder flow operations usage on your capacity | Preview |
| Eventhouse                                     | Represents Row Level Eventhouse on your capacity                                    | GA |
| Eventstream Capacity Usage CU                  | Represents the ingestion or processing usage for eventstreams on your capacity      | GA |
| Eventstream Connector                          | Represents Eventstream Row Level Connector EV your capacity                         | GA |
| Eventstream Data Traffic per GB Capacity Usage CU | Represents the data ingress and egress usage on your capacity                    | GA |
| Eventstream Flat                               | Represents Eventstream Row Level Flat EV your capacity                              | GA |
| Eventstreams Processor Capacity Usage CU       | Represents the ASA processing usage on your capacity                                | GA |
| KQL Database Capacity Usage CU                 | Represents the KQL database up time usage on your capacity                          | GA |
| ML Model Endpoint                              | Represents ML Model Endpoint on your capacity                                       | GA |
| OneLake BCDR Iterative Read Operations Capacity Usage CU          | Represents the OneLake BCDR Iterative Read via Redirect transaction compute usage on your capacity | GA |
| OneLake BCDR Iterative Read Operations via API Capacity Usage CU  | Represents the OneLake BCDR Iterative Read via Proxy transaction compute usage on your capacity    | GA |
| OneLake BCDR Iterative Write Operations Capacity Usage CU         | Represents the OneLake BCDR Iterative Write via Redirect transaction compute usage on your capacity | GA |
| OneLake BCDR Iterative Write Operations via API Capacity Usage CU | Represents the OneLake BCDR Iterative Write via Proxy transaction compute usage on your capacity    | GA |
| OneLake BCDR Other Operations Capacity Usage CU | Represents the OneLake BCDR Other transactions compute usage on your capacity      | GA |
| OneLake BCDR Other Operations via API Capacity Usage CU           | Represents the OneLake BCDR Other transactions via Redirect compute usage on your capacity         | GA |
| OneLake BCDR Read Operations Capacity Usage CU  | Represents the OneLake BCDR Read via Redirect & Shortcut Read via Redirect transaction compute usage on your capacity | GA |
| OneLake BCDR Read Operations via API Capacity Usage CU            | Represents the OneLake BCDR Read via Proxy & Shortcut Read via Proxy transaction compute usage on your capacity | GA |
| OneLake BCDR Write Operations Capacity Usage CU                   | Represents the OneLake BCDR Write via Redirect & Shortcut Write via Redirect transaction compute usage on your capacity | GA |
| OneLake Iterative Read Operations Capacity Usage CU               | Represents the OneLake Iterative Read via Redirect transaction compute usage on your capacity    | GA |
| OneLake Iterative Read Operations via API Capacity Usage CU       | Represents the OneLake Iterative Read via Proxy transaction compute usage on your capacity         | GA |
| OneLake Iterative Write Operations Capacity Usage CU              | Represents the OneLake Iterative Write via Redirect transaction compute usage on your capacity    | GA |
| OneLake Iterative Write Operations via API Capacity Usage CU      | Represents the OneLake Iterative Write via Proxy transaction compute usage on your capacity         | GA |
| OneLake Other Operations Capacity Usage CU     | Represents the OneLake Other transactions compute usage on your capacity            | GA |
| OneLake Other Operations via API Capacity Usage CU                | Represents the OneLake Other transactions via Redirect compute usage on your capacity                                   | GA |
| OneLake Read Operations Capacity Usage CU                         | Represents the OneLake Read via Redirect & Shortcut Read via Redirect transaction compute usage on your capacity        | GA |
| OneLake Read Operations via API Capacity Usage CU                 | Represents the OneLake Read via Proxy & Shortcut Read via Proxy transaction compute usage on your capacity              | GA |
| OneLake Write Operations Capacity Usage CU                        | Represents the OneLake Write via Redirect & Shortcut Write via Redirect transaction compute usage on your capacity      | GA |
| Power BI Usage CU                                                 | Represents the Power BI usage on your capacity                                                                          | GA |
| Real-Time Intelligence - Event Listener & Alert | Represents Event Listener and Alerts for Real-Time Intelligence on your capacity   | GA |
| Real-Time Intelligence - Event Operations       | Represents Event Operations for Real-Time Intelligence on your capacity            | GA |
| Spark Memory Optimized Capacity Usage CU        | Represents the Spark usage on your capacity                                        | GA |
| SQL database in Microsoft Fabric                | Represents SQL database in Microsoft Fabric on your capacity                       | GA |

The total usage from all meters adds up to the cost of the provisioned Fabric capacity.

## Comparing your Azure bill with your usage

Use the [Microsoft Fabric Capacity Metrics](metrics-app-compute-page.md) to correlate your Azure bill with usage analytics generated from your organization's usage of Fabric.

The default view in the app shows trends in consumption by workload over the past 14 days.

Usage in the items table is aggregated by workspace, workload type, and item name. The amount of billable usage generated by each item is aggregated by CUs.

To compare the information in the Microsoft Fabric Capacity Metrics app to what you're seeing in Azure, filter your cost management view in the Azure portal so that it displays the same time period as the app. Review the cost under the meter for the item you're reviewing (for example, for Warehouse, it's the _Data Warehouse Capacity Usage CU_ meter). The price per CU hour for your capacity depends on your capacity's region. You can view the Fabric prices per region in the [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/) page.

## Related content

[Microsoft Fabric Capacity Metrics](metrics-app-compute-page.md)
