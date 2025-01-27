---
title: "How to: Use Copilot quick actions for Fabric Data Warehouse"
description: Learn more about Microsoft Copilot quick actions for Fabric Data Warehouse, to explain and fix SQL queries in the SQL query editor.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: salilkanade
ms.date: 10/22/2024
ms.topic: how-to
ms.collection: ce-skilling-ai-copilot
ms.custom:
  - build-2024
  - build-2024-dataai
  - build-2024-fabric
  - ignite-2024
---
# How to: Use Copilot quick actions for Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

There are two AI-powered quick actions that are currently supported in Copilot for Data Warehouse: **Explain** and **Fix**.

:::image type="content" source="media/copilot-quick-action/explain-fix.png" alt-text="Screenshot from the Fabric portal showing the Explain and Fix buttons above a new empty SQL query tab.":::

Quick actions can accelerate productivity by helping you write and understand queries faster. These buttons are located at the top of the SQL query editor, near the **Run** button.

- The **Explain** quick action will leave a summary at the top of the query and in-line code comments throughout the query to describe what the query is doing.

- The **Fix** quick action will fix errors in your query syntax or logic. After running a SQL query and being met with an error, you can fix your queries easily. Copilot will automatically take the SQL error message into context when fixing your query. Copilot will also leave a comment indicating where and how it has edited the T-SQL code.  

Copilot leverages information about your warehouse schema, query tab contents, and execution results to give you relevant and useful feedback on your query.

## Prerequisites

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## Get started

Whether you are a beginner or an expert in writing SQL queries, quick actions allow you to understand and navigate the complexities of the SQL language to easily solve issues independently.

### Explain

To use Copilot to explain your queries, follow these steps:

1. Highlight the query that you want Copilot to explain. You can select the whole query or just a part of it.

    :::image type="content" source="media/copilot-quick-action/explain.png" alt-text="Screenshot from the Fabric portal showing the Explain action and a block of highlighted T-SQL text." lightbox="media/copilot-quick-action/explain.png":::

1. Select the **Explain** button in the toolbar. Copilot will analyze your query and generate inline comments that explain what your code does. If applicable, Copilot will leave a summary at the top of the query as well. The comments will appear next to the relevant lines of code in your query editor.

    :::image type="content" source="media/copilot-quick-action/explain-t-sql.png" alt-text="Screenshot from the Fabric portal showing comments added by Copilot in the T-SQL code." lightbox="media/copilot-quick-action/explain-t-sql.png":::

1. Review the comments that Copilot generated. You can edit or delete them if you want. You can also undo the changes if you don't like them, or make further edits.

### Fix

To get Copilot's help with fixing an error in your query, follow these steps:

1. Write and run your query as usual. If there are any errors, you will see them in the output pane.

1. Highlight the query that you want to fix. You can select the whole query or just a part of it.

1. Select the **Fix** button in the toolbar. This button will only be enabled after you have run your T-SQL query and it has returned an error.

    :::image type="content" source="media/copilot-quick-action/fix.png" alt-text="Screenshot from the Fabric portal showing the Fix quick action and a T-SQL query with an error." lightbox="media/copilot-quick-action/fix.png":::

1. Copilot will analyze your query and try to find the best way to fix it. It will also add comments to explain what it fixed and why.

    :::image type="content" source="media/copilot-quick-action/fix-t-sql.png" alt-text="Screenshot from the Fabric portal showing comments added by Copilot to the T-SQL query." lightbox="media/copilot-quick-action/fix-t-sql.png":::

1. Review the changes that Copilot made and select **Run** to execute the fixed query. You can also undo the changes if you don't like them, or make further edits.

## Related content

- [Microsoft Copilot for Fabric Data Warehouse](copilot.md)
- [How to: Use Copilot code completion for Fabric Data Warehouse](copilot-code-completion.md)
- [How to: Use the Copilot chat pane for Fabric Data Warehouse](copilot-chat-pane.md)
- [Privacy, security, and responsible use of Copilot for Data Warehouse (preview)](../fundamentals/copilot-data-warehouse-privacy-security.md)
