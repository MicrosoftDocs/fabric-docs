---
title: Set up your Web connection
description: This article provides information about how to create a Web connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
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

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to a website. The following links provide the specific Power Query connector information you need to connect to a website in Dataflow Gen2:

- To get started using the Web API or Web page connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Web connector prerequisites](/power-query/connectors/web/web#prerequisites) before connecting to the Web API or Web page connector.
- To connect to the Web API or Web page connector from Power Query, go to [Load Web data using Power Query Online](/power-query/connectors/web/web#load-web-data-using-power-query-online).

The following Power Query Web connector articles supply more useful information when you use the Web API or Web page connectors:

- [Get webpage data by providing examples](/power-query/connectors/web/web-by-example)
- [Troubleshooting the Web connector](/power-query/connectors/web/web-troubleshoot)

## Set up your connection in a data pipeline

Data Factory in Microsoft Fabric doesn't currently support the Web API or Web page connector in data pipelines.
