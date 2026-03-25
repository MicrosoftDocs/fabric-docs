---
title: Set up your Amazon Redshift connection
description: This article provides information about how to create an Amazon Redshift connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Set up your Amazon Redshift connection

You can connect Dataflow Gen2 to Amazon Redshift in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities) to make sure your scenario is supported.
1. [Complete prerequisites for Amazon Redshift](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to Amazon Redshift data](#connect-to-amazon-redshift-data).

## Supported authentication types

The Amazon Redshift connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Amazon Redshift| n/a | √ |
|Microsoft Account| n/a | √ |

## Capabilities
[!INCLUDE [amazon-redshift-capabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-redshift/amazon-redshift-capabilities-supported.md)]

## Prerequisites
[!INCLUDE [amazon-redshift-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-redshift/amazon-redshift-prerequisites.md)]


## Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

## Connect to Amazon Redshift data

[!INCLUDE [amazon-redshift-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/amazon-redshift/amazon-redshift-connect-to-power-query-online.md)]

## Related content

- [For more information about this connector, see the Amazon Redshift connector documentation.](/power-query/connectors/amazon-redshift)
