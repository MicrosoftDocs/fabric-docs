---
title: Microsoft Copilot in Power BI and Fabric (preview)
description: Learn how Microsoft Copilot in Power BI and Microsoft Fabric helps users ask questions about data, incorporate Microsoft 365 context, and work across supported experiences.
author: pm-sara
ms.author: svredevoogd
ms.reviewer: cnews
ms.date: 11/13/2026
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

Users can ask questions about Power BI data with Fabric IQ. Users with Copilot (Premium) can also use Work IQ to bring relevant context from Microsoft 365, such as emails, meetings, chats, and documents, into the same conversation. Shared conversation history lets users continue a discussion as they move between supported Microsoft Copilot experiences instead of starting over in each application.

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
- With Copilot (Premium), combine Fabric data with relevant Microsoft 365 work context.

For more information about data answering, see [Fabric IQ in Microsoft Copilot Chat](microsoft-365-copilot-overview.md).

## Licensing and available capabilities

For an integration comparison and the shared Power BI query billing model, see [Fabric IQ integrations overview](overview.md).

You don't need Copilot (Premium) to use Fabric IQ in this integration; you don't even need Fabric. When the feature is enabled, the Microsoft Copilot entry point appears to users included in the tenant setting's scope. Available capabilities depend on each user's Microsoft Copilot license and access to Fabric content.

| User | Available experience |
| --- | --- |
| Copilot (Premium) | Microsoft Copilot with Fabric IQ and Work IQ. The user can work with Fabric data and permitted Microsoft 365 context, with premium capabilities such as model selection, chat history, and Cowork where available. |
| Copilot chat (basic) | Fabric IQ is available for supported Fabric and Power BI data. Work IQ and grounding in organizational Microsoft 365 content aren't available. Basic license limits apply. |
| M365 Copilot (basic) | Fabric IQ is available for supported Fabric and Power BI data. Work IQ and grounding in organizational Microsoft 365 content aren't available. Basic license limits apply. |

> [!IMPORTANT]
> Basic licenses support Fabric IQ through the embedded Microsoft Copilot entry points in Power BI and Fabric only. To use Fabric IQ in the broader Microsoft Copilot app or web experience, you need Copilot (Premium).

A user's Power BI license type, such as Free, Pro, or Premium Per User (PPU), doesn't determine which Microsoft Copilot experience they receive. However, users must still have permission and licensed access to the Power BI or Fabric content they want to use.

Basic experiences don't include Work IQ organizational grounding or the **Cowork** and **Code** tabs. Model selection is limited, and requests might be throttled to prioritize premium users. For more information about license types, see [What Copilot license do I have?](https://support.microsoft.com/en-us/microsoft-365-copilot/what-copilot-license-do-i-have)

The entry point can appear in tenants that have only Pro workspaces. This integration doesn't require a Premium workspace, a Fabric workspace, or Fabric (F SKU) capacity. These requirements differ from those for Copilot in Fabric.

## Prerequisites

Before users can use Microsoft Copilot in Power BI and Fabric:

