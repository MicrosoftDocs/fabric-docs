---
title: Subscribe permission for Fabric events
description: This article describes what permissions are required for subscribing to Fabric events.
author: robece
ms.author: robece
ms.topic: concept-article
ms.custom:
ms.date: 03/03/2025
---

# Subscribe permission for Fabric events

In Microsoft Fabric, various entities such as domains, workspaces, and items emit events to signal users about activities happening within these entities. Examples of such events include the creation or deletion of items within workspaces and data files getting created or deleted within Lakehouse items. These events are published within Fabric, allowing other items to subscribe to these events.

The "Subscribe" permission is introduced to manage access to these event subscriptions, ensuring that only authorized users can subscribe to the events. This new permission helps address the complexity and security implications of deriving permissions from existing control plane and data plane permissions.

### Job events

To subscribe to Job events in Microsoft Fabric, users need **Read** permission on the source item.

### OneLake events

To subscribe to OneLake events in Microsoft Fabric, users need **SubscribeOneLakeEvents** permission on the source item.

### Workspace item events

To subscribe to workspace item events in Microsoft Fabric, users need **Read** permission at workspace level or TenantAdmin at tenant level.

### Azure blob storage events

To subscribe to Azure Blob Storage events in Microsoft Fabric, users need **Azure EventGrid Contributor** role in the Azure subscription, resource group, or Azure Data Lake Storage Gen2 account.

You need to be at least **Contributor** in the Fabric workspace.

## Related content

For more information, see the following articles: 
- [Explore Fabric Job events](explore-fabric-job-events.md).</br>
- [Explore Fabric OneLake events](explore-fabric-onelake-events.md).</br>
- [Explore Fabric workspace item events](explore-fabric-workspace-item-events.md).</br>
- [Explore Azure blob storage events](explore-azure-blob-storage-events.md).