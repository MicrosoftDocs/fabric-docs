---
title: Set up your SharePoint folder connection
description: This article provides information about how to create a SharePoint folder connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
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

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a SharePoint folder. The following links provide the specific Power Query connector information you need to connect to a SharePoint folder in Dataflow Gen2:

- To get started using the SharePoint folder connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- To determine the URL to use to access your SharePoint folder, go to [Determine the site URL](/power-query/connectors/sharepoint-folder#determine-the-site-url).
- To connect to the SharePoint folder connector from Power Query, go to [Connect to a SharePoint folder from Power Query Online](/power-query/connectors/sharepoint-folder#connect-to-a-sharepoint-folder-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support a SharePoint folder in data pipelines.
