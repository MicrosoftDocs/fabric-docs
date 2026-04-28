---
title: Set up your Amazon Athena connection
description: This article provides information about how to create an Amazon Athena connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Amazon Athena connection

This article outlines the steps to create an Amazon Athena connection.


## Supported authentication types

The Amazon Athena connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Amazon Athena using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Amazon Athena](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Amazon Athena data](#connect-to-amazon-athena-data).
1. Check [limitations and considerations](#limitations-and-considerations) for any current restrictions.

### Capabilities

[!INCLUDE [amazon-athena-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-athena/amazon-athena-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [amazon-athena-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-athena/amazon-athena-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Amazon Athena data

[!INCLUDE [amazon-athena-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-athena/amazon-athena-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [amazon-athena-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-athena/amazon-athena-limitations-and-considerations.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Amazon Athena in pipelines.

## Related content

- [For more information about this connector, see the Amazon Athena connector documentation.](/power-query/connectors/amazon-athena)
