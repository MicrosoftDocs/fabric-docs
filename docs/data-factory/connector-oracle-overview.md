---
title: Oracle connector overview
description: This article provides an overview of the supported capabilities of the Oracle connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/14/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Oracle connector overview

The Oracle connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in Microsoft Fabric doesn't currently support the Oracle connector in Dataflow Gen2.

## Support in Data pipeline

The Oracle connector supports the following capabilities in Data pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | On-premises | Basic |
| **Lookup activity** | On-premises | Basic |
| **Script activity** | On-premises | Basic |

To learn more about the copy activity configuration for Oracle in Data pipeline, go to [Configure in a Data pipeline copy activity](connector-oracle-copy-activity.md).
