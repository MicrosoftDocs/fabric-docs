---
title: Azure Blob Storage connector - prerequisites
description: This file contains prerequisites for configuring Azure Blob Storage connector for Fabric event streams and Real-Time
ms.reviewer: xujiang1
ms.topic: include
ms.date: 03/31/2026
---

Fabric event streams support the following Blob Storage event types:

|Event name|Description|
|-------|------------|
|Microsoft.Storage.BlobCreated|Triggered when a blob is created or replaced.|
|Microsoft.Storage.BlobDeleted                    |Triggered when a blob is deleted.|
|Microsoft.Storage.BlobRenamed                    |Triggered when a blob is renamed.|
|Microsoft.Storage.BlobTierChanged                |Triggered when the blob access tier is changed.|
|Microsoft.Storage.DirectoryCreated               |Triggered when a directory is created.|
|Microsoft.Storage.DirectoryRenamed               |Triggered when a directory is renamed.|
|Microsoft.Storage.AsyncOperationInitiated        |Triggered when an operation involving moving or copying data from the archive to hot or cool tiers is initiated.|
|Microsoft.Storage.DirectoryDeleted               |Triggered when a directory is deleted.|
|Microsoft.Storage.BlobInventoryPolicyCompleted   |Triggered when the inventory run completes for a rule that defines an inventory policy.|
|Microsoft.Storage.LifecyclePolicyCompleted       |Triggered when the actions defined by a lifecycle management policy are done.|

For more information about available event types, see [Azure Blob Storage as Event Grid source](/azure/event-grid/event-schema-blob-storage).

> [!NOTE]
> Azure Blob Storage events connector is **not supported** in the following workspace capacity regions: Central US, Germany West Central, South-Central US, West US2, West US3, West India.

## Unstreamed vs. streamed events

Azure Blob Storage events are discrete events with clear start and end points. Fabric Real-Time hubs can capture these events in two formats:

- **Unstreamed events.** These events are represented in their raw format as discrete events. If Azure Blob Storage events aren't streamed in an eventstream, they're not directly connected to the eventstream, and the default stream isn't created.

  This status indicates that the events are linked to Fabric events in the Real-Time hub and awaiting further action. Actions include creating alerts with Fabric Activator that execute Fabric job items like Pipeline or Notebook in the **Fabric events** tab in Real-Time hub.

  :::image type="content" border="true" source="../../media/add-source-azure-blob-storage/unstreamed.png" lightbox="../../media/add-source-azure-blob-storage/unstreamed.png" alt-text="A screenshot showing unstreamed Azure Blob Storage events with the button to Stream events.":::

- **Streamed events.** These events are converted to continuous events, enabling real-time transformation and routing to various destinations in Fabric for further analysis. In an eventstream, selecting the **Stream events** button on an unstreamed Azure Blob Storage source converts the events into continuous events. The eventstream is then assigned a default stream, letting you add operations and route it to other destinations in Fabric.

  :::image type="content" border="true" source="../../media/add-source-azure-blob-storage/streamed.png" lightbox="../../media/add-source-azure-blob-storage/streamed.png" alt-text="A screenshot showing streamed Azure Blob Storage events in an eventstream.":::

## Prerequisites

- Access to a workspace in the Fabric capacity license mode (or) the Trial license mode with Contributor or higher permissions. 
- Access to an Azure Blob Storage **StorageV2 (general purpose v2)**, **BlockBlobStorage**, or **BlobStorage** account. The **Storage (general purpose v1)** storage type doesn't support integration with Fabric event streams.