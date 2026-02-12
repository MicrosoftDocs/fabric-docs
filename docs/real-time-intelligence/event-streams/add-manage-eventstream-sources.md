---
title: Add and Manage Eventstream Sources
description: Learn how to add and manage an event source in an eventstream.
ms.reviewer: spelluru
ms.author: zhenxilin
author: alexlzx
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 11/18/2024
ms.search.form: Source and Destination
---

# Add and manage an event source in an eventstream


After you create a Microsoft Fabric eventstream, you can connect it to various data sources and destinations.

An eventstream doesn't just allow you to stream data from Microsoft sources. It also supports ingestion from third-party platforms like Google Cloud and Amazon Kinesis with new messaging connectors. This expanded capability offers seamless integration of external data streams into Fabric. This integration provides greater flexibility and enables you to gain real-time insights from multiple sources.

In this article, you learn about the event sources that you can add to an eventstream.

## Prerequisites

- Access to a workspace with the **Fabric** capacity or **Fabric Trial** workspace type with Contributor or higher permissions.
- Prerequisites specific to each source that are documented in the following source-specific articles.

## Supported sources

Fabric eventstreams with enhanced capabilities support the following sources. Each article provides details and instructions for adding specific sources.

[!INCLUDE [supported-sources](./includes/supported-sources-enhanced.md)]

[!INCLUDE [sources-destinations-note](./includes/sources-destinations-note.md)]

## Related content

- [Create an eventstream in Microsoft Fabric](./create-manage-an-eventstream.md)
- [Add and manage a destination in an eventstream](./add-manage-eventstream-destinations.md)

