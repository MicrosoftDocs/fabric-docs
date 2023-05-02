---
title: Connect to HTTP data in dataflows
description: This article details how to use the Web page connector to connect to HTTP in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to HTTP data in dataflows

You can connect to HTTP in Dataflow Gen2 using the Web page connector provided by Data Factory in Microsoft Fabric.

[!INCLUDE [df-preview-warning](includes/df-preview-warning.md)]

## Connect to HTTP data

To connect to HTTP data from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-http/select-open-dataflow.png" alt-text="Screenshot of the Dataflow Gen2 selection in the Data Factory workspace.":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-http/get-data.png" alt-text="Screenshot of the get data option in the Power Query ribbon.":::

1. From **Choose data source**, select the **Other** category, and then select **Web page**.

   :::image type="content" source="./media/connector-http/select-web-page.png" alt-text="Screenshot of the choose data source screen with the Other category and the Web page connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter the URL of the HTTP page.

1. Select the on-premises data gateway in **Data gateway**.

   >[!NOTE]
   >The Web page connector requires a gateway. If you want to access a non-HTML resource without the gateway, use the Web API connector or one of the File connectors instead.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. The authentication kinds supported by the Web page connector are:

   - Anonymous
   - Basic
   - Organizational account
   - Windows

   More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-http/connect-data-source.png" alt-text="Screenshot of the connect to data source screen.":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Next**.

   :::image type="content" source="./media/connector-http/http-online.png" alt-text="Screenshot of the choose data screen with the table 0 item selected and the corresponding data on the right side." lightbox="./media/connector-http/http-online.png":::

## Advanced connector information

For more advanced information about connecting to your data using the Web connector, go to [Web](/power-query/connectors/web).

## Next steps

- [How to create an HTTP connection](connector-http.md)
- [How to configure HTTP in a copy activity](connector-http-copy-activity.md)
