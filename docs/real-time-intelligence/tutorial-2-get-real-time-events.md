---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time hub
description: Learn how to get data in the Real-Time hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.date: 10/25/2024
ms.search.form: Get started
# customer intent: I want to learn how to get data in the Real-Time hub in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Create resources](tutorial-1-resources.md).

In this part of the tutorial, you browse the Real-Time hub, create an eventstream, transform events, and create a destination to send the transformed events to a KQL database.

## Create an eventstream

1. Select **Real-Time** on the left navigation bar.
1. Select **+ Connect data source** in the top-right corner of the page. 

    :::image type="content" source="media/tutorial/connect-data-source.png" alt-text="Screenshot of Real-time hub with get events highlighted." lightbox="media/tutorial/connect-data-source.png":::
1. On the **Data sources** page, select **Sample scenarios** category, and then select **Connect** on the **Bicycle rentals** tile.

    :::image type="content" source="media/tutorial/select-sample-source.png" alt-text="Screenshot of Data sources page with the Bicycle rentals scenario selected." lightbox="media/tutorial/select-sample-source.png":::    
1. On the **Connect** page, for **Source name**, enter **TutorialSource**. 
1. In the **Stream details** section, select the pencil button, and change the name of the eventstream to **TutorialEventstream**, and then select **Next**. 

    :::image type="content" source="media/tutorial/connect-source.png" alt-text="Screenshot of Connect data source wizard with a source name." lightbox="media/tutorial/connect-source.png":::    
1. On the **Review + connect** page, review settings, and select **Connect**. 

    :::image type="content" source="media/tutorial/review-connect-page.png" alt-text="Screenshot of Review + connect page of the Connect data source wizard." lightbox="media/tutorial/review-connect-page.png":::     
1. After the connection and the eventstream are created successfully, you see the following updated **Review + connect** page.

    :::image type="content" source="media/tutorial/review-connect-success.png" alt-text="Screenshot of Review + connect page after the successful creation of an eventstream." lightbox="media/tutorial/review-connect-success.png":::         

## Transform events

1. On the **Review + connect** page, select **Open Eventstream**.

    :::image type="content" source="media/tutorial/open-event-stream-button.png" alt-text="Screenshot of Review + connect page with Open Eventstream button selected." lightbox="media/tutorial/open-event-stream-button.png":::         
    
    You can also browse to the eventstream from the **My data streams** by selecting the stream and then by selecting **Open Eventstream**.

    :::image type="content" source="media/tutorial/open-event-stream-from-my-data-streams.png" alt-text="Screenshot of My data streams page with the tutorial stream selected." lightbox="media/tutorial/open-event-stream-from-my-data-streams.png":::             
1. From the menu ribbon, select **Edit**. The authoring canvas, which is the center section, turns yellow and becomes active for changes.

    :::image type="content" source="media/tutorial/event-stream-edit-button.png" alt-text="Screenshot with the Edit button selected." lightbox="media/tutorial/event-stream-edit-button.png":::         
1. In the eventstream authoring canvas, select the down arrow on the **Transform events or add destination** tile, and then select **Manage fields**. The tile is renamed to `ManageFields`.
    
    :::image type="content" source="media/tutorial/select-pencil-manage-fields.png" alt-text="Screenshot with the Pencil button selected on the Manage Fields tile." lightbox="media/tutorial/select-pencil-manage-fields.png":::             
1. In the **Manage fields** pane, do the following actions:
    1. In **Operation name**, enter **TutorialTransform**. 
    1. Select **Add all fields**
    
    :::image type="content" source="media/tutorial/add-all-fields.png" alt-text="Screenshot with the Add all fields button selected." lightbox="media/tutorial/add-all-fields.png":::                     
    1. Select **+ Add field**.
    1. From the **Field** dropdown, select **Built-in Date Time Function** > **SYSTEM.Timestamp()**

        :::image type="content" source="media/tutorial/select-built-in-function.png" alt-text="Screenshot with a built-in function selected." lightbox="media/tutorial/select-built-in-function.png":::                     
    1. In **Name**, enter **Timestamp**.
    1. Select **Add**.

    :::image type="content" source="media/tutorial/system-timestamp.png" alt-text="Screenshot showing the system timestamp selected in the eventstream manage fields tile in Real-Time Intelligence.":::
1. Confirm that **Timestamp** is added to the field list, and select **Save**.

    :::image type="content" source="media/tutorial/save-manage-fields-settings.png" alt-text="Screenshot showing the Manage fields window with Save button highlighted.":::    

    The **TutorialTransform** tile now displays but with an error, because the destination isn't configured yet. 

## Create a destination

1. Hover over the right edge of the **TutorialTransform** tile and select the green plus icon.

    :::image type="content" source="media/tutorial/transform-add-button.png" alt-text="Screenshot showing the green plus icon selected.":::    
1. Select **Destinations** > **Eventhouse**.
    
    :::image type="content" source="media/tutorial/event-house-selected.png" alt-text="Screenshot showing the Eventhouse destination selected.":::    

    A new tile is created entitled *Eventhouse*.
1. Select the pencil icon on the *Eventhouse* tile.

    :::image type="content" source="media/tutorial/pencil-on-event-house.png" alt-text="Screenshot showing the pencil icon selected on Eventhouse tile." lightbox="media/tutorial/pencil-on-event-house.png":::    
1. Enter the following information in the **Eventhouse** pane:

    :::image type="content" source="media/tutorial/kql-database-details.png" alt-text="Screenshot showing the Eventhouse destination pane in Real-Time Intelligence.":::

    | Field | Value |
    | --- | --- |
    | **Destination name** | *TutorialDestination* |
    | **Workspace** | Select the workspace in which you created your resources. |
    | **Eventhouse** | *Tutorial* |
    | **KQL Database** | *Tutorial* |
    | **Destination table** | *Create new* - enter *TutorialTable* as table name |
    | **Input data format** | *Json* |  

1. Ensure that the box **Activate ingestion after adding the data** is checked.
1. Select **Save**.
1. From the menu ribbon, select **Publish**.

    :::image type="content" source="media/tutorial/publish-button.png" alt-text="Screenshot showing the Publish button on the ribbon." lightbox="media/tutorial/publish-button.png":::

    The eventstream is now set up to transform events and send them to a KQL database.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)

## Next step

> [!div class="nextstepaction"]
> [Tutorial part 3: Query streaming data in a KQL queryset](tutorial-3-query-data.md)
