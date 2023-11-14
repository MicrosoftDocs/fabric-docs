---
title: OData connector overview
description: This article provides a brief overview of the OData connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# OData connector overview

This OData connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to OData in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-odata.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The OData connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Anonymous<br> Basic |
| **Lookup activity** | None | Anonymous<br> Basic |

To learn about how to connect to OData in data pipelines, go to [Set up your OData connection](connector-odata.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Azure Blob Storage in data pipelines, go to [Configure OData in a copy activity](connector-odata-copy-activity.md).
