---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time hub
description: Learn how to get data in the Real-Time hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.topic: tutorial
ms.date: 10/28/2025
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to get data in the Real-Time hub in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub

This part of the tutorial explains how to browse the Real-Time hub, create an eventstream, transform events, and create a destination to send the transformed events to a KQL database.

> [!NOTE]
> This tutorial is part of a series. For the previous section, see [Tutorial part 1: Set up Eventhouse](tutorial-1-resources.md).

## Create an eventstream

Use the sample gallery to create an eventstream that simulates bicycle rental data.

1. Select **Real-Time** in the left navigation bar.

1. Select **Add data** in the top-right corner of the page.

   :::image type="content" source="media/tutorial/connect-data-source.png" alt-text="Screenshot of the Real-Time hub with Get Events highlighted." lightbox="media/tutorial/connect-data-source.png":::

1. Under **Sample scenarios**, select **Connect** on the **Bicycle rentals** tile.

1. On the **Connect data source** page, for **Source name**, enter **TutorialSource**.

1. In the **Stream details** section, select the pencil button. Change the name of the eventstream to **TutorialEventstream**, and then select **Next**.

1. On the **Review + connect** page, review the settings, and select **Connect**.

   :::image type="content" source="media/tutorial/review-data-source.png" alt-text="Screenshot of the review and connect page.":::

## Transform events: Add a timestamp

Once the eventstream source is created, you can open the eventstream and add more settings.

1. After the eventstream is created, on the **Review + connect** page, select **Open Eventstream**.

    :::image type="content" source="media/tutorial/open-event-stream-button.png" alt-text="Screenshot of Review + connect page with Open Eventstream button selected." lightbox="media/tutorial/open-event-stream-button.png":::

    You can also browse to the eventstream from **My data streams** by selecting the stream and then selecting **Open Eventstream**.

1. On the menu ribbon, select **Edit**. The authoring canvas, which is the center section, turns yellow and becomes active for changes.

    :::image type="content" source="media/tutorial/event-stream-edit-button.png" alt-text="Screenshot with the Edit button selected." lightbox="media/tutorial/event-stream-edit-button.png":::

1. In the eventstream authoring canvas, select the down arrow on the **Transform events or add destination** tile, and then select **Manage fields**. The tile is renamed to `ManageFields`.

    :::image type="content" source="media/tutorial/manage-fields.png" alt-text="Screenshot of authoring canvas with transform events or add destination." lightbox="media/tutorial/manage-fields.png":::

1. Select the pencil icon in the **Manage fields** pane, and follow these steps:
    1. In **Operation name**, enter **TutorialTransform**.
    1. Select **Add all fields**

        :::image type="content" source="media/tutorial/add-all-fields.png" alt-text="Screenshot with the Add all fields button selected." lightbox="media/tutorial/add-all-fields.png":::

    1. Select **+ Add Field**.
    1. From the **Field** dropdown, select **Built-in Date Time Function** > **SYSTEM.Timestamp()**.

        :::image type="content" source="media/tutorial/select-built-in-function.png" alt-text="Screenshot with a built-in function selected." lightbox="media/tutorial/select-built-in-function.png":::

    1. In **Name**, enter **Timestamp**.
    1. Select **Add**.
    1. Confirm that **Timestamp** is added to the field list, and select **Save**.
        The **TutorialTransform** tile shows an error because the destination isn't configured yet.

## Create a destination for the timestamp

Create a destination to send the transformed events to a KQL database.

1. Point to the right edge of the **TutorialTransform** tile and select the green plus icon.

1. Select **Destinations** > **Eventhouse** to create a destination.

1. Select the pencil icon on the **Eventhouse** tile.

    :::image type="content" source="media/tutorial/pencil-on-event-house.png" alt-text="Screenshot showing the pencil icon selected on Eventhouse tile." lightbox="media/tutorial/pencil-on-event-house.png":::

1. In the **Eventhouse** pane, enter the following information:

    | Field                   | Value                                                     |
    | ----------------------- | --------------------------------------------------------- |
    | **Data ingestion mode** | *Event processing before ingestion*                       |
    | **Destination name**    | *TutorialDestination*                                     |
    | **Workspace**           | Select the workspace in which you created your resources. |
    | **Eventhouse**          | *Tutorial*                                                |
    | **KQL Database**        | *Tutorial*                                                |
    | **Destination table**   | *Create new* - enter *RawData* as table name        |
    | **Input data format**   | *Json*                                                    |

1. Verify that the box **Activate ingestion after adding the data** is checked.

1. Select **Save**.

1. On the menu ribbon, select **Publish**.

    The eventstream is now set up to transform events and send them to a KQL database.

## Related content

For more information about tasks in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 3: Set an alert on your event stream](tutorial-3-set-alert.md)
