---
title: Connect to a Lakehouse data lake in dataflows
description: This article details how to use the Lakehouse connector in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to a Lakehouse data lake in dataflows

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

You can connect to a Lakehouse data lake in Dataflow Gen2 using the Lakehouse connector provided by Data Factory in Microsoft Fabric.

## Connect to a Lakehouse data lake

To connect to a Lakehouse data lake from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-lakehouse/select-open-dataflow.png" alt-text="Screenshot of the Dataflow Gen2 selection in the Data Factory workspace.":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-lakehouse/get-data.png" alt-text="Screenshot of the get data option in the Power Query ribbon.":::

1. From **Choose data source**, select the **Power Platform** category, and then select **Lakehouse**.

   :::image type="content" source="./media/connector-lakehouse/select-lakehouse.png" alt-text="Screenshot of the choose data source screen with the Power Platform category and the Lakehouse connector emphasized.":::

1. In **Connect to data source**, under **Connection credentials**, enter the URL of your account.

1. Select whether you want to use the file system view or the Common Data Model folder view.

1. If needed, select the on-premises data gateway in **Data gateway**.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-lakehouse/connect-data-source.png" alt-text="Screenshot of the connect to data source screen.":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Transform data**.

   :::image type="content" source="./media/connector-lakehouse/file-systems-online.png" alt-text="Screenshot of the choose data screen with the test examples item selected and the corresponding data on the right side." lightbox="./media/connector-lakehouse/file-systems-online.png":::

## Next steps

- [How to configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
