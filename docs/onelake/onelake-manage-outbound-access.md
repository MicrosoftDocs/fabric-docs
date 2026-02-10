---
title: Manage outbound access from OneLake with outbound access protection
description: Outbound access protection in Fabric protects data by limiting outbound requests. 
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: concept-article
ms.custom:
ms.date: 01/20/2026
#customer intent: As a data admin, I want to learn how to protect my data by limiting outbound requests. As a data engineer, I want to learn how to work with my data, even when outbound access protection is turned on. 
---

# Limit outbound requests with outbound access protection (preview)

Outbound access protection protects data by limiting OneLake's outbound requests made through shortcuts and copy operations. 

## What is outbound access protection?

Outbound access protection helps ensure that data is shared securely within your network security perimeter. For example, data exfiltration protection solutions use outbound access protection controls to limit a malicious actor's ability to move large amounts of data to an untrusted external location. Outbound protections only limit requests that originate in the workspace and communicate with different workspace or location. A comprehensive network security solution also involves [inbound network protection](onelake-manage-inbound-access.md) through private links, combined with [data access controls](./security/get-started-security.md) to limit access to your data.

To learn more about managing outbound access protection, see [Workspace outbound access protection](/fabric/security/workspace-outbound-access-protection-overview).

## When does OneLake make outbound requests?  
  
There are two scenarios where OneLake makes an outbound request: shortcuts and copy operations. An outbound request is defined as any request made from within the workspace towards a location outside the workspace. Only the directionality of the call matters - both reads and writes to external locations can exfiltrate sensitive information to untrusted locations.

## Shortcuts

Shortcuts are objects in OneLake that point to other storage locations, which can be internal or external to OneLake. The location that a shortcut points to is known as the target path, and the location where the shortcut appears is the shortcut path. If the shortcut target is a different workspace or external storage location than the shortcut path, it's an outbound shortcut and subject to outbound access protection.
  
Outbound access protection doesn't restrict shortcuts with a source and target within the same workspace, because all OneLake calls remain within the boundary of the workspace.

:::image type="content" source="media/onelake-manage-outbound-access/outbound-access-protection-connector-diagram.png" alt-text="Diagram of a shortcut between workspaces using managed private endpoint and Private Link service." lightbox="media/onelake-manage-outbound-access/outbound-access-protection-connector-diagram.png" border="false":::

## Copying data within OneLake 

When you copy data between two OneLake workspaces using Azure Storage copy APIs, OneLake makes an outbound call from the source workspace to the target workspace. If outbound access protection is enabled on the source workspace, that outbound call is blocked, and the copy operation fails. To allow data movement, you must permit outbound requests from the source workspace to the destination workspace via the connector allow list or a managed private endpoint.

The following copy operation from Workspace A to Workspace B is blocked when outbound access protection is enabled, unless you approve outbound requests from Workspace A to Workspace B. As a reminder, AzCopy operations always following the format `azcopy copy <source> <destination>`.

Syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceB/LakehouseB.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```
Outbound access protection doesn't block copy operations that move data within a workspace.

## Copying data between Azure Storage and OneLake

When you copy data between Azure Storage and OneLake, the direction of the outbound requests **is reversed**. The destination account makes an **outbound call to the source account**. This behavior applies to copy operations made directly with Azure Storage [Copy Blob from URL](/rest/api/storageservices/copy-blob-from-url) and [Put Block from URL](/rest/api/storageservices/put-block-from-url) APIs. It also applies to managed copy experiences with [AzCopy](/azure/storage/common/storage-use-azcopy-v10) and Azure Storage Explorer. Outbound access protection restricts this outbound call from destination to source. **However, this means outbound access protection does not restrict your workspace from being the source of a copy operation, as no outbound call is made from the source workspace.**

For example, the following AzCopy sample moves data from the source Azure Storage account "source" to the destination lakehouse in OneLake. If Workspace A has outbound protection turned on, then the outbound call from Workspace A to the external Azure Storage account is blocked, and the data isn't loaded, unless the external Azure Storage account is permitted via the allow list.

Syntax
```azcopy
azcopy copy "https://source.blob.core.windows.net/myContainer/sales.csv" "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

However, in the following scenario, Workspace A is now the source of the copy operation, with the external Azure Storage account as the destination. In this scenario, **outbound access protection does not block this call**, as only inbound calls are made to Workspace A. To restrict these types of operations, see [Protect inbound traffic](/fabric/security/protect-inbound-traffic).

Syntax
```azcopy
azcopy copy "https://onelake.dfs.fabric.microsoft.com/WorkspaceA/LakehouseA.Lakehouse/Files/sales.csv" "https://source.blob.core.windows.net/myContainer/sales.csv"  --trusted-microsoft-suffixes "fabric.microsoft.com"
```

## Allowing requests to Fabric workspaces.

You can permit your Fabric workspace to make outbound requests to a different Fabric workspace by either [creating a data connection rule](../security/workspace-outbound-access-protection-allow-list-connector.md) via the Lakehouse connector, or creating a [managed private endpoint](../security/security-managed-private-endpoints-overview.md). When you allow list the target workspace or have an approved managed private endpoint, outbound requests are permitted from the source workspace to the target workspace even when outbound access is restricted.

For example, creating a data connection rule from Workspace A to Workspace B lets users read data in Workspace B through a shortcut, or copy data from Workspace B to Workspace A using AzCopy.

## Allowing requests to external locations

You can create and use shortcuts to external locations even when outbound access protection is enabled by [creating a data connection rule](../security/workspace-outbound-access-protection-allow-list-connector.md) via the appropriate connector for your shortcut target. When you allow list the target location, you can create shortcuts and read data via shortcuts from that location, even when outbound access protection is enabled.

You can also copy data from an external Azure Storage account when outbound access protection is enabled by creating a data connection rule for that storage account. Remember that OneLake makes an outbound request to an Azure Storage account when it's the source of a copy operation. Azure Storage supports both Blob and DFS endpoints, so be sure to use the right connector for your endpoint. If you allow listed using the Azure Data Lake Storage connector, be sure to use the `.dfs` endpoint in your AzCopy command, and the `.blob` endpoint if you allow listed via the Azure Blob Storage connector. 

## Related Content  
  
- [Fabric outbound access protection.](../security/security-managed-private-endpoints-create.md)
- [Fabric inbound access protection. ](../security/security-private-links-overview.md)
- [Manage inbound access to OneLake with workspace private links.](./onelake-manage-inbound-access.md) 
