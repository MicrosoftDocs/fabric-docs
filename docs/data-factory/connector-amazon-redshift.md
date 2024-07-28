---
title: Set up your Amazon Redshift connection
description: This article provides information about how to create an Amazon Redshift connection in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Set up your Amazon Redshift connection

This article outlines the steps to create an Amazon Redshift connection.

## Supported authentication types

The Amazon Redshift connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Amazon Redshift| n/a | √ |
|Microsoft Account| n/a | √ |

## Set up your connection in Dataflow Gen2

Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Amazon Redshift. The following links provide the specific Power Query connector information you need to connect to Amazon Redshift in Dataflow Gen2:

- To get started using the Amazon Redshift connector in Dataflow Gen2, go to [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric-preview).
- Be sure to install or set up any [Amazon Redshift prerequisites](/power-query/connectors/amazon-redshift#prerequisites) before connecting to the Amazon Redshift connector.
- To connect to the Amazon Redshift connector from Power Query, go to [Connect to Amazon Redshift data from Power Query Online](/power-query/connectors/amazon-redshift#connect-to-amazon-redshift-data-from-power-query-online).

In some cases, the Power Query connector article might include advanced options, troubleshooting, known issues and limitations, and other information that could also prove useful.
