---
title: Set up your SharePoint folder connection
description: This article provides information about how to create a SharePoint folder connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 12/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your SharePoint folder connection

This article outlines the steps to create a SharePoint folder connection.


## Supported authentication types

The SharePoint folder connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to SharePoint folder using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Connect to a SharePoint folder (from Power Query Online)](/power-query/connectors/sharepoint-folder#connect-to-a-sharepoint-folder-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support a SharePoint folder in pipelines.
