---
title: Stream events to Eventstream using Logic Apps and Power Automate 
description: Learn how to stream real-time events from Power Automate or Logic Apps to Eventstream using the custom endpoint.
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: tutorial
ms.custom:
ms.date: 1/20/2025
ms.search.form: Eventstreams Tutorials
#CustomerIntent: As a developer, I want to stream real-time events from my Power Automate and Logic Apps using Fabric event streams.
---

# Stream events to Eventstream using Logic Apps and Power Automate 

In this tutorial, you learn how to stream real-time events from  **Logic Apps** or **Power Automate** to Real-Time Intelligence using a custom endpoint source in Microsoft Fabric Eventstream. While the flows for Logic Apps and Power Automate are configured differently, they serve the same purpose: to periodically send the simulated flight data containing columns such as `ScanUtcTime` and `FlightInfo`. The difference in flow is because **Logic Apps** supports executing JavaScript, but **Power Automate** doesn't.

The flow in Logic App (with stateful workflow) and Power Automate are:

- **Logic Apps Flow**:  

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/logic-apps.png" alt-text="Screenshot showing logic app flow."::: 

- **Power Automate Flow**:  

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/power-automate.png" alt-text="Screenshot showing Power Automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/power-automate.png":::

Although the flows in **Logic Apps** and **Power Automate** are different, they achieve the same result—sending flight data to Real-Time Intelligence. **Choose the approach that best suits your requirements.**


   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/preview-data.png" alt-text="Screenshot showing flight data in eventstream." lightbox="media/stream-events-from-power-automate-and-logic-app/preview-data.png" :::


In this tutorial, you learn how to:

> [!div class="checklist"]
>
> - Create an eventstream and add a custom endpoint source.
> - Getting the Event Hubs endpoint details.
> - Connecting Logic Apps to the eventstream via the custom endpoint.
> - Connecting Power Automate to the eventstream via the custom endpoint.
> - Preview data in eventstream.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Access to a workspace with Contributor or higher permissions where your eventstream is located.
- For **Logic Apps**, an Azure account with a valid subscription to create logic apps. If you don't have one, [sign up for a free Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- For **Power Automate**, an active **Power Automate** account.


## Create an eventstream 
[!INCLUDE [create-an-eventstream](./includes/create-an-eventstream.md)]

## Add a Custom endpoint source

1. To add a custom endpoint source, on the get-started page, select **Use custom endpoint**.

   :::image type="content" border="true" source="media\add-source-custom-app-enhanced\select-custom-endpoint.png" alt-text="Screenshot of the option to use a custom endpoint.":::

1. In the **Custom endpoint** dialog, enter a name for the custom source under **Source name**, and then select **Add**.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\add.png" alt-text="Screenshot of the dialog for adding a custom endpoint.":::

1. After you create the custom endpoint source, it's added to your eventstream on the canvas in edit mode. To implement the newly added data from the custom app source, select **Publish**.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\edit-mode.png" alt-text="Screenshot that shows the eventstream in edit mode, with the Publish button highlighted.":::

## Stream events from Logic Apps to your eventstream using the custom endpoint

In this section, you'll learn how to design a workflow that periodically generates simulated flight data on a recurring schedule. The workflow will use JavaScript code in the 'Execute JavaScript' action to construct a flight information message with randomized values for each field. Once the message is constructed, it will be sent to the eventstream's endpoint using the Event Hub protocol.

1. Create a Logic App using the **Standard** plan instead of the Consumption plan to simplify configuration, as the 'Execute JavaScript' action in the Consumption plan requires an additional integration account.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\create-logic-app.png" alt-text="Screenshot that shows create logic app with standard plan.":::

1. Create a workflow. When creating the workflow, select the **Stateful** state type as the 'Recurrence' trigger (needed for this tutorial) is not available in the stateless trigger list.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\state-type.png" alt-text="Screenshot that shows create workflow with stateful state type.":::

1. Open the newly created workflow, select **Add a trigger**, and then select **Recurrence**. 
   
   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\add-recurrence.png" alt-text="Screenshot that shows how to add a recurrence in workflow.":::

1. Configure **Recurrence** for periodical running. This will peroridically trigger this whole flow based on the interval you set.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\long-running.png" alt-text="Screenshot that shows how to set recurrence for long running.":::

