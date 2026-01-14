---
title: Microsoft Copilot in the SQL Database Workload Overview
description: "Learn more about the Microsoft Copilot in Microsoft Fabric in the SQL database workload, an AI assistant designed to streamline your database tasks."
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, wiassaf
ms.date: 11/18/2025
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.devlang: copilot-prompt
---

# What is Copilot in the SQL database in Fabric workload?

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Copilot in Fabric in SQL database is an AI tool designed to simplify the management and querying of SQL databases. Copilot offers intelligent code completion, quick actions, and natural language to SQL conversion. This article explores how Copilot can enhance productivity, accuracy, and learning for database administrators, developers, and data analysts.

## Features of Copilot in Fabric SQL database

Get started with Copilot in Fabric in SQL database:

- **[Copilot chat pane in Fabric SQL database](copilot-chat-pane.md)**: Use the chat pane to ask Copilot questions through natural language.
  - **Natural Language to SQL**: Generate T-SQL code and get suggestions of questions to ask to accelerate your workflow.
  - **Documentation-based Q&A**: Ask Copilot questions about the capabilities of Copilot in Fabric in SQL database and it provides answers in natural language along with relevant documentations.

- **[Copilot code completion for Copilot in Fabric SQL database](copilot-code-completion.md)**: Start writing T-SQL in the SQL query editor, and Copilot automatically generates a code suggestion to help complete your query. The **Tab** key accepts the code suggestion or keeps typing to ignore the suggestion. Copilot can also suggest code completions for table and column names, functions, and keywords.

- **[Copilot Explain and Fix quick action features for Copilot in Fabric SQL database](copilot-quick-actions.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.
  - **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios include incorrect/unsupported T-SQL code, wrong spellings, and more. Copilot also provides comments that explain the changes and suggest SQL best practices.
  - **Explain:** Copilot can provide natural language explanations of your SQL query and database schema in comments format.

## Enable Copilot in Fabric SQL database

To enable Copilot in Fabric in SQL database:

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## Best practices for using Copilot in Fabric SQL database

Here are some tips for effectively maximizing productivity with Copilot:

- Start with a clear and concise description of the specific information you seek when crafting prompts.
- Natural language to SQL depends on expressive table and column names. If your table and columns aren't expressive and descriptive, Copilot might be unable to construct a meaningful query.
- Use natural language that applies to your table and view your database's names, column names, primary keys, and foreign keys. This context helps Copilot generate accurate queries. Specify what columns you wish to see, aggregations, and any filtering criteria as explicitly as possible. Given your schema context, Copilot should be able to correct typos or understand the context.
- When using code completions, leave a comment at the top of the query with `--` to help guide the Copilot with context about the query you're trying to write.
- Avoid ambiguous or overly complex language in your prompts. Simplify the question while maintaining its clarity. This editing ensures that Copilot can translate it into a meaningful T-SQL query that retrieves the desired data.

## Example prompts

The following example prompts are clear, specific, and tailored to the properties of your schema and database, making it easier for Copilot to generate accurate T-SQL queries.

```copilot-prompt
 - What are the top-selling products by quantity?
 - Count all the products grouped by category
 - Show all sales transactions that occurred on [a specific date]
```

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Responsible AI use of Copilot

To view Microsoft's guidelines for responsible AI in SQL database, see [Privacy, security, and responsible AI use of Copilot in Fabric in the SQL database workload](../../fundamentals/copilot-database-privacy-security.md).

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://www.microsoft.com/ai/responsible-ai). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues.

## Limitations

Here are the current limitations of Copilot in Fabric in SQL database:

- Copilot can't change existing SQL queries in the SQL query editor. For example, if you ask Copilot chat pane to edit a specific part of an existing query, it doesn't work. However, Copilot understands previous inputs in the chat pane, allowing users to iterate queries previously generated by Copilot before they're inserted.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the database schema; none of the data is inside.
- Copilot responses can include inaccurate or low-quality content, so review outputs before using them in your work.
- People who can meaningfully evaluate the content's accuracy and appropriateness should review the outputs.
- The Copilot in Fabric in SQL database chat pane isn't currently available if Private Link is enabled and Public Access is disabled in the tenant setting.

## Related content

- [How to use the Copilot code completion for Copilot in Fabric in SQL database](copilot-code-completion.md)
- [How to use the Copilot chat pane for Copilot in Fabric in SQL database](copilot-quick-actions.md)
- [Frequently asked questions for Copilot in Fabric in SQL database](copilot-faq.yml)
- [Privacy, security, and responsible AI use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)
