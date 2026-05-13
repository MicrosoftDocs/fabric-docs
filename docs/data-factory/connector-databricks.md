---
title: Set up your Databricks connection
description: This article provides information about how to create a Databricks connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Databricks connection

This article outlines the steps to create a Databricks connection.


## Supported authentication types

The Databricks connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Username/Password| n/a | √ |
|Personal Access Token| n/a | √ |
|OAuth (OIDC)| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to Databricks in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Databricks](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Databricks](#connect-to-databricks).

### Capabilities

[!INCLUDE [databricks-ccapabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/databricks/databricks-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [databricks-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/databricks/databricks-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to Databricks

[!INCLUDE [databricks-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/databricks/databricks-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support the Databricks connector in pipelines.

## Related content

- [For more information about this connector, see the Databricks connector documentation.](/power-query/connectors/databricks)
