---
title: Publish and React to Business Events Using Notebook and Activator
description: Learn how to publish business events using notebooks, and react to them using User Data Functions through Activator.
#customer intent: As a data engineer, I want to create and publish a business event in Microsoft Fabric so that I can automate event-driven workflows.
ms.date: 02/22/2026
ms.topic: tutorial
---

# Publish business events using a notebook and react to them using a user data function through Activator

This tutorial guides you through the full workflow of reacting to your own Business Events in Microsoft Fabric. You start by creating a business event and defining its schema, then configure a notebook to publish that event using Python.

After validating the published events in Real-Time hub, you create an Activator rule that triggers an automated action—such as processing custom business logic in a User Data Function—whenever your event occurs. By the end, you have an end-to-end setup that detects important business conditions and responds to them instantly.

## Create a new business event

1. Go to **Business events** in Real-Time hub.

1. Select + New business event.

1. Select Create new schema.

1. Define the business event schema.

1. For example, create a new business event: VibrationCriticalDetected in a new ManufacturingEquipmentHealth Event Schema Set.

1. Add the following properties: MachineID (string), ProductionLineID (string), MeasuredVibration (string), ImpactAssessment (string), RecommendationAction (string) and select Next to continue.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/define-business-event-schema.png" alt-text="Screenshot of the business event schema properties configuration." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/define-business-event-schema.png":::

1. Review and confirm to create your business event.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/review-business-event-configuration.png" alt-text="Screenshot of the review and confirm page for creating a business event." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/review-business-event-configuration.png":::

## Configure notebook for publishing

1. After creating the business event, go to your workspace and create a new empty notebook.

1. Make sure you select either A) Python 3.11 or B) PySpark (Python).

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/python-runtime-selection.png" alt-text="Screenshot of the Python 3.11 runtime selection in the notebook." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/python-runtime-selection.png":::

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/pyspark-python-runtime-selection.png" alt-text="Screenshot of the PySpark Python runtime selection in the notebook." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/pyspark-python-runtime-selection.png":::

1. Find the sample code to publish a business event using the following command: `notebookutils.businessEvents.help()`

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/notebook-business-event-help.png" alt-text="Screenshot of the businessEvents help command output." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/notebook-business-event-help.png":::

1. Add the sample code to either the current cell or a new cell.

    ```python
   
    notebookutils.businessEvents.publish(
        eventSchemaSetWorkspace="my-workspace-id",    
        eventSchemaSetName="OrderEvents",    
        eventTypeName="OrderDelayed",    
        eventData={"orderId": "12345", "status": "delayed", "reason": "weather"},    
        dataVersion="v1"    
    )
    ```

1. Modify the method to publish a business event. For example:

    ```python
    
    notebookutils.businessEvents.publish(
        eventSchemaSetWorkspace="ManufacturingWorkspace",
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


1. After you configure the publish method, save your notebook and run the cell to publish your business event.

## Verify published business events

1. Go to **Business events** in Real-Time hub.

1. Select the created business event (for example, `VibrationCriticalDetected`).

1. Select the **Data preview** tab.

1. In the publisher filter, select the name of the **Notebook** previously created publisher.

1. Visualize the event in the preview table.

## Configure custom business logic with a User Data Function

1. Open your workspace and create a new User Data Function (for example, `ProcessVibrationCritical`).

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/create-user-data-function.png" alt-text="Screenshot of creating a new User Data Function in the workspace." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/create-user-data-function.png":::

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

1. Test and publish your function.

## Create an Activator trigger to consume events

1. Select the Real-Time hub icon in the left navigation pane of the Fabric portal.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/fabric-real-time-hub-icon.png" alt-text="Screenshot of the Real-time hub icon in the Fabric portal." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/fabric-real-time-hub-icon.png":::

1. In the Real-Time hub, select **Business events** under the **Subscribe to** category.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/subscribe-business-events.png" alt-text="Screenshot of the Business events option in the Real-Time hub." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/subscribe-business-events.png":::

1. In the **Business events** list, locate `VibrationCriticalDetected` event. Select either the ⚡ lightning icon or the ⋯ (three dots) menu next to the event, and then select **Set alert**.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/set-alert-business-event.png" alt-text="Screenshot of selecting the Set alert option for a business event." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/set-alert-business-event.png":::

1. On the **Add rule** page, in the **Details** section, for **Rule name**, enter a name for the rule.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/rule-name-field-add-rule.png" alt-text="Screenshot of the rule name field in the Add rule page." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/rule-name-field-add-rule.png":::

1. In the **Condition** section, for **Check**, select **On each event**.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/condition-check-on-each-event.png" alt-text="Screenshot of the condition section with On each event selected.":::

1. In the **Action** section, select one of the following actions. To configure the alert to trigger a function when the condition is met, follow these steps:

    1. For **Select action**, select **Run Function**.
    
        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/run-function-preview-button.png" alt-text="Screenshot of selecting Run Function as the action." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/run-function-preview-button.png":::

    1. Select the Fabric item you want to run, and then select **Add** to continue (for example, the `ProcessVibrationCritical` User Data Function).

         :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/select-fabric-item-to-run.png" alt-text="Screenshot of selecting the Fabric item to run." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/select-fabric-item-to-run.png":::

    1. Select the function you want to use to process the action (for example, the `processVibrationCritical` function).

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/select-function-process-action.png" alt-text="Screenshot of selecting the function to process the action." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/select-function-process-action.png":::

    1. Map each input parameter defined in the function with the business event property you previously defined. Use **value** dropdown to select the business event property.

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/map-input-parameters-business-event.png" alt-text="Screenshot of mapping input parameters to business event properties." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/map-input-parameters-business-event.png":::

        Repeat this process for each input parameter defined in the function.

        :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/map-input-parameters-business-event.png" alt-text="Screenshot of all input parameters mapped to business event properties." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/map-input-parameters-business-event.png":::

1. In the **Save location** section, for **Workspace**, select the workspace where you want to Fabric activator item to be created or that already exists. If you're creating a new activator item, enter a name for the activator item.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/save-location-workspace-item-name.png" alt-text="Screenshot of the Save location section for the activator item." lightbox="media/tutorial-business-events-notebook-user-data-function-activator/save-location-workspace-item-name.png":::

1. You see the **Alert created** page with a link to open the rule in the Fabric activator user interface in a separate tab.

1. Now, every time the notebook publishes a new `VibrationCriticalDetected` business event, a business logic triggers.