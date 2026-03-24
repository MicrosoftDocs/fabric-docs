---
title: SAP HANA database connector overview
description: This article provides an overview of the supported capabilities of the SAP HANA database connector.
ms.topic: how-to
ms.date: 02/06/2025
ms.custom:
  - template-how-to
  - connectors
---

# SAP HANA connector overview

The SAP HANA database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|On-premises |Basic<br> Windows |
| **Pipeline**<br>- [Copy activity](connector-sap-hana-copy-activity.md)(source/-) <br>- Lookup activity    |On-premises |Basic<br> Windows |
| **Copy job** (source/-) <br>- Full load<br>- Incremental load |On-premises |Basic<br> Windows |

## Related content

For information on how to connect to an SAP HANA, go to [Set up your SAP HANA database connection](connector-sap-hana.md).

To learn about the copy activity configuration for SAP HANA in pipelines, go to [Configure SAP HANA in a copy activity](connector-sap-hana-copy-activity.md).