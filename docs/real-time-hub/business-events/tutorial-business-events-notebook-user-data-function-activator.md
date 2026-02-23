---
title: Publish and React to Business Events Using Notebook and Activator
description: Learn how to publish business events using notebooks, and react to them using using User Data Functions through Activator.
#customer intent: As a data engineer, I want to create and publish a business event in Microsoft Fabric so that I can automate event-driven workflows.
ms.date: 02/22/2026
ms.topic: tutorial
---

# Publish business events using a notebook and react to them using a user data function through Activator

This tutorial guides you through the full workflow of reacting to your own Business Events in Microsoft Fabric. You’ll start by creating a business event and defining its schema, then configure a Notebook to publish that event using Python.

After validating the published events in Real-Time hub, you’ll create an Activator rule that triggers an automated action—such as processing custom business logic in a User Data Function—whenever your event occurs. By the end, you’ll have an end-to-end setup that detects important business conditions and responds to them instantly.

## Create a new business event

1. Go to Business events in Real-Time hub.

1. Click + New business event.

1. Click Create new schema.

1. Define the business event schema.

1. For example, create a new business event: VibrationCriticalDetected in a new ManufacturingEquipmentHealth Event Schema Set.

1. You can add the following properties: MachineID (string), ProductionLineID (string), MeasuredVibration (string), ImpactAssessment (string), RecommendationAction (string) and click next to continue.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-1.png" alt-text="image-1":::

1. Review and confirm to create your business event.

    :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-2.png" alt-text="image-2":::

## Configure Notebook for publishing

1. Once the Business Event has been created, go to your Workspace and create a new empty Notebook.

1. Make sure A) Python 3.11 or B) PySpark (Python) is selected.

1. :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-3.png" alt-text="image-3":::

1. :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-4.png" alt-text="image-4":::

1. Find the sample code to publish a business event using the following command: notebookutils.businessEvents.help()

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-5.png" alt-text="image-5":::

1. Add the sample code to either the current cell or a new cell.



Code:
notebookutils.businessEvents.publish(
    eventSchemaSetWorkspace="my-workspace-id",

    eventSchemaSetName="OrderEvents",

    eventTypeName="OrderDelayed",

    eventData={"orderId": "12345", "status": "delayed", "reason": "weather"},

 dataVersion="v1"

)


1. Modify the method to publish a business event.



For example:
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


Note: The properties eventSchemaSetWorkspace and eventSchemaSetName support both Fabric item names and Fabric item IDs.


1. Once publish method has been configured you can save your notebook and run the cell to publish your business event.

Verifying published business events

1. Go to Business events in Real-Time hub.

1. Select the created business event (e.g. VibrationCriticalDetected).

1. Select the Data preview tab.

1. In the publisher filter, select the name of the Notebook previously created publisher.

1. Visualize the event in the preview table.

Configure a custom business logic with a User Data Function

1. Open your workspace and create a new User Data Function (e.g. ProcessVibrationCritical).

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-6.png" alt-text="image-6":::

1. Create a new Function.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-7.png" alt-text="image-7":::

1. Modify the logic of your new function and add the input parameters required to receive your business event.

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



1. Test and publish your function.

Create an Activator trigger to consume events

1. Select the Real-Time hub icon in the left navigation pane of the Fabric portal.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/screenshot-that-shows-the-real-time-hub-icon-in-th.png" alt-text="Screenshot that shows the Real-time hub icon in the Fabric portal.":::

1. In the Real-Time hub, select Business events under the Subscribe to category.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-9.png" alt-text="image-9":::

1. In the Business events list, locate VibrationCriticalDetected event. Select either the ⚡ lightning icon or the ⋯ (three dots) menu next to the event, then select Set alert.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-10.png" alt-text="image-10":::

1. On the Add rule page, in the Details section, for Rule name, enter a name for the rule.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-11.png" alt-text="image-11":::

1. In the Condition section, for Check, select On each event.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-12.png" alt-text="image-12":::

1. In the Action section, select one of the following actions:



To configure the alert to trigger a function when the condition is met, follow these steps:

1. For Select action, select Run Function.
:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-13.png" alt-text="image-13":::

1. Select the Fabric item you want to run, then click Add to continue (for example, the ProcessVibrationCritical User Data Function).

 :::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-14.png" alt-text="image-14":::

1. Select the function you want to use to process the action (for example, the processVibrationCritical function).

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-15.png" alt-text="image-15":::

1. Map each input parameter defined in the function with the business event property you previously defined. Use value dropdown to select the business event property.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-16.png" alt-text="image-16":::
Repeat this process for each input parameter defined in the function.

:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-17.png" alt-text="image-17":::


1. In the Save location section, for Workspace, select the workspace where you want to Fabric activator item to be created or that already exists. If you're creating a new activator item, enter a name for the activator item.


:::image type="content" source="media/tutorial-business-events-notebook-user-data-function-activator/image-18.png" alt-text="image-18":::


1. You see the Alert created page with a link to open the rule in the Fabric activator user interface in a separate tab.

1. Now, every time a new VibrationCriticalDetected business event is published by the Notebook, a business logic will be triggered.