---
title: Set up your FHIR data connection
description: This article provides information about how to create a FHIR data connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your FHIR data connection

This article outlines the steps to create a FHIR data connection.


## Supported authentication types

The FHIR connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Organizational account| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to FHIR using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for FHIR data](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to a FHIR server](#connect-to-a-fhir-server).

### Capabilities

[!INCLUDE [fhir-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/fhir/fhir-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [fhir-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/fhir/fhir-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to a FHIR server

[!INCLUDE [fhir-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/fhir/fhir-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support FHIR in pipelines.

## Related content

- [For more information about this connector, see the FHIR data connector documentation.](/power-query/connectors/fhir/fhir)
