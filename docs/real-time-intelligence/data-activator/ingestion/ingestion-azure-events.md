---
title: Activator ingestion of Azure events
description: Learn how Activator ingests streaming Azure Blob Storage events from Real-Time Hub, including event types and object mapping.
ms.topic: concept-article
ms.date: 02/27/2026
---

# Ingestion of Azure Events

This article explains how Activator ingests Azure events. Understanding this is useful for understanding how rules created from Azure events behave. For step-by-step instructions on creating a rule from Azure events, see [Set alerts on Azure Blob Storage events in Real-Time hub](../../../real-time-hub/set-alerts-azure-blob-storage-events.md).

## How it works

Azure events are a **streaming data source** for Activator. Currently, Activator supports subscribing to **Azure Blob Storage events**. When activity occurs in an Azure Blob Storage account, such as a blob being created, deleted, or renamed, then Azure emits an event. You can subscribe to these events in Real-Time Hub and route them into Activator, where your rules are evaluated as each event arrives.

You connect Azure Blob Storage events to Activator through Real-Time Hub. In Real-Time Hub, you subscribe to a storage account's events and add Activator as the destination. Once configured, Azure pushes matching events into Activator in near real time.

### Event types

When you create a connection, you choose which Blob Storage event types to subscribe to. The available event types are:

| Event type | Description |
|---|---|
| Microsoft.Storage.BlobCreated | A blob was created or replaced. |
| Microsoft.Storage.BlobDeleted | A blob was deleted. |
| Microsoft.Storage.BlobRenamed | A blob was renamed. |
| Microsoft.Storage.BlobTierChanged | A blob's access tier was changed. |
| Microsoft.Storage.DirectoryCreated | A directory was created. |
| Microsoft.Storage.DirectoryRenamed | A directory was renamed. |
| Microsoft.Storage.DirectoryDeleted | A directory was deleted. |
| Microsoft.Storage.AsyncOperationInitiated | An asynchronous operation (such as copying a blob) was initiated. |
| Microsoft.Storage.BlobInventoryPolicyCompleted | A blob inventory policy run completed. |
| Microsoft.Storage.LifecyclePolicyCompleted | A lifecycle management policy run completed. |

### How events map to Activator

Each incoming event includes fields that describe what happened, when it happened, and which resource was involved. Activator maps these fields as follows:

- **Timestamp**: Activator automatically uses the timestamp from each event as the event time.
- **Object ID** (optional): If you choose "on each event grouped by," you select one of three fields as the object ID. In most cases, **subject** is the right choice — it identifies the specific blob or directory that the event relates to (for example, `/blobServices/default/containers/mycontainer/blobs/myfile.csv`), which means Activator creates one object per blob and tracks events for each blob individually.

  The available fields are:
  - **subject**: the path to the specific blob or directory involved. This is the most common choice.
  - **source**: the storage account that emitted the event. Useful if you want to track activity at the storage-account level rather than per blob.
  - **type**: the event type (for example, `Microsoft.Storage.BlobCreated`). Rarely needed as an object ID.

  If you don't group events by a field, Activator treats all incoming events as a single ungrouped stream.
- **Property**: Activator surfaces fields from the event payload as available properties. When you create your rule, you choose which field to monitor as the property value.
