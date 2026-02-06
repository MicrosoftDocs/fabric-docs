---
title: "Microsoft Copilot in the Data Warehouse Workload Overview"
description: Learn more about Copilot in Fabric in the Data Warehouse workload.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf
ms.date: 09/02/2025
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.custom:
  - copilot-learning-hub
ms.devlang: copilot-prompt
---

# What is Copilot in the Data Warehouse workload (Preview)?

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Copilot in Fabric Data Warehouse is an AI assistant designed to streamline your data warehousing tasks. Copilot integrates seamlessly with your data warehouse in Fabric, providing intelligent insights to help you along each step of the way in your T-SQL explorations.

Copilot in Fabric Data Warehouse utilizes table and view names, column names, primary key, and foreign key metadata to generate T-SQL code. Copilot in Fabric Data Warehouse doesn't use data in tables to generate T-SQL suggestions.

## Features of Copilot in Fabric Data Warehouse

Copilot in Fabric Data Warehouse offers the following features:

- **Natural Language to SQL**: Ask Copilot to generate SQL queries using simple natural language questions.
- **Code completion**: Enhance your coding efficiency with AI-powered code completions.
- **Quick actions**: Quickly fix and explain SQL queries with readily available actions.
- **Intelligent Insights**: Receive smart suggestions and insights based on your warehouse schema and metadata.

There are three ways to interact with Copilot in the Fabric Warehouse editor.

- **[Copilot chat pane in Fabric Data Warehouse](copilot-chat-pane.md)**: Use the chat pane to ask questions to Copilot through natural language. Copilot responds with a generated SQL query or natural language based on the question asked.
  - **Natural Language to SQL**: Generate T-SQL code and get suggestions of questions to ask to accelerate your workflow.

- **[Copilot code completion in Fabric Data Warehouse](copilot-code-completion.md)**: Start writing T-SQL in the SQL query editor and Copilot automatically generates a code suggestion to help complete your query. The **Tab** key accepts the code suggestion, or keeps typing to ignore the suggestion.

- **[Copilot quick actions in Fabric Data Warehouse](copilot-quick-action.md)**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.
  - **Explain:** Copilot can provide natural language explanations of your SQL query and warehouse schema in comments format.
  - **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios can include incorrect/unsupported T-SQL code, wrong spellings, and more. Copilot also provides comments that explain the changes and suggest SQL best practices.

## Enable Copilot

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## Best practices for using Copilot in Fabric Data Warehouse

Here are some tips for maximizing productivity with Copilot.

- When crafting prompts, be sure to start with a clear and concise description of the specific information you're looking for.
- Natural language to SQL depends on expressive table and column names. If your table and columns aren't expressive and descriptive, Copilot might not be able to construct a meaningful query.
- Use natural language that is applicable to your table and view names, column names, primary keys, and foreign keys of your warehouse. This context helps Copilot generate accurate queries. Specify what columns you wish to see, aggregations, and any filtering criteria as explicitly as possible. Copilot should be able to correct typos or understand context given your schema context.
- Create relationships in the model view of the warehouse to increase the accuracy of `JOIN` statements in your generated SQL queries.
- When using code completions, leave a comment at the top of the query with `--` to help guide the Copilot with context about the query you're trying to write.
- Avoid ambiguous or overly complex language in your prompts. Simplify the question while maintaining its clarity. This editing ensures Copilot can effectively translate it into a meaningful T-SQL query that retrieves the desired data from the associated tables and views.
- Currently, natural language to SQL supports English language to T-SQL.

## Example prompts

- The following example prompts are clear, specific, and tailored to the properties of your schema and data warehouse, making it easier for Copilot to generate accurate T-SQL queries:

```copilot-prompt
    - Show me all properties that sold last year
    - Count all the products, group by each category
    - Show all agents who sell properties in California
    - Show agents who have listed more than two properties for sale
    - Show the rank of each agent by property sales and show name, total sales, and rank
```

> [!NOTE]  
> AI powers Copilot, so surprises and mistakes are possible.

## Responsible AI use of Copilot

To view Microsoft's guidelines for responsible AI in Fabric Data Warehouse, see [Privacy, security, and responsible use of Copilot](/fabric/fundamentals/copilot-data-warehouse-privacy-security).

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://www.microsoft.com/ai/responsible-ai). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues.

## Limitations

Here are the current limitations of Copilot in Fabric in Data Warehouse:

- Copilot doesn't understand previous inputs and can't undo changes after a user commits a change when authoring, either via user interface or the chat pane. For example, you can't ask Copilot to *Undo my last five inputs.* However, users can still use the existing user interface options to delete unwanted changes or queries.
- Copilot can't make changes to existing SQL queries. For example, if you ask Copilot to edit a specific part of an existing query, it doesn't work.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the warehouse schema, none of the data inside.
- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- People who are able to meaningfully evaluate the content's accuracy and appropriateness should review the outputs.

## Related content

- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
- [How to: Use the Copilot chat pane in Fabric in SQL database](copilot-chat-pane.md)
- [How to: Use Copilot quick actions in Fabric in SQL database](copilot-quick-action.md)
- [How to: Use Copilot code completion in Fabric in SQL database](copilot-code-completion.md)
- [Privacy, security, and responsible use of Copilot in Fabric in Data Warehouse](../fundamentals/copilot-data-warehouse-privacy-security.md)
