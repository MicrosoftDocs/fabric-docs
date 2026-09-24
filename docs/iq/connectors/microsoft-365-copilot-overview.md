---
title: "Fabric IQ in Microsoft 365 Copilot Chat"
description: Learn how to ask Microsoft 365 Copilot questions grounded in your Power BI data using Fabric IQ.
author: PM-Sara
ms.author: svredevoogd
ms.reviewer: svredevoogd
ms.topic: concept-article
ms.date: 09/15/2026
ai-usage: ai-assisted
---

# Fabric IQ in Microsoft 365 Copilot Chat

Fabric IQ brings Power BI data answers directly into Microsoft 365 Copilot Chat. Business teams can incorporate data into their decision-making process without switching to Power BI to look up numbers or trends. Users ask natural language questions about their organization's data right where they already work: in Copilot Chat alongside their files, emails, and conversations.

> [!IMPORTANT]
> Data answering from Power BI content in Microsoft 365 Copilot Chat is a generally available (GA) feature of Microsoft Fabric.

## How it works

When a user asks Microsoft 365 Copilot a data question, Copilot can search for relevant Power BI reports and use the underlying semantic models to answer. Copilot uses the user's existing permissions, including row-level security (RLS) and object-level security (OLS), to access the data.

Copilot grounds answers in your Power BI data, but the answers don't stop there. Copilot interprets and reconciles data answers with your broader Microsoft 365 context, including your files, chats, and emails. This reconciliation gives you a more complete picture when you make decisions.

## Prerequisites

- **Microsoft 365 Copilot Premium license:** Required for all users.
- **Power BI access:** The user must have both permission and licensed access to view the Power BI reports and semantic models they want to ask questions about. The user doesn't need access to Copilot in Fabric.

## How to ask questions about Power BI data

You don't need to identify a specific Power BI report before asking a question. Copilot can search the Power BI content you have permission to view and select related content based on your question.

You can ask questions about Power BI data in the following ways:

- **Ask without naming a report:** Ask a business or data question directly. Copilot searches for related Power BI content and can use a relevant report and semantic model to answer.

- **Paste a report link:** Copy a link from Power BI and paste it directly into the Copilot Chat pane to reference a specific report.

- **Use the attachment menu:** Select the **+** button in Copilot Chat, then look under the **Other** category to find Power BI reports you viewed recently.

- **Name a report in your prompt:** Mention a Power BI report by name in your question. Copilot uses fuzzy matching to find the right report, even if you don't type the name exactly right. This method works less well when many reports have similar names.

Search for Power BI content is still improving. If Copilot doesn't find the expected report, paste a direct report link, attach the report, or name it in the prompt. Use the thumbs-up or thumbs-down button on the response to provide feedback about the search result.

