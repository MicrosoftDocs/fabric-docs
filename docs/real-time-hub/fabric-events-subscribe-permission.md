---
title: Subscribe permission for Azure and Fabric events
description: This article describes what permissions are required for subscribing to Fabric events.
ms.reviewer: robece
ms.topic: concept-article
ms.date: 03/03/2025
ai-usage: ai-assisted
---

# Subscribe permissions for Azure and Fabric events

The subscribe permission for Azure and Fabric events allows you to manage access to the event listeners, ensuring that only authorized users can subscribe to the events. The subscribe permissions are assessed during creation and for the lifetime of the event listener. This ensures that only authorized users can access and consume events. 

## Behavior
If the user doesn't have the subscribe permission, the user can't set up a consumer for the events. If the owner of the event listener loses the subscribe permission, the event listener enters a paused state, pausing the delivery of events to the consumer. While paused, the system retains events for up to 24 hours. If the permission issue is resolved within that period, event delivery resumes automatically.

For details on how to discover paused configurations and troubleshoot other reasons an event configuration can be paused, see [Paused event configurations in Real-Time hub](fabric-events-paused-state.md).

### Handle paused subscriptions
To address a subscription paused due to insufficient permissions, restore the subscribe permission for the owner, or assign the configuration to a user that has sufficient subscribe permission. After the condition is resolved, the configuration resumes automatically, but it might take a couple of hours.

## Subscribe permissions
The following list explores the needed permissions to subscribe to every event group.

### Azure blob storage events

To subscribe to Azure Blob Storage events in Microsoft Fabric, users need **Azure EventGrid Contributor** role in the Azure subscription, resource group, or Azure Data Lake Storage Gen2 account.

In Fabric, an Eventstream is created as the source of the Azure blob storage events in Fabric. A user needs to have at least **Contributor** role on the Fabric workspace where that Eventstream is created.

### Job events

To subscribe to Job events in Microsoft Fabric, users need **Read** permission on the source item.

### OneLake events

To subscribe to OneLake events in Microsoft Fabric, users need **SubscribeOneLakeEvents** permission on the source item.

### Workspace item events

To subscribe to workspace item events in Microsoft Fabric at the workspace level, you need **Read** permission on the target workspace. To subscribe to workspace item events in Microsoft Fabric at the tenant level, you need the **Global Administrator** role on the tenant.


## Related content

For more information, see the following articles: 
- [Explore Fabric Job events](explore-fabric-job-events.md).</br>
- [Explore Fabric OneLake events](explore-fabric-onelake-events.md).</br>
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md).</br>
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).
