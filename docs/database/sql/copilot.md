---
title: Overview of Copilot for SQL Database in Microsoft Fabric
description: Learn more about the Microsoft Copilot for SQL database in Microsoft Fabric, an AI assistant designed to streamline your database tasks.
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, sukkaur, wiassaf
ms.date: 02/15/2025
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
---

# What is Microsoft Copilot for SQL database in Microsoft Fabric? (Preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Microsoft Copilot for SQL database in Microsoft Fabric is an AI assistant that streamlines database tasks. It integrates seamlessly with your Fabric database, providing intelligent insights to help you along each step of your T-SQL explorations.

## Why use Copilot for SQL database?

Here are some key features and benefits of using Microsoft Copilot for SQL database in Microsoft Fabric:

- **Increased productivity**: Copilot can help you write T-SQL queries faster and more efficiently, allowing you to focus on analyzing data rather than writing code.

- **Improved accuracy**: By leveraging AI, Copilot can help reduce errors in your T-SQL code, ensuring that your queries are more accurate and reliable.

- **Enhanced learning**: Copilot can provide explanations and suggestions for T-SQL code, helping you learn and understand SQL better.

- [**Code completion**](copilot-code-completion.md): Start writing T-SQL in the SQL query editor, and Microsoft Copilot automatically generates a code suggestion to help complete your query. The **Tab** key accepts the code suggestion or keeps typing to ignore the suggestion. Copilot can also suggest code completions for table and column names, functions, and keywords.

- **[Quick actions](copilot-quick-actions.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.

- **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios include incorrect/unsupported T-SQL code, wrong spellings, etc. Copilot will also provide comments that explain the changes and suggest SQL best practices.

- **Explain:** Copilot can provide natural language explanations of your SQL query and database schema in comments format.

- **Natural Language to SQL**: This tool generates T-SQL code from plain text requests, allowing users to query data without knowing SQL syntax.

## Enable Copilot in SQL database in Microsoft Fabric

To enable Copilot in SQL database in Microsoft Fabric, follow the steps outlined below.

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## Use Copilot in SQL database in Microsoft Fabric

Here are some tips for effectively maximizing productivity with Microsoft Copilot:

- Start with a clear and concise description of the specific information you seek when crafting prompts.

- Natural language to SQL depends on expressive table and column names. If your table and columns aren't expressive and descriptive, Copilot might be unable to construct a meaningful query.

- Use natural language that applies to your table and view your database's names, column names, primary keys, and foreign keys. This context helps Copilot generate accurate queries. Specify what columns you wish to see, aggregations, and any filtering criteria as explicitly as possible. Given your schema context, Copilot should be able to correct typos or understand context.

- When using code completions, leave a comment at the top of the query with `--` to help guide the Copilot with context about the query you're trying to write.

- Avoid ambiguous or overly complex language in your prompts. Simplify the question while maintaining its clarity. This editing ensures that Copilot can translate it into a meaningful T-SQL query that retrieves the desired data from the associated tables and views.

- Copilot for SQL database in Fabric only supports English language to T-SQL.

- The following example prompts are clear, specific, and tailored to the properties of your schema and data database, making it easier for Copilot to generate accurate T-SQL queries:

```copilot-prompt
 - What are the top-selling products by quantity?
 - Count all the products grouped by category
 - Show all sales transactions that occurred on [a specific date]
 ```

  > [!NOTE]
  > AI powers Copilot, so surprises and mistakes are possible.

## Responsible use of Copilot in Fabric

Visit [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md).

## Limitations

Here are the current limitations of Copilot for SQL database:

- Copilot can't change existing SQL queries in the SQL query editor. For example, if you ask Copilot chat pane to edit a specific part of an existing query, it doesn't work. However, Copilot understands previous inputs in the chat pane, allowing users to iterate queries previously generated by Copilot before they're inserted.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the database schema; none of the data is inside.
- Copilot responses can include inaccurate or low-quality content, so review outputs before using them in your work.
- People who can meaningfully evaluate the content's accuracy and appropriateness should review the outputs.
- Copilot for SQL database in Fabric isn't currently available if Private Link is enabled and Public Access is turned off in the tenant setting.

use-copilot-to-get-the-most-from-learn?branch=pr-en-us-474).

## Related content

- [Use Copilot to get the most from Learn](https://review.learn.microsoft.com/copilot/roadmap/)
- [Use Copilot code completion for SQL database](copilot-code-completion.md)
- [Use Copilot quick actions for SQL database](copilot-quick-actions.md)
- [Frequently asked questions for Copilot in SQL database in Microsoft Fabric](copilot-faq.yml)