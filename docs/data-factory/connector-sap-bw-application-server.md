---
title: Set up your SAP BW Application Server connection
description: This article provides information about how to create an SAP BW Application Server connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
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

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to an SAP BW Application Server. The following links provide the specific Power Query connector information you need to connect to an SAP BW Application Server in Dataflow Gen2:

- To get started using the SAP BW Application Server connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [SAP BW Application Server prerequisites](/power-query/connectors/sap-bw/application-setup-and-connect#prerequisites) before connecting to the SAP BW Application Server connector.
- To connect to the SAP BW Application Server connector from Power Query, go to [Connect to an SAP BW Application Server from Power Query Online](/power-query/connectors/sap-bw/application-setup-and-connect#connect-to-an-sap-bw-application-server-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support an SAP BW Application Server in data pipelines.
