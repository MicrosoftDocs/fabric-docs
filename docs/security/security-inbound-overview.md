---
title: About inbound access protection in Fabric
description: Learn about the features in Fabric for protecting inbound access.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 12/16/2025

#customer intent: As a Fabric admin, I want a unified overview of all inbound protection features across both tenant and workspace scopes, helping me decide which controls to use and how they interact.

---

# Inbound network protection in Microsoft Fabric

Microsoft Fabric provides several layers of inbound network protection to help organizations control where inbound connections can originate when accessing items and data. These capabilities allow tenant administrators and workspace administrators to enforce network boundaries, restrict public access, and route inbound connections through secure private channels.
This article provides an overview of all inbound protection options, how they relate to one another, and guidance for choosing the right configuration for your environment.

## Overview of inbound protection features

Fabric provides inbound protection at two scopes:

- **Tenant-level inbound protection**: Configured by tenant administrators, these settings apply across all workspaces in the Fabric tenant. They include features like tenant-level Private Link and Microsoft Entra Conditional Access policies that restrict where inbound connections can originate.        

- **Workspace-level inbound protection**: Configured by workspace administrators, these settings apply to individual workspaces. They include workspace-level Private Link and workspace IP firewall rules that allow admins to define specific network boundaries for their workspaces.

By combining tenant-level and workspace-level inbound protection features, organizations can create a layered security approach that meets their specific access control requirements. The following sections provide more details about each feature and how they interact.

## Tenant-level inbound protection

Tenant administrators can configure inbound controls that apply to every workspace unless overridden by workspace-specific settings.

### Tenant-level inbound protection

Tenant administrators can configure inbound controls that apply to every workspace unless overridden by workspace-specific settings.

### Tenant-level Private Link

Routes inbound connections to Fabric resources through Azure Private Link, restricting traffic to approved networks.

### Enable workspace-level inbound rules

The tenant setting Configure workspace-level inbound network rules allows or disallows workspace admins from restricting public access at the workspace level. By default, workspace admins cannot restrict inbound public access unless the tenant admin enables this setting. 

When enabled, workspace admins can apply workspace-level inbound restrictions — including private links — giving organizations finer-grained network segmentation.

## Workspace-level inbound protection

Workspace admins can apply more specific inbound security controls when the tenant allows them.

### Workspace Private Link

Allows a workspace to establish a private endpoint in Azure, ensuring inbound connections originate only from approved networks.

### Workspace inbound access protection

When the tenant has enabled workspace-level rules, workspace admins can toggle Restrict public access. Selecting this option blocks public inbound connections and requires inbound access through approved private networks. 

### Workspace IP Firewall

Admins can configure workspace IP firewall rules to specify which IP ranges can access workspace items. This feature complements private link by enabling granular allowlists.

These layers can work independently or together, depending on organizational needs.

## How tenant-level and workspace-level settings interact

Tenant and workspace inbound protection settings can be layered to achieve different network boundaries. The interplay depends on:

- Whether the tenant enables workspace-level inbound rules
- Whether workspace private links are configured
- Whether workspace IP firewall rules are enforced
- 
The following scenarios demonstrate how workspace-level inbound access settings combine with tenant-level private link configurations and public access controls to meet different security requirements:

- **Scenario 1: Most restricted** - Blocks public internet access and requires private links at the tenant and workspace levels for all connections. With Only trusted IP endpoints can access resources.
- **Scenario 2: Highly restricted** - Restricts inbound access to the workspace Blocks public internet access and requires private links, and also  and restricted inbound access. Reduces attack surface even more, ensuring only highly controlled connections are permitted. 
- **Scenario 3: Broad access** - Private links with public access and allowed inbound access. Provides broad accessibility while maintaining private link options. Connections from both trusted IPs and public internet are allowed.
- **Scenario 4: Balanced access** - Private links with public access and restricted inbound access. Balances security and access by restricting workspace inbound connections but allowing public internet access. Connections from trusted IPs and restricted public internet access are allowed.
- **Scenario 5: Simplified access** - Workspace-level private links with restricted inbound access. Simplifies access by disabling tenant private links and allowing public internet connections. Only workspace private link and trusted IPs can access resources.
- **Scenario 6: Workspace-only access** - Workspace-level private links with restricted inbound access and blocked public access. Limits access by disabling tenant private links and restricting workspace inbound connections. Only workspace private link can access resources.

The network settings you configure for each of these scenarios are summarized in the following table.

### Summary of network access settings for different scenarios

| Setting or access point | Scenario 1: <br>Most restricted  | Scenario 2: <br>Highly restricted | Scenario 3: <br>Broad access | Scenario 4: <br>Balanced access | Scenario 5: <br>Simplified access | Scenario 6: <br>Workspace-only access |
|---------|------------|------------|------------|------------|------------|------------|
| **Tenant private link** | Enabled | Enabled | Enabled | Enabled | Disabled | Disabled |
| **Block public access (tenant setting)** | Enabled | Enabled | Disabled | Disabled | N/A | N/A |
| **Workspace private link** | Enabled | Enabled | Enabled | Enabled | Enabled | Enabled |
| **Workspace inbound access (workspace setting)** | Allowed | Restricted | Allowed | Restricted | Restricted | Restricted |
| **Fabric portal access (tenant PL VM)** | Yes | Yes | Yes | Yes | No | No |
| **Fabric portal access (workspace PL VM)** | No | No | Yes | Yes | Yes | Yes |
| **Fabric portal access (public internet)** | No | No | Yes | Yes | Yes | Yes |
| **Firewall configuration via portal (public internet)** | Yes | No | Yes | No | Yes | No |
| **API access (tenant PL VM)** | Yes | Yes | Yes | Yes | No | No |
| **API access (workspace PL VM)** | No | No | Yes | Yes | Yes | Yes |
| **API access (public internet)** | No | No | Yes | Yes | Yes | Yes |

These scenarios illustrate how workspace IP firewall rules can be combined with other network security features to create tailored access controls that meet specific organizational requirements.

## Planning considerations

- You must be a Fabric administrator to enable tenant-level inbound rules. 
- Workspace-level features depend on tenant settings.
- Private link requires Azure configuration.
- IP firewall allows granular control but requires careful IP planning.
- Consider whether a centralized or workspace-driven model best fits your environment.

## Next steps

- Learn more about [Workspace inbound access protection] 
- Learn more about workspace outbound access protection to understand the full network model (contextual complement) 
- Review Private Link configuration at both tenant and workspace levels
- Continue to the scenario articles for detailed setup guidance 
