---
title: Set up your Palantir Foundry connection
description: This article provides information about how to create a Palantir Foundry connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Palantir Foundry connection

This article outlines the steps to create a Palantir Foundry connection.


## Supported authentication types

The Palantir Foundry connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Foundry Token| n/a | √ |
|Foundry OAuth| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to Palantir Foundry using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Palantir Foundry](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Palantir Foundry](#connect-to-palantir-foundry).

### Capabilities

[!INCLUDE [palantir-foundry-datasets-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/palantir-foundry-datasets/palantir-foundry-datasets-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [palantir-foundry-datasets-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/palantir-foundry-datasets/palantir-foundry-datasets-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Palantir Foundry

[!INCLUDE [palantir-foundry-datasets-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/palantir-foundry-datasets/palantir-foundry-datasets-connect-to-power-query-online.md)]


## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Palantir Foundry in pipelines.

## Related content

- [For more information about this connector, see the Palantir Foundry connector documentation.](/power-query/connectors/palantir-foundry-datasets)
