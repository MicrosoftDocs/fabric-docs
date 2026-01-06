---
title: About workspace IP firewall rules
description: Learn about using use workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 01/06/2026

#customer intent: As a workspace admin, I want to lean about using workspace-level IP firewall rules on my workspace to restrict the IP addresses than can access my Fabric workspace.

---

# Protect workspaces with IP firewall rules (Preview)

Workspace IP firewall rules let workspace admins control access to their Microsoft Fabric workspace by allowing connections only from trusted public IP addresses. By setting up a simple allow list, you can prevent unauthorized traffic from reaching your workspace. This protection reduces exposure to the public internet and adds an extra layer of protection on top of identity and role-based access controls.

This article provides an overview of workspace IP firewall rules. For configuration steps, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).

## Workspace-level IP firewall overview

Fabric provides network security at both tenant and workspace levels, including Microsoft Entra Conditional Access, tenant-level Private Link, and workspace-level Private Link. These features help secure access to workspaces and tenant resources. However, when a workspace is exposed over public endpoints, many organizations need a straightforward, IP-based method to limit access—complementing the strong private connectivity and identity-based controls already in place.

Workspace IP Firewall rules address this need by enabling administrators to define an IP allow list directly at the workspace level. This method provides a straightforward way to restrict inbound access to trusted office networks, VPN gateways, or partner IP ranges. It's particularly useful when Private Link isn't feasible or when identity policies alone don't provide sufficient network-layer boundaries.

By combining IP-based restrictions with existing Fabric security features, workspace IP firewall rules offer additional flexibility to secure inbound access. This approach doesn't require tenant-wide configuration changes or complex networking setups, making it easier to implement targeted security controls at the workspace level.

> [!NOTE]
> IP Firewall rules apply only to inbound traffic. They don't govern or restrict outbound connections from the workspace.  

## How workspace-level IP firewall rules work

Workspace-level IP firewall rules restrict public internet access to a workspace by allowing only connections from specified IP addresses. When you configure these rules, only two types of connections can reach your workspace:

- Connections from the approved IP addresses listed in your firewall rules
- Connections from resources in an approved virtual network through workspace private endpoints

When IP firewall rules are enabled, Fabric evaluates each client's public IP address against the configured allow list before granting access to workspace items, such as Lakehouses, Warehouses, OneLake shortcuts, Notebooks, and Spark Job Definitions. All other connection attempts are blocked.

The following diagram illustrates how workspace-level IP firewall rules work:

:::image type="content" source="media/security-workspace-level-firewall-overview/workspace-ip-firewall.png" alt-text="Diagram showing a workspace IP firewall configuration." lightbox="media/security-workspace-level-firewall-overview/workspace-ip-firewall.png":::

In this diagram: 

- Workspace A restricts inbound public access and can only be accessed from the allowed IP Address B.
- A user connecting from IP Address A is denied because the IP isn’t on the allow list. 
- A user connecting from IP Address B is granted access because the IP matches the workspace’s configured inbound rules. 

## Supported scenarios and limitations  

### Supported item types

You can use workspace-level IP firewall rules to control access to the following Fabric item types:

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

- The workspace-level IP firewall rules feature is supported for all Fabric capacity types, including Trial capacity.
- Only public internet IP addresses are allowed in IP network rules. IP address ranges reserved for private networks (as defined in RFC 1918) aren't supported. Private networks include addresses that start with 10, 172.16 to 172.31, and 192.168.
- You can configure up to 256 IP firewall rules per workspace.
- Public IP addresses from VMs on virtual networks with private endpoints (tenant or workspace level) can't be added as IP firewall rules.
- Duplicate rule names aren't allowed, and spaces aren't allowed in IP addresses.
- To enable traffic from an on-premises network, identify the internet-facing IP addresses that your network uses. Contact your network administrator for assistance.
- If you're using Azure ExpressRoute from your premises, identify the NAT IP addresses used for Microsoft peering. Either the service provider or the customer provides the NAT IP addresses.
- If the workspace becomes inaccessible due to incorrect or missing allowed public IP addresses, use the API to update IP firewall rules.

## Next steps

- To learn how to set up workspace IP firewall rules, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).