---
title: Google BigQuery connector overview
description: This article provides an overview of the supported capabilities of the Google BigQuery connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 03/20/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Google BigQuery connector overview

The Google BigQuery connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.


## Support in Dataflow Gen2

For information on how to connect to Google BigQuery data in Dataflow Gen2, go to [Set up your Google BigQuery connection](connector-google-bigquery.md).

## Support in Data pipeline

The Google BigQuery connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None | Service Account Login |
| **Lookup activity** | None | Service Account Login |

To learn more about the copy activity configuration for Google BigQuery in Data pipeline, go to [Configure in a data pipeline copy activity](connector-google-bigquery-copy-activity.md).

