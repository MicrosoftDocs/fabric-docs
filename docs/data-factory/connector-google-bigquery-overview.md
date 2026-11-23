---
title: Google BigQuery connector overview
description: This article provides an overview of the supported capabilities of the Google BigQuery connector.
ms.topic: how-to
ms.date: 11/04/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Google BigQuery connector overview

The Google BigQuery connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

You can also use Google BigQuery as a data destination in Dataflow Gen2. Destination support is in preview. The existing source support is unchanged.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source and destination; destination in preview)|None<br> On-premises<br> Virtual network |Service Account Login<br>  Organizational account |
| **Pipeline**<br>- [Copy activity](connector-google-bigquery-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Service Account Login |
| **Copy job** (source/destination) <br>- Full load |None<br> On-premises<br> Virtual network |Service Account Login |

> [!IMPORTANT]
> To use Google BigQuery as a Dataflow Gen2 data destination through an on-premises data gateway, you need the November 2026 gateway release (version **3000.342.0**) or later. For update instructions, see [Update an on-premises data gateway](/data-integration/gateway/service-gateway-update).

For destination setup and the known preview performance issue, see [Use Google BigQuery as a data destination](connector-google-bigquery.md#use-google-bigquery-as-a-data-destination-preview).

## Related content

For information on how to connect to Google BigQuery data, go to [Set up your Google BigQuery connection](connector-google-bigquery.md).

To learn more about the copy activity configuration for Google BigQuery in a pipeline, go to [Configure in a pipeline copy activity](connector-google-bigquery-copy-activity.md).
