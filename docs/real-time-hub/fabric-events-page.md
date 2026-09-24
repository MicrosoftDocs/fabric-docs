---
title: Explore the Fabric Events Page in Real-Time Hub
description: Explore the Fabric events page in Fabric Real-Time hub to discover workspace events, create eventstreams, and configure alerts and notifications.
#customer intent: As a Fabric user, I want to understand the Fabric events page so that I can subscribe and respond to events from Fabric workspaces.
author: spelluru
ms.author: spelluru
ms.reviewer: majia
ms.topic: concept-article
ms.custom: doc-kit-assisted
ms.date: 07/20/2026
ai-usage: ai-assisted
---

# Explore the Fabric events page in Fabric Real-Time hub

Fabric events are system events that Microsoft Fabric generates automatically to signal changes to items in your workspaces, such as a job completing or a OneLake file being created. Unlike business events, which you define to capture business context, Fabric events come directly from the platform so you can react to what's happening inside Fabric.

On the **Fabric events** page, you discover the Fabric events generated in Microsoft Fabric that you can access. You can subscribe to them by creating streams. After you subscribe to an event, you can route it to downstream destinations or configure alerts that send notifications through email, Teams, and other supported channels when an event occurs.

:::image type="content" source="./media/get-started-real-time-hub/fabric-events-page.png" alt-text="Screenshot that shows the Fabric events page in Fabric Real-Time hub." lightbox="./media/get-started-real-time-hub/fabric-events-page.png":::

For more information about Fabric events, see the following sections of the documentation:

- [Explore Fabric events in Real-Time hub](explore-fabric-events.md) 
- [Consume Fabric events in Real-Time hub](set-alerts-anomaly-detection.md).


## Next step

Go to the [Azure events page](azure-events-page.md) to learn how to subscribe and respond to events from Azure services.

## Related content

- [Create streams for Fabric workspace item events](create-streams-fabric-workspace-item-events.md)
- [Explore Fabric events in Real-Time hub](explore-fabric-events.md)
- [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md)
