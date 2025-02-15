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

Microsoft Copilot for SQL database in Microsoft Fabric is an AI assistant designed to streamline database tasks. It integrates seamlessly with your Fabric database, providing intelligent insights to help you along each step of your T-SQL explorations.

## Key features for Copilot

Copilot for SQL database generates T-SQL code by utilizing table and view names, column names, primary key, and foreign key metadata. It doesn't use data in tables to generate T-SQL suggestions.

- [**Code completion**](copilot-code-completion.md): Start writing T-SQL in the SQL query editor, and Microsoft Copilot automatically generates a code suggestion to help complete your query. The **Tab** key accepts the code suggestion or keeps typing to ignore the suggestion. Copilot can also suggest code completions for table and column names, functions, and keywords.

- **[Quick actions](copilot-quick-actions.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.

- **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios include incorrect/unsupported T-SQL code, wrong spellings, etc. Copilot will also provide comments that explain the changes and suggest SQL best practices.

- **Explain:** Copilot can provide natural language explanations of your SQL query and database schema in comments format.

- **Natural Language to SQL**: This tool generates T-SQL code from plain text requests, allowing users to query data without knowing SQL syntax.

- **Document-based Q&A**: Ask Copilot questions about general SQL database capabilities, and it responds in natural language. Copilot also helps find documentation related to your request.

## Enable Copilot

To enable Copilot for SQL database in Microsoft Fabric, ensure the following prerequisites are met.

- Your administrator needs to enable the tenant switch before you start using Copilot. For more information, see [Copilot tenant settings](../admin/service-admin-portal-copilot.md).

- Your F64 or P1 capacity must be in one of the regions listed in this article, [Fabric region availability](../admin/region-availability.md).

- If your tenant or capacity is outside the US or France, Copilot is disabled by default unless your Fabric tenant admin enables the [Data sent to Azure OpenAI can be processed outside your tenant's geographic region, compliance boundary, or national cloud instance](/fabric/admin/service-admin-portal-copilot) tenant setting in the Fabric Admin portal.

- Copilot in Microsoft Fabric isn't supported on trial SKUs. Only paid SKUs (F64 or higher or P1 or higher) are supported.

- For more information, see [Overview of Copilot in Fabric and Power BI](../fundamentals/copilot-fabric-overview.md).

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

## Responsible use of Copilot

Microsoft is committed to ensuring that our AI principles and Responsible AI Standards guide our AI systems. These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to address emerging issues proactively.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means they're reviewed by multidisciplinary teams for potential harms and then refined to include mitigations.

For more information, see [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md).

## Limitations

Here are the current limitations of Copilot for SQL database:

- Copilot can't change existing SQL queries in the SQL query editor. For example, if you ask Copilot chat pane to edit a specific part of an existing query, it doesn't work. However, Copilot understands previous inputs in the chat pane, allowing users to iterate queries previously generated by Copilot before they're inserted.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the database schema; none of the data is inside.
- Copilot responses can include inaccurate or low-quality content, so review outputs before using them in your work.
- People who can meaningfully evaluate the content's accuracy and appropriateness should review the outputs.
- Copilot for SQL database in Fabric isn't currently available if Private Link is enabled and Public Access is turned off in the tenant setting.

## Frequently Asked Questions (FAQ)

For more information about using Microsoft Copilot for SQL database in Fabric, visit ["Frequently asked questions for Copilot in SQL database in Microsoft Fabric](copilot-faq.yml).

For more information about using Microsoft Copilot, visit [Use Copilot to get the most from Learn](https://review.learn.microsoft.com/copilot/roadmap/use-copilot-to-get-the-most-from-learn?branch=pr-en-us-474).

## Related content

- [Use the Copilot chat pane for SQL database](copilot-chat-pane.md)
- [Use Copilot code completion for SQL database](copilot-code-completion.md)
- [Use Copilot quick actions for SQL database](copilot-quick-actions.md)
- [Privacy, security, and responsible use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)
