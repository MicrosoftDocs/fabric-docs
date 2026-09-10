---
title: Create custom alerts on Fabric capacity overview events in Real-Time hub
description: This article describes how to create a custom alert on Fabric capacity overview events in Real-Time hub without using an alert template.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 08/26/2026
ms.custom: references_regions
ai-usage: ai-assisted
---

# Create custom alerts on Fabric capacity overview events in Real-Time hub

The **Set capacity alert** dialog offers templates for the most common capacity alerts. For more information, see [Set alerts on Fabric capacity overview events](set-alerts-fabric-capacity-overview-events.md).

This article describes how to configure an alert that the templates don't cover. In the **Set capacity alert** dialog, select **Create from scratch**, and then follow the steps in this article to connect the data source and define the condition yourself.

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

[!INCLUDE [outbound-access-protection-note](./includes/outbound-access-protection-note.md)]

[!INCLUDE [workspace-private-links-note](./includes/workspace-private-links-note.md)]

[!INCLUDE [rule-details](../real-time-intelligence/data-activator/includes/rule-details.md)]

## Monitor section

1. In the **Monitor** section, for **Source**, choose **Select source events**.

    :::image type="content" source="media/set-alerts-anomaly-detection/select-events.png" alt-text="Screenshot of the Set alert side panel.":::

1. In the **Connect data source** wizard, complete these steps:
    1. For **Event types**, select **Microsoft.Fabric.Capacity.Summary**.
    1. For **Event source**, confirm that **By capacity** is selected.
    1. For **Capacity**, select the Fabric capacity that you want to monitor.
    1. Select **Next**.

        > [!IMPORTANT]
        > Don't set a filter in the connection settings. Instead of filtering events here, configure a numeric change condition in the next section. A numeric change condition fires only when the measure crosses the threshold, which prevents repeated alerts.

    1. On the **Review + connect** page, review the settings, and select **Save**.

## Condition section

After you connect the data source, configure the condition so that Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] fires a single alert when the measure crosses the threshold.

> [!IMPORTANT]
> Capacity overview events fire frequently. If you set an alert that triggers on every event where usage exceeds a threshold, you receive a continuous stream of alerts for the entire duration that usage remains high. To avoid this, group events by Capacity ID and use a **numeric change** condition when you configure the alert rule. A numeric change condition fires a single alert when usage crosses a threshold, and doesn't fire again until usage drops below the threshold and then crosses it again. To configure this, follow these steps.

1. In the **Condition** section, for **Check**, select **On each event grouped by**.
1. For **Grouping field**, select **capacityId**.
1. In the **When** field, select the measure that you want to monitor. For a list of available fields and their definitions, see [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md).
1. For the condition, select one of the **numeric change** conditions.
1. Fill out the remaining fields with threshold values appropriate for your numeric change condition.

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

- [Set alerts on Fabric capacity overview events](set-alerts-fabric-capacity-overview-events.md)
- [Explore Fabric capacity overview events](explore-fabric-capacity-overview-events.md)
- [Configure actions for Activator rules](../real-time-intelligence/data-activator/rule-actions.md)
