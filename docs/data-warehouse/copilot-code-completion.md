---
title: "How to Use Copilot Code Completion in the Data Warehouse Workload (Preview)"
description: Learn more about Copilot code completion in Microsoft Fabric in Data Warehouse workload, to provide intelligent autocomplete-style code suggestions.
author: markingmyname
ms.author: maghan
ms.reviewer: salilkanade, wiassaf
ms.date: 09/02/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
---

# How to Use Copilot code completion in Fabric Data Warehouse (Preview)

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Copilot in Fabric in Data Warehouse provides intelligent autocomplete-style T-SQL code suggestions to simplify your coding experience.

As you start writing T-SQL code or comments in the editor, Copilot for Data Warehouse uses your warehouse schema and query tab context to complement the existing IntelliSense with inline code suggestions. The completions can come in varied lengths - sometimes the completion of the current line, and sometimes a whole new block of code. The code completions support all types of T-SQL queries: data definition language (DDL), data query language (DQL), and data manipulation language (DML). You can accept all or part of a suggestion or keep typing to ignore the suggestions. It can also generate alternative suggestions for you to pick.

## Prerequisites

[!INCLUDE [copilot-include](../includes/copilot-include.md)]

## How can code completions help you?

Code completion enhances your productivity and workflow in Copilot for Data Warehouse by reducing the cognitive load of writing T-SQL code. It accelerates code writing, prevents syntax errors and typos, and improves code quality. It provides helpful, context-rich suggestions directly within the query editor. Whether you're new to or experienced with SQL, code completion helps you save time and energy with writing SQL code, and focus on designing, optimizing, and testing your warehouse.

## Key capabilities

- **Auto-complete partially written queries**: Copilot can provide context-aware SQL code suggestions or completions for your partially written T-SQL query.
- **Generate suggestions from comments**: You can guide Copilot using comments that describe your code logic and purpose, using natural language. Leave the comment (using `--`) at the beginning of the query and Copilot will generate the corresponding query.

## Get started

1. Verify the **Show Copilot completions** setting in enabled in your warehouse settings.

   1. You can also check the setting's status through the status bar at the bottom of the query editor.

      :::image type="content" source="media/copilot-code-completion/copilot-setting-status-bar.jpg" alt-text="Screenshot of the Copilot in-line completion status bar.":::

   1. If not enabled, then in your warehouse **Settings**, select the **Copilot** pane. Enable the **Show Copilot completions** option is enabled.

   :::image type="content" source="media/copilot-code-completion/copilot-setting.png" alt-text="Screenshot of the Copilot in-line completions setting in the setting pane." lightbox="media/copilot-code-completion/copilot-setting.png":::

1. Start writing your query in the SQL query editor within the warehouse. As you type, Copilot provides real-time code suggestions and completions of your query by presenting a dimmed ghost text.

   :::image type="content" source="media/copilot-code-completion/code-completion-suggestion.png" alt-text="Screenshot from the query editor showing the dimmed text of a Copilot code suggestion.":::

1. You can then accept the suggestion with the **Tab** key, or dismiss it. If you don't want to accept an entire suggestion from Copilot, you can use the **Ctrl+Right** keyboard shortcut to accept the next word of a suggestion.

1. Copilot can provide different suggestions for the same input. You can hover over the suggestion to preview the other options.

   :::image type="content" source="media/copilot-code-completion/code-completion-suggestion-other-options.png" alt-text="Screenshot from the query editor showing the dimmed text and the selector for multiple selection options." lightbox="media/copilot-code-completion/code-completion-suggestion-other-options.png":::

1. To help Copilot, understand the query you're writing, you can provide context about what code you expect by leaving a comment with `--`. For example, you could specify which warehouse object, condition, or methods to use. Copilot can even autocomplete your comment to help you write clear and accurate comments more efficiently.

   :::image type="content" source="media/copilot-code-completion/code-completion-comments.png" alt-text="Screenshot from the query editor showing a block of code suggestions based on a comment asking for 'list the average temperature of each city'.":::

## Related content

- [What is Copilot in Fabric in Data Warehouse?](copilot.md)
- [How to use the Copilot chat pane in Fabric in Data Warehouse](copilot-chat-pane.md)
- [How to use Copilot quick actions in Fabric in Data Warehouse](copilot-quick-action.md)
- [Privacy, security, and responsible use of Copilot in Fabric in Data Warehouse](../fundamentals/copilot-data-warehouse-privacy-security.md)
