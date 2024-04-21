---
title: Real-Time Intelligence user flow 1- Discover and respond to events
description: Learn about Real-Time Intelligence tutorial user flow 1- Discover and respond to events in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
---

# User flow 1: Discover and respond to events

Real-Time Hub is used to discover and manage your streaming data in
Fabric. You can search a catalog of data streams that are actively
running in Fabric, choose a desired stream, and react to this data by
setting triggers.

This user flow shows how a Data Engineer or Data Analyst can discover
events in Real-Time Hub and trigger actions on this event data.

:::image type="content" source="media/user-flows/user-flow-1.png" alt-text="Schematic image showing the steps in user flow 1.":::

## Steps

1. Browse Real-Time Hub **Streams and tables** for available data streams.
1. Filter for a stream or table by searching for a particular term. You can search on the item, parent name, owner, or workspace.
1. View the details of the selected stream or table. You can see the stream information, related items, and profile of incoming and outgoing messages. \
1. Set a trigger on the event stream. Define the desired property, condition, and action to take.
1. Save this trigger as a Reflex item in Data Activator.

## Potential use cases

An analyst in a vehicle telematics company searches for events about their fleet of trucks. They create an alert that sends them an email whenever truck fuel pressure drops, so that they can schedule maintenance.

The manager of an e-commerce site tracks orders placed by each user to limit fraud/bot traffic. They set up a trigger looking for anomalies such as many orders being placed in quick succession, or orders placed by the same user from different locations at the same time, and start a workflow to verify the user's identity.

## Related content

\[\[links\]\]

-   Tutorial link
