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

- **Tenant-level Private Link**: Routes all inbound connections to Fabric resources through Azure Private Link, ensuring traffic originates from approved virtual networks.
- **Microsoft Entra Conditional Access**: Enforces identity-based access policies that can restrict inbound connections based on user location, device compliance, and other factors.
- **Service Tags**: Allow or block inbound traffic from specific Azure services by using predefined service tags.
- **Enable workspace-level inbound rules**: The tenant setting **Configure workspace-level inbound network rules** allows or disallows workspace admins from restricting public access at the workspace level. By default, workspace admins cannot restrict inbound public access unless the tenant admin enables this setting. When enabled, workspace admins can apply workspace-level inbound restrictions — including private links — giving organizations finer-grained network segmentation.

These tenant-level features provide broad protections that help secure all workspaces in the tenant. However, they can be complemented by workspace-level settings for more targeted control.

## Workspace-level inbound protection

Workspace admins can apply more specific inbound security controls when the tenant allows them.

- **Workspace Private Link**: Allows a workspace to establish a private endpoint in Azure, ensuring inbound connections originate only from approved networks.

- **Workspace inbound access protection**: When the tenant has enabled workspace-level rules, workspace admins can toggle Restrict public access. Selecting this option blocks public inbound connections and requires inbound access through approved private networks. 

- **Workspace IP firewall**: Admins can configure workspace IP firewall rules to specify which IP ranges can access workspace items. This feature complements private link by enabling granular allowlists.

These layers can work independently or together, depending on organizational needs.

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
