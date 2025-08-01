---
title: Google BigQuery connector overview
description: This article provides an overview of the supported capabilities of the Google BigQuery connector.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 04/23/2024
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
| **Data pipeline**<br>- [Copy activity](connector-google-bigquery-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Service Account Login |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Service Account Login |


## Related content

For information on how to connect to Google BigQuery data, go to [Set up your Google BigQuery connection](connector-google-bigquery.md).

To learn more about the copy activity configuration for Google BigQuery in Data pipeline, go to [Configure in a data pipeline copy activity](connector-google-bigquery-copy-activity.md).

