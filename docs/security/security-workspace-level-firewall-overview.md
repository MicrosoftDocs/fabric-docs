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

Workspace IP firewall rules restrict inbound access to Fabric workspaces by allowing connections only from specified IP addresses. As a workspace admin, you can permit access from known IP addresses (such as users, machines, or VPNs), while all other IP addresses are automatically blocked. This approach provides straightforward, workspace-level inbound network protection and is simpler to configure than workspace private links.

This article provides an overview of workspace IP firewall rules in Fabric.

## How workspace IP firewall rules work

Workspace IP firewall rules provide network-level access control for your Fabric workspace:

- **IP allowlist control**: Define a list of approved IP addresses for your workspace. Only connections from these IP addresses can access the workspace; all other connections are denied.

- **Simple configuration**: After the feature is enabled at the tenant level, workspace admins add the required IP addresses to the allowlist. There's no separate toggle to restrict public access—access control is managed entirely through the IP allowlist.

- **Cross-workspace communication**: To enable communication between workspaces, add the relevant IP addresses to the allowlist. If a workspace is also protected by private links, additional considerations may apply.

- **Interaction with other security features**: Workspace IP firewall rules work alongside other inbound security features, such as tenant-level private links and workspace-level private links. When multiple protections are enabled simultaneously, all applicable rules must be satisfied for access to be granted.

## Tenant setting requirements

Before workspace admins can configure IP firewall rules, a Fabric administrator must enable the **Configure workspace-level IP firewall** tenant setting. This prerequisite is similar to the setup for workspace private links but uses a different tenant switch. For details, see [Enable workspace inbound access protection for your tenant](security-workspace-enable-inbound-access-protection.md).

## Considerations and limitations

Keep the following considerations and limitations in mind when using workspace IP firewall rules:

- **IP address format**: IP addresses must be specified in IPv4 format. IPv6 addresses aren't currently supported.

- **CIDR notation**: IP address ranges must use CIDR notation (for example, `203.0.113.0/24`).

- **Maximum rules**: Each workspace can have a maximum of 50 IP address rules. If you need to allow more IP addresses, use broader CIDR ranges where possible.

- **NAT and proxy considerations**: If users connect through a NAT gateway or proxy server, ensure you allowlist the public IP address of the gateway or proxy, not the individual user IP addresses.

- **Dynamic IP addresses**: If users have dynamic IP addresses that change frequently, consider using broader IP ranges or implementing alternative authentication methods.

- **Cross-workspace access**: For cross-workspace scenarios, ensure that IP addresses for both the source and destination workspaces are properly configured in their respective allowlists.

- **Interaction with private links**: When both workspace IP firewall rules and workspace private links are enabled, connections must satisfy both security mechanisms. Private link connections bypass IP firewall checks if they originate from the private endpoint.

- **Service-to-service communication**: Some Fabric services communicate between workspaces or with other Microsoft services. Ensure that necessary service IP ranges are included in the allowlist to avoid disrupting functionality.

- **Emergency access**: Always maintain access from at least one reliable IP address to prevent accidental lockout from the workspace.

## Next steps

- To learn how to set up workspace IP firewall rules, see [Set up workspace IP firewall rules](security-workspace-level-firewall-set-up.md).