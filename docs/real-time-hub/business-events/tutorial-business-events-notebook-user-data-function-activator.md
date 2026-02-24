---
title: Publish and React to Business Events Using Notebook and Activator
description: Learn how to publish business events using notebooks, and react to them using User Data Function through Activator.
#customer intent: As a data engineer, I want to create and publish a business event in Microsoft Fabric so that I can automate event-driven workflows.
ms.date: 02/22/2026
ms.topic: tutorial
---

# Publish business events using Spark Notebook and react to them using User Data Function (UDF) through Activator

This tutorial guides you through the full workflow of reacting to your own business events in Microsoft Fabric. The steps you follow are:

1. Create a business event and defining its schema
1. Configure a notebook to publish an event using Python.
1. Validate the published events in Real-Time hub.
1. Create an Activator rule that triggers a user data function when the business event occurs. 

By the end, you have an end-to-end setup that detects important business conditions and responds to them instantly.

## Create a new business event

1. Go to **Business events** in Real-Time hub.

1. Select **+ New business event** and then select **Create new schema**.

    :::image type="content" source="./media/tutorial-business-events-notebook-user-data-function-activator/new-business-event-button.png" alt-text="Screenshot that shows the Business events page with + New Business event selected." lightbox="./media/tutorial-business-events-notebook-user-data-function-activator/new-business-event-button.png":::

1. Define the business event schema. 
    
    1. For **Name**, enter `VibrationCriticalDetected`.
    
    1. In the right pane, for **Event schema set**, select **Create**. 

        :::image type="content" source="./media/tutorial-business-events-notebook-user-data-function-activator/event-schema-set-name.png" alt-text="Screenshot that shows the Define business event page." lightbox="./media/tutorial-business-events-notebook-user-data-function-activator/event-schema-set-name.png":::
    
    1.  Enter `ManufacturingEquipmentHealth` for the schema set name.

        :::image type="content" source="./media/tutorial-business-events-notebook-user-data-function-activator/schema-set-name.png" alt-text="Screenshot that shows the name of the event schema set." lightbox="./media/tutorial-business-events-notebook-user-data-function-activator/schema-set-name.png":::    
    
    1. Select **Add row** in the middle plane. 
    
        :::image type="content" source="./media/tutorial-business-events-notebook-user-data-function-activator/add-row-button.png" alt-text="Screenshot that shows the selection of the Add row button." lightbox="./media/tutorial-business-events-notebook-user-data-function-activator/add-row-button.png":::    

    1. Select **string** for **event type**, and enter `MachineID` for the **name**. 

        :::image type="content" source="./media/tutorial-business-events-notebook-user-data-function-activator/event-property-configuration.png" alt-text="Screenshot that shows the configuration of the business event property." lightbox="./media/tutorial-business-events-notebook-user-data-function-activator/event-property-configuration.png":::
    1. Repeat the above step to add the following properties: `ProductionLineID` (string), `MeasuredVibration` (string), `ImpactAssessment` (string), `RecommendationAction` (string).

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/define-business-event-schema.png" alt-text="Screenshot of the business event schema properties configuration." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/define-business-event-schema.png":::

    1. Select **Next** to continue.

1. Review and confirm the configuration, and then select **Create** to create your business event.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/review-business-event-configuration.png" alt-text="Screenshot of the review and confirm page for creating a business event." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/review-business-event-configuration.png":::

## Configure notebook for publishing

1. After creating the business event, go to your workspace.

1. Select **+ New item** and then select **Notebook** in the **Analyze and train data** section.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/new-notebook-button.png" alt-text="Screenshot of the new notebook button." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/new-notebook-button.png":::

1. Enter a name for your notebook (for example: **BusinessEventTutorialOneNotebook**), confirm the location (workspace), and then select **Create** to create the notebook.

1. Make sure you select either A) Python 3.11 or B) PySpark (Python).

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/python-runtime-selection.png" alt-text="Screenshot of the Python 3.11 runtime selection in the notebook." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/python-runtime-selection.png":::

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/pyspark-python-runtime-selection.png" alt-text="Screenshot of the PySpark Python runtime selection in the notebook." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/pyspark-python-runtime-selection.png":::

