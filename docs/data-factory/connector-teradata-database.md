---
title: Set up your Teradata database connection
description: This article provides information about how to create a Teradata database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Teradata database connection

This article outlines the steps to create a Teradata database connection.


## Supported authentication types

The Teradata database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows| √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Teradata database using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Teradata database](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a Teradata database](#connect-to-a-teradata-database).

### Capabilities

[!INCLUDE [teradata-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/teradata/teradata-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [teradata-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/teradata/teradata-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a Teradata database

[!INCLUDE [teradata-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/teradata/teradata-connect-to-power-query-online.md)]


## Related content

- [For more information about this connector, see the Teradata database connector documentation.](/power-query/connectors/teradata)
