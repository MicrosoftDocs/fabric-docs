---
title: "How to: Use the Copilot chat pane for Synapse Data Warehouse"
description: Learn more about Microsoft Copilot chat pane for Synapse Data Warehouse in Microsoft Fabric, to ask questions specific to your warehouse."
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade
ms.date: 05/08/2024
ms.service: fabric
ms.subservice: data-warehouse
ms.topic: how-to
ms.custom:
  - build-2024
  - build-2024-dataai
  - build-2024-fabric
---
# How to: Use the Copilot chat pane for Synapse Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Copilot for Data Warehouse includes a chat pane to interact with Copilot in natural language. In this interface, you can ask Copilot questions specific to your data warehouse or generally about data warehousing in Fabric. Depending on the question, Copilot will respond with a generated SQL query or a natural language response.

Since Copilot is schema aware and contextualized, you can generate queries specifically tailored to your Warehouse.

This integration means that Copilot can generate SQL queries for prompts like:

- `Show me all properties that sold last year`
- `Which agents have listed more than two properties for sale?`
- `Tell me the rank of each agent by property sales and show name, total sales, and rank`

## Key capabilities

The supported capabilities of interacting through chat include:

- **Natural Language to SQL**: Generate T-SQL code and get suggestions of questions to ask to accelerate your workflow.
- **Q&A**: Ask Copilot questions about warehousing in Fabric and it will respond in natural language
- **Explanations**: Copilot can provide a summary and natural language of explanations of code within the active query tab.
- **Fixing errors**: Copilot can also fix errors in T-SQL code as they arise. Copilot shares context with the active query tab and can provide helpful suggestions to automatically fix SQL query errors.

## Prerequisites

- Your administrator needs to enable the tenant switch before you start using Copilot. See the article [Copilot tenant settings](../admin/service-admin-portal-copilot.md) for details.

## Get started

1. To open the Copilot chat pane, select the **Copilot** ribbon in the button.

    :::image type="content" source="media/copilot-chat-pane/copilot-button.png" alt-text="Screenshot from the Fabric portal showing the Copilot button in the ribbon":::

1. The chat pane offers helpful starter prompts to get started and familiar with Copilot. Select any option to ask Copilot a question. The **Ask a question** button will provide example questions that are tailored specifically to your warehouse.

1. You can also type a request of your choice in the chat box and Copilot will respond accordingly.

1. To find documentation related to your request, select the **Help** button.

    :::image type="content" source="media/copilot-chat-pane/copilot-chat.png" alt-text="Screenshot from the Fabric portal showing the Copilot chat.":::

## More powerful use cases

You can ask Copilot questions about the warehouse normally and it should respond accordingly. However, if you want to force Copilot to perform a specific skill, there are `/` commands that you can leverage. These commands must be at the start of your chat message.

| Command        | Description                                                                                                 |
|----------------|-------------------------------------------------------------------------------------------------------------|
| `/generate-sql`| Generate a SQL query from the prompt submitted to Copilot.                                                    |
| `/explain`     | Generate an explanation for the query within the active query tab.                                            |
| `/fix`         | Generate a fix for the query within the active query tab. You can optionally add additional context to fix a specific part or aspect of the query. |
| `/question`    | Generate a natural language response from the prompt submitted to Copilot.                                    |
| `/help`        | Get help for using Copilot. This will link to documentation to Copilot and how to use it.                    |

 For `/generate-sql`, `/question`, and optionally `/fix`, include additional information regarding your intent. For example:

- `/generate-sql select numbers 1 through 10`
- `/question what types of security are supported in this warehouse?`
- `/fix using CTAS instead of ALTER TABLE`

## Related content

- [Microsoft Copilot for Synapse Data Warehouse](copilot.md)
- [How to: Use Copilot code completion for Synapse Data Warehouse](copilot-code-completion.md)
- [How to: Use Copilot quick actions for Synapse Data Warehouse](copilot-quick-action.md)