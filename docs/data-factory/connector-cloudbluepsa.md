---
title: Set up your CloudBluePSA (Beta) connection
description: This article provides information about how to create a CloudBluePSA connection in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your CloudBluePSA (Beta) connection

This article outlines the steps to create a CloudBluePSA connection.

## Supported authentication types

The CloudBluePSA connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Account key| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to CloudBluePSA in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Complete prerequisites for CloudBluePSA (Beta)](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to CloudBluePSA](#connect-to-cloudbluepsa).

### Prerequisites

[!INCLUDE [cloudbluepsa-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/cloudbluepsa-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to CloudBluePSA

[!INCLUDE [cloudbluepsa-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/cloudbluepsa/cloudbluepsa-connect-to-power-query-online.md)]

### More information

- [CloudBluePSA connector capabilities](/power-query/connectors/cloudbluepsa#troubleshooting)

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support CloudBluePSA in pipelines.

## Related content

- [For more information about this connector, see the CloudBluePSA (Beta) connector documentation.](/power-query/connectors/cloudbluepsa)
