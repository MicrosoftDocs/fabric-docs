---
title: How to Use the Microsoft Copilot Chat Pane Copilot in Microsoft Fabric in the SQL Database Workload
description: Learn more about Microsoft Copilot chat pane in Microsoft Fabric in the SQL database workload, to ask questions specific about your database.
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, wiassaf
ms.date: 09/02/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
---

# How to use the Copilot chat pane Fabric in the SQL database workload (Preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Copilot in Fabric in the SQL database workload includes a chat pane to interact with Copilot in natural language. In this interface, you can ask Copilot questions specific to your database or generally about SQL database. Depending on the question, Copilot responds with a generated SQL query or a natural language response.

Since Copilot is schema aware and contextualized, you can generate queries tailored to your database.

This integration means that Copilot can generate SQL queries for prompts like:

- `What are the top 10 best-selling products by revenue?`
- `Show the sales revenue growth trend for the past 5 years.`
- `Create a table called [SalesTransactions] with columns [CustomerID], [ProductID], [OrderDate], [Quantity]`

## Key capabilities

The supported capabilities of interacting through chat include:

- **Natural Language to SQL**: Generate T-SQL code and get suggestions of questions to ask to accelerate your workflow.
- **Documentation-based Q&A**: Ask Copilot questions about the capabilities of SQL database in Fabric and it provides answers in natural language along with relevant documentations.

## Prerequisites

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## Get started

1. In the **Database** workload, open a SQL database, and open a new SQL query.
1. To open the Copilot chat pane, select the **Copilot** ribbon in the button.
1. The chat pane offers helpful starter prompts to get started and familiar with Copilot. Select any option to ask Copilot a question.
1. Type a request of your choice in the chat box and Copilot responds accordingly.
1. Ask follow-up questions or requests if applicable. Copilot provides a contextualized response with previous chat history.
1. You can "copy" or "insert" code from the chat panel. At the top of each code block, two buttons allow input of query directly into the text editor.

:::image type="content" source="media/copilot-chat-pane/copilot-code-block.png" alt-text="Screenshot from the Fabric portal of a code block in Copilot's response.":::

## Regular usage of the chat pane

- The more specifically you describe your goals in your chat panel entries, the more accurate the Copilot responses.
- To clear your conversation, select the broom icon :::image type="content" source="media/copilot-chat-pane/broom-icon.png" alt-text="Screenshot of the Fabric portal showing the Copilot clean up prompt."::: to remove your conversation from the pane. It clears the pane of any input or output, but the context remains in the session until it ends.
- Read our [Privacy, security, and responsible use of Copilot for SQL databases (preview)](../../fundamentals/copilot-database-privacy-security.md) for details on data and algorithm use.

## Related content

- [What is Copilot Copilot in Fabric in SQL database?](copilot.md)
- [Privacy, security, and responsible AI use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)
