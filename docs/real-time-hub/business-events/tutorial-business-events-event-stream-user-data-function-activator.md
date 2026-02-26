---
title: Publish and React to Business Events Using Eventstream and Activator
description: Learn how to publish business events using Fabric Eventstreams, and react to them using User Data Function through Activator.
#customer intent: As a data engineer, I want to create and publish a business event in Microsoft Fabric so that I can automate event-driven workflows.
ms.date: 02/22/2026
ms.topic: tutorial
---

# Publish business events using Fabric Eventstream and react to them using User Data Function (UDF) through Activator

This tutorial walks you through the end-to-end workflow of publishing business events using Fabric Eventstream and reacting to them using user data functions through Activator. The tutorial is structured in the following steps:

1. Create a business event and defining its schema.

1. Configure an eventstream to publish an event when a condition is met.  

1. Validate the published events in Real-Time hub.

1. Implement business logic using a user data function that handles and processes business events.

1. Set an alert on the business event using Fabric Activator and trigger the user defined function when the alert condition is met. 

> [!IMPORTANT]
> This feature is in [preview](../../fundamentals/preview.md).

## Create a new business event

1. Go to **Business events** in Real-Time hub.

1. Select **+ New business event** and then select **Create new schema**.

    :::image type="content" source="./media/tutorial-business-events-event-stream-user-data-function-activator/new-business-event-button.png" alt-text="Screenshot that shows the Business events page with + New Business event selected." lightbox="./media/tutorial-business-events-event-stream-user-data-function-activator/new-business-event-button.png":::

1. Define the business event schema. 
    
    1. For **Name**, enter `StationFullDetected`.
    
    1. In the right pane, for **Event schema set**, select **Create**. 
   
    1.  Enter `BikeShareOperations` for the schema set name.

        :::image type="content" source="./media/tutorial-business-events-event-stream-user-data-function-activator/schema-set-name.png" alt-text="Screenshot that shows the name of the event schema set." lightbox="./media/tutorial-business-events-event-stream-user-data-function-activator/schema-set-name.png":::    
    
    1. Select **Add row** in the middle plane. 
    
        :::image type="content" source="./media/tutorial-business-events-event-stream-user-data-function-activator/add-row-button.png" alt-text="Screenshot that shows the selection of the Add row button." lightbox="./media/tutorial-business-events-event-stream-user-data-function-activator/add-row-button.png":::    

    1. Select **string** for **event type**, and enter `BikepointID` for the **name**. 

        :::image type="content" source="./media/tutorial-business-events-event-stream-user-data-function-activator/event-property-configuration.png" alt-text="Screenshot that shows the configuration of the business event property." lightbox="./media/tutorial-business-events-event-stream-user-data-function-activator/event-property-configuration.png":::
    1. Repeat the previous step to add the following properties: `Street` (string), `Neighbourhood` (string).

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/define-business-event-schema.png" alt-text="Screenshot of the business event schema properties configuration." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/define-business-event-schema.png":::

    1. Select **Next** to continue.

1. Review and confirm the configuration, and then select **Create** to create your business event.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/review-business-event-configuration.png" alt-text="Screenshot of the review and confirm page for creating a business event." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/review-business-event-configuration.png":::

1. Confirm that you see the business event in the list of business events in Real-Time hub.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/business-event-list.png" alt-text="Screenshot of the list of business events in Real-Time hub." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/business-event-list.png":::

## Configure eventstream for publishing

1. After creating the business event, go to your workspace.

1. Select **+ New item** and then select **Eventstream** in the **Get data** section.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/new-event-stream-tile.png" alt-text="Screenshot of the new eventstream tile." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/new-event-stream-tile.png":::

1. In the **New Eventstream** dialog, enter a name for the eventstream (for example, `BikeShareStationEventStream`), and then select **Create**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/event-stream-name.png" alt-text="Screenshot of the new eventstream dialog." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/event-stream-name.png":::

1. In the Eventstream editor, select the **Use sample data** tile. 

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/use-sample-data-tile.png" alt-text="Screenshot that shows the use sample data option." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/use-sample-data-tile.png":::

