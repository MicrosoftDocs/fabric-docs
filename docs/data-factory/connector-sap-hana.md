---
title: Set up your SAP HANA database connection
description: This article provides information about how to create an SAP HANA database connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your SAP HANA database connection

This article outlines the steps to create an SAP HANA database connection.


## Supported authentication types

The SAP HANA database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to an SAP HANA database. The following links provide the specific Power Query connector information you need to connect to an SAP HANA database in Dataflow Gen2:

- To get started using the SAP HANA database connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [SAP HANA database prerequisites](/power-query/connectors/sap-hana/overview#prerequisites) before connecting to the SAP HANA database connector.
- To connect to the SAP HANA database connector from Power Query, go to [Connect to an SAP HANA database from Power Query Online](/power-query/connectors/sap-hana/overview#connect-to-an-sap-hana-database-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support an SAP HANA database in data pipelines.
