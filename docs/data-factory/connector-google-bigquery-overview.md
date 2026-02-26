---
title: Google BigQuery connector overview
description: This article provides an overview of the supported capabilities of the Google BigQuery connector.
ms.topic: how-to
ms.date: 11/20/2025
ms.custom:
  - template-how-to
  - connectors
---

# Google BigQuery connector overview

The Google BigQuery connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Service Account Login<br>  Organizational account |
| **Pipeline**<br>- [Copy activity](connector-google-bigquery-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Service Account Login |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Service Account Login |

## Related content

For information on how to connect to Google BigQuery data, go to [Set up your Google BigQuery connection](connector-google-bigquery.md).

To learn more about the copy activity configuration for Google BigQuery in a pipeline, go to [Configure in a pipeline copy activity](connector-google-bigquery-copy-activity.md).
