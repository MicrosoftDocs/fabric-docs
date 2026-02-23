---
title: Set up your SAP HANA database connection
description: This article provides information about how to create an SAP HANA database connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 02/06/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your SAP HANA database connection

This article outlines the steps to create an SAP HANA database connection.


## Supported authentication types

The SAP HANA database connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Basic (Username/Password)| √ | √ |
|Windows | √ | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to SAP HANA database using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up SAP HANA database prerequisites](/power-query/connectors/sap-hana/overview#prerequisites).
1. Check [SAP HANA database limitations](/power-query/connectors/sap-hana/overview#limitations) to make sure your scenario is supported.
1. [Connect to an SAP HANA database (from Power Query Online)](/power-query/connectors/sap-hana/overview#connect-to-an-sap-hana-database-from-power-query-online).
