---
title: Azure Synapse Analytics connector overview
description: This article explains the overview of using Azure Synapse Analytics.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Synapse Analytics connector overview

This Azure Synapse Analytics connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure Synapse Analytics in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-synapse-analytics.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Azure Synapse analytics connector supports the following capabilities in data pipelines.

| Supported capabilities | Gateway | Authentication |
| --- | --- | --- |
| **Copy activity (Source/Destination)** | None <br> On-premises | Basic<br>Organizational account<br>Service principal |
| **Lookup activity** | None <br> On-premises | Basic<br>Organizational account<br>Service principal |
| **GetMetadata activity** | None <br> On-premises | Basic<br>Organizational account<br>Service principal |
| **Script activity** | None <br> On-premises | Basic<br>Organizational account<br>Service principal |
| **Stored procedure activity** | None <br> On-premises | Basic<br>Organizational account<br>Service principal |

To learn about the copy activity configuration for Azure Synapse Analytics in data pipelines, go to [Configure Azure Synapse Analytics in a copy activity](connector-azure-synapse-analytics-copy-activity.md).
