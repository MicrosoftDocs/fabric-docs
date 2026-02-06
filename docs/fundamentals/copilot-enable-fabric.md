---
title: Enable Copilot in Fabric
description: Learn how to enable Copilot in Fabric and Power BI, which brings a new way to transform and analyze data, generate insights, and create visualizations.
author: snehagunda
ms.author: sngun
ms.reviewer: shlindsay
ms.custom:
ms.topic: how-to
ms.date: 04/02/2025
ms.update-cycle: 180-days
no-loc: [Copilot]
ms.collection: ce-skilling-ai-copilot
---

# Enable Copilot in Fabric

Copilot and other generative AI features in preview bring new ways to transform and analyze data, generate insights, and create visualizations in Microsoft Fabric and Power BI To use Copilot, you have to first enable Copilot in Fabric.

 **Copilot in Microsoft Fabric is enabled by default**. Administrators can disable Copilot from the admin portal if your organization isn't ready to adopt it. Administrators can refer to the [Copilot tenant settings](../admin/service-admin-portal-copilot.md) article for details.

The following screenshot shows the tenant setting where Copilot can be enabled or disabled:

:::image type="content" source="media/copilot-enable-fabric/enable-copilot.png" alt-text="Screenshot showing the tenant setting where copilot can be enabled and disabled.":::

Copilot in Microsoft Fabric is rolling out gradually, ensuring all customers with paid Fabric capacities (F2 or higher) gain access. It automatically appears as a new setting in the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal) when available for your tenant. Once billing starts for the Copilot in Fabric experiences, Copilot usage will count against your existing Fabric capacity.

> [!WARNING]
> Enabling Copilot in Fabric for your entire tenant without adequate planning and preparation can lead to higher Fabric capacity utilization and other potential risks. Consider enabling Copilot in Fabric for specific security groups and workspaces only after you take the appropriate steps to prepare.
>
> Also, it isn't possible to enable only specific Copilot experiences, like using Copilot in the DAX query view of Power BI semantic models. You can only control whether Copilot is enabled or not at the level of each workload.

## Prerequisites

Enabling Copilot in Fabric involves several prerequisites and steps, as described in the following table:

| **Step** | **Where you take this step** | **Description**
|---|---|---
| 1 | Azure portal | You must have a supported SKU to use Copilot in Fabric. Pro and PPU workspaces don't directly support Copilot features. To use Copilot in these workspaces, you must enable a [Fabric Copilot capacity](../enterprise/fabric-copilot-capacity.md) and assign the workspace to that capacity.
| 2 | Azure portal | Your Fabric capacity must be [in a supported region](../admin/region-availability.md) to enable Copilot in Fabric.
| 3 | Microsoft 365 admin center | You should [create and manage one or more security groups](/power-platform/admin/control-user-access#create-a-security-group-and-add-members-to-the-security-group) for users who are allowed to use Copilot in Fabric. Using security groups is a good way to ensure that you limit rollout to some—and not all—users, for instance, after they have completed prerequisite training.
| 4 | Fabric tenant settings | You must enable the relevant [Copilot tenant settings](../admin/service-admin-portal-copilot.md), including the settings [*Users can use Copilot and other features powered by Azure OpenAI*](../admin/service-admin-portal-copilot.md#users-can-use-copilot-and-other-features-powered-by-azure-openai) and [*Data sent to Azure OpenAI can be processed outside your capacity’s geographic region, compliance boundary, or national cloud instance*](../admin/service-admin-portal-copilot.md#data-sent-to-azure-openai-can-be-processed-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance).<br><br>You can choose to enable Copilot for only select security groups. Copilot in Fabric is enabled by default for the entire tenant.
| 5 | Capacity settings | If tenant settings are delegated to capacity administrators, then you must enable Copilot in the delegated tenant settings of your capacity settings for the Fabric capacity you'll use with Copilot.<br><br>You can choose to enable Copilot for only select security groups in the delegated tenant settings.
| 6 | Workspace settings and workspace roles | You must assign a workspace and provision workspace access to the individuals who will use Copilot. Fabric items using Copilot must be in this workspace, but they might consume or refer to items in other workspaces or capacities.
| 7 | Power BI Desktop settings | To use Copilot in Power BI Desktop, you must select a supported workspace (described in step 6).

> [!NOTE]
> You don't need to enable Fabric to use Copilot in Power BI. You can enable Copilot for the Power BI workload without enabling the other Fabric workloads; for instance, if you have a P SKU.

See the article [Overview of Copilot in Fabric](copilot-fabric-overview.md) for details on its functionality across workloads, data security, privacy compliance, and responsible AI use.

## Related content

- [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
- [Copilot in Fabric: FAQ](../fundamentals/copilot-faq-fabric.yml)
- [AI services in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
- [Copilot in Power BI](/power-bi/create-reports/copilot-introduction)
