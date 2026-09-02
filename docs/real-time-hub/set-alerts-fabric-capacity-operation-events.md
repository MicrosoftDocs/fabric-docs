---
title: Set alerts on Fabric capacity operation events in Real-Time hub
description: This article describes how to set alerts on Fabric capacity operation events in Real-Time hub.
ms.reviewer: geguirgu
ms.topic: how-to
ms.date: 08/21/2026
ms.custom: references_regions
---

# Set alerts on Fabric capacity operation events in Real-Time hub
This article describes how to set alerts on Fabric capacity operation events in Real-Time hub.

[!INCLUDE [consume-fabric-events-regions](../real-time-intelligence/event-streams/includes/connectors/consume-fabric-events-regions.md)]

[!INCLUDE [outbound-access-protection-note](./includes/outbound-access-protection-note.md)]

[!INCLUDE [workspace-private-links-note](./includes/workspace-private-links-note.md)]

## Navigate to Real-Time hub

[!INCLUDE [navigate-to-real-time-hub](./includes/navigate-to-real-time-hub.md)]

## Launch the Set alert page

Follow the steps in one of the following sections. The steps open a side panel where you can configure the following options:

- Events you want to monitor.
- Conditions you want to look for in the events.
- Action you want Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] to take.

### Use events list

1. In Real-Time hub, select **Fabric events**.
1. Move the mouse over **Capacity operation events**, and complete one of the following steps:
    - Select the **Alert** button.
    - Select **ellipsis (...)**, and select **Set alert**.

    :::image type="content" source="media/set-alerts-fabric-capacity-operation-events/set-alert-menu.png" alt-text="Screenshot that shows the Fabric events page with Set alert pages for Capacity operation events." lightbox="media/set-alerts-fabric-capacity-operation-events/set-alert-menu.png":::

### Use the event detail page

1. Select **Capacity operation events** from the list to view the detail page.
1. On the detail page, select **Set alert**.

    :::image type="content" source="media/set-alerts-fabric-capacity-operation-events/set-alert-detail-page.png" alt-text="Screenshot that shows the Set alert button on the detail page." lightbox="media/set-alerts-fabric-capacity-operation-events/set-alert-detail-page.png":::


[!INCLUDE [rule-details](../real-time-intelligence/data-activator/includes/rule-details.md)]

## Monitor section

1. In the **Monitor** section, for **Source**, choose **Select source events**.

    :::image type="content" source="media/set-alerts-anomaly-detection/select-events.png" alt-text="Screenshot of the Set alert side panel.":::

1. In the **Connect data source** wizard, complete these steps:
    1. For **Event types**, select **Microsoft.Fabric.CapacityOperationEvents.Operation**.
    1. For **Event source**, confirm that **By capacity** is selected.
    1. For **Capacity**, select the Fabric capacity that you want to monitor.
    1. Select **Next**.

        > [!IMPORTANT]
        > Capacity operation events fire per operation and can be high volume on busy capacities. Use the filter and grouping options in the next section to scope alerts to the workspaces, items, or operation types you care about.

    1. On the **Review + connect** page, review the settings, and select **Save**.

## Condition section

After you connect the data source, configure the condition so that Fabric [!INCLUDE [fabric-activator](../real-time-intelligence/includes/fabric-activator.md)] fires an alert when an operation matches your criteria.

> [!IMPORTANT]
> Capacity operation events emit one event per operation that consumes capacity and can be very high volume. To avoid alert storms, group events by a dimension such as `capacityId`, `workspaceId`, `itemId`, or `operationName` and pick a condition that only fires when the aggregated measure crosses a threshold. Consider filtering to a specific `itemKind`, `utilizationType`, or `status` value before evaluating the condition.

1. In the **Condition** section, for **Check**, select **On each event grouped by**.
1. For **Grouping field**, select a dimension such as **capacityId**, **workspaceId**, **itemId**, or **operationName**.
1. In the **When** field, select the measure that you want to monitor (for example, `capacityUnitMs`, `durationMs`, `throttlingDelayMs`, or `status`). For a list of available fields and their definitions, see [Explore Fabric capacity operation events](explore-fabric-capacity-operation-events.md).
1. For the condition, select the condition that matches your intent (for example, a **numeric threshold** condition for CU or duration, or a **common condition** for status equal to `Stopped`).
1. Fill out the remaining fields with threshold values appropriate for the condition.

[!INCLUDE [rule-action](../real-time-intelligence/data-activator/includes/rule-action.md)]

[!INCLUDE [rule-save-location](../real-time-intelligence/data-activator/includes/rule-save-location.md)]
       

## Create alert
1. Select **Create** at the bottom of the page to create the alert.  
1. You see the **Alert created** page with a link to **open** the rule in the Fabric activator user interface in a separate tab. Select **Done** to close the **Alert created** page. 
1. You see a page with the activator item created by the **Add rule** wizard. If you are on the **Fabric events** page, select **Capacity operation events** to see this page.
1. Move the mouse over the **Activator** item, and select **Open**. 
1. You see the Activator item in the Fabric Activator editor user interface. Select the rule if it's not already selected. You can update the rule in this user interface. For example, update the subject, headline, or change the action from email to Teams message.

## Related content

- [Set alerts on Fabric capacity overview events](set-alerts-fabric-capacity-overview-events.md)
- [Set alerts on Azure blob storage events](set-alerts-azure-blob-storage-events.md)
