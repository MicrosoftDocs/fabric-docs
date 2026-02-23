---
title: Set up your Odbc connection
description: This article provides information about how to create an Odbc data source connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 09/24/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Odbc connection

This article outlines the steps to create an Odbc connection.


## Supported authentication types

The Odbc connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| √ | √ |
|Basic (Username/Password)| √ | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to ODBC using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up ODBC prerequisites](/power-query/connectors/odbc#prerequisites).
1. Check [ODBC known issues and limitations](/power-query/connectors/odbc#known-issues-and-limitations) to make sure your scenario is supported.
1. [Connect to an ODBC data source (from Power Query Online)](/power-query/connectors/odbc#connect-to-an-odbc-data-source-from-power-query-online).

