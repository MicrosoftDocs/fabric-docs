---
title: Connect to a SharePoint Online list in dataflows
description: This article details how to use the SharePoint Online list connector in Microsoft Fabric to connect to a SharePoint Online list in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to a SharePoint Online list in dataflows

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

You can connect to a SharePoint Online list in Dataflow Gen2 using the SharePoint Online list connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Connect to a SharePoint Online list

To connect to a SharePoint Online list from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-sharepoint-online-list/select-open-dataflow.png" alt-text="Screenshot showing the workspace where you choose to create a new dataflow." lightbox="./media/connector-sharepoint-online-list/select-open-dataflow.png":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-sharepoint-online-list/get-data.png" alt-text="Screenshot showing the Power Query workspace with the Get data option emphasized.":::

1. From **Choose data source**, select the **Online services** category, and then select **SharePoint Online list**.

   :::image type="content" source="./media/connector-sharepoint-online-list/select-sharepoint-online-list.png" alt-text="Screenshot showing Choose data source with the Online services category and the SharePoint Online list connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, enter the site URL. For information on determining the site URL, go to [Determine the site URL](/power-query/connectors/sharepoint-online-list#determine-the-site-url).

1. Select the Implementation you want to use for the connection. More information: [Connect to SharePoint Online list v2.0](/power-query/connectors/sharepoint-online-list#connect-to-sharepoint-online-list-v20)

1. Enter the name of an on-premises data gateway if needed.

1. If you're connecting to this data source for the first time, select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-sharepoint-online-list/connect-data-source.png" alt-text="Screenshot showing Connect data source where you enter your site URL, implementation, and your credentials." lightbox="./media/connector-sharepoint-online-list/connect-data-source.png":::

1. Select **Next** to continue to the Power Query editor, where you can then begin to transform your data.

   :::image type="content" source="./media/connector-sharepoint-online-list/edit-data.png" alt-text="Screenshot showing the Power Query editor with the SharePoint Online list data displayed." lightbox="./media/connector-sharepoint-online-list/edit-data.png":::

## Advanced connector information

For more advanced information about connecting to your data using the SharePoint Online list connector, go to [SharePoint Online list](/power-query/connectors/sharepoint-online-list).

## Next steps

- [How to create a SharePoint Online list connection](connector-sharepoint-online-list.md)
- [How to configure SharePoint Online List in copy activity](connector-sharepoint-online-list-copy-activity.md)
