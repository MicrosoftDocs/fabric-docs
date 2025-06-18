---
title: Real-Time Intelligence tutorial part 2- Get data in the Real-Time hub
description: Learn how to get data in the Real-Time hub in Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: tutorial
ms.custom:
ms.date: 11/28/2024
ms.subservice: rti-core
ms.search.form: Get started
# customer intent: I want to learn how to get data in the Real-Time hub in Real-Time Intelligence.
---
# Real-Time Intelligence tutorial part 2: Get data in the Real-Time hub

> [!NOTE]
> This tutorial is part of a series. For the previous section, see:  [Tutorial part 1: Set up Eventhouse](tutorial-1-resources.md).

In this part of the tutorial, you browse the Real-Time hub, create an eventstream, transform events, and create a destination to send the transformed events to a KQL database. You then subscribe to Fabric Events, so that you will receive an alert each time a new item is created in your workspace.

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

## Subscribe to Fabric Events

To subscribe to any changes in your workspace, you can use Fabric events. In this section, you set alerts on Fabric Events so that you receive an email each time a new item is created, deleted, or updated in your workspace. In different scenarios, the Activator could also be used to trigger a Fabric item, such as a pipeline or a notebook.

1. Browse to the Real-Time hub on the left navigation bar.
1. In the left pane, select **Subscribe to** > **Fabric Events**.
1. Hover over **Workspace item events** and select the alert icon.

    :::image type="content" source="media/tutorial/fabric-events.png" alt-text="Screenshot of workspace item events in the Fabric events section of the Real-Time hub." lightbox="media/tutorial/fabric-events.png":::

### Configure the events for the alert

1. In the **Set alert** pane that opens, under **Monitor** > **Source**, select **Select events**.
    The default selection is six types of events that include success and failure of item creation, deletion, and update.

1. Under **Workspace**, select the workspace in which you created your resources.
1. Select **Next**.

    :::image type="content" source="media/tutorial/event-types.png" alt-text="Screenshot of workspace event configuration settings." lightbox="media/tutorial/event-types.png":::

1. Select **Save**.

### Configure the alert

1. Under **Save location** > **Workspace**, select the workspace in which you created your resources.
1. Select **Item** > **Create a new item**.
1. **Enter a name** for the item, such as **WorkspaceItemChange**.
1. Select **Create**.
    It may take a few moments for the item to be created.
1. Once the item is created, select **Open**.

A new tab opens in your browser with the Activator item you have just created. You can use this view to see the history of alerts, and to configure the alert further. 

> [!NOTE]
> If you are using a demo tenant and do not have access to the connected email, you may want to add a different email recipient to the alert. Do this by adding a new email address in the **To** field, and then selecting **Save and update**.

### Customize the message

In this section, you can (optionally) customize the email message that is received to include information about the condition which set off the alert.

1. In the **Definition** pane, under **Action** select **Edit action**.
1. In the **Edit the action** window, click on the field next to **Context**.
1. Select the checkboxes next to the following fields:

    * itemName
    * itemKind
    * __type

1. Select **Apply**.

    :::image type="content" source="media/tutorial/alert-changes.png" alt-text="Screenshot of customizing Activator Alert." lightbox="media/tutorial/alert-changes.png":::

1. Select **Save and update**.

## Related content

For more information about tasks performed in this tutorial, see:

* [Create and manage an eventstream](event-streams/create-manage-an-eventstream.md)
* [Add a sample data as a source](event-streams/add-source-sample-data.md#add-sample-data-as-a-source)
* [Add a KQL database as a destination](event-streams/add-destination-kql-database.md)
* [Set alerts on Fabric workspace item events in Real-Time hub](../real-time-hub/set-alerts-fabric-workspace-item-events.md)

## Next step

> [!div class="nextstepaction"]
> [Real-Time Intelligence tutorial part 3: Transform data in a KQL database](tutorial-3-transform-kql-database.md)
