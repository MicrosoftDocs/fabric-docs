---
title: Fabric IQ in Microsoft 365 Copilot Cowork (Frontier)
description: Learn how the Fabric IQ plugin brings Microsoft Fabric and Power BI data into Microsoft 365 Copilot Cowork (Frontier), including supported scenarios, limitations, and tenant prerequisites.
ms.date: 05/08/2026
ms.topic: concept-article
ai-usage: ai-assisted
#customer intent: As a Fabric or Power BI user, I want to understand what the Fabric IQ plugin in Microsoft 365 Copilot Cowork (Frontier) does so I can use Power BI and Fabric data inside Cowork chats.
---

# Fabric IQ in Microsoft 365 Copilot Cowork (Frontier)

The **Fabric IQ** plugin connects [Microsoft 365 Copilot Cowork (Frontier)](/microsoft-365/copilot/cowork/cowork-available-plugins) to your Microsoft Fabric and Power BI data. With the plugin enabled, a Power BI report stops being the end of a workflow and becomes the starting point. You can ground a Cowork chat in trusted business data, then chain that data into the other Cowork skills you already use, like drafting emails, creating documents, or scheduling reviews, without leaving the conversation. The plugin is the first step toward bringing the full breadth of Fabric IQ into the natural flow of work in Cowork.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

The Fabric IQ plugin is a native Cowork plugin that's installed by default for Frontier customers. The first release focuses on Power BI reports and semantic models. Support for more Fabric IQ surfaces, like ontologies and data agents, is planned for later releases. For the broader list of plugins available in Cowork, see [Available plugins for Copilot Cowork (Frontier)](/microsoft-365/copilot/cowork/cowork-available-plugins).

## What you can do with the Fabric IQ plugin

With the Fabric IQ plugin enabled in Cowork, you can:

1. Ground a Cowork chat in a specific Power BI report and ask questions about the data it contains.
1. Reference a Power BI report that you have access to and ask Cowork to summarize it, compare values, or explain a trend.
1. Chain a data answer into other Cowork skills, such as drafting an email, creating a document, or scheduling a follow-up meeting, all in the same chat.

Under the covers, the plugin uses the [Power BI Model Context Protocol (MCP) server](/power-bi/developer/mcp/) to query semantic models and reports on your behalf, combined with Cowork-native search to discover the right Power BI artifacts when you reference them by name. Queries run against Power BI as you, so existing item permissions and row-level security (RLS) continue to apply.

## Ground a Cowork chat in Power BI data

The first release of the Fabric IQ plugin supports the following ways to bring a Power BI report into a Cowork chat:

| Scenario | How to use it |
| --- | --- |
| Attach a Power BI report from Cowork's content picker | Use the **+** (attach) control in the Cowork composer to attach a Power BI report, then ask a data question grounded on that report. |
| Paste a Power BI report link into the chat | Paste the report URL into the Cowork composer and ask a data question. Cowork uses the link to ground the conversation. |
| Reference a Power BI report by name | Mention a report by its name in your question. Cowork searches for matching artifacts you have access to and grounds the answer on the best match. |

For the general experience of working with plugins in Cowork, see [Use plugins with Copilot Cowork (Frontier)](/microsoft-365/copilot/cowork/cowork-plugins).

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

The first release of the Fabric IQ plugin has the following limitations. These limitations apply to the Frontier preview and are expected to change as the plugin evolves.

**Unsupported artifact types**

The plugin doesn't currently support grounding on:

1. Paginated (RDL) reports
1. Power BI dashboards
1. Reports inside a Power BI app
1. Share links across reports, dashboards, and semantic models
1. Direct references to a semantic model by name (semantic models are queried indirectly through reports that use them)
1. Fabric items that aren't Power BI reports or semantic models, such as lakehouses, eventhouses, ontologies, and data agents

**Behavior gaps**

The following behaviors aren't part of the first release:

1. Cowork doesn't include citations back to the source Power BI report or semantic model in data answers.
1. Sensitivity labels on Power BI items aren't surfaced in the Cowork UI today. Underlying [sensitivity labels](/power-bi/enterprise/service-security-sensitivity-label-overview-in-power-bi) on the source data still apply at the Power BI layer.

<!-- TODO_REVIEWER: Confirm whether the "tenant admin can't disable the plugin today" limitation should be called out here for customers, or whether it should stay internal until the admin control ships. Removed from public copy for now. -->

## Prerequisites

To use the Fabric IQ plugin in Cowork, the following prerequisites must be met.

**User prerequisites**

1. You're enrolled in the [Microsoft 365 Copilot Frontier program](https://adoption.microsoft.com/copilot/frontier-program/) and can access Cowork.
1. <!-- TODO_REVIEWER: Confirm the exact public-facing license name. The internal source says "$30 M365 Copilot Premium license"; the public Cowork docs reference Microsoft 365 Copilot. Pick one and use it consistently. --> You have a Microsoft 365 Copilot license that includes Cowork.
1. You have at least **Read** permission on the Power BI reports or semantic models you want to ask about, in your home Fabric tenant.

**Tenant prerequisites**

A Fabric or Power BI admin must complete the following steps in the Fabric admin portal:

1. Enable **Share Fabric data with your Microsoft 365 services** so that Fabric metadata is available to Microsoft 365. For details on what's shared and how to turn the setting on, see [Share data with your Microsoft 365 services](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md).
1. If your Fabric tenant and your Microsoft 365 tenant are in different geographic regions, also enable the cross-region toggle on the same tenant setting. For more information, see [Data residency](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md#data-residency).

No additional Fabric capacity, F SKU, or Power BI Premium per user (PPU) license is required for the Fabric IQ plugin itself, beyond what your Power BI content already requires.

## How the plugin grounds answers

When you ask a question in Cowork that the Fabric IQ plugin can answer, Cowork follows this flow:

1. **Discover the right artifact.** If you attach a report or paste a link, Cowork uses that artifact directly. If you reference a report by name, Cowork searches Power BI artifacts you have access to and selects the best match.
1. **Query Power BI through the MCP server.** Cowork sends the question, plus the chosen report or semantic model, to the [Power BI MCP server](/power-bi/developer/mcp/). The MCP server translates the question into DAX, runs it against the semantic model, and returns the result.
1. **Compose the answer in Cowork.** Cowork uses the returned data to write a natural-language answer in the chat. You can then ask follow-up questions or hand the answer off to another Cowork skill.

Because the MCP server runs queries as the signed-in user, item permissions and row-level security in Power BI continue to apply. Cowork doesn't see data that you can't already see in Power BI.

## Send feedback

The Fabric IQ plugin is in preview, and feedback during Frontier helps shape the next releases. To send feedback on a specific answer, use the thumbs-up or thumbs-down control on the Cowork response. Add a short note about what worked or what didn't, and include the report name when you can.

## Related content

- [What is Fabric IQ (preview)?](../overview.md)
- [Available plugins for Copilot Cowork (Frontier)](/microsoft-365/copilot/cowork/cowork-available-plugins)
- [Use plugins with Copilot Cowork (Frontier)](/microsoft-365/copilot/cowork/cowork-plugins)
- [Power BI MCP server documentation](/power-bi/developer/mcp/)
- [Share data with your Microsoft 365 services](../../admin/admin-share-power-bi-metadata-microsoft-365-services.md)
- [Power BI semantic models](../../data-warehouse/semantic-models.md)
