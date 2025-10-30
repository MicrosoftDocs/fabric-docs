---
title: Customer Managed Keys For Cosmos DB
titleSuffix: Microsoft Fabric
description: Learn how to configure and manage customer-managed keys (CMK) for Cosmos DB in Microsoft Fabric to enhance data security and maintain control over your encryption keys.
author: markjbrown
ms.author: mjbrown
ms.topic: concept-article
ms.date: 10/27/2025
appliesto:
- ✅ Cosmos DB in Fabric
---

# Customer managed keys for Cosmos DB in Microsoft Fabric (Preview)

Cosmos DB in Fabric has support for customer managed keys (CMK) in Microsoft Fabric in *preview*. To enable CMK in your Microsoft Fabric workspace, see [Customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md).

> [!IMPORTANT]
> During preview, if you intend to use CMK in any of your workspaces, this should be enabled **BEFORE** provisioning any Cosmos DB artifacts. The following limitations apply during this preview.
>
> - CMK cannot be enabled on a workspace after the first Cosmos DB artifact has been created.
> - CMK cannot be disabled on a workspace with a Cosmos DB artifact.

| Scenario | Supported | Comments |
|-|-|-|
| Enable CMK before creating first Cosmos DB artifact | Yes | Fully supported |
| Rotating keys on workspace | Yes | Fully supported |
| Enable CMK after creating a Cosmos DB artifact | No | Not supported during preview |
| Disable CMK on workspace with Cosmos DB artifact | No | Not supported during preview |
| Re-enable CMK on a workspace after adding a Cosmos DB artifact | No | Not supported during preview |

## Related content

- [Troubleshoot vector indexing and CMK for Cosmos DB in Microsoft Fabric](troubleshoot-vector-indexing-customer-managed-keys.md)
- [Customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md)
- [Secure Cosmos DB in Microsoft Fabric](security.md)
