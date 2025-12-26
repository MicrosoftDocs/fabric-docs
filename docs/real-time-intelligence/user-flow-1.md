---
title: Discover and respond to events
description: Learn about the Real-Time Intelligence tutorial user flow 1 and how to discover and respond to events in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: spelluru
author: spelluru
ms.topic: concept-article
ms.custom:
ms.date: 11/19/2024
ms.subservice: rti-core
ms.search.form: Get started
#customer intent: I want to learn how to discover and respond to events in Real-Time Intelligence.
---
# Discover and respond to events

Real-Time hub is used to discover and manage your streaming data in Fabric. You can search a catalog of data streams that are actively running in Fabric, choose a desired stream, and react to this data by setting alerts.

This user flow shows how a Data Engineer or Data Analyst can discover events in Real-Time hub and trigger actions on this event data.

:::image type="content" source="media/user-flows/user-flow-1.png" alt-text="Schematic image showing the steps in user flow 1." lightbox="media/user-flows/user-flow-1.png" border="false":::

## Steps

1. Browse  for available data streams: **streams and tables** in Real-Time hub. 
1. Filter for a stream by searching for a particular term. You can search on the stream or table name, parent name, owner, or workspace. 

    For detailed steps and information, see [Explore data streams](../real-time-hub/explore-data-streams.md).
1. View the details of the selected stream. You can see the stream information, related items, and profile of incoming and outgoing messages. For more information, see [View data stream details](../real-time-hub/view-data-stream-details.md).
1. Set an alert on the stream. Define the desired property, condition, and action to take. For detailed steps and information, see [Set alerts on streams](../real-time-hub/set-alerts-data-streams.md). Save this alert as a reflex item in Fabric [!INCLUDE [fabric-activator](includes/fabric-activator.md)].

## Potential use cases

This flow is useful for a variety of scenarios across all industries. Here are just a few examples:

* **Automotive:** An analyst in a vehicle telematics company searches for events about their fleet of trucks. They create an alert that sends them an email whenever truck fuel pressure drops, so that they can schedule maintenance.
* **Retail:** The manager of an e-commerce site tracks orders placed by each user to limit fraud/bot traffic. They set up an alert looking for anomalies such as many orders being placed in quick succession, or orders placed by the same user from different locations at the same time, and start a workflow to verify the user's identity.
* **Manufacturing:** A plant manager monitors the machine in a factory. They set up an alert to notify them about expected maintenance on each machine. They also use the data to improve quality and throughput.
* **Finance and Insurance:** A financial analyst uses real-time data for fraud detection. They also use the data to improve operational efficiency.
* **Energy and Utilities:** An energy company uses real-time data to monitor station data, and detect energy leakage. They also use the data for failure monitoring and predictive maintenance.
* **Logistics:** A logistics company uses real-time data to monitor the location of their vehicles and optimize routes. They also use the data for warehouse management and inventory tracking.
