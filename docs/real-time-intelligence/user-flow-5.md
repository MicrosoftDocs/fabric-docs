---
title: Set alerts based on Fabric events in Real-Time hub
description: Describes a scenario that shows how you can create an alert based on Fabric events (Azure Blob Storage events and Fabric Workspace item events) in Real-Time hub.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Data Activator Real Time Hub Onramp
#customer intent: I want to learn how to set alerts based on Fabric events from the Real-Time hub.
---

# Set alerts based on Fabric events in Real-Time hub

You can create alerts based on Fabric events (Azure Blob Storage events and Fabric Workspace item events) from eventstreams. The alert can be configured with one of the following actions:

- Send an email
- Send a Teams message
- Run a Fabric item

By configuring the alert to run a Fabric item, you can seamlessly connect events with other Fabric artifacts. This capability simplifies the creation of automated workflows and lets you swiftly respond to data changes in both Fabric and Azure, resulting in reduced response times to your event data.

This user flow shows how a data engineer or data analyst can trigger Fabric dataflows based on events from the Real-Time hub.

:::image type="content" source="media/user-flows/user-flow-5.png" alt-text="Schematic image showing the steps in user flow 5." lightbox="media/user-flows/user-flow-5.png" border="false":::

## Steps

1. In Real-Time hub, select the **Fabric events** page.
1. Select the type of the event you want to explore. You can choose from Fabric Workspace item events or Azure Blob Storage events.
1. In the detail view, you see detailed schemas of the Fabric events are presented.

    For more information about browsing Fabric events, see [Azure Blob Storage events](../real-time-hub/get-azure-blob-storage-events.md) and [Fabric workspace item events](../real-time-hub/create-streams-fabric-workspace-item-events.md).
1. Create a reflex alert to act on desired events. You can further filter on events to act only when the desired rules are met. Actions include sending event information to a Teams chat message, to an email, [kicking off a Power Automate workflow, or running a data pipeline](data-activator/activator-trigger-fabric-items.md).
1. Save the reflex item.

    For more information on setting alerts for Fabric events, see [Set alerts on Azure Blob Storage events](../real-time-hub/set-alerts-azure-blob-storage-events.md) and [Set alerts on Fabric workspace item events](../real-time-hub/set-alerts-fabric-workspace-item-events.md).

## Potential use cases

You can run a data pipeline every time there's new data or change in data in your Azure Blob storage.

You can audit or monitor workspace level activity through Fabric events available in the Real-Time hub. You can stream these events to an eventstream and send it to a custom application through the eventstream.
