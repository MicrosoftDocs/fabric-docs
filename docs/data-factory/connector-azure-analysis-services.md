---
title: Set up your Azure Analysis Services connection
description: This article provides information about how to create an Azure Analysis Services connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Azure Analysis Services connection

You can connect Dataflow Gen2 to Azure Analysis Services in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Azure Analysis Services](#prerequisites).
1. [Get data in Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Connect to Azure Analysis Services](#connect-to-azure-analysis-services).


## Supported authentication types

The Access database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Capabilities
[!INCLUDE [azure-analysis-services-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-analysis-services/azure-analysis-services-capabilities-supported.md)]

## Prerequisites
[!INCLUDE [azure-analysis-services-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-analysis-services/azure-analysis-services-prerequisites.md)]

## Connect to Azure Analysis Services

[!INCLUDE [azure-analysis-services-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-analysis-services/azure-analysis-services-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the Azure Analysis Services connector documentation.](/power-query/connectors/azure-analysis-services)
