---
title: Odbc connector overview
description: This article provides an overview of the supported capabilities of the Odbc connector.
ms.topic: how-to
ms.date: 09/24/2025
ms.custom:
  - template-how-to
  - connectors
---

# Odbc connector overview

The open database connectivity (Odbc) connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|On-premises |Anonymous<br> Basic<br> Windows |
| **Pipeline**<br>- Copy activity (source/destination) <br>- Lookup activity    |On-premises |Anonymous<br> Basic |
| **Copy job** (source/destination) <br>- Full load<br>- Append |On-premises |Anonymous<br> Basic |

## Related content

To learn about how to connect to Odbc, go to [Set up your Odbc connection](connector-odbc.md).