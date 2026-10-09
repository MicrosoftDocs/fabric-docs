---
title: Copilot in Power BI and Microsoft Fabric (preview)
description: Learn how Copilot in Power BI and Microsoft Fabric helps users ask questions about data, incorporate Microsoft 365 context, and work across supported experiences.
author: s-polly
ms.author: scottpolly
ms.reviewer: cnews
ms.date: 09/17/2026
ms.topic: overview
ms.service: fabric
ai-usage: ai-assisted
---

# Copilot in Power BI and Microsoft Fabric (preview)

[!INCLUDE [feature-preview-note](../../includes/feature-preview-note.md)]

Copilot in Power BI and Microsoft Fabric is a conversational AI experience that users can use to ask natural-language questions about Power BI data and semantic models, augmented with relevant Microsoft 365 context. Users can reference Power BI reports and Fabric items, explore data insights, and continue conversations across supported Copilot experiences without leaving Power BI or Fabric.

During this preview, the experience is integrated directly into Power BI and Fabric, making data exploration and analysis conversational while maintaining organizational security, permissions, and governance controls.

:::image type="content" source="media/copilot-power-bi-fabric/entry-point-power-bi.png" alt-text="Screenshot of Copilot open in Power BI." lightbox="media/copilot-power-bi-fabric/entry-point-power-bi.png":::

## How it works

Copilot connects the context around a business decision with the data used to make it. For example, a sales leader can:

1. Use Fabric IQ to identify which regions are behind plan.
1. Use Work IQ to connect those insights with customer emails, meetings, account plans, and documents.
1. Summarize the full picture in the same conversation.
1. Use follow-up actions, where available, to continue the workflow.

This experience is available directly in Power BI and Fabric, so users don't have to switch to a separate Copilot experience to complete the task. The broader work context and ability to move from insight to action aren't available in the standalone Power BI Copilot experience.

:::image type="content" source="media/copilot-power-bi-fabric/data-answer-catalyst.png" alt-text="Screenshot of a Power BI question and answer based in data." lightbox="media/copilot-power-bi-fabric/data-answer-catalyst.png":::

## What you can do

From Copilot in Power BI and Fabric, users can:

- Find Power BI reports and other supported Fabric items that they have permission to access.
- Ask natural-language questions about Power BI data and receive answers grounded in the report and its semantic model.
- Explore trends, comparisons, summaries, and specific data points.
- Attach supported Power BI content or reference it by name or link.
- Continue conversations across supported Copilot experiences.
- Combine Fabric data with relevant Microsoft 365 work context.

For more information about data grounding, see [Fabric IQ in Copilot Chat](microsoft-365-copilot-overview.md).

## Licensing and available capabilities

During this initial public preview, Copilot in Power BI and Fabric is available only to users with a Copilot Premium license. Users must also have permission and licensed access to the Fabric content they want to use.

| User | Available experience |
| --- | --- |
| User with a Copilot Premium license | Copilot with Fabric IQ and Work IQ. The user can work with Fabric data and permitted Microsoft 365 context. |

A user's Power BI license type, such as Free, Pro, or Premium Per User (PPU), doesn't replace the Copilot Premium license required for this preview. Users must also have permission and licensed access to the Power BI or Fabric content they want to use.

## Prerequisites

Before users can use Copilot in Power BI and Fabric, ensure the following prerequisites are met:

- A Fabric administrator enables **Users can use Copilot and other features powered by Azure OpenAI** in the Fabric admin portal.
- A Fabric administrator enables **Make Copilot available in Power BI and Fabric**. This preview setting is off by default.
- A Microsoft 365 administrator enables **Fabric data available in Copilot**.
- Users have a Copilot Premium license.
- Users have permission and licensed access to the Power BI reports, semantic models, and other supported Fabric items they want to use.
- The tenant and content are in a supported region.

- The **Share Fabric data with your Microsoft 365 services** setting isn't required when a user explicitly references supported content by link or name. However, it affects whether Power BI content appears in Microsoft 365 discovery and attachment experiences. For more information, see [Metadata passed from Microsoft Fabric to Microsoft Graph](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md).

## Enable Copilot in Power BI and Fabric

