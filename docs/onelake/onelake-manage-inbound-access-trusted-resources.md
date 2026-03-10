---
title: Manage inbound access to OneLake with trusted resources
description: Learn how Resource Instance Rules let workspace admins restrict inbound access to OneLake based on approved Azure resource instances.
ms.reviewer: eloldag, mabasile
ms.topic: concept-article
ms.date: 03/09/2026
ai-usage: ai-assisted
#customer intent: As a workspace admin, I want to restrict inbound access to OneLake based on approved Azure resources so that only trusted resource instances can reach my data.
---

# Manage inbound access to OneLake with trusted resources

Resource Instance Rules let workspace admins restrict access to OneLake based on specific Azure resource instances instead of public IP addresses. This capability allows access only when requests originate from approved Azure resources, such as specific Azure services or instances. It adds a network control that's tied to the trusted resource itself rather than to a public IP range.

This article explains how Resource Instance Rules work for OneLake and when to use them. To learn about other inbound protection options, see [Inbound network protection in Microsoft Fabric](../security/security-inbound-overview.md).

## Resource Instance Rules overview

Microsoft Fabric provides multiple layers of inbound protection, including Microsoft Entra Conditional Access, tenant-level Private Link, workspace-level Private Link, and workspace IP firewall rules. While IP firewall rules are useful for controlling access from known public IP ranges, some organizations need a more precise model that ties access to trusted Azure resources themselves, regardless of the outbound IP addresses those resources use.

Resource Instance Rules address this requirement by letting workspace admins explicitly approve Azure resource instances that can access OneLake. This approach is especially useful when traffic originates from managed Azure services or when IP-based allow lists are difficult to maintain.

Resource Instance Rules work alongside existing Fabric security features and don't require tenant-wide configuration changes.

> [!NOTE]
> Resource Instance Rules apply only to inbound access. They don't govern or restrict outbound connections from the workspace.

## How Resource Instance Rules work

When Resource Instance Rules are enabled on a workspace, OneLake evaluates inbound requests based on the calling Azure resource identity and instance metadata.

Only the following connections are allowed:

- Requests from Azure resource instances that are explicitly approved in the workspace's Resource Instance Rules.
- Requests from resources that access the workspace through approved workspace private endpoints.

> [!NOTE]
> Allowing a resource instance through Resource Instance Rules doesn't grant that resource access to all data in the workspace. The resource must still satisfy the applicable authentication, authorization, and item-level permission requirements for the OneLake data that it tries to access.

For example:

- Workspace A allows access only from Azure Resource X.
- A request from Azure Resource Y is denied because it isn't on the approved list.
- A request from Azure Resource X is allowed because it matches an approved resource instance.

## When to use Resource Instance Rules

Resource Instance Rules are useful when you need to allow OneLake access from Azure-hosted services without relying on public IP address management.

Common scenarios include:

- Allowing access from specific Azure resource instances whose outbound IP addresses are dynamic or shared.
- Restricting access based on the identity of a trusted Azure resource instead of a network range.
- Combining resource-based access restrictions with workspace private links or IP firewall rules for layered protection.

If you need to allow user access from office networks, VPN gateways, or partner public IP ranges, use [workspace IP firewall rules](../security/security-workspace-level-firewall-overview.md).

## Configure Resource Instance Rules

You can manage Resource Instance Rules through the same workspace inbound networking experience that you use for other workspace-level inbound protections, or by using the Fabric REST APIs. The available configuration method depends on your tenant-level inbound access settings.

### Prerequisites

Before you configure Resource Instance Rules, ensure the following requirements are met:

- A Fabric admin enables the tenant setting that allows workspace-level inbound network protections.
- You have the workspace admin role for the workspace that you want to protect.
- The workspace is assigned to a supported capacity.
- The Azure resource that you want to allow must be a supported resource type and must be able to present a verifiable Azure resource identity to Fabric.

### Access requirements for portal and API configuration

How you configure Resource Instance Rules depends on your tenant's inbound network settings:

- If tenant-level public internet access to Fabric is enabled, workspace admins can configure Resource Instance Rules directly in the Fabric portal.
- If your tenant requires access through Private Link, you can open workspace network settings in the portal only from a network that is connected through the tenant Private Link.
- The REST API remains available through the supported endpoint and network path, which gives you a recovery option if portal access isn't available.

### Set up Resource Instance Rules in the Fabric portal

In the Fabric portal:

1. Go to the workspace that you want to protect, and then select **Workspace settings** > **Inbound networking**.

	:::image type="content" source="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_setting_for_selected.jpg" alt-text="Screenshot showing the workspace inbound networking setting for selected networks and private links." lightbox="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_setting_for_selected.jpg":::

1. In the workspace inbound settings, select the option that restricts access to selected networks and approved resources.

	:::image type="content" source="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_setting_for_selected_resources.jpg" alt-text="Screenshot showing the workspace inbound networking setting for selected resources." lightbox="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_setting_for_selected_resources.jpg":::

1. Add the Azure resource instances that should be allowed to access OneLake. When you add a resource, specify the full Azure Resource Manager (ARM) resource ID for that Azure resource instance.

	:::image type="content" source="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_add_resources_1.jpg" alt-text="Screenshot showing the first step of adding Azure resource instances to the inbound access list." lightbox="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_add_resources_1.jpg":::

1. Review the selected resource details, and then save the configuration.

	:::image type="content" source="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_add_resources_2.jpg" alt-text="Screenshot showing the second step of adding Azure resource instances and saving the inbound access configuration." lightbox="media/onelake-manage-inbound-access-trusted-resources/Workspace_inbound_add_resources_2.jpg":::

## Considerations and limitations

- Resource Instance Rules apply only to inbound access to the workspace.
- Resource Instance Rules control which resource instances can reach OneLake over the network, but they don't expand the data scope that the resource is authorized to access.
- Only Azure resources that can present a verifiable identity and claims to OneLake can be added as trusted resource instances.
- Resource Instance Rules can be used together with workspace Private Link and workspace IP firewall rules.
- Keep an API-based recovery path available in case a rule change prevents portal access.
- If you misconfigure the rules, you might block access to the workspace. Use API-based management as a recovery path if portal access isn't available.

## Related content

- [Limit inbound requests with inbound access protection](onelake-manage-inbound-access.md)
- [Protect workspaces by using IP firewall rules](../security/security-workspace-level-firewall-overview.md)
- [Inbound network protection in Microsoft Fabric](../security/security-inbound-overview.md)