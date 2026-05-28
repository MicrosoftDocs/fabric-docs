---
title: "Fabric IQ in Microsoft 365 Copilot Chat (Frontier)"
description: Learn how to ask Microsoft 365 Copilot questions grounded in your Power BI data using Fabric IQ.
author: TBD
ms.author: TBD
ms.reviewer: TBD
ms.topic: concept-article
ms.date: 05/28/2026
---

# Fabric IQ in Microsoft 365 Copilot Chat (Frontier)

Fabric IQ brings Power BI data answers directly into Microsoft 365 Copilot Chat, making it easier for business teams to incorporate data into their decision-making process. Instead of switching to Power BI to look up numbers or trends, users can ask natural language questions about their organization's data right where they're already working—in Copilot Chat alongside their files, emails, and conversations.

## How it works

When a user asks Microsoft 365 Copilot a data question, Copilot uses the user's existing permissions to access the relevant Power BI report and underlying semantic model. No background metadata sharing is required—this capability works independently of the **Share Fabric data with your Microsoft 365 services** tenant setting.

However, the **Share Fabric data with your Microsoft 365 services** setting does affect discoverability: Power BI content only appears in the item-attachment menu (the **+** button) if that setting is enabled. Users can still reference Power BI content by pasting a link or naming a report in their prompt, regardless of that setting.

Copilot answers are grounded in your Power BI data, but they don't stop there. Data answers can be interpreted and reconciled with your broader Microsoft 365 context—including your files, chats, and emails—giving you a more complete picture when making decisions.

## Prerequisites

- **Microsoft 365 Copilot Premium license** — Required for all users.
- **Frontier access** — Data answering grounded in Power BI reports is initially only available in Frontier.
- **Power BI access** — The user must have both permission and licensed access to view the Power BI reports and semantic models they want to ask questions about. Importantly, the user doesn't need access to Copilot in Fabric.

## How to ask questions about Power BI data

Users can ground their Copilot questions in Power BI data in three ways:

1. **Paste a report link** — Copy a link from Power BI and paste it directly into the Copilot Chat pane to reference a specific report.

1. **Use the attachment menu** — Select the **+** button in Copilot Chat, then look under the **Other** category to find Power BI reports you have viewed recently.

1. **Name a report in your prompt** — Mention a Power BI report by name in your question. Copilot uses fuzzy matching to find the right report, even if you don't get the name exactly right. Note: this works less well when there is a lot of similarly-named content. 

### Types of questions you can ask

- Retrieve specific data points from a report
- Ask about different slices or segments of the data
- Apply alternative filters to see different perspectives
- Ask about trends, comparisons, or summaries
- Combine data answers with context from your files, chats, and emails

## Admin controls

Two tenant settings affect this feature:

### Fabric data available in M365 Copilot (Microsoft Admin Center)

The **Fabric data available in M365 Copilot** setting in the Microsoft Admin Center controls whether Fabric data appears in Microsoft 365 Copilot experiences. This setting is enabled by default.

When this setting is turned off, users won't see any Fabric context in Copilot responses.

### Share Fabric data with your Microsoft 365 services (Fabric Admin Portal)

The **Share Fabric data with your Microsoft 365 services** setting controls whether Fabric proactively shares metadata without users action. This enables Power BI content to be suggested based on user activity. When only this setting is turned off:

- Power BI reports won't appear in the **+** attachment menu under **Other**.
- Users can still paste report links or name reports in their prompts to get data answers.

For more information, see [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services).

## Limitations and known issues

### Scope of answers

When you attach an item, Copilot uses it as context for your question but doesn't limit the scope of the answer to just that item. Answers might include information from other sources in your Microsoft 365 context.

### Supported content types

Not all Power BI content is supported:

| Content type | Supported |
|---|---|
| Power BI reports | Yes |
| Reports within apps | Yes |
| Semantic models (explicit attachment) | No (but answers from reports can use the full semantic model) |
| Paginated reports (RDL) | No |
| Dashboards | No |
| Apps (top-level) | No |

### Link handling

Report share links aren't supported. As a workaround, open the report in the browser and copy the resolved (long-form) URL from the address bar back into Copilot. Alternatively, search for the report by name in your prompt.

### Search

Search for Power BI content is still a work in progress. If you can't find a report through the attachment menu, try pasting a direct link or naming the report in your prompt.

### Fabric data agents and ontologies

Fabric data agents and ontologies can't answer questions in Copilot Chat without an explicitly published Microsoft 365 agent. For more information about publishing data agents, see [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot).

## Share feedback

Your feedback helps improve this experience. Submit feedback when:

- You expect to see Power BI results but don't get them
- A data answer uses the wrong report or missing filters
- Copilot misinterprets the data in its response

Use the thumbs-up/thumbs-down buttons in Copilot Chat to share feedback directly.

## Related content

- [Share data with your Microsoft 365 services](/fabric/admin/admin-share-power-bi-metadata-microsoft-365-services)
- [Use a Fabric data agent in Microsoft 365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot)
