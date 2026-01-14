---
title: How to Use the Microsoft Copilot Code Completion in the SQL Database Workload
description: Learn more about Microsoft Copilot Code Completion feature in Microsoft Fabric in the SQL database workload, to ask questions specific about your database.
author: markingmyname
ms.author: maghan
ms.reviewer: yoleichen, wiassaf
ms.date: 11/18/2025
ms.topic: how-to
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.custom:
  - sfi-image-nochange
---

# How to use the Microsoft Copilot code completion in the SQL database workload

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Copilot in Fabric in the SQL database workload includes a code completion feature with Copilot.

As you start writing T-SQL code or comments in the editor, Copilot in Fabric SQL database uses your database schema and query tab context to complement the existing IntelliSense with inline code suggestions.

- The completions can come in varied lengths - sometimes the completion of the current line, and sometimes a whole new block of code.
- The code completions support all types of T-SQL queries: data definition language (DDL), data query language (DQL), and data manipulation language (DML).
- You can accept all or part of a suggestion or keep typing to ignore the suggestions. Copilot can also generate alternative suggestions for you to pick.

## Prerequisites

[!INCLUDE [copilot-include](../../includes/copilot-include.md)]

- Verify the **Show Copilot completions** setting in enabled in your database settings.
  - You can also check the setting's status through the status bar at the bottom of the query editor.

  :::image type="content" source="media/copilot-code-completion/copilot-setting-status-bar.jpg" alt-text="Screenshot from the Fabric SQL database Query editor, showing the Copilot settings are ready and enabled.":::

  - If not enabled, then in your database **Settings**, select the **Copilot** pane. Enable the **Show Copilot completions** option is enabled.
    :::image type="content" source="media/copilot-code-completion/copilot-setting-toggle.png" alt-text="Screenshot from the Fabric SQL database settings, showing the Copilot page and the Show Copilot completions setting." lightbox="media/copilot-code-completion/copilot-setting-toggle.png":::

## How can code completions help you?

Code completion enhances your productivity and workflow in Copilot in Fabric SQL database by reducing the cognitive load of writing T-SQL code. It accelerates code writing, prevents syntax errors and typos, and improves code quality. It provides helpful, context-rich suggestions directly within the query editor. Whether you're new or experienced with T-SQL, code completion helps you save time and energy with writing code, and focus on designing, optimizing, and testing your database.

## Key capabilities

- **Auto-complete partially written queries**: Copilot can provide context-aware SQL code suggestions or completions for your partially written SQL query.
- **Generate suggestions from comments**: Guide Copilot using comments that describe your code logic and purpose using natural language. Leave the comment at the beginning of the query and Copilot generates the corresponding query.

## Get started

To begin using the Copilot Code Completion feature, follow these steps to enable and utilize its capabilities effectively in the SQL query editor.

1. Start writing your query in the SQL query editor within the database. As you type, Copilot provides real-time code suggestions and completions of your query by presenting a dimmed ghost text.

   :::image type="content" source="media/copilot-code-completion/code-completion-suggestion.png" alt-text="Screenshot from the query editor showing the dimmed text of a Copilot code suggestion.":::

1. You can then accept the suggestion with the **Tab** key, or dismiss it. If you don't want to accept an entire suggestion from Copilot, you can use the **Ctrl+Right** keyboard shortcut to accept the next word of a suggestion.

1. Copilot can provide different suggestions for the same input. You can hover over the suggestion to preview the other options.

   :::image type="content" source="media/copilot-code-completion/code-completion-suggestion-other-options.png" alt-text="Screenshot from the query editor showing the dimmed text and the selector for multiple selection options." lightbox="media/copilot-code-completion/code-completion-suggestion-other-options.png":::

1. To help Copilot, understand the query you're writing, you can provide context about what code you expect by leaving a comment with `--`. For example, you could specify which database object, condition, or methods to use. Copilot can even autocomplete your comment to help you write clear and accurate comments more efficiently.

   :::image type="content" source="media/copilot-code-completion/code-completion-comments.png" alt-text="Screenshot from the query editor showing a block of code suggestions based on a comment asking for 'list the average temperature of each city'.":::

## Related content

- [What is Copilot Copilot in Fabric in SQL database?](copilot.md)
- [How to use the Copilot chat pane in Fabric in SQL database](copilot-chat-pane.md)
- [How to use the Copilot explain and fix quick action features in Fabric in SQL database](copilot-quick-actions.md)
- [Privacy, security, and responsible AI use of Copilot in Microsoft Fabric](../../fundamentals/copilot-privacy-security.md)
