---
title: Stream events from Power Automate and Logic Apps to an eventstream via the Event Hubs endpoint
description: Learn how to stream real-time events from Power Automate and Logic Apps to Eventstream using the Event Hubs endpoint.
ms.reviewer: spelluru
ms.author: xujiang1
author: xujxu
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 12/27/2024
ms.search.form: Eventstreams Tutorials
#CustomerIntent: As a developer, I want to stream real-time events from my Power Automate and Logic Apps using Fabric event streams.
---

# Stream events from Power Automate and Logic Apps to an eventstream using the Event Hubs endpoint

In this tutorial, you learn how to stream real-time events from Power Automate and Logic Apps to Real-Time Intelligence using Event Hubs endpoint provided by a custom endpoint source in the  Microsoft Fabric event streams. 

In this tutorial, you learn how to:

> [!div class="checklist"]
>
> - Create an eventstream and add a custom endpoint source.
> - Getting the Event Hubss endpoint details.
> - Importing and configuring a Power Automate flow.
> - Connecting Power Automate to the eventstream via the Event Hubs endpoint.
> - Connecting Logic Apps to the custom endpoint via the Event Hubs.
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

## Create Power Automate flow

1. Download this zip file from this [git repo](https://github.com/xujxu/flightinfo.pam/blob/main/powerAutomateScript/VIP.flightinfo_20240329214410.zip).
1. Login in [Power Automate](https://make.powerautomate.com/) with your Power BI account.
1. Navigate to **My Flows** in the left navigating pane.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/create-power-automate-flow.png" alt-text="Screenshot showing create Power automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/create-power-automate-flow.png" :::

1. Select the **Import Package (Legacy)** after clicking the **Import** button.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/import-package.png" alt-text="Screenshot showing importing package." lightbox="media/stream-events-from-power-automate-and-logic-app/import-package.png" :::

1. Select the zip file you downloaded from [step 1](#create-power-automate-flow), and upload it. 
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/upload-package.png" alt-text="Screenshot showing uploading package." lightbox="media/stream-events-from-power-automate-and-logic-app/upload-package.png" :::

1. Select **update** to change the **Import setup** as **Create as new**, and then select **Save**.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/create-as-new.png" alt-text="Screenshot showing updating as create as new." lightbox="media/stream-events-from-power-automate-and-logic-app/create-as-new.png" :::

1. And then select **Import** to import this package to your own flow.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/complete-import.png" alt-text="Screenshot showing the last step to import package." lightbox="media/stream-events-from-power-automate-and-logic-app/complete-import.png" :::

1. Navigate back to **My Flows**, and you can see the newly added Power Automate flow.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/my-flow.png" alt-text="Screenshot showing the newly added flow." lightbox="media/stream-events-from-power-automate-and-logic-app/my-flow.png" :::  

## Stream events from Power Automate to your eventstream using the Event Hubs endpoint

1. Open your Power Automate flow and then select **Edit** to adding the Event Hubs action so that the data can flow into Eventstream. 

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/edit-flow.png" alt-text="Screenshot showing how to edit flow." lightbox="media/stream-events-from-power-automate-and-logic-app/edit-flow.png" :::

1. Click the **+ New step** to add the **Event Hubs** action step, and then select **Send event**.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" alt-text="Screenshot showing how to add Event Hubs to Power automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/add-event-hub.png" :::

1. Configure the Event Hubs with the following details:
   1. Enter the **Event Hubs name** which can copy from Eventstream Custom endpoint.

      :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" alt-text="Screenshot showing how to get Event Hubs name." lightbox="media/stream-events-from-power-automate-and-logic-app/event-hub-name.png" :::

   1. Select **Content** for the **Advanced parameters**.
   1. Configure the **Content** as the **Output** .

      :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/configure-event-hub.png" alt-text="Screenshot showing how to configure Event Hubs to Power automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/configure-event-hub.png" :::

   1. Create new connection, enter the **Connection name**.

      :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/create-connection.png" alt-text="Screenshot showing how to create new connection." lightbox="media/stream-events-from-power-automate-and-logic-app/create-connection.png" :::

   1. Enter the **Connection string** which can copy from Eventstream Custom endpoint.

      :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/connection-string.png" alt-text="Screenshot showing how to get connection string." lightbox="media/stream-events-from-power-automate-and-logic-app/connection-string.png" :::

1. Select **Save**, and you can do the **Test**.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/save-test.png" alt-text="Screenshot showing saving flow." lightbox="media/stream-events-from-power-automate-and-logic-app/save-test.png" :::

1. If the flow is successful, configure **Recurrence** for long-running.
   
   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/recurrence.png" alt-text="Screenshot showing how to configure flow as long running." lightbox="media/stream-events-from-power-automate-and-logic-app/recurrence.png" :::

1. Navigate back to **My Flows**, and select the flow to **Turn on** it

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/turn-on.png" alt-text="Screenshot showing how to turn on automate flow." lightbox="media/stream-events-from-power-automate-and-logic-app/turn-on.png" :::

1. After you complete these steps, you can preview you data in your eventstream. 

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/preview-data.png" alt-text="Screenshot showing data preview in eventstream." lightbox="media/stream-events-from-power-automate-and-logic-app/preview-data.png" :::


## Stream events from Logic Apps to your eventstream using the Event Hubs endpoint

The steps to stream events from Logic Apps to your eventstream using the Event Hubs endpoint is similar to [Stream events from Power Automate to your eventstream using the Event Hubs endpoint](#create-an-eventstream-and-add-a-custom-endpoint-source-in-microsoft-fabric). The flow in Logic App (with stateful workflow) are:

- **Recurrence**.
- **Execute JavaScript Code**: [Copy the script content](https://github.com/xujxu/flightinfo.pam/blob/main/logicAppScript/flights.info.mocks.js) into this step.
- **Send Event** : Configure the Event Hubs using the **Event Hubs name** and **Connection string** obtained from your Custom endpoint in your eventstream.

   :::image type="content" source="media/stream-events-from-power-automate-and-logic-app/logic-apps.png" alt-text="Screenshot showing how to configure logic apps." lightbox="media/stream-events-from-power-automate-and-logic-app/logic-apps.png" :::

## Related content

In this tutorial, you learned how to stream real-time events from Power Automate and Logic Apps to your eventstream using the Event Hubs endpoint.

If you want to discover more advanced functionalities for working with Fabric event streams, you might find the following resources helpful:

- [Introduction to Microsoft Fabric event streams](./overview.md)
- [Create and manage an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage eventstream sources](./add-manage-eventstream-sources.md)
- [Add and manage eventstream destinations](./add-manage-eventstream-destinations.md)
- [Ingest, filter, and transform real-time events and send them to a Microsoft Fabric lakehouse](./transform-and-stream-real-time-events-to-lakehouse.md)
