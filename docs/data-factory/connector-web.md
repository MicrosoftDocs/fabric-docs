---
title: Set up your Web connection
description: This article provides information about how to create a Web connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 12/18/2024
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Web connection

This article outlines the steps to create either a Web API or Web page connection.


## Supported authentication types

Both the Web API and Web page connectors support the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Basic (Username/Password)| n/a | √ |
|Organizational account| n/a | √ |
|Windows| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to Web using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up Web connector prerequisites](/power-query/connectors/web/web#prerequisites).
1. [Load Web data (from Power Query Online)](/power-query/connectors/web/web#load-web-data-using-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support the Web API or Web page connector in pipelines.
