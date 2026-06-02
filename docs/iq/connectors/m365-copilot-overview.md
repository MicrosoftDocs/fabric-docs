---
title: "Fabric IQ in Microsoft 365 Copilot Chat (Frontier)"
description: Learn how to ask Microsoft 365 Copilot questions grounded in your Power BI data using Fabric IQ.
author: svredevoogd
ms.author: svredevoogd
ms.reviewer: svredevoogd
ms.topic: concept-article
ms.date: 05/28/2026
---

# Fabric IQ in Microsoft 365 Copilot Chat (Frontier)

Fabric IQ brings Power BI data answers directly into Microsoft 365 Copilot Chat. Business teams can incorporate data into their decision-making process without switching to Power BI to look up numbers or trends. Users ask natural language questions about their organization's data right where they already work: in Copilot Chat alongside their files, emails, and conversations.

## How it works

When a user asks Microsoft 365 Copilot a data question, Copilot uses that user's existing permissions to access the relevant Power BI report and underlying semantic model. This capability works independently of the **Share Fabric data with your Microsoft 365 services** tenant setting because no background metadata sharing is required. For more information about that setting, see [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services).

The **Share Fabric data with your Microsoft 365 services** setting does affect discoverability. Power BI content only appears in the item-attachment menu (the **+** button) when that setting is enabled. Users can still reference Power BI content by pasting a link or naming a report in their prompt, regardless of that setting.

Copilot grounds answers in your Power BI data, but the answers don't stop there. Copilot interprets and reconciles data answers with your broader Microsoft 365 context, including your files, chats, and emails. This reconciliation gives you a more complete picture when you make decisions.

## Prerequisites

- **Microsoft 365 Copilot Premium license:** Required for all users.
- **Frontier access:** Data answering grounded in Power BI reports is initially only available in Frontier.
- **Power BI access:** The user must have both permission and licensed access to view the Power BI reports and semantic models they want to ask questions about. The user doesn't need access to Copilot in Fabric.

## How to ask questions about Power BI data

Users can ground their Copilot questions in Power BI data in three ways:

1. **Paste a report link:** Copy a link from Power BI and paste it directly into the Copilot Chat pane to reference a specific report.

1. **Use the attachment menu:** Select the **+** button in Copilot Chat, then look under the **Other** category to find Power BI reports you viewed recently.

1. **Name a report in your prompt:** Mention a Power BI report by name in your question. Copilot uses fuzzy matching to find the right report, even if you don't type the name exactly right. This method works less well when many reports have similar names.

### Types of questions you can ask

- Retrieve specific data points from a report.
- Ask about different slices or segments of the data.
- Apply alternative filters to see different perspectives.
- Ask about trends, comparisons, or summaries.
- Combine data answers with context from your files, chats, and emails.

## Admin controls

Two tenant settings affect this feature:

### Fabric data available in M365 Copilot (Microsoft Admin Center)

The **Fabric data available in M365 Copilot** setting in the Microsoft Admin Center controls whether Fabric data appears in Microsoft 365 Copilot experiences. This setting is enabled by default.

When an admin turns off this setting, users don't see any Fabric context in Copilot responses.

### Share Fabric data with your Microsoft 365 services (Fabric Admin Portal)

The **Share Fabric data with your Microsoft 365 services** setting controls whether Fabric proactively shares metadata without user action. This sharing enables Power BI content to be suggested based on user activity. When only this setting is turned off:

- Power BI reports don't appear in the **+** attachment menu under **Other**.
- Users can still paste report links or name reports in their prompts to get data answers.

For more information, see [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services).

## Considerations and limitations

### Scope of answers

When you attach an item, Copilot uses that item as context for your question but doesn't limit the scope of the answer to only that item. Answers might include information from other sources in your Microsoft 365 context.

### Supported content types

Not all Power BI content types are supported:

| Content type | Supported | Notes |
|---|---|---|
| Power BI reports | Yes | Full support for link paste, item attachment, and name search |
| Reports in workspace apps | Yes | Same capabilities as standalone reports |
| Reports in org apps | Partial | Reports in org apps appear in the item attachment menu but link copy-paste doesn't work for these reports. Use the attachment menu or name the report in your prompt. |
| Semantic models (explicit attachment) | No | You can't attach a semantic model directly, but answers from reports can use the full underlying semantic model |
| Paginated reports (RDL) | No | — |
| Dashboards | No | — |
| Apps (top-level) | No | — |

### Link handling

Report share links aren't supported. As a workaround, open the report in the browser and copy the resolved (long-form) URL from the address bar back into Copilot. You can also search for the report by name in your prompt.

### Search

Search for Power BI content is still a work in progress. If you can't find a report through the attachment menu, try pasting a direct link or naming the report in your prompt.

### Fabric data agents and ontologies

Fabric data agents and ontologies can't answer questions in Copilot Chat without an explicitly published Microsoft 365 agent. For more information about publishing data agents, see [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot).

### Row-level and object-level security

Copilot respects row-level security (RLS) and object-level security (OLS) applied to the underlying semantic model. If your access is restricted by RLS or OLS rules, Copilot answers only reflect the data you have permission to see.

### Data freshness

Answers reflect the data from the last refresh of the semantic model, not real-time data. If a report's data source refreshes on a schedule, Copilot answers are only as current as the most recent successful refresh.

### Response latency

The first query against a report might take longer than subsequent queries as Copilot indexes the content. Follow-up questions about the same report are typically faster.

### Language support

Questions must be in a language that Copilot supports. For the current list of supported languages, see [Supported languages in Microsoft 365 Copilot](/microsoft-365-copilot/microsoft-365-copilot-supported-languages).

## Share feedback

Your feedback helps improve this experience. Submit feedback when:

- You expect to see Power BI results but Copilot doesn't return them.
- A data answer uses the wrong report or applies incorrect filters.
- Copilot misinterprets the data in its response.

Use the thumbs-up/thumbs-down buttons in Copilot Chat to share feedback directly.

## Related content

- [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services)
- [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot)