Fabric administrators can make the experience available to their organization.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal).
1. Select **Tenant settings**.
1. Verify that **Users can access Microsoft Copilot in Power BI and Microsoft Fabric** is enabled for the intended users.
1. Apply the setting to the entire organization or to the supported security groups available for the setting.
1. Select **Apply**.

This setting is off by default during the preview. When you enable it, the entry point is available to eligible users with a Copilot Premium license. An administrator can turn the setting off to remove the Copilot entry point from Power BI and Fabric.

:::image type="content" source="media/copilot-power-bi-fabric/catalyst-tenant-setting.png" alt-text="Screenshot of the Copilot tenant setting in the Fabric admin portal." lightbox="media/copilot-power-bi-fabric/catalyst-tenant-setting.png":::

> [!NOTE]
> Microsoft 365 administrators must also enable **Fabric data available in Copilot**. If that setting is disabled, the entry point might still appear, but Copilot can't use Fabric data in its responses.

## Find Copilot

After an administrator enables the preview, eligible users with a Copilot Premium license can select the **Copilot** entry point in the left navigation pane of Power BI or Fabric.

During the preview, Copilot and the standalone Power BI Copilot experience can coexist. The standalone experience is named **Power BI Copilot**:

- If both **Copilot** and **Power BI Copilot** are enabled, users see entry points for both experiences. The standalone Power BI Copilot experience continues to appear on the Power BI Home page.
- If **Copilot** is enabled and **Power BI Copilot** is disabled, users see the Copilot entry point but not the standalone Power BI Copilot experience on Home.
- If the Copilot setting is disabled, users don't see the Copilot entry point in Power BI or Fabric.

## Expansion to more Fabric users

The initial public preview focuses on users with a Copilot Premium license. In a later rollout, Microsoft plans to expand access to Fabric users who don't have a Copilot Premium license.

This broader Fabric experience provides Copilot capabilities based on the user's Fabric access and available entitlements. It extends conversational data experiences to more people across Power BI and Fabric. Microsoft shares the capabilities, usage limits, rollout timing, and administrator controls for this expanded audience before availability.

## Security, permissions, and governance

Copilot in Power BI and Fabric uses the existing permissions of the signed-in user. It can only access Power BI and Fabric content that the user is authorized to view. Row-level security (RLS) and object-level security (OLS) on Power BI semantic models continue to apply.

Microsoft Purview provides data security and compliance controls for Copilot and Copilot Chat:

- Data Loss Prevention (DLP) policies can detect and restrict sensitive information in Copilot interactions according to your organization's policy configuration.
- Microsoft Purview Information Protection sensitivity labels and their associated access controls continue to protect supported content.
- Microsoft Purview auditing and compliance capabilities can help administrators investigate Copilot activity.

Power BI and Fabric governance controls continue to apply to the source content. Copilot doesn't grant users access to content they couldn't otherwise open.

If a Fabric administrator enables **Only show approved items in Power BI Copilot**, the approved-item restriction is also honored by the Copilot experience during this preview.

For more information, see:

- [Microsoft Purview DLP for Copilot and Copilot Chat](/purview/dlp-microsoft365-copilot-location-learn-about)
- [Microsoft Copilot data protection architecture](/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Sensitivity labels in Power BI](../../enterprise/powerbi/service-security-sensitivity-label-overview.md)

## Considerations and limitations

- This experience is in preview and might change before general availability.
- The Copilot tenant setting is off by default during the preview.
- This initial public preview supports only users with a Copilot Premium license.
- Licensing and content permissions determine whether a user can access the experience and which Fabric content Copilot can use.
- A later rollout is planned for Fabric users who don't have a Copilot Premium license. Capabilities and usage limits for that audience will be announced separately.
- The standalone Power BI Copilot experience remains available during the preview when **Power BI Copilot** is enabled.
- The **Share Fabric data with your Microsoft 365 services** setting affects discovery and recommendations. Turning it off doesn't prevent users from explicitly referencing supported Power BI content by link or name.
- Copilot answers reflect the data available in the most recent successful semantic model refresh.
- Copilot responses can be inaccurate. Review generated answers and validate important decisions against the source data.
- The public preview rolls out progressively to organizations. Fabric administrators choose when to enable the experience for their tenant.

For regional and general Copilot requirements, see [Enable and configure Copilot in Microsoft Fabric](../../fundamentals/copilot-enable-fabric.md).
