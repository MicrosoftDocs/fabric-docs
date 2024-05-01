---
title: Real-Time Intelligence user flow 1- Discover and respond to events
description: Learn about the Real-Time Intelligence tutorial user flow 1 and how to discover and respond to events in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to discover and respond to events in Real-Time Intelligence.
---
# User flow 1: Discover and respond to events

Real-time hub is used to discover and manage your streaming data in Fabric. You can search a catalog of data streams that are actively running in Fabric, choose a desired stream, and react to this data by setting alerts.

This user flow shows how a Data Engineer or Data Analyst can discover events in Real-time hub and trigger actions on this event data.

:::image type="content" source="media/user-flows/user-flow-1.png" alt-text="Schematic image showing the steps in user flow 1."  lightbox="media/user-flows/user-flow-1.png" border="false":::

## Steps

1. Browse Real-time hub **Streams and tables** for available data streams.
1. Filter for a stream by searching for a particular term. You can search on the item, parent name, owner, or workspace.
1. View the details of the selected stream. You can see the stream information, related items, and profile of incoming and outgoing messages.
1. Set an alert on the event stream. Define the desired property, condition, and action to take.
1. Save this alert as a Reflex item in Data Activator.

## Potential use cases

An analyst in a vehicle telematics company searches for events about their fleet of trucks. They create an alert that sends them an email whenever truck fuel pressure drops, so that they can schedule maintenance.

The manager of an e-commerce site tracks orders placed by each user to limit fraud/bot traffic. They set up a alert looking for anomalies such as many orders being placed in quick succession, or orders placed by the same user from different locations at the same time, and start a workflow to verify the user's identity.

