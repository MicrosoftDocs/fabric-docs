---
title: Trigger Fabric dataflows from the Real-Time hub
description: Learn about Real-Time Intelligence tutorial user flow 5- Trigger Fabric dataflows from the Real-Time hub in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to trigger Fabric dataflows from the Real-Time hub.
---

# Trigger Fabric dataflows from the Real-Time hub

By building alerts based on events from event streams, you can seamlessly connect events with other Fabric artifacts. This capability simplifies the creation of automated workflows and lets you swiftly respond to data changes in both Fabric and Azure, resulting in reduced response times to your event data.

This user flow shows how a data engineer or data analyst can trigger Fabric dataflows based on events from the Real-Time hub.

:::image type="content" source="media/user-flows/user-flow-5.png" alt-text="Schematic image showing the steps in user flow 5." lightbox="media/user-flows/user-flow-5.png" border="false":::

## Steps

1. In Real-Time hub, select the **Fabric events** tab.
1. Select the type of the event you want to explore. You can choose from Fabric Workspace item events or Azure Blob Storage events.
1. In the detail view, you see detailed schemas of the system events are presented.

    For more information about browsing Fabric events, see [Azure Blob Storage events](get-azure-blob-storage-events.md) and [Fabric workspace item events](create-streams-fabric-workspace-item-events.md).
1. Create a Reflex alert to act on desired events. You can further filter on events to act only when the desired rules are met. Actions include sending event information to a Teams chat message, to an email, kicking off a Power Automate workflow, or running a data pipeline.
1. Save the Reflex item.

    For more information on setting alerts for Fabric events, see [Set alerts on Azure Blob Storage events](set-alerts-azure-blob-storage-events.md) and [Set alerts on Fabric workspace item events](set-alerts-fabric-workspace-item-events.md).

## Potential use cases

You can run a data pipeline every time there's new data or change in data in your Azure Blob storage.

You can audit or monitor workspace level activity through Fabric system events available in the Real-Time hub. You can stream these events to an eventstream and send it to a custom application through the eventstream.


