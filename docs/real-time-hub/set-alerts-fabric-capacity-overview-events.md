---
title: Set alerts on Fabric capacity overview events in Real-Time hub
description: This article describes how to set alerts on Fabric capacity overview events in Real-Time hub.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 03/20/2026
ms.custom: references_regions
ai-usage: ai-assisted
---

# Set alerts on Fabric capacity overview events in Real-Time hub
This article describes how to set alerts on Fabric capacity overview events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](./includes/consume-fabric-events-regions.md)]

> [!TIP]
> Capacity overview events fire frequently. If you set an alert that triggers on every event where usage exceeds a threshold, you receive a continuous stream of alerts for the entire duration that usage remains high. To avoid this, use a **numeric change** condition when you configure the alert rule. A numeric change condition fires a single alert when usage crosses the threshold, and doesn't fire again until usage drops below the threshold and then crosses it again.

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
    1. For **Event types**, select **Microsoft.Fabric.Capacity.Summary**.
    1. For **Event source**, confirm that **By capacity** is selected.
    1. For **Capacity**, select the Fabric capacity that you want to monitor.
    1. Select **Next**.

        > [!IMPORTANT]
        > Don't set a filter in the connection settings. Instead of filtering events here, you configure a numeric change condition in the next section. A numeric change condition fires only when the measure crosses the threshold, which prevents repeated alerts.

    1. On the **Review + connect** page, review the settings, and select **Save**.

## Condition section

After you connect the data source, configure the condition so that Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] fires a single alert when the measure crosses the threshold.

1. In the **Condition** section, for **Check**, select **On each event grouped by a field when a value is met**.
1. For the grouping field, select **capacityId**.
1. In the **When** field, select the measure that you want to monitor. For a list of available fields and their definitions, see [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md).
1. For the condition, select one of the **numeric change** conditions. Always use a numeric change condition for capacity alerts. A numeric change condition sends a single alert when the value goes above or below the threshold, rather than alerting on every event that meets the criteria.

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

