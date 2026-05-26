---
title: Overview of workspace-level private links
description: Learn how workspace-level private links in Microsoft Fabric securely connect specific workspaces to your virtual network, block public internet access, and improve data protection.
ms.reviewer: karthikeyana
ms.topic: overview
ms.date: 05/26/2026

#customer intent: As a workspace admin, I want to configure Private Link on my workspace to prevent access to the workspace from the public internet.

---

# Workspace-level private links in Microsoft Fabric

Private links provide a secure, private connection between your virtual network and Microsoft Fabric. They block public internet access to your data and reduce the risk of unauthorized access or data breaches. Use Azure Private Link and Azure Networking private endpoints to send data traffic privately over Microsoft's backbone network infrastructure instead of going across the internet.

Fabric supports private links at both the tenant and workspace levels. [Tenant-level private links](security-private-links-overview.md) apply network restrictions across your entire tenant, securing all workspaces and resources. Workspace-level private links secure access to sensitive data or resources in specific workspaces without requiring tenant-wide changes or affecting other workspaces in your Fabric environment.

This article provides an overview of workspace-level private links in Microsoft Fabric. For detailed setup instructions, see [Set up and use workspace-level private links](security-workspace-level-private-links-set-up.md).

## Workspace-level private link overview

A workspace-level private link maps a workspace to a specific virtual network by using the Azure Private Link service. When you enable a private link, you can restrict public internet access to the workspace, so only resources within an approved virtual network (through a private endpoint) can access the workspace. The following diagram shows various implementations of workspace-level private links.

:::image type="content" source="./media/security-workspace-level-private-links-overview/workspace-level-private-links-scenario-intro-diagram.png" alt-text="Diagram illustrating workspace-level private link scenarios." lightbox="./media/security-workspace-level-private-links-overview/workspace-level-private-links-scenario-intro-diagram.png" border="false":::

In this diagram:

* **Workspace 1** restricts inbound public access. Machines in **VNet A** and **VNet B** can access it through workspace-level private links.

* **Workspace 2** restricts inbound public access. Machines in **VNet B** can access it through a workspace-level private link.

* **Workspace 3** is accessible from the public internet because it doesn't have a restricted inbound communication rule configured. Machines in **VNet B** can also access it through a workspace-level private link. This configuration allows both public and private access, which isn't recommended for production environments. Use this setup only for testing purposes, as it exposes the workspace to the public internet and doesn't provide full inbound network protection.

* **Workspace 4** is accessible from the public internet because it doesn't have a restricted inbound communication rule configured.

The diagram illustrates the following key points about workspace-level private links:

* When you configure a workspace to restrict inbound public access, it isn't accessible from the public internet. You can only access it through a workspace-level private link.

* A private link service has a one-to-one relationship with a workspace. As shown in the diagram, each workspace has its own private link service.

* A workspace's private link service can have multiple private endpoints. For example, both VNet A and VNet B connect to Workspace 1 through separate private endpoints. You can find the limit of the number of private endpoints in [Supported scenarios and limitations for workspace-level private links](./security-workspace-level-private-links-support.md).

* A virtual network can connect to multiple workspaces by creating separate private endpoints for each. For example, VNet B connects to Workspaces 1, 2, and 3 by using three private endpoints.

* You can restrict public access to a workspace with or without a private link. If you restrict public access and don't create a private link, the workspace is inaccessible from all networks. However, a workspace admin can use the communication policy API to modify the inbound access rule.

* You use a workspace-level private link to establish a private link connection to a specific workspace. You can't use it to connect to another workspace. In the configuration shown in the diagram, a connection to Workspace 2 from VNet A isn't allowed. On the other hand, connections to Workspaces 3 and 4 from VNet A are possible if VNet A allows outbound public access in the client network settings.

## Connecting to workspaces

To connect to a workspace by using a private link, use the workspace’s fully qualified domain name (FQDN).

You construct the workspace's FQDN from the workspace ID.

- `https://{workspaceId}.z{xy}.w.api.fabric.microsoft.com`
- `https://{workspaceId}.z{xy}.c.fabric.microsoft.com`
- `https://{workspaceId}.z{xy}.onelake.fabric.microsoft.com`
- `https://{workspaceId}.z{xy}.dfs.fabric.microsoft.com`
- `https://{workspaceId}.z{xy}.blob.fabric.microsoft.com`

Where:

- `{workspaceId}` is the workspace ID without dashes
- `{xy}` is the first two characters of the workspace ID

**Example:**

`https://1234567890abcdef1234567890abcdef.z12.w.api.fabric.microsoft.com`

In this example:

- `1234567890abcdef1234567890abcdef` is the workspace ID (without dashes)
- `12` corresponds to the first two characters of the workspace ID

### How to connect to a data warehouse

When connecting to a data warehouse, the connection string format is slightly different. You need to add `z{xy}` to the regular warehouse connection string found under SQL connection string. The FQDN for a data warehouse connection is as follows:

- `https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com`

Where:

- The GUIDs correspond to the tenant GUID and workspace GUID respectively.

This FQDN isn't available as part of the DNS configurations for the private endpoint.

### How to find the workspace ID

You can find the workspace ID in either of the following ways:

- In the Fabric portal, open the workspace and copy the value after `group=` in the URL
- Use the **List workspace** or **Get workspace** API

## How the workspace FQDN resolves in different environments

The workspace FQDN resolves to different IP addresses based on the environment and the private link configuration, as summarized in the following table.

| Environment | Workspace FQDN Resolution |
|--|--|
| No private link is set up | Resolves to a public IP address. |
| Tenant-level private link is set up | Resolves to a private IP address based on the tenant-level private link configuration. |
| Workspace-level private link is set up for the corresponding workspace | Resolves to a private IP address based on the workspace-level private link configuration.<br>**Note:** In this environment, the workspace FQDN can only connect to the specific workspace. It can't be used to access nonworkspace resources (such as capacities, other workspaces, or group workspaces). |
| Workspace-level private link is set up for the corresponding workspace and tenant-level private link is also set up in the same virtual network | Resolves to a private IP address based on the workspace-level private link configuration. |
| Workspace-level private link is set up for a different workspace | Resolves to a public IP address if fallback to the internet is enabled. See [Fallback to internet for Azure Private DNS zones - Azure DNS | Microsoft Learn](/azure/dns/private-dns-fallback) for details. It doesn't resolve correctly without enabling fallback to the internet. |

The workspace FQDN must be constructed correctly using the workspace object ID without dashes and the correct *xy* prefix (the first two characters of the workspace object ID). If the FQDN isn't formatted correctly, it doesn't resolve to the intended private IP address, and the workspace-level private link connection fails.

## Related content

* [Supported scenarios and limitations for workspace-level private links](./security-workspace-level-private-links-support.md)
* [About private links](./security-private-links-overview.md)
