---
title: Real-Time Intelligence tutorial user flow 3- Discover streaming sources from Microsoft
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

# User flow 3: Discover streaming sources from Microsoft

The Real-Time Hub is used to discover and manage your streaming data in Fabric. If you're already using various Microsoft products that generate streaming data, you can easily bring these streams into Fabric without the need for complex configurations.

This user flow shows how an analyst can easily discover and use streaming data from Microsoft and Azure sources in the Real-Time Hub.

:::image type="content" source="media/user-flows/user-flow-3.png" alt-text="Schematic image showing the steps in user flow 3." lightbox="media/user-flows/user-flow-3.png" border="false":::

## Steps

1. Browse to the Real-Time Hub and select the **Microsoft sources** tab.
1. You see all the existing Microsoft sources that are generating events. Filter for the specific item that you want to bring into Fabric
1. A wizard opens with most fields prepopulated. Validate these fields and select **Ok.**
1. Define data processing operations that transform the streaming data.
1. Add a destination to the stream.
1. Your Microsoft-based streaming data begins flowing into Fabric.

## Potential use cases

Customers have streaming data in Azure Event Hubs. In the **Microsoft sources** tab, customers select the specific Eventhub they want to use, and validate the prepopulated information, then a new Eventstream is created and streaming data from this Eventhub starts to flow in.

Change Data Capture (CDC) is a crucial feature in the realm of database management. It enables customers to track and record changes in their database, which can be used for various purposes such as database reconstruction, auditing, and more. In the **Microsoft sources** tab, customers can find options for Postgres SQL and Azure SQL, allowing them to configure and connect their database’s CDC to Fabric. This integration facilitates a seamless flow of data changes into Fabric as streams.

## Related content

-   Tutorial link
