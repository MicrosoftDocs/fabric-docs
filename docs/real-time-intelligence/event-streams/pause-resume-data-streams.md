---
title: Pause and resume data streams
description: Learn how to pause and resume data streams.
ms.reviewer: spelluru
ms.author: xujiang1
author: wenyang
ms.topic: how-to
ms.date: 05/09/2024
ms.search.form: Pause and Resume
---

# Pause and resume data streams (preview)

Once your eventstream is set up, you can take full command of your data streams by pausing and resuming data flow from different sources and destinations within Eventstream. This guide offers instructions on utilizing the Pause and Resume feature to fulfill your data management requirements.

## Prerequisites

Before you start, you must complete the following prerequisites:

- Get access to a **premium workspace** with **Contributor** or above permissions where your eventstream is located.
- Get access to a **premium workspace** with **Contributor** or above permissions where your lakehouse is located.

## Activating or deactivating specific nodes using the switch toggle

For nodes that support pause and resume functionality, you can easily control their data flow by using the toggle switch. Locate the node you want to manage and toggle the switch to activate or deactivate its data streaming in or out of Eventstream. If a node does not currently support pause and resume functionality, the toggle switch is disabled.

   :::image type="content" source="./media/pause-resume-data-streams/pause-resume-switch-toggle.png" alt-text="Screenshot showing switch toggle on the node and details." lightbox="./media/pause-resume-data-streams/pause-resume-switch-toggle.png" :::

### Supported node types for pause and resume

Here are the node types that currently support pause and resume:

| Node Type | Supported Nodes |
| --- | --- |
| Source | Sample data, Azure Event Hubs, Azure IoT Hub |
| Destination | Lakehouse, KQL Database (Event processing before ingestion) 

## Activating or deactivating all nodes simultaneously

Eventstream also allows you to manage all nodes at once by activating or deactivating them simultaneously, ensures efficient management of data flow within Eventstream. To pause or resume all data traffic, select on the **Activate All** or **Deactivate All** option. This action only affects nodes that support pause and resume. For nodes that do not currently support it, selecting **Activate All** or **Deactivate All** has no effect on their status.

:::image type="content" source="./media/pause-resume-data-streams/active-deactive-all.png" alt-text="Screenshot showing how to active or deactive all nodes at simultaneously." lightbox="./media/pause-resume-data-streams/active-deactive-all.png" :::

## Related content

- [Add and manage destinations in an eventstream](./add-manage-eventstream-destinations.md).
- [Add and manage an event in an eventstream](./add-manage-eventstream-sources.md).
