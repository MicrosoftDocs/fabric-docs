---
title: Discover streaming sources from Microsoft
description: Learn about Real-Time Intelligence tutorial user flow 3- Discover streaming sources in Microsoft Fabric.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to discover streaming sources in Real-Time Intelligence.
---

# Discover streaming sources from Microsoft

The Real-Time hub is used to discover and manage your streaming data in Fabric. If you're already using various Microsoft products that generate streaming data, you can easily bring these streams into Fabric without the need for complex configurations.

This user flow shows how an analyst can easily discover and use streaming data from Microsoft and Azure sources in the Real-Time hub.

:::image type="content" source="media/user-flows/user-flow-3.png" alt-text="Schematic image showing the steps in user flow 3." lightbox="media/user-flows/user-flow-3.png" border="false":::

## Steps

1. Browse to the Real-Time hub and select the **Microsoft sources** tab.
1. You see all the existing Microsoft sources that are generating events. Filter for the specific item that you want to bring into Fabric
1. A wizard opens with most fields prepopulated. Validate these fields and select **Ok.**

    For detailed information and steps, use links from Microsoft sources section in the [Get events from supported sources](supported-sources.md) article.
1. Define data processing operations that transform the streaming data.
1. Add a destination to the stream.
1. Your Microsoft-based streaming data begins flowing into Fabric.

    For detailed information and steps, see [Transformation operations](route-events-based-on-content#supported-operations) and [Add and manage destination](add-manage-eventstream-destinations.md). 

## Potential use cases

You have streaming data in Azure Event Hubs. In the **Microsoft sources** tab, you select the specific event hub they want to use, and validate the prepopulated information, then a new eventstream is created and streaming data from this event hub starts to flow in.

Change Data Capture (CDC) is a crucial feature in the realm of database management. It enables you to track and record changes in their database, which can be used for various purposes such as database reconstruction, auditing, and more. In the **Microsoft sources** tab, you can find options for PostgreSQL and Azure SQL, among many others, allowing them to configure and connect their database’s CDC to Fabric. This integration facilitates a seamless flow of data changes into Fabric as streams.