1. Find the sample code to publish a business event using the following command: `notebookutils.businessEvents.help()`. You should see output similar to the following one:

    ```python
    Help on module notebookutils.businessEvents in notebookutils:
    
    NAME
        notebookutils.businessEvents - [Preview] Utility for Business Events operations in Fabric
    
    FUNCTIONS
        help(methodName: str = '') -> None
            [Preview] Provides help for the notebookutils.businessEvents module or the specified method.
            
            Examples:
            notebookutils.businessEvents.help()
            notebookutils.businessEvents.help("publish")
            :param methodName: The name of the method to get help with.
        
        publish(eventSchemaSetWorkspace: str, eventSchemaSet: str, eventTypeName: str, eventData: Union[Dict[str, Any], List[Dict[str, Any]]], dataVersion: str = 'v1') -> bool
            [Preview] Publish business events data to the specified event type.
            
            Examples:
            notebookutils.businessEvents.publish(
                eventSchemaSetWorkspace="my-workspace-id",
                eventSchemaSet="OrderEvents",
                eventTypeName="OrderDelayed",
                eventData={"orderId": "12345", "status": "delayed", "reason": "weather"},
                dataVersion="v1"
            )
            
            # Batch publish multiple events
            notebookutils.businessEvents.publish(
                eventSchemaSetWorkspace="my-workspace-id",
                eventSchemaSet="OrderEvents",
                eventTypeName="OrderDelayed",
                eventData=[
                    {"orderId": "12345", "status": "delayed", "reason": "weather"},
                    {"orderId": "12346", "status": "delayed", "reason": "traffic"}
                ],
                dataVersion="v1"
            )
            
            :param eventSchemaSetWorkspace: The workspace ID or name where the event schema set is located
            :param eventSchemaSet: The ID or name of the event schema set
            :param eventTypeName: The name of the business events type to publish to
            :param eventData: The event data payload as a dictionary or list of dictionaries for batch publishing
            :param dataVersion: The version of the event type schema (default: "v1")
            :return: True if the event was published successfully
            :raises: Exception if the event could not be published
    
    DATA
        __all__ = ['help', 'publish']
    
    FILE
        /home/trusted-service-user/jupyter-env/python3.11/lib/python3.11/site-packages/notebookutils/businessEvents.py
    
    ```

1. Add a new cell, enter the following code, and run it to publish a business event.

    > [!NOTE]
    > Make sure to replace the `eventSchemaSetWorkspace`, `eventSchemaSet`, and `eventTypeName` values with the ones you used when creating your business event. The `eventData` properties should also match the schema you defined for your business event.

    ```python
   
    notebookutils.businessEvents.publish(
        eventSchemaSetWorkspace="My workspace",
        eventSchemaSet="ManufacturingEquipmentHealth",
        eventTypeName="VibrationCriticalDetected",
        eventData={
            "MachineID": "12345",
            "ProductionLineID": "WestLine01",
            "MeasuredVibration": "1.52",
            "ImpactAssessment": "Production slowdown risk",
            "RecommendationAction": "Schedule maintenance"
        },
        dataVersion="v1"
    )
    ```

    > [!NOTE]
    > The properties `eventSchemaSetWorkspace` and `eventSchemaSetName` support both Fabric item names and Fabric item identifiers (IDs).

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/run-python-code-cell.png" alt-text="Screenshot of the Spark notebook cell with the Python code." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/run-python-code-cell.png":::

1. Save your notebook if it's not set to auto-save.

## Verify published business events

1. Go to **Business events** in Real-Time hub.

1. Select the created business event (for example, `VibrationCriticalDetected`).

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/select-business-event.png" alt-text="Screenshot of the Business events page with the event selected." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/select-business-event.png":::

1. In the **Publisher** tab, confirm that you see an event and the notebook is listed in the publisher list. 

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/verify-published-event.png" alt-text="Screenshot of the VibrationCriticalDetected event page with a sample event and the publisher information." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/verify-published-event.png":::    

