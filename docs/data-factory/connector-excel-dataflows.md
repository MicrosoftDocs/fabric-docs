---
title: Connect to an Excel workbook in dataflows
description: This article details how to use the Data Factory Excel workbook connector in Microsoft Fabric to create an Excel workbook connection in dataflows.
ms.topic: how-to
ms.date: 03/13/2026
ms.custom:
  - template-how-to
  - connectors
ai-usage: ai-assisted
---

# Connect to an Excel workbook in dataflows

You can connect to Excel workbooks in Dataflow Gen2 using the Excel connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Set up your connection for Dataflow Gen2
You can connect Dataflow Gen2 to an Excel workbook in Microsoft Fabric using Power Query connectors. Follow these steps to create your connection:

1. Check [capabilities](#capabilities), [limitations, and considerations](#limitations-and-considerations) to make sure your scenario is supported.
1. [Complete prerequisites for Excel workbook](#prerequisites).
1. [Get data in Fabric](#get-data).
1. [Connect to an Excel workbook](#connect-to-an-excel-workbook).

### Capabilities

[!INCLUDE [excel-ccapabilities-supported](~/../powerquery-repo/powerquery-docs/connectors/includes/excel/excel-capabilities-supported.md)]

### Prerequisites

[!INCLUDE [excel-prerequisites](~/../powerquery-repo/powerquery-docs/connectors/includes/excel/excel-prerequisites.md)]

### Get data

[!INCLUDE [get-data-data-factory-microsoft-fabric](~/../powerquery-repo/powerquery-docs/includes/get-data-data-factory-microsoft-fabric.md)]

### Connect to an Excel workbook

[!INCLUDE [excel-connect-to-power-query-online](~/../powerquery-repo/powerquery-docs/connectors/includes/excel/excel-connect-to-power-query-online.md)]

### Limitations and considerations

[!INCLUDE [excel-limitations-and-considerations](~/../powerquery-repo/powerquery-docs/connectors/includes/excel/excel-limitations-and-considerations-include.md)]

### More information

- [Excel connector suggested tables](/power-query/connectors/excel#suggested-tables)
- [Excel connector troubleshooting](/power-query/connectors/excel#troubleshooting)
- [Excel connector known issues and limitations](/power-query/connectors/excel#known-issues-and-limitations)

## Related content

- [For more information about this connector, see the Excel workbook connector documentation.](/power-query/connectors/excel)
