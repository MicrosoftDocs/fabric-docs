---
title: Stream events to Eventstream using Logic Apps and Power Automate 
description: Learn how to stream real-time events from Power Automate or Logic Apps to Eventstream using the custom endpoint.
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 12/27/2024
ms.search.form: Eventstreams Tutorials
#CustomerIntent: As a developer, I want to stream real-time events from my Power Automate and Logic Apps using Fabric event streams.
---

# Stream events to Eventstream using Logic Apps and Power Automate 

In this tutorial, you learn how to stream real-time events from  **Logic Apps** or **Power Automate** to Real-Time Intelligence using a custom endpoint source in Microsoft Fabric Eventstream. While the flows for Logic Apps and Power Automate are configured differently, they serve the same purpose: to periodically send fake flight data containing columns such as `ScanUtcTime` and `FlightInfo`. The difference in flow is because **Logic Apps** supports executing JavaScript, but **Power Automate** doesn't.  

The flow in Logic App (with stateful workflow) and Power Automate are:

- **Logic Apps Flow**:  

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/logic-apps.png" alt-text="Screenshot showing logic app flow."::: 

- **Power Automate Flow**:  
  
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/power-automate.png" alt-text="Screenshot showing Power Automate flow."::: 
 

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> - Create an eventstream and add a custom endpoint source.
> - Getting the Event Hubss endpoint details.
> - Connecting Logic Apps to the eventstream via the custom endpoint.
> - Connecting Power Automate to the eventstream via the custom endpoint.
> - Preview data in eventstream.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a workspace with Contributor or higher permissions where your eventstream is located.
- An account on **Power Automate**.
- A **Logic Apps** workflow ready to connect to your eventstream.

## Create an eventstream and add a Custom endpoint source in Microsoft Fabric

1. Change your Fabric experience to **Real-Time Intelligence**.

    :::image type="content" source="media/create-manage-an-eventstream/switch-to-real-time-intelligence-workload.png" alt-text="Screenshot showing the switcher to switch to the Real-Time intelligence workload.":::

1. Follow one of these steps to start creating an eventstream:

   - On the **Real-Time Intelligence** homepage, in the **Recommended items to create** section, select the **Eventstream** tile:

       :::image type="content" source="media/create-manage-an-eventstream/eventstream-creation-homepage.png" alt-text="Screenshot showing the eventstream tile on the homepage.":::

   - Select **My workspace** on the left navigation bar. On the **My Workspace** page, select **New item** and then **Eventstream**:

       :::image type="content" source="media/create-manage-an-eventstream/eventstream-creation-workspace.png" alt-text="Screenshot showing where to find the eventstream option in the New menu on the Workspace page." lightbox="media/create-manage-an-eventstream/eventstream-creation-workspace.png":::

1. Enter a **name** for the new eventstream, and then select **Create**. 

    :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/create-event-stream-dialog-box.png" alt-text="Screenshot showing the New eventstream dialog box." lightbox="media/stream-events-from-power-automate-and-logic-app/create-event-stream-dialog-box.png" :::

1. Creation of the new eventstream in your workspace can take a few seconds. After the eventstream is created, you're directed to the main editor where you can start with adding sources to the eventstream. 

   :::image type="content" source="media/create-manage-an-eventstream-enhanced/editor.png" alt-text="Screenshot showing the editor." lightbox="media/create-manage-an-eventstream-enhanced/editor.png" :::

1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**.

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\select-custom-endpoint.png" alt-text="Screenshot of the option to use a custom endpoint.":::

1. In the **Custom endpoint** dialog, enter a name for the custom source under **Source name**, and then select **Add**.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\add.png" alt-text="Screenshot of the dialog for adding a custom endpoint.":::

1. After you create the custom endpoint source, it's added to your eventstream on the canvas in edit mode. To implement the newly added data from the custom app source, select **Publish**.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\edit-mode.png" alt-text="Screenshot that shows the eventstream in edit mode, with the Publish button highlighted.":::

## Stream events from Logic Apps to your eventstream using the custom endpoint