1. Select the **Data preview** tab.

1. In the publisher filter, select the name of the **Notebook** previously created publisher.

1. Visualize the event in the preview table.

## Configure custom business logic with a user data function

1. Go to your workspace and create a new user data function named `ProcessVibrationCritical`.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/create-user-data-function.png" alt-text="Screenshot of creating a new user data function in the workspace." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/create-user-data-function.png":::

1. Create a new Function.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/create-new-function-dialog.png" alt-text="Screenshot of the new function creation dialog." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/create-new-function-dialog.png":::

1. Modify the logic of your new function and add the input parameters required to receive your business event.

    ```python
    import datetime
    import fabric.functions as fn
    import logging
    import json

    udf = fn.UserDataFunctions()

    @udf.function()

    def processVibrationCritical(
        machineID: str,
        productionLine: str,
        measuredVibration: str,
        impactAssessment: str,
        recommendedAction: str
    ) -> str:
    
        logging.info("processVibrationCritical invoked.")

        event_data = {
            "machineID": machineID,
            "productionLine": productionLine,
            "measuredVibration": measuredVibration,
            "impactAssessment": impactAssessment,
            "recommendedAction": recommendedAction
        }

        # Log as structured JSON for easy searching/filtering in logs
        logging.info("processVibrationCritical payload=%s", json.dumps(event_data))

        return (
            f"Processed processVibrationCritical for machineID={machineID} "
            f"on line={productionLine} at {datetime.datetime.now()}."
        )
    ```

1. Test your function.

    1. In the Functions explorer, hover over the function you created, select the ⋯ (three dots) menu, and then select **Test**.

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/test-user-data-function-menu.png" alt-text="Screenshot of the Functions explorer with Test menu selected." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/test-user-data-function-menu.png":::

    1. In the Test window, enter these sample values, and select **Test**. 
    
        - machineID: 12345
        - productionLine: WestLine01
        - measuredVibration: 1.52
        - impactAssessment: Production slowdown risk
        - recommendedAction: Schedule maintenance
    
    1.  Verify the output and the logs to confirm that the function is working as expected.
    
        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/test-user-data-function-output.png" alt-text="Screenshot of the Functions explorer with Test window showing the output." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/test-user-data-function-output.png":::

1. Select **Publish** on the toolbar to publish the function and make it available for use in the Activator rule.

     :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/publish-user-data-function-button.png" alt-text="Screenshot of the Publish button for the user data function." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/publish-user-data-function-button.png":::

## Create an Activator trigger to consume events

1. Select the Real-Time hub icon in the left navigation pane of the Fabric portal.

1. In the Real-Time hub, select **Business events** under the **Subscribe to** category.

1. In the **Business events** list, locate `VibrationCriticalDetected` event. Select either the ⚡ lightning icon or the ⋯ (three dots) menu next to the event, and then select **Set alert**.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/set-alert-business-event.png" alt-text="Screenshot of selecting the Set alert option for a business event." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/set-alert-business-event.png":::

1. On the **Add rule** page, in the **Details** section, for **Rule name**, enter a name for the rule. For example, **VibrationCriticalDetected_Rule**. 

1. In the **Condition** section, for **Check**, select **On each event**.

1. In the **Action** section, select one of the following actions. To configure the alert to trigger a function when the condition is met, follow these steps:

    1. For **Select action**, select **Run Function**.
    
        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/run-function-preview-button.png" alt-text="Screenshot of selecting Run Function as the action." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/run-function-preview-button.png":::

    1. Select the Fabric item you want to run, and then select **Add** to continue (for example, the `ProcessVibrationCritical` user data function).

         :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/select-fabric-item-to-run.png" alt-text="Screenshot of selecting the Fabric item to run." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/select-fabric-item-to-run.png":::

    1. Select the function you want to use to process the action (for example, the `processVibrationCritical` function).

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/select-function-process-action.png" alt-text="Screenshot of selecting the function to process the action." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/select-function-process-action.png":::

    1. Map each input parameter defined in the function with the business event property you previously defined. Type `@` and select the business event property from the dropdown list to map it to the function parameter.

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/map-input-parameters-business-event.png" alt-text="Screenshot of mapping input parameters to business event properties." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/map-input-parameters-business-event.png":::

        Repeat this process for each input parameter defined in the function.

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/map-all-input-parameters-business-event.png" alt-text="Screenshot of all input parameters mapped to business event properties." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/map-all-input-parameters-business-event.png":::

