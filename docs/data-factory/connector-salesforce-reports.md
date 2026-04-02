---
title: Set up your Salesforce reports connection
description: This article provides information about how to create a Salesforce reports connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Salesforce reports connection

This article outlines the steps to create a Salesforce reports connection.


## Supported authentication types

The Salesforce reports connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Salesforce reports using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Salesforce reports](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Salesforce Reports](#connect-to-salesforce-reports).

### Capabilities

[!INCLUDE [salesforce-reports-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-reports/salesforce-reports-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [salesforce-reports-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-reports/salesforce-reports-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Salesforce Reports

[!INCLUDE [salesforce-reports-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-reports/salesforce-reports-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [salesforce-reports-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/salesforce-reports/salesforce-reports-limitations-and-considerations-include.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Salesforce reports in pipelines.

## Related content

- [For more information about this connector, see the Salesforce reports connector documentation.](/power-query/connectors/salesforce-reports)
