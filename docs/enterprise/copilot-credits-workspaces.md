---
title: Use Copilot Credits in Microsoft Fabric (preview)
description: Learn how supported experiences can provision Copilot Credits workspaces in Fabric, who pays for usage, and how to manage billing and spending.
ms.service: fabric
ms.subservice: enterprise
ms.topic: concept-article
ms.date: 11/19/2026
author: thearsalann
ms.author: ayarveisi
ms.reviewer: ayarveisi
ai-usage: ai-generated
---

# Use Copilot Credits in Microsoft Fabric

A **Copilot Credits workspace** is a Fabric workspace where one designated user's Copilot Credits pay for all eligible Fabric usage. You pay for usage as you consume resources, including operations that other people start when they access items in the workspace. Regular Fabric workspace, item, and data permissions still apply.

Supported experiences auto-provision these workspaces as part of their integration with Fabric. You can't create them directly in the Fabric portal, and you can't convert existing workspaces to use Copilot Credits.

> [!IMPORTANT]
> Copilot Credits workspaces are available only to Frontier users through supported experiences.

## Supported experiences

### Building apps with Copilot Managed Runtime CLI

Fabric [integrates with Copilot Managed Runtime](/microsoft-365/copilot-managed-runtime/backend-integration/fabric-integration) to provide backend as a service for Copilot Managed Runtime apps. The [Copilot Managed Runtime CLI](/microsoft-365/copilot-managed-runtime/developer/apps/ms-cli-command-reference#ms-app-add-backend) provides the entry point for adding the Fabric backend in the app-development workflow. Copilot Managed Runtime hosts and governs the app, while Fabric provides its database and backend resources, powered by Microsoft Fabric's [Fabric Apps](/fabric/apps/overview) workload.

## Prerequisites

To use Copilot Credits for Fabric usage in any of the supported scenarios, you need:

- Access to the supported Frontier experience.
- A Fabric Free, Power BI Pro, or Power BI Premium Per User license.
- [Copilot Credits usage-based billing](https://go.microsoft.com/fwlink/?linkid=2368800) enabled; an active spending policy that covers **Copilot Managed Runtime** with enough credits
- Permission to create Fabric workspaces under your organization's [workspace creation settings](/fabric/admin/portal-workspace)
- Support for the required Fabric items in your tenant's home region.
- Additional requirements might apply according to each of the supported experiences.

## How it works

The supported experience, such as the Copilot Managed Runtime CLI, orchestrates all the Fabric provisioning and configurations behind the scenes:

1. The app maker selects Fabric as its backend as a service provider through the supported experience.
1. The app maker automatically gets a **Copilot Credits** workspace and the supported Fabric items needed by the app. There's no need to manually create them or choose a Fabric capacity.
1. The app maker becomes the admin of that workspace and is designated as its billable user.
1. Operations in that workspace consume the billable user's credits, regardless of who initiated them.
1. The auto-created workspace is visible in the Fabric portal and can be directly accessed and managed.
1. The request fails if any prerequisite isn't met.


> [!NOTE]
> Using this integration doesn't replace required Fabric licenses, workspace permissions, or item permissions.


## Whose credits are consumed

Each Copilot Credits workspace has exactly one billable user. That user's credits fund all eligible workspace usage, regardless of which authorized person starts an operation.

| Action | Billing effect |
| --- | --- |
| A supported integration provisions Fabric resources for an app maker | The app maker becomes the workspace's billable user. |
| Another authorized user runs the app | Incurred usage charges go against the billable user's credits, not the app consumer. |
| Another authorized user creates other items in the workspace | Incurred usage charges go against the billable user, not the operation initiator. |
| Another workspace admin is added to the workspace | The billable user doesn't change. |
| Another eligible admin explicitly takes over funding | Their credits fund eligible usage after the change succeeds. |
| The workspace moves to Fabric capacity | New compute usage uses the assigned capacity after the change succeeds. |

> [!IMPORTANT]
> Consider shared usage before sharing apps or granting others permission to operate in a workspace you fund.

Granting access doesn't transfer billing responsibility and changing who funds the workspace doesn't change workspace, item, or data permissions.

## Another admin can take over funding

If you have the workspace admin role, you can open an existing Copilot Credits workspace in the Fabric portal and change its billable user to yourself, provided that you have available credits.

You can assign only your own credits by going to **Workspace settings** > **Workspace type** > **Edit** > **Use my credits**. Another admin can't nominate you or another person as the billable user.


Your credits fund eligible usage after the change succeeds and the workspace will always have one billable user at a given time. It might take up to five minutes for funding takeover to take effect.

## When credits run out

When the billable user's credits run out or the applicable spending-policy coverage is no longer valid, the system rejects all new operations (throttling). This change affects other users of the workspace and shared apps, not only the billable user.

To restore operation, use an option appropriate to your permissions and spending policy:

- Ask a Microsoft 365 administrator to review policy coverage, spending limits, and available funding and increase limits or define new spending policies.
- Wait for the allowance to reset if the spending policy resets on a defined cadence.
- Have another eligible workspace admin explicitly take over funding with their own credits.
- Assign the workspace to eligible Fabric capacity.

New work can resume after valid funding is restored and the change takes effect, typically within 20-30 minutes of replenishment or reset. Fabric doesn't automatically choose another workspace user to charge.

## Move to Fabric capacity

Use Fabric capacity when you want your organization's capacity to fund workspace compute instead of one user's Copilot Credits.

You need the workspace **Admin** role and permission to assign the target capacity. The capacity must be eligible, support the workspace's items, and be in the tenant's home region. To do that:

1. Open **Workspace settings** > **Workspace type**.
1. Select **Edit** and choose the Fabric capacity workspace type.
1. Select the eligible target capacity and confirm the change.

> [!IMPORTANT]
> Changing the workspace type for a Copilot Credits workspace is irreversible during preview. You can't change the workspace back to Copilot Credits.

After the change succeeds, the workspace retains its identity, content, permissions, and sharing configuration. New compute usage uses the assigned capacity; earlier usage remains attributable to the previous funding mode.

## Pricing and usage

Copilot Credits cost $0.01 per credit. Fabric measures compute consumption in capacity units (CUs) over time. For usage-based billing, Fabric converts usage to Copilot Credits based on consumption rates of individual workloads, Fabric regional pricing, and workload-specific on-demand multipliers.

For example, one Fabric CU is equivalent to 0.383 SQL database vCores. SQL operations consume vCores based on various factors. These vCores convert to CUs, which multiply by 2 (on-demand billing multiplier), and then multiply by the CU pay-as-you-go pricing for the region where the operation occurred. This amount converts to Copilot Credits and decrements against the billable user's limits.

| Operation | What contributes to usage | On-demand billing multiplier |
| --- | --- | --- |
| Sql Usage | SQL queries, data changes, and processing within the database | 2 |
| Sql Uptime | Database uptime reported as eligible compute usage | 2 |

For more information on regional pricing, see [Microsoft Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/). To understand on-demand billing multipliers, see [Understand on-demand billing multipliers](/fabric/enterprise/on-demand-billing-meters-multipliers).

For descriptions of Fabric operations and how they consume resources, see [Fabric operations](/fabric/enterprise/fabric-operations).


> [!NOTE]
> Work performed in the app building experience to build the app follows that service's credit consumption model. Fabric consumption is billed separately against the workspace's current billable user's credits and starts after provisioned resources initiate consumption reporting.


## Monitor usage and manage spending

To enable usage-based billing for Fabric usage and enable the supported experience, a Microsoft 365 administrator must configure a spending policy to allow the user to use their credits for the **Copilot Managed Runtime** service. As such, Fabric consumption from these workspaces appears under **Copilot Managed Runtime** in the Microsoft 365 admin center:

1. Go to **Copilot** > **Cost Management**.
1. Use **Overview** to review overall consumption and policies or users approaching their limits.
1. Open **Consumption**, select the reporting period, and review **Copilot Managed Runtime** in **Agents and services**.
1. Use **Policies** and **Users** to investigate the applicable spending policy and each user's attributed credit consumption.

These views are at the service, policy, and user levels. A total can include multiple apps or workspaces and usage by shared consumers.

For policy configuration, supported roles, and reporting instructions, see [Set up usage-based billing for Copilot Credits](/copilot/implement/usage-based-billing-copilot-credits-setup) and [Monitor Copilot Credit spending](/copilot/implement/usage-based-billing-copilot-credits-monitor-spending).