1. In the **Save location** section, for **Workspace**, select the workspace where you want to create the Fabric activator item.

1.  For **Item**, select the drop-down list, and then select **Create a new item**. 

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/create-new-activator-item.png" alt-text="Screenshot of selecting the Create a new item option." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/create-new-activator-item.png":::

1. In the dialog box, enter a name for the new Fabric activator item (for example, **VibrationCriticalDetected_Activator**), and then select **Create**.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/create-rule-button.png" alt-text="Screenshot of the specifying a name for the activator item." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/create-rule-button.png":::

1. You see the **Alert created** page with a link to open the rule in the Fabric activator user interface in a separate tab.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/alert-created-page.png" alt-text="Screenshot of the Alert created page." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/alert-created-page.png":::

1. Select **Open** to open the rule in the Fabric Activator user interface.

## Test the solution 

### Publish another event

In the Spark notebook, run the cell to publish a new `VibrationCriticalDetected` business event again. 

### View business event in the Real-Time hub

#### Publishers tab

1. In the Real-Time hub, select **Business events** in the left menu.

1. Select **VibrationCriticalDetected** from the list of business events.

1. In the **Publisher** tab, confirm that you see the newly published event and the old event you published at the beginning of the tutorial. If you don't see the new event, select the refresh button to refresh the list of events. It might take a few seconds for the new event to appear in the list.
 
1. In the list of publishers, confirm that the notebook you used to publish the event is listed as a publisher.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/publishers-tab.png" alt-text="Screenshot of the Publishers tab of the business event page." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/publishers-tab.png":::

#### Consumers tab

1. Switch to the **Consumers** tab. 

1. Confirm that you see an event was delivered within the last hour.

1. Confirm that the activator you created is listed as a consumer.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/consumers-tab.png" alt-text="Screenshot of the Consumers tab of the business event page." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/consumers-tab.png":::

#### Data preview tab

1. Switch to the **Data preview** tab.

1. Confirm that you see the consumer filter with the activator you created.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/data-preview-tab.png" alt-text="Screenshot of the consumer filter in the Data preview tab." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/data-preview-tab.png":::
 
### View business event in the activator run history

1. Go to the workspace where you created the activator item, and open the activator item (for example, **VibrationCriticalDetected_Activator**) if it's not already open.

1. In the activator item, select the **History** tab.

1. Confirm that you see one activation.  

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/activator-rule-history.png" alt-text="Screenshot of the history tab for the Activator rule." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/activator-rule-history.png":::

### View logs for the user data function

1. In the workspace, open the `ProcessVibrationCritical` user data function you created.

1. Switch to Run only mode using the mode switcher.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/user-data-function-run-only-mode.png" alt-text="Screenshot that shows how to switch a user data function to run only mode." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/user-data-function-run-only-mode.png":::    

1. Hover over the function name in the functions list, select the ellipses icon (...), and then select View historical log.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/view-historical-log-menu.png" alt-text="Screenshot that shows the View historical log option." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/view-historical-log-menu.png"::: 

1. You see table with the historical runs of the function. Select the most recent run to view the logs for that run.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/function-run-history.png" alt-text="Screenshot of the historical runs for the user data function." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/function-run-history.png":::

1. Confirm that the logs show the event payload in the JSON format as you defined in the function logic, which indicates that the function was triggered by the business event and processed the event data correctly.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/function-run-logs.png" alt-text="Screenshot of the logs for a specific run of the user data function." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/function-run-logs.png":::