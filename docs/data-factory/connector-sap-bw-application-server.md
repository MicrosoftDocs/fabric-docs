---
title: Set up your SAP BW Application Server connection
description: This article provides information about how to create an SAP BW Application Server connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your SAP BW Application Server connection

This article outlines the steps to create an SAP BW Application Server connection.


## Supported authentication types

The SAP BW Application Server connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |
|Windows| n/a | √ |

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 in Microsoft Fabric to SAP BW Application Server using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for SAP BW Application Server](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an SAP BW Application Server](#connect-to-an-sap-bw-application-server).

### Capabilities

[!INCLUDE [sap-bw-application-server-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-bw-application-server/sap-bw-application-server-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [sap-bw-application-server-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-bw-application-server/sap-bw-application-server-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an SAP BW Application Server

[!INCLUDE [sap-bw-application-server-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/sap-bw-application-server/sap-bw-application-server-connect-to-power-query-online.md)]

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support an SAP BW Application Server in pipelines.

## Related content

- [For more information about this connector, see the SAP BW Application Server connector documentation.](/power-query/connectors/sap-bw/application-setup-and-connect)
