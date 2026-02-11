---
title: Azure Synapse Analytics connector overview
description: This article explains the overview of using Azure Synapse Analytics.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 07/09/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Synapse Analytics connector overview

The Azure Synapse Analytics connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities                                                                 | Gateway                        | Authentication   |
|----------------------------------------------------------------------------------------|--------------------------------|------------------|
| **Dataflow Gen2** (source/-)                                                           | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal |
| **Pipeline** <br>- [Copy activity](connector-azure-synapse-analytics-copy-activity.md) (source/destination)<br>- Lookup activity<br>- Get Metadata activity<br>- Script activity<br>- Stored procedure activity | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal <br>Workspace identity|
| **Copy job** (source/destination) <br>- Full load<br>- Incremental load<br>- Append<br>- Upsert | None<br> On-premises<br> Virtual network | Basic<br> Organizational account<br> Service principal <br>Workspace identity|

## Related content

To learn about how to connect to Azure Synapse Analytics, go to [Set up your Azure Synapse Analytics connection](connector-azure-synapse-analytics.md).

To learn about the copy activity configuration for Azure Synapse Analytics in pipelines, go to [Configure Azure Synapse Analytics in a copy activity](connector-azure-synapse-analytics-copy-activity.md).
