---
title: Real-Time Intelligence tutorial user flow 5- trigger Fabric dataflows from the Real-time hub
description: Learn about Real-Time Intelligence tutorial user flow 5- Trigger Fabric dataflows from the Real-time hub in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to trigger Fabric dataflows from the Real-time hub.
---

# User flow 5: Trigger Fabric dataflows from the Real-time hub

By building alerts based on events from event streams, you can
seamlessly connect events with other Fabric artifacts. This capability
simplifies the creation of automated workflows and lets you swiftly
respond to data changes in both Fabric and Azure, resulting in reduced
response times to your event data.

This user flow shows how a data engineer or data analyst can trigger
Fabric dataflows based on events from the Real-time hub.

:::image type="content" source="media/user-flows/user-flow-5.png" alt-text="Schematic image showing the steps in user flow 5."  lightbox="media/user-flows/user-flow-5.png" border="false":::

## Steps

1. In the Real-time hub, select the Fabric events tab.
1. Select the type of event that you want to further explore. You can choose from Fabric Workspace Item events or Azure Blob Storage events.
1. You're taken to the L2 view, where detailed schemas of the system events are presented.
1. Create a Reflex alert to act on desired events. You can further filter on events to act only when the desired rules are met. Actions include sending event information to a Teams chat message, to an email, kicking off a Power Automate workflow, or running a data pipeline.
1. Save the Reflex item.

## Potential use cases

You can run a data pipeline every time there's new data or change in
data in your Azure Blob storage.

You can audit or monitor workspace level activity through Fabric system
events available in the Real-time hub. You can stream these events
to an event stream and send it to a custom application through the event
stream.


