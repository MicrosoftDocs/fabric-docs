---
title: Overview of workspace-level private links
description: Learn how workspace-level private links in Microsoft Fabric securely connect specific workspaces to your virtual network, block public internet access, and improve data protection.
author: msmimart
ms.author: mimart
ms.reviewer: danzhang
ms.topic: overview
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to configure Private Link on my workspace to prevent access to the workspace from the public internet.

---

# Private links for Fabric workspaces (preview)

Private links provide a secure, private connection between your virtual network and Microsoft Fabric, blocking public internet access to your data and reducing the risk of unauthorized access or data breaches. Azure Private Link and Azure Networking private endpoints are used to send data traffic privately using Microsoft's backbone network infrastructure instead of going across the internet.

Fabric supports private links at both the tenant and workspace levels. [Tenant-level private links](security-private-links-overview.md) apply network restrictions across your entire tenant, securing all workspaces and resources. Workspace-level private links allow you to secure access to sensitive data or resources in specific workspaces without requiring tenant-wide changes or affecting other workspaces in your Fabric environment.

This article gives an overview of workspace-level private links in Microsoft Fabric. For detailed setup instructions, see [Set up and use workspace-level private links](security-workspace-level-private-links-set-up.md).

## Workspace-level private link overview

A workspace-level private link maps a workspace to a specific virtual network using the Azure Private Link service. When a private link is enabled, public internet access to the workspace can be restricted, ensuring that only resources within an approved virtual network (via a managed private endpoint) can access the workspace. The following diagram illustrates various implementations of workspace-level private links.

:::image type="content" source="./media/security-workspace-level-private-links-overview/workspace-level-private-links-scenario-intro-diagram.png" alt-text="Diagram illustrating workspace-level private link scenarios." lightbox="./media/security-workspace-level-private-links-overview/workspace-level-private-links-scenario-intro-diagram.png" border="false":::

In this diagram:

* **Workspace 1** restricts inbound public access and can only be accessed from machines in **VNet A** and **VNet B** via workspace-level private links.

* **Workspace 2** restricts inbound public access and can only be accessed from machines in **VNet B** via a workspace-level private link.

* **Workspace 3** can be accessed from the public internet because it doesn't have a restricted inbound communication rule configured. It can also be accessed from **VNet A** via a workspace-level private link. This configuration allows both public and private access, which isn't recommended for production environments. This setup should be used only for testing purposes, as it exposes the workspace to the public internet and doesn't provide full inbound network protection.

* **Workspace 4** can be accessed from the public internet because it doesn't have a restricted inbound communication rule configured.

The diagram illustrates the following key points about workspace-level private links:

* When a workspace is configured to restrict inbound public access, it isn't accessible from the public internet. It can only be accessed through a workspace-level private link.

* A private link service has a one-to-one relationship with a workspace. As shown in the diagram, each workspace has its own private link service.

* A workspace's private link service can have multiple private endpoints. For example, both VNet A and VNet B connect to Workspace 1 via separate private endpoints. The limit of the number of private endpoints can be found in [Supported scenarios and limitations for workspace-level private links](./security-workspace-level-private-links-support.md)

* A virtual network can connect to multiple workspaces by creating separate private endpoints for each. For example, VNet B connects to Workspaces 1, 2, and 3 using three private endpoints.

* You can restrict public access to a workspace with or without a private link. If public access is restricted and no private link exists, the workspace is inaccessible from all networks. However, a workspace admin can use the communication policy API to modify the inbound access rule.

* A workspace-level private link is used to establish a private link connection to a specific workspace. It can't be used to connect to another workspace. In the configuration shown in the diagram, a connection to Workspace 2 from VNet A isn't allowed. On the other hand, connections to Workspaces 3 and 4 from VNet A are possible if VNet A allows outbound public access in the client network settings.
<!-->
> [!NOTE]
> To learn how to connect from one workspace to another, see [cross-workspace communication](./security-cross-workspace-communication.md).
-->

## Connecting to workspaces

When connecting to a workspace, you need to use the workspace fully qualified domain name (FQDN). The workspace FQDN is constructed based on the workspace ID and the first two characters of the workspace object ID. The following are the formats for the workspace FQDN. The *workspaceid* is the workspace object ID without dashes, and *xy* represents the first two characters of the workspace object ID. Find the workspace object ID in the URL after group when opening the workspace page from Fabric portal. You can also get workspace FQDN by running List workspace API or Get workspace API. 

* `https://{workspaceid}.z{xy}.w.api.fabric.microsoft.com`
* `https://{workspaceid}.z{xy}.onelake.fabric.microsoft.com` 
* `https://{workspaceid}.z{xy}.dfs.fabric.microsoft.com`
* `https://{workspaceid}.z{xy}.blob.fabric.microsoft.com`
* `https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com` *that is, add z{xy} to the regular warehouse connection string.

## How the workspace FQDN resolves in different environments

The workspace FQDN resolves to different IP addresses based on the environment and the Private Link configuration, as summarized in the following table.

| Environment | Workspace FQDN Resolution |
|--|--|
| No Private Link is set up | Resolves to a public IP address. |
| Tenant-level Private Link is set up | Resolves to a private IP address based on the tenant-level Private Link configuration. |
| Workspace-level private link is set up for the corresponding workspace | Resolves to a private IP address based on the workspace-level private link configuration.<br>**Note:** In this environment, the workspace FQDN can only connect to the specific workspace. It can't be used to access nonworkspace resources (such as capacities, other workspaces, or group workspaces). |
| Workspace-level private link is set up for the corresponding workspace and tenant-level private link is also set up in the same virtual network | Resolves to a private IP address based on the workspace-level private link configuration. |
| Workspace-level private link is set up for a different workspace | Resolves to a public IP address if fallback to the internet is enabled. See [Fallback to internet for Azure Private DNS zones - Azure DNS | Microsoft Learn](/azure/dns/private-dns-fallback) for details. It doesn't resolve correctly without enabling fallback to the internet. |

The workspace FQDN must be constructed correctly using the workspace object ID without dashes and the correct *xy* prefix (the first two characters of the workspace object ID). If the FQDN isn't formatted correctly, it doesn't resolve to the intended private IP address, and the workspace-level private link connection fails.

## Related content

* [Supported scenarios and limitations for workspace-level private links](./security-workspace-level-private-links-support.md)
* [About private links](./security-private-links-overview.md)
* [Microsoft Fabric multi-workspace APIs](./security-fabric-multi-workspace-api-overview.md)
