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

You can connect dataflow Gen2 to Azure Analysis Services in Fabric by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Azure Analysis Services](#prerequisites).
1. [Get data in Data Factory](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Connect to Azure Analysis Services](#connect-to-azure-analysis-services).


<a id="supported-authentication-types"></a>

## Summary

The Access database connector supports the following authentication types for copy and dataflow Gen2.

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Prerequisites
[!INCLUDE [azure-analysis-services-prerequisites](includes/power-query/connectors/includes/azure-analysis-services/azure-analysis-services-prerequisites.md)]

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities
[!INCLUDE [azure-analysis-services-capabilities-supported](includes/power-query/connectors/includes/azure-analysis-services/azure-analysis-services-capabilities-supported.md)]

## Connection settings

<a id="connect-to-azure-analysis-services"></a>

### Connection instructions

[!INCLUDE [azure-analysis-services-connect-to-power-query-online](includes/power-query/connectors/includes/azure-analysis-services/azure-analysis-services-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the Azure Analysis Services connector documentation.](/power-query/connectors/azure-analysis-services)
