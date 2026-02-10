---
title: Workspace outbound access protection for OneLake
description: Learn how to configure Workspace Outbound Access Protection (OAP) to secure your OneLake resources in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.reviewer: mimart
ms.date: 01/20/2026
ms.topic: how-to
---

# Workspace outbound access protection for OneLake (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from OneLake items in your workspace to external data sources. When this feature is enabled, [Onelake items](#supported-onelake-item-types) are restricted from making outbound connections unless access is explicitly granted. 

## Understanding outbound access protection with OneLake

When outbound access protection is enabled, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to grant access only to approved destinations by configuring managed private endpoints or data connection rules.

## Configuring outbound access protection for OneLake

To configure outbound access protection for OneLake, follow the steps in [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md). After enabling outbound access protection, you can set up a managed private endpoint or use a data connection rule to allow outbound access to other workspaces or external resources as needed.

## Supported OneLake item types

The following OneLake item types and operations are supported with outbound access protection: 

- OneLake shortcuts
- OneLake copy operations (AzCopy, PutBlockFromURL, CopyBlobFromURL)

The following sections explain how outbound access protection affects shortcuts and data copy operations in your workspace.

### Shortcuts

When outbound access protection is enabled on a workspace, lakehouses in the workspace can only have shortcuts to lakehouses in another workspace if a cross-workspace managed private endpoint is set up between the workspaces.

| Source | Destination | Is the destination allowlisted? | Shortcut status |
|:-|:-|:-|:-|
| Lakehouse (Workspace A) | Lakehouse (Workspace B) | Yes, via managed private endpoint or connector allowlist. | Pass |
| Lakehouse (Workspace A) | Lakehouse (Workspace B) | No | Failed |
| Lakehouse (Workspace A) | External Azure Data Lake Storage (ADLS) G2/other data source | Yes | Permitted |

If your shortcut links directly to another shortcut or contains another shortcut, outbound restrictions are evaluated sequentially at each shortcut. For example, suppose a shortcut in Workspace A points to a shortcut in Workspace B, which points to a shortcut in Workspace C. You must approve the connection from Workspace A to Workspace B and Workspace B to Workspace C for the entire shortcut chain to resolve. Approving outbound requests from Workspace A to Workspace C isn't required. 

## Copying data within OneLake

When you copy data between two OneLake workspaces using Azure Storage copy APIs, OneLake makes an outbound call from the source workspace to the target workspace. If outbound access protection is enabled on the source workspace, that outbound call is blocked, and the copy operation fails. To allow data movement, you must permit outbound requests from the source workspace to the destination workspace via the connector allowlist or a managed private endpoint.

The following copy operation from Workspace A to Workspace B is blocked when outbound access protection is enabled, unless you approve outbound requests from Workspace A to Workspace B. As a reminder, AzCopy operations always following the format `azcopy copy <source> <destination>`.

Syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceB/LakehouseB.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

Outbound access protection doesn't block copy operations that move data within a workspace.

## Copying data between Azure Storage and OneLake

When you copy data between Azure Storage and OneLake, the direction of the outbound requests **is reversed**. The destination account makes an **outbound call to the source account**. This behavior applies to copy operations made directly with Azure Storage [Copy Blob from URL](/rest/api/storageservices/copy-blob-from-url) and [Put Block from URL](/rest/api/storageservices/put-block-from-url) APIs. It also applies to managed copy experiences with [AzCopy](/azure/storage/common/storage-use-azcopy-v10) and Azure Storage Explorer. Outbound access protection restricts this outbound call from destination to source. **However, this means outbound access protection does not restrict your workspace from being the source of a copy operation, as no outbound call is made from the source workspace.**

For example, the following AzCopy sample moves data from the source Azure Storage account "source" to the destination lakehouse in OneLake. If Workspace A has outbound protection turned on, then the outbound call from Workspace A to the external Azure Storage account is blocked, and the data isn't loaded, unless the external Azure Storage account is allowlisted.

Syntax
```azcopy
azcopy copy "https://source.blob.core.windows.net/myContainer/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

However, in the following scenario, Workspace A is now the source of the copy operation, with the external Azure Storage account as the destination. In this scenario, **outbound access protection does not block this call**, as only inbound calls are made to Workspace A. To restrict these types of operations, see [Protect inbound traffic](/fabric/security/protect-inbound-traffic).

Syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://source.blob.core.windows.net/myContainer/sales.csv"  --trusted-microsoft-suffixes "fabric.microsoft.com"
```

## Allowing requests to external locations

You can create and use shortcuts to external locations even when outbound access protection is enabled by [creating a data connection rule](../security/workspace-outbound-access-protection-allow-list-connector.md) via the appropriate connector for your shortcut target. When you allowlist the target location, you can create shortcuts and read data via shortcuts from that location, even when outbound access protection is enabled.

You can also copy data from an external Azure Storage account when outbound access protection is enabled by creating a data connection rule for that storage account. Remember that OneLake makes an outbound request to an Azure Storage account when it is the source of a copy operation.  Azure Storage supports both Blob and DFS endpoints, so be sure to use the right connector for your endpoint. If you allowlisted using the Azure Data Lake Storage connector, be sure to use the `.dfs` endpoint in your AzCopy command, and the `.blob` endpoint if you allowlisted via the Azure Blob Storage connector.  

## Considerations and limitations

* Outbound access protection doesn't protect from data exfiltration via inbound requests, such as GET requests made as part of external AzCopy operations to move data out of a workspace. To protect your data from unauthorized inbound requests, see [Protect inbound traffic](protect-inbound-traffic.md).
