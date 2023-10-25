---
title: Connect to a Lakehouse data lake in dataflows
description: This article details how to use the Data Factory Lakehouse connector in Microsoft Fabric to create a data lake connection in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to a Lakehouse data lake in dataflows

You can connect to a Lakehouse data lake in Dataflow Gen2 using the Lakehouse connector provided by Data Factory in Microsoft Fabric.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

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

   :::image type="content" source="./media/connector-lakehouse/choose-data-item.png" alt-text="Screenshot of the choose data screen with the test examples item selected and the corresponding data on the right side." lightbox="./media/connector-lakehouse/choose-data-item.png":::

## Next steps

- [How to configure Lakehouse in a copy activity](connector-lakehouse-copy-activity.md)
