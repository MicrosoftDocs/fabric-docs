---
title: Set up your SAP HANA database connection
description: This article provides information about how to create an SAP HANA database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your SAP HANA database connection

This article outlines the steps to create an SAP HANA database connection.


## Supported authentication types

The SAP HANA database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows | √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to SAP HANA database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for SAP HANA database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an SAP HANA database](#connect-to-an-sap-hana-database).

### Capabilities

[!INCLUDE [sap-hana-database-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [sap-hana-database-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an SAP HANA database

[!INCLUDE [sap-hana-database-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [sap-hana-database-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-limitations.md)]

## Related content

- [For more information about this connector, see the SAP HANA database connector documentation.](/power-query/connectors/sap-hana/overview)
