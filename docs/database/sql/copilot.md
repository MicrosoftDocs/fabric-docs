---
title: "Overview of Copilot for SQL Database (Preview)"
description: "Learn more about the Microsoft Copilot for SQL database in Fabric, an AI assistant designed to streamline your database tasks."
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, wiassaf
ms.date: 02/25/2025
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
---

# What is Microsoft Copilot for SQL database in Microsoft Fabric (Preview)?

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Microsoft Copilot for SQL Database in Microsoft Fabric is an AI tool designed to simplify the management and querying of SQL databases. It offers features like intelligent code completion, quick actions, and natural language to SQL conversion, seamlessly integrating with your Fabric database to provide smart insights for T-SQL tasks. This article explores how Copilot can enhance productivity, accuracy, and learning for database administrators, developers, and data analysts by streamlining workflows and improving efficiency.

## How Copilot works

Copilot operates through a high-level architecture that includes:

- **Data Ingestion**: Collects data from various sources within the [Product/Service] ecosystem.
- **Machine Learning Models**: Utilizes pretrained models to analyze and interpret the data.
- **User Interaction**: Provides a user-friendly interface for interaction and feedback.
- **Continuous Learning**: Continuously improves its performance based on user interactions and new data.

This architecture ensures that Copilot can deliver accurate and relevant assistance, making your experience with [Product/Service] more efficient and enjoyable.

## Features of Copilot for SQL database in Microsoft Fabric

Here are some benefits of using Microsoft Copilot for SQL database in Microsoft Fabric.

- [How to: Use the Copilot Code Completion for SQL database in Fabric](copilot-code-completion.md): Start writing T-SQL in the SQL query editor, and Copilot automatically generates a code suggestion to help complete your query. The **Tab** key accepts the code suggestion or keeps typing to ignore the suggestion.

- **[How to: Use the Copilot Explain and Fix quick action features for SQL database in Fabric](copilot-quick-actions.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.
  - **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios include incorrect/unsupported T-SQL code, wrong spellings, and more. Copilot also provides comments that explain the changes and suggest SQL best practices.
  - **Explain:** Copilot can provide natural language explanations of your SQL query and database schema in comments format.

- **[How to: Use the Copilot Chat Pane for SQL database in Fabric](copilot-chat-pane.md)**: Use the chat pane to ask Copilot questions through natural language.
  - Copilot responds with a generated SQL query or natural language based on the question.
    - Natural Language to SQL - This tool generates T-SQL code from plain text requests, allowing users to query data without knowing SQL syntax.

### Code completion

**[Code completion](copilot-code-completion.md)**: Start writing T-SQL in the SQL query editor, and Microsoft Copilot automatically generates a code suggestion to help complete your query. The **Tab** key accepts the code suggestion or keeps typing to ignore the suggestion. Copilot can also suggest code completions for table and column names, functions, and keywords.

### Quick actions

**[Quick actions](copilot-quick-actions.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.

### Chat Pane

**[Natural Language to SQL](copilot-chat-pane.md)**: This tool generates T-SQL code from plain text requests, allowing users to query data without knowing SQL syntax.

## Enable Copilot in SQL database in Microsoft Fabric

To enable Copilot in the SQL database in Microsoft Fabric, follow the steps below.

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## Best practices for using Copilot in SQL database in Microsoft Fabric

Here are some tips for effectively maximizing productivity with Microsoft Copilot:

- Start with a clear and concise description of the specific information you seek when crafting prompts.
- Natural language to SQL depends on expressive table and column names. If your table and columns aren't expressive and descriptive, Copilot might be unable to construct a meaningful query.
- Use natural language that applies to your table and view your database's names, column names, primary keys, and foreign keys. This context helps Copilot generate accurate queries. Specify what columns you wish to see, aggregations, and any filtering criteria as explicitly as possible. Given your schema context, Copilot should be able to correct typos or understand the context.
- When using code completions, leave a comment at the top of the query with `--` to help guide the Copilot with context about the query you're trying to write.
- Avoid ambiguous or overly complex language in your prompts. Simplify the question while maintaining its clarity. This editing ensures that Copilot can translate it into a meaningful T-SQL query that retrieves the desired data.

## Example prompts

The following example prompts are clear, specific, and tailored to the properties of your schema and data database, making it easier for Copilot to generate accurate T-SQL queries.

In the Chat Pane, you can ask questions like:

```copilot-prompt
 - What are the top-selling products by quantity?
 - Count all the products grouped by category
 - Show all sales transactions that occurred on [a specific date]
```

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Responsible use of Copilot in Fabric

For information about using Copilot responsibly, visit [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md).

## Limitations

Here are the current limitations of Copilot for SQL database:

- Copilot can't change existing SQL queries in the SQL query editor. For example, if you ask Copilot chat pane to edit a specific part of an existing query, it doesn't work. However, Copilot understands previous inputs in the chat pane, allowing users to iterate queries previously generated by Copilot before they're inserted.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the database schema; none of the data is inside.
- Copilot responses can include inaccurate or low-quality content, so review outputs before using them in your work.
- People who can meaningfully evaluate the content's accuracy and appropriateness should review the outputs.
- Copilot for SQL database in Fabric isn't currently available if Private Link is enabled and Public Access is turned off in the tenant setting.

## Related content

- [Use Copilot to get the most from Learn](https://review.learn.microsoft.com/copilot/roadmap/)
- [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)
- [Frequently asked questions for Copilot in SQL database in Microsoft Fabric](copilot-faq.yml)
