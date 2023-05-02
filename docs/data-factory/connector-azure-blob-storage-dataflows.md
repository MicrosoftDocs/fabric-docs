---
title: Connect to Azure Blob Storage in dataflows
description: This article explains how to connect to Azure Blob Storage in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 4/18/2023
ms.custom: template-how-to 
---

# Connect to Azure Blob Storage in dataflows

You can connect to Azure Blob Storage files in Dataflows Gen2 using the Azure Blob Storage connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning)]

## Connect to Azure Blob Storage data

To connect to Azure Blob Storage from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-azure-blob-storage/select-open-dataflow.png" alt-text="Screenshot showing the workspace where you choose to create a new dataflow." lightbox="./media/connector-azure-blob-storage/select-open-dataflow.png":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-azure-blob-storage/get-data.png" alt-text="Screenshot showing the Power Query workspace with the Get data option emphasized.":::

1. From **Choose data source**, select the **Azure** category, and then select **Azure Blobs**.

   :::image type="content" source="./media/connector-azure-blob-storage/select-blobs.png" alt-text="Screenshot showing Choose data source with the Azure category and the Azure Blobs connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter your account name or the URL of your account.

1. If you're connecting to this data source for the first time, select the authentication type to use in **Authentication kind**, and then enter your credentials. The supported authentication types for this data source are:

   - Anonymous
   - Account key
   - Shared Access Signature (SAS)
   - Organizational account

1. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-azure-blob-storage/connect-data-source.png" alt-text="Screenshot showing Connect data source where you enter your account name or URL and your credentials." lightbox="./media/connector-azure-blob-storage/connect-data-source.png":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Transform data**.

   :::image type="content" source="./media/connector-azure-blob-storage/choose-data.png" alt-text="Screenshot showing the Power Query Choose data window with one item selected and the item's data displayed in the right pane." lightbox="./media/connector-azure-blob-storage/choose-data.png":::

## Advanced connector information

For more advanced information about connecting to your data source using the Azure Blob Storage connector, go to [Azure Blob Storage](/power-query/connectors/azure-blob-storage).

## Next steps

- [How to create an Azure Blob connection](connector-azure-blob-storage.md)
- [Copy data in Azure Blob Storage](connector-azure-blob-storage-copy-activity.md)
