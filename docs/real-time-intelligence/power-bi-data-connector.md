---
title: Connect a KQL database to Power BI Desktop
description: Learn how to connect a KQL database as a data source in Power BI Desktop.
ms.reviewer: tzgitlin
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 06/09/2026
ai-usage: ai-assisted
---
# Connect a KQL database to Power BI Desktop

In this article, you learn how to connect a KQL database as a data source in Power BI Desktop. After you connect, you can use multiple tables to build Power BI reports.

To create reports in the Power BI service by using a KQL queryset, see [Create a Power BI report](create-powerbi-report.md).

## Prerequisites

* A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
* A [KQL database](create-database.md) with data.
* [Power BI Desktop](/power-bi/fundamentals/desktop-get-the-desktop).

## Connectivity modes

Power BI supports *Import* and *DirectQuery* connectivity modes. When you build Power BI reports, choose the mode that fits your scenario, scale, and performance requirements. **Import** mode copies your data to Power BI. **DirectQuery** mode queries your data directly from your KQL database.

Use **Import** mode when:

* Your data set is small and you don't need near real-time data.
* You perform [aggregation functions](/kusto/query/aggregation-functions?view=microsoft-fabric&preserve-view=true).

Use **DirectQuery** mode when:

* Your data set is large or you need near real-time data.

For more information on connectivity modes, see [DirectQuery in Power BI](/power-bi/connect-data/desktop-directquery-about).

## Connect to the data source

1. Launch Power BI Desktop.
1. On the **Home** tab, select **OneLake catalog** > **KQL Databases**.

    :::image type="content" source="media/power-bi-data-connector/power-bi-desktop.png" alt-text="Screenshot of Power BI Desktop showing the dropdown menu of the OneLake catalog."  lightbox="media/power-bi-data-connector/power-bi-desktop-extended.png" :::

    The **OneLake catalog** window displays a list of KQL databases that you can access.

1. Select a KQL database to use as a data source in Power BI, and then select **Connect**.

    :::image type="content" source="media/power-bi-data-connector/one-lake-data-hub.png" alt-text="Screenshot of OneLake catalog showing a list of KQL databases that are available to connect in Power BI Desktop.":::

1. Enter your credentials in the authentication window.

### Load data

1. In the **Navigator** window, select the tables you want to connect, and then select **Load**.

    If you want to shape your data first, select **Transform data** to open the Power Query Editor. For more information, see [Transform and clean your data](/power-bi/fundamentals/desktop-getting-started#transform-and-clean-your-data).

    :::image type="content" source="media/power-bi-data-connector/navigator-pane.png" alt-text="Screenshot of the navigator pane showing the selected tables for connection.":::

    The **Connection settings** window lists the available connectivity modes. The mode determines whether Power BI imports the data or connects directly to the data source. For more information, see [Connectivity modes](#connectivity-modes).

1. Select **DirectQuery** to connect directly to the data source, and then select **OK**.

    :::image type="content" source="media/power-bi-data-connector/connection-settings.png" alt-text="Screenshot of the connection settings pane showing the two available connectivity modes. DirectQuery is selected.":::

You connected your KQL database as a data source in Power BI Desktop. You can now visualize your data in a Power BI report.

## Next steps

> [!div class="nextstepaction"]
> [Create reports in Power BI](/power-bi/create-reports/)
