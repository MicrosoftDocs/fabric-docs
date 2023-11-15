---
title: Azure Table Storage connector overview
description: This article provides an overview of the supported capabilities of the Azure Table Storage connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Azure Table Storage connector overview

This Azure Table Storage connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Azure Table Storage in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-azure-table-storage.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Azure Table Storage connector supports the following capabilities in data pipelines:

The Azure Table Storage connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Account key |
| **Lookup activity** | None | Account key |

To learn more about the copy activity configuration for Azure Table Storage in data pipelines, go to [Configure in a data pipeline copy activity](connector-azure-table-storage-copy-activity.md).
