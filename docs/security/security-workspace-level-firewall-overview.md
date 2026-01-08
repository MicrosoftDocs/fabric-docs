---
title: About workspace IP firewall rules
description: Learn about using use workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 01/07/2026

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

## How IP firewall rules interact with other network security settings

Tenant and workspace inbound protection settings can be layered to achieve different network boundaries. When configuring workspace IP firewall rules, it's important to understand how they interact with other network security settings in Fabric. The interplay depends on:

- Whether the tenant enables workspace-level inbound rules
- Whether workspace private links are configured
- Whether workspace IP firewall rules are enforced

The following scenarios illustrate how workspace IP firewall rules can be combined with other network security features to create tailored access controls that meet specific organizational requirements.

- **Scenario 1: Most restricted:** Blocks public internet access and requires private links at the tenant and workspace levels for all connections. Only trusted IP endpoints can access resources.
- **Scenario 2: Highly restricted:** Reduces attack surface even more, ensuring only highly controlled connections are permitted. Restricts inbound access to the workspace, blocks public internet access, and requires private links.  
- **Scenario 3: Broad access:** Provides accessibility while maintaining private link options. Connections from trusted IPs and public internet are allowed.
- **Scenario 4: Balanced access:** Balances security and access by restricting workspace inbound connections but allowing public internet access. Connections from trusted IPs and restricted public internet access are allowed.
- **Scenario 5: Simplified access:** Workspace-level private links with restricted inbound access. Simplifies access by disabling tenant private links and allowing public internet connections. Only workspace private link and trusted IPs can access resources.
- **Scenario 6: Workspace-only access:** Workspace-level private links with restricted inbound access and blocked public access. Limits access by disabling tenant private links and restricting workspace inbound connections. Only workspace private link can access resources.

The following table summarizes the access behavior based on different combinations of network settings and access points, including tenant-level private links (tenant PL), workspace-level private links (workspace PL), private link virtual machines, the Fabric API endpoint (api.fabric.microsoft.com), and the public internet.

### [TABLE OPTION 1] Table 1: Access behavior per scenario

| Setting or access point | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 |
|--|--|--|--|--|--|--|
| **Tenant Private Link** | Enabled | Enabled | Enabled | Enable | Disabled | Disabled |
| **Tenant setting: Block Public Access** | Enabled | Enabled | Disabled | Disabled | N/A | N/A |
| **Workspace Private Link** | Enabled | Enabled | Enabled | Enabled | Enabled | Enabled |
| **Workspace setting - Workspace Inbound Access** | Allowed | Restricted | Allowed | Restricted | Allowed | Restricted |
| **Fabric portal access** | Allowed from a tenant PL VM | Allowed from a tenant PL VM | Allowed from the public internet, tenant PL VM, and workspace PL VM | Allowed from the public internet, tenant PL VM, and workspace PL VM | Allowed from the public Internet and workspace PL VM | Allowed from the public internet and workspace PL VM |
| **Fabric portal access for configuring workspace IP firewall rules** | Allowed | Blocked | Allowed from a tenant PL VM or public internet | Blocked | Allowed from the public internet | Blocked |
| **Fabric API access for configuring IP firewall rules** | Allowed if using the tenant FQDN or Fabric API endpoint and a tenant PL VM. | Allowed if using the tenant FQDN or Fabric API endpoint. | Allowed if using the tenant FQDN or Fabric API endpoint and a tenant PL VM or the public internet. | Allowed if using the tenant FQDN or Fabric API endpoint and a tenant PL VM or the public internet. | Allowed if using the Fabric API endpoint from the public internet. | Allowed if using the Fabric API endpoint from the public internet. |
| **Fabric portal access with IP firewall rules enabled** (for workspace and item operations) | Allowed only if using a workspace PL and an allowed IP. | Allowed only if using a workspace PL and an allowed IP. | Allowed if using a workspace PL VM -or- an allowed IP.<br></br>Blocked for tenant PL VMs. | Allowed if using a workspace PL VM -or- an allowed IP.<br></br>Blocked for tenant PL VMs. | Allowed if using a workspace PL VM -or- an allowed IP. | Allowed if using a workspace PL VM -or- an allowed IP. |
| **API access with IP firewall rules enabled** (for workspace and item operations) | Allowed if using a workspace PL and an allowed IP -or- a workspace PL VM with the workspace PL FQDN -or- an allowed IP with the Fabric API endpoint.<br></br>Blocked for tenant PL VMs using the tenant PL FQDN. | Allowed if using a workspace PL and an allowed IP -or- a workspace PL VM with the workspace PL FQDN -or- an allowed IP with the Fabric API endpoint.<br></br>Blocked for tenant PL VMs using the tenant PL FQDN. | Allowed if using a workspace PL VM and the workspace PL FQDN -or- an allowed IP and the Fabric API endpoint.<br></br>Blocked for tenant PL VMs using the tenant PL FQDN. | Allowed if using a workspace PL VMs and the workspace PL FQDN -or- an allowed IP and the Fabric API endpoint.<br></br>Blocked for tenant PL VMs using the tenant PL FQDN. | Allowed if using a workspace PL VM and the workspace PL FQDN -or- an allowed IP and the Fabric API endpoint. | Allowed if using a workspace PL VM and the workspace PL FQDN -or- the Fabric API endpoint. |

