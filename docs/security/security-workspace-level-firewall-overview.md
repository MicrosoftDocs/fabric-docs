---
title: About workspace IP firewall rules
description: Learn about using workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 01/27/2026

#customer intent: As a workspace admin, I want to lean about using workspace-level IP firewall rules on my workspace to restrict the IP addresses than can access my Fabric workspace.

---

# Protect workspaces by using IP firewall rules (Preview)

Workspace IP firewall rules let workspace admins control access to their Microsoft Fabric workspace by allowing connections only from trusted public IP addresses. By setting up a simple allow list, you can prevent unauthorized traffic from reaching your workspace. This protection reduces exposure to the public internet and adds an extra layer of protection on top of identity and role-based access controls.

This article provides an overview of workspace IP firewall rules. For configuration steps, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).

## Workspace-level IP firewall overview

Fabric provides network security at both tenant and workspace levels, including Microsoft Entra Conditional Access, tenant-level Private Link, and workspace-level Private Link. These features help secure access to workspaces and tenant resources. However, when a workspace is exposed over public endpoints, many organizations need a straightforward, IP-based method to limit access. This method complements the strong private connectivity and identity-based controls already in place.

Workspace IP firewall rules address this need by enabling administrators to define an IP allow list directly at the workspace level. This method provides a straightforward way to restrict inbound access to trusted office networks, VPN gateways, or partner IP ranges. It's useful when Private Link isn't feasible or when identity policies alone don't provide sufficient network-layer boundaries.

Workspace IP firewall rules work alongside existing Fabric security features to provide IP-based access restrictions. Because they operate at the workspace level, they don't require tenant-wide configuration changes or complex networking setups.

> [!NOTE]
> IP firewall rules apply only to inbound traffic. They don't govern or restrict outbound connections from the workspace.  

## How workspace-level IP firewall rules work

Workspace-level IP firewall rules restrict public internet access to a workspace by allowing only connections from specified IP addresses. When you configure these rules, only two types of connections can reach your workspace:

- Connections from the approved IP addresses listed in your firewall rules
- Connections from resources in an approved virtual network through workspace private endpoints
When you enable IP firewall rules, Fabric checks each client's public IP address against your configured allow list before granting access to workspace items. Only connections from approved IP addresses can access items such as Lakehouses, Warehouses, OneLake shortcuts, Notebooks, and Spark Job Definitions. All other connection attempts are denied.

The following diagram illustrates how workspace-level IP firewall rules work:

:::image type="content" source="media/security-workspace-level-firewall-overview/workspace-ip-firewall.png" alt-text="Diagram showing a workspace IP firewall configuration." lightbox="media/security-workspace-level-firewall-overview/workspace-ip-firewall.png":::

In this diagram: 

- Workspace A restricts inbound public access and can only be accessed from the allowed IP Address B.
- A user connecting from IP Address A is denied because the IP isn't on the allow list. 
- A user connecting from IP Address B gains access because the IP matches the workspace's inbound rules.

## Supported scenarios and limitations  

### Supported item types

Use workspace-level IP firewall rules to control access to the following Fabric item types:

- Lakehouse, SQL Endpoint, and Shortcuts
- Direct connections via OneLake endpoint
- Notebooks, Spark Job Definitions, and Environments
- Machine Learning Experiments and Machine Learning Models
- Pipelines
- Copy Jobs
- Mounted Data Factories
- Warehouses
- Dataflows Gen2 (CI/CD)
- Variable Libraries
- Mirrored Databases (Open Mirroring, Cosmos DB)
- Eventstreams
- Eventhouses

### Considerations and limitations

