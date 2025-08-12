---
title: How To Use the Copilot Explain and Fix Quick Action Features in Fabric in the SQL database Workload
description: Learn more about Microsoft Copilot Explain and Fix quick action features for Copilot in Fabric in the SQL database workload, to ask questions specific about your database.
author: yoleichen
ms.author: yoleichen
ms.reviewer: maghan, wiassaf
ms.date: 05/19/2025
ms.update-cycle: 180-days
ms.topic: how-to
ms.collection:
- ce-skilling-ai-copilot
ms.custom: sfi-image-nochange
---

# How to use the Copilot Explain and Fix quick action features in Fabric in the SQL database workload (Preview)

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

There are two AI-powered quick actions that are currently supported in Copilot in Fabric in the SQL database workload: **Explain** and **Fix**.

:::image type="content" source="media/copilot-quick-actions/copilot-toolbar.png" alt-text="Screenshot from the Fabric portal showing the Explain and Fix toolbar above a new empty SQL query tab." lightbox="media/copilot-quick-actions/copilot-toolbar.png":::

Quick actions can accelerate productivity by helping you write and understand queries faster. These buttons are located at the top of the SQL query editor, near the **Run** button.

- The **Explain** quick action leaves a summary at the top of the query and in-line code comments throughout the query to describe what the query is doing.

- The **Fix** quick action fixes errors in your query syntax or logic. After running a SQL query and being met with an error, you can fix your queries easily. Copilot automatically takes the SQL error message into context when fixing your query. Copilot also leaves a comment indicating where and how it has edited the T-SQL code.

Copilot uses information about your database schema, query tab contents, and execution results to give you relevant and useful feedback on your query.

## Prerequisites

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

## Get started

Whether you're a beginner or an expert in writing SQL queries, quick actions allow you to understand and navigate the complexities of the SQL language to easily solve issues independently.

## Explain

To use Copilot to explain your queries, follow these steps:

1. Highlight the query that you want Copilot to explain. You can select the whole query or just a part of it.

   :::image type="content" source="media/copilot-quick-actions/copilot-explain-query.png" alt-text="Screenshot from the Fabric portal showing the Explain action and a block of highlighted T-SQL text." lightbox="media/copilot-quick-actions/copilot-explain-query.png":::

1. Select the **Explain** button in the toolbar. Copilot analyzes your query and generates inline comments that explain what your code does. If applicable, Copilot leaves a summary at the top of the query as well. The comments appear next to the relevant lines of code in your query editor.

   :::image type="content" source="media/copilot-quick-actions/copilot-explain-tsql.png" alt-text="Screenshot from the Fabric portal showing comments added by Copilot in the T-SQL code." lightbox="media/copilot-quick-actions/copilot-explain-tsql.png":::

1. Review the comments that Copilot generated. You can edit or delete them if you want. You can also undo the changes if you don't like them, or make further edits.

## Fix

To get Copilot's help with fixing an error in your query, follow these steps:

1. Write and run your query as usual. If there are any errors, you see them in the output pane.

1. Highlight the query that you want to fix. You can select the whole query or just a part of it.

1. Select the **Fix** button in the toolbar. The button only gets enabled after you run your T-SQL query and it has returned an error.

   :::image type="content" source="media/copilot-quick-actions/copilot-fix.png" alt-text="Screenshot from the Fabric portal showing the Fix quick action and a T-SQL query with an error." lightbox="media/copilot-quick-actions/copilot-fix.png":::

1. Copilot analyzes your query and tries to find the best way to fix it. It also adds comments to explain what it fixed and why.

   :::image type="content" source="media/copilot-quick-actions/copilot-fix-tsql.png" alt-text="Screenshot from the Fabric portal showing comments added by Copilot to the T-SQL query." lightbox="media/copilot-quick-actions/copilot-fix-tsql.png":::

1. Review the changes that Copilot made and select **Run** to execute the fixed query. You can also undo the changes if you don't like them, or make further edits.

## Related content

- [What is Copilot in Fabric in the SQL database workload?](copilot.md)
- [How to use the Copilot code completion for Copilot in Fabric in SQL database](copilot-code-completion.md)
- [How to use the Copilot chat pane for Copilot in Fabric in SQL database](copilot-chat-pane.md)
- [Privacy, security, and responsible AI use of Copilot in Fabric](../../fundamentals/copilot-privacy-security.md)
