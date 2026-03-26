---
title: Set up your ODBC connection
description: This article provides information about how to create an ODBC data source connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your ODBC connection

This article outlines the steps to create an ODBC connection.


## Supported authentication types

The ODBC connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √ | √ |
|Basic (Username/Password)| √ | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to ODBC using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for ODBC](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an ODBC data source](#connect-to-an-odbc-data-source).

### Capabilities

[!INCLUDE [odbc-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [odbc-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an ODBC data source

[!INCLUDE [odbc-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [odbc-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/odbc/odbc-limitations-and-considerations-include.md)]

## Related content

- [For more information about this connector, see the ODBC connector documentation.](/power-query/connectors/odbc)
