---
title: Vertica connector overview
description: This article explains the overview of using Vertica.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 09/06/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Vertica connector overview

The Vertica connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] doesn't currently support the Vertica connector in Dataflow Gen2. To get Vertica data in Dataflow Gen2, use the [Web API](/power-query/connectors/web/web) connector instead.

## Support in data pipelines

The Vertica connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | On-premises | Basic |
| **Lookup activity** | On-premises | Basic |

To learn about the copy activity configuration for Vertica in data pipelines, go to [Configure Vertica in a copy activity](connector-vertica-copy-activity.md).