## Next steps

- To learn how to set up workspace IP firewall rules, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).


## [TABLE OPTION 2 - BREAK OUT ACCESS POINTS] Table 1: Access behavior per scenario


| Setting or Access Point | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 |
|--|--|--|--|--|--|--|
| **Tenant network settings** |  |  |  |  |  |  |
| Tenant Private Link | Enabled | Enabled | Enabled | Enable | Disabled | Disabled |
| Tenant setting: Block Public Access | Enabled | Enabled | Disabled | Disabled | N/A | N/A |
| **Workspace network settings** |  |  |  |  |  |  |
| Workspace Private Link | Enabled | Enabled | Enabled | Enabled | Enabled | Enabled |
| Workspace setting - Workspace Inbound Access | Allowed | Restricted | Allowed | Restricted | Allowed | Restricted |
| **Fabric portal** |  |  |  |  |  |  |
| Fabric portal access | Allowed from a tenant PL VM | Allowed from a tenant PL VM | Allowed from the public internet, tenant PL VM, and workspace PL VM | Allowed from the public internet, tenant PL VM, and workspace PL VM | Allowed from the public Internet and workspace PL VM | Allowed from the public internet and workspace PL VM |
| **Workspace IP firewall configuration** |  |  |  |  |  |  |
| Fabric portal access for configuring workspace IP firewall rules | Allowed | Blocked | Allowed from a tenant PL VM or public internet | Blocked | Allowed from the public internet | Blocked |
| Fabric API access for configuring IP firewall rules | Allowed if using the tenant FQDN or Fabric API endpoint and a tenant PL VM. | Allowed if using the tenant FQDN or Fabric API endpoint. | Allowed if using the tenant FQDN or Fabric API endpoint and a tenant PL VM or the public internet. | Allowed if using the tenant FQDN or Fabric API endpoint and a tenant PL VM or the public internet. | Allowed if using the Fabric API endpoint from the public internet. | Allowed if using the Fabric API endpoint from the public internet. |
| **Fabric portal access with IP firewall rules enabled (workspace & item operations)** |  |  |  |  |  |  |
| From WSPL VM | Allowed if an allowed IP | Allowed if an allowed IP | Allowed | Allowed | Allowed | Allowed |
| From allowed IP | Allowed if using a workspace PL | Allowed if using a workspace PL | Allowed | Allowed | Allowed | Allowed |
| From Tenant PL VM | Blocked | Blocked | Blocked | Blocked | ? | ? |
| **API access with IP firewall rules enabled (workspace & item operations)** |  |  |  |  |  |  |
| From WSPL VM | Allowed if an allowed IP | Allowed if an allowed IP | Allowed | Allowed | Allowed | Allowed |
| From allowed IP | Allowed if using a workspace PL | Allowed if using a workspace PL | Allowed | Allowed | Allowed | Allowed |
| From Tenant PL VM | Blocked | Blocked | Blocked | Blocked | ? | ? |


## [TABLE OPTION 3] Table 1: Detailed access behavior per scenario

