---
title: "How To: Use Copilot Code Completion for Fabric Data Warehouse"
description: Learn more about Microsoft Copilot code completion for Fabric Data Warehouse, to provide intelligent autocomplete-style code suggestions.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf, jacinda-eng
ms.date: 02/20/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
---

# How to: Use Copilot code completion for Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Copilot for Data Warehouse provides intelligent autocomplete-style T-SQL code suggestions to simplify your coding experience.

As you start writing T-SQL code or comments in the editor, Copilot for Data Warehouse applies your warehouse schema and query tab context to complement the existing IntelliSense with inline code suggestions. The completions can come in varied lengths - sometimes the completion of the current line, and sometimes a whole new block of code. The code completions support all types of T-SQL queries: data definition language (DDL), data query language (DQL), and data manipulation language (DML). You can accept all or part of a suggestion or keep typing to ignore the suggestions. It can also generate alternative suggestions for you to pick.

## Prerequisites

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## How can code completions help you?

Code completion enhances your productivity and workflow in Copilot for Data Warehouse by reducing the cognitive load of writing T-SQL code. It accelerates code writing, prevents syntax errors and typos, and improves code quality. It provides helpful, context-rich suggestions directly within the query editor. Whether you're new to or experienced with SQL, code completion helps you save time and energy with writing SQL code, and focus on designing, optimizing, and testing your warehouse.

## Key capabilities

- **Auto-complete partially written queries**: Copilot can provide context-aware SQL code suggestions or completions for your partially written T-SQL query.
- **Generate suggestions from comments**: You can guide Copilot using comments that describe your code logic and purpose, using natural language. Leave the comment (using `--`) at the beginning of the query and Copilot will generate the corresponding query.

## Get started

1. Verify the **Show Copilot completions** setting in enabled in your warehouse settings.
   - You can also check the setting's status through the status bar at the bottom of the query editor.
   - If not enabled, then in your warehouse **Settings**, select the **Copilot** pane. Enable the **Show Copilot completions** option is enabled.

1. Start writing your query in the SQL query editor within the warehouse. As you type, Copilot provides real-time code suggestions and completions of your query by presenting a dimmed ghost text.

1. You can then accept the suggestion with the **Tab** key, or dismiss it. If you don't want to accept an entire suggestion from Copilot, you can use the **Ctrl+Right** keyboard shortcut to accept the next word of a suggestion.

1. Copilot can provide different suggestions for the same input. You can hover over the suggestion to preview the other options.

1. To help Copilot, understand the query you're writing, you can provide context about what code you expect by leaving a comment with `--`. For example, you could specify which warehouse object, condition, or methods to use. Copilot can even autocomplete your comment to help you write clear and accurate comments more efficiently.

## Related content

- [Overview of Copilot for Data Warehouse](copilot.md)
- [How to: Use the Copilot chat pane for Fabric Data Warehouse](copilot-chat-pane.md)
- [How to: Use Copilot quick actions for Fabric Data Warehouse](copilot-quick-action.md)
- [Privacy, security, and responsible use of Copilot for Data Warehouse (preview)](../fundamentals/copilot-data-warehouse-privacy-security.md)
