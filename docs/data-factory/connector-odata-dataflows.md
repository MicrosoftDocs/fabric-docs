---
title: Connect to OData in dataflows
description: This article details how to use the OData connector in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 3/29/2023
ms.custom: template-how-to 
---

# OData in dataflows

You can connect to an OData feed in Dataflow Gen2 using the OData connector provided by Data Factory in Microsoft Fabric.

[!INCLUDE [df-preview-warning](includes/df-preview-warning.md)]

## Connect to an OData feed

To connect to an OData feed from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-odata/select-open-dataflow.png" alt-text="Screenshot of the dataflow gen2 (preview) selection in the Data Factory workspace.":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-odata/get-data.png" alt-text="Screenshot of the get data option in the Power Query ribbon.":::

1. From **Choose data source**, select the **Other** category, and then select **OData**.

   :::image type="content" source="./media/connector-odata/select-odata.png" alt-text="Screenshot of the choose data source screen with the Other category and the OData connector emphasized." lightbox="./media/connector-odata/select-odata.png":::

1. In **Connect to data source**, under **Connection settings**, enter the URL of your data.

1. If needed, select the on-premises data gateway in **Data gateway**.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-odata/connect-data-source.png" alt-text="Screenshot of the connect to data source screen for an OData source." lightbox="./media/connector-odata/connect-data-source.png":::

1. Select **Next**.

1. In **Choose data**, select the data items you want to transform, and then select **Transform data**.

   :::image type="content" source="./media/connector-odata/select-data.png" alt-text="Screenshot of the choose data screen with the employees item selected on the left side and the corresponding data displayed on the right side." lightbox="./media/connector-odata/select-data.png":::

## Advanced connector information

For more advanced information about connecting to your data using the OData connector, go to [OData feed](/power-query/connectors/odata-feed).

## Next steps

- [How to create an OData connection](connector-odata-overview.md)
- [How to configure OData in a copy activity](connector-odata-copy-activity.md)
