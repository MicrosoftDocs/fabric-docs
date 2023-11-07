---
title: OneLake Consumption
description: Information on how OneLake usage affects your CU consumption.  
ms.author: eloldag
author: eloldag
ms.topic: how-to
ms.custom: build-2023
ms.date: 11/06/2023
---

# OneLake compute and storage consumption

OneLake usage is defined by data stored and the number of transactions.  This page contains information on how all of OneLake usage is billed and reported.

## Storage

OneLake storage is billed at a pay-as-you-go rate per GB of data used.  Static Storage does NOT consume Fabric Capacity Units (CUs). For more information about pricing, see the [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).
You can track storage usage in the Fabric Capacity Metrics app.  For more information about monitoring usage, see the [Metrics app Storage page](../enterprise/metrics-app-storage-page.md).

## Transactions

Requests to OneLake, such as reading or writing data, consume Fabric Capacity Units. The rates below define how much capacity units are consumed for a given type of operation. OneLake data can be accessed using API and non-Fabric apps like Databricks or can be accessed using Fabric apps like DW or LH. How the data in OneLake is accessed has a bearing on how many CUs are consumed.

**Known Issue** OneLake is under reporting transaction usage in the Fabric Capacity Metrics app. This also results in under reporting usage against your Fabric capacity. OneLake will provide notice before correcting the issue.  See “Changes to Microsoft Fabric Workload Consumption Rate” below.

### Operation types

This table defines CU consumption when OneLake data is accessed using applications running outside of Fabric environments. For example, custom applications using Azure Data Lake Storage (ADLS) APIs or OneLake file explorer.

This table defines CU consumption when OneLake data is accessed using most applications running inside of Fabric environments. For example, Fabric Spark and Fabric pipelines.

## Disaster recovery storage

When disaster recovery is enabled, the data in OneLake gets geo-replicated. Thus, the storage is billed as BCDR Storage. For more information about pricing, see the [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

## Disaster recovery transactions

When Disaster Recovery option is enabled for a given capacity, write operations consume higher capacity units.

This table defines CU consumption when OneLake data is accessed using applications running outside of Fabric environments when disaster recovery is enabled. For example, custom applications using Azure Data Lake Storage (ADLS) APIs or OneLake file explorer.

This table defines CU consumption when OneLake data is accessed using most applications running inside of Fabric environments when disaster recovery is enabled. For example, Fabric Spark and Fabric pipelines.

# Changes to Microsoft Fabric workload consumption rate

Consumption rates are subject to change at any time. Microsoft will use reasonable efforts to provide notice via email or through in-product notification. Changes shall be effective on the date stated in Microsoft’s Release Notes or Microsoft Fabric Blog. If any change to a Microsoft Fabric Workload Consumption Rate materially increases the Capacity Units (CU) required to use a particular workload, customers may use the cancellation options available for the chosen payment method.  
