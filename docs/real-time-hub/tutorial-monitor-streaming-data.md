---
title: Learn to monitor streaming data
description: Monitor streaming data in Fabric Real-Time hub using the built-in tutorial card. Configure data sources, preview live data, and create alert rules step by step.
#customer intent: As a Fabric user, I want to learn how to monitor streaming data using the tutorial card in Real-Time hub so that I can get started quickly with real-time data monitoring
ms.date: 05/12/2026
author: spelluru
ms.author: spelluru
ms.topic: tutorial
---

# Learn to monitor streaming data using the tutorial card in Fabric Real-Time hub

Real-Time hub is the central place in Microsoft Fabric for discovering, ingesting, and managing streaming data. It includes built-in tutorial cards — guided walkthroughs that run directly inside the hub — to help you learn key workflows without manual setup.

In this tutorial, you complete the **Learn to monitor streaming data** walkthrough to connect a real-time weather source to an eventstream, preview the live data, and create an alert rule that sends you a notification when a condition is met.

## Prerequisites

- A [Microsoft Fabric workspace](../get-started/create-workspaces.md) with contributor or higher permissions.
- Access to Fabric Real-Time Intelligence.

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Configure a data source and create an alert rule

Follow these steps to complete the guided tutorial in Real-Time hub. You configure a weather data source, preview the streaming data, and create a rain alert rule.

1. At the top of the Real-Time hub, scroll to the right, and select **Learn to monitor streaming data**.

    :::image type="content" source="./media/tutorial-monitor-streaming-data/select-learn-monitor-streaming-data-card.png" alt-text="Screenshot that shows the Learn to monitor streaming data tutorial card in Fabric Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/select-learn-monitor-streaming-data-card.png":::

1. On the **Monitor streaming data** page, review the estimated time, data source, and what's covered in the tutorial. Select **Start** to go through the tutorial steps.  

    :::image type="content" source="./media/tutorial-monitor-streaming-data/monitor-streaming-data-page.png" alt-text="Screenshot that shows the Monitor streaming data page in Fabric Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/monitor-streaming-data-page.png":::

1. On the **Configure** page of the **Configure data source** wizard, follow these steps: 
    1. In the map view, search for a **location**. 
    1. In the **Stream details** pane, follow these steps: 
        1. For **Workspace**, select your Fabric workspace. 
        1. For **Eventstream name**, select the **Pencil** button, and enter a name for your eventstream. 
        1. The **Stream name** should be automatically updated based on the eventstream name you entered. 
    1. Select **Next** at the bottom of the page. 
    
        :::image type="content" source="./media/tutorial-monitor-streaming-data/configure-data-source.png" alt-text="Screenshot that shows the Configure data source page." lightbox="./media/tutorial-monitor-streaming-data/configure-data-source.png":::

1. On the **Review + connect** page, review the configuration details, and select **Connect** to connect to the data source. 

    :::image type="content" source="./media/tutorial-monitor-streaming-data/review-connect.png" alt-text="Screenshot that shows the Review + connect page in the Configure data source wizard in Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/review-connect.png":::

1. Select **Next** to complete the configuration and return to **Real-Time hub**. 

    :::image type="content" source="./media/tutorial-monitor-streaming-data/finish-configuration.png" alt-text="Screenshot that shows the Finish button on the Review + connect page." lightbox="./media/tutorial-monitor-streaming-data/finish-configuration.png":::

1. The **Streaming data** page shows the stream you created. Select **Next** in the **Find your stream** page to go to the next step of the tutorial. The tutorial automatically selects the stream from the list for you.

    :::image type="content" source="./media/tutorial-monitor-streaming-data/find-your-stream.png" alt-text="Screenshot that shows the Find your stream tutorial step on the Streaming data page in Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/find-your-stream.png":::

1. On the **stream details** page, if you wait for a few seconds, you see the graph is updated with the streaming data. In the **Preview live data** pop-up, select **Next**, which simulates the selection of the **Preview data** button. 

    :::image type="content" source="./media/tutorial-monitor-streaming-data/preview-live-data-button.png" alt-text="Screenshot that shows the Preview live data pop-up." lightbox="./media/tutorial-monitor-streaming-data/preview-live-data-button.png":::

