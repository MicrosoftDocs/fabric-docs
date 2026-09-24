---
title: Set alerts on Fabric capacity overview events in Real-Time hub
description: This article describes how to set alerts on Fabric capacity overview events in Real-Time hub by using alert templates.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 08/26/2026
ms.custom: references_regions
ai-usage: ai-assisted
---

# Set alerts on Fabric capacity overview events in Real-Time hub

This article describes how to set alerts on Fabric capacity overview events in Real-Time hub.

The **Set capacity alert** dialog offers templates for the most common capacity alerts. When you select a template and fill in its parameters, Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] pre-fills the events to monitor and the condition to look for, so all you need to do is choose an action.

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

[!INCLUDE [outbound-access-protection-note](./includes/outbound-access-protection-note.md)]

[!INCLUDE [workspace-private-links-note](./includes/workspace-private-links-note.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Open the Set capacity alert dialog

To open the **Set capacity alert** dialog, follow the steps in one of the following sections.

### Use events list

1. In Real-Time hub, select **Fabric events**.
1. Move the mouse over **Capacity overview events**, and do one of the following steps:
    - Select the **Alert** button.
    - Select **ellipsis (...)**, and select **Set alert**.

        :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/set-alert-menu.png" alt-text="Screenshot that shows the Fabric events page with Set alert pages for Capacity overview events." lightbox="media/set-alerts-fabric-capacity-overview-events/set-alert-menu.png":::

### Use the event detail page

1. Select **Capacity overview events** from the list to see the detail page.
1. On the detail page, select **Set alert** button at the top of page.

    :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/set-alert-detail-page.png" alt-text="Screenshot that shows the Set alert button on the detail page." lightbox="media/set-alerts-fabric-capacity-overview-events/set-alert-detail-page.png":::


## Choose an alert template

The **Set capacity alert** dialog opens with the following templates.

| Template | Use it to |
| -------- | --------- |
| **Alert when capacity usage % exceeds a threshold** | Monitor overall utilization of a capacity. |
| **Alert when a capacity metric exceeds a threshold** | Monitor a specific numeric metric, such as CU milliseconds, a rejection percentage, or carry-forward overage. |
| **Alert when a capacity changes state** | Monitor state changes, such as a capacity becoming overloaded, paused, or resumed. |

:::image type="content" source="media/set-alerts-fabric-capacity-overview-events/set-capacity-alert-templates.png" alt-text="Screenshot that shows the Set capacity alert dialog with the available alert templates." lightbox="media/set-alerts-fabric-capacity-overview-events/set-capacity-alert-templates.png":::

Select a template to expand it, fill in its parameters, and then select **Continue**. To configure an alert that these templates don't cover, select **Create from scratch**. For more information, see [Create custom alerts on Fabric capacity overview events](set-custom-alerts-fabric-capacity-overview-events.md).

### Alert when capacity usage percentage exceeds a threshold

Use this template to alert when overall utilization of a capacity gets too high. The template tracks `interactiveDelayThresholdPercentage`, which is the closest signal a capacity emits to overall utilization.

1. Select **Alert when capacity usage % exceeds a threshold**.
1. For **Capacity**, select the Fabric capacity that you want to monitor.
1. For **Threshold (% usage)**, enter the utilization percentage that triggers the alert. The default value is `80`.
1. Select **Continue**.

    :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/template-capacity-usage-threshold.png" alt-text="Screenshot that shows the capacity usage percentage template with the capacity and threshold parameters." lightbox="media/set-alerts-fabric-capacity-overview-events/template-capacity-usage-threshold.png":::

### Alert when a capacity metric exceeds a threshold

Use this template to alert on a specific numeric metric emitted by the capacity.

1. Select **Alert when a capacity metric exceeds a threshold**.
1. For **Capacity**, select the Fabric capacity that you want to monitor.
1. For **Metric**, select the metric that you want to monitor. For a list of available metrics and their definitions, see [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md).
1. For **Threshold**, enter the value that triggers the alert.
1. Select **Continue**.

    :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/template-capacity-metric-threshold.png" alt-text="Screenshot that shows the capacity metric template with the capacity, metric, and threshold parameters." lightbox="media/set-alerts-fabric-capacity-overview-events/template-capacity-metric-threshold.png":::

### Alert when a capacity changes state

Use this template to set up an alert for when a capacity changes state, such as when it becomes overloaded, or when it's paused or resumed.

1. Select **Alert when a capacity changes state**.
1. For **Capacity**, select the Fabric capacity that you want to monitor.
1. For **Alert when the state changes to**, select **Any state change**, **Overloaded**, **Active**, **Suspended**, or **Deleted**.
1. Select **Continue**.

    :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/template-capacity-state-change.png" alt-text="Screenshot that shows the capacity state change template with the capacity and state parameters." lightbox="media/set-alerts-fabric-capacity-overview-events/template-capacity-state-change.png":::

[!INCLUDE [rule-details](../real-time-intelligence/data-activator/includes/rule-details.md)]

## Review the monitor and condition sections

The template fills in the **Monitor** and **Condition** sections for you:

- **Monitor** is set to the event type and the capacity that you selected in the template.
- **Condition** is set to a numeric change condition grouped by `capacityId`. This grouping means you get a single alert when the measure crosses the threshold, instead of a continuous stream of alerts for the whole time that the measure stays above the threshold.

Review both sections, and adjust them if you need to.

## Action section

In the **Action** section, choose what happens when the alert fires. You can send an email or a Teams message, run a Fabric item such as a pipeline or a notebook, or call a custom action. For step-by-step instructions for each action type, see [Configure actions for Activator rules](../real-time-intelligence/data-activator/rule-actions.md).

[!INCLUDE [rule-save-location](../real-time-intelligence/data-activator/includes/rule-save-location.md)]
       

## Create alert
1. Select **Create** at the bottom of the page to create the alert.  
1. You see the **Alert created** page with a link to **open** the rule in the Fabric activator user interface in a separate tab. Select **Done** to close the **Alert created** page. 
1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Fabric events** page, select **Capacity overview events** to see this page.
1. Move the mouse over the **Activator** item, and select **Open**. 
1. You see the Activator item in the Fabric Activator editor user interface. Select the rule if it's not already selected. You can update the rule in this user interface. For example, update the subject, headline, or change the action from email to Teams message.

## Related content

- [Create custom alerts on Fabric capacity overview events](set-custom-alerts-fabric-capacity-overview-events.md)
- [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md)
- [Configure actions for Activator rules](../real-time-intelligence/data-activator/rule-actions.md)
- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)

