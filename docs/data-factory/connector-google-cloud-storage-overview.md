---
title: Google Cloud Storage connector overview
description: This article explains the overview of using Google Cloud Storage.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 01/26/2024
ms.custom:
  - template-how-to
  - connectors
---

# Google Cloud Storage connector Overview

This Google Cloud Storage connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Pipeline**<br>- [Copy activity](connector-google-cloud-storage-copy-activity.md) (source/destination) <br>- Lookup activity<br>- Get Metadata activity<br>- Delete activity  |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Append<br>- Override |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn about how to connect to Google Cloud Storage data, go to [Set up your Google Cloud Storage connection](connector-google-cloud-storage.md).

To learn about the copy activity configuration for Google Cloud Storage in pipelines, go to [Configure Google Cloud Storage in a copy activity](connector-google-cloud-storage-copy-activity.md).
