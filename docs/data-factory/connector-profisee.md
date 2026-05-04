---
title: Set up your Profisee connection
description: This article provides information about how to create a Profisee connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 04/06/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Profisee connection

This article outlines the steps to create a Profisee connection.


## Supported authentication types

The Profisee connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Profisee using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Profisee](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Profisee data](#connect-to-profisee-data).

### Capabilities

[!INCLUDE [profisee-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/profisee/profisee-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [profisee-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/profisee/profisee-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Profisee data

[!INCLUDE [profisee-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/profisee/profisee-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Profisee in pipelines.

## Related content

- [For more information about this connector, see the Profisee connector documentation.](/power-query/connectors/profisee)
