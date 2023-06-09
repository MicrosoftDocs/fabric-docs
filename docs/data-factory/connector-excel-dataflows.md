---
title: Connect to an Excel workbook in dataflows
description: This article details how to use the Data Factory Excel workbook connector in Microsoft Fabric to create an Excel workbook connection in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to, build-2023
---

# Connect to an Excel workbook in dataflows

You can connect to Excel workbooks in Dataflow Gen2 using the Excel connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Connect to an Excel workbook

To connect to an Excel workbook in a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-excel-workbook/select-open-dataflow.png" alt-text="Screenshot showing the workspace where you choose to create a new dataflow." lightbox="./media/connector-excel-workbook/select-open-dataflow.png":::

1. In Power Query, select **Import from Excel**.

   :::image type="content" source="./media/connector-excel-workbook/import-data.png" alt-text="Screenshot showing the Power Query workspace with the Import from Excel option emphasized." lightbox="./media/connector-excel-workbook/import-data.png":::

   You can also select **Get data** in the Power Query ribbon, or select **Get data from another source**. If you choose either of these selections, select the **File** category, and then select **Excel workbook** from the **Choose data source** dialog.

   :::image type="content" source="./media/connector-excel-workbook/get-data.png" alt-text="Screenshot showing the Power Query workspace with the Get data and Get data from another source emphasized." lightbox="./media/connector-excel-workbook/get-data.png":::

   :::image type="content" source="./media/connector-excel-workbook/select-excel.png" alt-text="Screenshot showing Choose data source with the File category and the Excel workbook connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter the path or URL for your Excel workbook. If the workbook is stored online, select **Link to file**. Then either enter the URL to your online Excel workbook, or select the **Browse OneDrive** to navigate to a workbook on OneDrive. If the workbook is stored locally, either enter the path and filename to your local Excel workbook, or select **Upload file** and drag the file to the page or select **Browse** to browse to the location of the local Excel workbook.

1. If you're connecting to this data source for the first time, select the authentication type to use in **Authentication kind**, and then enter your credentials. The supported authentication types for this data source are:

   - Anonymous
   - Basic  
   - Organizational account

1. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-excel-workbook/connect-data-source.png" alt-text="Screenshot showing Connect data source where you enter your account name or URL and your credentials." lightbox="./media/connector-excel-workbook/connect-data-source.png":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Create**.

   :::image type="content" source="./media/connector-excel-workbook/choose-data.png" alt-text="Screenshot showing the Power Query Choose data window with one item selected and the item's data displayed in the right pane." lightbox="./media/connector-excel-workbook/choose-data.png":::

## Advanced connector information

For more advanced information about connecting to your data source using the Excel workbook connector, go to [Excel](/power-query/connectors/excel).

## Next steps

- [Excel format in Data Factory in Microsoft Fabric](format-excel.md)
