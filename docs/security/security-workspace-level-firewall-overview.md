---
title: About workspace IP firewall rules
description: Learn about using use workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 01/09/2026

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
<!--
### Table 1: Access behavior based on network settings and access points

| Setting or access point | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 |
|--|--|--|--|--|--|--|
| **Tenant Private Link** | Enabled | Enabled | Enabled | Enable | Disabled | Disabled |
| **Tenant setting: Block Public Access** | Enabled | Enabled | Disabled | Disabled | N/A | N/A |
| **Workspace Private Link** | Enabled | Enabled | Enabled | Enabled | Enabled | Enabled |
| **Workspace setting - Workspace Inbound Access** | Allowed | Restricted | Allowed | Restricted | Allowed | Restricted |
| **Fabric portal access** | Allowed from a tenant PL VM | Allowed from a tenant PL VM | Allowed from the public internet, tenant PL VM, and workspace PL VM | Allowed from the public internet, tenant PL VM, and workspace PL VM | Allowed from the public Internet and workspace PL VM | Allowed from the public internet and workspace PL VM |

TEST
-->
### Table 1: Access to the Fabric portal based on network settings

Access to the Fabric portal varies depending on the combination of tenant-level and workspace-level network settings. The following table summarizes whether access to the Fabric portal is possible under different scenarios.

<!--
## Understanding the Fabric Portal Access Column

The third column "Can I access the Fabric portal?" indicates whether you can access the Microsoft Fabric web portal (typically at app.powerbi.com or fabric.microsoft.com) under different network configurations.

### What "Yes, you can access the portal from a tenant private link virtual machine" means:

Yes, using the tenant private link 

- **Tenant Private Link**: A secure, private connection between your Azure Virtual Network and Microsoft Fabric services
- **Virtual Machine**: An Azure VM that exists within your Virtual Network that has the private link configured
- **Portal Access**: You can open a web browser on that VM and navigate to the Fabric portal
**Example**: If your organization has configured a tenant-level private link between your Azure Virtual Network and Microsoft Fabric, you would:
- Have a virtual machine running in that Azure Virtual Network
- Connect to that VM (for example, via Azure Bastion or VPN)
- From within that VM, access the Fabric portal through the private link connection

This ensures that all traffic between your VM and Fabric services stays within Microsoft's private network infrastructure, never traversing the public internet.
### How to access the portal:

