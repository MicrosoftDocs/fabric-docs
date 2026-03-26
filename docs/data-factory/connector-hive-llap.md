---
title: Set up your Hive LLAP connection
description: This article provides information about how to create a Hive LLAP connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Hive LLAP connection

This article outlines the steps to create a Hive LLAP connection.


## Supported authentication types

The Hive LLAP connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Windows| n/a | √ |
|Basic| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Hive LLAP using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Hive LLAP](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Hive LLAP data](#connect-to-hive-llap-data).

### Capabilities

[!INCLUDE [hive-llap-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/hive-llap/hive-llap-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [hive-llap-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/hive-llap/hive-llap-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Hive LLAP data

[!INCLUDE [hive-llap-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/hive-llap/hive-llap-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Hive LLAP data in pipelines.

## Related content

- [For more information about this connector, see the Hive LLAP connector documentation.](/power-query/connectors/hive-llap)
