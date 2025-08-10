---
title: Azure Databricks connector overview
description: This article provides an overview of the supported capabilities of the Azure Databricks connector.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 04/07/2025
ms.custom:
  - template-how-to
  - connectors
---

# Azure Databricks connector overview

The Azure Databricks connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Databricks Client Credentials<br> Personal Access Token<br> Azure Active Directory |
| **Data pipeline**<br>- [Copy activity](connector-dataverse-copy-activity.md) (source/destination)      |None<br> On-premises<br> Virtual network |Personal Access Token |

## Related content

To learn about how to connect to Azure Databricks, go to [Set up your Azure Databricks connection](connector-azure-databricks.md).

To learn more about the copy activity configuration for Azure Databricks in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-databricks-copy-activity.md).