1. **Connect to the VM**: Use Remote Desktop (RDP) or SSH to connect to a virtual machine that is within the Virtual Network where the private link is configured
2. **Open a browser**: Launch a web browser (Edge, Chrome, etc.) on that VM
3. **Navigate to Fabric**: Go to the Fabric portal URL (e.g., https://app.powerbi.com or https://fabric.microsoft.com)
4. **Authentication**: The traffic will route through the private endpoint, keeping the connection within Microsoft's backbone network

**Key Point**: Direct access from your local machine outside the Virtual Network may be blocked or routed differently depending on your configuration. The private link ensures secure access only from within the approved network boundaries.
-->
| Scenario | Tenant and workspace settings | Can I access the Fabric portal? |
|----------|-------------------------------|-----------------------|
| **1: Most restricted** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Enabled** <br> Workspace Private Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Only from a virtual machine with the tenant private link |
| **2: Highly restricted** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | Only from a virtual machine with the tenant private link |
| **3: Broad access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Disabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Yes, from the public internet or a virtual machine with the tenant or workspace private link |
| **4: Balanced access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Disabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | Yes, from the public internet or a virtual machine with the tenant or workspace private link |
| **5: Simplified access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Disabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;N/A <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Only from the public internet or a virtual machine with the workspace private link |
| **6: Workspace-only access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Disabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;N/A <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | Only from the public internet or a virtual machine with the workspace private link |

<!--
### Table 1: Access behavior based on network settings and access points

|  | Setting or access point | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 |
|--|--|--|--|--|--|--|--|
| **Tenant-level settings**|  |  |  |  |  |  |  |
| | **Tenant Private Link** | Enabled | Enabled | Enabled | Enable | Disabled | Disabled |
| | **Block Public Access** | Enabled | Enabled | Disabled | Disabled | N/A | N/A |
| **Workspace-level settings** |  |  |  |  |  |  |  |
|  | **Workspace Private Link** | Enabled | Enabled | Enabled | Enabled | Enabled | Enabled |
| | **Workspace Inbound Access** | Allowed | Restricted | Allowed | Restricted | Allowed | Restricted |
| **Fabric portal access** |  |  |  |  |  |  |  |
|| **via public internet?** | No  | No  | Yes | Yes | Yes | Yes |  
|| **via tenant PL VM?**    | Yes | Yes | Yes | Yes | No  | No  |  
|| **via workspace PL VM?** | No  | No  | Yes | Yes | Yes | Yes |    

### Table 2: Configuring IP firewall rules based on network settings

|| Access point             | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 |
|--|--|--|--|--|--|--|--|
| **Configure IP firewall rules in Fabric portal**|  |  |  |  |  |  |  |
|| **via public internet?** | Yes        | No         | Yes        | No         | Yes        | No |  
|| **via tenant PL VM?**    | Yes        | No         | Yes        | No         | No         | No |  
|| **via workspace PL VM?** | Yes        | No         | No         | No         | No         | No |    
| **Configure IP firewall rules using API**|  |  |  |  |  |  |  |
|| **via public internet?** | No         | Yes; use the tenant FQDN or Fabric API endpoint  | Yes; use the tenant FQDN or Fabric API endpoint | Yes; use the tenant FQDN or Fabric API endpoint | Yes; use the Fabric API endpoint | Yes; use the Fabric API endpoint |  
|| **via tenant PL VM?**    | Yes; use the tenant FQDN or Fabric API endpoint | Yes; use the tenant FQDN or Fabric API endpoint | Yes; use the tenant FQDN or Fabric API endpoint | Yes; use the tenant FQDN or Fabric API endpoint | No | No  |  
|| **via workspace PL VM?** | No  | Yes; use the tenant FQDN or Fabric API endpoint  | No | No | No | No |   

-->

### Table 2: Configuring IP firewall rules in various network scenarios

The ability to configure workspace IP firewall rules depends on the tenant and workspace network settings. The following table summarizes whether you can use the Fabric portal or the Fabric API to configure IP firewall rules under different scenarios.

| Scenario | Tenant and workspace settings | Can I use the Fabric portal to configure IP firewall rules? | Can I use the Fabric API to configure IP firewall rules? |
|--|--|--|--|
| **1: Most restricted** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Yes, the workspace allows public access from a tenant private link virtual machine | Yes, using the tenant FQDN or Fabric API endpoint from a tenant private link virtual machine |
| **2: Highly restricted** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | No | Yes, using the tenant FQDN or Fabric API endpoint from a tenant private link virtual machine |
| **3: Broad access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Disabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Yes, the workspace allows public access using the fabric portal from the public internet or a tenant private link virtual machine. | Yes, using the tenant FQDN or Fabric API endpoint from the public internet or a tenant private link virtual machine.|
| **4: Balanced access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Disabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | No | Yes, using the tenant FQDN or Fabric API endpoint from the public internet or a tenant private link virtual machine |
| **5: Simplified access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Disabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;N/A <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Yes, from the public internet | Yes, using the Fabric API endpoint from the public internet|
| **6: Workspace-only access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Disabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;N/A <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | No | Yes, using the Fabric API endpoint from the public internet |

### Table 3: Access behavior with IP firewall rules configured

After you configure IP firewall rules, access to the workspace and its items is restricted to:
- Connections from IP addresses in your allow list
- Connections through workspace private links

This restriction applies whether you're using the Fabric portal or the Fabric API. The following table summarizes access behavior based on different network settings and access points.

| Scenario | Tenant and workspace settings | Can I access the Fabric portal? | Can I access the Fabric API? |
|--|--|--|--|
| **1: Most restricted** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | No | Yes, using the Fabric API endpoint from an allowed IP, or the workspace private link FQDN over a workspace private link virtual machine  |
| **2: Highly restricted** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | No | Yes, using the Fabric API endpoint from an allowed IP, or the workspace private link FQDN over a workspace private link virtual machine  |
| **3: Broad access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Disabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Yes, from an allowed IP or a workspace private link virtual machine <br> - Public internet | Yes, using the Fabric API endpoint from an allowed IP, or the workspace private link FQDN over a workspace private link virtual machine |
| **4: Balanced access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;**Disabled** <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | Yes, from an allowed IP or a workspace private link virtual machine  | Yes, using the Fabric API endpoint from an allowed IP, or the workspace private link FQDN over a workspace private link virtual machine |
| **5: Simplified access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Disabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;N/A <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Allowed** | Yes, from an allowed IP or a workspace private link virtual machine   | Yes, using the Fabric API endpoint from an allowed IP, or the workspace private link FQDN over a workspace private link virtual machine |
| **6: Workspace-only access** | Tenant&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Disabled** <br> (Tenant)&nbsp;Block&nbsp;Public&nbsp;Internet&nbsp;Access&nbsp;-&nbsp;N/A <br> Workspace&nbsp;Private&nbsp;Link&nbsp;-&nbsp;**Enabled** <br> Workspace&nbsp;Inbound&nbsp;Access&nbsp;-&nbsp;**Restricted** | Yes, from an allowed IP or a workspace private link virtual machine | Yes, using the Fabric API endpoint from an allowed IP, or the workspace private link FQDN over a workspace private link virtual machine  |

<!--
### Table 3: Access behavior with IP firewall rules configured

|| Access point             | Scenario 1 | Scenario 2 | Scenario 3 | Scenario 4 | Scenario 5 | Scenario 6 |
|--|--|--|--|--|--|--|--|
| **Fabric portal access with IP firewall rules set** <sup>1</sup>|  |  |  |  |  |  |  |
|| **via allowed IP?**      | No | No | Yes | Yes | Yes | Yes |
|| **via tenant PL VM?**    | No | No | No  | No  | No  | No  |
|| **via workspace PL VM?** | No | No | Yes | Yes | Yes | Yes |
| **API access with IP firewall rules set** <sup>2</sup>|  |  |  |  |  |  |  |
|| **via workspace PL VM?** | Yes; use the workspace PL FQDN | Yes; use the workspace PL FQDN | Yes; use the workspace PL FQDN | Yes; use the workspace PL FQDN | Yes; use the workspace PL FQDN | Yes; use the workspace PL FQDN |
|| **via allowed IP?**      | Yes; use Fabric API endpoint | Yes; use Fabric API endpoint | Yes; use Fabric API endpoint | Yes; use Fabric API endpoint | Yes; use Fabric API endpoint | Yes; use Fabric API endpoint |
|| **via tenant PL VM?**    | No  | No  | No  | No | No | No |

<sup>1</sup> When IP firewall rules are set, workspace access and item operations using the Fabric portal are allowed only from the IPs specified in the IP firewall rules or through workspace private links. 
<sup>2</sup> When IP firewall rules are set, workspace access and item operations using the Fabric API are allowed only from the IPs specified in the IP firewall rules or through workspace private links.
-->
## Next steps

- To learn how to set up workspace IP firewall rules, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).
- To understand how inbound protection features work together, see [Inbound network protection in Microsoft Fabric](security-inbound-overview.md).