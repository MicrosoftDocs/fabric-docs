---
title: Set up your SAP BW Message Server connection
description: This article provides information about how to create an SAP BW Message Server connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your SAP BW Message Server connection

This article outlines the steps to create an SAP BW Message Server connection.


## Supported authentication types

The SAP BW Message Server connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to SAP BW Message Server using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up SAP BW Message Server prerequisites](/power-query/connectors/sap-bw/message-setup-and-connect#prerequisites).
1. [Connect to an SAP BW Message Server (from Power Query Online)](/power-query/connectors/sap-bw/message-setup-and-connect#connect-to-an-sap-bw-message-server-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support an SAP BW Message Server in pipelines.
