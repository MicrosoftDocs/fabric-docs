---
title: Set alerts on Fabric capacity overview events in Real-Time hub
description: This article describes how to set alerts on Fabric capacity overview events in Real-Time hub.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 11/17/2025
ms.custom: references_regions
---

# Set alerts on Fabric capacity overview events in Real-Time hub
This article describes how to set alerts on Fabric capacity overview events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch the Set alert page

Do steps from one of the following sections, which opens a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] to take.

### Use events list

1. In Real-Time hub, select **Fabric events**.
1. Move the mouse over **Capacity overview events**, and do one of the following steps:
    - Select the **Alert** button.
    - Select **ellipsis (...)**, and select **Set alert**.

    :::image type="content" source="media/set-alerts-anomaly-detection/fabric-capacity-event.png" alt-text="Screenshot that shows the Fabric events page with Set alert pages for Capacity overview events.":::

### Use the event detail page

1. Select **Capacity overview events** from the list see the detail page.
1. On the detail page, select **Set alert** button at the top of page.

[!INCLUDE [rule-details](./includes/rule-details.md)]

## Monitor section


1. In the **Monitor** section, for **Source**, choose **Select source events**.

    :::image type="content" source="media/set-alerts-anomaly-detection/select-events.png" alt-text="Screenshot of the Set alert side panel.":::

1. In the **Connect data source** wizard, do these steps:
    1. For **Event types**, select event types that you want to monitor.
    1. For **Event types**, select event types that you want to monitor.
    1. For **Event source**, confirm that By capacity is selected.
    1. For **Capacity**, select the Fabric capacity.
    1. In the **Set filters** section, select **+ Filter** to a filter based on a field.   
    1. Select **Next**.
    1. On the **Review + connect** page, review the settings, and select **Save**.

[!INCLUDE [rule-condition-events](./includes/rule-condition-events.md)]

[!INCLUDE [rule-action](./includes/rule-action.md)]

[!INCLUDE [rule-save-location](./includes/rule-save-location.md)]
       

## Create alert
1. Select **Create** at the bottom of the page to create the alert.  
1. You see the **Alert created** page with a link to **open** the rule in the Fabric activator user interface in a separate tab. Select **Done** to close the **Alert created** page. 
1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Fabric events** page, select **Capacity overview events** to see this page.
1. Move the mouse over the **Activator** item, and select **Open**. 
1. You see the Activator item in the Fabric Activator editor user interface. Select the rule if it's not already selected. You can update the rule in this user interface. For example, update the subject, headline, or change the action from email to Teams message.

## Related content

- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)

