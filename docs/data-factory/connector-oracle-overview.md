---
title: Oracle connector overview
description: This article provides an overview of the supported capabilities of the Oracle connector.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2024
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Oracle connector overview

The Oracle connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in data pipelines

The Oracle connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | On-premises | Basic |
| **Lookup activity** | On-premises | Basic |
| **Script activity** | On-premises | Basic |

To learn more about the copy activity configuration for Oracle in data pipelines, go to [Configure Oracle in a copy activity](connector-oracle-copy-activity.md).

> [!NOTE]
>To use Oracle connector in date pipelines, please install [Oracle Client for Microsoft Tools (OCMT)](https://www.oracle.com/database/technologies/appdev/ocmt.html) on the computer running on-premises data gateway.