> [!TIP]
> If you regularly use a smaller set of reports, save a memory that identifies those reports as your preferred sources. This context can help Copilot choose the reports that are most relevant to you. For more information, see [Personalize what Microsoft 365 Copilot remembers](https://support.microsoft.com/microsoft-365-copilot/personalize-what-microsoft-365-copilot-remembers).

### Types of questions you can ask

- Retrieve specific data points from a report.
- Ask about different slices or segments of the data.
- Apply alternative filters to see different perspectives.
- Ask about trends, comparisons, or summaries.
- Combine data answers with context from your files, chats, and emails.

## Sensitivity labels

Copilot honors the sensitivity labels applied to Power BI reports and semantic models used in a conversation. The conversation's sensitivity label reflects the most restrictive label on any content used in the conversation, including Power BI content.

Content that you create from the conversation, such as an exported spreadsheet, inherits the conversation's sensitivity label. Data loss prevention (DLP) policies also apply. If a DLP policy prohibits Copilot from processing content with a specific sensitivity label, Copilot doesn't use Power BI content with that label. For more information, see [Learn about using Microsoft Purview Data Loss Prevention to manage data security and compliance for Microsoft 365 Copilot](/purview/dlp-microsoft365-copilot-location-learn-about).

The following example shows where Copilot Chat displays the conversation sensitivity label and the sensitivity label for a referenced Power BI item.

:::image type="content" source="media/microsoft-365-copilot-overview/power-bi-sensitivity-labels-in-copilot-chat.png" alt-text="Annotated Copilot Chat screen showing a Confidential Internal Only sensitivity label for the conversation and a sensitivity label icon next to the referenced SalesBenchmark Power BI item." lightbox="media/microsoft-365-copilot-overview/power-bi-sensitivity-labels-in-copilot-chat.png":::

## Tenant settings

Three tenant settings affect this feature: one in the Microsoft 365 admin center and two in the Fabric admin portal.

### Microsoft 365 admin center

- **Fabric data available in M365 Copilot:** This setting controls whether Fabric data appears in Microsoft 365 Copilot experiences. The setting is enabled by default. When an admin turns it off, users don't see Fabric context in Copilot responses. For more information, see [Use Power BI data in Microsoft 365 Copilot Chat](/microsoft-365/copilot/copilot-powerbi-copilot-chat).

### Fabric admin portal

- **Share Fabric data with your Microsoft 365 services:** This setting controls whether Fabric proactively shares metadata without user action. The shared metadata enables Power BI content to appear in Copilot search and the item-attachment menu. When this setting is off, users can still paste report links or name reports in their prompts. For more information, see [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services).
- **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance:** Power BI data answering requires Azure OpenAI processing in the United States or European Union. For Fabric tenants outside these geographies, enable this setting to allow the required cross-geography processing. For more information, see [Copilot and Agent admin settings](/fabric/admin/service-admin-portal-copilot#data-sent-to-azure-openai-can-be-processed-outside-your-capacitys-geographic-region-compliance-boundary-or-national-cloud-instance).

## Considerations and limitations

- **General questions and source selection:** General questions can often be answered from many Microsoft 365 sources. Copilot might need guidance to use Power BI data. Name or attach a Power BI report, paste a report link, or specify that you want an answer based on Power BI.
- **Scope of answers:** When you attach a report, Copilot uses it as context but doesn't limit the answer to only that report. Answers might include information from other sources in your Microsoft 365 context.
- **Supported content:** Power BI reports and reports in workspace apps support link paste, item attachment, and name search. Reports in org apps appear in the item-attachment menu, but link paste doesn't work for these reports. Attach the report or name it in your prompt instead.
- **Semantic models:** Power BI semantic models don't appear in the item-attachment menu. You can paste a semantic model URL into Copilot Chat to ask questions directly against the model. These answers use the semantic model without using report visuals as grounding.
- **Unsupported content:** Paginated reports (RDL), dashboards, and top-level apps aren't supported.
- **Report links:** Report share links aren't supported. Open the report in a browser and copy the resolved, long-form URL from the address bar. You can also name the report in your prompt.
- **Search:** Search for Power BI content is still improving. If Copilot doesn't find the expected report, paste a direct report link, attach the report, or name it in your prompt.
- **Fabric data agents and ontologies:** Fabric data agents and ontologies can't answer questions in Copilot Chat without an explicitly published Microsoft 365 agent. For more information, see [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot).
- **Row-level and object-level security:** Copilot respects RLS and OLS applied to the underlying semantic model. Answers only reflect the data the user has permission to see.
- **Data processing location:** Power BI data answering requires LLM processing in the United States or European Union. For Fabric tenants outside these geographies, the Fabric tenant's cross-geography processing setting must be enabled.
- **Data freshness:** Answers reflect the data from the last refresh of the semantic model, not real-time data. Answers are only as current as the most recent successful refresh.
- **Response latency:** The first query against a report might take longer than subsequent queries as Copilot indexes the content. Follow-up questions about the same report are typically faster.
- **Language support:** Questions must be in a language that Copilot supports. For the current list, see [Microsoft 365 Copilot setup: language support](/microsoft-365-copilot/microsoft-365-copilot-setup#language-support).
- **Embedded capacities:** Semantic models in workspaces that use Embedded capacities (A or EM SKUs) aren't supported. Pro, Premium Per User (PPU), Premium, and Fabric capacities are supported.
- **Region availability:** This feature is supported in all regions with broad Fabric support. Regions where Power BI is the only available Fabric workload aren't supported. For the current list, see [Fabric region availability](/fabric/admin/region-availability).

## Share feedback

Your feedback helps improve this experience. Submit feedback when:

- You expect to see Power BI results but Copilot doesn't return them.
- A data answer uses the wrong report or applies incorrect filters.
- Copilot misinterprets the data in its response.

Use the thumbs-up/thumbs-down buttons in Copilot Chat to share feedback directly.

## Related content

- [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services)
- [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot)