| Scenario | Tenant network settings | Workspace inbound network settings | Fabric portal access points | IP firewall rule configuration via | Fabric portal access to the workspace and item operations *after* IP firewall rules are set | API access to the workspace and item operations *after* IP firewall rules are set |
|--|--|--|--|--|--|--|
| **1** | Tenant Private Link = Enabled<br></br>Block Public Access = Enabled | Workspace Private Link = Enabled<br></br>Workspace Inbound Access = Allowed | Tenant PL VM | Fabric portal<br></br>Public API using:<br>&#8226; Tenant FQDN or Fabric API endpoint<br>&#8226; Tenant PL VM | Allowed:<br>&#8226; Workspace PL from allowed IP<br><br>Blocked:<br>&#8226; Other workspace PL VMs or allowed IP.<br>&#8226; Tenant PL VMs | Allowed:<br>&#8226; Workspace PL from allowed IP<br>&#8226; Workspace PL VMs using workspace PL FQDN<br>&#8226; Allowed IP using Fabric API endpoint<br><br>Blocked:<br>&#8226; Tenant PL VM using tenant PL FQDN |
| **2** | Tenant Private Link = Enabled<br></br>Block Public Access = Enabled | Workspace Private Link = Enabled<br></br>Workspace Inbound Access = Restricted | Tenant PL VM | Public API using:<br>&#8226; Tenant FQDN or Fabric API endpoint | Blocked:<br>&#8226; Workspace PL virtual machine<br>&#8226; Allowed IP<br>&#8226; Tenant PL VMs | Allowed:<br>&#8226; Workspace PL VMs using workspace PL FQDN<br>&#8226; Allowed IP using Fabric API endpoint<br><br>Blocked:<br>&#8226; Tenant PL VM using tenant PL FQDN |
| **3** | Tenant Private Link = Enabled<br></br>Block Public Access = Disabled | Workspace Private Link = Enabled<br></br>Workspace Inbound Access = Allowed | Public internet<br></br> Tenant PL VM<br><br>Workspace PL VM | Fabric portal from a tenant PL VM<br></br>Fabric portal from public internet<br></br>Public API using:<br>&#8226; Tenant FQDN or Fabric API endpoint<br>&#8226; Tenant PL VM or public internet | Allowed:<br>&#8226; Workspace PL VMs<br>&#8226; Allowed IP<br><br>Blocked:<br>&#8226; Tenant PL VMs | Allowed:<br>&#8226; Workspace PL VMs using workspace PL FQDN<br>&#8226; Allowed IP using Fabric API endpoint<br><br>Blocked:<br>&#8226; Tenant PL VM using tenant PL FQDN |
| **4** | Tenant Private Link = Enabled<br>Block Public Access: Disabled | Workspace Private Link = Enabled<br></br>Workspace Inbound Access = Restricted | Public internet<br></br>Tenant PL VM<br></br>workspace PL VM | Public API using:<br>&#8226; Tenant FQDN or Fabric API endpoint<br>&#8226; Tenant PL VM or public internet | Allowed:<br>&#8226; Workspace PL VMs<br>&#8226; Allowed IP<br><br>Blocked:<br>&#8226; Tenant PL VMs | Allowed:<br>&#8226; Workspace PL VMs using workspace PL FQDN<br>&#8226; Allowed IP using Fabric API endpoint<br><br>Blocked:<br>&#8226; Tenant PL VM using tenant PL FQDN |
| **5** | Tenant Private Link = Disabled | Workspace Private Link = Enabled<br></br>Workspace Inbound Access = Allowed | Public Internet<br></br>Workspace PL VM | Fabric portal from public internet<br></br>Public API using:<br>&#8226; Fabric API endpoint from public internet | Allowed:<br>&#8226; Workspace PL VMs<br>&#8226; Allowed IP | Allowed:<br>&#8226; Workspace PL VMs using workspace PL FQDN<br>&#8226; Allowed IP using Fabric API endpoint |
| **6** | Tenant Private Link = Disabled | Workspace Private Link = Enabled<br></br>Workspace Inbound Access = Restricted | Public Internet<br></br>Workspace PL VM | Public API using:<br>&#8226; Fabric API endpoint from public internet | Allowed:<br>&#8226; Workspace PL VMs<br>&#8226; Allowed IP | Allowed:<br>&#8226; Workspace PL VMs using workspace PL FQDN<br>&#8226; Allowed IP using Fabric API endpoint |

## [TABLE OPTION 4] Table 1: Summary of access behavior per scenario

