---
title: Use tenant and workspace private links
description: Learn how tenant-level and workspace-level private links interact for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: overview
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how tenant-level and workspace-level private links interact, so I can securely control access to my Fabric workspaces within the same tenant.

---
# Use workspace-level and tenant-level private links in the same tenant

Microsoft Fabric supports both tenant-level and workspace-level private links to provide secure, private connectivity to your Fabric resources. [Tenant-level private links](./security-private-links-overview.md) provide broad access to Fabric resources across your entire tenant, while [workspace-level private links](./security-workspace-level-private-links-overview.md) offer granular control at the individual workspace level. Both of these private link types can be used within the same Fabric tenant to control access to workspaces and their resources. 

This article explains how they interact and how to use them together effectively.

## How tenant and workspace private links interact

When both tenant-level and workspace-level private links are configured in the same Fabric tenant, the way they work together depends on how public access is configured at the tenant and workspace level. Here are the key points to understand:

* Tenant-level private links only work with workspaces that allow connections from all networks. If a workspace blocks public access, tenant-level private links can't reach it, so it can only be accessed through a workspace-level private link.

* If public access is blocked at the tenant level, workspaces in this tenant can only be accessed via private links. If a workspace doesn't have an inbound communication rule set up and allows all networks by default, this workspace can only be accessed via a tenant-level private link.

## Example scenarios

The following diagram illustrates how access is controlled in different scenarios. 

:::image type="content" source="./media/security-tenant-workspace-private-links-same-tenant/network-architecture.png" alt-text="Diagram illustrating the network architecture for private links at the tenant and workspace level." border="false":::

In the diagram, the Fabric tenant is configured to block public access, and the two workspaces are configured with workspace-level private links.

* **Workspaces 1 and 2** are set to restrict inbound public access so they can only be accessed via a corresponding workspace-level private link.
* **Virtual network C (VNet C)** has tenant-level private link set up. The virtual machine in **VNet C** can connect to **Workspaces 3 and 4**, which are set to allow access from all networks. However, the virtual machine in **VNet C** isn’t able to connect to **Workspaces 1 and 2**.
* **Workspace 3** can be accessed via the configured workspace-level private link. It can also be accessed via a tenant-level private link because it allows access from all networks. Because the tenant blocks public access on the tenant level, **Workspace 3** isn't accessible from the public internet.
* **Workspace 4** can only be accessed via a tenant-level private link because it doesn't have a corresponding workspace-level private link set up.

