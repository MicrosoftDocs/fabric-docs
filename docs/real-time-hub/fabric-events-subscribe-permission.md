---
title: Subscribe permission for Azure and Fabric events
description: This article describes what permissions are required for subscribing to Fabric events.
author: robece
ms.author: robece
ms.topic: concept-article
ms.custom:
ms.date: 03/03/2025
---

# Subscribe permissions for Azure and Fabric events

The subscribe permission for Azure and Fabric events allows you to manage access to the event listeners, ensuring that only authorized users can subscribe to the events. The subscribe permissions are assessed during creation and for the lifetime of the event listener. This ensures that only authorized users can access and consume events. 

## Behavior
If the user doesn't have the subscribe permission, the user isn't able to set up a consumer for the events. If the owner of the event listener loses the subscribe permission, the event listener gets in paused state, pausing the delivery of events to the consumer. The status of the subscription can be tracked in the Real-Time Hub. To discover the status of the subscription, follow these steps:
1.	In Microsoft Fabric, select **Real-Time** on the left navigation bar.
2.	Select the **Fabric events** page or the **Azure events** page.
3.	Select the event group that you're interested in to see all the consumers for this event group.
4.	The **Status** column shows Active/Paused status for each of the consumers for the events.
5.	Select **View details** from the actions to see the detailed error message that explains the exact reason for the Paused state.

### Handle paused subscriptions
To address paused subscriptions, you need to delete and recreate the subscription with a new user that has sufficient subscribe permission. This ensures that the subscription has a new owner with sufficient permissions.

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

To subscribe to workspace item events in Microsoft Fabric, users need **Read** permission at workspace level or TenantAdmin at tenant level.


## Related content

For more information, see the following articles: 
- [Explore Fabric Job events](explore-fabric-job-events.md).</br>
- [Explore Fabric OneLake events](explore-fabric-onelake-events.md).</br>
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md).</br>
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).
