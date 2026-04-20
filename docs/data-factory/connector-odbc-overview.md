---
title: ODBC connector overview
description: This article provides an overview of the supported capabilities of the ODBC connector.
ms.topic: how-to
ms.date: 03/03/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# ODBC connector overview

The open database connectivity (ODBC) connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|On-premises |Anonymous<br> Basic<br> Windows |
| **Pipeline**<br>- [Copy activity](connector-odbc-copy-activity.md) (source/destination) <br>- Lookup activity    |On-premises |Anonymous<br> Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Append |On-premises |Anonymous<br> Basic |

## Related content

To learn about how to connect to ODBC, go to [Set up your ODBC connection](connector-odbc.md).

To learn about the copy activity configuration for ODBC in pipelines, go to [Configure ODBC in a copy activity](connector-odbc-copy-activity.md).
