---
title: Troubleshoot Vector Indexing And Customer Managed Keys For Cosmos DB
titleSuffix: Microsoft Fabric
description: Learn how to troubleshoot common issues with vector indexing and customer managed keys in Cosmos DB for Microsoft Fabric, including configuration errors and access problems.
author: markjbrown
ms.author: mjbrown
ms.topic: troubleshooting-general
ms.date: 10/27/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Troubleshoot vector indexing and customer managed keys for Cosmos DB in Microsoft Fabric (preview)

Cosmos DB in Fabric has support for customer managed keys (CMK) in Microsoft Fabric in *preview*. There are some caveats that users should be aware of when enabling CMK in a Microsoft Fabric workspace.

> [!IMPORTANT]
> During preview, if you intend to use CMK in any of your workspaces with Cosmos DB, this should be enabled **BEFORE** provisioning any Cosmos DB artifacts.

## Cannot enable CMK on a workspace with Cosmos DB artifacts

This scenario is not supported during preview. There are two workarounds to this scenario.

### Migrate to new workspace

Create a new workspace, enabled CMK on it, then create your Cosmos DB artifacts and migrate any existing Fabric artifacts and data into the new workspace.

### Delete the Cosmos DB artifacts

Deleted Cosmos DB artifacts are associated with a Fabric workspace for up to 8 days after they are deleted to allow a user to restore them to the workspace. If migrating to a new workspace is not possible or desirable, it is possible to delete all the Cosmos DB artifacts in the workspace, then wait 8 days until all restore points have expired. Once all restore points have expired you can enable CMK on the workspace, then provision new Cosmos DB artifacts within it.

## Cannot disable CMK on a workspace with Cosmos DB artifacts

This scenario is not supported during preview. There is one workaround to this scenario.

### Delete the Cosmos DB artifacts

Delete all Cosmos DB artifacts in a workspace, then disable CMK. However, it will not be possible to re-enable CMK within that workspace after a Cosmos DB artifact has been created.

## Related content

- [Customer managed keys for Cosmos DB in Microsoft Fabric](customer-managed-keys.md)
- [Customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md)
- [Secure Cosmos DB in Microsoft Fabric](security.md)
