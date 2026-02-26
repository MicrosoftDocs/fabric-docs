---
title: Monitor Fabric Capacity Health in Real Time with Capacity Overview Events
description: Build an automated workflow that sends an Outlook email alert when your capacity approaches throttling conditions
ms.reviewer: geguirgu, george-guirguis
ms.date: 11/17/2025
ms.topic: tutorial
---
# Monitor Fabric Capacity Health Using Capacity Overview Events

As organizations scale their usage of Microsoft Fabric, maintaining healthy capacities becomes increasingly important. With **Capacity Overview Events** in the Real-Time Hub, administrators can monitor capacity behavior in real time and take action when conditions require attention.

In this tutorial, you can create an automated workflow that sends an **Outlook email alert** when your capacity approaches throttling conditions.


## Prerequisites

You must have access to an **existing non-trial Fabric capacity** where you're assigned the **Capacity Admin** role.

## Create an Activator

1. In Fabric, navigate to your workspace.  
2. Select **New item** then select **Activator**.  
3. A blank Activator canvas opens.

## Add a Trigger Based on Capacity Overview Events

### Select the event source

1. In the Activator canvas, select **Get data**.
2. In the search bar, type **Capacity Overview Events** and select **Connect**.

### Configure connection settings

1. For **Event type(s)**, select `Microsoft.Fabric.Capacity.Summary` and keep the **Event scope** as **By capacity**  
2. Select the **capacity** you want to monitor.
3. Under **Set filters**, select **+Filter** with the following parameters:
   - **Field:** `data.interactiveDelayThresholdPercentage`  
   - **Operator:** `Number greater than`  
   - **Value:** `20`
> [!NOTE]  
> The value **20%** is intentionally low for testing purposes. For production workloads, raise this value to the threshold meaningful for your operational policy (for example, 80% or 90%).

4. Select **Next** and **Connect**

This step connects the Activator to the real-time Capacity Summary events emitted by your selected capacity.

## Add a Rule

1. On the Select **New rule**.  
2. For the condition, select **On every value**.
3. For the action, select **Email**
4. In the message, type "Your Fabric capacity has exceeded the configured delay threshold: @interactiveDelayThresholdPercentage %"
> [!NOTE]  
> Type "@interactiveDelayThresholdPercentage" instead of copying it so the variable can be populated properly.

5. Select **Save and start**

Your real-time alerting workflow is now active.

## Observe the alert

Once your Activator is saved and started, it automatically listens for Capacity Overview Events from the selected capacity. When an event arrives where the interactiveDelayThresholdPercentage exceeds the threshold you configured, the Activator sends an email alert.

## Related content
- [Azure and Fabric events Overview](fabric-events-overview.md)
- [Explore Fabric Capacity Overview events](explore-fabric-capacity-overview-events.md)
- [Set alerts on Capacity Overview events](set-alerts-fabric-capacity-overview-events.md)
- [Get Capacity Overview events ](create-streams-fabric-capacity-overview-events.md)

