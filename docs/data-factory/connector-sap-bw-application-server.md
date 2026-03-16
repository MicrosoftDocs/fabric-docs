---
title: Set up your SAP BW Application Server connection
description: This article provides information about how to create an SAP BW Application Server connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 12/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your SAP BW Application Server connection

This article outlines the steps to create an SAP BW Application Server connection.


## Supported authentication types

The SAP BW Application Server connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to SAP BW Application Server using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up SAP BW Application Server prerequisites](/power-query/connectors/sap-bw/application-setup-and-connect#prerequisites).
1. [Connect to an SAP BW Application Server (from Power Query Online)](/power-query/connectors/sap-bw/application-setup-and-connect#connect-to-an-sap-bw-application-server-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support an SAP BW Application Server in pipelines.
