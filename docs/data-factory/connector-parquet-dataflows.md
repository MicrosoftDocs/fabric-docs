---
title: Connect to Parquet files in dataflows
description: This article details how to use the Data Factory Parquet connector in Microsoft Fabric to create a Parquet file connection in dataflows.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Connect to Parquet files in dataflows

You can connect to Parquet files in Dataflow Gen2 using the Parquet connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Set up your connection for Dataflow Gen2
You can connect a dataflow Gen2 in Fabric to Parquet files by using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Get data in Fabric](#get-data).
1. [Connect to a Parquet file](#connect-to-a-parquet-file).

<a id="capabilities"></a>

<a id="capabilities-supported"></a>

## Supported capabilities

[!INCLUDE [parquet-capabilities-supported](includes/power-query/connectors/includes/parquet/parquet-capabilities-supported.md)]

## Connection settings

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

<a id="connect-to-a-parquet-file"></a>

### Connection instructions

[!INCLUDE [parquet-connect-to-power-query-online](includes/power-query/connectors/includes/parquet/parquet-connect-to-power-query-online.md)]

## Limitations and considerations

[!INCLUDE [parquet-limitations-and-considerations](includes/power-query/connectors/includes/parquet/limitations.md)]

## Related content

- [For more information about this connector, see the Parquet files connector documentation.](/power-query/connectors/parquet)