| Scenario description | Tenant Network Settings | Workspace Network Settings |
|----------|--------------------------|----------------------------|
| **1 - Most restricted**<br>Requires private links at tenant and workspace levels. Only trusted IPs allowed. | Tenant Private Link = Enabled<br>Block Public Access: Enabled | Workspace Private Link: Enabled<br>Inbound Access: Allowed |
| **2 - Highly restricted**<br>Requires private links with restricted workspace inbound access. | Tenant Private Link = Enabled<br>Block Public Access: Enabled | Workspace Private Link: Enabled<br>Inbound Access: Restricted |
| **3 - Broad access**<br>Allows public internet and trusted IPs with private link options. | Tenant Private Link = Enabled<br>Block Public Access: Disabled | Workspace Private Link: Enabled<br>Inbound Access: Allowed |
| **4 - Balanced access**<br>Restricts workspace inbound connections while allowing public internet. | Tenant Private Link = Enabled<br>Block Public Access: Disabled | Workspace Private Link: Enabled<br>Inbound Access: Restricted |
| **5 - Simplified access**<br>Workspace private link and trusted IPs only. Public internet allowed. | Tenant Private Link = Disabled | Workspace Private Link: Enabled<br>Inbound Access: Allowed |
| **6 - Workspace-only access**<br>Workspace private link only with restricted inbound access. | Tenant Private Link = Disabled | Workspace Private Link: Enabled<br>Inbound Access: Restricted |

#### Table 2: Access points per scenario

| Scenario | Access Points | IP Firewall Rule Configuration Points |
|----------|--------------|----------------------------------------|
| **1** | - Tenant private link virtual machine | - Fabric portal<br>- Public APIs using tenant FQDN or Fabric API endpoint (api.fabric.microsoft.com) from a tenant private link virtual machine |
| **2** | - Tenant private link virtual machine | Public APIs using tenant FQDN or Fabric API endpoint from a tenant private link virtual machine |
| **3** | - Public internet<br>- Tenant private link VM<br>- Workspace Private Link VM | - Fabric portal from a tenant private link virtual machine<br>- Fabric portal from public internet<br>- Public API using tenant FQDN or Fabric API endpoint from a tenant private link virtual machine or public internet |
| **4** | - Public internet<br>- Tenant private link VM<br>- Workspace Private Link VM | Public APIs using tenant FQDN or Fabric API endpoint from a tenant private link virtual machine or public internet |
| **5** | - Public Internet<br>- Workspace Private Link VM | - Fabric portal from public internet<br>- Public APIs using Fabric API endpoint from public internet |
| **6** | - Public Internet<br>- Workspace Private Link VM | Public APIs using Fabric API endpoint from public internet |

#### Table 3: Allowed vs. blocked access after IP firewall rules are set

| Scenario | Fabric Portal Access | API Access |
|----------|----------------------|-----------|
| **1** | ✔ Allowed:<br>- Workspace private links from allowed IP addresses<br><br>✖ Blocked:<br>- Other workspace private link virtual machines<br>- Tenant private link virtual machines | ✔ Allowed:<br>- Workspace private link virtual machines using workspace private link FQDN<br>- Allowed IP addresses using Fabric API endpoint<br><br>✖ Blocked:<br>- Tenant private link virtual machine using tenant private link FQDN |
| **2** | ✖ Fabric portal access blocked for:<br>- Workspace private link virtual machine<br>- Allowed IP addresses<br>- Tenant private link virtual machines | ✔ Allowed:<br>- Workspace private link virtual machines using workspace private link FQDN<br>- Allowed IP addresses using Fabric API endpoint<br><br>✖ Blocked:<br>- Tenant private link virtual machine using tenant private link FQDN |
| **3** | ✔ Allowed:<br>- Workspace private link virtual machines<br>- Allowed IP addresses<br><br>✖ Blocked:<br>- Tenant private link virtual machines | ✔ Allowed:<br>- Workspace private link virtual machines using workspace private link FQDN<br>- Allowed IP addresses using Fabric API endpoint<br><br>✖ Blocked:<br>- Tenant private link virtual machine using tenant private link FQDN |
| **4** | ✔ Allowed:<br>- Workspace private link virtual machines<br>- Allowed IP addresses<br><br>✖ Blocked:<br>- Tenant private link virtual machines | ✔ Allowed:<br>- Workspace private link virtual machines using workspace private link FQDN<br>- Allowed IP addresses using Fabric API endpoint<br><br>✖ Blocked:<br>- Tenant private link virtual machine using tenant private link FQDN |
| **5** | ✔ Allowed:<br>- Workspace private link virtual machines<br>- Allowed IP addresses | ✔ Allowed:<br>- Workspace private link virtual machines using workspace private link FQDN<br>- Allowed IP addresses using Fabric API endpoint |
| **6** | ✔ Allowed:<br>- Workspace private link virtual machines<br>- Allowed IP addresses | ✔ Allowed:<br>- Workspace private link virtual machines using workspace private link FQDN<br>- Allowed IP addresses using Fabric API endpoint |

