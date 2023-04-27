---
title: Connect to Azure Data Explorer (Kusto) in dataflows
description: This article details how to use the Azure Data Explorer (Kusto) connector in Microsoft Fabric to connect to Azure Data Explorer (Kusto) in dataflows.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to Azure Data Explorer (Kusto) in dataflows

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

You can connect to Azure Data Explorer (Kusto) in Dataflow Gen2 using the Azure Data Explorer (Kusto) connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Connect to Azure Data Explorer (Kusto)

To connect to Azure Data Explorer from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-kusto/select-open-dataflow.png" alt-text="Screenshot showing the workspace where you choose to create a new dataflow." lightbox="./media/connector-kusto/select-open-dataflow.png":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-kusto/get-data.png" alt-text="Screenshot showing the Power Query workspace with the Get data option emphasized.":::

1. From **Choose data source**, select the **Azure** category, and then select **Azure Data Explorer (Kusto)**.

   :::image type="content" source="./media/connector-kusto/select-kusto.png" alt-text="Screenshot showing Choose data source with the Azure category and the Azure Data Explorer (Kusto) connector emphasized.":::

1. In **Azure Data Explorer (Kusto)**, provide the name of your Azure Data Explorer cluster. For this example, use `https://help.kusto.windows.net` to access the sample help cluster. For other clusters, the URL is in the form `https://_\<ClusterName>_._\<Region>_.kusto.windows.net`.

   You can also select a database that's hosted on the cluster you're connecting to, and one of the tables in the database, or a query like `StormEvents | take 1000`.

   :::image type="content" source="./media/connector-kusto/connect-data-source.png" alt-text="Screenshot showing Connect data source where you enter your Kusto cluster name and your credentials." lightbox="./media/connector-kusto/connect-data-source.png":::

1. If you want to use any advance options, select the option and enter the data to use with that option. More information: [Connect using advanced options](/power-query/connectors/azure-data-explorer#connect-using-advanced-options)

1. If needed, select the on-premises data gateway in **Data gateway**.

1. Select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

1. Select **Next** to continue to the Power Query editor, where you can then begin to transform your data.

   :::image type="content" source="./media/connector-kusto/edit-data.png" alt-text="Screenshot showing the Power Query editor with the Azure Data Explorer (Kusto) data displayed." lightbox="./media/connector-kusto/edit-data.png":::

## Advanced connector information

For more advanced information about connecting to your data using the Azure Data Explorer (Kusto) connector, go to [Azure Data Explorer (Kusto)](/power-query/connectors/azure-data-explorer).

## Next steps

- [How to configure KQL Database in copy activity](connector-kql-database-copy-activity.md)