1. In the **Add source** dialog, follow these steps:

    1. For **Source name**, enter **Bicycles**.
    
    1. For **Sample data**, select **Bicycles**.

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/select-bicycle-sample-source.png" alt-text="Screenshot that shows the Add source dialog with Bicycles sample source selected." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/select-bicycle-sample-source.png":::    

1.  Add a filter to the eventstream. In this tutorial, you use `No_Empty_Docks == 0` to convert high-volume telemetry into a meaningful business condition so that only actionable situations are published as business events. Follow these steps to define the filter:
    1. Select **down arrow** on the **Transform events or add destination** card, and then select **Filter**.

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/select-filter-transformation.png" alt-text="Screenshot that shows how to add a filter to the eventstream." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/select-filter-transformation.png":::

    1. Select the **Action** link on the Filter card. 
    
    1. In the **Filter** window, for **Operation name**, enter **Filter**.
    
    1. For **Select a field to filter on**, select `No_Empty_Docks` from the dropdown list.
    
    1. For **Keep events when the value**, select **equals**.
   
    1. Enter `0` for the value.
    
    1. Select **Save** to add the filter to the eventstream.

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/filter-configuration.png" alt-text="Screenshot that shows the configuration of the filter transformation." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/filter-configuration.png":::

        > [!NOTE]
        > `No_Empty_Docks` represents the remaining capacity at a station. When its value is 0, the station is full, this is the point that matters from a business perspective. By applying this filter, analysts can identify supply imbalances, specifically stations where users can't return bikes because no empty docks are available. 

1. On the **Filter** card, select **Action** (or) hover the mouse over the card, and select the **+** button.

1. In the list of destinations, select **Business events**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/add-business-event-destination.png" alt-text="Screenshot that shows how to add a business event destination to the eventstream." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/add-business-event-destination.png":::

1. On the **Business events** card, select the **Edit** (pencil icon). 

1. In the **Business events** window, enter **StationFullDetected** for **Destination name**. 

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/business-event-name.png" alt-text="Screenshot that shows the Business events window with the destination name entered." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/business-event-name.png":::

1. For **Business event type**, choose **Select**.

1. In the **Select a business event** dialog, select the business event you created in the previous section (for example, `StationFullDetected`), and then select **Choose**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/select-business-event.png" alt-text="Screenshot that shows the Select a business event dialog with a business event selected." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/select-business-event.png":::

    > [!NOTE]
    > You can also use the **Create new** option to create a business event here instead of creating it in Real-Time hub ahead of the time. 

1. In the **Business events** window, select **Save** to save the business event destination configuration.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/save-business-event.png" alt-text="Screenshot that shows the Business events window with the Save button selected." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/save-business-event.png":::

1. On the **StationFullDetected** card, select **Add** next to **Add a mapper to map schema**. 

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/add-mapper-link.png" alt-text="Screenshot that shows the Business event card with the Add link highlighted." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/add-mapper-link.png":::
    
1. In the **Map schema** window, review mappings, and select **Finish**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/map-schema.png" alt-text="Screenshot that shows the Map schema window with the schema mapped." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/map-schema.png":::

1. Select **Publish** to publish the eventstream.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/publish-event-stream.png" alt-text="Screenshot that shows the Publish button for the eventstream." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/publish-event-stream.png":::

## Verify published business events

1. Go to **Business events** in Real-Time hub.

1. Select the created business event (for example, `StationFullDetected`).

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/select-business-event-real-time-hub.png" alt-text="Screenshot of the Business events page in Real-Time hub with the event selected." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/select-business-event-real-time-hub.png":::

1. In the **Publisher** tab, confirm that you see events are following in from the bicycle sample source.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/verify-published-event.png" alt-text="Screenshot of the StationFullDetected event page with a sample event and the publisher information." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/verify-published-event.png":::    

1. Confirm that you see the eventstream (`BikeShareStationEventStream`) you created listed as a **publisher**.

1. Switch to the **Data preview** tab.

1. In the **Publishers** section, select the name of the **eventstream**.