## [TABLE OPTION 5 - ALL ORIGINAL]

| Scenario | Tenant Network Settings | Workspace Inbound Network Settings | Fabric Portal Access | IP Firewall Rules Configuration | Workspace Access + Item Operations Access using Fabric Portal | Workspace Access + Item Operations Access using API |
|--|--|--|--|--|--|--|
| 1 | Tenant Private Link: Enabled<br>Block Public Access: Enabled | WS Private Link: Enabled<br>WS Inbound Access: Allowed | Only via Tenant Private Link VM | 1. Fabric portal can be used to set IP firewall rules as WS allows Public access<br>2. Public APIs to set Firewall rules over Tenant FQDN or Global FQDN from Tenant PL VM | Once IP firewall rules are set using UI, Workspace restricts inbound access except for WS PL and allowed IPs.<br>1. From WSPL VM - Workspace not accessible from Fabric portal<br>2. From Allowed IP - Workspace not accessible from Fabric portal<br>3. From Tenant PL VM - Workspace not accessible from Fabric portal | Once IP rules are set using API, Workspace restricts inbound access except for WSPL and allowed IP rules.<br>1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace APIs will fail over Tenant PL FQDN |
| 2 | Tenant Private Link: Enabled<br>Block Public Access: Enabled | WS Private Link: Enabled<br>WS Inbound Access: Restricted | Only via Tenant Private Link VM | 1. Public APIs to set firewall rules only using Tenant FQDN or Global FQDN from Tenant PL VM | 1. From WSPL VM - Workspace not accessible from Fabric portal<br>2. From Allowed IP - Workspace not accessible from Fabric portal<br>3. From Tenant PL VM - Workspace not accessible from Fabric portal | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace APIs will fail over Tenant PL FQDN |
| 3 | Tenant Private Link: Enabled<br>Block Public Access: Disabled | WS Private Link: Enabled<br>WS Inbound Access: Allowed | Public internet or Tenant Private Link VM or WS Private Link VM | 1. Fabric portal from Tenant PL VM can be used to set IP firewall rules as WS allows Public access<br>2. Fabric portal from public internet can be used to set Firewall rules<br>3. Public APIs to set IP firewall rules over Tenant FQDN or Global FQDN API using Tenant PL VM or public internet | 1. From WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal<br>3. From Tenant PL VM - Workspace cannot be accessed from Fabric portal | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace cannot be accessed over Tenant PL FQDN |
| 4 | Tenant Private Link: Enabled<br>Block Public Access: Disabled | WS Private Link: Enabled<br>WS Inbound Access: Restricted | Public internet or Tenant Private Link VM or WS Private Link VM | 1. Fabric portal from Tenant PL VM / WSPL VM or public internet cannot be used to set IP firewall rules<br>2. Public APIs to set Firewall rules over Tenant FQDN or Global FQDN from Tenant PL VM or public internet | 1. From WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal<br>3. From Tenant PL VM - Workspace cannot be accessed from Fabric portal | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From Allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace APIs cannot be used over Tenant PL FQDN |
| 5 | Tenant Private Link: Disabled | WS Private Link: Enabled<br>WS Inbound Access: Allowed | Public Internet or WS Private Link VM | 1. Fabric portal from public internet can be used to set IP firewall rules<br>2. Public APIs to set IP firewall rules over Global FQDN on public internet | 1. From WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN |
| 6 | Tenant Private Link: Disabled | WS Private Link: Enabled<br>WS Inbound Access: Restricted | Public Internet or WS Private Link VM | 1. Fabric portal from public internet or WSPL VM cannot be used to set IP firewall rules<br>2. Public APIs to set IP firewall rules over Global FQDN on public internet | 1. WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN |

