---
title: Connect KQL Database to Power BI Desktop
description: Learn how to connect your KQL database as a data source in Power BI Desktop.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: how-to
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 09/28/2023
---
# Connect KQL Database to Power BI Desktop

In this article, you learn how to connect your KQL database as a data source to Power BI Desktop. Once connected, you can use multiple tables to build your Power BI reports.

To create reports with Power BI service using a KQL queryset, see [Create a Power BI report](create-powerbi-report.md).

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* A [KQL database](create-database.md) with data
* [Power BI Desktop](https://powerbi.microsoft.com/get-started)

## Connectivity modes

Power BI supports *Import* and *DirectQuery* connectivity modes. When building Power BI reports, choose your connectivity mode depending on your scenario, scale, and performance requirements. Using **Import** mode copies your data to Power BI. In contrast, using **DirectQuery** mode queries your data directly from your KQL database.

Use **Import** mode when:

* Your data set is small and you don't need near real-time data.
* You perform [aggregation functions](/azure/data-explorer/kusto/query/aggregation-functions?context=/fabric/context/context).

Use **DirectQuery** mode when:

* Your data set is large or you need near real-time data.

For more information on connectivity modes, see [Import and Direct Query connectivity modes](/power-bi/desktop-directquery-about).

## Connect data source

1. Launch Power BI Desktop.
1. On the **Home** tab, select **OneLake data hub** > **KQL Databases**.

    :::image type="content" source="media/power-bi-data-connector/power-bi-desktop.png" alt-text="Screenshot of Power BI Desktop showing the dropdown menu of the OneLake data hub."  lightbox="media/power-bi-data-connector/power-bi-desktop-extended.png" :::

    A list of KQL Databases that you have access to appears in the **OneLake data hub** window.

1. Select a KQL database to use as a data source in Power BI, and then select **Connect**.

    :::image type="content" source="media/power-bi-data-connector/one-lake-data-hub.png" alt-text="Screenshot of OneLake data hub showing a list of KQL Database available for connection in Power BI Desktop.":::

1. Provide your credentials in the authentication window.

### Load data

1. In the **Navigator** window, select the tables you want to connect, and then select **Load**.

    Optionally, if you want to shape your data first, select **Transform data** to launch the Power Query Editor. For more information, see [Shape data](/power-bi/fundamentals/desktop-getting-started?source=recommendations&branch=main#shape-data).

    :::image type="content" source="media/power-bi-data-connector/navigator-pane.png" alt-text="Screenshot of the navigator pane showing the selected tables for connection.":::

    The **Connection settings** window that appears lists the data connectivity modes. The connectivity mode determines whether Power BI imports the data or connects directly to the data source. For more information, see [Connectivity modes](#connectivity-modes).

1. Select **DirectQuery** to connect directly to the data source, and then select **OK**.

    :::image type="content" source="media/power-bi-data-connector/connection-settings.png" alt-text="Screenshot of the connection settings pane showing the two available connectivity modes. DirectQuery is selected.":::

You successfully connected your KQL database as a data source in Power BI Desktop. You can now visualize your data in a Power BI report.

## Next step

> [!div class="nextstepaction"]
> [Create reports in Power BI](/power-bi/create-reports/)