1. Visualize the event data in the preview table.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/data-preview-tab.png" alt-text="Screenshot of the Data preview tab with the event data shown in the table." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/data-preview-tab.png":::

## Configure custom business logic with a user data function

1. Open another tab in your web browser, and go to your workspace.

1. 1. Select **+ New item** and then search for **User data functions** and select it.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/create-user-data-function.png" alt-text="Screenshot of creating a new user data function in the workspace." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/create-user-data-function.png":::

1. Enter `ProcessStationFull` as the name for the user data function, and then select **Create**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/create-new-function-dialog.png" alt-text="Screenshot of the new function creation dialog." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/create-new-function-dialog.png":::

1. Select **New function** to create a new function in the user data function item.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/create-new-function.png" alt-text="Screenshot of the Create a new sample function window with New function selected." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/create-new-function.png":::    

1. Modify the logic of your new function and add the input parameters required to receive your business event.

    ```python
    import datetime 
    import fabric.functions as fn 
    import logging 
    import json 
    
    udf = fn.UserDataFunctions() 
    
    @udf.function() 
    def processStationFull( 
        bikepointID: str, 
        street: str, 
        neighbourhood: str 
    ) -> str: 
    
        logging.info("processStationFull invoked.") 
        event_data = { 
            "bikepointID": bikepointID, 
            "street": street, 
            "neighbourhood": neighbourhood, 
        } 
    
        # Log as structured JSON for easy searching/filtering in logs 
        logging.info("processStationFull payload=%s", json.dumps(event_data)) 
    
        return ( 
            f"Processed processStationFull for bikepointID={bikepointID} " 
            f"on street={street} at {datetime.datetime.now()}." 
        )   
    ```

1. Test your function.

    1. In the Functions explorer, hover over the function you created, select the ⋯ (three dots) menu, and then select **Test**.

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/test-user-data-function-menu.png" alt-text="Screenshot of the Functions explorer with Test menu selected." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/test-user-data-function-menu.png":::

    1. In the Test window, enter these sample values, and select **Test**. 
    
        - bikepointID: 1234
        - street: Main Street
        - neighborhood: Downtown   
    
    1.  Verify the output and the logs to confirm that the function is working as expected.
    
        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/test-user-data-function-output.png" alt-text="Screenshot of the Functions explorer with Test window showing the output." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/test-user-data-function-output.png":::

1. Select **Publish** on the toolbar to publish the function and make it available for use in the Activator rule.

     :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/publish-user-data-function-button.png" alt-text="Screenshot of the Publish button for the user data function." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/publish-user-data-function-button.png":::

## Create an Activator trigger to consume events

1. Open another tab in your web browser, and go to the Fabric portal home page.
 
1. Select the Real-Time hub icon in the left navigation pane of the Fabric portal.

1. In the Real-Time hub, select **Business events** under the **Subscribe to** category.

1. In the **Business events** list, locate `VibrationCriticalDetected` event. Select either the ⚡ lightning icon or the ⋯ (three dots) menu next to the event, and then select **Set alert**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/set-alert-business-event.png" alt-text="Screenshot of selecting the Set alert option for a business event." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/set-alert-business-event.png":::

1. On the **Add rule** page, in the **Details** section, for **Rule name**, enter a name for the rule. For example, **StationFullDetected_Rule**. 

1. In the **Condition** section, for **Check**, select **On each event**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/rule-name-condition.png" alt-text="Screenshot of selecting the Add rule window with the rule name and condition." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/rule-name-condition.png":::

