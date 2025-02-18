---
title: "How To: Use Copilot Quick Actions for Fabric Data Warehouse"
description: Learn more about Microsoft Copilot quick actions for Fabric Data Warehouse, to explain and fix SQL queries in the SQL query editor.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf
ms.date: 02/18/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
---

# How to: Use Copilot quick actions for Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

There are two AI-powered quick actions that are currently supported in Copilot for Data Warehouse: **Explain** and **Fix**.

Quick actions can accelerate productivity by helping you write and understand queries faster. These buttons are located at the top of the SQL query editor, near the **Run** button.

- The **Explain** quick action leaves a summary at the top of the query and in-line code comments throughout the query to describe what the query is doing.

- The **Fix** quick action fixes errors in your query syntax or logic. After running a SQL query and being met with an error, you can fix your queries easily. Copilot automatically takes the SQL error message into context when fixing your query. Copilot also leaves a comment indicating where and how it edits the T-SQL code.

Copilot applies information about your warehouse schema, query tab contents, and execution results to give you relevant and useful feedback on your query.

## Prerequisites

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## Get started

Whether you're a beginner or an expert in writing SQL queries, quick actions allow you to understand and navigate the complexities of the SQL language to easily solve issues independently.

### Explain

To use Copilot to explain your queries, follow these steps:

1. Highlight the query that you want Copilot to explain. You can select the whole query or just a part of it.

1. Select the **Explain** button in the toolbar. Copilot analyzes your query and generates inline comments that explain what your code does. If applicable, Copilot leaves a summary at the top of the query as well. The comments appear next to the relevant lines of code in your query editor.

1. Review the comments that Copilot generated. You can edit or delete them if you want. You can also undo the changes if you don't like them, or make further edits.

### Fix

To get Copilot's help with fixing an error in your query, follow these steps:

1. Write and run your query as usual. If there are any errors, you see them in the output pane.

1. Highlight the query that you want to fix. You can select the whole query or just a part of it.

1. Select the **Fix** button in the toolbar. This button will only be enabled after you run your T-SQL query and it returns an error.

1. Copilot analyzes your query and tries to find the best way to fix it. It also adds comments to explain what it fixed and why.

1. Review the changes that Copilot made and select **Run** to execute the fixed query. You can also undo the changes if you don't like them, or make further edits.

## Related content

- [Microsoft Copilot for Fabric Data Warehouse](copilot.md)
- [How to: Use Copilot code completion for Fabric Data Warehouse](copilot-code-completion.md)
- [How to: Use the Copilot chat pane for Fabric Data Warehouse](copilot-chat-pane.md)
- [Privacy, security, and responsible use of Copilot for Data Warehouse (preview)](../fundamentals/copilot-data-warehouse-privacy-security.md)
