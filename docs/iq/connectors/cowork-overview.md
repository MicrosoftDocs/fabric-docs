---
title: Fabric IQ in Microsoft 365 Copilot Cowork
description: Learn how the Fabric IQ plugin brings Microsoft Fabric and Power BI data into Microsoft 365 Copilot Cowork, including supported scenarios, limitations, and tenant prerequisites.
ms.date: 07/10/2026
ms.topic: concept-article
ai-usage: ai-assisted
#customer intent: As a Fabric or Power BI user, I want to understand what the Fabric IQ plugin in Microsoft 365 Copilot Cowork does so I can use Power BI and Fabric data inside Cowork chats.
---

# Fabric IQ in Microsoft 365 Copilot Cowork

The **Fabric IQ** plugin connects [Microsoft 365 Copilot Cowork](/microsoft-365/copilot/cowork/get-started) to your Microsoft Fabric and Power BI data. When you enable the plugin, a Power BI report isn't the end of a workflow - it's the starting point. You can ground a Cowork chat in trusted business data, then chain that data into the other Cowork skills you already use, like drafting emails, creating documents, or scheduling reviews, without leaving the conversation.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

Microsoft 365 Copilot Cowork is generally available. The Fabric IQ plugin is in preview and available to all Power BI customers who use Cowork.

[Fabric IQ](../overview.md) is the Microsoft Fabric workload that gives analytics, AI agents, and apps a consistent business vocabulary on top of unified OneLake data. The Cowork plugin brings that experience into the everyday flow of Microsoft 365 work, starting with Power BI reports and semantic models.

The Fabric IQ plugin is installed by default in Cowork. For the broader list of plugins available in Cowork, see [Available plugins for Copilot Cowork](/microsoft-365/copilot/cowork/cowork-available-plugins).

## What you can do with the Fabric IQ plugin

With the Fabric IQ plugin enabled in Cowork, you can:

- Ground a Cowork chat in a specific Power BI report and ask questions about the data it contains.
- Reference a Power BI report that you have access to, including reports in Power BI workspace apps, and ask Cowork to summarize it, compare values, or explain a trend.
- Get answers based on row-level data through value search, where it's available in your region.
- Chain a data answer into other Cowork skills, such as drafting an email, creating a document, or scheduling a follow-up meeting, all in the same chat.

Cowork now runs natively on Fabric IQ conversational analytics, which brings several improvements to how it discovers and answers questions on your Power BI data:

- Expanded artifact discovery and search that uses a tuned semantic index and signals like endorsements, cross-item relationships, and most-recently-used activity to find the right report.
- Support for reports in Power BI workspace apps, one of the most common report types in production.
- Support for Power BI tooling such as Verified Answers and schema selection.
- Improved handling for large reports and semantic model schemas.
- Improved report context handling and report grounding, with higher overall answer quality.

Under the covers, Cowork queries Power BI semantic models and reports on your behalf and uses Cowork-native search to find the right Power BI artifacts when you reference them by name. Queries run against Power BI as you, so existing item permissions and row-level security (RLS) continue to apply.

## Ground a Cowork chat in Power BI data

The Fabric IQ plugin supports the following ways to bring a Power BI report into a Cowork chat:

| Scenario | How to use it |
| --- | --- |
| Attach a Power BI report from Cowork's content picker | Use the **+** (attach) control in the Cowork composer to attach a Power BI report, then ask a data question grounded on that report. |
| Paste a Power BI report link into the chat | Paste the report URL into the Cowork composer and ask a data question. Cowork uses the link to ground the conversation. |
| Reference a Power BI report by name | Mention a report by its name in your question. Cowork searches for matching artifacts you have access to and grounds the answer on the best match. |

> [!NOTE]
> The plugin grounds on Power BI reports and the semantic models behind them. It doesn't currently ground on Power BI dashboards, paginated (RDL) reports, share links, or other Fabric items like lakehouses or eventhouses. Check [Current limitations](#current-limitations) before you plan a workflow around the plugin.

<!-- TODO_REVIEWER: Add a screenshot here showing the + (attach) picker in the Cowork composer with a Power BI report selected, plus a sample chat response grounded on that report. Reader feedback flagged the lack of a visual as the biggest "what does this actually look like" gap. -->

For the general experience of working with plugins in Cowork, see [Use plugins with Copilot Cowork](/microsoft-365/copilot/cowork/cowork-plugins).

## Chain Fabric IQ with other Cowork skills

The bigger value of Fabric IQ in Cowork shows up when you combine a data answer with another Cowork skill in the same chat. Cowork takes the result of a Power BI query and feeds it directly into the next task you ask for, so you go from insight to action without switching apps. Each step runs with your existing Microsoft 365 and Fabric permissions and respects the same business rules.

The following examples show the kinds of prompts you can use today. Each one starts with grounded Power BI data and chains into a downstream Cowork skill in the same conversation.

