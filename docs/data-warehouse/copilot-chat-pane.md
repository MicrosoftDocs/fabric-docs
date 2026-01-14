---
title: "How to Use the Copilot Chat Pane in the Data Warehouse Workload (Preview)"
description: Learn more about Copilot chat pane in Microsoft Fabric in the Data Warehouse workload, to ask questions specific to your warehouse.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf
ms.date: 09/02/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.devlang: copilot-prompt
---

# How to use the Copilot chat pane in Fabric Data Warehouse (Preview)

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Copilot in Fabric in Data Warehouse includes a chat pane to interact with Copilot in natural language. In this interface, you can ask Copilot questions specific to your data warehouse or generally about data warehousing in Fabric. Depending on the question, Copilot responds with a generated SQL query or a natural language response.

Since Copilot is schema-aware and contextualized, you can generate queries tailored to your Warehouse.

This integration means that Copilot can generate SQL queries for prompts like:

```copilot-prompt
- Show me all properties that sold last year
- Which agents have listed more than two properties for sale?
- Tell me the rank of each agent by property sales and show name, total sales, and rank.
```

## Key capabilities

The supported capabilities of interacting through chat include:

- **Natural Language to SQL**: Generate T-SQL code and get suggestions of questions to ask to accelerate your workflow.
- **Q&A**: Ask Copilot questions about warehousing in Fabric, and it responds in natural language
- **Explanations**: Copilot can provide a summary and natural language of explanations of T-SQL code within the active query tab.
- **Fixing errors**: Copilot can also fix errors in T-SQL code as they arise. Copilot shares context with the active query tab and can provide helpful suggestions to automatically fix SQL query errors.

## Prerequisites

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## Get started

1. In the **Data warehouse** workload, open a warehouse and open a new SQL query.

1. To open the Copilot chat pane, select the **Copilot** button.

   :::image type="content" source="media/copilot-chat-pane/copilot-button.png" alt-text="Screenshot from the Fabric portal showing the Copilot button in the ribbon." lightbox="media/copilot-chat-pane/copilot-button.png":::

1. The chat pane offers helpful starter prompts to get started and familiar with Copilot. Select any option to ask Copilot a question. The **Ask a question** button provides example questions that are tailored specifically to your warehouse.

1. You can also type a request of your choice in the chat box and Copilot responds accordingly.

1. To find documentation related to your request, select the **Help** button.

   :::image type="content" source="media/copilot-chat-pane/copilot-chat.png" alt-text="Screenshot from the Fabric portal showing the Copilot chat.":::

## More powerful use cases

You can ask Copilot questions about the warehouse normally, and it should respond accordingly. However, if you want to force Copilot to perform a specific skill, there are `/` commands that you can use. These commands must be at the start of your chat message.

| Command | Description |
| --- | --- |
| `/generate-sql` | Generate a SQL query from the prompt submitted to Copilot. |
| `/explain` | Generate an explanation for the query within the active query tab. |
| `/fix` | Generate a fix for the query within the active query tab. You can optionally add additional context to fix a specific part or aspect of the query. |
| `/question` | Generate a natural language response from the prompt submitted to Copilot. |
| `/help` | Get help for using Copilot. This links to documentation on Copilot and how to use it. |

For `/generate-sql`, `/question`, and optionally `/fix`, include additional information regarding your intent. For example:

- `/generate-sql select numbers 1 through 10`
- `/question what types of security are Supported for this warehouse?`
- `/fix using CTAS instead of ALTER TABLE`

## Related content

- [What is Copilot in Fabric in Data Warehouse?](copilot.md)
- [How to use Copilot code completion in Fabric in Data Warehouse](copilot-code-completion.md)
- [How to use Copilot quick actions in Fabric in Data Warehouse](copilot-quick-action.md)
- [Privacy, security, and responsible use of Copilot in Fabric in Data Warehouse](../fundamentals/copilot-data-warehouse-privacy-security.md)
