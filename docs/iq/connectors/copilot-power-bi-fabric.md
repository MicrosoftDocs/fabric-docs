---
title: Microsoft Copilot in Power BI and Microsoft Fabric (preview)
description: Learn how Microsoft Copilot in Power BI and Microsoft Fabric helps users ask questions about data, incorporate Microsoft 365 context, and work across supported experiences.
author: s-polly
ms.author: scottpolly
ms.reviewer: cnews
ms.date: 10/20/2026
ms.topic: overview
ms.service: fabric
ai-usage: ai-assisted
---

# Microsoft Copilot in Power BI and Microsoft Fabric (preview)

> [!IMPORTANT]
> This feature is in preview.

Copilot experiences are available across many of the applications people use every day, bringing AI closer to the work happening in each product. However, separate entry points and conversations can make it difficult to know which Copilot experience to use.

Microsoft is working toward a consistent Copilot experience that is available wherever people work. Users shouldn't need to leave the application they're using to find Copilot. Instead, Microsoft Copilot can come into their current experience, carry conversation context with them, and connect to the specialized intelligence of each product.

As an important step toward that goal, Microsoft Copilot is integrated directly into Power BI and Microsoft Fabric in public preview. The integration gives users one familiar place to bring together business context and trusted data.

:::image type="content" source="media/copilot-power-bi-fabric/entry-point-power-bi.png" alt-text="Screenshot of Copilot open in Power BI." lightbox="media/copilot-power-bi-fabric/entry-point-power-bi.png":::

Users can ask questions about Power BI data with Fabric IQ. Users with a Microsoft Copilot license can also use Work IQ to bring relevant context from Microsoft 365, such as emails, meetings, chats, and documents, into the same conversation. Shared conversation history lets users continue a discussion as they move between supported Microsoft Copilot experiences instead of starting over in each application.

## How Microsoft Copilot works with Fabric data

Microsoft Copilot connects the context surrounding a business decision with the data used to make it. For example, a sales leader can:

1. Use Fabric IQ to identify which regions are behind plan.
1. Use Work IQ to connect those results with customer emails, meetings, account plans, and documents.
1. Summarize the complete picture in the same conversation.
1. Where available, use Microsoft Copilot Cowork to initiate follow-up actions and tasks.

The user can complete this workflow from Power BI without switching to a separate Copilot experience. The broader work context and ability to move from insight to action aren't available in the standalone Power BI Copilot experience.

:::image type="content" source="media/copilot-power-bi-fabric/data-answer-catalyst.png" alt-text="Screenshot of a Power BI question and answer based in data." lightbox="media/copilot-power-bi-fabric/data-answer-catalyst.png":::

## What you can do

From Microsoft Copilot in Power BI and Fabric, you can:

- Find Power BI reports and other supported Fabric items that you have permission to access.
- Ask natural-language questions about Power BI data and receive answers grounded in the report and its underlying semantic model.
- Explore trends, comparisons, summaries, and specific data points.
- Attach supported Power BI content or reference it by link or name.
- Continue conversations across supported Microsoft Copilot experiences.
- With a Microsoft Copilot license, combine Fabric data with relevant Microsoft 365 work context.

For more information about data answering, see [Fabric IQ in Microsoft Copilot Chat](microsoft-365-copilot-overview.md).

## Licensing and available capabilities

When the feature is enabled, the Microsoft Copilot entry point appears to users in the tenant. The capabilities available within the experience depend on each user's license and access to Fabric content.

| User | Available experience |
| --- | --- |
| User with a Microsoft Copilot license | Microsoft Copilot with Fabric IQ and Work IQ. The user can work with Fabric data and permitted Microsoft 365 context. |
| User with access to Power BI content, but no Copilot license | Fabric IQ is available for supported Fabric and Power BI data. Work IQ and grounding in organizational Microsoft 365 content aren't available. Starter usage limits apply. |
| User without a license or access to Fabric or Power BI content | Copilot can't use that content to answer the question. The user is directed to review the required access or entitlement. |

A user's Power BI license type, such as Free, Pro, or Premium Per User (PPU), doesn't determine which Microsoft Copilot experience they receive. However, users must still have permission and licensed access to the Power BI or Fabric content they want to use.

## Prerequisites

Before users can use Microsoft Copilot in Power BI and Fabric:

- A Fabric administrator must enable **Users can use Copilot and other features powered by Azure OpenAI** in the Fabric admin portal.
- A Fabric administrator must enable **Make Microsoft Copilot available in Power BI and Fabric**. This preview setting is off by default.
- A Microsoft 365 administrator must enable **Fabric data available in Microsoft Copilot**.
- Users must have permission and licensed access to the Power BI reports, semantic models, and other supported Fabric items they want to use.
- The tenant and content must be in a supported region.

The **Share Fabric data with your Microsoft 365 services** setting isn't required when a user explicitly references supported content by link or name. However, the setting affects whether Power BI content appears in Microsoft 365 discovery and attachment experiences. For more information, see [Metadata passed from Microsoft Fabric to Microsoft Graph](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md).
<br>Also note, a user doesn't need to be using Copilot in Fabric, or have access to an F SKU to use Copilot in this scenario.

## Enable Microsoft Copilot in Power BI and Fabric

