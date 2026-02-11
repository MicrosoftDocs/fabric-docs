---
title: Vertica connector overview
description: This article explains the overview of using Vertica.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 09/06/2024
ms.custom:
  - template-how-to
  - connectors
---

# Vertica connector overview

The Vertica connector is supported in Data Factory in [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|On-premises |Basic |
| **Pipeline**<br>- [Copy activity](connector-vertica-copy-activity.md) (source/-) <br>- Lookup activity    |On-premises (version 3000.238.11 or above)|Basic |
| **Copy job** (source/-) <br>- Full load<br>- Incremental load |On-premises |Basic |

> [!NOTE]
> To use Vertica connector in date pipelines, please install [Vertica ODBC driver](https://www.vertica.com/download/vertica/client-drivers/) on the computer running on-premises data gateway. For detailed steps, go to [Prerequisites](connector-vertica-copy-activity.md#prerequisites).

## Related content

To learn about the copy activity configuration for Vertica in pipelines, go to [Configure Vertica in a copy activity](connector-vertica-copy-activity.md).