---
title: Connect to Parquet files in dataflows
description: This article explains how to use the Data Factory Parquet connector in Microsoft Fabric to connect to Parquet files in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to Parquet files in dataflows

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

You can connect to Parquet files in Dataflow Gen2 using the Parquet connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Connect to Parquet files

To connect to Parquet files in a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-parquet/select-open-dataflow.png" alt-text="Screenshot showing the workspace where you choose to create a new dataflow." lightbox="./media/connector-parquet/select-open-dataflow.png":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-parquet/get-data.png" alt-text="Screenshot showing the Power Query workspace with the Get data option emphasized.":::

1. From **Choose data source**, select the **File** category, and then select **Parquet**.

   :::image type="content" source="./media/connector-parquet/select-parquet.png" alt-text="Screenshot showing Choose data source with the File category and the Parquet connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter the file path and filename or the URL of the online file location.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-parquet/connect-data-source.png" alt-text="Screenshot showing Connect data source where you enter your account name or URL and your credentials." lightbox="./media/connector-parquet/connect-data-source.png":::

1. Select **Next** to continue to the Power Query editor, where you can then begin to transform your data.

   :::image type="content" source="./media/connector-parquet/edit-data.png" alt-text="Screenshot showing the Power Query editor with the Parquet file data displayed." lightbox="./media/connector-parquet/edit-data.png":::

## Advanced connector information

For more advanced information about connecting to your data using the parquet connector, go to [Parquet](/power-query/connectors/parquet).

## Next steps

- [Parquet format](parquet-format.md)
