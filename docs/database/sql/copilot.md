---
title: Overview of Copilot for SQL database (preview)
description: "Learn more about the Microsoft Copilot for SQL database in Fabric, an AI assistant designed to streamline your database tasks."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: yoleichen, sukkaur
ms.date: 01/16/2025
ms.topic: conceptual
ms.custom:
  - ignite-2024
---
# Copilot for SQL database in Microsoft Fabric (preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Microsoft Copilot for SQL database in Fabric is an AI assistant designed to streamline your database tasks. Copilot integrates seamlessly with your Fabric database, providing intelligent insights to help you along each step of the way in your T-SQL explorations.

## Introduction to Copilot for SQL database

Copilot for SQL database utilizes table and view names, column names, primary key, and foreign key metadata to generate T-SQL code. Copilot for SQL database does not use data in tables to generate T-SQL suggestions.

Key features of Copilot for SQL database include:  

- [**Code completion**](copilot-code-completion.md): Start writing T-SQL in the SQL query editor and Copilot will automatically generate a code suggestion to help complete your query. The **Tab** key accepts the code suggestion or keeps typing to ignore the suggestion. 

- **[Quick actions](copilot-quick-actions.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.

  - **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios can include incorrect/unsupported T-SQL code, wrong spellings, and more. Copilot will also provide comments that explain the changes and suggest SQL best practices.
  
  - **Explain:** Copilot can provide natural language explanations of your SQL query and database schema in comments format.
  
- **[Chat pane](copilot-chat-pane.md)**: Use the chat pane to ask questions to Copilot through natural language. Copilot responds with a generated SQL query or natural language based on the question asked.

  - **Natural Language to SQL**: Generate T-SQL code from plain text requests, allowing users to query data without needing to know SQL syntax. 
    
  - **Document-based Q&A**: Ask Copilot questions about general SQL database capabilities, and it responds in natural language. Copilot also helps find documentation related to your request.

## Use Copilot effectively

Here are some tips for maximizing productivity with Copilot.

- When crafting prompts, be sure to start with a clear and concise description of the specific information you're looking for.
- Natural language to SQL depends on expressive table and column names. If your table and columns aren't expressive and descriptive, Copilot might not be able to construct a meaningful query.
- Use natural language that is applicable to your table and view names, column names, primary keys, and foreign keys of your database. This context helps Copilot generate accurate queries. Specify what columns you wish to see, aggregations, and any filtering criteria as explicitly as possible. Copilot should be able to correct typos or understand context given your schema context.

- When using code completions, leave a comment at the top of the query with `--` to help guide the Copilot with context about the query you are trying to write.
- Avoid ambiguous or overly complex language in your prompts. Simplify the question while maintaining its clarity. This editing ensures Copilot can effectively translate it into a meaningful T-SQL query that retrieves the desired data from the associated tables and views.
- Currently, Copilot for SQL database in Fabric only supports English language to T-SQL.
- The following example prompts are clear, specific, and tailored to the properties of your schema and data database, making it easier for Copilot to generate accurate T-SQL queries:
  - `What are the top-selling products by quantity?`
  - `Count all the products, group by each category`
  - `Show all sales transactions occurred on [a specific date]`
  - `Create a table in [schema name] called "SalesTransactions" with the columns CustomerID, ProductID and OrderID`

## Enable copilot

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## What should I know to use Copilot responsibly?

Microsoft is committed to ensuring that our AI systems are guided by our AI principles and Responsible AI Standard. These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means that they're reviewed by multidisciplinary teams for potential harms, and then refined to include mitigations for those harms.

For more information, see [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md).

## Limitations of Copilot for SQL database

Here are the current limitations of Copilot for SQL database:

- Copilot can't make changes to existing SQL queries in the SQL query editor. For example, if you ask Copilot chat pane to edit a specific part of an existing query, it doesn't work. However, Copilot understands previous inputs in the chat pane, allowing users to iterate queries previously generated by Copilot before they're inserted.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the database schema, none of the data inside.
- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- People who are able to meaningfully evaluate the content's accuracy and appropriateness should review the outputs.
- Copilot for SQL database in Fabric is not currently available if Private Link is enabled and Public Access is turned off in the tenant setting.

## Related content

- [How to: Use the Copilot chat pane for SQL database](copilot-chat-pane.md)
- [How to: Use Copilot code completion for SQL database](copilot-code-completion.md)
- [How to: Use Copilot quick actions for SQL database](copilot-quick-actions.md)
- [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)
