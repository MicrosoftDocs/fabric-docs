---
title: Azure Data Lake Storage Gen2 for dataflows
description: This article details how to use the Azure Data Lake Storage Gen2 connector in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 3/29/2023
ms.custom: template-how-to 
---

# Azure Data Lake Storage Gen2 in dataflows

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can connect to Azure Data Lake Storage files in gen2 dataflows using the Azure Data Lake Storage Gen2 connector provided by Data Factory in Microsoft Fabric.

## Connect to Azure Data Lake Storage data

To connect to Azure Data Lake Storage Gen2 data from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/select-open-dataflow.png" alt-text="Screenshot of the dataflow gen2 selection in the Data Factory workspace.":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/get-data.png" alt-text="Screenshot of the get data option in the Power Query ribbon.":::

1. From **Choose data source**, select the **Azure** category, and then select **Azure Data Lake Storage Gen2**.

   :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/select-azure-data-lake-storage-gen2.png" alt-text="Screenshot of the choose data source screen with the Azure category and the Azure Data Lake Storage Gen2 connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter the URL of your account.

1. Select whether you want to use the file system view or the Common Data Model folder view.

1. If needed, select the on-premises data gateway in **Data gateway**.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/connect-data-source.png" alt-text="Screenshot of the connect to data source screen .":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Transform data**.

   :::image type="content" source="./media/connector-azure-data-lake-storage-gen2/file-systems-online.png" alt-text="Screenshot of the choose data screen with the test examples item selected and the corresponding data on the right side.":::

## Advanced connector information

For more advanced information about connecting to your data using the Azure Data Lake Storage Gen2 connector, go to [Azure Data Lake Storage Gen2](/power-query/connectors/data-lake-storage).

## Next steps

[How to create an Azure Data Lake Storage Gen2 connection](connector-azure-data-lake-storage-gen2.md)

[How to configure Azure Data Lake Storage Gen2 in a copy activity](connector-azure-data-lake-storage-gen2-copy-activity.md)
