---
title: Copilot for Data Warehouse (preview)
description: Learn more about Microsoft Copilot for Fabric Data Warehouse, the integrated AI assistant for your Fabric warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade
ms.date: 09/25/2024
ms.topic: conceptual
ms.collection: ce-skilling-ai-copilot
ms.custom:
  - build-2024
  - build-2024-dataai
  - build-2024-fabric
  - copilot-learning-hub
  - ignite-2024
---
# Overview of Copilot for Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Microsoft Copilot for Fabric Data Warehouse is an AI assistant designed to streamline your data warehousing tasks. Copilot integrates seamlessly with your Fabric warehouse, providing intelligent insights to help you along each step of the way in your T-SQL explorations.

## Introduction to Copilot for Data Warehouse

Copilot for Data Warehouse utilizes table and view names, column names, primary key, and foreign key metadata to generate T-SQL code. Copilot for Data Warehouse does not use data in tables to generate T-SQL suggestions.

Key features of Copilot for Warehouse include:

- **Natural Language to SQL**: Ask Copilot to generate SQL queries using simple natural language questions.
- **Code completion**: Enhance your coding efficiency with AI-powered code completions.
- **Quick actions**: Quickly fix and explain SQL queries with readily available actions.
- **Intelligent Insights**: Receive smart suggestions and insights based on your warehouse schema and metadata.

There are three ways to interact with Copilot in the Fabric Warehouse editor.

- **Chat Pane**: Use the chat pane to ask questions to Copilot through natural language. Copilot will respond with a generated SQL query or natural language based on the question asked.
    - [How to: Use the Copilot chat pane for Fabric Data Warehouse](copilot-chat-pane.md)
- **Code completions**: Start writing T-SQL in the SQL query editor and Copilot will automatically generate a code suggestion to help complete your query. The **Tab** key accepts the code suggestion, or keep typing to ignore the suggestion.
    - [How to: Use Copilot code completion for Fabric Data Warehouse](copilot-code-completion.md)
- **Quick Actions**: In the ribbon of the SQL query editor, the **Fix** and **Explain** options are quick actions. Highlight a SQL query of your choice and select one of the quick action buttons to perform the selected action on your query.
    - **Explain:** Copilot can provide natural language explanations of your SQL query and warehouse schema in comments format.
    - **Fix:** Copilot can fix errors in your code as error messages arise. Error scenarios can include incorrect/unsupported T-SQL code, wrong spellings, and more. Copilot will also provide comments that explain the changes and suggest SQL best practices.
    - [How to: Use Copilot quick actions for Fabric Data Warehouse](copilot-quick-action.md)

## Use Copilot effectively

Here are some tips for maximizing productivity with Copilot.

- When crafting prompts, be sure to start with a clear and concise description of the specific information you're looking for.
- Natural language to SQL depends on expressive table and column names. If your table and columns aren't expressive and descriptive, Copilot might not be able to construct a meaningful query.
- Use natural language that is applicable to your table and view names, column names, primary keys, and foreign keys of your warehouse. This context helps Copilot generate accurate queries. Specify what columns you wish to see, aggregations, and any filtering criteria as explicitly as possible. Copilot should be able to correct typos or understand context given your schema context.
- Create relationships in the model view of the warehouse to increase the accuracy of JOIN statements in your generated SQL queries.
- When using code completions, leave a comment at the top of the query with `--` to help guide the Copilot with context about the query you are trying to write.
- Avoid ambiguous or overly complex language in your prompts. Simplify the question while maintaining its clarity. This editing ensures Copilot can effectively translate it into a meaningful T-SQL query that retrieves the desired data from the associated tables and views.
- Currently, natural language to SQL supports English language to T-SQL.
- The following example prompts are clear, specific, and tailored to the properties of your schema and data warehouse, making it easier for Copilot to generate accurate T-SQL queries:
    - `Show me all properties that sold last year`
    - `Count all the products, group by each category`
    - `Show all agents who sell properties in California`
    - `Show agents who have listed more than two properties for sale`
    - `Show the rank of each agent by property sales and show name, total sales, and rank`

## Enable Copilot

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## What should I know to use Copilot responsibly?

Microsoft is committed to ensuring that our AI systems are guided by our [AI principles](https://www.microsoft.com/ai/principles-and-approach/) and [Responsible AI Standard](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE5cmFl). These principles include empowering our customers to use these systems effectively and in line with their intended uses. Our approach to responsible AI is continually evolving to proactively address emerging issues.

Copilot features in Fabric are built to meet the Responsible AI Standard, which means that they're reviewed by multidisciplinary teams for potential harms, and then refined to include mitigations for those harms.

For more information, see [Privacy, security, and responsible use of Copilot for Data Warehouse (preview)](../fundamentals/copilot-data-warehouse-privacy-security.md).

## Limitations of Copilot for Data Warehouse

Here are the current limitations of Copilot for Data Warehouse:

- Copilot doesn't understand previous inputs and can't undo changes after a user commits a change when authoring, either via user interface or the chat pane. For example, you can't ask Copilot to "Undo my last 5 inputs." However, users can still use the existing user interface options to delete unwanted changes or queries.
- Copilot can't make changes to existing SQL queries. For example, if you ask Copilot to edit a specific part of an existing query, it doesn't work.
- Copilot might produce inaccurate results when the intent is to evaluate data. Copilot only has access to the warehouse schema, none of the data inside.
- Copilot responses can include inaccurate or low-quality content, so make sure to review outputs before using them in your work.
- People who are able to meaningfully evaluate the content's accuracy and appropriateness should review the outputs.

## Related content

- [Copilot tenant settings (preview)](../admin/service-admin-portal-copilot.md)
- [How to: Use the Copilot chat pane for Fabric Data Warehouse](copilot-chat-pane.md)
- [How to: Use Copilot quick actions for Fabric Data Warehouse](copilot-quick-action.md)
- [How to: Use Copilot code completion for Fabric Data Warehouse](copilot-code-completion.md)
- [Privacy, security, and responsible use of Copilot for Data Warehouse (preview)](../fundamentals/copilot-data-warehouse-privacy-security.md)