1. In the **Action** section, select one of the following actions. To configure the alert to trigger a function when the condition is met, follow these steps:

    1. For **Select action**, select **Run Function**.
    
        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/run-function-preview-button.png" alt-text="Screenshot of selecting Run Function as the action." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/run-function-preview-button.png":::

    1. Select the Fabric item you want to run, and then select **Add** to continue (for example, the `ProcessStationFull` user data function).

         :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/select-fabric-item-to-run.png" alt-text="Screenshot of selecting the Fabric item to run." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/select-fabric-item-to-run.png":::

    1. Select the function you want to use to process the action (for example, the `processStationFull` function).

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/select-function-process-action.png" alt-text="Screenshot of selecting the function to process the action." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/select-function-process-action.png":::

    1. Map each input parameter defined in the function with the business event property you previously defined. Type `@` and select the business event property from the dropdown list to map it to the function parameter.

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/map-input-parameters-business-event.png" alt-text="Screenshot of mapping input parameters to business event properties." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/map-input-parameters-business-event.png":::

        Repeat this process for each input parameter defined in the function.

        :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/map-all-input-parameters-business-event.png" alt-text="Screenshot of all input parameters mapped to business event properties." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/map-all-input-parameters-business-event.png":::

1. In the **Save location** section, for **Workspace**, select the workspace where you want to create the Fabric activator item.

1.  For **Item**, select the drop-down list, and then select **Create a new item**. 

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/create-new-activator-item.png" alt-text="Screenshot of selecting the Create a new item option." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/create-new-activator-item.png":::

1. In the dialog box, enter a name for the new Fabric activator item (for example, **StationFullDetected_Activator**), and then select **Create**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/create-rule-button.png" alt-text="Screenshot of the specifying a name for the activator item." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/create-rule-button.png":::

1. You see the **Alert created** page with a link to open the rule in the Fabric activator user interface in a separate tab.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/alert-created-page.png" alt-text="Screenshot of the Alert created page." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/alert-created-page.png":::

1. Select **Open** to open the rule in the Fabric Activator user interface.

## Test the solution 


### View business event in the Real-Time hub

#### Publishers tab

1. In the Real-Time hub, select **Business events** in the left menu.

1. Select **StationFullDetected** from the list of business events.

1. In the **Publisher** tab, confirm that you see the published events. It might take a few seconds for new events to appear in the list.
 
1. In the list of publishers, confirm that the eventstream you used to publish the event is listed as a publisher.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/publishers-tab.png" alt-text="Screenshot of the Publishers tab of the business event page." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/publishers-tab.png":::

#### Consumers tab

1. Switch to the **Consumers** tab. 

1. Confirm that you see an event was delivered within the last hour.

1. Confirm that the activator you created is listed as a consumer.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/consumers-tab.png" alt-text="Screenshot of the Consumers tab of the business event page." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/consumers-tab.png":::

#### Data preview tab

1. Switch to the **Data preview** tab.

1. Confirm that you see the consumer filter with the activator you created.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/data-preview-tab-consumer.png" alt-text="Screenshot of the consumer filter in the Data preview tab." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/data-preview-tab-consumer.png":::
 
### View business event in the activator run history

1. Go to the workspace where you created the activator item, and open the activator item (for example, **VibrationCriticalDetected_Activator**) if it's not already open.

1. In the activator item, select the **History** tab.

1. Confirm that you see one activation.  

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/activator-rule-history.png" alt-text="Screenshot of the history tab for the Activator rule." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/activator-rule-history.png":::

### View logs for the user data function

1. In the workspace, open the `ProcessVibrationCritical` user data function you created.

1. Switch to **Run only** mode using the mode switcher.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/user-data-function-run-only-mode.png" alt-text="Screenshot that shows how to switch a user data function to run only mode." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/user-data-function-run-only-mode.png":::    

1. Hover over the function name in the functions list, select the ellipses icon (**...**), and then select **View historical log**.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/view-historical-log-menu.png" alt-text="Screenshot that shows the View historical log option." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/view-historical-log-menu.png"::: 

1. You see table with the historical runs of the function. Select the most recent run to view the logs for that run.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/function-run-history.png" alt-text="Screenshot of the historical runs for the user data function." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/function-run-history.png":::

1. Confirm that the logs show the event payload in the JSON format as you defined in the function logic, which indicates that the function was triggered by the business event and processed the event data correctly.

    :::image type="content" source="media/tutorial-business-events-event-stream-user-data-function-activator/function-run-logs.png" alt-text="Screenshot of the logs for a specific run of the user data function." lightbox="media/tutorial-business-events-event-stream-user-data-function-activator/function-run-logs.png":::