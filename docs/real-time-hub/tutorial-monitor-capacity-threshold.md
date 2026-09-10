---
title: Monitor Fabric Capacity Health in Real Time with Capacity Overview Events
description: Build an automated workflow that sends an Outlook email alert when your capacity approaches throttling conditions
ms.reviewer: geguirgu, george-guirguis
ms.date: 08/26/2026
ms.topic: tutorial
ai-usage: ai-assisted
---
# Monitor Fabric Capacity Health Using Capacity Overview Events

As organizations scale their usage of Microsoft Fabric, maintaining healthy capacities becomes increasingly important. With **Capacity Overview Events** in the Real-Time Hub, administrators can monitor capacity behavior in real time and take action when conditions require attention.

In this tutorial, you create an automated workflow that sends an **Outlook email alert** when your capacity approaches throttling conditions.

## Prerequisites

You must have access to an **existing non-trial Fabric capacity** where you're assigned the **Capacity Admin** role.

## Navigate to Real-Time hub

1. Sign in to [Microsoft Fabric](https://fabric.microsoft.com/).
1. Select **Real-Time** on the left navigation bar.

## Open the Set capacity alert dialog

1. In Real-Time hub, select **Fabric events**.
1. Find **Capacity Overview Events** in the list.
1. Move the mouse over **Capacity Overview Events**, and select the **Set alert** button.

    :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/set-alert-menu.png" alt-text="Screenshot that shows the Fabric events page with Set alert pages for Capacity overview events." lightbox="media/set-alerts-fabric-capacity-overview-events/set-alert-menu.png":::

## Select an alert template

The **Set capacity alert** dialog opens with templates for the most common capacity alerts. This tutorial uses the metric threshold template.

1. Select **Alert when a capacity metric exceeds a threshold**.
1. For **Capacity**, select the capacity that you want to monitor.
1. For **Metric**, select `backgroundRejectionThresholdPercentage`.
1. For **Threshold**, enter `80`.
1. Select **Continue**.

    :::image type="content" source="media/set-alerts-fabric-capacity-overview-events/template-capacity-metric-threshold.png" alt-text="Screenshot that shows the capacity metric template with the capacity, metric, and threshold parameters." lightbox="media/set-alerts-fabric-capacity-overview-events/template-capacity-metric-threshold.png":::

> [!NOTE]
> The field `backgroundRejectionThresholdPercentage` is used in this example because it indicates when background operations are being rejected due to capacity pressure. Depending on your business need, you can also use `interactiveDelayThresholdPercentage` (indicates when interactive operations are being delayed) or `interactiveRejectionThresholdPercentage` (indicates when interactive operations are being rejected).

> [!NOTE]
> The value **80** is used as an example in this tutorial. Adjust this threshold based on your operational policy and business requirements.

The **Add rule** page opens with the **Monitor** and **Condition** sections already filled in from the template. The condition is a numeric change grouped by `capacityId`, so you receive a single alert each time the metric crosses the threshold, rather than a continuous stream of alerts while it stays above the threshold.

## Configure the alert details

On the **Add rule** page, in the **Details** section, enter a name for the rule in the **Rule name** field. For example, `Capacity Throttling Alert`.

## Configure the action

In the **Action** section, configure an email alert:

1. For **Select action**, select **Send email**.
1. For **To**, enter the email address of the capacity administrator or team responsible for monitoring.
1. For **Subject**, enter a subject such as `Fabric Capacity Throttling Alert`.
1. For **Headline**, enter a headline such as `Capacity threshold exceeded`.
1. For **Notes**, type `Your Fabric capacity has exceeded the configured rejection threshold: @backgroundRejectionThresholdPercentage%`.

> [!NOTE]
> Type `@backgroundRejectionThresholdPercentage` instead of copying it so the variable can be populated properly. You can also use the **@** button next to the text box to select from available properties.

> [!TIP]
> In addition to email alerts, you can trigger auto-mitigation logic by selecting **Run function** as the action and pointing to a user-defined function (UDF) that implements your mitigation workflow. For step-by-step instructions for each action type, see [Configure actions for Activator rules](../real-time-intelligence/data-activator/rule-actions.md).

## Save and start the alert

1. In the **Save location** section, select the workspace where you want to create the activator item, or select an existing one. Enter a **name** for the activator item.
1. Select **Create** at the bottom of the page to create the rule.

Your real-time alerting workflow is now active.

## Observe the alert

Once the rule is created and started, it automatically listens for Capacity Overview Events from the selected capacity. When an event arrives where the `backgroundRejectionThresholdPercentage` increases to or above the threshold you configured, the activator sends an email alert to the specified recipients.

## Related content

- [Azure and Fabric events overview](fabric-events-overview.md)
- [Explore Fabric Capacity Overview events](explore-fabric-capacity-overview-events.md)
- [Set alerts on Capacity Overview events](set-alerts-fabric-capacity-overview-events.md)
- [Create custom alerts on Capacity Overview events](set-custom-alerts-fabric-capacity-overview-events.md)
- [Get Capacity Overview events](create-streams-fabric-capacity-overview-events.md)

