---
title: MariaDB connector overview
description: This article provides an overview of the supported capabilities of the MariaDB connector.
author: whhender
ms.author: whhender
ms.topic: how-to
ms.date: 09/29/2024
ms.custom:
  - template-how-to
  - connectors
---

# MariaDB connector overview

The MariaDB connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Data pipeline

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Basic |
| **Data pipeline**<br>- [Copy activity](connector-mariadb-copy-activity.md) (source/-) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Basic |
| **Copy job** (source/-) <br>- Full load |None<br> On-premises<br> Virtual network |Basic |

## Related content

To learn more about the copy activity configuration for MariaDB in Data pipeline, go to [Configure in a data pipeline copy activity](connector-mariadb-copy-activity.md).