1. After a few seconds, the graph and list update with streaming data. Select **X** next to **Close preview to continue** in the top-right corner.

    :::image type="content" source="./media/tutorial-monitor-streaming-data/preview-live-data.png" alt-text="Screenshot that shows the preview of streaming weather data on the stream details page in Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/preview-live-data.png":::

1. Back on the **stream details** page, select **Next** in the **Create alert** popup, which simulates the selection of the **Set alert** button. 

    :::image type="content" source="./media/tutorial-monitor-streaming-data/set-alert-button.png" alt-text="Screenshot that shows the Create alert pop-up on the stream details page in Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/set-alert-button.png":::

1. The **Add rule** page opens, and you see all the fields are filled in for you. 

    1. In the **Details** section, the **Rule name** is set to **Rain alert**.
    1. In the **Monitor** section, the **Source** is set to the stream you created in the previous step.
    1. In the **Condition** section, the following values are configured: 
        1. **Check** is set to **On each event when**. 
        1. **When** is set to **hasPrecipitation**. 
        1. **Condition** is set to **Is equal to**. 
        1. **Value** is set to **1**.

            :::image type="content" source="./media/tutorial-monitor-streaming-data/details-monitor-condition-sections.png" alt-text="Screenshot that shows Details, Monitor, and Condition sections of the Add rule page." lightbox="./media/tutorial-monitor-streaming-data/details-monitor-condition-sections.png":::            
    1. In the **Action** section, the following values are configured: 
        1. **Select action** is set to **Message to individuals**. 
        1. **To** is set to your email address. 
        1. **Headline** is set to **Activator alert Rain alert**. 
        1. **Notes** is set to **The condition for 'Rain alert' has been met**.
    1. In the **Save location** section:
        1. **Save to** is set to your workspace.
        1. **Item** is set to an Activator item in your workspace. If you prefer to use a new Activator item, select **Create a new item** in the drop-down list, and enter a name for the new Activator item.

            :::image type="content" source="./media/tutorial-monitor-streaming-data/action-location.png" alt-text="Screenshot that shows Action and Save location sections of the Add rule page." lightbox="./media/tutorial-monitor-streaming-data/action-location.png":::   

1. After reviewing the fields, select **Create** to create the alert rule. You see a confirmation message that the rule is created successfully. Select **Done** to continue. If you select **Open**, you see the Activator item (a Fabric item that triggers actions based on conditions) in the Activator user interface.

    :::image type="content" source="./media/tutorial-monitor-streaming-data/rule-created-successfully.png" alt-text="Screenshot that shows the Rule created successfully pop-up." lightbox="./media/tutorial-monitor-streaming-data/rule-created-successfully.png":::

1. Review items displayed on the **Stream details** page, and select **Finish walkthrough** to complete the tutorial.  
    
    - The **Upstream** is the **real-time weather** source. 
    - The **Downstream** is the **Activator item** that has the **Rain alert** rule.
    - The **Parent** is the **eventstream** that receives real-time weather data from the **real-time weather** source and sends it to the **Activator item**, which raises an alert when the condition is met.

        :::image type="content" source="./media/tutorial-monitor-streaming-data/tutorial-completed-successfully.png" alt-text="Screenshot that shows the Tutorial completed successfully pop-up." lightbox="./media/tutorial-monitor-streaming-data/tutorial-completed-successfully.png":::

1. After you complete the tutorial, you see the *Congratulations* page with links to open the **Eventstream** and **Activator** items. Select **Close** to close the window. 

    :::image type="content" source="./media/tutorial-monitor-streaming-data/congratulations-page.png" alt-text="Screenshot that shows the Congratulations page after completing the monitor streaming data tutorial in Real-Time hub." lightbox="./media/tutorial-monitor-streaming-data/congratulations-page.png":::

## Summary

In this tutorial, you used the guided tutorial card in Real-Time hub to:

- Connect to a real-time weather data source and create an eventstream.
- Preview live streaming data on the stream details page.
- Create a rain alert rule using Activator that sends an email when precipitation is detected.
