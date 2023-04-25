---
title: Connect to an Azure SQL database connector in dataflows
description: This article details how to connect to an Azure SQL database in dataflows for Data Factory in Microsoft Fabric.
author: DougKlopfenstein
ms.author: dougklo
ms.topic: how-to
ms.date: 05/23/2023
ms.custom: template-how-to 
---

# Connect to an Azure SQL database in dataflows

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

You can connect to Azure SQL databases in Dataflow Gen2 using the Azure SQL database connector provided by Data Factory in [!INCLUDE [product-name](../includes/product-name.md)].

## Connect to an Azure SQL database

To connect to an Azure SQL database from a dataflow:

1. From your workspace, select **New** > **Dataflow Gen2 (Preview)** to create a new dataflow.

   :::image type="content" source="./media/connector-azure-sql-database/select-open-dataflow.png" alt-text="Screenshot showing the workspace where you choose to create a new dataflow." lightbox="./media/connector-azure-sql-database/select-open-dataflow.png":::

1. In Power Query, either select **Get data** in the ribbon or select **Get data from another source** in the current view.

   :::image type="content" source="./media/connector-azure-sql-database/get-data.png" alt-text="Screenshot showing the Power Query workspace with the Get data option emphasized.":::

1. From **Choose data source**, select the **Azure** category, and then select **Azure SQL database**.

   :::image type="content" source="./media/connector-azure-sql-database/select-azure-sql-database.png" alt-text="Screenshot showing Choose data source with the Azure category and the Azure SQL database connector emphasized.":::

1. In **Connect to data source**, under **Connection settings**, provide the name of the server and database.

   You can also select and enter advanced options that modify the connection query, such as a command timeout or a native query (SQL statement). More information: [Connect using advanced options](/power-query/connectors/azure-sql-database#connect-using-advanced-options)

1. If necessary, select the name of your on-premises data gateway.

1. If you're connecting to this database for the first time, select the authentication type to use in **Authentication kind**, and then enter your credentials. More information: [Connections and authentication in Power Query Online](/power-query/connection-authentication-pqo)

   :::image type="content" source="./media/connector-azure-sql-database/connect-data-source.png" alt-text="Screenshot showing Connect data source where you enter your server name and your credentials." lightbox="./media/connector-azure-sql-database/connect-data-source.png":::

1. Select **Next**.

1. In **Choose data**, select the data item that you want to transform, and then select **Create**.

   :::image type="content" source="./media/connector-azure-sql-database/choose-data.png" alt-text="Screenshot showing the Power Query Choose data window with one item selected and the item's data displayed in the right pane." lightbox="./media/connector-azure-sql-database/choose-data.png":::

## Advanced connector information

For more advanced information about connecting to your data using the Azure SQL server connector, go to [Azure SQL database](/power-query/connectors/azure-sql-database).

## Next steps

- [How to create an Azure SQL database connection](connector-azure-sql-database.md)
- [How to configure Azure SQL database in a copy activity](connector-azure-sql-database-copy-activity.md)