- A Fabric administrator must enable **Users can use Copilot and other features powered by Azure OpenAI** in the Fabric admin portal.
- A Fabric administrator must enable the new **Make Microsoft Copilot available in Power BI and Fabric** tenant setting introduced for this preview. The setting is off by default until December 8, 2026, when the default changes to on.
- A Microsoft 365 administrator must enable **Fabric data available in Microsoft Copilot**.
- Users must have permission and licensed access to the Power BI reports, semantic models, and other supported Fabric items they want to use.
- The tenant and content must meet the [supported-region requirements](#which-regions-are-supported).

For Chat data answering in Fabric tenants outside the United States or European Union, also enable **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance**. For more information, see the [cross-geography tenant setting](../../admin/service-admin-portal-copilot.md#data-sent-to-azure-openai-can-be-processed-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance).

You don't need to enable the **Share Fabric data with your Microsoft 365 services** setting when you explicitly reference supported content by link or name. However, this setting affects whether Power BI content appears in Microsoft 365 discovery and attachment experiences. For more information, see [Metadata passed from Microsoft Fabric to Microsoft Graph](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md).

You don't need access to Copilot in Fabric or Fabric capacity to use this integration.

## Enable Microsoft Copilot in Power BI and Fabric

Fabric administrators can make the experience available to their organization.

1. Sign in to the [Fabric admin portal](https://app.fabric.microsoft.com/admin-portal).
1. Select **Tenant settings**.
1. Verify that **Users can use Copilot and other features powered by Azure OpenAI** is enabled for the intended users.
1. Enable the new **Make Microsoft Copilot available in Power BI and Fabric** tenant setting introduced for this preview. The setting is off by default until December 8, 2026, when the default changes to on. This setting is separate from the existing standalone Power BI Copilot setting.
1. Apply the setting to the entire organization or to the supported security groups available in the setting.
1. Select **Apply**.

Users outside the enabled security groups don't see the Microsoft Copilot entry point. An administrator can turn the setting off to remove the entry point from Power BI and Fabric. For default-setting changes and retirement dates, see [Transition from standalone Power BI Copilot](#transition-from-standalone-power-bi-copilot).

> [!NOTE]
> The Power BI Copilot standalone setting remains independent of the Microsoft Copilot tenant setting.  Disabling the standalone tenant setting will remove the entry point in the left nav, the Copilot on Home experience, and the standalone experience in Teams and Mobile.

:::image type="content" source="media/copilot-power-bi-fabric/catalyst-tenant-setting.png" alt-text="Screenshot of the Copilot tenant setting in the Fabric admin portal." lightbox="media/copilot-power-bi-fabric/catalyst-tenant-setting.png":::

> [!NOTE]
> Microsoft 365 administrators must also enable **Fabric data available in Microsoft Copilot**. If that Microsoft 365 setting is disabled, the entry point might still be visible, but Copilot can't use Fabric data in its responses.

## Find Microsoft Copilot

After an administrator enables the preview, select the **Microsoft Copilot** entry point in the left navigation pane of Power BI or Fabric.

Until standalone Power BI Copilot retires on January 15, 2027, the two experiences can coexist:

- If both tenant settings are enabled, users see entry points for both experiences. The standalone experience continues to appear on Power BI Home.
- If Microsoft Copilot is enabled and standalone Power BI Copilot is disabled, users see the Microsoft Copilot entry point but don't see the standalone experience on Home.
- If the Microsoft Copilot setting is disabled, users don't see the Microsoft Copilot entry point in Power BI or Fabric.

## Transition from standalone Power BI Copilot

Microsoft Copilot will ultimately replace standalone Power BI Copilot. The preview doesn't immediately remove the standalone experience: the two experiences can coexist during the transition so that you can evaluate the replacement and prepare your users and administrators.

The transition follows this schedule:

| Date | Milestone |
| --- | --- |
| November 10, 2026 | An admin center notice announces the deprecation of standalone Power BI Copilot, its replacement by Microsoft Copilot, and the date when Microsoft Copilot becomes on by default. |
| November 17, 2026 | The Power BI Feature Blog for Microsoft Ignite announces details of the deprecation and the Microsoft Copilot replacement. |
| December 8, 2026 | The standalone Power BI Copilot tenant setting switches to off by default, and **Make Microsoft Copilot available in Power BI and Fabric** switches to on by default. Administrators can re-enable the standalone setting to continue using those experiences until retirement. |
| January 15, 2027 | Standalone Power BI Copilot and App Copilot are fully retired. Retirement removes the standalone entry point and the standalone experiences in Power BI Home, Teams, and mobile. |

If you turn off the standalone setting before retirement, the standalone entry point and experiences on Power BI Home, Teams, and mobile are removed. Re-enabling the setting restores those experiences only until January 15, 2027; it doesn't extend the retirement date.

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
- The Microsoft Copilot tenant setting is off by default until December 8, 2026, when the default changes to on.
- Enabling the setting makes the entry point visible to users within its configured scope. Licensing and content permissions determine which capabilities each user can use.
- Users with basic licenses can use Fabric IQ but can't ground responses in organizational Microsoft 365 content through Work IQ.
- The standalone Power BI Copilot experience remains available until January 15, 2027, when its separate tenant setting is enabled. That setting switches to off by default on December 8, 2026.
- The **Share Fabric data with your Microsoft 365 services** setting affects discovery and recommendations. Turning it off doesn't prevent users from explicitly referencing supported Power BI content by link or name.
- Copilot answers reflect the data available in the most recent successful semantic model refresh.
- Copilot responses can be inaccurate. Review generated answers and validate important decisions against the source data.
- Fabric administrators can enable or disable the experience for their tenant and scope access to supported security groups.

For this integration's regional requirements, see [Which regions are supported?](#which-regions-are-supported). The capacity requirements for [Copilot in Fabric](../../fundamentals/copilot-enable-fabric.md) don't apply to this integration.

## Frequently asked questions

The following questions cover the transition, licensing, preview availability, billing, administration, and monitoring. For required settings, see [Prerequisites](#prerequisites).

### What is the transition timeline?

| Date | What changes |
| --- | --- |
| November 10, 2026 | An admin center notice announces the standalone Power BI Copilot deprecation, the Microsoft Copilot replacement, and the date when Microsoft Copilot becomes on by default. |
| November 17, 2026 | The Power BI Feature Blog for Microsoft Ignite announces details of the transition. |
| December 8, 2026 | The standalone Power BI Copilot tenant setting switches to off by default. **Make Microsoft Copilot available in Power BI and Fabric** switches to on by default. Administrators can re-enable standalone Power BI Copilot until retirement. |
| January 15, 2027 | Standalone Power BI Copilot and App Copilot retire. The standalone entry point and standalone experiences in Power BI Home, Teams, and mobile are removed. Re-enabling the standalone setting doesn't extend this date. |

For more information, see [Transition from standalone Power BI Copilot](#transition-from-standalone-power-bi-copilot).

### Is Copilot in the report pane going away?

No. Copilot in the Power BI report pane isn't retiring as part of this transition. The retirement applies to standalone Power BI Copilot and App Copilot, not the report-pane experience.

### What licenses do I need?

You don't need Copilot (Premium) to use Fabric IQ through the embedded Microsoft Copilot entry points in Power BI and Fabric. Copilot chat (basic) and M365 Copilot (basic) licenses are supported there. To use Fabric IQ in the broader Microsoft Copilot app or web experience, you need Copilot (Premium).

You still need permission and licensed access to the Power BI or Fabric content you use. Your Power BI license, such as Free, Pro, or PPU, doesn't determine your Microsoft Copilot capabilities. This integration doesn't require a Premium workspace or Fabric (F SKU) capacity, and it supports tenants with only Pro workspaces.

### How do starter (basic) and premium capabilities differ?

| Capability | Starter (basic) | Copilot (Premium) |
| --- | --- | --- |
| Fabric IQ for supported Power BI and Fabric data. | Available through the embedded Power BI and Fabric entry points only. | Available through the embedded entry points and the broader Microsoft Copilot app and web experience. |
| Work IQ grounding in organizational emails, meetings, chats, and documents. | Not available. | Available for content you have permission to access. |
| Model selection. | Limited. | Premium model choices are available. |
| Cowork and Code tabs. | Not available. | Available where supported by the premium experience. |
| Request priority. | Requests might be throttled to prioritize premium users. | Requests receive priority over basic usage. |

Content permissions and licensed access to the underlying Power BI or Fabric content apply to both experiences. For more information, see [Licensing and available capabilities](#licensing-and-available-capabilities).

### Are request failures for basic users resolved?

Some requests from users with basic licenses can fail during the preview. Fixes are planned to roll out shortly; the issue isn't yet resolved for all basic users.

### How does this integration affect Fabric capacity and billing?

Embedding Microsoft Copilot in Fabric doesn't introduce a separate charge. The embedded experience follows the same licensing and charging model as the corresponding Microsoft Copilot app or web experience. Copilot Chat usage is covered by the applicable license; Cowork and other pay-as-you-go scenarios retain their standard charging rules.

Neither Chat nor Cowork bills Fabric capacity units (CUs) for DAX generation. Chat uses Fabric large language models (LLMs) without charging customer Fabric CUs for that LLM usage. For Cowork, the calling LLM generates the DAX.

Power BI query execution is separate from DAX generation and works the same way for premium and basic Copilot users. A DAX query is treated like a query that calculates a measure in a report visual:

- If the underlying semantic model is hosted on your Premium or Fabric capacity, query execution consumes that model's capacity as interactive usage.
- If the underlying semantic model is hosted on shared capacity, the query doesn't introduce an additional customer capacity charge.

Basic users don't need to buy capacity to use this integration. More queries can still add workload, just as ordinary report interactions do. Basic license limits on model selection and other capabilities remain separate from query execution.

### Can I restrict Copilot to specific reports or semantic models?

Yes. You can hide semantic models from Copilot by using the [semantic model Copilot access setting](/power-bi/create-reports/copilot-semantic-models#control-copilot-access-for-semantic-models). This is a model-level setting, not a separate report-level control.

### Which regions are supported?

The integration supports regions with broad Fabric availability, excluding regions that support only Power BI. For the current list, see the **All Fabric workloads** column in [Fabric region availability](../../admin/region-availability.md#all-workloads).

Cross-geography processing requirements still apply to Chat, including in Multi-Geo deployments. See [Prerequisites](#prerequisites) for the required setting for Chat data answering outside the United States or European Union.

### How can I track consumption and usage?

Use the tool that matches what you want to measure:

| What to monitor | Tool |
| --- | --- |
| Source capacity compute consumption, operations, and throttling. | [Microsoft Fabric Capacity Metrics app](../../enterprise/metrics-app.md). |
| Adoption and prompt activity for the report's documented licensed population. | In the Microsoft 365 admin center, go to **Reports** > **Usage** > **Microsoft Copilot**. Don't assume these reports include every basic user. |
| Copilot interactions for compliance investigations. | Microsoft Purview Audit, when auditing is enabled. For more information, see [Microsoft Copilot data protection and auditing](/microsoft-365/copilot/microsoft-365-copilot-architecture-data-protection-auditing). |



## Share feedback

Your feedback helps Microsoft improve this preview. Use the thumbs-up or thumbs-down button in Copilot Chat to provide feedback about an answer. Include details when:

- Copilot doesn't find Fabric content that you expected it to use.
- An answer uses the wrong report, semantic model, or filters.
- The response doesn't reflect the source data.
- The available capabilities don't match the user's license or permissions.
