---
title: Set up your Common Data Service (Legacy) connection
description: This article provides information about how to create a Common Data Service (Legacy) connection in Microsoft Fabric.
author: pennyzhou-msft
ms.author: xupzhou
ms.topic: how-to
ms.date: 12/29/2025
ms.custom:
  - template-how-to
  - connectors
---

# Set up your Common Data Service (Legacy) connection

This article outlines the steps to create a Common Data Service (Legacy) connection.

## Supported authentication types

The Common Data Service (Legacy) connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 to Common Data Service (Legacy) in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
1. [Set up Common Data Service (Legacy) prerequisites](/power-query/connectors/common-data-service-legacy#prerequisites).
1. [Find your Common Data Service (Legacy) URL](/power-query/connectors/common-data-service-legacy#finding-your-common-data-service-legacy-environment-url).
1. [Connect to Common Data Service (Legacy) from Power Query online](/power-query/connectors/common-data-service-legacy#connect-to-common-data-service-legacy-from-power-query-online).

### More information

- [Common Data Service (Legacy) connector limitations](/power-query/connectors/common-data-service-legacy#limitations-and-issues)

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support Common Data Service (Legacy) in pipelines.
