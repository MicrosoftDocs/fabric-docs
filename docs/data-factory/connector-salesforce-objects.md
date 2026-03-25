---
title: Set up your Salesforce objects connection
description: This article provides information about how to create a Salesforce objects connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Salesforce objects connection

This article outlines the steps to create a Salesforce objects connection.

## Supported authentication types

The Salesforce objects connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Salesforce objects using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Salesforce objects](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Salesforce Objects](#connect-to-salesforce-objects).

### Capabilities

[!INCLUDE [salesforce-objects-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-objects/salesforce-objects-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [salesforce-objects-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-objects/salesforce-objects-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Salesforce Objects

[!INCLUDE [salesforce-objects-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-objects/salesforce-objects-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [salesforce-objects-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-objects/salesforce-objects-limitations-and-considerations-include.md)]

## Related content

- [For more information about this connector, see the Salesforce objects connector documentation.](/power-query/connectors/salesforce-objects)
