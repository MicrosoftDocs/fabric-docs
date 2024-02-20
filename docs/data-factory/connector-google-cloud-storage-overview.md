---
title: Google Cloud Storage connector overview
description: This article explains the overview of using Google Cloud Storage.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 01/26/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Google Cloud Storage connector Overview

This Google Cloud Storage connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support Google Cloud Storage in Dataflow Gen2.

## Support in data pipelines

The Google Cloud Storage connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None | Basic |
| **Lookup activity** | None | Basic |
| **GetMetadata activity** | None | Basic |
| **Delete activity** | None | Basic |

To learn about how to connect to Google Cloud Storage data in data pipelines, go to [Set up your Google Cloud Storage connection](connector-google-cloud-storage.md#set-up-your-connection-in-a-data-pipeline).

To learn about the copy activity configuration for Google Cloud Storage in data pipelines, go to [Configure Google Cloud Storage in a copy activity](connector-google-cloud-storage-copy-activity.md).