Fabric administrators can make the experience available to their organization.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal).
1. Select **Tenant settings**.
1. Verify that **Users can use Copilot and other features powered by Azure OpenAI** is enabled for the intended users.
1. Enable **Make Microsoft Copilot available in Power BI and Fabric**.
1. Apply the setting to the entire organization or to the supported security groups available in the setting.
1. Select **Apply**.

The setting is off by default during public preview. An administrator can turn it off to remove the Microsoft Copilot entry point from Power BI and Fabric. <br> The Power BI Copilot standalone setting remains independent of the Microsoft Copilot tenant setting.  Disabling the standalone tenant setting will remove the entry point in the left nav, the Copilot on Home experience, and the standalone experience in Teams and Mobile.

:::image type="content" source="media/copilot-power-bi-fabric/catalyst-tenant-setting.png" alt-text="Screenshot of the Copilot tenant setting in the Fabric admin portal." lightbox="media/copilot-power-bi-fabric/catalyst-tenant-setting.png":::

> [!NOTE]
> Microsoft 365 administrators must also enable **Fabric data available in Microsoft Copilot**. If that Microsoft 365 setting is disabled, the entry point might still be visible, but Copilot can't use Fabric data in its responses.

## Find Microsoft Copilot

After an administrator enables the preview, select the **Microsoft Copilot** entry point in the left navigation pane of Power BI or Fabric.

During the preview, Microsoft Copilot and the standalone Power BI Copilot experience can coexist:

- If both tenant settings are enabled, users see entry points for both experiences. The standalone experience continues to appear on Power BI Home.
- If Microsoft Copilot is enabled and standalone Power BI Copilot is disabled, users see the Microsoft Copilot entry point but don't see the standalone experience on Home.
- If the Microsoft Copilot setting is disabled, users don't see the Microsoft Copilot entry point in Power BI or Fabric.

## Transition from standalone Power BI Copilot

Standalone Power BI Copilot is deprecated as part of the introduction of this preview. It isn't removed when the preview begins. The two experiences coexist during the transition so that organizations have time to evaluate Microsoft Copilot in Power BI and Fabric, prepare users and administrators, and provide feedback.

In a future phase:

- The Microsoft Copilot tenant setting will be enabled by default.
- Microsoft Copilot will become the primary Copilot experience in Power BI and Fabric.
- Standalone Power BI Copilot will be retired, including Teams and Mobile experiences.

Microsoft will publish the final retirement date and provide administrators with advance notice before standalone Power BI Copilot is removed.

## Security, permissions, and governance

Microsoft Copilot in Power BI and Fabric uses the existing permissions of the signed-in user. Copilot can only access Power BI and Fabric content that the user is authorized to view. Row-level security (RLS) and object-level security (OLS) on Power BI semantic models continue to apply.

Microsoft Purview provides data security and compliance controls for Microsoft Copilot and Copilot Chat:

- Data Loss Prevention (DLP) policies can detect and restrict sensitive information in Copilot interactions according to your organization's policy configuration.
- Microsoft Purview Information Protection sensitivity labels and their associated access controls continue to protect supported content.
- Microsoft Purview auditing and compliance capabilities can help administrators investigate Copilot activity.

Power BI and Fabric governance controls continue to apply to the source content. Microsoft Copilot doesn't grant users access to content they couldn't otherwise open.

If a Fabric administrator enables **Only show approved items in the standalone Copilot in Power BI experience**, the approved-item restriction is also honored by the Microsoft Copilot experience during this preview.

For more information, see:

- [Microsoft Purview DLP for Microsoft Copilot and Copilot Chat](/purview/dlp-microsoft365-copilot-location-learn-about)
- [Microsoft Copilot data protection architecture](/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing)
- [Sensitivity labels in Power BI](../../enterprise/powerbi/service-security-sensitivity-label-overview.md)

## Considerations and limitations

- This experience is in preview and might change before general availability.
- The Microsoft Copilot tenant setting is off by default during the preview.
- Enabling the setting makes the entry point visible tenant-wide. Licensing and content permissions determine which capabilities each user can use.
- Users with the Copilot Chat starter experience can use Fabric IQ but can't ground responses in organizational Microsoft 365 content through Work IQ.
- The standalone Power BI Copilot experience remains available during the preview when its separate tenant setting is enabled.
- The **Share Fabric data with your Microsoft 365 services** setting affects discovery and recommendations. Turning it off doesn't prevent users from explicitly referencing supported Power BI content by link or name.
- Copilot answers reflect the data available in the most recent successful semantic model refresh.
- Copilot responses can be inaccurate. Review generated answers and validate important decisions against the source data.
- The public preview rolls out progressively to organizations. Fabric administrators choose when to enable the experience for their tenant.

For regional and general Copilot requirements, see [Enable and configure Copilot in Microsoft Fabric](../../fundamentals/copilot-enable-fabric.md).

## Share feedback

Your feedback helps Microsoft improve this preview. Use the thumbs-up or thumbs-down button in Copilot Chat to provide feedback about an answer. Include details when:

- Copilot doesn't find Fabric content that you expected it to use.
- An answer uses the wrong report, semantic model, or filters.
- The response doesn't reflect the source data.
- The available capabilities don't match the user's license or permissions.
