---
title: Monitor Fabric Capacity Health in Real Time with Capacity Overview Events
description: Build an automated workflow that sends an Outlook email alert when your capacity approaches throttling conditions
ms.reviewer: geguirgu, george-guirguis
ms.date: 06/11/2026
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

## Launch the Set alert page

1. In Real-Time hub, select **Fabric events**.
1. Find **Capacity Overview Events** in the list.
1. Move the mouse over **Capacity Overview Events**, and select the **Set alert** button.

## Configure the alert details

On the **Add rule** page, in the **Details** section, enter a name for the rule in the **Rule name** field. For example, `Capacity Throttling Alert`.

## Configure the monitor section

1. In the **Monitor** section, confirm that **Capacity Overview Events** is selected in the **Source** field.
1. In the **Connect data source** wizard, complete these steps:
   1. For **Event type(s)**, select `Microsoft.Fabric.Capacity.Summary` and keep the **Event scope** as **By capacity**.
   1. Select the **capacity** you want to monitor.
   1. Select **Next** and then **Save**.

## Configure the condition

In the **Condition** section, configure the following parameters:

- **Check:** On each event
- **Grouping field:** `capacityId`
- **When:** `backgroundRejectionThresholdPercentage`
- **Condition:** Increases to or above
- **Value:** `80`
- **Occurrence:** Every time the condition is met

> [!NOTE]
> The field `backgroundRejectionThresholdPercentage` is used in this example because it indicates when background operations are being rejected due to capacity pressure. Depending on your business need, you can also use `interactiveDelayThresholdPercentage` (indicates when interactive operations are being delayed) or `interactiveRejectionThresholdPercentage` (indicates when interactive operations are being rejected).

> [!NOTE]
> The value **80** is used as an example in this tutorial. Adjust this threshold based on your operational policy and business requirements.

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
> In addition to email alerts, you can trigger automitigation logic by selecting **Run function** as the action and pointing to a user-defined function (UDF) that implements your mitigation workflow.

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
- [Get Capacity Overview events](create-streams-fabric-capacity-overview-events.md)

