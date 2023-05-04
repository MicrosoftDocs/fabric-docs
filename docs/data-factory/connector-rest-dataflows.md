---
title: Connect to REST APIs in dataflows
description: This article details how to use the Data Factory Web API connector in Microsoft Fabric to connect to REST APIs in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to REST APIs in dataflows

You can connect to REST APIs in Dataflow Gen2 using the Web API connector provided by Data Factory in Microsoft Fabric.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Connect to REST APIs

To connect to REST APIs in a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-rest/select-open-dataflow.png" alt-text="Screenshot of the Dataflow Gen2 selection in the Data Factory workspace.":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-rest/get-data.png" alt-text="Screenshot of the get data option in the Power Query ribbon.":::

1. From **Choose data source**, select the **Other** category, and then select **Web API**.

   :::image type="content" source="./media/connector-rest/select-web-api.png" alt-text="Screenshot of the choose data source screen with the Other category and the Web API connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter the URL of the REST API. Generally, this entry is a URI with some parameters, for example `https://api.\<some domain>.com?format=jason`. However, there are no rules around how this URI is configured. To compile the URI, consult the documentation for the REST APIs you're going to be using.

1. If necessary, select the on-premises data gateway in **Data gateway**.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. The authentication kinds supported by the Web page connector are:

   - Anonymous
   - Basic
   - Organizational account
   - Windows

   More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-rest/connect-data-source.png" alt-text="Screenshot of the connect to data source screen.":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Next**.

   :::image type="content" source="./media/connector-rest/rest-online.png" alt-text="Screenshot of the choose data screen with the table 0 item selected and the corresponding data on the right side." lightbox="./media/connector-rest/rest-online.png":::

   The data that's returned is generally in JSON format, but might also be XML.

## Advanced connector information

For more advanced information about connecting to your data using the Web connector, go to [Web](/power-query/connectors/web).

## Next steps

- [How to create a REST connection](connector-http.md)
- [How to configure REST in a copy activity](connector-http-copy-activity.md)
