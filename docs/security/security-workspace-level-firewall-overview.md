---
title: About workspace IP firewall rules
description: Learn about using use workspace-level IP firewall rules for secure access to a Fabric workspace.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 11/20/2025

#customer intent: As a workspace admin, I want to lean about using workspace-level IP firewall rules on my workspace to restrict the IP addresses than can access my Fabric workspace.

---

# About workspace IP firewall rules

Workspace IP firewall rules control access to your Microsoft Fabric workspace by restricting connections to specified public IP addresses. This feature provides network-level access control when workspaces are exposed over public endpoints. This article provides an overview of workspace IP firewall rules. For configuration steps, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).

## Workspace-level IP firewall overview
Workspace-level IP firewall rules allow administrators to define a set of allowed public IP addresses that can access a specific Fabric workspace. Organizations can use IP firewall rules to:

- Limit workspace access to trusted networks (such as office IPs, VPN gateways, or partner ranges)
- Add network-layer security alongside identity-based controls like Microsoft Entra Conditional Access
- Implement IP-based restrictions without tenant-wide configuration changes

IP firewall rules complement existing Fabric security features, including tenant-level and workspace-level private links. However, they serve different purposes: while private links provide dedicated private connectivity, IP firewall rules offer a straightforward way to control access when private links aren't available or needed.

> [!IMPORTANT]
> IP firewall rules apply only to inbound traffic. They don't restrict outbound connections from the workspace.

Workspace-level IP firewall rules maps a workspace to specific public IP rules added to the workspace. When IP firewall rules are added to a workspace, public internet to the workspace is restricted except for the allowed IP rules. This ensures that either resources available in an approved virtual network (via workspace private endpoints) or allowed public IP rules can access the workspace. The following diagram illustrates the implementation of workspace-level IP firewall rules.

:::image type="content" source="media/security-workspace-level-firewall-overview/workspace-ip-firewall.png" alt-text="Diagram showing a workspace IP firewall configuration."::: 

When IP Firewall rules are enabled, Fabric evaluates the client’s public IP address before granting access to workspace items such as Lakehouses, Warehouses, OneLake shortcuts, Notebooks, or Spark Job Definitions. Only clients connecting from approved IPs are allowed.  

In this diagram: 

- Workspace A restricts inbound public access and can only be accessed from allowed IP address B 
- A user connecting from IP Address A is denied because the IP isn’t on the allowlist. 
- A user connecting from IP Address B is granted access because the IP matches the workspace’s configured inbound rules. 

## Supported scenarios and limitations  

You can use workspace-level IP Firewall rules to connect to the following item types in Fabric: 

- Lakehouse, SQL Endpoint, Shortcut 
- Direct connection via OneLake endpoint 
- Notebook, Spark job definition, Environment 
- Machine learning experiment, machine learning model 
- Pipeline 
- Copy Job 
- Mounted Data Factory 
- Warehouse 
- Dataflows Gen2 (CI/CD) 
- Variable library 
- Mirrored database (Open mirroring, Cosmos DB) 
- Eventstream 
- Eventhouse 

Considerations and Limitations 

- The workspace-level IP firewall rules feature is supported for all Fabric capacity types including Trial capacity.  
- The limit of IP firewall rules for workspace is 256.  
- Public IPs of VM on Vnet with Private endpoints (Tenant or Workspace) cannot be added as IP firewall rules 

## Next steps

- To learn how to set up workspace IP firewall rules, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).