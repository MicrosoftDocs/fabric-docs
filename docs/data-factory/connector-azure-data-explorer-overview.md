---
title: Azure Data Explorer connector overview
description: This article provides an overview of the supported capabilities of the Azure Data Explorer connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Data Explorer overview

This Azure Data Explorer connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure Data Explorer in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-data-explorer.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipeline

The Azure Data Explorer connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | User Auth |
| **Lookup activity** | None | User Auth |

To learn more about the copy activity configuration for Azure Data Explorer in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-data-explorer-copy-activity.md).
