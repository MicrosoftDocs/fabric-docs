---
title: SAP HANA Database Connector Overview
description: This article provides an overview of the supported capabilities of the SAP HANA database connector.
ms.date: 06/19/2026
ms.topic: how-to
ms.custom:
  - template-how-to
  - connectors
---

# SAP HANA connector overview

The SAP HANA database connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|On-premises |Basic<br /> Windows |
| **Pipeline**<br />- [Copy activity](connector-sap-hana-copy-activity.md)(source/-) <br />- Lookup activity    |On-premises |Basic<br /> Windows |
| **Copy job** (source/-) <br />- Full load<br />- Incremental load |On-premises |Basic<br /> Windows |

## Related content

- [Set up your SAP HANA database connection](connector-sap-hana.md)
- [Configure SAP HANA in a copy activity](connector-sap-hana-copy-activity.md)
