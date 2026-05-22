---
title: Enable and configure Copilot in Microsoft Fabric
description: Learn how to enable Copilot in Fabric and Power BI by configuring tenant settings, capacity settings, and workspace access for your organization.
author: SnehaGunda
ms.author: sngun
ms.reviewer: shlindsay
ms.topic: how-to
ms.date: 05/22/2026
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
ai-usage: ai-assisted

#customer intent: As a Fabric administrator, I want to enable Copilot in my organization so that users can use AI-powered features in Fabric and Power BI.
---

# Enable and configure Copilot in Microsoft Fabric

Copilot in Microsoft Fabric is an AI assistant that helps you transform data, generate insights, and create visualizations across Fabric and Power BI. For details on Copilot functionality and responsible AI use, see [Overview of Copilot in Fabric](copilot-fabric-overview.md).

Although Copilot is enabled by default for tenants with paid Fabric capacities (F2 or higher), you need to verify and configure tenant settings, manage capacity-level options, and control which users and workspaces have access.

This article covers the tenant settings, delegated capacity configuration, and workspace assignments required to fully enable Copilot in your organization.

## Prerequisites

- A paid Fabric capacity (F2 or higher) or a Power BI Premium capacity (P1 or higher). Pro and PPU workspaces don't directly support Copilot features. To use Copilot in these workspaces, enable a [Fabric Copilot capacity](../enterprise/fabric-copilot-capacity.md) and assign the workspace to that capacity.
- A Fabric capacity [in a supported region](../admin/region-availability.md).
- One or more [security groups](/power-platform/admin/control-user-access#create-a-security-group-and-add-members-to-the-security-group) to scope which users can use Copilot. Security groups let you limit rollout to specific users, for example, after they complete prerequisite training.

> [!NOTE]
> You don't need to enable Fabric to use Copilot in Power BI. You can enable Copilot for the Power BI workload without enabling the other Fabric workloads — for instance, if you have a P SKU.

After you meet the prerequisites, complete the following steps to enable Copilot. Select a link in the **Step** column for detailed instructions.

| **Step** | **Where** | **Description** |
|---|---|---|
| 1. [Enable Copilot tenant settings](#enable-copilot-tenant-settings) | Fabric admin portal | Enable the Copilot tenant settings and scope them to specific security groups. |
| 1. [Configure delegated capacity settings](#configure-delegated-capacity-settings) | Fabric admin portal | If tenant settings are delegated, enable Copilot in the capacity-level settings. |
| 1. [Assign workspaces and provision access](#assign-workspaces-and-provision-access) | Workspace settings | Assign a workspace to a Copilot-enabled capacity and grant access to users. |
| 1. [Enable Copilot in Power BI Desktop](#enable-copilot-in-power-bi-desktop) (optional) | Power BI Desktop | If you use Power BI Desktop, select a Copilot-enabled workspace as your active workspace. |

## Enable Copilot tenant settings

Copilot in Fabric is rolling out gradually to all tenants with paid Fabric capacities (F2 or higher). It automatically appears as a new setting in the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) when available for your tenant.

> [!WARNING]
> Enabling Copilot for your entire tenant without proper planning can lead to higher capacity utilization and other potential risks. Consider enabling Copilot for specific security groups and workspaces only after you prepare.
>
> You can't enable only specific Copilot experiences, like using Copilot in the DAX query view of Power BI semantic models. You can only control whether Copilot is enabled at the workload level.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal).

1. Select **Tenant settings**.

1. Enable the [Users can use Copilot and other features powered by Azure OpenAI](../admin/service-admin-portal-copilot.md#users-can-use-copilot-and-other-features-powered-by-azure-openai) setting.

1. Enable the [Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance](../admin/service-admin-portal-copilot.md#data-sent-to-azure-openai-can-be-processed-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance) setting.

1. Optionally, apply each setting to specific security groups rather than the entire organization.

   :::image type="content" source="media/copilot-enable-fabric/enable-copilot.png" alt-text="Screenshot of the Fabric admin portal with the Copilot tenant setting toggle highlighted.":::

For more information about these settings, see [Copilot tenant settings](../admin/service-admin-portal-copilot.md).

## Configure delegated capacity settings

If the Copilot tenant settings are [delegated to capacity administrators](../admin/delegate-settings.md), each capacity administrator must also enable Copilot for their specific Fabric capacity.

1. In the Fabric admin portal, open the capacity settings for the Fabric capacity you plan to use with Copilot.

1. In the delegated tenant settings, enable the **Users can use Copilot and other features powered by Azure OpenAI** setting.

1. Enable the **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance** setting.

1. Optionally, apply each setting to specific security groups.

## Assign workspaces and provision access

Fabric items that use Copilot must be in a workspace assigned to a supported capacity. Assign workspace roles to users who need Copilot.

1. Assign a workspace to a Fabric capacity that has Copilot enabled.

1. Grant workspace access to users who need Copilot. Items using Copilot must be in this workspace, but they might consume or refer to items in other workspaces or capacities.

## Enable Copilot in Power BI Desktop

To use Copilot in Power BI Desktop, you must connect to a workspace that is assigned to a Copilot-enabled Fabric capacity.

1. Open Power BI Desktop.

1. Select a workspace that has Copilot enabled as your active workspace.

Copilot usage in Power BI Desktop counts against the Fabric capacity assigned to the selected workspace.

## Related content

- [What is Microsoft Fabric?](microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](copilot-faq-fabric.yml)
- [Foundry Tools in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
- [Copilot in Power BI](/power-bi/create-reports/copilot-introduction)

