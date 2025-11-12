---
title: Workspace outbound access protection - scenarios
description: "This article describes workspace outbound access protection in several scenarios."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview #Don't change
ms.date: 10/02/2025

#customer intent: As a security administrator, I want to understand workspace outbound access protection scenarios so that I can configure secure data access and movement between workspaces and external sources.
---

# Workspace outbound access protection scenarios

Workspace outbound access protection helps safeguard your data by controlling outbound connections from your workspace to other workspaces and external sources. This article outlines common scenarios to illustrate how outbound access protection affects shortcuts, data copy operations, and notebook connectivity.

## Notebook

When outbound access protection is enabled on a workspace, notebooks can reference a destination only if a managed private endpoint is set up from the workspace to the destination.

| Source | Destination | Is a managed private endpoint set up? | Can the notebook/Spark job connect to the destination? |
|:--|:--|:--|:--|
| Notebook (Workspace A) | Lakehouse (Workspace B) | Yes, a cross-workspace managed private endpoint from A to B is set up in A | Yes |
| Notebook (Workspace A) | Lakehouse (Workspace B) | No | No |
| Notebook (Workspace A) | External ADLS G2/other data source | Yes, a managed private endpoint is set up from A to the external data source | Yes |
| Notebook (Workspace A) | External ADLS G2/other data source | No | No | 

## Shortcuts (preview)

When outbound access protection is enabled on a workspace, lakehouses in the workspace can only have shortcuts to lakehouses in another workspace if a cross-workspace managed private endpoint is set up between the workspaces.

| Source | Destination | Is a managed private endpoint set up? | Shortcut status |
|:-|:-|:-|:-|
| Lakehouse (Workspace A) | Lakehouse (Workspace B) | Yes, a cross-workspace managed private endpoint from A to B is set up in A. | Pass |
| Lakehouse (Workspace A) | Lakehouse (Workspace B) | No | Failed |
| Lakehouse (Workspace A) | External Azure Data Lake Storage (ADLS) G2/other data source | Doesn’t matter | Failed (external shortcuts aren't supported) |

If your shortcut links directly to another shortcut or contains another shortcut, outbound restrictions are evaluated sequentially at each shortcut. For example, suppose a shortcut in Workspace A points to a shortcut in Workspace B, which points to a shortcut in Workspace C. You must have a managed private endpoint from Workspace A to Workspace B and Workspace B to Workspace C for the entire shortcut chain to resolve. A managed private endpoint from Workspace A to Workspace C isn't required. 

## Copying data within OneLake (preview)

During data copy operations between two OneLake workspaces using Azure Storage copy APIs, OneLake makes an outbound call from the source workspace to the target workspace. If outbound access protection is enabled on the source workspace, this outbound call is blocked and the copy operation fails. To allow data movement, you must create a managed private endpoint from the source workspace to the target workspace. 

The following copy operation from Workspace A to Workspace B is blocked when outbound access protection is enabled, unless there's an approved managed private endpoint from Workspace A to Workspace B.

Syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceB/LakehouseB.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

## Copying data between Azure Storage and OneLake (preview)

During copy operations between Azure Storage and OneLake, the direction of the outbound requests is *reversed*. The destination account makes an *outbound call* to the source account. This behavior applies to copy operations made directly with Azure Storage [Copy Blob from URL](/rest/api/storageservices/copy-blob-from-url) and [Put Block from URL](/rest/api/storageservices/put-block-from-url) APIs. It also applies to operations managed through copy experiences like [AzCopy](/azure/storage/common/storage-use-azcopy-v10) and Azure Storage Explorer. 

Outbound access protection restricts the outbound calls made from the destination workspace to the source. If your workspace is the destination, outbound protection can prevent data from being copied in. However, if your workspace is the source of the copy operation, outbound protection doesn't block the transfer, since the source workspace doesn't initiate an outbound call.

For example, the following AzCopy sample moves data from the source Azure Storage account "source" to the destination lakehouse in OneLake. If Workspace A has outbound protection turned on, then this copy operation is blocked and the data isn't loaded. 

Syntax
```azcopy
azcopy copy "https://source.blob.core.windows.net/myContainer/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

By contrast, Workspace A in the following scenario is now the source of the copy operation. The external ADLS account is the destination. In this scenario, outbound access protection *doesn't block this call*, because only inbound calls are made to Workspace A. To restrict these types of operations, see [Protect inbound traffic](protect-inbound-traffic.md).

Syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://source.blob.core.windows.net/myContainer/sales.csv"  --trusted-microsoft-suffixes "fabric.microsoft.com"
```

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
