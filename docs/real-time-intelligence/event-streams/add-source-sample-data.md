---
title: Add a Sample Data Source to an Eventstream
description: Learn how to add a sample data source to an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom:
ms.date: 3/12/2025
ms.search.form: Source and Destination
zone_pivot_group_filename: real-time-intelligence/event-streams/zone-pivot-groups.json
zone_pivot_groups: event-streams-standard-enhanced
---

# Add a sample data source to an eventstream

To get a better understanding of how an eventstream works, you can use sample data and send the data to the eventstream. This article shows you how to add the sample data source to an eventstream.

[!INCLUDE [select-view](./includes/select-view.md)]

::: zone pivot="enhanced-capabilities"  

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or trial license mode with Contributor or higher permissions.
- An eventstream. If you don't have an eventstream, [create one](create-manage-an-eventstream.md).

## Add sample data as a source

1. On the get-started page, select **Use sample data**.

   :::image type="content" border="true" source="media\add-source-sample-data-enhanced\select-sample-data.png" alt-text="Screenshot of the tile for using sample data.":::

   Or, if you already have a published eventstream and want to add sample data as a source, switch to **Edit** mode. On the ribbon, select **Add source** > **Sample data**.

   :::image type="content" border="true" source="media\add-source-sample-data-enhanced\add-sample-data.png" alt-text="Screenshot of selections for adding sample data to an eventstream.":::

1. On the **Sample data** pane, enter a **Source name** value. In the **Sample data** box, select the source data that you want, and then select **Add**. You have these options for sample data:

   - **Bicycles**: Sample data for bicycles with a preset schema that includes fields such as **BikepointID**, **Street**, **Neighborhood**, and **Latitude**.
   - **Yellow Taxi**: Sample taxi data with a preset schema that includes fields such as pickup time, drop-off time, distance, and total fee.
   - **Stock Market**: Sample data for a stock exchange with preset schema columns such as time, symbol, price, and volume.
   - **Buses**: Sample data for buses with a preset schema that includes fields such as **Timestamp**, **TripId**, **StationNumber**, **SchedulTime**, and **Properties**.
   - **S&P 500 companies stocks**: Sample data for S&P 500 companies' historical stock prices with a preset schema that includes fields such as **Date**, **Open**, **High**, **Low**, **Close**, **Adjusted Close**, **Volume**, and **Ticker**.
   - **Semantic Model Logs**: Sample data for semantic model operation logs with a preset schema that includes fields such as **Timestamp**, **OperationName**, **ItemId**, **ItemKind**, **ItemName**, **WorkspaceId**, **WorkspaceName**, and **CapacityId**.

   :::image type="content" border="true" source="media\add-source-sample-data-enhanced\sample-sources.png" alt-text="Screenshot that shows the choices on the pane for sample data.":::

1. After you create the sample data source, confirm that it's added to your eventstream on the canvas in **Edit** mode. To implement this newly added sample data, select **Publish**.

    :::image type="content" source="media\add-source-sample-data-enhanced\edit-mode.png" alt-text="Screenshot that shows an eventstream in Edit mode, with the Publish button highlighted.":::

1. After publishing succeeds, the sample data is available for visualization in **Live** view.

    :::image type="content" source="media\add-source-sample-data-enhanced\live-view.png" alt-text="Screenshot that shows an eventstream in Live view." lightbox="media\add-source-sample-data-enhanced\live-view.png":::

## Related content

- For a list of supported sources, see [Add and manage an event source in an eventstream](add-manage-eventstream-sources.md).

::: zone-end

::: zone pivot="standard-capabilities"

## Prerequisites

- Access to a workspace in the Fabric capacity license mode or the trial license mode with Contributor or higher permissions.

## Add sample data as a source

1. Select **New source** on the ribbon or the plus sign (**+**) in the main editor canvas, and then select **Sample data**.

1. On the right pane, enter a source name to appear on the canvas. Select one of the following types of sample data that you want to add to your eventstream, and then select **Add**:

   - **Bicycles**: Sample data for bicycles with a preset schema that includes fields such as **BikepointID**, **Street**, **Neighborhood**, and **Latitude**.
   - **Yellow Taxi**: Sample taxi data with a preset schema that includes fields such as pickup time, drop-off time, distance, and total fee.
   - **Stock Market**: Sample data for a stock exchange with a preset schema column such as time, symbol, price, or volume.

       :::image type="content" source="./media/event-streams-source/eventstream-sources-sample-data.png" alt-text="Screenshot that shows configuration of a sample data source." lightbox="./media/event-streams-source/eventstream-sources-sample-data.png":::

1. When the sample data source is added successfully, you can find it on the canvas and the left pane.

   To verify that the sample data is added successfully, select **Data preview** on the bottom pane.

   :::image type="content" source="./media/add-manage-eventstream-sources/sample-data-source-completed.png" alt-text="Screenshot that shows a sample data source." lightbox="./media/add-manage-eventstream-sources/sample-data-source-completed.png":::

## Related content

To learn how to add other sources to an eventstream, see the following articles:

- [Azure Event Hubs](add-source-azure-event-hubs.md)
- [Azure IoT Hub](add-source-azure-iot-hub.md)
- [Custom endpoint](add-source-custom-app.md)

::: zone-end