1. Select the **+ Add an action** and then select the **Excute JavaScript**.
   
   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\add-javascript.png" alt-text="Screenshot that shows how to add JavaScript.":::

1. [Copy this script content](https://github.com/microsoft/fabric-event-streams/blob/main/Use%20Case/logic-apps-to-eventstream/flights.info.mocks.js) into **code** field.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\java-script.png" alt-text="Screenshot that shows JavaScript code.":::

1. Select the **+ Add an action** to add the **Event Hubs** action step, and then select **Send event**.

   :::image type="content" border="true" source="media\stream-events-from-power-automate-and-logic-app\send-event.png" alt-text="Screenshot that shows how to add an event hub.":::

1. Create new connection, enter the **Connection name**.
1. Enter the **Connection string** which can copy from Eventstream Custom endpoint, and select **Create new** to get the connection created.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/connection-string.png" alt-text="Screenshot showing how to get connection string." lightbox="media/stream-events-from-power-automate-and-logic-app/connection-string.png" :::
   
1. After the new connection created and returned to event hub Parameters configuration, select **Enter custom value** from the dropdown menu of the **Event Hub Name** and enter the event hub name which can copy from Eventstream Custom endpoint.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" alt-text="Screenshot showing how to get Event Hubs name." lightbox="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" :::

1. Select **Content** for the **Advanced parameters** and configure the **Content** as the **Output** .
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/configure-event-hub-content.png" alt-text="Screenshot showing configure event hub content." lightbox="media/stream-events-from-power-automate-and-logic-app/configure-event-hub-content.png" :::

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/output.png" alt-text="Screenshot showing configure event hub as output." lightbox="media/stream-events-from-power-automate-and-logic-app/output.png" :::

1. Select **Save** to save the workflow.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/save-workflow.png" alt-text="Screenshot showing how to save workflow." lightbox="media/stream-events-from-power-automate-and-logic-app/save-workflow.png" :::

1. On the designer toolbar, from the Run menu, select **Run**.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/run-workflow.png" alt-text="Screenshot showing how to run workflow." lightbox="media/stream-events-from-power-automate-and-logic-app/run-workflow.png" :::

1. After you complete these steps, you can preview the data in your eventstream that is from your Logic App workflow.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/preview-data.png" alt-text="Screenshot showing data preview in eventstream." lightbox="media/stream-events-from-power-automate-and-logic-app/preview-data.png" :::

## Stream events from Power Automate to your eventstream using the custom endpoint

In this section, you'll learn how to create a flow in Power Automate to generate simulated flight data and send it to your eventstream. Since Power Automate doesn't support the 'Execute JavaScript Code' action, a few variables need to be defined to produce the simulated data. To simplify this process, a preconfigured flow with the necessary variables is provided for downloading and importing. Follow the steps below to create your flow using the preconfigured package and complete the remaining configuration to send the simulated data to your eventstream.

1. Download this zip file from this [git repo](https://github.com/microsoft/fabric-event-streams/blob/main/Use%20Case/power-automate-to-eventstream/FlightInfoData_20250113023956.zip) which contains preconfigured flows for scheduling the sending of mock flight data. 
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

1. Open your Power Automate flow, select **Edit** and add the **Event Hubs** action step, and then select **Send event**. Refer to the steps in [stream events from Logic Apps](#stream-events-from-logic-apps-to-your-eventstream-using-the-custom-endpoint) to configure the event hub and set **Recurrence** for long-running.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/automate-event-hub.png" alt-text="Screenshot showing hoe to add event hub in automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/automate-event-hub.png" :::

1. Navigate back to **My Flows**, and select the flow to **Turn on** it

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/turn-on.png" alt-text="Screenshot showing how to turn on automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/turn-on.png" :::

1. After you complete these steps, you can preview the data in your eventstream that is from your Power Automate workflow.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/preview-data.png" alt-text="Screenshot showing data preview in eventstream." lightbox="media/stream-events-from-power-automate-and-logic-app/preview-data.png" :::

## Related content

In this tutorial, you learned how to stream real-time events from Power Automate or Logic Apps to your eventstream using the custom endpoint.

If you want to discover more advanced functionalities for working with Fabric event streams, you might find the following resources helpful:

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