- All Fabric capacity types, including Trial capacity, support the workspace-level IP firewall rules feature.
- IP network rules only support public internet IP addresses. IP address ranges reserved for private networks (as defined in [RFC 1918](https://www.rfc-editor.org/rfc/rfc1918)) aren't supported. Private networks include addresses that start with 10, 172.16 to 172.31, and 192.168.
- You can configure up to 256 IP firewall rules per workspace.
- You can't add public IP addresses from VMs on virtual networks with private endpoints (at the tenant or workspace level) as IP firewall rules.
- Duplicate rule names aren't allowed, and spaces aren't allowed in IP addresses.
- To enable traffic from an on-premises network, identify the internet-facing IP addresses that your network uses. Contact your network administrator for assistance.
- If you're using Azure ExpressRoute from your premises, identify the NAT IP addresses used for Microsoft peering. Either the service provider or the customer provides the NAT IP addresses.
- If incorrect or missing allowed public IP addresses make the workspace inaccessible, use the API to update IP firewall rules.

## How IP firewall rules interact with other network security settings

Workspace IP firewall rules interact with your existing tenant and workspace network security settings, such as private links and public access restrictions. Understanding these interactions helps you configure and use IP firewall rules effectively. This section describes how different network configurations affect your ability to manage and access workspaces with IP firewall rules.

### Configuring workspace IP firewall rules

You can configure workspace IP firewall rules through the Fabric portal only if the workspace allows public access. The configuration method depends on your tenant-level settings. If public access is enabled at the tenant level, you can configure the rules directly through the portal. However, if your tenant requires a private link, you must access the workspace settings from a network connected through the tenant private link.

Regardless of these restrictions, API access remains available. Even with restrictive settings, you can always manage workspace IP firewall rules through the Fabric API by using the appropriate endpoint and network path.

The following table illustrates how various combinations of security configurations affect your ability to configure and access Microsoft Fabric workspaces.

#### Table 1: Configuring IP firewall rules in various network scenarios

For each scenario in this table, the user wants to access the IP firewall settings for the workspace either through the Fabric portal or the Fabric API (GET and SET operations).

| Scenario | Tenant private link | Tenant public internet | Workspace private link and public access allowed | Workspace private link (public access blocked) | Portal access to workspace IP firewall settings? | API access to workspace IP firewall settings? |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 1 | Yes | Blocked | Yes | - | Yes, from the network with tenant private link only | Yes, from the network with tenant private link using either api.fabric.microsoft.com or tenant-specific FQDN |
| 2 | Yes | Blocked | Yes | - | Yes, using network with tenant private link | Yes, from the network with tenant private link using either api.fabric.microsoft.com or tenant-specific FQDN |
| 3 | Yes | Blocked | - | Yes | No | Yes, from the network with tenant private link using either api.fabric.microsoft.com or tenant-specific FQDN |
| 4 | Yes | Allowed | Yes | - | Yes, via public internet or network with tenant private link | Yes, using api.fabric.microsoft.com over the public internet or network with tenant private link using tenant-specific FQDN |
| 5 | Yes | Allowed | - | Yes | No | Yes, using api.fabric.microsoft.com over the public internet or network with tenant private link using tenant-specific FQDN |
| 6 | No | N/A | Yes | - | Yes, via public internet | Yes, using api.fabric.microsoft.com over the public internet |
| 7 | No | N/A | - | Yes | No | Yes, using api.fabric.microsoft.com over the public internet |
| 8 | Yes | Blocked | - | - | Yes, using network with tenant private link | Yes, from the network with tenant private link using either api.fabric.microsoft.com or tenant-specific FQDN |
| 9 | Yes | Allowed | - | - | Yes, via public internet or network with tenant private link | Yes, using api.fabric.microsoft.com over the public internet or network with tenant private link using tenant-specific FQDN |
| 10 | No | N/A | - | - | Yes, via public internet | Yes, using api.fabric.microsoft.com over the public internet |

### Access behavior with IP firewall rules

After you configure IP firewall rules for a workspace, only connections from IP addresses in your allow list can access the workspace and its items. This restriction applies whether you're using the Fabric portal or the Fabric API. 

The following table shows how IP firewall rules affect workspace access when requests come from an allowed public IP address. The table covers different tenant-level security configurations and shows how access differs between the Fabric portal and the Fabric API. In any of these scenarios, the workspace can use IP firewall rules alone or with workspace private links.

#### Table 2: Access behavior with IP firewall rules configured

For each scenario in this table:

- The workspace has IP firewall rules configured with an allow list of public IP addresses. (Workspace private links could also be in use, but aren't relevant to the scenarios shown.)
- The user attempts to access the workspace and its items from an allowed IP address in the workspace's firewall rules.

| Tenant-level inbound configuration | Access from | Portal access to workspace and items? | API access to workspace and items? |
|---|:--:|:--:|:--:|
| Tenant Private Link: Enabled<br>Tenant Block Public Access: Enabled | Allowed IP | No | Yes, using api.fabric.microsoft.com |
| Tenant Private Link: Enabled<br>Tenant Block Public Access: Enabled | Allowed IP | No | Yes, using api.fabric.microsoft.com |
| Tenant Private Link: Enabled<br>Tenant Block Public Access: Disabled | Allowed IP | Yes | Yes, using api.fabric.microsoft.com |
| Tenant Private Link: Enabled<br>Tenant Block Public Access: Disabled | Allowed IP | Yes | Yes, using api.fabric.microsoft.com |
| Tenant Private Link: Disabled | Allowed IP | Yes | Yes, using api.fabric.microsoft.com |
| Tenant Private Link: Disabled | Allowed IP | Yes | Yes, using api.fabric.microsoft.com |

## Next steps

- To learn how to set up workspace IP firewall rules, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).
- To understand how inbound protection features work together, see [Inbound network protection in Microsoft Fabric](security-inbound-overview.md).
