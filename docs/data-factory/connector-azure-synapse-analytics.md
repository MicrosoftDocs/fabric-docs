---
title: Set up your Azure Synapse Analytics connection
description: This article provides information about how to create an Azure Synapse Analytics connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Azure Synapse Analytics connection

This article outlines the steps to create an Azure Synapse Analytics connection in Microsoft Fabric.

## Supported authentication types

The Azure Synapse Analytics connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic| √ | √ |
|Organizational account| √ | √ |
|Service principal | √ | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to Azure Synapse Analytics in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Azure Synapse Analytics](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Azure Synapse Analytics](#connect-to-azure-synapse-analytics).

### Capabilities

[!INCLUDE [synapse-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/synapse/synapse-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [synapse-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/synapse/synapse-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Azure Synapse Analytics

[!INCLUDE [azure-sql-data-warehouse-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/azure-sql-data-warehouse/azure-sql-data-warehouse-connect-to-power-query-online.md)]


## More information

- [Connect using advanced options](/power-query/connectors/azure-sql-data-warehouse#connect-using-advanced-options)
- [Troubleshooting](/power-query/connectors/azure-sql-data-warehouse#troubleshooting)

## Related content

- [For more information about this connector, see the Azure Synapse Analytics connector documentation.](/power-query/connectors/azure-sql-data-warehouse)
