---
title: Workspace outbound access protection - scenarios
description: "This article describes workspace outbound access protection in several scenarios."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview #Don't change
ms.date: 08/13/2025

#customer intent: As a <role>, I want <what> so that <why>.

---

# Workspace outbound access protection - scenarios

Below are typical scenarios for the Workspace Outbound Access Protection (OAP) feature. Use these examples to understand how different items behave when OAP is enabled.

## Shortcuts

When OAP is enabled on a workspace, lakehouses in the workspace can only have shortcuts to lakehouses in a another workspace if a cross-workspace managed private endpoint is set up between the workspaces.

| Source                    | Destination               | Is MPE set up?                                       | Shortcut status                           |
|:---------------------------|:----------------------------|:--------------------------------------------------|:---------------------------------------------|
| Lakehouse (Workspace A)   | Lakehouse (Workspace B)    | Yes, a cross-workspace MPE from A to B is set up in A. | Pass                                        |
| Lakehouse (Workspace A)   | Lakehouse (Workspace B)    | No                                               | Failed                                      |
| Lakehouse (Workspace A)   | External ADLS G2/other data source | Doesn’t matter                           | Failed (external shortcuts aren't supported) |

If your shortcut links directly to, or contains, another shortuct, outbound restrictions are evaluated sequentially at each shortcut.  For example, if a shortcut in Workspace A points to a shortcut in Workspace B, which points to a shortcut in Workspace C, then you must have a managed private endpoint from Workspace A to Workspace B and Workspace B to Workspace C for the entire shortcut chain to resolve.  A managed private endpoint from Workspace A to Workspace C is not required.  

## Copying data within OneLake 

When copying data between two OneLake workspaces using Azure Storage copy APIs, OneLake makes an outbound call from the source workspace to the target workspace.  If outbound access protection is enabled on the source workspace, then that outbound call will be blocked, and the copy operation will fail.  To allow data movement, you must create a managed private endpoint from the source workspace to the target workspace. 

The following copy operation from Workspace A to Workspace B is blocked when outbound access protection is enabled, unless there is an approved managed private endpoint from Workspace A to Workspace B.

syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceB/LakehouseB.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

## Copying data between Azure Storage and OneLake

When copying data between Azure Storage and OneLake, the direction of the outbound requests **is reversed**.  This means when copying data between Azure Storage and OneLake, **the destination account makes an outbound call to the source account**.  This applies to copy operations made directly with Azure Storage [Copy Blob from URL](/rest/api/storageservices/copy-blob-from-url) and [Put Block from URL](/rest/api/storageservices/put-block-from-url) APIs, as well as through managed copy experiences like [AzCopy](/azure/storage/common/storage-use-azcopy-v10) and Azure Storage Explorer. This outbound call, from destination to source, is restricted by outbound access protection. **However, this means outbound access protection does not restrict your workspace from being the source of a copy operation, as no outbound call is made from the source workspace.** 

For example, the following AzCopy sample moves data from the source Azure Storage account "source" to the destination lakehouse in OneLake.  If Workspace A has outbound protection turned on, then this copy operation is blocked and the data is not loaded. 

syntax
```azcopy
azcopy copy "https://source.blob.core.windows.net/myContainer/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

However, in the following scenario, Workspace A is now the source of the copy operation, with the external ADLS account as the destination. In this scenario, **outbound access protection does not block this call**, as only inbound calls are made to Workspace A.  To restrict these types of perations, see [Protect inbound traffic](protect-inbound-traffic.md).

syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://source.blob.core.windows.net/myContainer/sales.csv"  --trusted-microsoft-suffixes "fabric.microsoft.com"
```

## Notebook

When OAP is enabled on a workspace, notebooks can reference a destination only if there a managed private endpoint is set up from the workspace to the destination.

| Source                | Destination                     | Is MPE set up?                                                       | Can the notebook/Spark job connect to the destination? |
|:-----------------------|:----------------------------------|:----------------------------------------------------------------------|:-------------------------------------------------|
| Notebook (Workspace A) | Lakehouse (Workspace B)         | Yes, a cross-workspace MPE from A to B is set up in A.                     | Yes                                             |
| Notebook (Workspace A) | Lakehouse (Workspace B)         | No                                                                   | No                                              |
| Notebook (Workspace A) | External ADLS G2/other data source | Yes, an MPE has been set up from A to the external data source. | Yes                                             |
| Notebook (Workspace A) | External ADLS G2/other data source | No                                                                   | No                                              |

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
