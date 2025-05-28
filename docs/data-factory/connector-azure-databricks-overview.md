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

## Support in Dataflow Gen2

To learn about how to connect to Azure Databricks in Dataflow Gen2, go to [Set up your Azure Databricks connection](connector-azure-databricks.md).

## Support in data pipelines

The Azure Databricks connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Personal Access Token |

To learn more about the copy activity configuration for Azure Databricks in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-databricks-copy-activity.md).
