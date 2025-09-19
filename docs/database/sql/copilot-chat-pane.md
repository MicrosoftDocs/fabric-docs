---
title: How to Use the Microsoft Copilot Chat Pane in Microsoft Fabric in the SQL Database Workload
description: Learn more about the Microsoft Copilot chat pane in Microsoft Fabric in the SQL database workload.
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, wiassaf
ms.date: 09/25/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
---

# How to use the Copilot chat pane in the Fabric SQL database workload (Preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Copilot in Fabric in the SQL database workload includes a chat pane to interact with Copilot in natural language. In this interface, you can ask Copilot questions specific to your database or generally about SQL database. Depending on the question, Copilot responds with a generated SQL query or a natural language response.

Since Copilot is schema aware and contextualized, you can generate queries tailored to your database.

With this integration, Copilot can generate SQL queries for prompts like:

```copilot-prompt
What are the top 10 best-selling products by revenue?
Show the sales revenue growth trend for the past 5 years.
Create a table called [SalesTransactions] with columns [CustomerID], [ProductID], [OrderDate], [Quantity]
```

## Key capabilities

The supported capabilities of interacting through chat include:

- **Natural Language to SQL**: Generate T-SQL code and get suggestions of questions to ask to accelerate your workflow.
- **Documentation-based Q&A**: Ask Copilot questions about the capabilities of SQL database in Fabric and it provides answers in natural language along with relevant documentations.

## Prerequisites

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## Get started

1. In the **Database** workload, open a database, then open a new SQL query.
1. To open the Copilot chat pane, select the **Copilot** ribbon in the button.
1. The chat pane offers helpful starter prompts to get started and familiar with Copilot. Select any option to ask Copilot a question.
1. Type a request of your choice in the chat box and Copilot responds accordingly.
1. Ask follow-up questions or requests if applicable. Copilot provides a contextualized response with previous chat history.
1. You can *copy* or *insert* code from the chat panel. At the top of each code block, two buttons allow input of query directly into the text editor.

    :::image type="content" source="media/copilot-chat-pane/copilot-code-block.png" alt-text="Screenshot from the Fabric portal of a code block in Copilot's response.":::

## Regular usage of the chat pane

- The more specifically you describe your goals in your chat panel entries, the more accurate the Copilot responses.
- To clear your conversation, select the broom icon :::image type="content" source="media/copilot-chat-pane/broom-icon.png" alt-text="Screenshot of the Fabric portal showing the Copilot clean up prompt."::: to remove your conversation from the pane. It clears the pane of any input or output, but the context remains in the session until it ends.

Read our [Privacy, security, and responsible use of Copilot for SQL databases (preview)](../../fundamentals/copilot-database-privacy-security.md) for details on data and algorithm use.

## Execution mode selector

The Copilot chat pane in Microsoft Fabric SQL database now features an execution mode selector at the bottom, offering two options:

- **Read-only**
- **Read and write with approval**

### Read-only mode

In **Read-only** mode, Copilot doesn't execute Data Definition Language (DDL) or Data Manipulation Language (DML) statements that modify data or schema. Instead, Copilot suggests SQL code for you to review and run manually.

#### Example: Select query

Try this prompt to generate and run a `SELECT` query automatically, regardless of the selected mode.

```copilot-prompt
show the top selling product in each category
```

Copilot generates the SQL code and executes it automatically.

#### Example: Create table (not executed in Read-only mode)

Try this prompt to create a table for sales.

```copilot-prompt
create a table for sales transactions
```

Copilot drafts the SQL statement but doesn't execute it in read-only mode.

> [!NOTE]  
> If you attempt to run the code, Copilot refuses and reminds you that you're still in read-only mode.

### Read and write with approval mode

In **Read and write with approval** mode, Copilot can execute DDL and DML statements after you approve them.

This mode is useful for users who want Copilot to handle execution but still want to review the code before it runs.

In Read and write with approval mode, Copilot can execute SQL code after you approve it. Select queries (DQL) are safe and can run automatically.

#### Example: Create table with approval

Try this prompt to create a table for sales.

```copilot-prompt
create a table for sales transactions
```

When you request to create a table, Copilot drafts the code and prompts you to approve execution.

You can review the code and, upon approval, Copilot executes it and confirms that the table was created successfully. This mode gives you more control, letting Copilot handle execution safely.

## Related content

- [What is Copilot in Fabric in SQL database?](copilot.md)
- [Privacy, security, and responsible AI use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)