## [TABLE OPTION 6 - ALL ORIGINAL ROTATED]


| -- | -- | -- | -- | -- | -- | -- |
|--|--|--|--|--|--|--|
| Tenant Network Settings | Tenant Private Link: Enabled<br>Block Public Access: Enabled | Tenant Private Link: Enabled<br>Block Public Access: Enabled | Tenant Private Link: Enabled<br>Block Public Access: Disabled | Tenant Private Link: Enabled<br>Block Public Access: Disabled | Tenant Private Link: Disabled | Tenant Private Link: Disabled |
| Workspace Inbound Network Settings | WS Private Link: Enabled<br>WS Inbound Access: Allowed | WS Private Link: Enabled<br>WS Inbound Access: Restricted | WS Private Link: Enabled<br>WS Inbound Access: Allowed | WS Private Link: Enabled<br>WS Inbound Access: Restricted | WS Private Link: Enabled<br>WS Inbound Access: Allowed | WS Private Link: Enabled<br>WS Inbound Access: Restricted |
| Fabric Portal Access | Only via Tenant Private Link VM | Only via Tenant Private Link VM | Public internet or Tenant Private Link VM or WS Private Link VM | Public internet or Tenant Private Link VM or WS Private Link VM | Public Internet or WS Private Link VM | Public Internet or WS Private Link VM |
| IP Firewall Rules Configuration | 1. Fabric portal can be used to set IP firewall rules as WS allows Public access<br>2. Public APIs to set Firewall rules over Tenant FQDN or Global FQDN from Tenant PL VM | 1. Public APIs to set firewall rules only using Tenant FQDN or Global FQDN from Tenant PL VM | 1. Fabric portal from Tenant PL VM can be used to set IP firewall rules as WS allows Public access<br>2. Fabric portal from public internet can be used to set Firewall rules<br>3. Public APIs to set IP firewall rules over Tenant FQDN or Global FQDN API using Tenant PL VM or public internet | 1. Fabric portal from Tenant PL VM / WSPL VM or public internet cannot be used to set IP firewall rules<br>2. Public APIs to set Firewall rules over Tenant FQDN or Global FQDN from Tenant PL VM or public internet | 1. Fabric portal from public internet can be used to set IP firewall rules<br>2. Public APIs to set IP firewall rules over Global FQDN on public internet | 1. Fabric portal from public internet or WSPL VM cannot be used to set IP firewall rules<br>2. Public APIs to set IP firewall rules over Global FQDN on public internet |
| Workspace Access + Item Operations Access using Fabric Portal | Once IP firewall rules are set using UI, Workspace restricts inbound access except for WS PL and allowed IPs.<br>1. From WSPL VM - Workspace not accessible from Fabric portal<br>2. From Allowed IP - Workspace not accessible from Fabric portal<br>3. From Tenant PL VM - Workspace not accessible from Fabric portal | 1. From WSPL VM - Workspace not accessible from Fabric portal<br>2. From Allowed IP - Workspace not accessible from Fabric portal<br>3. From Tenant PL VM - Workspace not accessible from Fabric portal | 1. From WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal<br>3. From Tenant PL VM - Workspace cannot be accessed from Fabric portal | 1. From WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal<br>3. From Tenant PL VM - Workspace cannot be accessed from Fabric portal | 1. From WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal | 1. WSPL VM - Workspace can be accessed from Fabric portal<br>2. From allowed IP - Workspace can be accessed from Fabric portal |
| Workspace Access + Item Operations Access using API | Once IP rules are set using API, Workspace restricts inbound access except for WSPL and allowed IP rules.<br>1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace APIs will fail over Tenant PL FQDN | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace APIs will fail over Tenant PL FQDN | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace cannot be accessed over Tenant PL FQDN | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From Allowed IP - Workspace APIs can be used over Global FQDN<br>3. From Tenant PL VM - Workspace APIs cannot be used over Tenant PL FQDN | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN | 1. From WSPL VM - Workspace APIs can be used over WSPL FQDN<br>2. From allowed IP - Workspace APIs can be used over Global FQDN |


