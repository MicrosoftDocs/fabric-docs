---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time hub
description: Learn how to get data in the Real-Time hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: shsagir
author: shsagir
ms.topic: tutorial
ms.custom:
  - build-2024
  - ignite-2024
ms.date: 11/28/2024
ms.subservice: rti-core
ms.search.form: Get started
# customer intent: I want to learn how to get data in the Real-Time hub in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Set up Eventhouse](tutorial-1-resources.md).

In this part of the tutorial, you browse the Real-Time hub, create an eventstream, transform events, and create a destination to send the transformed events to a KQL database.

## Create an eventstream

1. Select **Real-Time** on the left navigation bar.
1. Select **+ Connect data source** in the top-right corner of the page. 

    :::image type="content" source="media/tutorial/connect-data-source.png" alt-text="Screenshot of Real-time hub with get events highlighted." lightbox="media/tutorial/connect-data-source.png":::

1. On the **Data sources** page, select **Sample scenarios** category, and then select **Connect** on the **Bicycle rentals** tile.
1. On the **Connect** page, for **Source name**, enter **TutorialSource**. 
1. In the **Stream details** section, select the pencil button, and change the name of the eventstream to **TutorialEventstream**, and then select **Next**. 
1. On the **Review + connect** page, review settings, and select **Connect**.

## Transform events - add a timestamp

1. On the **Review + connect** page, select **Open Eventstream**.

    :::image type="content" source="media/tutorial/open-event-stream-button.png" alt-text="Screenshot of Review + connect page with Open Eventstream button selected." lightbox="media/tutorial/open-event-stream-button.png":::         

    You can also browse to the eventstream from the **My data streams** by selecting the stream and then by selecting **Open Eventstream**.

1. From the menu ribbon, select **Edit**. The authoring canvas, which is the center section, turns yellow and becomes active for changes.

    :::image type="content" source="media/tutorial/event-stream-edit-button.png" alt-text="Screenshot with the Edit button selected." lightbox="media/tutorial/event-stream-edit-button.png":::

1. In the eventstream authoring canvas, select the down arrow on the **Transform events or add destination** tile, and then select **Manage fields**. The tile is renamed to `ManageFields`.
1. Hover over the left edge of the **Manage fields** tile. Click and drag the connector to the right side the **TutorialEventstream** tile. You have now connected the eventstream to a new transformation tile.
1. In the **Manage fields** pane, do the following actions:
    1. In **Operation name**, enter **TutorialTransform**. 
    1. Select **Add all fields**

        :::image type="content" source="media/tutorial/add-all-fields.png" alt-text="Screenshot with the Add all fields button selected." lightbox="media/tutorial/add-all-fields.png":::                     

    1. Select **+ Add field**.
    1. From the **Field** dropdown, select **Built-in Date Time Function** > **SYSTEM.Timestamp()**

        :::image type="content" source="media/tutorial/select-built-in-function.png" alt-text="Screenshot with a built-in function selected." lightbox="media/tutorial/select-built-in-function.png":::                     

    1. In **Name**, enter **Timestamp**.
    1. Select **Add**.
    1. Confirm that **Timestamp** is added to the field list, and select **Save**.
        The **TutorialTransform** tile now displays but with an error, because the destination isn't configured yet. 

### Create a destination for the timestamp transformation

1. Hover over the right edge of the **TutorialTransform** tile and select the green plus icon.
1. Select **Destinations** > **Eventhouse**.
    A new tile is created entitled *Eventhouse*.
1. Select the pencil icon on the *Eventhouse* tile.

    :::image type="content" source="media/tutorial/pencil-on-event-house.png" alt-text="Screenshot showing the pencil icon selected on Eventhouse tile." lightbox="media/tutorial/pencil-on-event-house.png":::    

1. Enter the following information in the **Eventhouse** pane:

    | Field                   | Value                                                     |
    | ----------------------- | --------------------------------------------------------- |
    | **Data ingestion mode** | *Event processing before ingestion*                       |
    | **Destination name**    | *TutorialDestination*                                     |
    | **Workspace**           | Select the workspace in which you created your resources. |
    | **Eventhouse**          | *Tutorial*                                                |
    | **KQL Database**        | *Tutorial*                                                |
    | **Destination table**   | *Create new* - enter *RawData* as table name        |
    | **Input data format**   | *Json*                                                    |

1. Ensure that the box **Activate ingestion after adding the data** is checked.
1. Select **Save**.
1. From the menu ribbon, select **Publish**.

    The eventstream is now set up to transform events and send them to a KQL database.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 3: Transform data in a KQL database](tutorial-3-transform-kql-database.md)