| Goal | Example prompt |
| --- | --- |
| Summarize a report and email a stakeholder | *"Using this report, identify any significant changes in the last week and email my manager with a short summary and recommended next steps."* |
| Set up a recurring executive summary | *"Create a recurring Friday summary of this report and send it to the exec staff."* |
| Turn a KPI trend into a working meeting | *"If any KPI is trending down, create an agenda and schedule a review meeting with stakeholders."* |
| Produce a written business review | *"Create a weekly business review summary using the insights from this report."* |

You can also follow up on any data answer with a natural-language request like *"draft an email to my team with this,"* *"turn that into a one-page brief,"* or *"summarize this for the next leadership review."* Cowork chains the next skill on top of the data answer it just produced, so the data context, the source report, and your intent stay in one conversation.

## Current limitations

The Fabric IQ plugin has the following limitations. These limitations apply to the current preview and are expected to change as the plugin evolves.

**Unsupported artifact types**

The plugin doesn't currently support grounding on:

- Paginated (RDL) reports
- Power BI dashboards
- Share links across reports, dashboards, and semantic models
- Direct references to a semantic model by name (semantic models are queried indirectly through reports that use them)
- Fabric items that aren't Power BI reports or semantic models, such as lakehouses, eventhouses, ontologies, and data agents

**Behavior gaps**

> [!IMPORTANT]
> Cowork doesn't include citations back to the source Power BI report or semantic model in its data answers today. If you plan to share a number from a Cowork response in an email, document, or meeting, open the source report yourself to confirm the value before you act on it.

Sensitivity labels on the underlying data apply and are respected. When you create new content, such as an email, document, or meeting invite, the sensitivity label from the grounding Power BI item is applied to the new item.

To learn more, see [Sensitivity labels in Power BI](../../enterprise/powerbi/service-security-sensitivity-label-overview.md).

<!-- TODO_REVIEWER: Confirm whether the "tenant admin can't disable the plugin today" limitation should be called out here for customers, or whether it should stay internal until the admin control ships. Removed from public copy for now. -->

## Prerequisites

To use the Fabric IQ plugin in Cowork, the following prerequisites must be met.

**User prerequisites**

- You can access Microsoft 365 Copilot Cowork. Cowork uses a usage-based (consumption) billing model, so your organization must have the required Microsoft 365 Copilot licensing and usage-based Cowork billing enabled for your account. For the current licensing and billing requirements, see [Get started with Copilot Cowork](/microsoft-365/copilot/cowork/get-started).
- You have at least **Read** permission on the Power BI reports and underlying semantic models you want to ask about, in your home Fabric tenant.

**Tenant prerequisites**

A Fabric or Power BI admin must complete the following steps in the Fabric admin portal:

1. Enable **Share Fabric data with your Microsoft 365 services** so that Fabric metadata is available to Microsoft 365. For details on what's shared and how to turn the setting on, see [Share data with your Microsoft 365 services](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md).
1. If your Fabric tenant and your Microsoft 365 tenant are in different geographic regions, also enable the cross-region toggle on the same tenant setting. For more information, see [Data residency](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md#data-residency).
1. Enable **Users can use the Power BI Model Context Protocol server endpoint (preview)** so that Cowork can query Power BI semantic models on behalf of signed-in users. For details on the setting, see [Integration tenant settings](../../admin/service-admin-portal-integration.md#users-can-use-the-power-bi-model-context-protocol-server-endpoint-preview).

No additional Fabric capacity, F SKU, or Power BI Premium per user (PPU) license is required for the Fabric IQ plugin itself, beyond what your Power BI content already requires.

## How the plugin grounds answers

When you ask a question in Cowork that the Fabric IQ plugin can answer, Cowork follows this flow:

1. **Discover the right artifact.** If you attach a report or paste a link, Cowork uses that artifact directly. If you reference a report by name, Cowork searches Power BI artifacts you have access to and selects the best match.
1. **Query Power BI on your behalf.** Cowork sends the question, along with the chosen report or semantic model, to Power BI. Power BI runs the query against the underlying data and returns the result.
1. **Compose the answer in Cowork.** Cowork uses the returned data to write a natural-language answer in the chat or combine it with other skills. You can ask follow-up questions or hand answers off to other Cowork skills.

Because Cowork queries Power BI as the signed-in user, item permissions and row-level security in Power BI continue to apply. Cowork doesn't see data that you can't already see in Power BI.

## Send feedback

The Fabric IQ plugin is in preview, and your feedback helps shape the next releases. To send feedback on a specific answer, use the thumbs-up or thumbs-down control on the Cowork response. Add a short note about what worked or what didn't, and include the report name when you can.

## Related content

- [What is Fabric IQ (preview)?](../overview.md)
- [Available plugins for Copilot Cowork](/microsoft-365/copilot/cowork/cowork-available-plugins)
- [Use plugins with Copilot Cowork](/microsoft-365/copilot/cowork/cowork-plugins)
- [Share data with your Microsoft 365 services](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md)
- [Power BI semantic models](../../data-warehouse/semantic-models.md)
