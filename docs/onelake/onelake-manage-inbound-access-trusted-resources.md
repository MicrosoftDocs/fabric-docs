---
title: Manage inbound access to OneLake with resource instance rules
description: Learn how Resource Instance Rules let workspace admins restrict inbound access to OneLake based on approved Azure resource instances.
ms.reviewer: eloldag, mabasile
ms.topic: concept-article
ms.date: 03/09/2026
#customer intent: As a workspace admin, I want to restrict inbound access to OneLake based on approved Azure resources so that only trusted resource instances can reach my data.
---

# Manage inbound access to OneLake with resources instance rules

Resource Instance Rules let workspace admins restrict public network access to OneLake by allowing inbound access only from approved Azure resource instances. Instead of managing public IP allowlists or requiring private networking for every integration, admins can explicitly allow access from trusted Azure resource instances such as Azure Databricks workspaces or  Azure SQL DB.

Microsoft Fabric supports multiple inbound protection options, including workspace IP firewall rules and Private Links. While these controls are effective for managing access based on network location, they can be difficult to apply when traffic originates from managed Azure services that use dynamic or shared outbound IP addresses.

Resource Instance Rules address this scenario by enabling instance‑based inbound access using Azure resource identity. This approach simplifies connectivity from Azure‑hosted services without requiring IP address tracking or Private Link deployment, and works alongside existing Fabric inbound protection features.

This article explains how Resource Instance Rules work for OneLake and when to use them. To learn about other inbound protection options, see [Inbound network protection in Microsoft Fabric](../security/security-inbound-overview.md).

> [!NOTE]
> Resource Instance Rules apply only to inbound access. They don't govern or restrict outbound connections from the workspace.

## How Resource Instance Rules work

When Resource Instance Rules are enabled on a workspace, OneLake allows inbound public network access only from Azure resource instances that are explicitly approved by the workspace admin. Inbound requests may also be allowed when they originate from approved workspace private endpoints or from public IP ranges that are allowed through workspace IP firewall rules (if configured).

For example:

- Workspace A allows access only from Azure Resource X.
- A request from Azure Resource Y is denied because it isn't on the approved list.
- A request from Azure Resource X is allowed because it matches an approved resource instance.

Allowing a resource instance through Resource Instance Rules doesn't grant that resource access to all data in the workspace. The resource must still satisfy the applicable authentication, authorization, and item-level permission requirements for the OneLake data that it tries to access.

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
- You can configure 25 resources instance rules per workspace.
- Resource Instance Rules can be used together with workspace Private Link and workspace IP firewall rules.
- If you misconfigure the rules, you might block access to the workspace. Use API-based management as a recovery path if portal access isn't available.
- Only Azure resources that can present a verifiable identity and claims to OneLake can be added as trusted resource instances.

## Related content

- [Limit inbound requests with inbound access protection](onelake-manage-inbound-access.md)
- [Protect workspaces by using IP firewall rules](../security/security-workspace-level-firewall-overview.md)
- [Inbound network protection in Microsoft Fabric](../security/security-inbound-overview.md)