1. Create a Logic App and workflow resource in [Azure portal](https://portal.azure.com/).
1. Open the newly created workflow, select **Add a trigger**, and select **Recurrence**.
   
   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\add-recurrence.png" alt-text="Screenshot that shows how to add a recurrence in workflow.":::

1. Configure **Recurrence** for long-running.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\long-running.png" alt-text="Screenshot that shows how to set recurrence for long running.":::

1. Select the **+ Add an action** and then select the **Excute JavaScript**, [Copy the script content](https://github.com/microsoft/fabric-event-streams/blob/main/Use%20Case/logic-apps-to-eventstream/flights.info.mocks.js) into **code** field.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\add-javascript.png" alt-text="Screenshot that shows how to add JavaScript.":::

1. Select the **+ Add an action** to add the **Event Hubs** action step, and then select **Send event**.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\send-event.png" alt-text="Screenshot that shows how to add an event hub.":::

1. Create new connection, enter the **Connection name**.
1. Enter the **Connection string** which can copy from Eventstream Custom endpoint.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/connection-string.png" alt-text="Screenshot showing how to get connection string." lightbox="media/stream-events-from-power-automate-and-logic-app/connection-string.png" :::
   
1. Select **Create new**, and then enter the **Event Hubs name** which can copy from Eventstream Custom endpoint.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" alt-text="Screenshot showing how to get Event Hubs name." lightbox="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" :::

1. Select **Content** for the **Advanced parameters** and configure the **Content** as the **Output** .
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/output.png" alt-text="Screenshot showing configure event hub as output." lightbox="media/stream-events-from-power-automate-and-logic-app/output.png" :::

1. Select **Save** to save the workflow.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/save-workflow.png" alt-text="Screenshot showing how to save workflow." lightbox="media/stream-events-from-power-automate-and-logic-app/save-workflow.png" :::

1. On the designer toolbar, from the Run menu, select **Run**.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/run-workflow.png" alt-text="Screenshot showing how to run workflow." lightbox="media/stream-events-from-power-automate-and-logic-app/run-workflow.png" :::

1. After you complete these steps, you can preview you data in your eventstream. 

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/preview-data.png" alt-text="Screenshot showing data preview in eventstream." lightbox="media/stream-events-from-power-automate-and-logic-app/preview-data.png" :::

## Stream events from Power Automate to your eventstream using the custom endpoint

1. Download this zip file from this [git repo](https://github.com/microsoft/fabric-event-streams/blob/main/Use%20Case/power-automate-to-eventstream/FlightInfoData_20240329191945.zip) which contains preconfigured flows for scheduling the sending of mock flight data. 
1. Login in [Power Automate](https://make.powerautomate.com/) with your Power BI account.
1. Navigate to **My Flows** in the left navigating pane.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/create-power-automate-flow.png" alt-text="Screenshot showing create Power Automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/create-power-automate-flow.png" :::

1. Select the **Import Package (Legacy)** after clicking the **Import** button.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/import-package.png" alt-text="Screenshot showing importing package." lightbox="media/stream-events-from-power-automate-and-logic-app/import-package.png" :::

1. Select the zip file you downloaded from [step 1](#stream-events-from-power-automate-to-your-eventstream-using-the-custom-endpoint), and upload it. 
1. Select **update** to change the **Import setup** as **Create as new**, and then select **Save**.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/create-as-new.png" alt-text="Screenshot showing updating as create as new." lightbox="media/stream-events-from-power-automate-and-logic-app/create-as-new.png" :::

1. And then select **Import** to import this package to your own flow.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/complete-import.png" alt-text="Screenshot showing the last step to import package." lightbox="media/stream-events-from-power-automate-and-logic-app/complete-import.png" :::

1. Navigate back to **My Flows**, and you can see the newly added Power Automate flow.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/my-flow.png" alt-text="Screenshot showing the newly added flow." lightbox="media/stream-events-from-power-automate-and-logic-app/my-flow.png" :::

1. Open your Power Automate flow and then select **Edit** and then add the **Event Hubs** action step, and then select **Send event**. Refer to the steps in [Stream events from Logic Apps to your eventstream using the custom endpoint](#stream-events-from-logic-apps-to-your-eventstream-using-the-custom-endpoint) to configure the event hub and set **Recurrence** for long-running.

1. Navigate back to **My Flows**, and select the flow to **Turn on** it

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/turn-on.png" alt-text="Screenshot showing how to turn on automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/turn-on.png" :::

1. After you complete these steps, you can preview you data in your eventstream. 

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/preview-data.png" alt-text="Screenshot showing data preview in eventstream." lightbox="media/stream-events-from-power-automate-and-logic-app/preview-data.png" :::

## Related content

In this tutorial, you learned how to stream real-time events from Power Automate or Logic Apps to your eventstream using the custom endpoint.

If you want to discover more advanced functionalities for working with Fabric event streams, you might find the following resources helpful:

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
