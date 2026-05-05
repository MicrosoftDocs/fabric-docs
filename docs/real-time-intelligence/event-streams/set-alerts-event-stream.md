---
title: Set Alerts on Eventstream With Activator Destination
description: Learn how to set up alerts on an eventstream with an Activator destination. Follow step-by-step instructions to monitor conditions and trigger actions effectively.
#customer intent: As a data engineer, I want to set up alerts on an eventstream using an Activator destination so that I can monitor specific conditions and trigger actions automatically.
ms.reviewer: xujiang1
ms.topic: how-to
ms.date: 03/06/2026
ms.search.form: Source and Destination
---

# Set alert on an eventstream with Activator destination

This article shows you how to set up alerts on an eventstream. When you set an alert on an eventstream, an Activator destination is automatically added to the eventstream. 

## Set alert on an eventstream

1. If the eventstream is in **Edit** mode, select **Publish** on the ribbon to publish the eventstream.

   :::image type="content" source="./media/set-alerts-event-stream/publish-event-stream.png" alt-text="Screenshot of the Publish button on the ribbon." lightbox="./media/set-alerts-event-stream/publish-event-stream.png" border="true":::

1. Confirm that the eventstream is in **Live** mode. 

   :::image type="content" source="./media/set-alerts-event-stream/event-stream-live-view.png" alt-text="Screenshot of the Go live button on the ribbon." lightbox="./media/set-alerts-event-stream/event-stream-live-view.png" border="true":::

1. Select **Set alert** on the ribbon.

   :::image type="content" source="./media/set-alerts-event-stream/set-alert-ribbon.png" alt-text="Screenshot of the Set alert button on the ribbon." lightbox="./media/set-alerts-event-stream/set-alert-ribbon.png" border="true":::

[!INCLUDE [Add alert rule](includes/add-alert-rule.md)]

## Activation destination

You should see the Activator destination added to the eventstream with the alert rule you created.

:::image type="content" source="./media/set-alerts-event-stream/activator-destination.png" alt-text="Screenshot of the eventstream with an Activator destination added." lightbox="./media/set-alerts-event-stream/activator-destination.png" border="true":::

Here's an example of an alert you receive when the condition of the rule is met:

:::image type="content" source="./media/set-alerts-event-stream/alert-teams-message.png" alt-text="Screenshot of the alert message received in Teams." lightbox="./media/set-alerts-event-stream/alert-teams-message.png" border="true":::


[!INCLUDE [Manage rules](includes/manage-rules.md)]


## Related content

See the following articles:  

- [Add Activator destination to an eventstream](add-destination-activator.md)

